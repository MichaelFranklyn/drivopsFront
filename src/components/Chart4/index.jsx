import { useTheme } from "@mui/material/styles";
import * as React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Title from "../Title";

export default function Charts4(props) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Carros por vendedores</Title>
      <ResponsiveContainer>
        <BarChart data={props.dataChart4}>
          <XAxis
            dataKey="vendedor"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Tooltip />
          <Bar dataKey="contagem" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
