'use strict';

class Stock {
  constructor() {
    this.symbol = '';
    this.name = '';
    this.currentPrice = 0.00;
    this.daysHigh   = 0.00;
    this.yearsHigh  = 0.00;
    this.yearsLow   = 0.00;
  }

  updateInfo(index, updateObj) {
    var that = this;
    var xhr = new XMLHttpRequest();
    var query = encodeURI(`select * from yahoo.finance.quotes where symbol in ("${this.symbol}")`);
    var url = `http://query.yahooapis.com/v1/public/yql?q=${query}`;
    console.log(url);
    url = url + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
      if(xhr.readyState > 3 && xhr.status == 200) {
        let stockData = JSON.parse(xhr.responseText);
        if(stockData) {
          that.name = stockData['query']['results']['quote']['Name'];
          that.currentPrice = stockData['query']['results']['quote']['Ask'];
          that.daysHigh = stockData['query']['results']['quote']['DaysHigh'];
          that.daysLow = stockData['query']['results']['quote']['DaysLow'];
          that.yearsHigh = stockData['query']['results']['quote']['YearHigh'];
          that.yearsLow = stockData['query']['results']['quote']['YearLow'];
          updateObj(index);
        }
      }
    };
    xhr.send();
    return xhr;
  }
}
