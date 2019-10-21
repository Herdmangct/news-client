import React, { Component } from "react";

// Material-UI
import CircularProgress from "@material-ui/core/CircularProgress";

// External Libraries
import axios from "axios";

// My Components
import Chart from "./Chart";
import InputForm from "./InputForm";

// My API
import { intervalStringToInterval } from "../API/server-api";
import { formatAPIDataIntoChartData } from "../API/server-api";
import { API_URL } from "../API/server-api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: "Scott Morrison",
      from:
        "Thu Aug 01 2019 00:00:00 GMT+1000 (Australian Eastern Standard Time)",
      until:
        "Sat Aug 31 2019 00:00:00 GMT+1000 (Australian Eastern Standard Time)",
      interval: "1 day",
      chartData: "",
      error: ""
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { query, from, until, interval } = this.state;
    this.fetchData(query, from, until, interval);
  }

  async fetchData(query, from, until, interval) {
    // Format data
    const fromInMilliseconds = new Date(from).getTime();
    const untilInMilliseconds = new Date(until).getTime();
    const intervalForAPI = intervalStringToInterval.getInterval(interval);

    await axios
      .get(API_URL, {
        params: {
          query: query,
          after: fromInMilliseconds,
          before: untilInMilliseconds,
          interval: intervalForAPI
        }
      })
      .then(responseData => {
        return formatAPIDataIntoChartData(responseData);
      })
      .then(chartData => {
        this.setState({
          query: query,
          from: from,
          until: until,
          interval: interval,
          chartData: chartData,
          error: ""
        });
      })
      .catch(error => {
        alert(
          `${error} \nPlease make sure you are connected to the news-api backend and that it is running on localhost:3000/results`
        );
        this.setState({ error: error.response });
        console.log(error.response);
      });
  }

  render() {
    if (!this.state.error) {
      if (this.state.chartData) {
        return (
          <div style={styles.app}>
            <InputForm fetchData={this.fetchData} />
            <Chart
              chartData={this.state.chartData}
              query={this.state.query}
              from={this.state.from}
              until={this.state.until}
              interval={this.state.interval}
              isConnectedToAPI={this.state.isConnectedToAPI}
            />
          </div>
        );
      } else {
        return <CircularProgress />;
      }
    } else {
      return (
        <div>
          <p>The API request failed</p>
          <p>
            Please make sure you are connected to the news-api backend and that
            it is running on localhost:3000/results
          </p>
        </div>
      );
    }
  }
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

export default App;
