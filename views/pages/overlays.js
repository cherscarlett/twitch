const template = require('../layouts/overlays.marko');

module.exports = function *(id) {
    template.render({
          title: 'Cherp\'s Overlays',
          id: id
    },
    this.res);
};
