import Button from "@/components/Button.vue";
import { shallowMount } from "@vue/test-utils";

const createWrapper = (props) => {
  return shallowMount(Button, props);
};

describe("Button.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = createWrapper({
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
