interface SlotGameConfig {
  reelsCount: number;
  rowsCount: number;
  symbols: { [key: number]: number[] };
  lines: number[][];
  reels: number[][];
}

class SlotGame {
  private rowsCount: number;
  private symbols: { [key: number]: number[] };
  private lines: number[][];
  private reels: number[][];

  constructor(config: SlotGameConfig) {
    this.rowsCount = config.rowsCount;
    this.symbols = config.symbols;
    this.lines = config.lines;
    this.reels = config.reels;
  }

  public spin(): number {
    const reelsPositions: number[] = this.generateReelsPositions();
    const symbolsOnRows: number[][] = this.getShowedSymbols(reelsPositions);
    const linesPayout = this.getLinesPayout(symbolsOnRows);
    this.printResult(reelsPositions, symbolsOnRows, linesPayout);
    return linesPayout;
  }

  private generateReelsPositions(): number[] {
    return this.reels.map((reel) => {
      return Math.floor(Math.random() * reel.length);
    });
  }

  private getShowedSymbols(reelsPositions: number[]): number[][] {
    const showedSymbols: number[][] = [];
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

  private getLinesPayout(symbolsOnRows: number[][]): number {
    const resultLines = this.lines.map((line) =>
      line.map((rowIndex, i) => symbolsOnRows[rowIndex][i])
    );

    const symbolCounts = resultLines.map((line) => {
      const symbolCount: { [key: number]: number } = {};
      line.forEach((symbol) => {
        symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
      });
      return symbolCount;
    });

    const linesPayout = symbolCounts.map((symbolCount) => {
      let linePayout: number = 0;
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

  private printResult(
    reelsPositions: number[],
    symbolsOnRows: number[][],
    linesPayout: any
  ): void {
    console.log('Reels positions: ', reelsPositions);
    console.log('Showed symbols:');
    symbolsOnRows.forEach((row) => console.log(row));
    console.log('Lines payout: ', linesPayout);
  }
}

export default SlotGame;
