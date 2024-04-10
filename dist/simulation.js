"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const SlotGame_1 = __importDefault(require("./SlotGame"));
const slotGame = new SlotGame_1.default(config_1.default);
slotGame.spin();
const performSimulation = (totalSpins) => {
    const slotGame = new SlotGame_1.default(config_1.default);
    let totalWins = 0;
    let totalPayout = 0;
    const startTime = Date.now();
    for (let i = 0; i < totalSpins; i++) {
        const payout = slotGame.spin();
        if (payout > 0) {
            totalWins += 1;
            totalPayout += payout;
        }
    }
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    console.log('--------------------------------------------------------------');
    console.log(`Total Spins: ${totalSpins}`);
    console.log(`Total Wins: ${totalWins}`);
    console.log(`Total Payout: ${totalPayout}`);
    console.log(`Execution Time: ${executionTime} seconds`);
    console.log('--------------------------------------------------------------');
};
performSimulation(10000);
