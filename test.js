const pneAsync = require('./index');


const asyncFunc = async () => new Promise(resolve =>
    setTimeout(resolve, getRandomArbitrary(1000, 1500), [1,'e',3,4,'f',6] ));


const  getRandomArbitrary = (min, max) =>
    Math.random() * (max - min) + min;


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
        }]);
};


Promise.resolve(test())
    .then(res => {
        console.log(JSON.stringify(res));
        console.log('******** Program Ended ********')
    });

