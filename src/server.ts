import express from "express";
import WebSocket from "ws";
import http from "http";

interface parsedJSON {
  type: string;
  payload: string;
}

interface ExtendedWebSocket extends WebSocket {
  nickname?: string;
}

class ExtendedWebSocketServer extends WebSocket.Server {
  constructor(options: WebSocket.ServerOptions) {
    super(options);
  }
}

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_req, res) => res.render("home"));
app.get("/*", (_req, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new ExtendedWebSocketServer({ server });

const sockets: ExtendedWebSocket[] = [];

wss.on("connection", (socket: ExtendedWebSocket) => {
  sockets.push(socket);
  socket["nickname"] = "";
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from Browser"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg.toString()) as parsedJSON;
    switch (message.type) {
      case "message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
});

server.listen(3000, handleListen);
