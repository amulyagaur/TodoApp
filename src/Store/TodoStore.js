import {observable,computed,action} from 'mobx';

class TodoStore{
    @observable todos= [];

    @action addTodo = (todo)=>{
        this.todos.push({
            task:todo,
            done:false
        });
    }

    @computed get getTodoCount(){
        return this.todos.filter((todo)=>todo.done===false).length;
    }
}

var todo = new TodoStore();
export default todo;