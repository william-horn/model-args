
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

## Case #1:
Assume we want a function with constructors:
* `function(name<string>, age<number>)`
* `function(name<string>)`
* `function(age<number>)`

```js
const modelArgs = require('model-args');

const foo = (name, age) => {
  const
}
```
