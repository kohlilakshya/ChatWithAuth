// Make connection
const socket = io.connect('http://localhost:5000');

// Query DOM
const message = document.getElementById('message'),
    // handle = document.getElementById('handle'),
    handle = USER_NAME,
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


//Emit event, jab button dabaye send ka
//'chat' is the name of the message      

// Emit events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: USER_NAME
    });
    message.value = "";
});

message.addEventListener('keypress', () => {
    socket.emit('typing', USER_NAME);
});


// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    const hide = setTimeout(()=>{
        feedback.innerHTML = '';
    }, 2400);
});
