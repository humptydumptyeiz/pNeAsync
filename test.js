const util = require('util');

const pneAsync = require('./index');


const asyncFunc = async () => new Promise((resolve, reject) =>
    setTimeout(() => {
        const rej = getRandomArbitrary(0,10) % 2 === 0;
        if(rej){
            reject(Error('Dummy Error'));
        } else {
            resolve([1,2,3]);
        }
        // resolve([1,2,3])
    }, getRandomArbitrary(100, 500) ));


const  getRandomArbitrary = (min, max) =>
    Math.ceil(Math.random() * (max - min) + min);


const test = async () => {
    return await pneAsync(['a', 'b', 'c'], [{
        arg: 1,
        typeOfArg: 'value',
        foo: asyncFunc
    },
        {
            arg: 2,
            typeOfArg: 'value',
            foo: asyncFunc
        },
        {
            arg: 3,
            typeOfArg: 'value',
            foo: asyncFunc
        },
        {
            arg: 4,
            typeOfArg: 'value',
            foo: asyncFunc
        },
        {
            arg: 5,
            typeOfArg: 'value',
            foo: asyncFunc
        },
        {
            arg: 7,
            typeOfArg: 'value',
            foo: asyncFunc
        }], false);
};


Promise.resolve(test())
    .then(res => {
        console.log(util.inspect(res[0], true, null));
        console.log(res[1])
        // console.log(JSON.stringify(res));
        console.log('******** Program Ended ********')
    });

