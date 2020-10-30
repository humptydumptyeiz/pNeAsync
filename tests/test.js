const expect = require('chai').expect;

const pneAsync = require('../index');

const asyncSomeErrorsFunc = async arg => await new Promise((resolve, reject) =>
    setTimeout(() => {
        arg % 2 === 0 ? resolve(inputArr) : reject('Dummy Error');
    }, getRandomInRange(10, 50) ));

const asyncNoErrorFunc = async arg => await new Promise((resolve, reject) =>
    setTimeout(resolve, getRandomInRange(10,50), inputArr));

const  getRandomInRange = (min, max) =>
    Math.ceil(Math.random() * (max - min) + min);

const inputArr = [
    {a: 1},
    {a: 2},
    {a: 3},
    {a: 4},
    {a: 5}
];

const factorListNoError = [{
        arg: 'a',
        typeOfArg: 'property',
        foo: asyncNoErrorFunc
    },
    {
        arg: 'a',
        typeOfArg: 'property',
        foo: asyncNoErrorFunc
    },
    {
        arg: 3,
        typeOfArg: 'value',
        foo: asyncNoErrorFunc
    },
    {
        arg: 4,
        typeOfArg: 'value',
        foo: asyncNoErrorFunc
    },
    {
        arg: 'a',
        typeOfArg: 'property',
        foo: asyncNoErrorFunc
    },
    {
        arg: 6,
        typeOfArg: 'value',
        foo: asyncNoErrorFunc
    }
];

const factorListSomeErrors = [{
    arg: 'a',
    typeOfArg: 'property',
    foo: asyncSomeErrorsFunc
},
    {
        arg: 'a',
        typeOfArg: 'property',
        foo: asyncSomeErrorsFunc
    },
    {
        arg: 3,
        typeOfArg: 'value',
        foo: asyncSomeErrorsFunc
    },
    {
        arg: 4,
        typeOfArg: 'value',
        foo: asyncSomeErrorsFunc
    },
    {
        arg: 'a',
        typeOfArg: 'property',
        foo: asyncSomeErrorsFunc
    },
    {
        arg: 6,
        typeOfArg: 'value',
        foo: asyncSomeErrorsFunc
    }
];

describe('pneAsync when no exception is raised by any of the async functions', function() {
    it('a result array and an empty errors array is returned', async function(){
        const [result, errors] = await pneAsync(inputArr, factorListNoError);
        expect(errors.length).to.equal(0);
        expect(result[0].hasOwnProperty('parent')).to.equal(true);
        expect(result[0].hasOwnProperty('children')).to.equal(true);
        expect(result[0].children.length).to.equal(inputArr.length);
        expect(result[0].children[0].children[0].children[0].children[0].children[0].children[0].a).to.equal(1);
    });
})

describe('pneAsync when at least one exception is raised and fallFast is set to true', function() {
   it('an exception will be raised', async function(){
       let error = null;
       try{
           const [result, errors] = await pneAsync(inputArr, factorListSomeError, true);
       } catch (err){
           error = err;
       }
       expect(error).to.not.equal(null);
   })
});

describe('pneAsync when at least one exception is raised and failFast is set to false', function(){
    it('a result array and an error array will be returned and no exception will be raised', async function (){
        let error = null;
        let result, errors;
        try{
            [result, errors] = await pneAsync(inputArr, factorListSomeErrors, false);
        } catch (err){
            error = err;
        }
        expect(error).to.equal(null);
        expect(result.length).to.greaterThan(0);
        expect(errors.length).to.greaterThan(0);
    })
})