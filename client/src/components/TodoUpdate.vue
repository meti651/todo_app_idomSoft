<template>
    <md-dialog :md-active.sync="showUpdate">
        <md-dialog-title>Update Todo, ID: {{todo.id}}</md-dialog-title>

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
                        <md-button type="submit" class="md-accent">Update</md-button>
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
    components: {
        
    },
    data: () => ({
        time: '',
        description: ''
    }),
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