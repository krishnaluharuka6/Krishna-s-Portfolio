/* =========================================================
   main.js — everything the site does with JavaScript
   1. Theme (light / dark)
   2. Preloader
   3. Hero text (greeting + typing effect)
   4. Copy-email button
   Each block checks that its element exists, so the same file
   is safe to load on every page.
   ========================================================= */


/* ---------- 1. Theme ----------
   Order of preference: what the visitor chose last time,
   then their device setting, then light. */
const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');

function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeButton) {
        // the icon shows what you'll get by clicking, not what you have
        themeButton.innerHTML = theme === 'dark'
            ? '<i class="bi bi-brightness-high-fill"></i>'
            : '<i class="bi bi-moon"></i>';
        themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

function savedTheme() {
    try { return localStorage.getItem('theme'); } catch { return null; }   // storage can be blocked
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme() || (prefersDark ? 'dark' : 'light'));

if (themeButton) {
    themeButton.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch { /* not a big deal */ }
    });
}


/* ---------- 2. Preloader ---------- */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
});


/* ---------- 3. Hero text (home page only) ---------- */
const greeting = document.getElementById('greeting');

if (greeting) {
    const greetings = ['Hello,', 'नमस्ते,', 'Bonjour,', 'राम राम,'];
    let current = 0;

    setInterval(() => {
        current = (current + 1) % greetings.length;
        greeting.textContent = greetings[current];
    }, 2000);
}

const typedTarget = document.querySelector('.typed-text');

// typed.js comes from a CDN; if it didn't load, the page still reads fine
if (typedTarget && typeof Typed !== 'undefined') {
    new Typed('.typed-text', {
        strings: [
            'Learner by Choice,',
            'Teacher by Profession,',
            'Problem Solver by Mindset, and',
            'Storyteller by Nature.'
        ],
        typeSpeed: 100,
        backSpeed: 10,
        backDelay: 1000,
        loop: true
    });
}


/* ---------- 4. Copy email ---------- */
const copyButton = document.getElementById('copy-email');
const toast = document.getElementById('toast');

if (copyButton) {
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(copyButton.dataset.email);
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        } catch (error) {
            console.error('Could not copy the email:', error);
        }
    });
}
