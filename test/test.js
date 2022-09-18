
const modelArgs = require('model-args');



const foo = (...args) => {
  const [firstName, lastName, isHealthy, age] = modelArgs([
    { rule: ['string'], default: 'jon' },
    { rule: ['string'], default: 'swinda' },
    { rule: ['boolean'] },
    { rule: ['number'], default: 9001 }
  ], ...args);

  console.log(firstName, lastName, isHealthy, age);
}

foo(46, true, 'william')      // => 'william', 'swinda', true, 46
foo()                         // => 'william', undefined, undefined, undefined
foo(false, 54)                // => undefined, undefined, false, 54
// ...etc