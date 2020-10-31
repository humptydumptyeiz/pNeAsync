const pneAsync = require('../index');

const asyncSomeErrorsFunc = async arg => await new Promise((resolve, reject) =>
    setTimeout(() => {
        arg % 2 === 0 ? resolve(inputArr) : reject(Error('Dummy Error'));
    }, 0));


const inputArrLength = 100;

const inputArr = [...Array(inputArrLength).keys()].map(i => ({id: i}));

const factorListLength = 10;

const factorList = [...Array(factorListLength).keys()].map(i => ({
    argFoo: elm => elm.id,
    foo: asyncSomeErrorsFunc
}));


new Promise(resolve => {
    const startTime = new Date();
    return pneAsync(inputArr, factorList, false)
        .then(res => {
            const stopTime = new Date();
            const netTime = stopTime - startTime;
            resolve(`Input array length - ${inputArrLength}${'\n'}factorList length - ${factorListLength}${'\n'}async function timeout - 0${'\n'}Execution Time - ${netTime}ms`)
        })
})
.then(res => console.log(res));