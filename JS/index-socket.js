var socket = io();

socket.on('connect', () => {
    console.log('Connectd to Server');

    // socket.emit('createMessage', {
    //     from: 'PapaKaancha',
    //     text: 'Humse!'
    // });

});

socket.on('disconnect', () => {
    console.log('Disconnected from Sever');
});

socket.on('newMessage', (message) => {
    console.log('New message emitted from server!', message);
});
