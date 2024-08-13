import { useState } from 'react'
import { ApiMatches } from '../../interfaces/interface'
import { lineUp } from '../../interfaces/lineUp'
import './Matches.css'
import { getLineUp } from '../../api/sofaScore'

interface MatchesProps {
    element: ApiMatches
    selectMatch: (a: number, b: number) => void
}

const Matches: React.FC<MatchesProps> = ({ element, selectMatch }) => {




    const [lineUp, setLineUp] = useState<lineUp>()
    const [showLineUp, setShowLineUp] = useState<boolean>(false)

    const loadLineUp = async () => {
        setShowLineUp(true)
        try {
            if (lineUp) return setShowLineUp(true)
            const response = await getLineUp(element.id)
            if (response) setLineUp(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="matches__card" onClick={() => { selectMatch(element.homeTeam.id, element.awayTeam.id), document.querySelectorAll('.item')[0].scrollIntoView({ behavior: 'smooth' }) }}>
            <span>{element.roundInfo.round}º Rodada</span>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.homeTeam.id}/image`} alt={element.homeTeam.name} />{element.homeTeam.shortName} ({element.homeScore.current})</h3>
            <h3 style={{ padding: '0' }}>X</h3>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.awayTeam.id}/image`} alt={element.awayTeam.name} />{element.awayTeam.shortName}  ({element.awayScore.current})</h3>
            <span>{new Date(element.startTimestamp * 1000).toLocaleString().slice(0, -3)}h</span>
            {element.status.type === 'inprogress' &&
                <i title='Ao vivo' className="fa-regular fa-eye matches__card-live"></i>
            }
            <>
                <i title='Escalação' className="fa-solid fa-list-ol matches__card-lineUp" onMouseEnter={loadLineUp} onMouseLeave={() => setShowLineUp(false)}></i>
                {showLineUp && !lineUp && <div className="lineUp__box">
                    <h3 style={{ gridColumn: 'span 2', margin: '0 auto' }}>Escalação não confirmada!</h3>
                </div>}

                {showLineUp && lineUp && <div className="lineUp__box">
                    <div className="lineUp__box-list">
                        <h3><img src={`https://api.sofascore.app/api/v1/team/${element.homeTeam.id}/image`} alt={element.homeTeam.name} />{element.homeTeam.shortName}</h3>
                        <h3 style={{ margin: '0 0 10px' }}>{lineUp.home.formation}</h3>
                        {lineUp.home.players.map(e => {
                            if (e.substitute) return
                            return <div className="lineUp__box-item">
                                <img src={`https://api.sofascore.app/api/v1/player/${e.player.id}/image`} alt='' />
                                <p className={`pos ${e.position}`}>{e.position}</p>
                                <h4>{e.player.shortName}</h4>
                                {e.captain && <p className='captain'>C</p>}
                            </div>
                        })}
                    </div>
                    <div className="lineUp__box-list">
                        <h3><img src={`https://api.sofascore.app/api/v1/team/${element.awayTeam.id}/image`} alt={element.awayTeam.name} />{element.awayTeam.shortName}</h3>
                        <h3 style={{ margin: '0 0 10px' }}>{lineUp.away.formation}</h3>
                        {lineUp.away.players.map(e => {
                            if (e.substitute) return
                            return <div className="lineUp__box-item reverse">
                                <img src={`https://api.sofascore.app/api/v1/player/${e.player.id}/image`} alt='' />
                                <p className={`pos ${e.position}`}>{e.position}</p>
                                <h4>{e.player.shortName}</h4>
                                {e.captain && <p className='captain'>C</p>}
                            </div>
                        })}
                    </div>

                </div>}
            </>

        </div >
    )
}

export default Matches