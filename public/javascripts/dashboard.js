var connectLink = document.querySelector('a.connect'),
    socket = io(window.location.host),
    newWindow,
    visualizer,
    dashboard,
    dashboardEl;

connectLink.addEventListener('click', handleConnect);

dashboardEl = document.querySelector('.dashboard');

if (dashboardEl) {
    dashboard = new Vue({
        el: '.dashboard',
        data: {
            playlists: [],
            connected: false,
            loading: false,
            auth: null,
            currentTracks: []
        },
        methods: {
            connect: function(event) {
                handleConnect(event);
            },
            tracks: function(event, id) {
                loadTracks(event, id);
            },
            track: function(event, index, artist, name) {
                var thisTrack = {
                    index: index,
                    artist: artist,
                    name: name,
                    event: event
                }

                loadTrack(thisTrack);
            }
        }
    });
}

function handleConnect(event) {
    event.preventDefault();

    var request = new XMLHttpRequest(),
        url = event.target.href;

    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            socket.emit('userConnectingToSpotify', { message: 'Connecting to: ' + data.url });
            popup(data.url);
        } else {
            console.log('There was an error.');
        }
    };

    request.onerror = function() {
        console.log('There was an error.');
    };

    request.send();
}

function loadTrack(track) {

    var currentlyPlayingItem = document.querySelector('.track.is-playing');

    currentlyPlayingItem && currentlyPlayingItem.classList.remove('is-playing');

    var newCurrentlyPlayingItem = track.event.currentTarget;

    newCurrentlyPlayingItem.classList.add('is-playing');

    socket.emit('playTrack', track);
}

function loadTracks(event, id) {
    var object =  {
        id: id,
        client: 'spotify',
        auth: dashboard.auth
    }
    dashboard.loading = true;

    var currentlyPlayingItem = document.querySelector('.playlist.is-playing');

    currentlyPlayingItem && currentlyPlayingItem.classList.remove('is-playing');

    var newCurrentlyPlayingItem = event.currentTarget;

    newCurrentlyPlayingItem.classList.add('is-playing');

    socket.emit('getPlaylistTracks' , object);

}

function popup(url) {
    newWindow = window.open(url, 'name', 'height=500,width=350');

    if (window.focus) {
        newWindow.focus();
    }
}


socket.on('spotifyConnected', (data) => {
    console.log('Successfully connected to Spotify.');
    dashboard.connected = true;
    dashboard.loading = true;

    newWindow.close();

    var object = {
        code: data.originalUrl.split('?code=')[1],
        client: 'spotify'
    }

    socket.emit('getAccessToken' , object);
});

socket.on('playlistsReady', (data) => {
    console.log('Successfully retrieved playlists.');

    var json = JSON.parse(data.data),
        auth = data.auth;

    dashboard.playlists = json.items;
    dashboard.loading = false;
    dashboard.auth = auth;
});

socket.on('tracksReady', (data) => {
    var json = JSON.parse(data);
    dashboard.currentTracks = json.items;
    dashboard.loading = false;
    var firstTrack = {
        index: 0,
        name: json.items[0].track.name,
        artist: json.items[0].track.artists[0].name
    }

    socket.emit('playTrack', firstTrack);
});

socket.on('nextTrack', (index) => {
    console.log(index);
});
