var socket = io(window.location.host),
    visualizerEl = document.querySelector('.visualizer-container'),
    visualizer;

if (visualizerEl) {
    visualizer = new Vue({
    el: '.visualizer-container',
    data: {
        track: null,
        loading: true
    },
        methods: {

        }
    });
}

socket.on('trackLoaded', (track) =>  {
    visualizer.track = track;
});
