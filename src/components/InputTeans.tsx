// import './InputTeans.css'

import { useEffect, useState } from "react"
import { ApiTeams } from "../interfaces/interface"
import { getTeams } from "../api/sofaScore"


interface InputTeansProps {
    variant: 'teans' | 'statistics'
    leagueId: string
    season?: string
    onChange: React.Dispatch<React.SetStateAction<string | undefined>>
}

const InputTeans: React.FC<InputTeansProps> = ({ onChange, variant, leagueId, season }) => {

    const [teams, setTeams] = useState<any>([])

    useEffect(() => {
        getTeam()
    }, [leagueId])

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
                <select onChange={(e) => onChange(e.target.value)}>
                    <option value="" disabled selected>Time</option>

                    {teams && teams.map((row: any) => (
                        <optgroup label={row.name} style={{ background: '#1d1d27' }} >
                            {row.rows.map((element: ApiTeams) => <option value={element.team.id}>{element.team.shortName}</option>)}
                        </optgroup>
                    ))
                    }


                </select>
            }


            {variant === 'statistics' && leagueId !== '132' &&
                < select className='type' onChange={(e) => onChange(e.target.value)}>
                    <option value="" disabled selected>Fundamento</option>
                    <option value="goals">Gols</option>
                    <option value="totalShots">Finalizações (Total)</option>
                    <option value="shotsOnTarget">Finalizações (Ao Gol)</option>
                    <option value="accuratePasses">Passes (Certos)</option>
                    <option value="tackles">Desarmes</option>
                    <option value="yellowCards">C. Amarelo</option>
                </ select>
            }

            {variant === 'statistics' && leagueId === '132' &&
                < select className='type' onChange={(e) => onChange(e.target.value)}>
                    <option value="" disabled selected>Fundamento</option>
                    <option value="points">Pontos</option>
                    <option value="rebounds">Rebotes</option>
                    <option value="assists">Assistências</option>
                    <option value="doubleDoubles">Duplo Duplo</option>
                </ select>
            }


        </>

    )
}

export default InputTeans