import React, {useState} from 'react'
import './Counter.css'

export const Counter : React.FC<Props> = ({
    initialCount = 0,
    children
}) => {

    const [count, setCount] = useState(initialCount)

    const defaultCounter = () => (
        <div className={'counter'}>
            <div className={'controller'}
                onClick={() => setCount(c => c - 1)}
            > {'[<<]'} </div>
            <div className={'count'}>{count}</div>
            <div className={'controller'}
                onClick={() => setCount(c => c + 1)}
            > {'[>>]'} </div>
        </div>
    )

    return children?.({count,setCount})??defaultCounter();
}

interface childProps {
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}

interface Props {
    initialCount?: number,
    children?: (data:childProps) => JSX.Element | null;
}