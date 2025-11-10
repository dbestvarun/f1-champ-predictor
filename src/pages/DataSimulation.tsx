import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Code, Activity, Zap } from "lucide-react";

const DataSimulation = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center">
            <Database className="h-8 w-8 text-primary mr-3" />
            Data & Simulation Methodology
          </h1>
          <p className="text-muted-foreground">
            Technical overview of the prediction algorithms
          </p>
        </div>

        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 text-primary mr-2" />
                Data Structure
              </CardTitle>
              <CardDescription>Core data models and types</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="bg-secondary p-3 rounded font-mono text-xs">
                <pre>{`interface Driver {
  id: string;
  name: string;
  team: string;
  points: number;
  position: number;
  wins: number;
  podiums: number;
  recentForm: number[];
}`}</pre>
              </div>
              <p>
                Drivers and constructors are stored in TypeScript interfaces with
                real-time points tracking and historical performance data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 text-accent mr-2" />
                Probability Calculation
              </CardTitle>
              <CardDescription>Win probability formula</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="bg-secondary p-3 rounded">
                <p className="font-semibold text-foreground mb-2">Formula:</p>
                <p className="font-mono text-xs">
                  P(win) = (0.6 × points_share) + (0.4 × recent_form_score)
                </p>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>60% weight on current points share</li>
                <li>40% weight on recent form (last 5 races)</li>
                <li>Adjusted by remaining races factor</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 text-accent mr-2" />
                Monte Carlo Simulation
              </CardTitle>
              <CardDescription>10,000 season simulations</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ol className="list-decimal list-inside space-y-1">
                <li>Initialize driver standings from current data</li>
                <li>For each remaining race:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li>Calculate driver probabilities</li>
                    <li>Generate random race results</li>
                    <li>Assign points (25, 18, 15, ...)</li>
                  </ul>
                </li>
                <li>Determine final champion</li>
                <li>Repeat 10,000 times</li>
                <li>Calculate win/podium frequencies</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 text-primary mr-2" />
                Data Sources
              </CardTitle>
              <CardDescription>Current implementation</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold text-foreground">Mock Data (Demo)</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Based on 2024 F1 season standings</li>
                <li>Real driver names and teams</li>
                <li>Simulated race results</li>
              </ul>
              <div className="bg-accent/10 border border-accent/30 p-3 rounded mt-4">
                <p className="font-semibold text-accent-foreground">
                  📈 Future Enhancement
                </p>
                <p className="text-xs mt-1">
                  Can be connected to live F1 API or web scraping for real-time
                  race results and automatic updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>
              Technologies and algorithms used in this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Frontend Stack</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    React 18 with TypeScript
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Vite for fast builds
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Recharts for data visualization
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    React Router for navigation
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Key Algorithms</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Monte Carlo simulation (10,000 iterations)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Weighted probability calculations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Recent form analysis (sliding window)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Statistical aggregation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    Points-based ranking system
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Code Quality:</span> The
                project demonstrates clean code architecture with separated concerns:
                data models (types), business logic (calculations), UI components, and
                page layouts. All calculations are memoized for optimal performance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataSimulation;
