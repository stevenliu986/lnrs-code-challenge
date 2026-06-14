@preprocessor module

@{%
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
%}

@lexer lexer

main -> _ comparison _ {% d => d[1] %}

_ -> %ws:? {% () => null %}

comparison -> addsub _ "=" _ addsub {% d => ({type: 'comparison', op: '=', left: d[0], right: d[4]}) %}
            | addsub _ "!=" _ addsub {% d => ({type: 'comparison', op: '!=', left: d[0], right: d[4]}) %}
            | addsub {% id %}

addsub -> addsub _ "+" _ muldiv {% d => ({type: 'binary', op: '+', left: d[0], right: d[4]}) %}
        | addsub _ "-" _ muldiv {% d => ({type: 'binary', op: '-', left: d[0], right: d[4]}) %}
        | muldiv {% id %}

muldiv -> muldiv _ "*" _ unary {% d => ({type: 'binary', op: '*', left: d[0], right: d[4]}) %}
        | muldiv _ "/" _ unary {% d => ({type: 'binary', op: '/', left: d[0], right: d[4]}) %}
        | unary {% id %}

unary -> "-" _ unary {% d => ({type: 'unary', op: '-', operand: d[2]}) %}
       | primary {% id %}

primary -> %number {% d => ({type: 'number', value: parseFloat(d[0].value)}) %}
         | "(" _ comparison _ ")" {% d => ({type: 'group', expr: d[2]}) %}
