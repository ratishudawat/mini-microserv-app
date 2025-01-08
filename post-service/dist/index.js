"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const result = (0, dotenv_1.config)();
if (result.error) {
    throw result.error;
}
const app = (0, express_1.default)();
const server = http_1.default.createServer();
// const appRouter = express.Router();
// app.use(appRouter);
app.use('/', (req, res) => {
    res.status(404).json({
        status: 404,
        error: '404 Page Not Found',
    });
});
server.listen(process.env.PORT, () => {
    console.log(`Post service running on port ${process.env.PORT}`);
});
