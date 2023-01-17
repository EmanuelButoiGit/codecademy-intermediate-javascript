// An asynchronous operation ⌛
// is one that allows the computer to “move on” 🏃‍♀️ to other tasks ⚙️ while waiting 🕒
// for the asynchronous operation to complete ✔️.

// Operations like making a network request 🌐 or querying a database 🖧 can be time-consuming 🥱, 
// but JavaScript allows us to execute other tasks while awaiting ⏰ their completion.


// What are Promises? 💍
// are objects that represent the eventual outcome of an asynchronous operation. 

// A Promise object can be in one of three states:
// 1️. Pending: The initial state— the operation has not completed yet. ⏲️
// 2. Fulfilled: The operation has completed successfully and the promise now has a resolved value. ✔️
// For example, a request’s promise might resolve with a JSON object as its value.
// 3. Rejected: The operation has failed and the promise has a reason for the failure. 
// This reason is usually an Error of some kind.

// see Promise.png to understand better.

// Example of promise:
const inventory = {
    sunglasses: 1900,
    pants: 1088,
    bags: 1344
};
  
// Write your code below:
const myExecutor = (resolve, reject) => {
if(inventory.sunglasses > 0){
  resolve('Sunglasses order processed.');
} else {
  reject('That item is sold out.');
}
}

function orderSunglasses(){
  return new Promise(myExecutor);
}

const orderPromise = orderSunglasses();
console.log(orderPromise);


//setTimout()

console.log("This is the first line of code in app.js.");
// Keep the line above as the first line of code
// Write your code here:
function usingSTO(){
  console.log('Yay! Coding is so fun!!');
  setTimeout(usingSTO, 2000)
}

// Keep the line below as the last line of code:
console.log("This is the last line of code in app.js.");



// Consuming Promises 🍔
// The initial state of an asynchronous promise is pending 🔄, 
// but we have a guarantee that it will settle. With .then() ✔️

// .then() is a higher-order function— it takes two callback functions as arguments. 
// We refer to these callbacks as handlers 🔧. When the promise settles, 
// the appropriate handler will be invoked with that settled value.

// The first handler, sometimes called onFulfilled ✔️, is a success handler, 
// and it should contain the logic for the promise resolving.

// The second handler, sometimes called onRejected ❌, is a failure handler, 
// and it should contain the logic for the promise rejecting.

// see Consuming Promises.png to understand better.


// Success and Failure Callback Functions
const {checkInventory} = require('./library.js');

const order = [['sunglasses', 1], ['bags', 2]];

// Write your code below:
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectReason) => {
  console.log(rejectReason);
};

checkInventory(order)
  .then(handleSuccess, handleFailure);


// .catch()
const {checkInventory} = require('./library.js');

const order2 = [['sunglasses', 1], ['bags', 2]];

const handleSuccess2 = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure2 = (rejectReason) => {
  console.log(rejectReason);
};

// Write your code below:
checkInventory(order)
  .then(handleSuccess).catch(handleFailure);


// Chaining Multiple Promises

//store.js
const store = {
    sunglasses: {
      inventory: 817, 
      cost: 9.99
    },
    pants: {
      inventory: 236, 
      cost: 7.99
    },
    bags: {
      inventory: 17, 
      cost: 12.99
    }
  };
  
  const checkInventory2 = (order) => {
    return new Promise ((resolve, reject) => {
     setTimeout(()=> {  
     const itemsArr = order.items;  
     let inStock = itemsArr.every(item => store[item[0]].inventory >= item[1]);
     
     if (inStock){
       let total = 0;   
       itemsArr.forEach(item => {
         total += item[1] * store[item[0]].cost
       });
       console.log(`All of the items are in stock. The total cost of the order is ${total}.`);
       resolve([order, total]);
     } else {
       reject(`The order could not be completed because some items are sold out.`);
     }     
  }, generateRandomDelay());
   });
  };
  
  const processPayment = (responseArray) => {
    const order = responseArray[0];
    const total = responseArray[1];
    return new Promise ((resolve, reject) => {
     setTimeout(()=> {  
     let hasEnoughMoney = order.giftcardBalance >= total;
     // For simplicity we've omited a lot of functionality
     // If we were making more realistic code, we would want to update the giftcardBalance and the inventory
     if (hasEnoughMoney) {
       console.log(`Payment processed with giftcard. Generating shipping label.`);
       let trackingNum = generateTrackingNumber();
       resolve([order, trackingNum]);
     } else {
       reject(`Cannot process order: giftcard balance was insufficient.`);
     }
     
  }, generateRandomDelay());
   });
  };
  
  
  const shipOrder = (responseArray) => {
    const order = responseArray[0];
    const trackingNum = responseArray[1];
    return new Promise ((resolve, reject) => {
     setTimeout(()=> {  
       resolve(`The order has been shipped. The tracking number is: ${trackingNum}.`);
  }, generateRandomDelay());
   });
  };
  
  
  // This function generates a random number to serve as a "tracking number" on the shipping label. In real life this wouldn't be a random number
  function generateTrackingNumber() {
    return Math.floor(Math.random() * 1000000);
  }
  
  // This function generates a random number to serve as delay in a setTimeout() since real asynchrnous operations take variable amounts of time
  function generateRandomDelay() {
    return Math.floor(Math.random() * 2000);
  }
  
  module.exports = {checkInventory, processPayment, shipOrder};

// app.js
const {checkInventory, processPayment, shipOrder} = require('./library.js');

const order3 = {
  items: [['sunglasses', 1], ['bags', 2]],
  giftcardBalance: 79.82
};

checkInventory(order3)
.then((resolvedValueArray) => {
  // Write the correct return statement here:
return processPayment(resolvedValueArray);
 
})
.then((resolvedValueArray) => {
  // Write the correct return statement here:
return shipOrder(resolvedValueArray);
})
.then((successMessage) => {
  console.log(successMessage);
})
.catch((errorMessage) => {
  console.log(errorMessage);
});
