<template>
    <DatedCard :todos="todos" @showModal="setShowModal">
        <template #children>
            <TodoList :todos="todos" @updateTodo="updateTodo" @deleteTodo="deleteTodo"/>
        </template>
        <template #newCardModal>
            <TodoUpdate :showUpdate="showModal" :todo="null" @setShowUpdate="setShowModal" @updateTodo="updateTodo" />
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
        showModal: false
    }),
    methods: {
        updateTodo(todo) {
            let oldTodo = this.todos.filter(item => item.id === todo.id).shift();
            if(!oldTodo) {
                oldTodo = { id: this.todos.length + 1 }
                this.todos.push(oldTodo);
            }
            oldTodo.description = todo.description;
            oldTodo.time = todo.time;
            oldTodo.isDone = todo.isDone;
        },
        deleteTodo(todoId) {
            this.todos = this.todos.filter(item => item.id !== todoId);
        },
        setShowModal(show) {
            this.showModal = show;
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