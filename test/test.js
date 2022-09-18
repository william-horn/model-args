
const modelArgs = require('model-args');



const product = (...args) => {
  const [name, price, quantity, forSale, buy] = modelArgs([
    { rule: ['string'], default: 'none' },
    { rule: ['number'] },
    { rule: ['number'], default: 0 },
    { rule: ['boolean'], default: true },
    { rule: ['function', {number: 'got a number', string: 'got a string!'}] }
  ], ...args);

  console.log(name, price, quantity, forSale, buy);
}

product(2.43, true, 'soap')       // => 'soap', 2.43, 0, true, undefined
product('soap', false, 1, 3, 420) // => 'soap', 1, 3, false, 'got a number'
product(true, true, 1, 1, 'str')  // => 'str', 1, 1, true, 'got a string!'