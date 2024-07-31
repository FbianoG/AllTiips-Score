// import './InputTeans.css'


interface InputTeansProps {
    variant: 'teans' | 'statistics'
    sport: 'br' | 'nba'
    onChange: React.Dispatch<React.SetStateAction<string | undefined>>
}

const InputTeans: React.FC<InputTeansProps> = ({ onChange, variant, sport }) => {

    return (
        <>
            {variant === 'teans' && sport === 'br' &&
                <select onChange={(e) => onChange(e.target.value)}>
                    <option value="">Time</option>
                    <option value="1955">Bahia</option>
                    <option value="1958">Botafogo</option>
                    <option value="1967">Athletico</option>
                    <option value="1977">Atlético MG</option>
                    <option value="7314">Atlético GO</option>
                    <option value="1957">Corinthias</option>
                    <option value="1984">Criciúma</option>
                    <option value="1954">Cruzeiro</option>
                    <option value="49202">Cuibá</option>
                    <option value="5981">Flamengo</option>
                    <option value="1961">Fluminense</option>
                    <option value="2020">Fortaleza</option>
                    <option value="5926">Grêmio</option>
                    <option value="1966">Internacional</option>
                    <option value="1980">Juventude</option>
                    <option value="1963">Palmeiras</option>
                    <option value="1999">RB Bragantino</option>
                    <option value="1981">São Paulo</option>
                    <option value="1962">Vitória</option>
                    <option value="1974">Vasco</option>
                </select>
            }

            {variant === 'teans' && sport === 'nba' &&
                <select onChange={(e) => onChange(e.target.value)}>
                    <option value="">Time</option>
                    <option value="3420">76ers</option>
                    <option value="3410">Bucks</option>
                    <option value="3409">Bulls</option>
                    <option value="3432">Cavaliers</option>
                    <option value="3422">Celts</option>
                    <option value="3425">Clippers</option>
                    <option value="3415">Grizzlies</option>
                    <option value="3423">Hawsks</option>
                    <option value="3435">Heat</option>
                    <option value="3430">Hornets</option>
                    <option value="3434">Jazz</option>
                    <option value="3427">Lakers</option>
                    <option value="3413">Kings</option>
                    <option value="3437">Magic</option>
                    <option value="3411">Mavericks</option>
                    <option value="3436">Nets</option>
                    <option value="3421">Knicks</option>
                    <option value="3417">Nuggts</option>
                    <option value="3419">Pacers</option>
                    <option value="5539">Pelicans</option>
                    <option value="3424">Pistons</option>
                    <option value="3433">Raptors</option>
                    <option value="3412">Rockets</option>
                    <option value="3429">Spurs</option>
                    <option value="3416">Suns</option>
                    <option value="3418">Thunder</option>
                    <option value="3426">Timberwolves</option>
                    <option value="3414">Trail Plazers</option>
                    <option value="3428">Warriors</option>
                </select>
            }

            {variant === 'statistics' && sport === 'br' &&
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

            {variant === 'statistics' && sport === 'nba' &&
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