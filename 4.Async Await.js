// An async function will return in one of three ways:

// 1. If there’s nothing returned from the function, it will return a promise with a resolved value of undefined.
// 2. If there’s a non-promise value returned from the function, it will return a promise resolved to that value.
// 3. If a promise is returned from the function, it will simply return that promise

function withConstructor(num){
    return new Promise((resolve, reject) => {
      if (num === 0){
        resolve('zero');
      } else {
        resolve('not zero');
      }
    });
  }
  
withConstructor(0)
  .then((resolveValue) => {
  console.log(` withConstructor(0) returned a promise which resolved to: ${resolveValue}.`);
});

// Write your code below:

async function withAsync(num){
  if (num === 0){
      return 'zero';
    } else {
      return 'not zero';
    }
}

  

// The await Operator

const brainstormDinner = require('./library.js');
// Native promise version:
function nativePromiseDinner() {
  brainstormDinner().then((meal) => {
	  console.log(`I'm going to make ${meal} for dinner.`);
  });
}


// async/await version:
async function announceDinner() {
  // Write your code below:
  let meal = await brainstormDinner();
  console.log(`I'm going to make ${meal} for dinner.`);
}

announceDinner();



// Writing async Functions

/*
This is the shopForBeans function from the last exercise
*/

const shopForBeans = () => {
    return new Promise((resolve, reject) => {
      const beanTypes = ['kidney', 'fava', 'pinto', 'black', 'garbanzo'];
    setTimeout(()=>{
      let randomIndex = Math.floor(Math.random() * 5);
      let beanType = beanTypes[randomIndex];
      console.log(`I bought ${beanType} beans because they were on sale.`);
     resolve(beanType);
    }, 1000)
  })
  }
  
  let soakTheBeans = (beanType) => {
     return new Promise((resolve, reject) => {
       console.log('Time to soak the beans.');
      setTimeout(()=>{
        console.log(`... The ${beanType} beans are softened.`);
        resolve(true);
        }, 1000);
    });
  }
  
  let cookTheBeans = (isSoftened) => {
    return new Promise((resolve, reject) => {
      console.log('Time to cook the beans.');
      setTimeout(()=>{
        if (isSoftened) {
          console.log('... The beans are cooked!');
          resolve('\n\nDinner is served!');
        }
      }, 1000);
    });
  }
  
    
  module.exports = {shopForBeans, soakTheBeans, cookTheBeans};

// app.js
const {shopForBeans, soakTheBeans, cookTheBeans} = require('./library.js');

// Write your code below:
async function makeBeans(){
  let type = await shopForBeans();
  let isSoft = await soakTheBeans(type);
  let dinner = await cookTheBeans(isSoft);
  console.log(dinner);
  makeBeans();
}



// Handling Errors
const cookBeanSouffle = require('./library.js');

// Write your code below:
async function hostDinnerParty(){
  try{
    let dinner = await cookBeanSouffle();
    console.log(`${dinner} is served!`)
  } catch(error){
    console.log(error);
    console.log('Ordering a pizza!');
  }
}

hostDinnerParty();



// Handling Independent Promises

let {cookBeans, steamBroccoli, cookRice, bakeChicken} = require('./library.js')

// Write your code below:

async function serveDinner() {
 const vegetablePromise = steamBroccoli();
 const starchPromise = cookRice();
 const proteinPromise = bakeChicken();
 const sidePromise = cookBeans();
 console.log(`Dinner is served. We're having ${await vegetablePromise}, ${await starchPromise}, ${await proteinPromise}, and ${await sidePromise}.`);
}

serveDinner();



// Await Promise.all()

let {cookBeans, steamBroccoli, cookRice, bakeChicken} = require('./library.js')

// Write your code below:
async function serveDinnerAgain(){
  let foodArray = await Promise.all([steamBroccoli(), cookRice(), bakeChicken(), cookBeans()]); 
  
  console.log(`Dinner is served. We're having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`);
}

serveDinnerAgain();
