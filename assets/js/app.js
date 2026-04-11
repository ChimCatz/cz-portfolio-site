const toggleButton = document.getElementById('toggle-btn');
const body = document.body;

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        const isCollapsed = body.classList.toggle('sidebar-collapsed');
        toggleButton.setAttribute('aria-expanded', String(!isCollapsed));
    });
}
