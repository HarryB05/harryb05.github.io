document.querySelectorAll('.box-item').forEach(item => {
  item.addEventListener('click', function() {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = this.dataset.title;
    document.getElementById('modal-description').textContent = this.dataset.description;

    // Image
    const img = document.getElementById('modal-image');
    if (this.dataset.image) {
      img.src = this.dataset.image;
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }

    // Links
    const links = JSON.parse(this.dataset.links || '[]');
    const linksDiv = document.getElementById('modal-links');
    linksDiv.innerHTML = '';
    if (links.length > 0) {
      const projectLinksDiv = document.createElement('div');
      projectLinksDiv.className = 'project-links';
      links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.className = 'github-link';
        // GitHub link
        if (/github\.com/.test(link.url)) {
          const img = document.createElement('img');
          img.src = 'assets/images/socials/github_logo.jpeg';
          img.alt = 'GitHub';
          img.className = 'github-logo';
          a.appendChild(img);
          const span = document.createElement('span');
          span.textContent = link.text;
          a.appendChild(span);
        } else if (/play|game|arrow|\.io\//i.test(link.text + link.url)) {
          // Play Game link
          const icon = document.createElement('span');
          icon.className = 'material-icons';
          icon.textContent = 'play_arrow';
          a.appendChild(icon);
          const span = document.createElement('span');
          span.textContent = link.text;
          a.appendChild(span);
        } else {
          // Fallback
          const span = document.createElement('span');
          span.textContent = link.text;
          a.appendChild(span);
        }
        projectLinksDiv.appendChild(a);
      });
      linksDiv.appendChild(projectLinksDiv);
    }

    // Show modal with fade-in
    modal.style.display = 'flex';
    modal.classList.remove('modal-fade-out');
    void modal.offsetWidth; // force reflow
    modal.classList.add('modal-fade-in');
    document.body.classList.add('modal-open');
  });
});

document.getElementById('close-modal').onclick = function() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('modal-fade-in');
  modal.classList.add('modal-fade-out');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }, 200); // match animation duration
};

window.onclick = function(event) {
  const modal = document.getElementById('project-modal');
  if (event.target === modal) {
    modal.classList.remove('modal-fade-in');
    modal.classList.add('modal-fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 200);
  }
}; 