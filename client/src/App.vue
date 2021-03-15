<template>
    <DatedCard :todos="todos">
        <template #children>
            <TodoList :todos="todos"/>
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
    mounted() {
            this.todos = [
                {
                    id: 1,
                    description: "Buy Pizza",
                    time: "10:00AM"
                },
                {
                    id: 2,
                    description: "Run",
                    time: "11:00AM"
                },
                {
                    id: 3,
                    description: "Walk Dog",
                    time: "12:00AM"
                },
                {
                    id: 4,
                    description: "Lunch",
                    time: "13:00AM"
                }
            ]
            
        }
}
</script>