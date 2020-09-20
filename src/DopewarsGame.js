import React from "react";

class Drug {
  constructor(name, min_price, max_price, cheap, expensive, cheap_message) {
    this.name = name;
    this.min_price = min_price;
    this.max_price = max_price;
    this.cheap = cheap;
    this.expensive = expensive;
    this.cheap_message = cheap_message;
    this.quantity = 0;
    this.setPrice(this.min_price, this.max_price);
  }

  setPrice(min_price, max_price) {
    this.price =
      Math.floor(Math.random() * (max_price - min_price)) + min_price;
    //   Math.floor(Math.random() * ());
  }

  getFormattedData() {
    return <tr><td>{this.name}</td><td>{this.quantity}</td><td>{this.price}</td></tr>
  }

  static getHeader() {
    const header = (
      <tr>
        <td>Name</td>
        <td>Quantity</td>
        <td>Price</td>
      </tr>
    );
    return header;
  }
}

class DopewarsGame {
  constructor() {
    this.drugs = [
      new Drug('Acid', 1000, 4400, true, false, 'The market is flooded with cheap home-made acid!'),
      new Drug('Cocaine', 15000, 29000, false, true, ''),
      new Drug('Hashish', 480, 1280, true, false,'The Marrakesh Express has arrived!'),
      new Drug('Heroin', 5500, 13000, false, true, ''),
      new Drug('Ludes', 11, 60, true, false, 'Rival drug dealers raided a pharmacy and are selling cheap ludes!'),
      new Drug('MDA', 1500, 4400, false, false, ''),
      new Drug('Opium', 540, 1250, false, true, ''),
      new Drug('PCP', 1000, 2500, false, false, ''),
      new Drug('Peyote', 220, 700, false, false, ''),
      new Drug('Shrooms', 630, 1300, false, false, ''),
      new Drug('Speed', 90, 250, false, true, ''),
      new Drug('Weed', 315, 890, true, false, 'Columbian freighter dusted the Coast Guard! <br/>Weed prices have bottomed out!'),
    ];
  }

  getDrugTable() {
    const drugList = this.drugs.map((drug) => drug.getFormattedData());
    const table = <table class='Drug-table'>{Drug.getHeader()}{drugList}</table>;
    return table;
  }
}

export default DopewarsGame;
