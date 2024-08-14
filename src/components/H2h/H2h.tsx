import { useState } from 'react'
import { getMatchDetails } from '../../api/sofaScore'
import { ApiH2h } from '../../interfaces/H2h'
import './H2h.css'
import { ApiMatchesDetails } from '../../interfaces/matchDetails'


interface H2hProps {
    h2h: ApiH2h[]
}

const H2h: React.FC<H2hProps> = ({ h2h }) => {

    const lastH2h = h2h.filter(element => element.status.type === 'finished')

    const [matchView, setMatchView] = useState<ApiH2h>()

    const [matchDetails, setMatchDetails] = useState<ApiMatchesDetails[]>()

    const loadMatch = async (element: ApiH2h) => {
        try {
            const response = await getMatchDetails(element.id)
            setMatchDetails(response)
            setMatchView(element)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h2h'>
            {matchDetails && matchView &&
                <>
                    <h3 className='box__title'>Dados do Jogo</h3>
                    <div className="h2h__item">
                        <span className='item__date' >{new Date(matchView.startTimestamp * 1000).toLocaleString().slice(0, 10)}</span>
                        <span className='item__date'>{matchView.tournament.name} </span>
                        <div className="item__data">
                            <span className='item__data-name'><img src={`https://api.sofascore.app/api/v1/team/${matchView.homeTeam.id}/image`} alt={matchView.homeTeam.shortName} />{matchView.homeTeam.shortName}</span>
                            <h5 className='item__data-score'>{matchView.homeScore.display}</h5>
                        </div>
                        X
                        <div className="item__data reverse">
                            <span className='item__data-name'>{matchView.awayTeam.shortName} <img src={`https://api.sofascore.app/api/v1/team/${matchView.awayTeam.id}/image`} alt={matchView.awayTeam.shortName} /> </span>
                            <h5 className='item__data-score'>{matchView.awayScore.display}</h5>
                        </div>
                        {matchDetails.map(element => {

                            return (
                                <div className="item__data-status">
                                    <div className="item__data-status-row">
                                        <span>{element.name}</span>
                                        <span className='item__data-status-row-value' style={element.awayValue < element.homeValue ? { background: '#71cc56' } : { background: '#ed7272' }}>{element.home}</span>
                                    </div>
                                    <div className="item__data-status-row">
                                        <span className='item__data-status-row-value' style={element.awayValue > element.homeValue ? { background: '#71cc56' } : { background: '#ed7272' }}>{element.away}</span>
                                        <span >{element.name}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                </>
            }
            {
                !matchDetails &&
                <>
                    <h3 className='box__title'>Ultimos Confrontos</h3>
                    {!lastH2h || lastH2h.length === 0 && <h5>Não possui jogos anteriores.</h5>}
                    {lastH2h.map((element, index) => {
                        if (index > 4) return
                        return (
                            <div className="h2h__item" onClick={() => loadMatch(element)}>
                                <span className='item__date' >{new Date(element.startTimestamp * 1000).toLocaleString().slice(0, 10)}</span>
                                <span className='item__date'>{element.tournament.name} </span>
                                <div className="item__data">
                                    <span className='item__data-name'><img src={`https://api.sofascore.app/api/v1/team/${element.homeTeam.id}/image`} alt={element.homeTeam.shortName} />{element.homeTeam.shortName}</span>
                                    <h5 className='item__data-score'>{element.homeScore.display}</h5>
                                </div>
                                X
                                <div className="item__data reverse">
                                    <span className='item__data-name'>{element.awayTeam.shortName} <img src={`https://api.sofascore.app/api/v1/team/${element.awayTeam.id}/image`} alt={element.awayTeam.shortName} /> </span>
                                    <h5 className='item__data-score'>{element.awayScore.display}</h5>
                                </div>
                            </div>
                        )
                    })}
                </>
            }
        </div >
    )
}

export default H2h