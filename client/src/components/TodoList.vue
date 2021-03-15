<template>
    <div>
        <md-list>
            <div v-for="todo, index in todos" :key="todo.id" :class="index % 2 === 0 && 'grayed'">
                <Todo :todo="todo"/>
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
    
}
</script>

<style lang="scss" scoped>
    .grayed{
        background-color: rgb(250, 250, 250);
    }
</style>

