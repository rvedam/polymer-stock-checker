'use strict';

class StockPortfolio {
  constructor() {
    this.stocks = [];
    this.name = '';
    this.description = '';
  }

  addNewStock(stock) {
    this.stocks.push(stock);
  }

  update(updateObj) {
    for(var i = 0; i < this.stocks.length; i++) {
      this.stocks[i].updateInfo(i, updateObj);
    }
  }
}

