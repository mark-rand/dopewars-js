import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import DopewarsGame from "./DopewarsGame";
import "./App.css";

class App extends Component {
  render() {
    this.game = new DopewarsGame();
    return (
      <BrowserRouter>
        {nav()}
        <div>
          <Switch>
            <Route path="/about">Hello</Route>
            <Route path="/">
              <DrugList game={this.game} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Dopewars
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
              {/*need to sort this out*/}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/topics">
              Topics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

class DrugList extends Component {
  render() {
    return <div className="App">{this.props.game.getDrugTable()}</div>;
  }
}

export default App;
