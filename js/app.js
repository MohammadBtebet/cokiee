'use strict';


let allLocations = [];

let cookieTable = document.getElementById('cookie');

let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

function Storelocation(name, minCustomers, maxCustomers, avgCookieSales) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookieSales = avgCookieSales;
  this.collectedNumCustomers = [];
  this.collectedCookiesPerHour = [];
  this.totalCookies = 0;

  allLocations.push(this);

}


new Storelocation('Seattle', 23, 65, 6.3);
new Storelocation('Tokyo', 3, 24, 1.2);
new Storelocation('Dubai', 11, 38, 3.7);
new Storelocation('Paris', 20, 38, 2.3);
new Storelocation('Lima', 2, 16, 4.6);


Storelocation.prototype.dailyCustomersPerHour = function () {
  for (let i = 0; i < hours.length; i++) {
    let numCustumers = Math.floor(Math.random() * this.maxCustomers) + this.minCustomers;
    this.collectedNumCustomers.push(numCustumers);
  }

};



Storelocation.prototype.dailyCookiesSoldperHour = function () {
  for (let i = 0; i < hours.length; i++) {
    let numCookies = Math.round(this.collectedNumCustomers[i] * this.avgCookieSales);
    this.collectedCookiesPerHour.push(numCookies);
  }

};


Storelocation.prototype.collectedTotalCookies = function () {
  for (let i = 0; i < this.collectedCookiesPerHour.length; i++) {
    this.totalCookies += this.collectedCookiesPerHour[i];

  }
};

function callAllfunctions() {
  for (let i = 0; i < allLocations.length; i++) {
    allLocations[i].dailyCustomersPerHour();
    allLocations[i].dailyCookiesSoldperHour();
    allLocations[i].collectedTotalCookies();
  }
}


callAllfunctions();


function makeHeaderRow() {
  
  let trEl = document.createElement('tr');
  let thEl = document.createElement('th');
  thEl.textContent = ' Store Locations ';
  trEl.appendChild(thEl);
  cookieTable.appendChild(trEl);
  console.log(thEl);

  for (let i = 0; i < hours.length; i++) {
    let tdEl = document.createElement('td');
    tdEl.textContent = hours[i];
    trEl.appendChild(tdEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  trEl.appendChild(thEl);
  cookieTable.appendChild(trEl);
}
makeHeaderRow();


Storelocation.prototype.render = function () {

  let trEl = document.createElement('tr');

  let tdEl = document.createElement('td');

  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);
  for (let i = 0; i < this.collectedCookiesPerHour.length; i++) {
    
    tdEl = document.createElement('td');
  
    tdEl.textContent = this.collectedCookiesPerHour[i];

    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  
  tdEl.textContent = this.totalCookies;
 
  trEl.appendChild(tdEl);

  cookieTable.appendChild(trEl);
};


function footerTotals() {

  let dailyLocationTotal = 0;
  let totalCell = [];
  for (let i = 0; i < hours.length; i++) {
    let initial = 0;
    for (let j = 0; j < allLocations.length; j++) {
      initial += allLocations[j].collectedCookiesPerHour[i];

    }
    dailyLocationTotal += initial;
    console.log(dailyLocationTotal);
    totalCell.push(initial);
  }
  totalCell.push(dailyLocationTotal);

  let trEl = document.createElement('tr');
  trEl.setAttribute('id', 'footer'); 
  let thEl = document.createElement('th');
  thEl.textContent = 'Totals';
  trEl.appendChild(thEl);
  cookieTable.appendChild(trEl);
  console.log(thEl);

  for (let k = 0; k < totalCell.length; k++) {
    let tdEl = document.createElement('td');
    tdEl.textContent = totalCell[k];
    trEl.appendChild(tdEl);
    cookieTable.appendChild(trEl);
  }
}



function renderAll() {
  
  for (let i = 0; i < allLocations.length; i++) {

    allLocations[i].render();
  }

}
renderAll();
footerTotals();

let newStoreLocation = document.getElementById('new-store-location');

newStoreLocation.addEventListener('submit', handleCommentSubmit);

function handleCommentSubmit(event) {

  event.preventDefault();


  let store = event.target.storeLocation.value;
  let minCus = event.target.minCustomer.value;
  let maxCus = event.target.maxCustomer.value;
  let averagecookie = event.target.avgCookieSales.value;

  let newLocation = new Storelocation(store, minCus, maxCus, averagecookie);

  cookieTable.innerHTML = '';
  makeHeaderRow();
  newLocation.dailyCustomersPerHour();
  newLocation.dailyCookiesSoldperHour();
  newLocation.collectedTotalCookies();
  renderAll();

 
  footerTotals(); 
}

newStoreLocation.addEventListener('submit', handleCommentSubmit);


