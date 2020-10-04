import React, { Component, useState } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import DopewarsGame from "./game/DopewarsGame";
import "./App.css";

const App = () => {
  const [instanceKey, setInstanceKey] = useState(0);
  const game = new DopewarsGame();
  return (
    <BrowserRouter>
      {nav()}
      <div>
        <Switch>
          <Route path="/travel">
            <Travel game={game} updateState={setInstanceKey}/>
          </Route>
          <Route path="/">
            <GameStatus key={instanceKey} game={game}/>
            <DrugList game={game} />
            {gameNav()}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const GameStatus = (props) => {
  return props.game.getGameStatus();
};

function nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Dopewars
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li key="meh" className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
              {/*need to sort this out*/}
            </Link>
          </li>
          <li key="foo" className="nav-item">
            <Link className="nav-link" to="/topics">
              Topics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function gameNav() {
  return (
    <div className="p-sm-1">
      <Link className="btn btn-primary" to="/travel" role="button">
        Travel
      </Link>
    </div>
  );
}

class DrugList extends Component {
  render() {
    return <div className="App">{this.props.game.getDrugTable()}</div>;
  }
}

class Travel extends Component {
  state = { currentLocation: this.props.game.location };

  handleClick(e, location) {
    e.preventDefault();
    this.props.game.setLocation(location);
    this.props.updateState();
    this.setState({ currentLocation: location, redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    const locationButtons = this.props.game.locations.map((location) => (
      <div key={location.name} className="p-sm-2">
        <button
          key={location.name}
          onClick={(e) => this.handleClick(e, location)}
          className={`btn  m-sm-2 p-sm-1 ${
            location.name === this.state.currentLocation.name
              ? "btn-primary"
              : "btn-light"
          }`}
          disabled={
            location.name === this.state.currentLocation.name ? true : false
          }
        >
          {location.name}
        </button>
      </div>
    ));

    return <div className="containerFluid">{locationButtons}</div>;
  }
}

export default App;
