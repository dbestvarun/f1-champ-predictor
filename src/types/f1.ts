export interface Driver {
  id: string;
  name: string;
  team: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
  recentForm: number[]; // Last 5 race positions
}

export interface Constructor {
  id: string;
  name: string;
  points: number;
  position: number;
  color: string;
}

export interface RaceResult {
  raceId: string;
  raceName: string;
  date: string;
  results: {
    driverId: string;
    position: number;
    points: number;
  }[];
}

export interface ChampionshipPrediction {
  driverId: string;
  driverName: string;
  currentPoints: number;
  predictedPoints: number;
  winProbability: number;
  podiumProbability: number;
}

export interface ConstructorPrediction {
  constructorId: string;
  constructorName: string;
  currentPoints: number;
  predictedPoints: number;
  winProbability: number;
}
