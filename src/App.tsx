import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { getTopPlayers } from './api/sofaScore'
import { ApiLeagues, ApiPlayer, ApiPlayerDetail } from './interfaces/interface'

import Slider from './components/Slider/slider'
import Player from './components/Player/Player'
import InputTeans from './components/InputTeans'
import Statistics from './components/Statistics/Statistics'
import Toast from './components/Toast/Toast'
import Header from './components/Header/Header'


const App = () => {
  // Team A --
  const [teamAId, setTeamAId] = useState<string>()
  const [teamA, setTeamA] = useState<ApiPlayer>()
  const [statisticsA, setStatisticsA] = useState()

  // Team B --
  const [teamBId, setTeamBId] = useState<string>()
  const [teamB, setTeamB] = useState<ApiPlayer>()
  const [statisticsB, setStatisticsB] = useState()

  const [option, setOption] = useState<'pla' | 'tea' | 'gam'>('pla')

  const [type, setType] = useState<string>()

  const [leagues, setLeagues] = useState<ApiLeagues[]>([])
  const [leagueId, setLeagueId] = useState<string>('325')
  const [season, setSeason] = useState<string>('58766')

  const [saves, setSaves] = useState<ApiPlayerDetail[]>([])

  useEffect(() => { teamAId && getPlayers(teamAId, 'A') }, [teamAId])

  useEffect(() => { teamBId && getPlayers(teamBId, 'B') }, [teamBId])

  useEffect(() => {
    const a = async () => {
      const response = await axios.get('/leagues.json')
      setLeagues(response.data)
    }
    a()
  }, [])

  const getPlayers = async (teamId: string, side: string) => {
    try {
      if (!leagueId || !season) return
      const response = await getTopPlayers(teamId, leagueId, season)
      if (!response) return
      if (side === 'A') setTeamA(response.play), setStatisticsA(response.stats)
      else if (side === 'B') setTeamB(response.play), setStatisticsB(response.stats)
    } catch (error) {
      console.log(error)
    }
  }

  const changeLeague = async (id: string) => {
    setTeamA(undefined)
    setTeamB(undefined)
    setType(undefined)
    setLeagueId('')
    const data = leagues.find((element) => element.leagueId === id)
    if (data) {
      setSeason(data.season)
      setTimeout(() => { setLeagueId(id) }, 0)
    }
  }

  const [toast, setToast] = useState<any>(false)

  const savePlayer = (player: ApiPlayerDetail, average: number) => {
    if (!type) return
    player.type = type
    player.average = average
    setSaves([...saves, player])
    setToast(false)
    setTimeout(() => { setToast({ text: 'Jogador incluido à lista.', variant: 'success' }) }, 0)
  }

  return (
    <>

      <Header />

      <div className="item">

        <select className='type' onChange={(e) => changeLeague(e.target.value)} >
          {leagues && leagues.map((element: any) => <option value={element.leagueId}>{element.name}</option>)}
        </select>

        {leagueId !== '' && <InputTeans variant='statistics' leagueId={leagueId} onChange={setType} />}

        <div className='group__btn'>
          <button onClick={() => setOption('pla')} style={option === 'pla' ? { color: 'dodgerblue' } : {}}>Jogadores</button>
          <button onClick={() => setOption('tea')} style={option === 'tea' ? { color: 'dodgerblue' } : {}}>Time</button>
          {/* <button onClick={() => setOption('gam')}>Jogos</button> */}
        </div>

        <ul className='list'>

          {<InputTeans variant='teans' leagueId={leagueId} season={season} onChange={setTeamAId} />}

          {teamA && type && option === 'pla' && teamA[type]?.map((element: ApiPlayerDetail) => <Player element={element} type={type} savePlayer={savePlayer} />)}

          {teamA && option === 'tea' && statisticsA && <Statistics statistics={statisticsA} />}

        </ul >

        <ul className='list'>

          {<InputTeans variant='teans' leagueId={leagueId} season={season} onChange={setTeamBId} />}

          {teamB && type && option === 'pla' && teamB[type]?.map((element: ApiPlayerDetail) => <Player element={element} type={type} savePlayer={savePlayer} aside={true} />)}

          {teamB && option === 'tea' && statisticsB && <Statistics statistics={statisticsB} aside={true} />}

        </ul >

      </div >

      <Slider saves={saves} setSaves={setSaves} />

      {toast && <Toast variant={toast.variant} text={toast.text} onClick={setToast} />}
    </>
  )
}

export default App
