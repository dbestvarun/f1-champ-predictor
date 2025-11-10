import { Driver, Constructor, ChampionshipPrediction, ConstructorPrediction } from "@/types/f1";

// Points system for F1
const POINTS_SYSTEM = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export const calculateDriverWinProbability = (
  driver: Driver,
  allDrivers: Driver[],
  remainingRaces: number
): number => {
  const totalPoints = allDrivers.reduce((sum, d) => sum + d.points, 0);
  const pointsShare = totalPoints > 0 ? driver.points / totalPoints : 0;
  
  // Factor in recent form (average position in last 5 races)
  const recentFormScore = driver.recentForm.length > 0
    ? 1 - (driver.recentForm.reduce((a, b) => a + b, 0) / driver.recentForm.length / 20)
    : 0.5;
  
  // Combined probability
  const baseProbability = (pointsShare * 0.6 + recentFormScore * 0.4);
  
  // Adjust based on remaining races
  const raceFactor = Math.min(1, remainingRaces / 10);
  
  return Math.min(0.99, Math.max(0.01, baseProbability * (1 + raceFactor * 0.3)));
};

export const runMonteCarloSimulation = (
  drivers: Driver[],
  remainingRaces: number,
  simulations: number = 10000
): ChampionshipPrediction[] => {
  const wins = new Map<string, number>();
  const podiums = new Map<string, number>();
  const totalPoints = new Map<string, number>();
  
  // Initialize maps
  drivers.forEach(driver => {
    wins.set(driver.id, 0);
    podiums.set(driver.id, 0);
    totalPoints.set(driver.id, 0);
  });
  
  // Run simulations
  for (let sim = 0; sim < simulations; sim++) {
    const simDrivers = drivers.map(d => ({ ...d, simPoints: d.points }));
    
    // Simulate remaining races
    for (let race = 0; race < remainingRaces; race++) {
      // Generate race results based on probabilities
      const raceResults = simDrivers
        .map(driver => {
          const prob = calculateDriverWinProbability(driver, simDrivers, remainingRaces - race);
          return {
            driver,
            score: Math.random() * prob * 100 + Math.random() * 20
          };
        })
        .sort((a, b) => b.score - a.score);
      
      // Assign points
      raceResults.forEach((result, index) => {
        if (index < POINTS_SYSTEM.length) {
          result.driver.simPoints += POINTS_SYSTEM[index];
        }
      });
    }
    
    // Sort by final points
    simDrivers.sort((a, b) => b.simPoints - a.simPoints);
    
    // Record winner
    wins.set(simDrivers[0].id, (wins.get(simDrivers[0].id) || 0) + 1);
    
    // Record podiums
    simDrivers.slice(0, 3).forEach(driver => {
      podiums.set(driver.id, (podiums.get(driver.id) || 0) + 1);
    });
    
    // Accumulate total points
    simDrivers.forEach(driver => {
      totalPoints.set(driver.id, (totalPoints.get(driver.id) || 0) + driver.simPoints);
    });
  }
  
  // Calculate predictions
  return drivers.map(driver => ({
    driverId: driver.id,
    driverName: driver.name,
    currentPoints: driver.points,
    predictedPoints: Math.round((totalPoints.get(driver.id) || 0) / simulations),
    winProbability: (wins.get(driver.id) || 0) / simulations,
    podiumProbability: (podiums.get(driver.id) || 0) / simulations,
  })).sort((a, b) => b.winProbability - a.winProbability);
};

export const calculateConstructorPredictions = (
  constructors: Constructor[],
  driverPredictions: ChampionshipPrediction[],
  drivers: Driver[]
): ConstructorPrediction[] => {
  return constructors.map(constructor => {
    const constructorDrivers = drivers.filter(d => d.team === constructor.name);
    const constructorDriverPredictions = driverPredictions.filter(
      p => constructorDrivers.some(d => d.id === p.driverId)
    );
    
    const predictedPoints = constructorDriverPredictions.reduce(
      (sum, p) => sum + p.predictedPoints,
      0
    );
    
    const avgWinProbability = constructorDriverPredictions.length > 0
      ? constructorDriverPredictions.reduce((sum, p) => sum + p.winProbability, 0) / constructorDriverPredictions.length
      : 0;
    
    return {
      constructorId: constructor.id,
      constructorName: constructor.name,
      currentPoints: constructor.points,
      predictedPoints,
      winProbability: avgWinProbability,
    };
  }).sort((a, b) => b.winProbability - a.winProbability);
};
