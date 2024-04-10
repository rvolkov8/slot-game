"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SlotGame {
    constructor(config) {
        this.rowsCount = config.rowsCount;
        this.symbols = config.symbols;
        this.lines = config.lines;
        this.reels = config.reels;
    }
    spin() {
        const reelsPositions = this.generateReelsPositions();
        const symbolsOnRows = this.getShowedSymbols(reelsPositions);
        const linesPayout = this.getLinesPayout(symbolsOnRows);
        this.printResult(reelsPositions, symbolsOnRows, linesPayout);
        return linesPayout;
    }
    generateReelsPositions() {
        return this.reels.map((reel) => {
            return Math.floor(Math.random() * reel.length);
        });
    }
    getShowedSymbols(reelsPositions) {
        const showedSymbols = [];
        for (let row = 0; row < this.rowsCount; row++) {
            const rowSymbols = this.reels.map((reel, reelIndex) => {
                const reelPosition = reelsPositions[reelIndex];
                const symbolIndex = (reelPosition + row) % reel.length;
                const symbol = this.reels[reelIndex][symbolIndex];
                return symbol;
            });
            showedSymbols.push(rowSymbols);
        }
        return showedSymbols;
    }
    getLinesPayout(symbolsOnRows) {
        const resultLines = this.lines.map((line) => line.map((rowIndex, i) => symbolsOnRows[rowIndex][i]));
        const symbolCounts = resultLines.map((line) => {
            const symbolCount = {};
            line.forEach((symbol) => {
                symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
            });
            return symbolCount;
        });
        const linesPayout = symbolCounts.map((symbolCount) => {
            let linePayout = 0;
            for (const symbol in symbolCount) {
                if (symbolCount.hasOwnProperty(symbol)) {
                    const timesOccurred = symbolCount[symbol];
                    linePayout += this.symbols[symbol][timesOccurred - 1];
                }
            }
            return linePayout;
        });
        return linesPayout.reduce((acc, line) => acc + line, 0);
    }
    printResult(reelsPositions, symbolsOnRows, linesPayout) {
        console.log('Reels positions: ', reelsPositions);
        console.log('Showed symbols:');
        symbolsOnRows.forEach((row) => console.log(row));
        console.log('Lines payout: ', linesPayout);
    }
}
exports.default = SlotGame;
