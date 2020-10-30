/*
    const {argFoo, foo} = factorList[ix]
 */

const pNeAsync = async (list, factorList, failFast=true) => {
    const errors = [];
    async function recur(data, ix = 0){
        const {argFoo, foo} = factorList[ix];
        return await Promise.all(data.map(async datum => {
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
                return {
                    parent: datum,
                    children: 'error'
                }
            }

            if(ix === factorList.length - 1){
                return {
                    parent: datum,
                    children: res
                };
            } else {
                return await new Promise((resolve, reject) => {
                    recur(res, ix + 1)
                        .then(children => resolve({
                            parent: datum,
                            children
                        }))
                });
            }
        }))
    }

   const res = await recur(list);
    return [res, errors];
};

module.exports = pNeAsync;