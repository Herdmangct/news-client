import React, { Component } from "react";

// My Components
import Widget from "./components/Widget";

class App extends Component {
  render() {
    return (
      <div style={styles.app}>
        <Widget />
      </div>
    );
  }
}

const styles = {
  app: {
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px"
  }
};

export default App;
