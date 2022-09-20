
const modelArgs = require('model-args');



const foo = (...args) => {
  const [first, second, third, fourth, fifth, sixth] = modelArgs([
    { type: { string: true }, got: { number: 'asd'} },
    { type: { number: true, boolean: true } }, 
    { type: { string: str => str.toUpperCase() }, required: true},
    { type: { string: true, number: num => num + 45 }, got: { number: 'ouh' } },
    { type: { boolean: true, number: true }, got: { number: () => 8 } },
    { type: { number: true } }
  ], ...args);

  console.log(first, second, third, fourth, fifth, sixth);
}

foo(5, 'there', 'world', 78, 0);
