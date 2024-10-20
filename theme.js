document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');
    const body = document.body;

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            if (themeText) themeText.textContent = 'Dark Mode'; 
            localStorage.setItem('theme', 'dark'); 
        } else {
            body.classList.remove('dark-mode');
            if (themeText) themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const isDark = savedTheme === 'dark';
        if (themeToggle) themeToggle.checked = isDark;
        setTheme(isDark);
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            setTheme(e.target.checked);
        });
    }
});
