import React, {useReducer, useRef} from 'react'
import {TaskReducer, IndexedTask, Actions as TaskActions, SortType} from './TasksReducer'


const defaultTask = ({task,dispatch}:childProps):JSX.Element => (
    <div className={'task'}>
        <div>{task.id}</div>
        <div>{task.title}</div>
        <div>{task.completed}</div>
    </div>
)

export const Tasks : React.FC<Props>= ({
    children
}) => {

    const ref = useRef<HTMLInputElement>(null)

    const [{tasks}, dispatch] = useReducer(TaskReducer, {tasks:[]})

    const addTask = (title:string) => {
        dispatch({
            type: 'ADD_TASK',
            payload: {
                title,
                completed: false
            }
        })
    }
    const handleAddTask = () => {
        const title = ref?.current?.value
        if (!title) return;
        addTask(title)
        ref.current.value = ''
    }

    const handleSort = () => {
        dispatch({
            type: 'SORT_TASKS',
            payload: SortType.TOGGLE
        })
    }

    return (
        <div className={'tasks'}>
            <h3>TASKS</h3>
            {
                tasks.map( (task, i) => (
                    <div key={i} className={'task_wrapper'}>
                        {children?.({task,dispatch})??defaultTask({task,dispatch})}
                    </div>
                ))
            }

            <div className={'addTask'}>
                <input type='text' placeholder='Task' ref={ref} />
                <button onClick={handleAddTask}>Add Task</button>
                <button onClick={handleSort}>Sort</button>
            </div>
        </div>
    )
}
interface childProps {
    task: IndexedTask,
    dispatch?: React.Dispatch<TaskActions>
}
interface Props {
    children?: (data: childProps) => JSX.Element | null;
}