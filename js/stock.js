'use strict';

class Stock {
  constructor(symbol) {
    this.symbol = symbol;
    this.name = '';
    this.currentPrice = 0.00;
    this.daysHigh   = 0.00;
    this.yearsHigh  = 0.00;
    this.yearsLow   = 0.00;
  }

  updateInfo() {
    let xhr = new XMLHttpRequest();
    let query = 'select * from yahoo.finance.quotes where symbol in (" ${this.symbol} ")';
    xhr.url = 'http://query.yahooapis.com/v1/public/yql?q=${query}';
    xhr.url = xhr.url + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
    xhr.onreadystatechange = function (data) {
      let stockData = JSON.parse(data);
      if(stockData) {
        this.name = stockData['query']['results']['quote']['Name'];
        this.currentPrice = stockData['query']['results']['quote']['Ask'];
        this.daysHigh = stockData['query']['results']['quote']['DaysHigh'];
        this.daysLow = stockData['query']['results']['quote']['DaysLow'];
        this.yearsHigh = stockData['query']['results']['quote']['YearHigh'];
        this.yearsLow = stockData['query']['results']['quote']['YearLow'];
      }
    };
    xhr.send();
    return xhr;
  }
}
