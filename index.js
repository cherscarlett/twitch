'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [index, overlay].map(regeneratorRuntime.mark);

var app = new _koa2.default();

var route = require('koa-route'),
    serve = require('koa-static-folder'),
    marko = require('marko');

var port = process.env.PORT || '8888';

app.use(serve('./public')).use(route.get('/', index)).use(route.get('/overlays/:id', overlay));

function index() {
    var data;
    return regeneratorRuntime.wrap(function index$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    data = {
                        title: 'Cherp || Code Hitchhiker'
                    };


                    this.body = marko.load('./views/layouts/base.marko').stream(data);
                    this.type = 'text/html';

                case 3:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

function overlay(id) {
    var template, context;
    return regeneratorRuntime.wrap(function overlay$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    template = './views/overlays/_' + id + '.marko';
                    context = {
                        title: 'Cherp\'s Twitch Overlays',
                        id: id
                    };


                    this.body = marko.load(template).stream(context);
                    this.type = 'text/html';

                case 4:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
}

app.listen(port, function () {
    return console.log('Listening on port:' + port);
});

exports.default = app;
