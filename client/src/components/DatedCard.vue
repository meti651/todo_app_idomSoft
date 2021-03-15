<template>
    <div :id="$style.container">
        <md-card>
            <md-card-header>
                <div class="md-title accent">
                    <strong>{{day}}</strong>, {{date}}
                    <md-subheader>{{month}}</md-subheader>
                </div>
                <md-subheader>{{todos.length}} Tasks</md-subheader>
            </md-card-header>

            <md-card-actions @click="addNewTodo">
                <md-button class="md-icon-button md-raised md-primary">
                    <md-icon class="md-default">add</md-icon>
                </md-button>
            </md-card-actions>

            <md-divider/>

            <md-card-content>
                <slot name="children"></slot>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const days = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    export default {
        name: "DatedCard",
        props: {
            todos: Array
        },
        data: () => ({
            dateObject: new Date()
        }),
        computed: {
            day() {
                return days[this.dateObject.getDay()]
            },
            month() {
                return months[this.dateObject.getMonth()]
            },
            date() {
                const date = this.dateObject.getDate();
                
                if(date > 3 && date < 21) return date + "th";
                
                let nth;

                switch (date % 10){
                    case 1: {
                        nth = "st";
                        break;
                    }
                    case 2: {
                        nth = "nd";
                        break;
                    }
                    case 2: {
                        nth = "rd";
                        break;
                    }
                    default: nth = "th";
                }

                return date + nth;
            }
        },
        methods: {
            addNewTodo() {}
        }
    }
</script>

<style lang="scss" scoped>
    .md-card {
        width: 100%;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        border-radius: 10px;

        .md-card-header{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-top: 2 * $default-font-size;
            padding-left: 2 * $default-font-size;
        }

        .md-card-content {
            padding-left: 0; 
            padding-right: 0; 
        }

        .accent{
            color: $accent-color;
        }

        .md-card-actions{
            position: absolute;
            right: 1.5 * $default-font-size;
            transform: translateY(-50%);
            z-index: 1;

            .md-button{
                height: 3 * $default-font-size;
                width: 3 * $default-font-size;
            }
        }
    }
</style>

<style module lang="scss">
    #container{
        display: grid;
        place-items: center;
        width: 90%;
        max-width: 400px;
    }
</style>

