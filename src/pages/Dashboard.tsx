import { useF1Data } from "@/hooks/useF1Data";
import DriverStandingsTable from "@/components/DriverStandingsTable";
import ConstructorStandingsTable from "@/components/ConstructorStandingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, Trophy, Calendar, Wifi, WifiOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const { drivers, constructors, completedRaces, remainingRaces, isLiveData, isLoading, error } = useF1Data();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const leader = drivers[0];
  const constructorLeader = constructors[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Live Data Indicator */}
        <Alert className="mb-6 bg-secondary border-primary/30">
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isLiveData ? (
                <>
                  <Wifi className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    Live data from OpenF1 API
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Using demo data (OpenF1 API unavailable)
                  </span>
                </>
              )}
            </div>
            {error && (
              <span className="text-xs text-destructive">
                API Error: {error.message}
              </span>
            )}
          </AlertDescription>
        </Alert>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Championship Leader
              </CardTitle>
              <Trophy className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{leader.name}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {leader.points} points • {leader.wins} wins
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Constructor Leader
              </CardTitle>
              <Flag className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {constructorLeader.name}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {constructorLeader.points} points
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Season Progress
              </CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {completedRaces}/{completedRaces + remainingRaces}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {remainingRaces} races remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Standings */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <Trophy className="h-6 w-6 text-primary mr-2" />
              Driver Standings
            </h2>
            <DriverStandingsTable drivers={drivers} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <Flag className="h-6 w-6 text-primary mr-2" />
              Constructor Standings
            </h2>
            <ConstructorStandingsTable constructors={constructors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
