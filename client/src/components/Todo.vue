<template>
    <div class="list-item-container"  ref="container">
        <md-list-item @contextmenu.prevent="handleContextMenu">
            <md-checkbox v-model="isDone" class="md-primary"/>
            <span class="md-list-item-text" :class="isDone ? 'done' : ''">{{todo.description}}</span>
            <md-subheader>{{todo.time}}</md-subheader>
        </md-list-item>
        <md-divider/>

        <md-menu :mdCloseOnClick="true" ref="contextMenu">
            <md-button md-menu-trigger ref="trigger"></md-button>

            <md-menu-content >
                <md-menu-item><md-button @click="setShowUpdate(true)">Uppdate</md-button></md-menu-item>
                <md-menu-item><md-button>Delete</md-button></md-menu-item>
            </md-menu-content>
        </md-menu>

        <TodoUpdate :showUpdate="showUpdate" @setShowUpdate="setShowUpdate" :todo="todo"/>
    </div>
</template>

<script>
import TodoUpdate from "./TodoUpdate"

export default {
    name: "Todo",
    props: {
        todo: Object,
    },
    components: {
        TodoUpdate
    },
    data: () => ({
        isDone: false,
        showUpdate: false
    }),
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .done {
        text-decoration: line-through;
        opacity: 0.5;
    }
    .list-item-container:hover {
        border-left: 3px solid $accent-color;
    }
    .md-list-item{
        padding: 0.5 * $default-font-size;
    }
    .container{
        position: relative;
    }
    .md-menu {
        position: fixed;

        .md-button{
            display: none;
        }
    }
</style>