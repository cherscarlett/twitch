function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      classAttr = __helpers.ca,
      __loadTag = __helpers.t,
      layout_placeholder_tag = __loadTag(require("marko/taglibs/layout/placeholder-tag"));

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><title>" +
      escapeXml(data.title) +
      "</title><link rel=\"stylesheet\" type=\"text/css\" href=\"/public/stylesheets/overlays.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"https://fonts.googleapis.com/css?family=Amatic+SC\"></head><body" +
      classAttr(data.id) +
      ">");

    layout_placeholder_tag({
        name: "body",
        content: data.layoutContent
      }, out);

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
