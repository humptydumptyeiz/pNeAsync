const expect = require('chai').expect;

const pneAsync = require('../index');

const asyncSomeErrorsFunc = async arg => await new Promise((resolve, reject) =>
    setTimeout(() => {
        arg % 2 === 0 ? resolve(inputArr) : reject(Error('Dummy Error'));
    }, 0));

const asyncNoErrorFunc = async arg => await new Promise((resolve, reject) =>
    setTimeout(resolve, 0, inputArr));


const inputArr = [
    {id: 1},
    {id: 2},
    {id: 3},
];

const factorListNoError = [
    {
        argFoo: elm => elm.id,
        foo: asyncNoErrorFunc
    },
    {
        argFoo: elm => elm.id,
        foo: asyncNoErrorFunc
    }
];

const factorListSomeErrors = [
    {
        argFoo: elm => elm.id,
        foo: asyncSomeErrorsFunc
    }
];

describe('pneAsync when no exception is raised by any of the async functions', function() {
    it('a result array and an empty errors array is returned', async function(){
        let result, errors,
            error = null;
        try{
            [result, errors] = await pneAsync(inputArr, factorListNoError);
        } catch(err){
            error = err;
        }
        expect(error).to.equal(null);
        expect(errors.length).to.equal(0);
        expect(result[0].hasOwnProperty('parent')).to.equal(true);
        expect(result[0].hasOwnProperty('children')).to.equal(true);
        expect(result[0].children.length).to.equal(inputArr.length);
        expect(result[0].children[0].children[0].id).to.equal(1);
    })
});

describe('pneAsync when at least one exception is raised and fallFast is set to true', function() {
   it('an exception will be raised', async function(){
       let error = null;
       try{
           const [result, errors] = await pneAsync(inputArr, factorListSomeErrors, true);
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
});