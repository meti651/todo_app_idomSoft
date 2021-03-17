import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";

import App from "@/App.vue";
import DatedCard from "@/components/DatedCard";
import TodoList from "@/components/TodoList";
import TodoUpdate from "@/components/TodoUpdate";

import dataFetch from "@/dataFetch";


jest.mock("@/dataFetch", () => {
    return {
        __esModule: true,
        default: {
            getAllTodos: jest.fn(() => Promise.resolve().then(() => [
                {
                    id: '1',
                    description: "Buy Pizza",
                    isDone: true,
                    time: "8:00"
                },
                {
                    id: '2',
                    description: "Walk dog",
                    isDone: false,
                    time: "9:00"
                },
                {
                    id: '3',
                    description: "Meeting",
                    isDone: false,
                    time: "8:00"
                },
            ])),
            updateTodo: jest.fn(() => Promise.resolve().then(() => {})),
            deleteTodo: jest.fn(() => Promise.resolve().then(() => {})),
            createTodo: jest.fn(() => Promise.resolve().then(() => {})),
        }
    }
});

const dummyData = [
    {
        id: '1',
        description: "Buy Pizza",
        isDone: true,
        time: "8:00"
    },
    {
        id: '2',
        description: "Walk dog",
        isDone: false,
        time: "9:00"
    },
    {
        id: '3',
        description: "Meeting",
        isDone: false,
        time: "8:00"
    },
]

describe("App.vue ", () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = shallowMount(App);
        await flushPromises();
    })

    test("dataFetch is mocked", async () => {
        const todos = await dataFetch.getAllTodos();
        expect(todos).toEqual(dummyData);
    })

    test("renders DatedCard", () => {
        expect(wrapper.findComponent(DatedCard).exists()).toBe(true);
    })

    test("renders TodoList", () => {
        expect(wrapper.findComponent(TodoList).exists()).toBe(true);
    })
    
    test("renders TodoUpdate", () => {
        expect(wrapper.findComponent(TodoUpdate).exists()).toBe(true);
    })

    test("gives the todos to DatedCard and TodoList", () => {
        expect(wrapper.findComponent(DatedCard).props().todos).toEqual(dummyData);
        expect(wrapper.findComponent(TodoList).props().todos).toEqual(dummyData);
    })
})

describe("App.vue interacts well with", () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = shallowMount(App);
        await flushPromises();
    })

    test("showing and closing the new todo modal", async () => {
        const datedCard = wrapper.findComponent(DatedCard);

        const todoUpdate = wrapper.findComponent(TodoUpdate);
        expect(todoUpdate.props().isModalShown).toBe(false);

        datedCard.vm.$emit("showModal", true);
        await wrapper.vm.$nextTick();

        expect(todoUpdate.props().isModalShown).toBe(true);

        todoUpdate.vm.$emit("closeModal", false)
        await wrapper.vm.$nextTick()

        expect(todoUpdate.props().isModalShown).toBe(false);
    })

    test("creating a new todo", () => {
        const todoUpdate = wrapper.findComponent(TodoUpdate);
        const spy = jest.spyOn(dataFetch, "createTodo");

        todoUpdate.vm.$emit("updateTodo", {id: '4', description: "New todo", time: "12:00"})
        expect(spy).toHaveBeenCalled();
    })
    
    test("updating the todos", async () => {
        const todoList = wrapper.findComponent(TodoList);
        const spy = jest.spyOn(dataFetch, "updateTodo");

        todoList.vm.$emit("updateTodo", {id: '1', description: "Run", isDone: false, time: "10:00"});
        expect(spy).toHaveBeenCalled();
    })
    
    test("deleting the todos", async () => {
        const todoList = wrapper.findComponent(TodoList);
        const spy = jest.spyOn(dataFetch, "deleteTodo");

        todoList.vm.$emit("deleteTodo", 1);
        expect(spy).toHaveBeenCalled();
    })
})
