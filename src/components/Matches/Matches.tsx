import { useState } from 'react'
import { ApiMatches } from '../../interfaces/interface'
import { lineUp } from '../../interfaces/lineUp'
import './Matches.css'
import { getH2h, getLineUp } from '../../api/sofaScore'
import LineUp from '../LineUp/LineUp'
import { ApiH2h } from '../../interfaces/H2h'

import H2h from '../H2h/H2h'

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
        console.log(e.target)
        if (e.target.tagName === 'I') return
        if (showLineUp) return
        if (showH2h) return setShowH2h(false)
        selectMatch(element.homeTeam.id, element.awayTeam.id)
        document.querySelectorAll('.item')[0].scrollIntoView({ behavior: 'smooth' })
    }

    const loadLineUp = async () => {
        setShowLineUp(true)
        try {
            if (lineUp) return
            const response = await getLineUp(element.id)
            if (response) setLineUp(response)
        } catch (error) {
            console.log(error)
        }
    }


    const loadH2h = async () => {
        setShowH2h(true)
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
        <div className="matches__card" onClick={(e) => handleMatch(e)}>
            <span className='matches__card-date'>{element.roundInfo.round}º Rodada</span>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.homeTeam.id}/image`} alt={element.homeTeam.name} />{element.homeTeam.shortName} ({element.homeScore.current})</h3>
            <h3 style={{ padding: '0' }}>X</h3>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.awayTeam.id}/image`} alt={element.awayTeam.name} />{element.awayTeam.shortName}  ({element.awayScore.current})</h3>
            <span className='matches__card-date'>{new Date(element.startTimestamp * 1000).toLocaleString().slice(0, -3)}h</span>
            {element.status.type === 'inprogress' && <i title='Ao vivo' className="fa-regular fa-eye matches__card-live"></i>}
            <>
                <i className="fa-solid fa-list-ol matches__card-lineUp" onMouseEnter={loadLineUp} onMouseLeave={() => setShowLineUp(false)}></i>
                {showLineUp && !lineUp && <h3 className="lineUp dataless">Escalação não confirmada!</h3>}
                {showLineUp && lineUp && <LineUp lineUp={lineUp} matchTeans={element} onClick={setShowLineUp} />}
            </>

            <i className="fa-solid fa-superscript matches__card-h2h" title='Confrontos' onMouseEnter={loadH2h} onMouseLeave={() => setShowH2h(false)}></i>

            {showH2h && h2h && <H2h h2h={h2h} />}

        </div >
    )
}

export default Matches