"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express_1.default.static(__dirname + "/public"));
app.get("/", (_req, res) => res.render("home"));
app.get("/*", (_req, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
