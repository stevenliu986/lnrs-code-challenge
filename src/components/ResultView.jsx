import {formatNumber} from '../utils/formatNumber';

export default function ResultView({outcome}) {
    if (outcome.statement) {
        const truthy = outcome.result === true;
        return (
            <div className={`result-box ${truthy? 'is-true': 'is-false'}`}>
                <span className='result-kind'>statement</span>
                <span className='result-value'>{truthy?'True':'False'}</span>
            </div>
        )
    }
    return (
        <div className='result-box is-number'>
            <span className='result-kind'>expression</span>
            <span className='result-value'>{formatNumber(outcome.result)}</span>
        </div>
    )
}