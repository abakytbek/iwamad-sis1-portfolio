const themeButton = document.getElementById('theme-toggle');

function updateTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  if (theme === 'dark') {
    themeButton.textContent = 'Light';
    themeButton.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeButton.textContent = 'Dark';
    themeButton.setAttribute('aria-label', 'Switch to dark mode');
  }
}

const savedTheme = localStorage.getItem('theme') || 'light';
updateTheme(savedTheme);

themeButton.addEventListener('click', function () {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  updateTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});