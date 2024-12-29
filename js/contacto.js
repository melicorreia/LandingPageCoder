const currentMode = localStorage.getItem('theme') || 'light';

if (currentMode === 'dark') {
document.body.classList.add('dark-mode');
} else {
document.body.classList.remove('dark-mode');
}

const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('change', () => {

const currentMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';

localStorage.setItem('theme', currentMode);

if (currentMode === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}
});