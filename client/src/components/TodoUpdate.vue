<template>
    <md-dialog :md-active.sync="showUpdate">
        <md-dialog-title>Update Todo, ID: {{todo.id}}</md-dialog-title>

        <form @submit.prevent="clickHandle">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="description">Description</label>
                                <md-input name="description" v-model="description"/>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <md-icon>event</md-icon>
                                <label>Time</label>
                                <md-input v-model="time"></md-input>
                            </md-field>
                        </div>
                    </div>
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
        clickHandle(e) {
            this.$emit('setShowUpdate', false)
        },
    }
}
</script>

<style lang="scss" scoped>
</style>