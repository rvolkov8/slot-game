"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const SlotGame_1 = __importDefault(require("./SlotGame"));
const slotGame = new SlotGame_1.default(config_1.default);
slotGame.spin();
