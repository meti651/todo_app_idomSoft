<template>
    <DatedCard :todosLength="todos.length" @showModal="setShowModal">
        <template #newCardModal>
            <TodoUpdate :isModalShown="isModalShown" :todo="null" @closeModal="setShowModal" @updateTodo="updateTodo" />
        </template>
        <template #children>
            <TodoList :todos="todos" @updateTodo="updateTodo" @deleteTodo="deleteTodo"/>
        </template>
    </DatedCard>
</template>

<script>
import DatedCard from "./components/DatedCard"
import TodoList from "./components/TodoList"
import TodoUpdate from "./components/TodoUpdate"

import dataFetch from "./dataFetch"

import { v4 as uuidv4} from "uuid";


export default {
    name: "App",
    components: {
        DatedCard,
        TodoList,
        TodoUpdate
    },
    data: () => ({
        todos: [],
        isModalShown: false
    }),
    methods: {
        async updateTodo(todo) {
            let oldTodo = this.todos.filter(item => todo.id == item.id).shift();
            if(!oldTodo) {
                oldTodo = { id: uuidv4() , ...todo, isDone: false}
                await dataFetch.createTodo(oldTodo);
            }else{
                oldTodo = {...todo}
                await dataFetch.updateTodo(oldTodo);
            }
            const dataTodos = await dataFetch.getAllTodos();
            this.todos = dataTodos;
        },
        async deleteTodo(todoId) {
            await dataFetch.deleteTodo(todoId);
            const todos = await dataFetch.getAllTodos();
            this.todos = todos;
        },
        setShowModal(show) {
            this.isModalShown = show;
        }
    },
    mounted() {
        dataFetch.getAllTodos()
            .then(todos => this.todos = todos);
    }
}
</script>