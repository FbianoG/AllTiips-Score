import './App.css'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { getMatches, getTopPlayers } from './api/sofaScore'
import { ApiLeagues, ApiMatchesObject, ApiPlayer, ApiPlayerDetail } from './interfaces/interface'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import InputTeans from './components/Input/Input'
import Player from './components/Player/Player'
import Statistics from './components/Statistics/Statistics'
import Slider from './components/Slider/slider'
import Loading from './components/Loading/Loading'
import Toast from './components/Toast/Toast'
import Footer from './components/Footer/Footer'
import Matches from './components/Matches/Matches'


const App = () => {
  // Team A --
  const [teamAId, setTeamAId] = useState<string>()
  const [teamA, setTeamA] = useState<ApiPlayer>()
  const [statisticsA, setStatisticsA] = useState()

  // Team B --
  const [teamBId, setTeamBId] = useState<string>()
  const [teamB, setTeamB] = useState<ApiPlayer>()
  const [statisticsB, setStatisticsB] = useState()

  const [option, setOption] = useState<'pla' | 'tea' | 'mat'>('mat') // Viewing option
  const [type, setType] = useState<string>() // Selected individual statistics
  const [leagues, setLeagues] = useState<ApiLeagues[]>([]) // List of championship
  const [leagueId, setLeagueId] = useState<string>('325') // Selected championship
  const [season, setSeason] = useState<string>('58766') // Championship season
  const [saves, setSaves] = useState<ApiPlayerDetail[]>([]) // Saved players list
  const [matches, setMatches] = useState<ApiMatchesObject>() // Current round matches
  const [loading, setLoading] = useState<boolean>(false) // Show loading
  const [toast, setToast] = useState<any>(false) // Tost content

  useEffect(() => { teamAId && getPlayers(teamAId, 'A') }, [teamAId])

  useEffect(() => { teamBId && getPlayers(teamBId, 'B') }, [teamBId])

  useEffect(() => { loadMatches() }, [leagueId])

  useEffect(() => {
    const a = async () => {
      const response = await axios.get('/leagues.json')
      setLeagues(response.data)
    }
    a()
  }, [])

  const getPlayers = async (teamId: string, side: string) => {
    setLoading(true)
    try {
      if (!leagueId || !season) return
      const response = await getTopPlayers(teamId, leagueId, season)
      if (!response) return
      if (side === 'A') setTeamA(response.play), setStatisticsA(response.stats)
      else if (side === 'B') setTeamB(response.play), setStatisticsB(response.stats)
    } catch (error: any) {
      setToast({ variant: 'error', text: error.message })
    } finally {
      setLoading(false)
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

  const loadMatches = async () => {
    setLoading(true)
    try {
      const response = await getMatches(leagueId, season)
      setMatches(response)
    } catch (error: any) {
      setToast({ variant: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  const selectMatch = (homeId: any, awayId: any) => {
    setTeamAId(homeId)
    setTeamBId(awayId)
    setOption('tea')
  }

  const savePlayer = (player: ApiPlayerDetail, average: number) => {
    if (!type) return
    player.type = type
    player.average = average
    setSaves([...saves, player])
    setToast(false)
    setTimeout(() => { setToast({ text: 'Jogador incluido à lista.', variant: 'success' }) }, 0)
  }

  const [range, setRange] = useState<boolean>(false)

  return (
    <>

      <Header />

      <Hero />

      <div className="item">

        <select className='input__select type' onChange={(e) => changeLeague(e.target.value)} >
          {leagues && leagues.map((element: any) => <option key={element.leagueId} value={element.leagueId}>{element.name}</option>)}
        </select>

        {leagueId !== '' &&
          <InputTeans variant='statistics' leagueId={leagueId} onChange={setType} option={option} />
        }

        <div className='group__btn'>
          <button onClick={() => { setOption('mat'), loadMatches() }} style={option === 'mat' ? { color: 'dodgerblue' } : {}}>Jogos</button>
          <button onClick={() => setOption('tea')} style={option === 'tea' ? { color: 'dodgerblue' } : {}}>Time</button>
          <button onClick={() => setOption('pla')} style={option === 'pla' ? { color: 'dodgerblue' } : {}}>Jogadores</button>
        </div>


        <div style={option === 'mat' ? { display: 'none' } : {}} className="homeAway" onClick={() => { setRange(!range), document.querySelectorAll('.group__btn')[0].scrollIntoView() }}>
          <span>Casa</span>
          <div className={`range ${range && 'away'}`}>
            <div className={`position ${range && 'away'}`}></div>
          </div>
          <span>Fora</span>
        </div>

        <>
          {window.innerWidth >= 768 &&
            <ul className='list'>
              <InputTeans variant='teans' leagueId={leagueId} season={season} onChange={setTeamAId} team={teamAId} option={option} />
              {teamA && type && option === 'pla' && teamA[type]?.map((element: ApiPlayerDetail) => <Player key={uuidv4()} element={element} type={type} leagueId={leagueId} season={season} savePlayer={savePlayer} />)}
              {teamA && option === 'tea' && statisticsA && <Statistics statistics={statisticsA} />}
            </ul >
          }
          {window.innerWidth < 768 && !range &&
            <ul className='list'>
              <InputTeans variant='teans' leagueId={leagueId} season={season} onChange={setTeamAId} team={teamAId} option={option} />
              {teamA && type && option === 'pla' && teamA[type]?.map((element: ApiPlayerDetail) => <Player key={uuidv4()} element={element} type={type} leagueId={leagueId} season={season} savePlayer={savePlayer} />)}
              {teamA && option === 'tea' && statisticsA && <Statistics statistics={statisticsA} />}
            </ul >
          }

          {window.innerWidth >= 768 &&
            <ul className='list'>
              <InputTeans variant='teans' leagueId={leagueId} season={season} onChange={setTeamBId} team={teamBId} option={option} />
              {teamB && type && option === 'pla' && teamB[type]?.map((element: ApiPlayerDetail) => <Player key={uuidv4()} element={element} type={type} leagueId={leagueId} season={season} savePlayer={savePlayer} aside={true} />)}
              {teamB && option === 'tea' && statisticsB && <Statistics statistics={statisticsB} aside={true} />}
            </ul >
          }
          {window.innerWidth < 768 && range &&
            <ul className='list'>
              <InputTeans variant='teans' leagueId={leagueId} season={season} onChange={setTeamBId} team={teamBId} option={option} />
              {teamB && type && option === 'pla' && teamB[type]?.map((element: ApiPlayerDetail) => <Player key={uuidv4()} element={element} type={type} leagueId={leagueId} season={season} savePlayer={savePlayer} aside={true} />)}
              {teamB && option === 'tea' && statisticsB && <Statistics statistics={statisticsB} aside={true} />}
            </ul >
          }
        </>

        {matches && option === 'mat' &&
          <div className="matches">
            {matches.currentMatches.length > 0 && <h2 className='matches__title'>Rodada Atual</h2>}
            {matches.lastMatches.map((element) => <Matches key={uuidv4()} element={element} selectMatch={selectMatch} />)}
            {matches.currentMatches.map((element) => <Matches key={uuidv4()} element={element} selectMatch={selectMatch} />)}
            <h2 className='matches__title'>Próxima Rodada</h2>
            {matches.nextMatches.map((element) => <Matches key={uuidv4()} element={element} selectMatch={selectMatch} />)}
          </div>
        }

        {loading && <Loading />}

      </div >

      <Footer />

      <Slider saves={saves} setSaves={setSaves} />

      {toast && <Toast variant={toast.variant} text={toast.text} onClick={setToast} />}
    </>
  )
}

export default App
