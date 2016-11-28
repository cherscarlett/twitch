function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><title>" +
      escapeXml(data.title) +
      "</title><link rel=\"stylesheet\" type=\"text/css\" href=\"/public/stylesheets/base.css\"><link rel=\"icon\" href=\"/public/favicon.png\" sizes=\"64x64\" type=\"image/png\"><meta charset=\"utf-8\"><meta name=\"lang\" content=\"enUS\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes\"><meta name=\"author\" content=\"Cher Stewart\"></head><body><header><h1= data.title></h1=></header></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
