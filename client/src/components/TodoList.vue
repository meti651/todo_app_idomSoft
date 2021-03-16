<template>
    <div>
        <md-list>
            <div v-for="todo, index in orderedTodos" :key="todo.id" :class="index % 2 === 0 && 'grayed'">
                <Todo :todo="todo" @updateTodo="updateTodo" @deleteTodo="deleteTodo"/>
            </div>
        </md-list>
    </div>
</template>

<script>
import Todo from "./Todo"

export default {
    name: "TodoList",
    components: {
        Todo
    },
    props: {
        todos: Array,
    },
    computed: {
        orderedTodos() {
            return this.todos.sort((a, b) => a.time > b.time ? 1 : -1)
        }
    },
    methods: {
        updateTodo(todo){
            this.$emit("updateTodo", todo)
        },
        deleteTodo(todoId){
            this.$emit("deleteTodo", todoId)
        }
    }
}
</script>

<style lang="scss" scoped>
    .grayed{
        background-color: rgb(250, 250, 250);
    }
</style>

