// Calculator functionality — safe arithmetic evaluator (no eval)
function calculate(expression) {
    if (typeof expression !== 'string' || !/^[\d\s+\-*/.()]+$/.test(expression)) {
        return 'Error';
    }

    var pos = 0;
    var chars = expression.replace(/\s/g, '');

    if (chars.length === 0) return 'Error';

    function peek() { return chars[pos]; }
    function next() { return chars[pos++]; }

    // expr = term (('+' | '-') term)*
    function parseExpr() {
        var result = parseTerm();
        while (peek() === '+' || peek() === '-') {
            var op = next();
            var right = parseTerm();
            result = op === '+' ? result + right : result - right;
        }
        return result;
    }

    // term = factor (('*' | '/') factor)*
    function parseTerm() {
        var result = parseFactor();
        while (peek() === '*' || peek() === '/') {
            var op = next();
            var right = parseFactor();
            result = op === '*' ? result * right : result / right;
        }
        return result;
    }

    // factor = '(' expr ')' | number
    function parseFactor() {
        if (peek() === '(') {
            next(); // skip '('
            var result = parseExpr();
            if (peek() !== ')') throw new Error('Missing )');
            next(); // skip ')'
            return result;
        }
        return parseNumber();
    }

    function parseNumber() {
        var start = pos;
        while (pos < chars.length && (chars[pos] >= '0' && chars[pos] <= '9' || chars[pos] === '.')) {
            pos++;
        }
        if (pos === start) throw new Error('Unexpected token');
        return parseFloat(chars.slice(start, pos));
    }

    try {
        var result = parseExpr();
        if (pos !== chars.length) return 'Error';
        return result;
    } catch (e) {
        return 'Error';
    }
}

if (typeof module !== 'undefined') {
    module.exports = { calculate };
}

// Smooth scrolling interactions (browser-only)
if (typeof document !== 'undefined') {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
