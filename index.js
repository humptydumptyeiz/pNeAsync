/*
    const {argFoo, foo} = factorList[ix]
 */

const pNeAsync = async (list, factorList, failFast= true) => {
    const errors = [];
    const result = [];
    async function recur(data, acc, ix = 0){
        const {argFoo, foo} = factorList[ix];
        await Promise.all(data.map(async datum => {
            let res;
            try{
                res = await foo(argFoo(datum));
            } catch(err){
                if(failFast){
                    throw err;
                }
                errors.push({
                    object: datum,
                    depth: ix,
                    argFoo,
                    foo,
                    error: err
                });
                acc.push({
                    parent: datum,
                    children: 'error'
                });
                return;
            }

            if(ix === factorList.length - 1){
                acc.push({
                    parent: datum,
                    children: res
                });
            } else {
                acc.push({
                    parent: datum,
                    children: []
                });
                const newAcc = acc[acc.length -1].children;
                await(recur(res, newAcc, ix + 1));
            }
        }));
    }
    await recur(list, result);
    return [result, errors];
};

module.exports = pNeAsync;
