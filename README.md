# Mathematical Equation Parser (Nearley + Moo + React)

## Overview
This is a mathematical expression parser built with Nearley and Moo. It can parse arithmetic expressions and comparison statements, follow standard operator precedence, evaluate results, and judge whether the comparison is true or false. The application also outputs the Abstract Syntax Tree (AST) and captures syntax errors with location hints.

## Tech Stack
- Nearley: <https://nearley.js.org/>
- Moo: <https://github.com/no-context/moo>

| Layer      | Technology / Purpose                     |
|------------|------------------------------------------|
| Frontend   | React 19, JavaScript                     |
| Parser     | Nearley (Syntax Parser), Moo (Lexer)     |

## Prerequisites
- Node.js >= 22.0.0
- NPM

## Features
- **Arithmetic Operations**: Supports Addition (`+`), Subtraction/Negative (`-`), Multiplication (`*`), and Division (`/`).
- **Comparison Operators**: Supports Equal (`=`) and Not Equal (`!=`).
- **Whitespace Ignoring**: Extra spaces, tabs, and line breaks will not affect parsing.
- **Operator Precedence**:
  - Unary minus (`-`) has the highest precedence.
  - Multiplication (`*`) and Division (`/`) have higher precedence than Addition (`+`) and Subtraction (`-`).
  - Comparison operators (`=`, `!=`) are evaluated after all arithmetic calculations.
- **Parentheses**: Supports `()` to manually adjust calculation priority and nested expressions.

## Test Cases
### Examples
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">1 + 2 = 3</code> → Output: true
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">2 * 3 + 4 = 10</code> → Output: true
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">2 * (3 + 4) = 10</code> → Output: false
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">6 = 10 / 2 + 1</code> → Output: true
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">12 + 3 != 4 / 2 + 5</code> → Output: true
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">2 + 3 * 2 = 10</code> → Output: false
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">2 * 3 + 4 != 10</code> → Output: false

### Mismatched Parentheses Cases
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">9 * (1 + 1 = 1</code> → Invalid query (Error point: `=`)
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">9 * 1 + 1) = 1</code> → Invalid query (Error point: `)`)

### Additional Test Cases
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">3.5 + 2.5 = 6.0</code> → Output: true
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">(10 - 2) / 4 != 2</code> → Output: false
- Input: <code style="background:#f1f1f1;padding:2px 5px;border-radius:4px">9 * (1 + 1) = 18</code> → Output: true

## Getting Started
### 1. Install Dependencies
Install all project dependencies first:
```bash
npm install
```
### 2. Compile Nearley Grammar
The parser requires a compiled grammar file. Run this command every time you modify the grammar source file (src/parser/grammar.ne):
```bash
npm run grammar
```
### 3. Launch Development Application
```bash
npm run dev
```
Open your browser and visit the local address (default: http://localhost:5173).

### 4. How to Test
1. Copy any test expression into the input box on the page.
2. Check the results:
   - Valid expression: Shows the final evaluation result (boolean or number) and the complete AST structure.
   - Invalid expression: Shows error message and exact error position.
   
## Scripts Reference
| Script | Description |
|--------|-------------|
| npm run dev | Start development server |
| npm run build | Build project for production |
| npm run lint | Run ESLint code check |
| npm run preview | Preview production build locally |
| npm run grammar | Compile Nearley grammar file |
| npm run test | Run all test cases once |
| npm run test:watch | Run tests in watch mode |
