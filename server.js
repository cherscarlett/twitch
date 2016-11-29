'use strict';

import 'babel-polyfill';
import Koa from 'koa';

const app = new Koa;

let route = require('koa-route'),
    serve = require('koa-static-folder'),
    marko = require('marko');

const port = process.env.PORT || '8888';

app
    .use(serve('./public'))
    .use(route.get('/', index))
    .use(route.get('/overlays/:id', overlay));

function *index() {
    let data = {
        title: 'Cherp || Code Hitchhiker'
    }

    this.body = marko.load('./views/layouts/base.marko').stream(data);
    this.type = 'text/html';
}

function *overlay(id) {
    let data = {
        title: 'Cherp\'s Twitch Overlays: ' + id.charAt(0).toUpperCase(),
        id: id
    }

    this.body = marko.load('./views/layouts/overlays.marko').stream(data);
    this.type = 'text/html';
}

app.listen(port, () => console.log('Listening on port:' + port));

export default app;
