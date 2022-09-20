
const modelArgs = require('model-args');



const foo = (...args) => {
  const [first, second, third, fourth, fifth, sixth] = modelArgs([
    { type: { string: true }, got: { number: 'asd'} },
    { type: { number: true, boolean: true } }, 
    { type: { ['CustomType']: true } },
    { type: { object: true } },
    { type: { boolean: true, number: true }, else: 'lol' },
    { type: { number: true } }
  ], ...args);

  console.log(first, second, third, fourth, fifth, sixth);
}

foo(5, 'there', 'world', {_customType: 'CustomType'}, {}, 78, 0);
