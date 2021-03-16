<template>
    <DatedCard :todos="todos">
        <template #children>
            <TodoList :todos="todos" @updateTodo="updateTodo" @deleteTodo="deleteTodo"/>
        </template>
    </DatedCard>
</template>

<script>
import DatedCard from "./components/DatedCard"
import TodoList from "./components/TodoList"
import TodoUpdate from "./components/TodoUpdate"

export default {
    name: "App",
    components: {
        DatedCard,
        TodoList,
        TodoUpdate
    },
    data: () => ({
        todos: [],
    }),
    methods: {
        updateTodo(todo) {
            const oldTodo = this.todos.filter(item => item.id === todo.id).shift();
            oldTodo.description = todo.description;
            oldTodo.time = todo.time;
            oldTodo.isDone = todo.isDone;
        },
        deleteTodo(todoId) {
            this.todos = this.todos.filter(item => item.id !== todoId);
        }
    },
    mounted() {
        this.todos = [
            {
                id: 1,
                description: "Buy Pizza",
                time: "10:00",
                isDone: true
            },
            {
                id: 2,
                description: "Run",
                time: "11:00",
                isDone: false
            },
            {
                id: 3,
                description: "Walk Dog",
                time: "12:00",
                isDone: false
            },
            {
                id: 4,
                description: "Lunch",
                time: "13:00",
                isDone: false
            }
        ]
    }
}
</script>