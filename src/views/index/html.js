const content = require("./content.ejs");
const layout = require("@/layout/pc/index");
const publicInfo = require("@/layout/pc/public");
const props = {
  pageTitle: "首页",
  content: content(publicInfo),
};
module.exports = layout.run(props);
