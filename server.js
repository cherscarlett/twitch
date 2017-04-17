'use strict'

// this is what a file looks like when you hackathon willy-nilly with no plan

import 'babel-polyfill'
import Koa from 'koa'
import dotenv from 'dotenv'
import route from 'koa-route'
import serve from 'koa-static-folder'
import marko from 'marko'
import http from 'http'
import https from 'https'
import IO from 'socket.io'
import querystring from 'querystring'
import YT from 'ytmp3dl-core'
import fs  from 'fs-extra'

dotenv.config()

const app = new Koa
const port = process.env.PORT || '8888'
const HOSTNAMES = {
    self: process.env.HOSTNAME || 'localhost:' + port,
    spotify: {
        api: 'api.spotify.com',
        auth: 'accounts.spotify.com'
    },
    google: {
        api: 'www.googleapis.com'
    },
    soundcloud: {
        api: 'api.soundcloud.com'
    }
}
const CLIENT_IDS = {
    spotify: {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    },
    google: {
        api_key: process.env.GOOGLE_API_KEY
    },
    soundcloud: {
      id: process.env.SOUNDCLOUD_ID,
      secret: process.env.SOUNDCLOUD_SECRET,
      redirect_uri: process.env.SOUNDCLOUD_REDIRECT_URI
    }
}
const state = Math.round((Math.pow(36, 33) - Math.random() * Math.pow(36, 32))).toString(36).slice(1)

app
    .use(serve('./public'))
    .use(route.get('/', index))
    .use(route.get('/connect/:client_id', spotify))
    .use(route.get('/connect/:client_id/callback', callback))
    .use(route.get('/dashboard/:id', dashboard))
    .use(route.get('/overlays/:id', overlay))
    .use(route.get('/audio/:id', getTrackStream))

const server = http.createServer(app.callback())
const io = new IO(server)

function *index() {
    let data = {
        title: 'Cherp || Code Hitchhiker'
    }

    this.body = marko.load('./views/layouts/base.marko').stream(data)
    this.type = 'text/html'
}

function *overlay(id) {
    let template = './views/overlays/_' + id + '.marko'

    let data = {
             title: 'Cherp\'s Twitch Overlays',
             id: id
        }

    this.body = marko.load(template).stream(data)
    this.type = 'text/html'
}

function *dashboard(id) {
    let template = './views/dashboard/_' + id + '.marko'

    let data = {
             title: 'Cherp\'s Twitch Overlays',
             id: id
        }

    this.body = marko.load(template).stream(data)
    this.type = 'text/html'
}

io.on('connection', (socket) => {
    console.log('Socket open on server, listening for events.')

    socket.on('userConnectingToSpotify', (data) => {
        console.log(data.message)
    })

    socket.on('getAccessToken', (object) => {
        console.log('Retrieving access token for: ' + object.client)

        getAccessToken(object)
            .then((data) => getPlaylists(data, object))
            .catch((err) => console.log('Failed to get access token: ' + err))
    })

    socket.on('getPlaylistTracks', (object) => {
        console.log('Retrieving tracks from: ' + object.client)

        getPlaylistTracks(object)
            .then((data) => io.emit('tracksReady', data))
            .catch((err) => console.log('Failed to get tracks: ' + err))
    })

    socket.on('getTrack', (object) => {
        getYouTubeTrack(object)
            .then((data) => io.emit('trackLoaded', {data: object, id: JSON.parse(data).items[0].id.videoId}))
            .catch((err) => console.log('Failed to get track: ' + err))
    })

})

function *getTrackStream(id) {

    const audio = new (YT.Download)({ v: id })

    audio
        .on('success', result => processTrack(result))
        .callMethod('start')

    this.body = { "status" : 200 }
}

function *callback(client) {

    io.emit(client.toString() + 'Connected', this )
}

function *spotify() {
    let redirect_uri = 'http://' + HOSTNAMES.self + '/connect/spotify/callback'

    let url = 'https://' + HOSTNAMES.spotify.auth + '/authorize?client_id=' + CLIENT_IDS.spotify.client_id + '&response_type=code&redirect_uri=' + redirect_uri

    let data =  {
            url: url
    }

    this.type = 'application/json'
    this.body = data
}

function processTrack(file) {
    const filePath = 'public/files/audio.mp3'

    fs.unlinkSync(filePath)
    
    fs.move(file.file_location, filePath, function(err) {
        if (err) return console.error(err)
        io.emit('audioReady')
    })
}

function getYouTubeTrack(object) {
    let options = {
        method: 'GET',
        hostname: HOSTNAMES.google.api,
        path: '/youtube/v3/search?maxResults=1&part=id%2Csnippet&q=' + querystring.escape(object.artist) + '%20' + querystring.escape(object.name) + '&key=' + CLIENT_IDS.google.api_key
    }

    return new Promise((resolve, reject) => {

        let request = https.request(options, (response) => {
            let chunks = []

            response.on('data', function(chunk) {
                chunks.push(chunk)
            })

            response.on('end', () => {
                let body = Buffer.concat(chunks)
                resolve(body.toString())
            })
        })

        request.on('error', function(err) {
            reject(err)
        })

        request.end()
    })
}

function getPlaylistTracks(object) {
    let userId = 'twitchfm'

    let options = {
        method: 'GET',
        hostname: HOSTNAMES.spotify.api,
        path: '/v1/users/' + userId + '/playlists/' + object.id + '/tracks'
    }

    options.headers = {
        "Authorization": object.auth
    }

    return new Promise((resolve, reject) => {

        let request = https.request(options, (response) => {
            let chunks = []

            response.on('data', function(chunk) {
                chunks.push(chunk)
            })

            response.on('end', () => {
                let body = Buffer.concat(chunks)
                resolve(body.toString())
            })
        })

        request.on('error', function(err) {
            reject(err)
        })

        request.end()

    })
}

function getAccessToken(object) {
    let redirect_uri = 'http://' + HOSTNAMES.self + '/connect/'+ object.client +'/callback',
        path = '/api/token'

    let options =  {
        method: 'POST',
        hostname: HOSTNAMES.spotify.auth,
        path: path
    }

    let body = querystring.stringify({
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
        code: object.code
    })

    options.headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
        "Authorization": 'Basic ' + new Buffer(CLIENT_IDS.spotify.client_id + ':' + CLIENT_IDS.spotify.client_secret).toString('base64')
    }

    return new Promise((resolve, reject) => {
        let request = https.request(options, (response) => {
            let chunks = []

            response.on('data', function(chunk) {
                chunks.push(chunk)
            })

            response.on('end', (data) => {
                let body = Buffer.concat(chunks)
                resolve(body.toString())
            })
        })

        request.on('error', function(err) {
            reject(err)
        })

        request.write(body)

        request.end()

    })
}

function getPlaylists(data, object) {

    console.log('Loading playlists from: ' + object.client)

    let options = getPlaylistOptions(data, object)

    let collections = function(options) {
        return new Promise((resolve, reject) => {

            let request = https.request(options, (response) => {
                let chunks = []

                response.on('data', function(chunk) {
                    chunks.push(chunk)
                })
                .on('end', () => {
                    let body = Buffer.concat(chunks)
                    resolve({ data: body.toString(), auth: options.headers.Authorization})
                })
            })

            request.on('error', function(err) {
                reject(err)
            })

            request.end()

        })
    }

    collections(options).then( (data) => io.emit('playlistsReady', data))
}

function getPlaylistOptions(data, object) {

    let options = {}

    data = JSON.parse(data)

    if (object.client == 'spotify') {
        let userId = 'twitchfm'

        options.method = 'GET'
        options.hostname = HOSTNAMES.spotify.api
        options.path = '/v1/users/' + userId + '/playlists'
        options.headers = {
            "Authorization": data.token_type + ' ' + data.access_token
        }
    }

    return options
}

server.listen(port, () => console.log('Listening on port:' + port))

export default app
