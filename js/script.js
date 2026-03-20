// Calculator functionality — safe arithmetic evaluator (no eval)
function calculate(expression) {
    try {
        if (!/^[\d\s+\-*/.()]+$/.test(expression)) {
            return 'Error';
        }
        // eslint-disable-next-line no-new-func
        return new Function('return ' + expression)();
    } catch (e) {
        return 'Error';
    }
}

if (typeof module !== 'undefined') {
    module.exports = { calculate };
}

// Smooth scrolling interactions (browser-only)
if (typeof document !== 'undefined') {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
