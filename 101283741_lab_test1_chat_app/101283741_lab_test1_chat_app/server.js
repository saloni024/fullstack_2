const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const cors = require('cors')

const userModel = require('./model/users');
const userdataModel = require('./model/userdata');

const io = require('socket.io')(http)
const PORT = 8081
const userData = require('./controller/userdata.js')

var bodyParser = require('body-parser')
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({   
    extended: true
})); 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))



const url = 'mongodb+srv://saloni:101283741@comp3133.iblld.mongodb.net/chat_app?retryWrites=true&w=majority'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection', err)
});

app.use(userData)



io.on("connection", (socket) => {
  console.log(`${socket.id} Connected`);

  socket.emit("welcome", "Welcome to chat app : " + socket.id);
  var date = new Date();          
  var dateFormat = date.toLocaleString([], { hour12: true});
  socket.on("message", (data) => {
    if (data.room == "" || data.room == undefined) {
      io.emit("newMessage", data.user + " : " + data.message);
    } else {
      io.to(data.room).emit("newMessage", data.user + " : " + data.message);
      if (data.room == "news" || data.room == "covid19" || data.room == "nodeJS") {
        const userData = new userdataModel({
          from_user: data.user,
          room: data.room,
          message: data.message,
          date_sent: dateFormat
        });
        try {
          userData.save();
        } catch (err) {
          console.log(err);
        }
      } 
    }
  });

  

  socket.on("userTyping", (data) => {
    socket.broadcast.to(data.room).emit("showChat", data.username);
  });

  socket.on("joingroup", (group) => {
    socket.join(group);
    groupName = group;
    socket.currentRoom = group;
    const msg = userdataModel
      .find({ room: group })
      .sort({ date_sent: "desc" })
      .limit(10);
    socket.msg = msg;
  });

  socket.on("leaveGroup", () => {
    socket.leave(socket.currentGroup);
    socket.currentGroup = null;
    console.log(socket.group);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});


app.get("/signup", async (req, res) => {
  res.sendFile(__dirname + "/view/signup.html");
});


app.get("/login", async (req, res) => {
  res.sendFile(__dirname + "/view/login.html");
});
app.post("/login", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.redirect("/signup?error=username");
        }
        res.send(err);
      } else {
        return res.redirect("/login");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/index",async(req,res)=>{
  res.sendFile(__dirname + "/view/index.html")
})

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/view/signup.html");
});
app.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.find({ username: username });

  try {
    if (user.length != 0) {
      if (user[0].password == password) {
        return res.redirect("/index?username=" + username);
      } else {
        return res.redirect("/login?error=password");
      }
    } else {
      return res.redirect("/login?error=username");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/chat/:room", async (req, res) => {
  const room = req.params.room;

 
  const msg = await userdataModel
    .find({ room: room })
    .sort({ date_sent: "desc" })
    .limit(10)
    .select("from_user message date_sent");
  console.log(msg);
  res.sendFile(__dirname + "/view/chat.html");
});

app.post("/chat", async (req, res) => {
  const username = req.body.username;
  const user = await userModel.find({ username: username });
  if (user[0].username == username) {
    return res.redirect("/chat/" + username);
  } else {
    return res.redirect("/?error=no_user");
  }
});

http.listen(PORT, () => { console.log('Server is running...') });
