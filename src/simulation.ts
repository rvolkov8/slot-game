import config from './config';
import SlotGame from './SlotGame';

const slotGame = new SlotGame(config);
slotGame.spin();

const performSimulation = (totalSpins: number) => {
  const slotGame = new SlotGame(config);
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
