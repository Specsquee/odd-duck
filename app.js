'use strict';

// ----- Global Variables -----

let interestingStuff = [];
let votingRounds = 25;

// ----- DOM Windows -----

let imageHolder = document.getElementById('imageHolder');
let productOne = document.getElementById('productOne');
let productTwo = document.getElementById('productTwo');
let productThree = document.getElementById('productThree');
let showStats = document.getElementById('show-stats');
// let resultsShow = document.getElementById('results');
let canvasElem = document.getElementById('chart');

// ----- Constructor Functions -----

function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// ----- Helper Functions -----

function randomArray() {
  return Math.floor(Math.random() * interestingStuff.length);
}

let randArray = [];
let noRepeat = [0, 0, 0];
function renderProduct() {

  while (randArray.length < 3) {
    let randoNum = randomArray();
    if (!randArray.includes(randoNum) && !noRepeat.includes(randoNum)) {
      randArray.push(randoNum);
    }
  }

  // console.log(interestingStuff);

  // while (productOneIndex === productTwoIndex || productTwoIndex === productThreeIndex || productOneIndex === productThreeIndex)
  let productOneIndex = randArray.pop();
  let productTwoIndex = randArray.pop();
  let productThreeIndex = randArray.pop();
  noRepeat.pop();
  noRepeat.pop();
  noRepeat.pop();
  noRepeat.push(productOneIndex);
  noRepeat.push(productTwoIndex);
  noRepeat.push(productThreeIndex);


  productOne.src = interestingStuff[productOneIndex].img;
  productTwo.src = interestingStuff[productTwoIndex].img;
  productThree.src = interestingStuff[productThreeIndex].img;

  productOne.title = interestingStuff[productOneIndex].name;
  productTwo.title = interestingStuff[productTwoIndex].name;
  productThree.title = interestingStuff[productThreeIndex].name;

  productOne.alt = `Image of ${interestingStuff[productOneIndex].name}`;
  productTwo.alt = `Image of ${interestingStuff[productTwoIndex].name}`;
  productThree.alt = `Image of ${interestingStuff[productThreeIndex].name}`;

  interestingStuff[productOneIndex].views++;
  interestingStuff[productTwoIndex].views++;
  interestingStuff[productThreeIndex].views++;

}

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < interestingStuff.length; i++) {
    productNames.push(interestingStuff[i].name);
    productVotes.push(interestingStuff[i].votes);
    productViews.push(interestingStuff[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1
      },
      {
        label: '# of Views!',
        data: productViews,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(canvasElem, chartObj);
}

// ----- Event Handlers -----

function handleClick(event) {
  let imgClicked = event.target.title;

  for (let i = 0; i < interestingStuff.length; i++) {
    if (imgClicked === interestingStuff[i].name) {
      interestingStuff[i].votes++;
    }
  }

  renderProduct();

  votingRounds--;

  console.log(votingRounds);

  if (votingRounds === 0) {
    imageHolder.removeEventListener('click', handleClick);

    let productString = JSON.stringify(interestingStuff);
    console.log('Woot Woot', productString);

    localStorage.setItem('interestingStuff', productString);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    renderChart();
  }
}

// ----- Executables -----

let productGrab = localStorage.getItem('interestingStuff');

let productParse = JSON.parse(productGrab);
console.log('Stuff parsed');

if (productGrab) {
  interestingStuff = productParse;
} else {

  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogDuck = new Product('dog-duck');
  let dragon = new Product('dragon');
  let pen = new Product('pen');
  let petSweet = new Product('pet-sweep');
  let scissors = new Product('scissors');
  let shark = new Product('shark');
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let waterCan = new Product('water-can');
  let wineGlass = new Product('wine-glass');

  interestingStuff.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweet, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
}

renderProduct();

imageHolder.addEventListener('click', handleClick);
showStats.addEventListener('click', handleShowResults);
