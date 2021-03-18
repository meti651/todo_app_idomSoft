import { shallowMount, createLocalVue, config } from "@vue/test-utils";

import TodoUpdate from "@/components/TodoUpdate.vue";

import VueMaterial from "vue-material";
const localVue = createLocalVue();
localVue.use(VueMaterial);

import VueClockPickerPlugin from "@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.plugin.js";
localVue.use(VueClockPickerPlugin);

const dummyData = {
    id: "1",
    description: "Buy Pizza",
    time: "10:00",
    isDone: false,
};

config.mocks["open"] = () => {};

describe("TodoUpdate.vue ", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TodoUpdate, {
            localVue,
            propsData: {
                todo: dummyData,
            },
        });
    });

    test("renders", () => {
        expect(wrapper.exists()).toBe(true);
    });

    test("renders the correct id, if got todo", async () => {
        expect(wrapper.findComponent({ name: "md-dialog-title" }).text()).toEqual("Update Todo, ID: 1");

        await wrapper.setProps({ todo: { id: "2", description: "Walk dog", isDone: true, time: "11:00" } });

        expect(wrapper.findComponent({ name: "md-dialog-title" }).text()).toEqual("Update Todo, ID: 2");
    });

    test("renders Create todo, if got no todo", async () => {
        expect(wrapper.findComponent({ name: "md-dialog-title" }).text()).toEqual("Update Todo, ID: 1");

        await wrapper.setProps({ todo: null });

        expect(wrapper.findComponent({ name: "md-dialog-title" }).text()).toEqual("Create Todo");
    });

    test("renders Create button if got no todo", async () => {
        expect(
            wrapper
                .findAllComponents({ name: "md-button" })
                .at(1)
                .text()
        ).toEqual("Update");

        await wrapper.setProps({ todo: null });

        expect(
            wrapper
                .findAllComponents({ name: "md-button" })
                .at(1)
                .text()
        ).toEqual("Create");
    });

    test("renders with initial values", async () => {
        expect(wrapper.findComponent({ name: "md-textarea" }).props().value).toEqual(dummyData.description);
        expect(wrapper.findComponent({ name: "md-input" }).props().value).toEqual(dummyData.time);

        await wrapper.setProps({ todo: null });

        expect(wrapper.findComponent({ name: "md-textarea" }).props().value).toEqual("");
        expect(wrapper.findComponent({ name: "md-input" }).props().value).toEqual("00:00");
    });

    test("renders the correct data", async () => {
        expect(wrapper.findComponent({ name: "md-textarea" }).props().value).toEqual(dummyData.description);
        expect(wrapper.findComponent({ name: "md-input" }).props().value).toEqual(dummyData.time);

        await wrapper.setProps({ todo: { id: "2", description: "Walk dog", isDone: true, time: "11:00" } });

        expect(wrapper.findComponent({ name: "md-textarea" }).props().value).toEqual("Walk dog");
        expect(wrapper.findComponent({ name: "md-input" }).props().value).toEqual("11:00");
    });
});

describe("TodoUpdate interacts well with ", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(TodoUpdate, {
            localVue,
            propsData: {
                todo: dummyData,
            },
        });
    });

    test("focusing the input open the time picker component", async () => {
        const spy = jest.spyOn(wrapper.vm, "pickTime");
        const input = wrapper.findComponent({ name: "md-input" });
        await input.vm.$emit("focus");

        expect(spy).toHaveBeenCalled();
    });

    test("time is setting in the input", async () => {
        expect(wrapper.findComponent({ name: "md-input" }).props().value).toEqual(dummyData.time);

        const clockPicker = wrapper.findComponent({ ref: "clockPicker" });
        clockPicker.vm.$emit("timeset", "12:00");
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent({ name: "md-input" }).props().value).toEqual("12:00");
    });

    test("closing the modal", async () => {
        const cancelButton = wrapper.findComponent({ name: "md-button" });
        cancelButton.vm.$emit("click");
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("closeModal")).toBeTruthy();
    });

    test("submitting the update", async () => {
        const form = wrapper.find("form");
        form.trigger("submit");
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("closeModal")).toBeTruthy();
        expect(wrapper.emitted("updateTodo")).toBeTruthy();
    });
});
