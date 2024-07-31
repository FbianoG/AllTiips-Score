const calculate = (lambda: number, k: any, saves: any, setSaves: any, ind: number) => {

    let pLessThanK = 0;

    for (let i = 0; i < k; i++) {
        pLessThanK += poissonProbability(lambda, i);
    }

    setSaves(
        saves.map((e: any, index: any) => {
            if (index === ind) {
                e.result = ((1 - pLessThanK) * 100).toFixed(1)
                return e
            } else return e
        })
    )


    return 1 - pLessThanK;
}

const poissonProbability = (lambda: any, k: any) => {
    return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

const factorial = (n: any) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

export { calculate }