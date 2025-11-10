const BASE_URL = "https://api.openf1.org/v1";

export interface OpenF1Driver {
  broadcast_name: string;
  country_code: string;
  driver_number: number;
  first_name: string;
  full_name: string;
  headshot_url: string;
  last_name: string;
  meeting_key: number;
  name_acronym: string;
  session_key: number;
  team_colour: string;
  team_name: string;
}

export interface OpenF1Session {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_end: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  meeting_key: number;
  session_key: number;
  session_name: string;
  session_type: string;
  year: number;
}

export interface OpenF1Position {
  date: string;
  driver_number: number;
  meeting_key: number;
  position: number;
  session_key: number;
}

export const fetchCurrentSeasonSessions = async (): Promise<OpenF1Session[]> => {
  const currentYear = new Date().getFullYear();
  const response = await fetch(
    `${BASE_URL}/sessions?session_name=Race&year=${currentYear}`
  );
  if (!response.ok) throw new Error("Failed to fetch sessions");
  return response.json();
};

export const fetchDriversFromSession = async (
  sessionKey: number
): Promise<OpenF1Driver[]> => {
  const response = await fetch(`${BASE_URL}/drivers?session_key=${sessionKey}`);
  if (!response.ok) throw new Error("Failed to fetch drivers");
  return response.json();
};

export const fetchSessionResults = async (
  sessionKey: number
): Promise<OpenF1Position[]> => {
  const response = await fetch(
    `${BASE_URL}/position?session_key=${sessionKey}`
  );
  if (!response.ok) throw new Error("Failed to fetch session results");
  const positions: OpenF1Position[] = await response.json();
  
  // Get final positions (last recorded position for each driver)
  const driverLatestPositions = new Map<number, OpenF1Position>();
  positions.forEach(pos => {
    const existing = driverLatestPositions.get(pos.driver_number);
    if (!existing || new Date(pos.date) > new Date(existing.date)) {
      driverLatestPositions.set(pos.driver_number, pos);
    }
  });
  
  return Array.from(driverLatestPositions.values());
};
