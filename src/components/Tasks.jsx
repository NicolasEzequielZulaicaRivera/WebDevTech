import { useQuery, useMutation, gql } from "@apollo/client";
import "../styles/tasks.css";


const GET_TASKS = gql`
query getTodos {
    todos {
      id
      type
    }
  }
`;

const ADD_TASK = gql`
mutation addTodo ($value:String!){
    addTodo(type: $value) {
      id
      type
    }
  }
`

const UPD_TASK = gql`
mutation updateTask($id:String!,$value:String!) {
    updateTodo( id:$id, type:$value ){
      id
      type
    }
  }
`

const DEL_TASK = gql`
mutation deleteTodo($id:String!){
    deleteTodo(id:$id)
  }
`

const Tasks = () => {


    const { loading, error, data } = useQuery(GET_TASKS,{fetchPolicy:'cache-and-network'});
    const [ addTask ] = useMutation(ADD_TASK,{refetchQueries: [GET_TASKS]});
    const [ updateTask ] = useMutation(UPD_TASK);
    const [ deleteTask ] = useMutation(DEL_TASK, {
        refetchQueries: [GET_TASKS],
        // TODO
        update(cache, { deleteTodo }) {
            cache.modify({
              fields: {
                todos(existingTodos = []) {
                    const delRef = 'Todo:'+deleteTodo;
                    cache.evict(delRef);// TODO : check if this is deleting the task correctly
                    return existingTodos.filter( t => t.__ref !== delRef );
                }
              }
            });
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="Tasks">
            <div className="title">
                TASKS
            </div>
            <div className="container" >
            <div className="task">
                <input type="text" placeholder="New Task" 
                    onChange={(e)=>{ e.target.classList.add("unsaved-task") }}
                    onKeyPress={(e)=>{
                        if( e.key !== 'Enter' ) return;
                        addTask({ variables: {value: e.target.value} }).then( ()=>{
                            e.target.value = "";
                            e.target.classList.remove("unsaved-task");
                        })
                    }}
                />
            </div>
            {
                data.todos.map( ({ id, type }) => (
                    <div key={id} className="task">
                        <input type="text" defaultValue={type} className="saved-task" 
                            onChange={(e)=>{ e.target.classList.add("unsaved-task") }}
                            onKeyPress={(e)=>{
                                if( e.key !== 'Enter' ) return;
                                
                            }}
                            onKeyDown={(e)=>{
                                if( e.key === "Enter" ){
                                    updateTask({ variables: {id, value: e.target.value} }).then( ()=>{
                                        e.target.classList.remove("unsaved-task");
                                    });
                                }
                                if( e.key === "Delete" ){
                                    deleteTask({ variables: {id} });
                                }
                            }}
                        />
                    </div>
                ))
            }
            </div>
            <div>Press Enter To Submit</div>
            <div>
                <span className="marker-saved">Saved</span> - <span className="marker-unsaved">Unsaved</span>
            </div>
            <div>Press Delete To Delete</div>
            <br/><br/>
                
        </div>
    );

}

export default Tasks;