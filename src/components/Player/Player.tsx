import './Player.css'
import { ApiPlayerDetail, ApiPlayerMoreDetails } from '../../interfaces/interface'
import { useEffect, useState } from 'react'
import { getPlayerDetails } from '../../api/sofaScore'

interface PlayerProps {
    element: ApiPlayerDetail
    type: string
    leagueId: string
    season: string
    aside?: boolean
    savePlayer: (a: ApiPlayerDetail, b: number) => void
}

const listPlayerDetails: ApiPlayerMoreDetails[] = []

const Player: React.FC<PlayerProps> = ({ element, type, aside, leagueId, season, savePlayer }) => {

    if (!element.playedEnough) return

    const [ShowDetails, setShowDetails] = useState<boolean>(false)

    const [playerDetails, setPlayerDetails] = useState<ApiPlayerMoreDetails>()

    const average = (element.statistics[type] / element.statistics.appearances)

    useEffect(() => { setPlayerDetails(undefined) }, [element])

    const loadPlayerDetails = async () => {
        try {
            const response = await getPlayerDetails(element.player.id, leagueId, season)
            response.id = element.player.id
            listPlayerDetails.push(response)
            setPlayerDetails(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDetails = (e: any) => {
        if (e.target.tagName === 'I') return
        if (ShowDetails) {
            setShowDetails(false)
            return
        }
        if (playerDetails) {
            setShowDetails(true)
            return
        } else {
            loadPlayerDetails()
            setShowDetails(true)
        }
    }

    const handleSavePlayer = () => {
        savePlayer(element, average)
    }

    return (
        <>
            {!aside &&
                <li key={element.statistics.id} className='player' onClick={(e) => handleDetails(e)} onMouseLeave={() => setShowDetails(false)} >

                    <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt={element.player.shortName} loading='lazy' />
                    <span className={`pos ${element.player.position}`} title='Posição'>{element.player.position === 'F' ? 'A' : element.player.position}</span>
                    <p className='player__name'>{element.player.shortName}</p>
                    <div className="player__data">
                        <span className='player__data-label'>{element.statistics[type]} (total)</span>
                        <span className='player__data-average' title='Média p/ jogo'>{average.toFixed(2)}</span>
                    </div>
                    <button className='player__btn-details' title='Incluir à lista' onClick={handleSavePlayer} onMouseLeave={() => setShowDetails(false)}>
                        <i className="fa-solid fa-square-plus"></i>
                    </button>
                    {ShowDetails && playerDetails &&
                        <div className="player__details">
                            <span><strong>Jogos:</strong> {playerDetails.appearances}</span>
                            <span><strong>Titular:</strong> {playerDetails.matchesStarted} jogos</span>
                            <span><strong>Minutos:</strong> {(playerDetails.minutesPlayed / playerDetails?.appearances).toFixed(0)}m (p/ jogo)</span>
                            <span><strong>Toques:</strong> {(playerDetails.touches / playerDetails?.appearances).toFixed(0)} (p/ jogo)</span>
                        </div>
                    }

                </li >}

            {
                aside &&
                <li key={element.statistics.id} className='player' onClick={(e) => handleDetails(e)} onMouseLeave={() => setShowDetails(false)}>

                    <button className='player__btn-details' title='Incluir à lista' onClick={handleSavePlayer} onMouseLeave={() => setShowDetails(false)}>
                        <i className="fa-solid fa-square-plus"></i>
                    </button>
                    <div className="player__data" style={{ margin: '0' }}>
                        <span title='Média p/ jogo' className='player__data-average' style={{ margin: '0', background: '#71cc56' }}>{average.toFixed(2)}</span>
                        <span className='player__data-label'>(total) {element.statistics[type]}</span>
                    </div>
                    <p className='player__name' style={{ textAlign: 'right', margin: '0 0 0 auto' }}>{element.player.shortName}</p>
                    <span className={`pos ${element.player.position}`} title='Posição'>{element.player.position === 'F' ? 'A' : element.player.position}</span>
                    <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt={element.player.shortName} loading='lazy' />

                    {ShowDetails && playerDetails &&
                        <div className="player__details" style={{ left: '0' }}>
                            <span><strong>Jogos:</strong> {playerDetails.appearances}</span>
                            <span><strong>Titular:</strong> {playerDetails.matchesStarted} jogos</span>
                            <span><strong>Minutos:</strong> {(playerDetails.minutesPlayed / playerDetails?.appearances).toFixed(0)}m (p/ jogo)</span>
                            <span><strong>Toques:</strong> {(playerDetails.touches / playerDetails?.appearances).toFixed(0)} (p/ jogo)</span>
                        </div>
                    }



                </li>
            }


        </>
    )
}

export default Player