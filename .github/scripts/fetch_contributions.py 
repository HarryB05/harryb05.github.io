import os
import json
import re
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

# --- Configuration ---
USERNAME = "HarryB05"
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
OUTPUT_DIR = os.path.join(REPO_ROOT, "assets")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "contributions.json")

# --- Create output directory ---
os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_count_from_tooltip(text):
    """Extracts the number of contributions from a tooltip text."""
    if not text:
        return 0
    match = re.search(r'(\d+) contribution', text)
    if match:
        return int(match.group(1))
    if 'No contributions' in text:
        return 0
    return 0

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    )

    url = f"https://github.com/users/{USERNAME}/contributions"
    page.goto(url, timeout=60000)

    try:
        page.wait_for_selector('.js-calendar-graph', timeout=60000)

        # Find all day cells
        cells = page.query_selector_all('td.ContributionCalendar-day')
        
        contributions = []

        for cell in cells:
            date = cell.get_attribute('data-date')
            level = int(cell.get_attribute('data-level') or '0')
            cell_id = cell.get_attribute('id')

            # Find the corresponding <tool-tip> element
            count = 0
            if cell_id:
                tooltip_selector = f'tool-tip[for="{cell_id}"]'
                tooltip = page.query_selector(tooltip_selector)
                if tooltip:
                    tooltip_text = tooltip.inner_text()
                    count = extract_count_from_tooltip(tooltip_text)

            contributions.append({
                'date': date,
                'level': level,
                'count': count
            })

        # Save to JSON
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(contributions, f, indent=2)

        print(f"Saved {len(contributions)} days of contributions to {OUTPUT_FILE}")

    except PlaywrightTimeoutError:
        print("Error: Timeout while waiting for contribution graph.")

    finally:
        browser.close()
