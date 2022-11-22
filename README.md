# First Promise to Come is First to be Served

Receives an array of promises (not an iterator) and returns an async generator that yields objects like  `{ value: promiseResult, index: promiseIndex, status: 'fulfilled' }` in the order they are fulfilled. 

In case of rejection, the generator yields objects with this shape: `{ reason: errorMessage, index: promiseIndex, status: 'rejected' }`

## Usage

Write your usage here

## Installation

```
npm i frstcmfrstsvd
```

or

```
yarn add frstcmfrstsvd
```

## Disclaimer 

Write your disclaimer here

## Introduction

### Motivation

If you use for-await-of on an array of promises, you iterate over it in the specified order, doesn't matter if the next promise in the given array is resolved before the previous one:

```javascript
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

(async function () {
    const arr = [
        sleep(2000).then(() => 'a'),
        'x',
        sleep(1000).then(() => 'b'),
        'y',
        sleep(3000).then(() => 'c'),
        'z',
    ];

    for await (const item of arr) {
        console.log(item);
    }
}());
```

Output:

```
➜  firstcomefirstserved git:(main) node examples/for-await-simple.js 
a
x
b
y
c
z
```

### Goal

But sometimes you want to process the results as soon as the promises yield them. To achieve it, import the current module and use it as in this example:

```javascript

import firstComeFirstServed from 'frstcmfrstsvd';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(2000).then(() => 'a'),
    'x',
    sleep(1000).then(() => 'b'),
    'y',
    sleep(3000).then(() => 'c'),
    'z',
];

console.log(firstComeFirstServed);

(async () => {
    for await (let item of firstComeFirstServed(arr)) {
        console.log("item = ",item);
    }
})()
```

Output:

```
➜  firstcomefirstserved git:(main) node examples/hello-frstcmfrstsvd.mjs 
[AsyncGeneratorFunction: frstcmfrstsvd]
item =  { value: 'x', index: 1, status: 'fulfilled' }
item =  { value: 'y', index: 3, status: 'fulfilled' }
item =  { value: 'z', index: 5, status: 'fulfilled' }
item =  { value: 'b', index: 2, status: 'fulfilled' }
item =  { value: 'a', index: 0, status: 'fulfilled' }
item =  { value: 'c', index: 4, status: 'fulfilled' }
```

## Error Management Example

Write your example here


 ## Performance Study

Write your performance study here