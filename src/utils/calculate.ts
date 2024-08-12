const calculate = (lambda: number, k: number, saves: any[], setSaves: any, ind: number) => {
    if (k > 100) return;

    // Calcula a probabilidade acumulada de eventos menores que k
    let pLessThanK = 0;
    for (let i = 0; i < k; i++) {
        pLessThanK += poissonProbability(lambda, i);
    }

    // Calcula a probabilidade de sucesso ajustada
    const adjustedProbability = 1 - pLessThanK;

    setSaves(
        saves.map((e: any, index: number) => {
            if (index === ind) {
                e.result = (adjustedProbability * 100).toFixed(1);
                return e;
            }
            return e;
        })
    );

    return adjustedProbability;
}

const poissonProbability = (lambda: number, k: number) => {
    return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

const factorial = (n: number) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

export { calculate }