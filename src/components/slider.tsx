import { useState } from 'react'
import './Slider.css'

const Slider = ({ saves, setSaves }) => {
    const [showSlider, setShowSlider] = useState<boolean>(false)



    const fundaments = [
        {
            id: 'goals',
            name: 'Gol'
        },
        {
            id: 'totalShots',
            name: 'Finalização (Total)'
        },
        {
            id: 'shotsOnTarget',
            name: 'Finalização (Ao Gol)'
        },
        {
            id: 'accuratePasses',
            name: 'Passes'
        },
        {
            id: 'tackles',
            name: 'Desarmes'
        },
        {
            id: 'yellowCards',
            name: 'C.Amarelo'
        },
    ]


    const targetFundament = (id: number) => {

        const fundament = fundaments.find((element: any) => (element.id === id))

        return fundament?.name
    }

    const [res, setRes] = useState<any>()

    const calculate = (lambda: any, k: any, element: any) => {
        lambda = Number(lambda)
        k = Number(k)

        console.log(lambda, k)

        let pLessThanK = 0;
        // Calcula a soma das probabilidades de fazer menos de k gols
        for (let i = 0; i < k; i++) {
            pLessThanK += poissonProbability(lambda, i);
        }
        // A probabilidade de fazer k ou mais gols é o complemento

        element.result = ((1 - pLessThanK) * 100).toFixed(2)
        return 1 - pLessThanK;
    }

    const poissonProbability = (lambda: any, k: any) => {
        return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
    }

    const factorial = (n) => {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    const deleteItem = (id: number, type: string) => {


        const newPlayers = saves.filter((element: any) => element.statistics.id !== id)


        console.log(newPlayers)
        setSaves(newPlayers)





    }

    return (
        <div className='slider' style={showSlider ? { transform: 'translateY(0)' } : {}}>

            <button className='slider__btn' onClick={() => setShowSlider(!showSlider)}>🔼</button>

            <ul>

                {saves &&

                    saves.map((element: any) => (
                        <div className='slider__item'>
                            <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />
                            <div className="slider__data">
                                <h4>{element.player.shortName}</h4>
                                <span> {targetFundament(element.type)}</span>
                                <input type='number' onChange={(e) => calculate(element.average, e.target.value, element)} placeholder='Meta da Aposta' />

                            </div>
                            <div className="slider__data" style={{ margin: '0 0 0 auto' }}>
                                <span>{element.average}</span>
                                <span className='slider__result'>{element.result}%</span>
                            </div>

                            <button className='slider__delete' title='Remover Jogador' onClick={() => deleteItem(element.statistics.id, element.type)}>❌</button>
                        </div>
                    ))


                }

                {saves.length < 1 && <h3 style={{ color: '#fdfdfd' }}>Não possui jogador na lista!</h3>}
            </ul>



        </div >
    )
}

export default Slider