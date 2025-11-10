import { Driver, Constructor } from "@/types/f1";
import { OpenF1Driver, OpenF1Session, fetchDriversFromSession, fetchSessionResults } from "./openF1Api";

const POINTS_SYSTEM = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

interface RaceResult {
  driverNumber: number;
  position: number;
  points: number;
}

export const calculateStandingsFromSessions = async (
  sessions: OpenF1Session[]
): Promise<{ drivers: Driver[]; constructors: Constructor[] }> => {
  const driverPointsMap = new Map<number, {
    driver: OpenF1Driver;
    points: number;
    wins: number;
    podiums: number;
    recentForm: number[];
  }>();

  // Filter completed sessions (races that have ended)
  const completedSessions = sessions.filter(
    session => new Date(session.date_end) < new Date()
  ).sort((a, b) => 
    new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
  );

  // Process each completed race
  for (const session of completedSessions) {
    try {
      const [drivers, positions] = await Promise.all([
        fetchDriversFromSession(session.session_key),
        fetchSessionResults(session.session_key),
      ]);

      // Map driver numbers to driver info
      const driverMap = new Map(drivers.map(d => [d.driver_number, d]));

      // Process results
      positions
        .sort((a, b) => a.position - b.position)
        .forEach((pos, index) => {
          const driver = driverMap.get(pos.driver_number);
          if (!driver) return;

          const points = index < POINTS_SYSTEM.length ? POINTS_SYSTEM[index] : 0;
          const existing = driverPointsMap.get(pos.driver_number);

          if (existing) {
            existing.points += points;
            if (pos.position === 1) existing.wins++;
            if (pos.position <= 3) existing.podiums++;
            existing.recentForm.push(pos.position);
            if (existing.recentForm.length > 5) existing.recentForm.shift();
          } else {
            driverPointsMap.set(pos.driver_number, {
              driver,
              points,
              wins: pos.position === 1 ? 1 : 0,
              podiums: pos.position <= 3 ? 1 : 0,
              recentForm: [pos.position],
            });
          }
        });
    } catch (error) {
      console.warn(`Failed to process session ${session.session_key}:`, error);
    }
  }

  // Convert to Driver array
  const driversArray = Array.from(driverPointsMap.entries())
    .map(([driverNumber, data]) => ({
      id: data.driver.name_acronym,
      name: data.driver.full_name,
      team: data.driver.team_name,
      points: data.points,
      position: 0, // Will be set after sorting
      wins: data.wins,
      podiums: data.podiums,
      recentForm: data.recentForm,
    }))
    .sort((a, b) => b.points - a.points)
    .map((driver, index) => ({ ...driver, position: index + 1 }));

  // Calculate constructor standings
  const constructorPointsMap = new Map<string, {
    name: string;
    points: number;
    color: string;
  }>();

  driversArray.forEach(driver => {
    const existing = constructorPointsMap.get(driver.team);
    if (existing) {
      existing.points += driver.points;
    } else {
      // Get color from first driver of this team
      const driverData = Array.from(driverPointsMap.values()).find(
        d => d.driver.team_name === driver.team
      );
      constructorPointsMap.set(driver.team, {
        name: driver.team,
        points: driver.points,
        color: driverData ? `#${driverData.driver.team_colour}` : "#888888",
      });
    }
  });

  const constructorsArray = Array.from(constructorPointsMap.entries())
    .map(([teamName, data]) => ({
      id: teamName.replace(/\s+/g, "_").toUpperCase(),
      name: data.name,
      points: data.points,
      position: 0,
      color: data.color,
    }))
    .sort((a, b) => b.points - a.points)
    .map((constructor, index) => ({ ...constructor, position: index + 1 }));

  return {
    drivers: driversArray,
    constructors: constructorsArray,
  };
};
