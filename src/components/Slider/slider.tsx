import React, { useState } from 'react'
import './Slider.css'
import { calculate } from '../../utils/calculate'
import { ApiPlayerDetail } from '../../interfaces/interface'

interface SliderProps {
    saves: ApiPlayerDetail[]
    setSaves: React.Dispatch<React.SetStateAction<ApiPlayerDetail[]>>
}

const Slider: React.FC<SliderProps> = ({ saves, setSaves }) => {

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
        {
            id: 'assists',
            name: 'Assistências'
        },
        {
            id: 'points',
            name: 'Pontos'
        },
        {
            id: 'blocks',
            name: 'Bloqueios'
        },
        {
            id: 'turnovers',
            name: 'Turnovers'
        },
        {
            id: 'tripleDoubles',
            name: 'Triplo Duplo'
        },
        {
            id: 'doubleDoubles',
            name: 'Duplo Duplo'
        },
        {
            id: 'rebounds',
            name: 'Rebotes'
        },
    ]

    const targetFundament = (id: string) => {
        const fundament = fundaments.find((element: any) => (element.id === id))
        return fundament?.name
    }

    const deletePlayer = (id: number,) => {

        const newPlayers = saves.filter((element: any) => {
            if (element.statistics.id === id) {
                element.result = 0
                return
            } else {
                return element
            }
        })

        setSaves(newPlayers)
    }

    return (
        <div className='slider' style={showSlider ? { bottom: '0' } : {}}>

            <button className='slider__btn' title='Expandir lista' onClick={() => setShowSlider(!showSlider)}>
                <i className="fa-solid fa-chevron-up" style={showSlider ? { transform: 'rotate(180deg)' } : {}}></i>
            </button>

            <ul className='slider__list'>
                {saves &&
                    saves.map((element, index) => (
                        <div className='slider__item'>

                            <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />

                            <div className="slider__data" style={{ margin: '0 auto 0 0' }}>
                                <h4 className='slider__data-name'>{element.player.shortName}</h4>
                                <span> {targetFundament(element.type)}</span>
                                <input type='number' onChange={(e) => calculate(element.average, Number(e.target.value), saves, setSaves, index)} placeholder='Meta da Aposta' />
                            </div>

                            <div className="slider__data" style={{ textAlign: 'left' }}>
                                <span>{element.average.toFixed(2)}</span>
                                <span className='slider__data-result'>{element.result ? element.result : '0,00'}%</span>
                            </div>

                            <button className='slider__item-btn' title='Remover Jogador' onClick={() => deletePlayer(element.statistics.id)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                        </div>
                    ))
                }

                {saves.length < 1 && <h3 className='slider__empty'>Não possui jogador na lista!</h3>}

            </ul>

        </div >
    )
}

export default Slider