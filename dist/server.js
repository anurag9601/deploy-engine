"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MANAGEMENT_APP = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
MANAGEMENT_APP.listen(PORT, () => {
    console.log(`Management server is running on port ${PORT}`);
});
