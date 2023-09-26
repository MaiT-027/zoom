const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type: string, payload: string) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  const msg = message.data as string;
  if (msg.startsWith(":")) {
    return;
  }
  const li = document.createElement("li");
  li.innerText = msg;
  messageList?.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

function handleMessageSubmit(event: Event) {
  event.preventDefault();
  const input = messageForm?.querySelector("input");
  if (input) {
    socket.send(makeMessage("message", input.value));
    input.value = "";
  }
}

function handleNickSubmit(event: Event) {
  event.preventDefault();
  const input = nickForm?.querySelector("input");
  if (input) {
    socket.send(makeMessage("nickname", input.value));
    nickForm?.remove();
  }
}

messageForm?.addEventListener("submit", handleMessageSubmit);
nickForm?.addEventListener("submit", handleNickSubmit);
