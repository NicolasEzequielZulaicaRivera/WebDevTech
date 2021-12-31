import React, {useReducer, useRef} from 'react'
import {TaskReducer, IndexedTask, Actions as TaskActions, SortType} from './TasksReducer'

import './Tasks.css'
import {FiTrash2} from 'react-icons/fi'

const defaultTask = ({task,dispatch}:childProps):JSX.Element => {

    const className = 'task ' + (task.completed? 'task-completed': '');

    const handleDelete = () =>{
        dispatch?.({
            type: 'REMOVE_TASK',
            payload: task.id
        })
    }

    const handleComplete = () =>{
        dispatch?.({
            type: 'TOGGLE_COMPLETE_TASK',
            payload: task.id
        })
    }
    
    return (
        <div className={className} onClick={handleComplete} >
            <div>{task.id}</div>
            <div>{task.title}</div>
            <div onClick={handleDelete} >
                <FiTrash2 className={'delete-task'} />
            </div>
        </div>
    )
}

export const Tasks : React.FC<Props>= ({
    children
}) => {

    const ref = useRef<HTMLInputElement>(null)

    const [{tasks}, dispatch] = useReducer(
        TaskReducer, { tasks:[], sort: SortType.ASC }
    )

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

    const taskInputHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleAddTask()
    }

    return (
        <div className={'tasks'}>
            <h3>TASKS</h3>

            <div className={'tasks_container'}>
            {
                tasks.map( (task, i) => (
                    <div key={i} className={'task_wrapper'}>
                        {children?.({task,dispatch})??defaultTask({task,dispatch})}
                    </div>
                ))
            }
            </div>

            <div className={'addTask'}>
                <input type='text' placeholder='Task' ref={ref} onKeyDown={taskInputHandler} />
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