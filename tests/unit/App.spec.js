import App from "@/App.vue";
import { mount } from "@vue/test-utils";

const createWrapper = (props) => {
  return mount(App, props);
};

describe("App.vue", () => {
  it("should render", () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it("should start with 0 clicks", () => {
    const wrapper = createWrapper();
    const count = wrapper.get("#count");
    expect(count.text()).toBe("0");
  });

  it("should increment count when button is clicked", async () => {
    const wrapper = createWrapper();
    const btn = wrapper.get("#increment-btn");
    const beforeCount = wrapper.get("#count");
    expect(beforeCount.text()).toBe("0");
    await btn.trigger("click");
    const afterCount = wrapper.get("#count");
    expect(afterCount.text()).toBe("2");
  });
});
