import './Matches.css'
import H2h from '../H2h/H2h'
import LineUp from '../LineUp/LineUp'
import { useState } from 'react'
import { ApiMatches } from '../../interfaces/interface'
import { lineUp } from '../../interfaces/lineUp'
import { getH2h, getLineUp } from '../../api/sofaScore'
import { ApiH2h } from '../../interfaces/H2h'

interface MatchesProps {
    element: ApiMatches
    selectMatch: (a: number, b: number) => void
}

const Matches: React.FC<MatchesProps> = ({ element, selectMatch }) => {

    const [lineUp, setLineUp] = useState<lineUp>()
    const [showLineUp, setShowLineUp] = useState<boolean>(false)

    const [h2h, setH2h] = useState<ApiH2h[]>()
    const [showH2h, setShowH2h] = useState<boolean>(false)


    const handleMatch = (e: any) => {
        if (e.target.tagName === 'I') return
        if (showLineUp) return
        if (showH2h) return
        selectMatch(element.homeTeam.id, element.awayTeam.id)
        document.querySelectorAll('.item')[0].scrollIntoView({ behavior: 'smooth' })
    }

    const loadLineUp = async () => {
        setShowLineUp(true)
        setShowH2h(false)
        try {
            if (lineUp) return
            const response = await getLineUp(element.id)
            if (response) setLineUp(response)
        } catch (error) {
            console.log(error)
            setLineUp({ done: 'not' })
        }
    }


    const loadH2h = async () => {
        setShowH2h(true)
        setShowLineUp(false)
        try {
            if (h2h) return
            const response = await getH2h(element.customId)
            if (!response) return
            setH2h(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="matches__card" onClick={(e) => handleMatch(e)} onMouseLeave={() => { setShowLineUp(false), setShowH2h(false) }}>
            <span className='matches__card-date'>{element.roundInfo.round}º Rodada</span>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.homeTeam.id}/image`} alt={element.homeTeam.name} />{element.homeTeam.shortName} ({element.homeScore.current})</h3>
            <h3 style={{ padding: '0' }}>X</h3>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.awayTeam.id}/image`} alt={element.awayTeam.name} />{element.awayTeam.shortName}  ({element.awayScore.current})</h3>
            <span className='matches__card-date'>{new Date(element.startTimestamp * 1000).toLocaleString().slice(0, -3)}h</span>
            {element.status.type === 'inprogress' && <i className="fi fi-sr-live-alt matches__card-live" title='Ao vivo'></i>}

            <i style={{ transform: 'rotate(90deg)' }} className="fi fi-rr-court-sport matches__card-lineUp" onMouseEnter={loadLineUp}></i>

            {/* <i className="fa-solid fa-superscript matches__card-h2h" onMouseEnter={loadH2h}></i> */}
            <i className="fi fi-rr-apps-sort matches__card-h2h" onMouseEnter={loadH2h} ></i>



            {showLineUp && lineUp && <LineUp lineUp={lineUp} matchTeans={element} onClick={setShowLineUp} />}

            {showH2h && h2h && <H2h h2h={h2h} onClick={setShowH2h} />}

        </div >
    )
}

export default Matches