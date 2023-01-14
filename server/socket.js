const { server } = require('./index.js');

const io = socketio(server, {
    pingTimeout: 60000,
  });

io.on('connection', (socket) => {
    socket.on('createRoom', ({userID}) => {
        socket.join(userID);
        console.log(`user has joined roomID ${userID}`);
    });
    socket.on('invite', async ({ data }) => {
        let chat,
        usersID  = data.usersID;
        adminID = data.adminID;
        console.log('inviting');

        const chatroomExists = (await Chat.exists(
            {users : {$all : usersID}
        }) || await GroupChat.exists(
            {users : {$all : usersID}
        }));

        if (!chatroomExists) {
            const len = usersID.length;
            const club = data.club;
            chat = new GroupChat( {
                users: usersID,
                admin: adminID,
                messages: [],
                club: club,
            }); 
            console.log("Hello")
            chat.users.forEach(async (userID) => {
            const user = await User.findOne({_id: userID});
            user.groupChats.push(chat)
            await user.save()
            });
            await chat.save()
            const newChat = { created: chat};
            console.log(`sent`);
            usersID.forEach((userID) => {
                io.to(userID).emit("groupChatroom", { newChat });
            })
        } else {
            console.log("Exists")
        };
    });


    // Will likely need to pass mongo ID for instant messaging and matching -> 
    // Can figure that out when we talk about architecture
    socket.on('join', async ({ name, roomName, roomId, email, avi }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, roomName, roomId, email, avi });
        console.log(user.roomId);
        if (error) return useCallback(error);

        socket.emit('message', { user: { id: "111111", name: 'admin', room: "adminRoom", email: "admin@admin.com", avi: "1" }, text: `${user.name}, welcome to the room, ${user.roomName}` });
        socket.broadcast.to(user.roomId).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        socket.join(user.roomId);
        console.log("user has joined!");
        io.to(user.roomId).emit('roomData', { room: user.roomId, users: getUsersInRoom(user.roomId) });
        io.emit('roomDataGlobal', { room: user.roomId, newUsers: getUsersInRoom(user.roomId) });

        callback();
    });

    socket.on('disconnect', () => {
        console.log("user disconnecting");
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: { id: "111111", name: 'admin', room: "adminRoom", email: "admin@admin.com", avi: "1" }, text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            io.emit('roomDataGlobal', { room: user.room, newUsers: getUserNamesInRoom(user.room) });
        }
    });


    socket.on('sendMessage', async (message, callback) => {
        const user = getUser(socket.id);

        const userDB = await User.findOne({ email: user.email });

        const newMessage = new Message({
            user: userDB,
            username: userDB.username,
            userAvi: userDB.avi,
            text: message,
        })
        await newMessage.save();

        const chatroom = await Chatroom.findById(user.roomId);
        chatroom.messages.push(newMessage);

        chatroom.save();
        io.to(user.roomId).emit('message', { user: user, text: message });
        io.to(user.roomId).emit('roomData', { room: user.roomId, users: getUsersInRoom(user.roomId) });
        io.emit('roomDataGlobal', { room: user.roomId, newUsers: getUsersInRoom(user.roomId) });


        callback();
    });

    // Will emit a list of names indexed according to the chatRooms variable
    socket.on('getRooms', (chatRooms) => {
        let rooms = [];
        for (let i = 0; i < chatRooms.length; i++) {
            let roomName = chatRooms[i].name.trim().toLowerCase();
            console.log(roomName);
            let roomUsers = getUsersInRoom(roomName);
            rooms.push(roomUsers);
        }
        console.log(rooms);
        io.emit('allRooms', rooms);
    });
    socket.on('getRoom', (roomName) => {
        console.log(roomName);
        io.emit('roomDataGlobal', { room: roomName, newUsers: getUsersInRoom(roomName.trim().toLowerCase()) });
    })
});
