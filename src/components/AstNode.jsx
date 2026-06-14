import { OP_LABEL } from '../utils/constants'
import { formatNumber } from '../utils/formatNumber.js'

export default function AstNode({ node }) {
    let label;
    let badge;
    let children = [];

    switch (node.type) {
        case 'number':
            label = 'number';
            badge = formatNumber(node.value);
            break;
        case 'binary':
            label = OP_LABEL[node.op];
            badge = node.op;
            children = [
                { key: 'left', node: node.left },
                { key: 'right', node: node.right },
            ];
            break;
        case 'comparison':
            label = OP_LABEL[node.op];
            badge = node.op;
            children = [
                { key: 'left', node: node.left },
                { key: 'right', node: node.right },
            ];
            break;
        case 'unary':
            label = 'negate';
            badge = '-';
            children = [{ key: 'operand', node: node.operand }];
            break;
        case 'group':
            label = 'group';
            badge = '( )';
            children = [{ key: 'expr', node: node.expr }];
            break;
        default:
            label = node.type;
            badge = '?';
    }

    return (
        <div className='ast-node'>
            <div className={`ast-row ast-${node.type}`}>
                <span className='ast-badge'>{badge}</span>
                <span className='ast-label'>{label}</span>
            </div>
            {children.length > 0 && (
                <ul className='ast-children'>
                    {children.map(child => (
                        <li key={child.key}>
                            <span className='ast-edge-label'>{child.key}</span>
                            <AstNode node={child.node} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
