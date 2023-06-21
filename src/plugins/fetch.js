export default {
  install(Vue) {
    Vue.prototype.$requestExecutor = function (
      query,
      callback = function () {}
    ) {
      fetch(this.$URL_API, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .catch((res) => {
          return callback(false, res.response);
        })
        .then((res) => {
          return callback(true, res);
        });
    };
  },
};
