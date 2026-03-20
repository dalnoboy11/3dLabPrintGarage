// Calculator functionality
function calculate(expression) {
    try {
        return eval(expression);
    } catch (e) {
        return 'Error';
    }
}

// Smooth scrolling interactions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
