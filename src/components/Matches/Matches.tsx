import { ApiMatches } from '../../interfaces/interface'
import './Matches.css'

interface MatchesProps {
    element: ApiMatches
    selectMatch: (a: number, b: number) => void
}

const Matches: React.FC<MatchesProps> = ({ element, selectMatch }) => {


    return (
        <div className="matches__card" onClick={() => selectMatch(element.homeTeam.id, element.awayTeam.id)}>
            <span>{element.roundInfo.round}º Rodada</span>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.homeTeam.id}/image`} alt={element.homeTeam.name} />{element.homeTeam.shortName} ({element.homeScore.current})</h3>
            <h3 style={{ padding: '0' }}>X</h3>
            <h3><img src={`https://api.sofascore.app/api/v1/team/${element.awayTeam.id}/image`} alt={element.awayTeam.name} />{element.awayTeam.shortName}  ({element.awayScore.current})</h3>
            <span>{new Date(element.startTimestamp * 1000).toLocaleString().slice(0, -3)}h</span>
        </div>
    )
}

export default Matches