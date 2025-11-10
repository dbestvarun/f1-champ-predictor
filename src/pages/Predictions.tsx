import { useMemo } from "react";
import { useF1Data } from "@/hooks/useF1Data";
import { runMonteCarloSimulation, calculateConstructorPredictions } from "@/utils/f1Calculations";
import PredictionChart from "@/components/PredictionChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, Target, Wifi, WifiOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Predictions = () => {
  const { drivers, constructors, remainingRaces, isLiveData, isLoading } = useF1Data();
  
  const driverPredictions = useMemo(() => {
    return runMonteCarloSimulation(drivers, remainingRaces, 10000);
  }, [drivers, remainingRaces]);

  const constructorPredictions = useMemo(() => {
    return calculateConstructorPredictions(constructors, driverPredictions, drivers);
  }, [constructors, driverPredictions, drivers]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-96 mb-8" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  const topPrediction = driverPredictions[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center">
            <TrendingUp className="h-8 w-8 text-primary mr-3" />
            Championship Predictions
          </h1>
          <div className="flex items-center space-x-4">
            <p className="text-muted-foreground">
              Monte Carlo simulation based on {remainingRaces} remaining races
            </p>
            <div className="flex items-center space-x-1 text-xs">
              {isLiveData ? (
                <>
                  <Wifi className="h-3 w-3 text-accent" />
                  <span className="text-accent">Live Data</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Demo Data</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Top Prediction Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Award className="h-6 w-6 text-accent mr-2" />
              Most Likely Champion
            </CardTitle>
            <CardDescription>Based on 10,000 simulations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {topPrediction.driverName}
                </p>
                <p className="text-muted-foreground mt-1">
                  Current: {topPrediction.currentPoints} pts → Predicted: {topPrediction.predictedPoints} pts
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold text-primary">
                  {(topPrediction.winProbability * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Win Probability</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PredictionChart
            predictions={driverPredictions}
            title="Driver Championship Win Probability"
          />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">Top 3 Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {driverPredictions.slice(0, 3).map((pred, index) => (
                  <div
                    key={pred.driverId}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          index === 0
                            ? "bg-accent text-accent-foreground"
                            : index === 1
                            ? "bg-racing-silver text-racing-dark"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{pred.driverName}</p>
                        <p className="text-xs text-muted-foreground">
                          {pred.currentPoints} → {pred.predictedPoints} pts
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        {(pred.winProbability * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Podium: {(pred.podiumProbability * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Predictions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 text-primary mr-2" />
              All Driver Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                      Driver
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                      Current Pts
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                      Predicted Pts
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                      Win %
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                      Podium %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {driverPredictions.map((pred, index) => (
                    <tr key={pred.driverId} className="hover:bg-secondary/50">
                      <td className="px-4 py-3 text-sm font-bold text-foreground">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">
                        {pred.driverName}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                        {pred.currentPoints}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-primary">
                        {pred.predictedPoints}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-accent">
                        {(pred.winProbability * 100).toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-foreground">
                        {(pred.podiumProbability * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Predictions;
