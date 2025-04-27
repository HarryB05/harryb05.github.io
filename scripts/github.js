const colours = {
    0: '#22272e',  // no contributions (dark)
    1: '#264d36',  // low (dark green)
    2: '#216e39',  // medium
    3: '#30a14e',  // high
    4: '#40c463'   // very high
};

fetch('/assets/contributions.json')
    .then(response => response.json())
    .then(data => {
        // Sort by date ascending
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Find the day of week for the first date (0 = Sunday, 6 = Saturday)
        const firstDayOfWeek = new Date(data[0].date).getDay();

        // Pad the first week with nulls if the first day is not Sunday
        const paddedData = Array(firstDayOfWeek).fill(null).concat(data);

        // If the last week is not complete, pad the end with nulls
        const remainder = paddedData.length % 7;
        if (remainder !== 0) {
            paddedData.push(...Array(7 - remainder).fill(null));
        }

        // Now, split into columns (weeks)
        const weeks = [];
        for (let i = 0; i < paddedData.length; i += 7) {
            weeks.push(paddedData.slice(i, i + 7));
        }

        // --- Update Title with Total Contributions ---
        const totalContributions = data.reduce((sum, day) => sum + (day.count || 0), 0) + 1;
        const titleElem = document.querySelector('#github-contributions-container h2');
        if (titleElem) {
            titleElem.textContent = `${totalContributions} contributions in the last year`;
        }

        // --- Month Labels ---
        const graphContainer = document.getElementById('github-contributions-graph-container');
        const weeksCount = weeks.length;
        graphContainer.style.setProperty('--weeks', weeksCount);

        let monthLabels = document.getElementById('github-month-labels');
        if (!monthLabels) {
            monthLabels = document.createElement('div');
            monthLabels.id = 'github-month-labels';
            graphContainer.insertBefore(monthLabels, graphContainer.firstChild);
        }
        monthLabels.innerHTML = '';
        monthLabels.style.display = 'grid';
        monthLabels.style.gridTemplateColumns = `32px repeat(${weeksCount}, 15px)`;

        // Offset cell for day labels
        const offsetSpan = document.createElement('span');
        offsetSpan.textContent = '';
        monthLabels.appendChild(offsetSpan);

        let lastMonth = null;
        let lastYear = null;
        let monthsLabeled = new Set();
        for (let col = 0; col < weeksCount; col++) {
            let label = document.createElement('span');
            // Find if this week contains the 1st of a month
            let week = weeks[col];
            let firstOfMonthDay = week.find(day => day && new Date(day.date).getDate() === 1);
            if (firstOfMonthDay) {
                let dateObj = new Date(firstOfMonthDay.date);
                let month = dateObj.toLocaleString(undefined, { month: 'short' });
                let year = dateObj.getFullYear();
                let monthKey = `${month}-${year}`;
                if (!monthsLabeled.has(monthKey)) {
                    label.textContent = month;
                    monthsLabeled.add(monthKey);
                    lastMonth = month;
                    lastYear = year;
                } else {
                    label.textContent = '';
                }
            } else {
                label.textContent = '';
            }
            monthLabels.appendChild(label);
        }

        // --- Day Labels ---
        const labelsContainer = document.getElementById('github-contributions-labels');
        labelsContainer.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const label = document.createElement('div');
            if (i === 1) label.textContent = 'Mon';
            else if (i === 3) label.textContent = 'Wed';
            else if (i === 5) label.textContent = 'Fri';
            else label.textContent = '';
            labelsContainer.appendChild(label);
        }

        const container = document.getElementById('github-contributions');
        container.innerHTML = '';
        container.classList.add('contribution-graph');

        // Create tooltip element once
        let tooltip = document.querySelector('.contribution-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'contribution-tooltip';
            document.body.appendChild(tooltip);
        }

        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < weeks.length; col++) {
                const day = weeks[col][row];
                const cell = document.createElement('div');
                cell.className = 'contribution-cell';
                if (day) {
                    const dateObj = new Date(day.date);
                    const options = { year: 'numeric', month: 'short', day: 'numeric' };
                    const dateStr = dateObj.toLocaleDateString(undefined, options);
                    cell.dataset.tooltip = `${day.count || 0} contribution${day.count === 1 ? '' : 's'} on ${dateStr}`;
                    cell.style.backgroundColor = colours[day.level];
                } else {
                    cell.style.backgroundColor = colours[0];
                    cell.style.opacity = 0.2; // faded for padding
                }

                // Custom tooltip events
                cell.addEventListener('mouseenter', function (e) {
                    if (cell.dataset.tooltip) {
                        tooltip.textContent = cell.dataset.tooltip;
                        tooltip.style.opacity = 1;
                    }
                });
                cell.addEventListener('mousemove', function (e) {
                    tooltip.style.left = (e.clientX + 12) + 'px';
                    tooltip.style.top = (e.clientY - 10) + 'px';
                });
                cell.addEventListener('mouseleave', function () {
                    tooltip.style.opacity = 0;
                });

                container.appendChild(cell);
            }
        }

        // Show the container once everything is loaded
        document.getElementById('github-contributions-container').classList.add('loaded');
    })
    .catch(error => {
        console.error('Error loading contributions:', error);
        document.getElementById('github-contributions').innerText = '';
    }); 