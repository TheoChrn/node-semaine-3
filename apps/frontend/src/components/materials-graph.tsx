import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "~/lib/query-options";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { capitalize } from "@projet-node-semaine-3/shared/format";

export const MaterialsGraph = () => {
  const { data: materialStats } = useSuspenseQuery(
    queryOptions.materials.getStats()
  );

  return (
    <div className="h-100 flex-1">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart height={400} width={1000} data={materialStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" tickFormatter={(value) => capitalize(value)} />
          <YAxis
            dataKey="nElement"
            domain={[0, Math.max(...materialStats.map((m) => m.nElement)) + 1]}
          />
          <Tooltip
            labelFormatter={(value) => capitalize(value)}
            formatter={(value) => [value, "Quantité"]}
          />
          <Legend formatter={() => "Nombre de matériaux"} />
          <Bar dataKey="nElement" fill="#007acc" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
