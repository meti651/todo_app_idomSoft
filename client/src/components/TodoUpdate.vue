<template>
    <md-dialog :md-active.sync="showUpdate" :md-click-outside-to-close="false" :md-close-on-esc="false">
        <md-dialog-title v-if="todo">Update Todo, ID: <strong>{{todo.id}}</strong></md-dialog-title>
        <md-dialog-title v-else>Create Todo</md-dialog-title>

        <form @submit.prevent="updateTodo" class="md-layout">
            <md-card class="md-layout-item">
                <md-card-content>
                    <md-field>
                        <label for="description">Description</label>
                        <md-textarea name="description" v-model="description"/>
                    </md-field>
                    <md-field>
                        <md-icon>event</md-icon>
                        <label for="time">Time</label>
                        <md-input name="time" ref="timePickerInput" autocomplete="off" @focus="pickTime" v-model="time"/>
                        <vue-clock-picker v-model="time" ref="clockPicker" @timeset="setTime"></vue-clock-picker>
                    </md-field>
                    <md-card-actions>
                        <md-button class="md-accent" @click="closeModal">Cancel</md-button>
                        <md-button type="submit" class="md-accent" v-if="todo">Update</md-button>
                        <md-button type="submit" class="md-accent" v-else>Create</md-button>
                    </md-card-actions>
                </md-card-content>
            </md-card>
        </form>
    </md-dialog>
</template>

<script>

export default {
    name: "TodoUpdate",
    props: {
        showUpdate: Boolean,
        todo: Object
    },
    data() {
        return {
        time: this.todo ? this.todo.time : '00:00',
        description: this.todo ? this.todo.description : '',
        }
    },
    methods: {
        closeModal() {
            this.$emit('setShowUpdate', false)
        },
        pickTime() {
            const timePicker = this.$refs.clockPicker;

            timePicker.open();
        },
        setTime(time){
            this.time = time;
        },
        updateTodo(){
            this.closeModal();
            this.$emit("updateTodo", {description: this.description, time: this.time})
        }
    }
}
</script>

<style lang="scss">
.clock-picker__input{
    display: none;
}
.md-dialog-container{
    min-height: 500px;
    min-width: 330px;

    .md-textarea{
        height: 400px;
    }
}
</style>