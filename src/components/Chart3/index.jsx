import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
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

export default function Chart1(props) {
  const theme = useTheme();
  const newArray = [];

  return (
    <React.Fragment>
      <Title>Média por mês</Title>
      <ResponsiveContainer>
        <BarChart data={props.dataChart3}>
          <XAxis
            dataKey="mes"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Tooltip />
          <Bar dataKey="media" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
