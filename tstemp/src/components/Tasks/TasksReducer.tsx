export enum SortType {
    "ASC",
    "DESC",
    "TOGGLE"
}

const getNextId = (tasks: IndexedTask[]) => {
    return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
}

export const TaskReducer  = (state:State, action:Actions) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {...action.payload, id: getNextId(state.tasks)}
                ]
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)     
            }
        case 'SORT_TASKS':
            let sort : SortType = 
                action.payload === SortType.TOGGLE ?
                state.sort === SortType.ASC ?
                    SortType.DESC: SortType.ASC 
                : action.payload
            return {
                ...state,
                tasks: state.tasks.sort((a,b) => {
                    if (sort === SortType.ASC) {
                        return a.id - b.id
                    } else if (sort === SortType.DESC) {
                        return b.id - a.id
                    } else {
                        return 0
                    }
                }),
                sort
            }
        case 'TOGGLE_COMPLETE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => (
                    (task.id === action.payload)? 
                    { ...task, completed: !task.completed}
                    : task
                ))
            }
        default:
            return state
    }
}

type Task = {
    title: string,
    completed: boolean,
}

export interface IndexedTask extends Task {
    id: number,
} 

type State = {
    tasks: IndexedTask[],
    sort?: SortType,
};

export type Actions = 
    { type: 'ADD_TASK', payload: Task } |
    { type: 'REMOVE_TASK', payload: number } |
    { type: 'SORT_TASKS', payload: SortType } |
    { type: 'TOGGLE_COMPLETE_TASK', payload: number };