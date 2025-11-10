import { useQuery } from "@tanstack/react-query";
import { fetchCurrentSeasonSessions } from "@/services/openF1Api";
import { calculateStandingsFromSessions } from "@/services/standingsCalculator";
import { mockDrivers, mockConstructors, TOTAL_RACES, COMPLETED_RACES } from "@/data/mockData";

export const useF1Data = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["f1-standings"],
    queryFn: async () => {
      try {
        const sessions = await fetchCurrentSeasonSessions();
        const standings = await calculateStandingsFromSessions(sessions);
        
        const completedRaces = sessions.filter(
          s => new Date(s.date_end) < new Date()
        ).length;
        
        return {
          drivers: standings.drivers.length > 0 ? standings.drivers : mockDrivers,
          constructors: standings.constructors.length > 0 ? standings.constructors : mockConstructors,
          completedRaces: completedRaces > 0 ? completedRaces : COMPLETED_RACES,
          totalRaces: TOTAL_RACES,
          remainingRaces: TOTAL_RACES - (completedRaces > 0 ? completedRaces : COMPLETED_RACES),
          isLiveData: standings.drivers.length > 0,
        };
      } catch (error) {
        console.warn("Failed to fetch F1 data, using mock data:", error);
        // Fallback to mock data
        return {
          drivers: mockDrivers,
          constructors: mockConstructors,
          completedRaces: COMPLETED_RACES,
          totalRaces: TOTAL_RACES,
          remainingRaces: TOTAL_RACES - COMPLETED_RACES,
          isLiveData: false,
        };
      }
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });

  return {
    drivers: data?.drivers || mockDrivers,
    constructors: data?.constructors || mockConstructors,
    completedRaces: data?.completedRaces || COMPLETED_RACES,
    totalRaces: data?.totalRaces || TOTAL_RACES,
    remainingRaces: data?.remainingRaces || (TOTAL_RACES - COMPLETED_RACES),
    isLiveData: data?.isLiveData || false,
    isLoading,
    error,
  };
};
