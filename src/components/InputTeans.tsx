// import './InputTeans.css'

import { useEffect, useState } from "react"
import { ApiTeams } from "../interfaces/interface"
import { getTeams } from "../api/sofaScore"

import {v4 as uuidv4} from 'uuid'



interface InputTeansProps {
    variant: 'teans' | 'statistics'
    leagueId: string
    option: 'pla' | 'tea' | 'mat'
    season?: string
    team?: string
    onChange: React.Dispatch<React.SetStateAction<string | undefined>>
}

const InputTeans: React.FC<InputTeansProps> = ({ onChange, variant, leagueId, season, team, option }) => {

    const [teams, setTeams] = useState<any>([])

    useEffect(() => { getTeam() }, [leagueId])

    const getTeam = async () => {
        try {
            if (!season) return
            const response = await getTeams(leagueId, season)
            setTeams(response)
        } catch (error) {

        }
    }

    

    return (
        <>
            {variant === 'teans' &&
                <select className="select__teams" style={option == 'mat' ? { display: 'none' } : {}} onChange={(e) => onChange(e.target.value)} defaultValue=''>
                    <option value="" >Time</option>

                    {teams && leagueId !== '' && teams.map((row: any) => (
                        <optgroup key={uuidv4()} label={row.name} >
                            {row.rows.map((element: ApiTeams) => <option key={uuidv4()} selected={Number(team) == element.team.id && true} value={element.team.id}>{element.position}º - {element.team.shortName} ({element.points})</option>)}
                        </optgroup>
                    ))
                    }

                </select>
            }


            {variant === 'statistics' && leagueId !== '132' && leagueId !== '' &&
                < select style={option == 'mat' ? { display: 'none' } : {}} className='type' onChange={(e) => onChange(e.target.value)} defaultValue=''>
                    <option value="" disabled >Fundamentos</option>
                    <option value="goals">Gols</option>
                    <option value="assists">Assistências</option>
                    <option value="totalShots">Finalizações (Total)</option>
                    <option value="shotsOnTarget">Finalizações (Ao Gol)</option>
                    <option value="accuratePasses">Passes (Certos)</option>
                    <option value="tackles">Desarmes</option>
                    <option value="yellowCards">C. Amarelo</option>
                </ select>
            }

            {variant === 'statistics' && leagueId === '132' &&
                < select className='type' onChange={(e) => onChange(e.target.value)} defaultValue=''>
                    <option value="" disabled >Fundamento</option>
                    <option value="points">Pontos</option>
                    <option value="rebounds">Rebotes</option>
                    <option value="assists">Assistências</option>
                    <option value="blocks">Bloqueios</option>
                    <option value="turnovers">Turnovers</option>
                    <option value="doubleDoubles">Duplo Duplo</option>
                    <option value="tripleDoubles">Triplo Duplo</option>
                </ select>
            }


        </>

    )
}

export default InputTeans