import { ApiH2h } from '../../interfaces/H2h'
import './H2h.css'


interface H2hProps {
    h2h: ApiH2h[]
}

const H2h: React.FC<H2hProps> = ({ h2h }) => {

    const lastH2h = h2h.filter(element => element.status.type === 'finished')

    console.log(lastH2h)

    return (
        <div className='h2h'>
            <h3 className='box__title'>Ultimos Confrontos</h3>
            {!lastH2h || lastH2h.length === 0 && <h5>Não possui jogos anteriores.</h5>}
            {lastH2h.map((element, index) => {
                if (index > 4) return
                return (
                    <div className="h2h__item">
                        <span className='item__date' >{new Date(element.startTimestamp * 1000).toLocaleString().slice(0, 10)}</span>
                        <span className='item__date'>{element.tournament.name} </span>
                        <div className="item__data">
                            <span className='item__data-name'><img src={`https://api.sofascore.app/api/v1/team/${element.homeTeam.id}/image`} alt={element.homeTeam.shortName} />{element.homeTeam.shortName}</span>
                            <h5 className='item__data-score'>{element.homeScore.current}</h5>
                        </div>
                        X
                        <div className="item__data reverse">
                            <span className='item__data-name'>{element.awayTeam.shortName} <img src={`https://api.sofascore.app/api/v1/team/${element.awayTeam.id}/image`} alt={element.awayTeam.shortName} /> </span>
                            <h5 className='item__data-score'>{element.awayScore.current}</h5>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default H2h