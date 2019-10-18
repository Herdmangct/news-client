import * as React from "react";

// Material-UI
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import CircularProgress from "@material-ui/core/CircularProgress";

// My API
import { formatIntervalForTitle } from "../API/server-api";
import { getDateForTitle } from "../API/server-api";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row"
  }
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap"
  }
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

// COMPONENT /////////////////////////////////////////
const HistogramChart = props => {
  let { chartData, query, from, until, interval } = props;

  // Format Data
  const intervalForTitle = formatIntervalForTitle.getIntervalForTitle(interval);
  const fromForTitle = getDateForTitle(from);
  const untilForTitle = getDateForTitle(until);

  if (chartData) {
    const showXAxis = chartData.length > 6 ? false : true;

    return (
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis showLabels={showXAxis} showTicks={showXAxis} />
          <ValueAxis max={2400} />

          <BarSeries name="Online" valueField="Online" argumentField="date" />
          <BarSeries name="TV" valueField="TV" argumentField="date" />
          <BarSeries name="Radio" valueField="Radio" argumentField="date" />
          <BarSeries name="Social" valueField="Social" argumentField="date" />
          <BarSeries name="Print" valueField="Print" argumentField="date" />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <Title
            text={`${intervalForTitle} '${query}' Mentions In The News Between ${fromForTitle} - ${untilForTitle}`.toUpperCase()}
          />
          <Stack
            stacks={[
              {
                series: ["Online", "TV", "Radio", "Social", "Print"]
              }
            ]}
          />
        </Chart>
      </Paper>
    );
  } else {
    return <CircularProgress />;
  }
};

export default HistogramChart;
