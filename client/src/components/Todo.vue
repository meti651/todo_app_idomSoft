<template>
    <div class="list-item-container" ref="container">
        <md-list-item @contextmenu.prevent="handleContextMenu">
            <md-checkbox v-model="isDone" class="md-primary" @change="updateTodo"/>
            <span class="md-list-item-text" :class="isDone ? 'done' : ''">{{ todo.description }}</span>
            <md-subheader>{{ time }} {{ timeOfDay }}</md-subheader>
        </md-list-item>
        <md-divider />

        <md-menu :mdCloseOnClick="true" ref="contextMenu">
            <md-button md-menu-trigger ref="trigger"></md-button>

            <md-menu-content class="options">
                <md-button @click="setShowUpdate(true)" class="update-btn">Update</md-button>
                <md-button @click="deleteTodo" class="delete-btn">Delete</md-button>
            </md-menu-content>
        </md-menu>

        <TodoUpdate :isModalShown="showUpdate" :todo="todo" @closeModal="setShowUpdate" @updateTodo="updateTodo" />
    </div>
</template>

<script>
export default {
    name: "Todo",
    props: {
        todo: {
            id: String,
            isDone: Boolean,
            description: String,
            time: String,
        },
    },
    components: {
        TodoUpdate: () => import("./TodoUpdate"),
    },
    data() {
        return {
            isDone: this.todo.isDone || false,
            showUpdate: false,
            timeOfDay: "AM",
        };
    },
    methods: {
        handleContextMenu(e) {
            const triggerBtn = this.$refs.trigger.$el;

            triggerBtn.click();

            const contextMenu = this.$refs.contextMenu.$el;
            contextMenu.style.top = e.clientY + "px";
            contextMenu.style.left = e.clientX + "px";
        },
        setShowUpdate(showUpdate) {
            this.showUpdate = showUpdate;
        },
        updateTodo(todo) {
            this.$emit("updateTodo", {
                isDone: this.isDone,
                description: todo.description || this.todo.description,
                time: todo.time || this.todo.time,
                id: this.todo.id,
            });
        },
        deleteTodo() {
            this.$emit("deleteTodo", this.todo.id);
        },
    },
    computed: {
        time() {
            let [hour, minute] = this.todo.time.split(":");
            if (+hour > 12) {
                this.timeOfDay = "PM";
                return [(+hour - 12).toString(), minute].join(":");
            }
            return this.todo.time;
        },
    },
};
</script>

<style lang="scss" scoped>
.done {
    text-decoration: line-through;
    opacity: 0.5;
}
.list-item-container:hover {
    border-left: 3px solid $accent-color;
}
.md-list-item {
    padding: 0.5 * $default-font-size;
}
.container {
    position: relative;
}
.md-menu {
    position: fixed;

    .md-button {
        display: none;
    }
}
.options {
    .md-button {
        margin-left: 8px;
    }
}
</style>
