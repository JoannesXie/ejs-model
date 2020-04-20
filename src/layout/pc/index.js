const layout = require("./html.ejs"); // 整个页面布局的模板文件，主要是用来统筹各个公共组件的结构
const publicInfo = require("./public");
const moduleExports = {
  run(props) {
    const renderData = {
      pageTitle: "",
      header: "",
      navigator: "",
      content: "",
      footer: "",
    };
    Object.assign(renderData, publicInfo, props);
    return layout(renderData);
  },
};
module.exports = moduleExports;
