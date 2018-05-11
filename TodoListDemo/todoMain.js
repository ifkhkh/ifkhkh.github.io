
var saveTodos = (todos) => {
    var result = JSON.stringify(todos)
    // 存入 localStorage
    localStorage.setItem('todos', result)
}


var templateTodo = (todo) => {
    var task = todo
// 构造 todo
    var t = `
        <div class="todo-cell">
            <div class="todo-btns">
                <!--<button data-action="todo_edit">edit</button>-->
                <!--<button data-action="todo_update">update</button>-->
                <button id="id-todo-delete" data-action="todo_delete"></button>
                <button id="id-todo-done" data-action="todo_done"></button>
            </div>
            <span class="todo-content">${task}</span>
        <div/>
    `
    return t
}
// 插入 todo cell
var insertTodoCell  = (todo) => {
    var todoContainer = e('.todo-container')
    var html = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend', html)
}

var insertTodos = (todos) => {
    for (let i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodoCell(todo)
    }
}



//all api
var apiTodoGetAll = (callback) => {
    var s = localStorage.todos
    // 判断 localStorage 里面是否有数据
    if (s != undefined) {
        var todos = JSON.parse(s)
        callback(todos)
    } else {
        localStorage.setItem('todos', '[]')
    }
}

var apiTodoAdd = (todo, callback) => {
    // 取出 todos
    var s = localStorage.todos
    var todos = JSON.parse(s)
    // 添加新数据
    todos.push(todo)
    callback(todo, todos)
}

var apiTodoDelete = (todo, callback) => {
    var s = localStorage.todos
    var todos = JSON.parse(s)
    // 查找并删除 todo
    var index = todos.indexOf(todo)
    todos.splice(index, 1)

    callback(todos)

}

// all btn
var actionAdd = (self) => {
        var input = e('#id-todo-input')
        var todo = input.value
        // 增加数据到 localStorage
        apiTodoAdd(todo, (todo, todos) => {
            // 插入 todo-cell
            insertTodoCell(todo)
            log('todos: ', todos)
            saveTodos(todos)
        })
        input.value = ''
}

var actionDelete = (self) => {
    var todoCell = self.closest('.todo-cell')
    // 获取要删除的 todo 值
    var todoSpan = todoCell.querySelector('.todo-content')
    log(todoSpan)
    var todo = todoSpan.innerHTML
    // 更新 localStorage 数据
    apiTodoDelete(todo, (todos) => {
        log('todos: ', todos)
        saveTodos(todos)
        // 删除 todo-cell
        todoCell.remove()
    })

}

var actionDone = (self) => {
    self.classList.toggle('isdone')
}


var bindBTNs = () => {

    var actions = {
        // todo_edit: actionEdit,
        todo_delete: actionDelete,
        todo_add: actionAdd,
        // todo_update: actionUpdate,
        todo_done: actionDone,
    }

    var todoContainer = e('.container')
    todoContainer.addEventListener('click', (event) => {
        var self = event.target
        var key = self.dataset.action
        var action = actions[key]
        if (action != undefined) {
            action(self)
        }
    })
}


var loadTodos = () => {
    // 获取所有 todos
    apiTodoGetAll((todos) => {
        // 渲染页面
        insertTodos(todos)
    })
}



var __main = () => {
    // 刷新页面
    loadTodos()
    // 所有绑定 btn
    bindBTNs()



    // localStorage.removeItem('todos')
}

__main()