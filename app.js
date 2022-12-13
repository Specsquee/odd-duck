'use strict';

// ----- Global Variables -----

let interestingStuff = [];
let votingRounds = 15;

// ----- DOM Windows -----

let imageHolder = document.getElementById('imageHolder');
let productOne = document.getElementById('productOne');
let productTwo = document.getElementById('productTwo');
let productThree = document.getElementById('productThree');
let showStats = document.getElementById('show-stats');
let resultsShow = document.getElementById('results');

// ----- Constructor Functions -----

function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
// interestingStuff.push(this);
}

// ----- Helper Functions -----

function randomArray() {
  return Math.floor(Math.random() * interestingStuff.length);
}

function renderProduct() {
  let productOneIndex = randomArray();
  let productTwoIndex = randomArray();
  let productThreeIndex = randomArray();

  console.log(interestingStuff);

  while (productOneIndex === productTwoIndex || productTwoIndex === productThreeIndex || productOneIndex === productThreeIndex){
    productOneIndex = randomArray();
    productTwoIndex = randomArray();
  }
  // console.log(typeof productOneIndex, productTwoIndex, productThreeIndex);
  // console.log(typeof interestingStuff[productOneIndex]).img;

  productOne.src = interestingStuff[productOneIndex].img;
  console.log(typeof interestingStuff[productOneIndex]).img;
  // console.log(productOne.src);
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

// ----- Event Handlers -----

function handleClick(event) {
  let imgClicked = event.target.title;

  for (let i = 0; i < interestingStuff.length; i++) {
    if (imgClicked === interestingStuff[i].name) {
      interestingStuff[i].votes++;
    }
  }

  votingRounds--;

  renderProduct();

  if (votingRounds === 0) {
    imageHolder.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < interestingStuff.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${interestingStuff[i].name} - views: ${interestingStuff[i].views} & votes: ${interestingStuff[i].votes}`;
      resultsShow.appendChild(liElem);
    }
    showStats.removeEventListener('click', handleShowResults);
  }
}

// ----- Executables -----

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


renderProduct();

imageHolder.addEventListener('click', handleClick);
resultsShow.addEventListener('click', handleShowResults);
productOne.addEventListener('click', handleClick);
productTwo.addEventListener('click', handleClick);
productThree.addEventListener('click', handleClick);
