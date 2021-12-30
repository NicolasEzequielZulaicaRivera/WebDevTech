import React from 'react'

import { Counter } from './Counter'
import './Counter.css'

export const AltCounter : React.FC<Props> = ({
    initialCount = 0,
}) => {
    return (
        <Counter>
        {({ count, setCount }) => (
            <div className={'alt_counter'}>
                <div className={'count'}>{count}</div>
                <div className={'controller'}
                    onClick={() => setCount(c => c + 1)}
                > {'(↑)'} </div>
                <div className={'controller'}
                    onClick={() => setCount(c => c - 1)}
                > {'(↓)'} </div>
            </div>
        )}
        </Counter>
    )
}

interface Props {
    initialCount?: number,
}