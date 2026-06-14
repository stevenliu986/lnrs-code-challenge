import { useState, useMemo } from 'react'
import {run} from './parser';
import { EXAMPLES } from './utils/constants';
import AstNode from './components/AstNode';
import ErrorView from './components/ErrorView';
import ResultView from './components/ResultView';
import './App.css'

function App() {
  const [input, setInput] = useState('1+2 = 3');
  const outcome = useMemo(()=> run(input), [input]);


  return (
    <main className='parser-app'>
      <header className='app-header'>
        <h1>Expression Parser</h1>
        <p className='subtitle'>
          Built with <code>Nearley</code> + <code>Moo</code>. Supports arithmetic
          (<code>+ - * /</code>), comparison (<code> = !=</code>), parentheses and standard operator precedence.
        </p>
      </header>

      <section className='input-card'>
        <label htmlFor="expr" className='input-label'>Expression</label>
        <input className='expr-input' type="text" id='expr' value={input} spellCheck={false} autoComplete='off' placeholder='e.g. 2 * (3 + 4) = 14' onChange={e => setInput(e.target.value)}/>

        <div className='examples'>
          {EXAMPLES.map(ex => (
            <button className={`example-chip ${ex === input?'active': ''}`} key={ex} type="button" onClick={() => setInput(ex)}>{ex}</button>
          ))}
        </div>
      </section>

      <section className='result-card'>
        <h2>Result</h2>
        {outcome.ok? (
          <ResultView outcome={outcome} />
        ): (
          <ErrorView input={input} error={outcome.error} />
        )}
      </section>

      {outcome.ok && (
        <section className='ast-card'>
          <h2>Abstract Syntax Tree</h2>
          <AstNode node={outcome.ast} />
        </section>
      )}
    </main>
  )
}

export default App
