export default function ErrorView({input,error}){
    const caretPad = Math.max(0, error.col - 1);
    return (
        <div className='error-box'>
            <div className='error-headline'>
                <span className='error-icon' aria-hidden>!</span>Invalid query
            </div>
            <pre className='error-source'>
                <code>{input || ' '}</code>
                <code className='error-caret'>{' '.repeat(caretPad) + '^'}</code>
            </pre>
            <p className='error-message'>
                {error.message} <span className='error-loc'>(line {error.line}, column {error.col})</span>
            </p>
        </div>
    )
}