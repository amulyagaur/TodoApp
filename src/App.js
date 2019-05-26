import React from 'react';
import './App.css';
import {observer,inject} from 'mobx-react'
import DevTools from 'mobx-react-devtools';

@inject('TodoStore')
@observer
class App extends React.Component {

  handleSubmit = (e)=>{
    e.preventDefault();
    console.log(this.task.value);
    this.props.TodoStore.addTodo(this.task.value);
    this.task.value='';
  }

  render(){
    const store = this.props.TodoStore;
  return (
    <div className="App">
      <DevTools />
      <h1>Todo List</h1>
      <h2>{store.getTodoCount} pending todos</h2>
      <h5>Double Click on task to rename</h5>
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="add new todo" ref={inp => this.task=inp}/>
        <button>Add todo</button>
      </form>
      <ul>
        {
          store.todos.map((todo,key)=>(<TodoView  key={key} todo={todo} ki={key}/>))
        }
      </ul>
    </div>
  );
}

componentDidMount(){
  const store = this.props.TodoStore;
  console.log("App mounted successfully");
  fetch('https://randomuser.me/api?format=json&&results=10')
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    //console.log(data.results.map((user)=>user.name));
    var names = data.results.map((user)=>user.name.first);
    for(var i=0;i<names.length;i++)
    {
      store.todos.push({
        task:names[i],
        done:false
      });
    }
  })
  .catch(function(err){
    console.log(err);
  });
  
}
}

@observer
class TodoView extends React.Component{

  onToggle = () => {
    console.log("Check clicked");
    this.props.todo.done=!this.props.todo.done;
  }

  onRename= () => {
    this.props.todo.task=prompt('Task name', this.props.todo.task);
  }
  render(){
    const todo = this.props.todo;
    const key = this.props.ki;
    return(
      <li key={key} onDoubleClick={ this.onRename }>
        <input type='checkbox' checked={todo.done} onChange={this.onToggle}/>
{todo.task} -> <small>{todo.done ? "finished" :"pending"}</small>
      </li>
    )
  }

  componentDidMount(){
    console.log("TodoView mounted successfully");
  }
}
export default App;