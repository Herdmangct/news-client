import React, { Component } from "react";

// Material-ui
import TextField from "@material-ui/core/TextField";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      query: "Scott Morrison",
      from:
        "Thu Aug 01 2019 00:00:00 GMT+1000 (Australian Eastern Standard Time)",
      until:
        "Sat Aug 31 2019 00:00:00 GMT+1000 (Australian Eastern Standard Time)",
      interval: "1 day"
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFromDate = this.handleFromDate.bind(this);
    this.handleUntilDate = this.handleUntilDate.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(event) {
    this.setState({ query: event.target.value });
  }

  handleFromDate(from) {
    const fromDateInMilliseconds = new Date(from).getTime();
    const untilDateInMilliseconds = new Date(this.state.until).getTime();
    if (fromDateInMilliseconds < untilDateInMilliseconds) {
      this.setState({ from: from });
    } else {
      alert("From Date Must Be Less Than Until Date");
    }
  }

  handleUntilDate(until) {
    const fromDateInMilliseconds = new Date(this.state.from).getTime();
    const untilDateInMilliseconds = new Date(until).getTime();
    if (untilDateInMilliseconds > fromDateInMilliseconds) {
      this.setState({ until: until });
    } else {
      alert("Until Date Must Be Greater Than From Date");
    }
  }

  handleInterval(event) {
    this.setState({ interval: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { query, from, until, interval } = this.state;
    this.props.fetchData(query, from, until, interval);
  }

  render() {
    const options = ["1 day", "12 hours"];
    return (
      <form style={styles.formContainer} onSubmit={this.handleSubmit}>
        <TextField
          required
          label="search"
          value={this.state.query}
          onChange={this.handleSearch}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            label="From"
            value={this.state.from}
            onChange={this.handleFromDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            label="Until"
            value={this.state.until}
            onChange={this.handleUntilDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          required
          select
          label="interval"
          value={this.state.interval}
          onChange={this.handleInterval}
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: "40px"
  }
};

export default InputForm;
