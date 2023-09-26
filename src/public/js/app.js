"use strict";
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);
function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}
socket.addEventListener("open", () => {
    console.log("Connected to Server");
});
socket.addEventListener("message", (message) => {
    const msg = message.data;
    if (msg.startsWith(":")) {
        return;
    }
    const li = document.createElement("li");
    li.innerText = msg;
    messageList === null || messageList === void 0 ? void 0 : messageList.append(li);
});
socket.addEventListener("close", () => {
    console.log("Disconnected from Server");
});
function handleMessageSubmit(event) {
    event.preventDefault();
    const input = messageForm === null || messageForm === void 0 ? void 0 : messageForm.querySelector("input");
    if (input) {
        socket.send(makeMessage("message", input.value));
        input.value = "";
    }
}
function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm === null || nickForm === void 0 ? void 0 : nickForm.querySelector("input");
    if (input) {
        socket.send(makeMessage("nickname", input.value));
        nickForm === null || nickForm === void 0 ? void 0 : nickForm.remove();
    }
}
messageForm === null || messageForm === void 0 ? void 0 : messageForm.addEventListener("submit", handleMessageSubmit);
nickForm === null || nickForm === void 0 ? void 0 : nickForm.addEventListener("submit", handleNickSubmit);
