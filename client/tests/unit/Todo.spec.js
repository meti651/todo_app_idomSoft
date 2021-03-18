import { shallowMount } from "@vue/test-utils";
import Todo from "@/components/Todo.vue";
import TodoUpdate from "@/components/TodoUpdate.vue";

import VueMaterial from "vue-material";
import Vue from "vue";
Vue.use(VueMaterial);

const dummyData = {
    id: '1',
    isDone: false,
    description: "Buy Pizza",
    time: "10:00"
}

describe("Todo.vue ", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Todo, {
            propsData: {
                todo: dummyData
            },
        })
    })

    test("renders", () => {
        expect(wrapper.exists()).toBe(true);
    })

    test("renders TodoUpdate", () => {
        expect(wrapper.findComponent(TodoUpdate).exists()).toBe(true);
    })

    test("TodoUpdate got the todo", async () => {
        expect(wrapper.findComponent(TodoUpdate).props().todo).toEqual(wrapper.props().todo);

        await wrapper.setProps({todo: {id: '2', description: "Walk Dog", isDone: true, time: "11:00"}})

        expect(wrapper.findComponent(TodoUpdate).props().todo).toEqual(wrapper.props().todo);
    })

    test("renders the time in correct format", async () => {
        expect(wrapper.findComponent({name: "md-subheader"}).text()).toBe("10:00 AM");

        await wrapper.setProps({todo: {id: '2', description: "Walk Dog", isDone: true, time: "14:00"}});

        expect(wrapper.findComponent({name: "md-subheader"}).text()).toBe("2:00 PM");
    })

    test("renders the description", () => {
        expect(wrapper.find(".md-list-item-text").exists()).toBe(true);
        expect(wrapper.find(".md-list-item-text").text()).toBe(wrapper.props().todo.description);
    })
})

describe("TodoList.vue interacts well with ", () => {
    let wrapper;
    let deleteSpy;

    beforeEach(() => {
        wrapper = shallowMount(Todo, {
            propsData:{
                todo: dummyData
            }
        })
    })

    test("adding the class 'done' to the todo description's wrapper", async () => {
        expect(wrapper.find(".md-list-item-text").classes()).not.toContain("done");

        await wrapper.setData({isDone: true});

        expect(wrapper.find(".md-list-item-text").classes()).toContain("done");
    })

    test("showing contextMenu", async () => {
        const spy = jest.spyOn(wrapper.vm, "handleContextMenu");

        wrapper.find(".md-list-item-text").trigger("contextmenu");
        await wrapper.vm.$nextTick();

        expect(spy).toHaveBeenCalled();
    })

    test("updating todo", async () => {
        const todoUpdateComponent = wrapper.findComponent(TodoUpdate);
        todoUpdateComponent.vm.$emit("updateTodo", dummyData);
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("updateTodo")).toBeTruthy();
    })

    test("close modal", async () => {
        const todoUpdateComponent = wrapper.findComponent(TodoUpdate);
        todoUpdateComponent.vm.$emit("closeModal", false);
        await wrapper.vm.$nextTick();
        expect(todoUpdateComponent.props().isModalShown).toBe(false)
    })
})
