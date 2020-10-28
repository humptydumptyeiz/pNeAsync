/*
    const {arg, typeOfArg, asyncFunc} = factorList[ix]
 */

const pneAsync = async (list, factorList) => {

    async function recur(data, ix = 0){
        const {arg, typeOfArg, foo} = factorList[ix];
        return await Promise.all(data.map(async datum => {
            const res = typeOfArg === 'value' ?
                await foo(arg) : await foo(datum[arg]);
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
                        .catch(err => reject(err));
                });
            }
        }));
    }

    return await recur(list);
};

module.exports = pneAsync;