var socket = io(window.location.host),
    visualizerEl = document.querySelector('.visualizer-container'),
    visualizer,
    audio;

if (visualizerEl) {
    visualizer = new Vue({
    el: '.visualizer-container',
    data: {
        track: null,
        loading: true,
        playlist: null,
        index: null
    },
        methods: {

        }
    });
}

// todo: get current track from dashboard

socket.on('trackLoaded', (track) =>  {
    visualizer.track = track;
    visualizer.loading = false;

    var request = new XMLHttpRequest(),
        url = '/audio/' + track.id;

    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            console.log('Loading the track...');
        } else {
            console.log('There was an error.');
        }
    };

    request.onerror = function() {
        console.log('There was an error.');
    };

    request.send();
});

socket.on('audioReady', () => {
    console.log('Playing audio...');
    if (audio && audio.currentTime > 0) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    audio = new Audio('/public/files/audio.mp3');
    audio.play();
});
