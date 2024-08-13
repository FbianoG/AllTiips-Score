import './LineUp.css'
import { lineUp } from '../../interfaces/lineUp'
import { ApiMatches } from '../../interfaces/interface'

interface LineUpProps {
    lineUp: lineUp
    matchTeans: ApiMatches
}

const LineUp: React.FC<LineUpProps> = (props) => {
    const lineUp = props.lineUp
    const matchTeans = props.matchTeans

    return (

        <div className="lineUp">

            <div className="lineUp__list">
                <h3 className='lineUp__team'><img src={`https://api.sofascore.app/api/v1/team/${matchTeans.homeTeam.id}/image`} alt={matchTeans.homeTeam.name} />{matchTeans.homeTeam.shortName}</h3>
                <h3 style={{ margin: '0 0 10px', fontSize: '14px' }}>{lineUp.home.formation}</h3>

                {lineUp.home.players.map(element => {

                    if (element.substitute) return

                    return (
                        <div className='lineUp__item' >
                            <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />
                            <p className={`pos ${element.position}`}>{element.position}</p>
                            <p className='lineUp__item-name'>{element.player.shortName}</p>
                            {element.captain && <p className='captain'>C</p>}
                        </div>
                    )
                })}
            </div>

            <div className="lineUp__list">
                <h3 className='lineUp__team'>{matchTeans.awayTeam.shortName} <img src={`https://api.sofascore.app/api/v1/team/${matchTeans.awayTeam.id}/image`} alt={matchTeans.awayTeam.name} /></h3>
                <h3 style={{ margin: '0 0 10px', fontSize: '14px' }}>{lineUp.away.formation}</h3>

                {lineUp.away.players.map(element => {

                    if (element.substitute) return

                    return (
                        <div className='lineUp__item reverse'>
                            <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />
                            <p className={`pos ${element.position}`}>{element.position}</p>
                            <p className='lineUp__item-name'>{element.player.shortName}</p>
                            {element.captain && <p className='captain'>C</p>}
                        </div>
                    )

                })}
            </div>

            {!lineUp.confirmed && <span className='lineUp__confirmed'>Escalação não confirmada.</span>}

        </div>
    )
}


export default LineUp