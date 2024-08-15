import './LineUp.css'
import { lineUp, PlayerElement } from '../../interfaces/lineUp'
import { ApiMatches } from '../../interfaces/interface'
import { getPlayerDetails } from '../../api/sofaScore'
import { useState } from 'react'
import { ApiPlayerMoreDetails } from '../../interfaces/playerDetails'

interface LineUpProps {
    lineUp: lineUp
    matchTeans: ApiMatches
    onClick: (a: boolean) => void
}

const LineUp: React.FC<LineUpProps> = ({ lineUp, matchTeans, onClick }) => {

    console.log(lineUp)
    const leagueId = matchTeans.tournament.uniqueTournament.id
    const season = matchTeans.season.id

    const nameStatus: { [key: string]: string } = {
        "rating": 'Rating',
        "matchesStarted": 'Titular',
        "appearances": 'Jogos',
        "minutesPlayed": 'Minutos (p/ jogo)',
        "goals": 'Gols',
        "totalShots": 'Finalizações',
        "shotsOnTarget": 'Fin. (Ao Gol)',
        "assists": 'Assitências',
        "accuratePasses": 'Passes',
        "touches": 'Toques',
        "fouls": 'Faltas',
        "tackles": 'Desarmes',
        "redCards": 'C. Vermelho',
        "yellowCards": 'C. Amarelo',
    }

    const [showPlayerDetails, setShowPlayerDetails] = useState<boolean>(false)
    const [playerDetails, setPlayerDetails] = useState<ApiPlayerMoreDetails>()
    const [selectPlayer, setselectPlayer] = useState<PlayerElement>()
    const [home, setHome] = useState<boolean>(false)

    const handlePlayer = async (playerId: number, player: PlayerElement, sethome: string) => {
        if (sethome === 'home') setHome(true)
        else setHome(false)
        setselectPlayer(player)
        try {
            const response = await getPlayerDetails(playerId, leagueId, season)
            setPlayerDetails(response)
            console.log(response)
            setShowPlayerDetails(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="lineUp">

            <button className='box__btn-close' title='Fechar' onClick={() => onClick(false)}><i className="fa-solid fa-xmark"></i></button>

            {lineUp.done && <h3 style={{gridColumn:'span 2'}}>Escalação</h3>}

            {!lineUp.done && showPlayerDetails && playerDetails && selectPlayer &&
                <>
                    <button className='box__btn-back' title='Voltar' onClick={() => { setShowPlayerDetails(false), setPlayerDetails(undefined) }}><i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i></button>

                    <div className="lineUp__player">
                        {home && <h3 className='lineUp__team'><img src={`https://api.sofascore.app/api/v1/team/${matchTeans.homeTeam.id}/image`} alt={matchTeans.homeTeam.name} />{matchTeans.homeTeam.shortName}</h3>}
                        {!home && <h3 className='lineUp__team'><img src={`https://api.sofascore.app/api/v1/team/${matchTeans.awayTeam.id}/image`} alt={matchTeans.awayTeam.name} />{matchTeans.awayTeam.shortName}</h3>}
                        <img className='lineUp__player-img' src={`https://api.sofascore.app/api/v1/player/${selectPlayer.player.id}/image`} alt='' />
                        <p className='lineUp__item-name'>{selectPlayer.player.name}</p>
                        <p className={`pos ${selectPlayer.position}`}>{selectPlayer.position}</p>

                        {Object.entries(nameStatus).map(([key, value]) => {

                            let data = playerDetails[key]
                            let average
                            let spann = true
                            if (key === 'minutesPlayed') {
                                average = (playerDetails.minutesPlayed / playerDetails.appearances).toFixed(0) + 'min'
                            } else if (key === 'appearances') {
                                average = data
                            } else if (key === 'matchesStarted') {
                                average = data
                            } else if (key === 'rating') {
                                average = data.toFixed(2)
                            } else {
                                average = (data / playerDetails.appearances).toFixed(1)
                                spann = false
                            }

                            return <div className='lineUp__player-status'>
                                <span>{value}</span>
                                <div >
                                    {!spann && <span>{data} (total)</span>}
                                    <span className='player__data-average' title='P/ Jogo'>{average}</span>
                                </div>
                            </div>
                        })
                        }

                    </div>
                </>
            }

            {!lineUp.done && !showPlayerDetails && !playerDetails &&
                <>

                    <ul className="lineUp__list">
                        <h3 className='lineUp__team'><img src={`https://api.sofascore.app/api/v1/team/${matchTeans.homeTeam.id}/image`} alt={matchTeans.homeTeam.name} />{matchTeans.homeTeam.shortName}</h3>
                        <h3 style={{ margin: '0 0 10px', fontSize: '14px' }}>{lineUp.home.formation}</h3>

                        {lineUp.home.players.map(element => {
                            if (element.substitute) return
                            return (
                                <li key={element.player.id} className='lineUp__item' onClick={() => handlePlayer(element.player.id, element, 'home')} >
                                    <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />
                                    <p className={`pos ${element.position}`}>{element.position}</p>
                                    <p className='lineUp__item-name'>{element.player.shortName}</p>
                                    {element.captain && <p className='captain'>C</p>}
                                </li>
                            )
                        })}
                    </ul>

                    <ul className="lineUp__list">
                        <h3 className='lineUp__team'>{matchTeans.awayTeam.shortName} <img src={`https://api.sofascore.app/api/v1/team/${matchTeans.awayTeam.id}/image`} alt={matchTeans.awayTeam.name} /></h3>
                        <h3 style={{ margin: '0 0 10px', fontSize: '14px' }}>{lineUp.away.formation}</h3>

                        {lineUp.away.players.map(element => {
                            if (element.substitute) return
                            return (
                                <li key={element.player.id} className='lineUp__item reverse' onClick={() => handlePlayer(element.player.id, element, 'away')}>
                                    <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />
                                    <p className={`pos ${element.position}`}>{element.position}</p>
                                    <p className='lineUp__item-name'>{element.player.shortName}</p>
                                    {element.captain && <p className='captain'>C</p>}
                                </li>
                            )
                        })}
                    </ul>
                </>
            }

            {!lineUp.confirmed && <span className='lineUp__confirmed'>Escalação não confirmada.</span>}

        </div >
    )
}


export default LineUp