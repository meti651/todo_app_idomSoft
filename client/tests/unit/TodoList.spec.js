import { shallowMount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";
import Todo from "@/components/Todo.vue";

import VueMaterial from "vue-material";
import Vue from "vue";
Vue.use(VueMaterial);

const dummyData = [
    {
        id: "1",
        description: "Buy Pizza",
        isDone: true,
        time: "8:00",
    },
    {
        id: "2",
        description: "Walk dog",
        isDone: false,
        time: "9:00",
    },
    {
        id: "3",
        description: "Meeting",
        isDone: false,
        time: "10:00",
    },
];

describe("TodoList.vue ", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TodoList, {
            propsData: {
                todos: dummyData,
            },
        });
    });

    test("gets rendered", () => {
        expect(wrapper.exists()).toBe(true);
    });

    test("renders Todo", () => {
        expect(wrapper.findComponent(Todo).exists()).toBe(true);
    });

    test("renders the correct amount of todos", async () => {
        expect(wrapper.findAllComponents(Todo).length).toBe(wrapper.props().todos.length)

        await wrapper.setProps({todos: [
            {
                id: "1",
                description: "Buy Pizza",
                isDone: true,
                time: "8:00",
            },
            {
                id: "2",
                description: "Walk dog",
                isDone: false,
                time: "9:00",
            },
        ]})

        expect(wrapper.findAllComponents(Todo).length).toBe(wrapper.props().todos.length)
    })

    test("every todo got his todo", () => {
        const todoComponents = wrapper.findAllComponents(Todo);

        todoComponents.wrappers.forEach(todoComponent => {
            expect(todoComponent.props().todo).toBeTruthy();
        })
    })

    test("every odd todo got 'grayed' class", () => {
        const todoComponentContainers = wrapper.findAll(".todo-container");

        expect(todoComponentContainers.at(0).classes()).toContain("grayed")
        expect(todoComponentContainers.at(1).classes()).not.toContain("grayed")
        expect(todoComponentContainers.at(2).classes()).toContain("grayed")
    })

    test("every todo component's container have the id attributes", () => {
        const containers = wrapper.findAll(".todo-container");
        const todoComponents = wrapper.findAllComponents(Todo);

        containers.wrappers.forEach((container, index) => {
            expect(container.attributes().id).toBe(todoComponents.at(index).props().todo.id);
        })
    })
});

describe("TodoList.vue interacts well with ", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TodoList, {
            propsData: {
                todos: dummyData,
            },
        });
    });

    test(" Todo's emitted events", async () => {
        const todoComponent = wrapper.findComponent(Todo);

        todoComponent.vm.$emit("updateTodo");
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("updateTodo"));

        todoComponent.vm.$emit("deleteTodo");
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("deleteTodo"));
    })
})
