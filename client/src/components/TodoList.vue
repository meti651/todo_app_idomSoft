<template>
    <div>
        <md-list>
            <div
                v-for="(todo, index) in todos"
                :key="todo.id"
                class="todo-container"
                :id="todo.id"
                :class="index % 2 === 0 && 'grayed'"
            >
                <Todo :todo="todo" @updateTodo="updateTodo" @deleteTodo="deleteTodo" />
            </div>
        </md-list>
    </div>
</template>

<script>
import Todo from "./Todo";

export default {
    name: "TodoList",
    components: {
        Todo,
    },
    props: {
        todos: Array,
    },
    methods: {
        updateTodo(todo) {
            this.$emit("updateTodo", todo);
        },
        deleteTodo(todoId) {
            this.$emit("deleteTodo", todoId);
        },
    },
};
</script>

<style lang="scss" scoped>
.grayed {
    background-color: rgb(250, 250, 250);
}
</style>
