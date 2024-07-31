import './Player.css'
import { ApiPlayerDetail } from '../../interfaces/interface'

interface PlayerProps {
    element: ApiPlayerDetail
    type: string
    aside?: boolean
    savePlayer: (a: ApiPlayerDetail, b: number) => void
}

const Player: React.FC<PlayerProps> = ({ element, type, aside, savePlayer }) => {

    if (!element.playedEnough) return

    const average = (element.statistics[type] / element.statistics.appearances)

    return (
        <>
            {!aside &&
                <li key={element.statistics.id} className='player' onClick={() => savePlayer(element, average)}>

                    <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt={element.player.shortName} loading='lazy' />
                    <span className={`pos ${element.player.position}`} title='Posição'>{element.player.position === 'F' ? 'A' : element.player.position}</span>
                    <p className='player__name'>{element.player.shortName}</p>
                    <div className="player__data">
                        <span className='player__data-label'>{element.statistics[type]} (total)</span>
                        <span className='player__data-average' title='Média p/ jogo'>{average.toFixed(2)}</span>
                    </div>

                </li>}

            {aside &&
                <li key={element.statistics.id} className='player' onClick={() => savePlayer(element, average)}>

                    <div className="player__data" style={{ margin: '0' }}>
                        <span title='Média p/ jogo' className='player__data-average' style={{ margin: '0', background: '#71cc56' }}>{average.toFixed(2)}</span>
                        <span className='player__data-label'>(total) {element.statistics[type]}</span>
                    </div>
                    <p className='player__name' style={{ textAlign: 'right', margin: '0 0 0 auto' }}>{element.player.shortName}</p>
                    <span className={`pos ${element.player.position}`} title='Posição'>{element.player.position === 'F' ? 'A' : element.player.position}</span>
                    <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt={element.player.shortName} loading='lazy' />

                </li>
            }


        </>
    )
}

export default Player