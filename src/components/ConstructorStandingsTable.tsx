import { Constructor } from "@/types/f1";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface ConstructorStandingsTableProps {
  constructors: Constructor[];
}

const ConstructorStandingsTable = ({
  constructors,
}: ConstructorStandingsTableProps) => {
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
                Constructor
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Points
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Color
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {constructors.map((constructor, index) => (
              <tr
                key={constructor.id}
                className="hover:bg-secondary/50 transition-colors"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index === 0 && (
                      <Trophy className="h-4 w-4 text-accent mr-2" />
                    )}
                    <span className="text-sm font-bold text-foreground">
                      {constructor.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-foreground">
                    {constructor.name}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-bold text-primary">
                    {constructor.points}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-8 h-4 rounded border border-border"
                      style={{ backgroundColor: constructor.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {constructor.color}
                    </span>
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

export default ConstructorStandingsTable;
