import { Driver } from "@/types/f1";
import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

interface DriverStandingsTableProps {
  drivers: Driver[];
}

const DriverStandingsTable = ({ drivers }: DriverStandingsTableProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Pos
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Driver
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Team
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Points
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Wins
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Podiums
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Form
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {drivers.map((driver, index) => (
              <tr
                key={driver.id}
                className="hover:bg-secondary/50 transition-colors"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index === 0 && (
                      <Trophy className="h-4 w-4 text-accent mr-2" />
                    )}
                    <span className="text-sm font-bold text-foreground">
                      {driver.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-foreground">
                    {driver.name}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-muted-foreground">
                    {driver.team}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-bold text-primary">
                    {driver.points}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <span className="text-sm text-foreground">{driver.wins}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <span className="text-sm text-foreground">
                    {driver.podiums}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    {driver.recentForm.slice(0, 5).map((pos, idx) => {
                      const isGood = pos <= 3;
                      const isMedium = pos > 3 && pos <= 10;
                      return (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                            isGood
                              ? "bg-accent/20 text-accent"
                              : isMedium
                              ? "bg-muted text-muted-foreground"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {pos}
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DriverStandingsTable;
