// Calculator functionality – safe arithmetic evaluator (no eval)
function calculate(expression) {
    try {
        // Allow only digits, operators, spaces, dots and parentheses
        if (!/^[\d\s+\-*/().]+$/.test(expression)) return 'Error';
        const tokens = expression.match(/(\d+\.?\d*|\+|-|\*|\/|\(|\))/g);
        if (!tokens) return 'Error';
        return (function parse(tokens, pos) {
            function parseExpr(pos) { return parseAddSub(pos); }
            function parseAddSub(pos) {
                let { val, pos: p } = parseMulDiv(pos);
                while (p < tokens.length && (tokens[p] === '+' || tokens[p] === '-')) {
                    const op = tokens[p++];
                    const right = parseMulDiv(p);
                    val = op === '+' ? val + right.val : val - right.val;
                    p = right.pos;
                }
                return { val, pos: p };
            }
            function parseMulDiv(pos) {
                let { val, pos: p } = parseUnary(pos);
                while (p < tokens.length && (tokens[p] === '*' || tokens[p] === '/')) {
                    const op = tokens[p++];
                    const right = parseUnary(p);
                    if (op === '/' && right.val === 0) throw new Error('Division by zero');
                    val = op === '*' ? val * right.val : val / right.val;
                    p = right.pos;
                }
                return { val, pos: p };
            }
            function parseUnary(pos) {
                if (tokens[pos] === '-') {
                    const r = parsePrimary(pos + 1);
                    return { val: -r.val, pos: r.pos };
                }
                return parsePrimary(pos);
            }
            function parsePrimary(pos) {
                if (tokens[pos] === '(') {
                    const r = parseExpr(pos + 1);
                    if (tokens[r.pos] !== ')') throw new Error('Unmatched parenthesis');
                    return { val: r.val, pos: r.pos + 1 }; // skip ')'
                }
                return { val: parseFloat(tokens[pos]), pos: pos + 1 };
            }
            return parseExpr(0).val;
        })(tokens, 0);
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
