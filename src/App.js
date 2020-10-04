import React, { Component, useState } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import DopewarsGame from "./game/DopewarsGame";
import "./App.css";
const queryString = require("query-string");

const game = new DopewarsGame();

const App = () => {
  const [instanceKey, setInstanceKey] = useState(0);
  return (
    <BrowserRouter>
      {nav()}
      <div>
        <Switch>
          <Route path="/travel">
            <Travel game={game} updateState={setInstanceKey} />
          </Route>
          <Route path="/buy">
            <Buy game={game} />
            <Link className="button" to="/">
              Back
            </Link>
          </Route>
          <Route path="/sell">
            <Link to="/">Back</Link>
          </Route>
          <Route path="/buyorsell">
            <Link to="/">Back</Link>
          </Route>
          <Route path="/">
            <GameStatus key={instanceKey} game={game} />
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

class Buy extends Component {
  render() {
    const drugName = queryString.parse(window.location.search).drug;
    const drug = this.props.game.drugs[
      this.props.game.drugs.findIndex((drug) => drug.name === drugName)
    ];
    if (!drug || !isViable(drug, this.props.game)) {
      return <Redirect push to="/" />;
    }
    return (
      <div>{this.props.game.cash + " " + drugName + " " + drug.price}</div>
    );
  }
}

var onClickAction = {
  NONE: "none",
  BUY: "/buy",
  SELL: "/sell",
  BUY_OR_SELL: "/buysell",
};

function isViable(drug, game) {
  if (drug.price <= 0) return onClickAction.NONE;
  if (
    drug.price < game.cash &&
    game.getTrenchcoatSpace() > 0 &&
    drug.quantity > 0
  ) {
    return onClickAction.BUY_OR_SELL;
  } else if (drug.quantity > 0) {
    return onClickAction.SELL;
  } else if (drug.price < game.cash) {
    return onClickAction.BUY;
  } else {
    return onClickAction.NONE;
  }
}

class DrugList extends Component {
  constructor() {
    super();
    this.state = { action: onClickAction.NONE };
  }

  handleClick(e, drug) {
    e.preventDefault();
    const viable = isViable(drug, this.props.game);
    if (viable !== onClickAction.NONE) {
      this.setState({
        action: viable + "?drug=" + drug.name,
      });
    }
  }

  render() {
    if (this.state.action !== onClickAction.NONE) {
      return <Redirect push to={this.state.action}></Redirect>;
    }
    const drugList = this.props.game.drugs.map((drug) => {
      if (drug.price > 0 || drug.quantity > 0) {
        var cashClass = drug.crazyPrice ? "text-danger" : null;
        var drugClass =
          isViable(drug, this.props.game) === onClickAction.NONE
            ? " text-muted"
            : null;
        return (
          <tr
            onClick={(e) => this.handleClick(e, drug)}
            key={drug.name}
            className={drugClass}
          >
            <td>{drug.name}</td>
            <td>{drug.quantity}</td>
            <td>
              <p className={cashClass}>${drug.price}</p>
            </td>
          </tr>
        );
      } else return null;
    });
    return (
      <div className="container">
        <table className="table table-bordered table-hover p-sm-0 m-sm-0">
          <thead className="thead-light">
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>{drugList}</tbody>
        </table>
      </div>
    );
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

    return (
      <div className="containerFluid d-flex justify-content-center">
        {locationButtons}
      </div>
    );
  }
}

export default App;
