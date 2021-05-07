//node server which will handle socket io connection
const io = require('socket.io')(3000)

const users = {};

io.on('connection',socket => {
    socket.on('new-user-joined', name => {
       // console.log("New user",name);
        users[socket.id] = name; //append users
        socket.broadcast.emit('user-joined',name); //broadcast message that user has joined
    });
    socket.on('send',message => {
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });
   
    socket.on('disconnect',message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

})