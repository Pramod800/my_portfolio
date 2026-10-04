// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initPhoneStage();
    initCopyEmail();
});

// Sticky phone: mirrors whichever project is at the middle of the viewport
function initPhoneStage() {
    const stage = document.querySelector('.stage .screens');
    const projects = document.querySelectorAll('.project');
    const hero = document.querySelector('.hero');

    if (!stage || !projects.length || !('IntersectionObserver' in window)) return;

    // The phone only sits beside the list on wide screens
    const wide = window.matchMedia('(min-width: 900px)');

    // Copy each project's screen into the phone
    projects.forEach(project => {
        const screen = project.querySelector('.screen');
        if (screen) {
            stage.appendChild(screen.cloneNode(true));
        }
    });

    const screens = stage.querySelectorAll('.screen');

    function setActive(app) {
        if (!wide.matches) app = 'home';

        screens.forEach(screen => {
            screen.classList.toggle('is-active', screen.dataset.screen === app);
        });

        projects.forEach(project => {
            project.classList.toggle('is-active', project.dataset.app === app);
        });
    }

    // Fires when a section crosses the horizontal centre line of the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.dataset.app);
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    if (hero) observer.observe(hero);
    projects.forEach(project => observer.observe(project));

    wide.addEventListener('change', () => setActive('home'));
}

// Copy Email Button
function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmail');
    const status = document.getElementById('copyStatus');

    if (!copyBtn || !status) return;

    copyBtn.addEventListener('click', () => {
        const email = copyBtn.dataset.email;

        if (!navigator.clipboard) {
            status.textContent = `Copying isn't available in this browser. The address is ${email}.`;
            return;
        }

        navigator.clipboard.writeText(email)
            .then(() => {
                status.textContent = 'Address copied.';
            })
            .catch(() => {
                status.textContent = `Couldn't copy. The address is ${email}.`;
            });

        // Clear the message after 3 seconds
        setTimeout(() => {
            status.textContent = '';
        }, 3000);
    });
}
