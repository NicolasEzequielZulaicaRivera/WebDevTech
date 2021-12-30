export enum SortType {
    "ASC",
    "DESC",
    "TOGGLE"
}

export const TaskReducer  = (state:State, action:Actions) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {...action.payload, id: state.tasks.length}
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
    { type: 'SORT_TASKS', payload: SortType };