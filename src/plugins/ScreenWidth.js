export default {
  install(Vue) {
    const screenWidth = Vue.observable({
      value: window.innerWidth,
    });

    Object.defineProperty(Vue.prototype, "$sw", {
      get() {
        return screenWidth.value;
      },
      set(value) {
        screenWidth.value = value;
      },
    });

    window.addEventListener("resize", () => {
      Vue.prototype.$sw = window.innerWidth;
    });
  },
};
