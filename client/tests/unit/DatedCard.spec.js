import { shallowMount } from "@vue/test-utils";
import DatedCard from "@/components/DatedCard";

import Vue from "vue";
import VueMaterial from "vue-material";
Vue.use(VueMaterial);

describe("DatedCard.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DatedCard, {
      propsData: {
        todosLength: 2
      },
    });
  });

  test("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("renders actual date", () => {
    const title = wrapper.find(".md-title");
    const today = new Date();
    const [day, month, date] = today.toDateString().split(" ");

    expect(title.text().includes(day)).toBe(true);
    expect(title.text().includes(month)).toBe(true);
    expect(title.text().includes(date)).toBe(true);
  })

  test("renders the correct amount of todos", async () => {
      expect(wrapper.find(".tasks-amount").text().includes(wrapper.props().todosLength)).toBe(true);

      wrapper.setProps({
          todosLength: 4
      })
      await wrapper.vm.$nextTick()

      expect(wrapper.find(".tasks-amount").text().includes(wrapper.props().todosLength)).toBe(true);
  })
});
