import { Driver, Constructor } from "@/types/f1";

// Mock data for 2024 season (partial results)
export const mockDrivers: Driver[] = [
  {
    id: "VER",
    name: "Max Verstappen",
    team: "Red Bull Racing",
    points: 393,
    position: 1,
    wins: 9,
    podiums: 14,
    recentForm: [1, 1, 2, 1, 3],
  },
  {
    id: "NOR",
    name: "Lando Norris",
    team: "McLaren",
    points: 331,
    position: 2,
    wins: 3,
    podiums: 12,
    recentForm: [2, 3, 1, 2, 1],
  },
  {
    id: "LEC",
    name: "Charles Leclerc",
    team: "Ferrari",
    points: 307,
    position: 3,
    wins: 3,
    podiums: 11,
    recentForm: [3, 2, 4, 3, 2],
  },
  {
    id: "PIA",
    name: "Oscar Piastri",
    team: "McLaren",
    points: 262,
    position: 4,
    wins: 2,
    podiums: 8,
    recentForm: [4, 4, 3, 5, 4],
  },
  {
    id: "SAI",
    name: "Carlos Sainz",
    team: "Ferrari",
    points: 244,
    position: 5,
    wins: 2,
    podiums: 9,
    recentForm: [5, 5, 5, 4, 5],
  },
  {
    id: "HAM",
    name: "Lewis Hamilton",
    team: "Mercedes",
    points: 223,
    position: 6,
    wins: 2,
    podiums: 7,
    recentForm: [6, 7, 6, 6, 7],
  },
  {
    id: "RUS",
    name: "George Russell",
    team: "Mercedes",
    points: 211,
    position: 7,
    wins: 2,
    podiums: 6,
    recentForm: [7, 6, 7, 7, 6],
  },
  {
    id: "PER",
    name: "Sergio Perez",
    team: "Red Bull Racing",
    points: 152,
    position: 8,
    wins: 0,
    podiums: 3,
    recentForm: [8, 9, 8, 8, 8],
  },
];

export const mockConstructors: Constructor[] = [
  {
    id: "RBR",
    name: "Red Bull Racing",
    points: 545,
    position: 1,
    color: "#0600EF",
  },
  {
    id: "MCL",
    name: "McLaren",
    points: 593,
    position: 2,
    color: "#FF8700",
  },
  {
    id: "FER",
    name: "Ferrari",
    points: 551,
    position: 3,
    color: "#DC0000",
  },
  {
    id: "MER",
    name: "Mercedes",
    points: 434,
    position: 4,
    color: "#00D2BE",
  },
];

export const TOTAL_RACES = 24;
export const COMPLETED_RACES = 20;
export const REMAINING_RACES = TOTAL_RACES - COMPLETED_RACES;
