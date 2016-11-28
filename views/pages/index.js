const template = require('../layouts/base.marko');

module.exports = function *() {
    template.render({
          title: 'Cherp || Code Hitchhiker'
    },
    this.res);
};
