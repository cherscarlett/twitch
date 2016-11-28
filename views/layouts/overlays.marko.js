function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      classAttr = __helpers.ca,
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><title>" +
      escapeXml(data.title) +
      "</title><link rel=\"stylesheet\" type=\"text/css\" href=\"/public/stylesheets/overlays.css\"></head><body" +
      classAttr(data.id) +
      "><svg height=\"66\" width=\"66\" class=\"background-square-container\"><polygon points=\"0 0 0 66 66 66 66 0\" class=\"background-square\"></polygon></svg>");

    (function() {
      for (var i = 0; i <= 25; i++) {
        out.w("<svg height=\"66\" width=\"66\"" +
          attr("data-index", i) +
          " class=\"background-square-filled\"><polygon points=\"0 0 0 66 66 66 66 0\"></polygon></svg>");
      }
    }());

    (function() {
      for (var i = 0; i <= 25; i++) {
        out.w("<svg height=\"3\" width=\"3\"" +
          attr("data-index", i) +
          " class=\"background-dot-highlight\"><polygon points=\"0 0 0 3 3 3 3 0\"></polygon></svg>");
      }
    }());

    out.w("</body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
