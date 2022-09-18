
# model-args

## About

This package consists of one primary function: `modelArgs`. It's main purpose is to somewhat simulate the effects of method/function overloading by allowing you to handle different argument types in a much easier way.

## Install
### npm:
```
npm i model-args
```

## modelArgs

This function requires you to create a desired *model* of how your function arguments should be received based on type and order.

The first argument to `modelArgs` (the argument schema array) is **required**, and the second variadic argument is **optional**.

* *arg#1:* **schemaArray** *&lt;object[]>*
  - An array containing objects that describe how the argument at that array index should look. Each object inside the array is structured as such: `{ rule: ['expectedArgType', altValueMapping<object>], default: <any> }` as has two fields:

    * **rule** *&lt;array>*
      - The schema rule for that argument. The first index of the array represents what the expected type of the argument should be, whereas the second index of the array lets you define alternative type options if you get a mismatched value.\
      \
      **Example:** `[0]: { rule: ['string', {number: 'something else'}] }`\
      \
      This means we expect a value of *string* as our first argument, but if it gets a *number* type instead, then change it's value to `'something else'`
      </br>
      </br>
    - **default** *&lt;any>*
      * The default value to assign the argument if no arguments of that type were found and eligible to take it's place.\
      \
      **Example:** `[1]: { rule: ['string'], default: 100 }`
      \
      \
      This means if no argument of type *string* is found or no string type is able to take it's place, then the argument value will default to `100`.
      </br>

* *arg#2* **...args** *&lt;any>*
  - Any stream of arguments to be modeled by the schema array. It is important to note that the order of these arguments **matter**, as they will be matched up one-to-one with the indices of the schemaArray in sequential order.

**returns:** *&lt;any[]>*
  - The array of sorted arguments

## Case #1: Simple Reassignment
Assume we want a function with constructors:
* `function(name<string>, age<number>)`
* `function(name<string>)`
* `function(age<number>)`

We can do:

```js
const modelArgs = require('model-args');

const foo = (name, age) => {
  [name, age] = modelArgs([
    { rule: ['string'] },
    { rule: ['number'] }
  ], name, age);

  console.log(name, age);
}

foo('bob', 24)  // => 'bob', 24
foo(24)         // => undefined, 24
foo('bob')      // => 'bob', undefined
```

Notice how we had to repeat the variables `name` and `age` quite a bit. We can avoid this repetition by passing variadic arguments instead:

```js
const modelArgs = require('model-args');

const foo = (...args) => {
  const [name, age] = modelArgs([
    { rule: ['string'] },
    { rule: ['number'] }
  ], ...args);

  console.log(name, age);
}

foo('bob', 24)  // => 'bob', 24
foo(24)         // => undefined, 24
foo('bob')      // => 'bob', undefined
```

We can do this for as many arguments as we want, and for repeating argument types as well. Consider this case:

```js
const foo = (...args) => {
  const [firstName, lastName, isHealthy, age] = modelArgs([
    { rule: ['string'] },
    { rule: ['string'] },
    { rule: ['boolean' }
    { rule: ['number'] }
  ], ...args);

  console.log(firstName, lastName, isHealth, age);
}

foo(46, 'william', true, 'horn')  // => 'william', 'horn', true, 46
foo(54, 75, 23, 'william')        // => 'william', undefined, undefined, undefined
foo(false, 54)                    // => undefined, undefined, false, 54
// ...etc
```

As you can see, we always get the expected values back in the right order. If the argument doesn't exist or it has already been used, missing slots will just be `undefined`.

## Case #2: Assigning Defaults

As mentioned previously, if an argument type is not found or the argument has already been allocated to a slot that it needs to fill, we can use the `default` field inside the schema rows to define a default value.

**Using the last example from Case #1:**
```js
const foo = (...args) => {
  const [firstName, lastName, isHealthy, age] = modelArgs([
    { rule: ['string'], default: 'jon' },
    { rule: ['string'], default: 'swinda' },
    { rule: ['boolean'] },
    { rule: ['number'], default: 9001 }
  ], ...args);

  console.log(firstName, lastName, isHealth, age);
}

foo(46, true, 'william')   // => 'william', 'swinda', true, 46
foo()                      // => 'jon', 'swinda', undefined, 9001
foo(false, 'william', 54)  // => 'william', 'swinda', false, 54
// ...etc
```

## Case #3: Assigning Alternate Types

Default values are great and all, but there's one last control option we have in terms of evaluating mismatched types. The `altTypes` object.

**Let's view this new example:**

```js
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
// ...etc
```

You can also combine the `altTypes` field with the `default` field:

```js
const product = (...args) => {
  const [name, price] = modelArgs([
    { rule: ['string', {boolean: 'got boolean!'}], default: 'some default' },
    { rule: ['number', {string: 'got string!'}], default: 433 },
  ], ...args);

  console.log(name, price);
}

product(true, 100)    // => 'got boolean!', 100
product(300, 300)     // => 'some default', 300
product()             // => 'some default', 433
product(true, 'str')  // => 'got boolean!', 'got string!'
```

Notice how the `altType` values take priority over the `default` values. This is intentional, as the purpose of the `altType` object is to act like a middleman between the expected value existing and resorting to a default value.

## License
* #### [**ISC License**](https://opensource.org/licenses/ISC)

## Author

**Package author and documentation by:** *William J. Horn*

**Reach me at:**

* [*github*](https://github.com/william-horn)
* [*email: williamjosephhorn@gmail.com*](williamjosephhorn@gmail.com)


