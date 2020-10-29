/*
    const {arg, typeOfArg, asyncFunc} = factorList[ix]
 */

const pNeAsync = async (list, factorList, failFast=true) => {
    const errors = [];
    async function recur(data, ix = 0){
        const {arg, typeOfArg, foo} = factorList[ix];
        return await Promise.all(data.map(async datum => {
            let res;
            try{
                res = typeOfArg === 'value' ?
                    await foo(arg) : await foo(datum[arg]);
            } catch(err){
                if(failFast){
                    throw err;
                }
                errors.push({
                    object: datum,
                    depth: ix,
                    arg,
                    typeOfArg,
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
                        .catch(err => {
                            if(failFast){
                                throw err;
                            }
                        })
                });
            }
        }))
            .catch(err => {
                if(failFast){
                    throw err;
                }
            });
    }

   const res = await recur(list);
    return [res, errors];
};

module.exports = pNeAsync;