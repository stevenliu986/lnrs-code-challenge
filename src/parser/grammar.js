// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

import moo from 'moo';

const lexer = moo.compile({
    ws: { match: /[ \t\n\r]+/, lineBreaks: true },
    number: /[0-9]+(?:\.[0-9]+)?/,
    ne: '!=',
    eq: '=',
    plus: '+',
    minus: '-',
    times: '*',
    divide: '/',
    lparen: '(',
    rparen: ')'
});
let Lexer = lexer;
let ParserRules = [
    {"name": "main", "symbols": ["_", "comparison", "_"], "postprocess": d => d[1]},
    {"name": "_$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "comparison", "symbols": ["addsub", "_", {"literal":"="}, "_", "addsub"], "postprocess": d => ({type: 'comparison', op: '=', left: d[0], right: d[4]})},
    {"name": "comparison", "symbols": ["addsub", "_", {"literal":"!="}, "_", "addsub"], "postprocess": d => ({type: 'comparison', op: '!=', left: d[0], right: d[4]})},
    {"name": "comparison", "symbols": ["addsub"], "postprocess": id},
    {"name": "addsub", "symbols": ["addsub", "_", {"literal":"+"}, "_", "muldiv"], "postprocess": d => ({type: 'binary', op: '+', left: d[0], right: d[4]})},
    {"name": "addsub", "symbols": ["addsub", "_", {"literal":"-"}, "_", "muldiv"], "postprocess": d => ({type: 'binary', op: '-', left: d[0], right: d[4]})},
    {"name": "addsub", "symbols": ["muldiv"], "postprocess": id},
    {"name": "muldiv", "symbols": ["muldiv", "_", {"literal":"*"}, "_", "unary"], "postprocess": d => ({type: 'binary', op: '*', left: d[0], right: d[4]})},
    {"name": "muldiv", "symbols": ["muldiv", "_", {"literal":"/"}, "_", "unary"], "postprocess": d => ({type: 'binary', op: '/', left: d[0], right: d[4]})},
    {"name": "muldiv", "symbols": ["unary"], "postprocess": id},
    {"name": "unary", "symbols": [{"literal":"-"}, "_", "unary"], "postprocess": d => ({type: 'unary', op: '-', operand: d[2]})},
    {"name": "unary", "symbols": ["primary"], "postprocess": id},
    {"name": "primary", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": d => ({type: 'number', value: parseFloat(d[0].value)})},
    {"name": "primary", "symbols": [{"literal":"("}, "_", "comparison", "_", {"literal":")"}], "postprocess": d => ({type: 'group', expr: d[2]})}
];
let ParserStart = "main";
export default { Lexer, ParserRules, ParserStart };
