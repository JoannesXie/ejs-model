const content = require("./content.ejs");
const layout = require("@/layout/pc");
const publicInfo = require("@/layout/pc/public");
const props = {
  pageTitle: "关于我们",
  content: content(),
};
module.exports = layout.run(props);
