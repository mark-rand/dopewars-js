import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-dom";
import DopewarsGame from "./DopewarsGame";

class App extends Component {
  render() {
    this.game = new DopewarsGame();
    // return <DrugList game={this.game} />;
    return (
      <BrowserRouter>
        {/* <Switch> */}
          {/* <Route path='/' component={DrugList} /> */}
          <DrugList game={this.game}/>
        {/* </Switch> */}
      </BrowserRouter>
    );
  }
}

class DrugList extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Dopewars</h1>
        </header>
        {this.props.game.getDrugTable()}
      </div>
    );
  }
}

export default App;
