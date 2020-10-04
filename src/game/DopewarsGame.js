import React from "react";
import Drug from "./Drug";

class Location {
  constructor(name, policePresence, minDrug, maxDrug) {
    this.name = name;
    this.policePresence = policePresence;
    this.minDrug = minDrug;
    this.maxDrug = maxDrug;
  }

  static getDefaultLocationList(numberOfDrugs) {
    return [
      new Location("Bronx", 10, numberOfDrugs / 2 + 1, numberOfDrugs),
      new Location("Ghetto", 5, numberOfDrugs / 2 + 2, numberOfDrugs),
      new Location("Central Park", 15, numberOfDrugs / 2, numberOfDrugs),
      new Location("Manhattan", 90, numberOfDrugs / 2 - 2, numberOfDrugs),
      new Location("Coney Island", 20, numberOfDrugs / 2, numberOfDrugs),
      new Location("Brooklyn", 70, numberOfDrugs / 2 - 2, numberOfDrugs),
      new Location("Queens", 50, numberOfDrugs / 2, numberOfDrugs),
      new Location("Staten Island", 20, numberOfDrugs / 2, numberOfDrugs),
    ];
  }
}

class DopewarsGame {
  constructor() {
    this.newGame();
  }

  newGame() {
    this.defaultDrugList = Drug.getDefaultDrugList();
    this.cash = 2000;
    this.bank = 0;
    this.debt = 2000;
    this.guns = [];
    this.health = 100;
    this.trenchCoatSize = 100;
    this.trenchCoat = [];
    this.day = 0;
    this.days = 30;
    this.locations = Location.getDefaultLocationList(
      this.defaultDrugList.length
    );
    this.setLocation(
      this.locations[Math.floor(Math.random() * this.locations.length)]
    );
  }

  setLocation(location) {
    this.location = location;
    this.debt = Math.ceil(this.debt * 1.1);
    this.day++;
    this.drugs = Drug.changeLocation(
      location.minDrug,
      location.maxDrug,
      this.defaultDrugList
    );
  }

  getGameStatus() {
    const statusMap = [
      { name: "Cash", value: "$" + this.cash },
      { name: "Bank", value: "$" + this.bank },
      { name: "Debt", value: "$" + this.debt },
      { name: "Health", value: this.health },
      { name: "Day", value: this.day + " of " + this.days },
    ];
    const items = statusMap.map((item) => (
      <span className="border rounded-lg ml-2 mt-2 bg-light">
        <span className="p-sm-1">{item.name}</span>
        <span className="border-left p-sm-1 ml-1">{item.value}</span>
      </span>
    ));
    return (
      <div className="navbar">
        <div className="d-flex flex-wrap p-lg-1">{items}</div>
      </div>
    );
  }

  getDrugTable() {
    const drugList = this.drugs.map((drug) => drug.getFormattedData());
    const table = (
      <table className="Drug-table">
        <thead>{Drug.getHeader()}</thead>
        <tbody>{drugList}</tbody>
      </table>
    );
    return table;
  }
}

export default DopewarsGame;
