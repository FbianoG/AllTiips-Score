import './Statistics.css'

interface StatsProps {
    statistics: any
    aside?: boolean
}

const Statistics: React.FC<StatsProps> = ({ statistics, aside }) => {

    if (statistics.length === 0) return <h3 style={{ textAlign: 'center' }}>Não possui dados para apresentar!</h3>

    const average = (e: number) => e / statistics.matches

    return (
        <>
            {!aside &&
                <>
                    <li className='player' >
                        <p className='player__name'>Jogos</p>
                        <div className="player__data">
                            <span className='player__data-average' title='Média p/ jogo'>{statistics.matches}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Desempenho</p>
                        <div className="player__data">
                            <span className='player__data-average' title='Média p/ jogo'>{statistics.avgRating.toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Posse de Bola</p>
                        <div className="player__data">
                            <span className='player__data-average' title='Média p/ jogo'>{statistics.averageBallPossession.toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Gols</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.goalsScored} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.goalsScored).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Gols (Contra)</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.goalsConceded} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.goalsConceded).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Escanteios</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.corners} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.corners).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Escanteios (Contra)</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.cornersAgainst} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.cornersAgainst).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Finalizações</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.shots} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.shots).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Fin. (Ao Gol)</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.shotsOnTarget} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.shotsOnTarget).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Fin. (Contra)</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.shotsAgainst} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.shotsAgainst).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>Faltas</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.fouls} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.fouls).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>C. Amarelo</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.yellowCards} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.yellowCards).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>C. Amarelo (Contra)</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.yellowCardsAgainst} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.yellowCardsAgainst).toFixed(2)}</span>
                        </div>
                    </li>
                    <li className='player' >
                        <p className='player__name'>C. Vermelho</p>
                        <div className="player__data">
                            <span className='player__data-label'>{statistics.redCards} (total)</span>
                            <span className='player__data-average' title='Média p/ jogo'>{average(statistics.redCards).toFixed(2)}</span>
                        </div>
                    </li>
                </>
            }

            {aside &&

                <>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{statistics.matches}</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Jogos</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{statistics.avgRating.toFixed(2)}</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Desempenho</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{statistics.averageBallPossession.toFixed(2)}</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Posse de Bola</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.goalsScored).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.goalsScored} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Gols</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.goalsConceded).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.goalsConceded} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Gols (Contra)</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.corners).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.corners} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Escanteios</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.cornersAgainst).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.cornersAgainst} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Escanteios (Contra)</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.shots).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.shots} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Finalizações</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.shotsOnTarget).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.shotsOnTarget} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Fin. (Ao Gol)</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.shotsAgainst).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.shotsAgainst} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Fin. (Contra)</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.fouls).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.fouls} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>Faltas</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.yellowCards).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.yellowCards} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>C. Amarelo</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.yellowCardsAgainst).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.yellowCardsAgainst} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>C. Amarelo (Contra)</p>
                    </li>
                    <li className='player' >
                        <div className="player__data" style={{ margin: '0' }}>
                            <span className='player__data-average' style={{ background: '#71cc56' }} title='Média p/ jogo'>{average(statistics.redCards).toFixed(2)}</span>
                            <span className='player__data-label'>{statistics.redCards} (total)</span>
                        </div>
                        <p className='player__name' style={{ margin: "0 0 0 auto", textAlign: "right" }}>C. Vermelho</p>
                    </li>
                </>
            }

        </>

    )
}

export default Statistics