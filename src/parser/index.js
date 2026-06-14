import nearley from "nearley";
import grammar from "./grammar.js";

const EPSILON = 1e-9;

export function parse(input) {
    if (input == null || input.trim() === '') {
        return {
            ok: false,
            error: { message: 'Empty input - type an expression.', line: 1, col: 1, offset: 0 }
        }
    }

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try {
        parser.feed(input);
    } catch (err) {
        return { ok: false, error: locateError(err, input) };
    }

    const results = parser.results;

    if (results.length === 0) {
        return {
            ok: false,
            error: {
                message: 'Unexpected end of input - the expression is incomplete.',
                line: 1,
                col: input.length + 1,
                offset: input.length
            }
        }
    }

    return { ok: true, ast: results[0] };
}

function locateError(err, input) {
    const token = err?.token;
    if (token && typeof token.col === 'number') {
        const what = token.text ? `'${token.text}'` : 'token';
        return {
            message: `Unexpected ${what} at column ${token.col}.`,
            line: token.line ?? 1,
            col: token.col,
            offset: token.offset ?? token.col - 1
        }
    }

    const match = /line (\d+) col (\d+)/i.exec(err?.message ?? '');
    if (match) {
        const line = Number(match[1]);
        const col = Number(match[2]);
        return {
            message: `Invalid character at column ${col}.`,
            line, col,
            offset: col - 1
        };
    }

    return {
        message: err?.message ?? "Could not parse the input.",
        line: 1,
        col: input.length + 1,
        offset: input.length
    }
}

export function evaluate(node) {
    switch (node.type) {
        case 'number':
            return node.value;
        case 'group':
            return evaluate(node.expr);
        case 'unary':
            return -evaluate(node.operand);
        case 'binary': {
            const left = evaluate(node.left);
            const right = evaluate(node.right);
            switch (node.op) {
                case '+':
                    return left + right;
                case '-':
                    return left - right;
                case '*':
                    return left * right;
                case '/':
                    return left / right;
                default:
                    throw new Error(`Unknown operator: ${node.op}`)
            }
        }
        case 'comparison': {
            const left = evaluate(node.left);
            const right = evaluate(node.right);
            const equal = Math.abs(left - right) < EPSILON;
            return node.op === '=' ? equal : !equal;
        }
        default:
            throw new Error(`Unknown node type: ${node.type}`)
    }
}

export function isStatement(ast) {
    return ast.type === 'comparison';
}

export function run(input) {
    const parsed = parse(input);
    if (!parsed.ok) return parsed;
    const result = evaluate(parsed.ast);
    return {
        ok: true,
        ast: parsed.ast,
        statement: isStatement(parsed.ast),
        result
    }
}