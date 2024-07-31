import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import InputTeans from './components/InputTeans';

import Slider from './components/slider';
import { ApiPlayer, ApiPlayerDetail } from './interfaces/interface';
import Player from './components/Player/Player';



function App() {

  const [teamAId, setTeamAId] = useState<string | undefined>()
  const [teamA, setTeamA] = useState<ApiPlayer | null>(null)

  const [teamBId, setTeamBId] = useState<string | undefined>()
  const [teamB, setTeamB] = useState<ApiPlayer | null>(null)

  const [type, setType] = useState<string | undefined>()

  const [saves, setSaves] = useState<ApiPlayerDetail[]>([])

  const [sport, setSport] = useState<'br' | 'nba'>('br')

  useEffect(() => { getStatusA() }, [teamAId])

  useEffect(() => { getStatusB() }, [teamBId])

  const getStatusA = async () => {
    try {
      if (!teamAId) return
      let response
      if (sport === 'br') response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamAId}/unique-tournament/325/season/58766/top-players/overall`)
      if (sport == 'nba') response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamAId}/unique-tournament/10415/season/61717/top-players/overall`)
      if (!response) return
      setTeamA(response.data.topPlayers)
    } catch (error) {
      console.log(error)
    }
  }


  const getStatusB = async () => {
    try {
      if (teamBId) {
        let response
        if (sport === 'br') response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamBId}/unique-tournament/325/season/58766/top-players/overall`)
        if (sport == 'nba') response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamBId}/unique-tournament/10415/season/61717/top-players/overall`)
        if (!response) return
        setTeamB(response.data.topPlayers)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const savePlayer = (player: ApiPlayerDetail, average: number) => {
    if (!type) return
    player.type = type
    player.average = average
    setSaves([...saves, player])
  }


  const changeSport = (name: any) => {
    setTeamA(null)
    setTeamB(null)
    setSport(name)
  }

  return (
    <>
      <div className="item">


        <select className='type' onChange={(e) => changeSport(e.target.value)} >
          <option value="br">Brasileiro Serie A</option>
          <option value="nba">NBA</option>
        </select>

        <InputTeans variant='statistics' sport={sport} onChange={setType} />

        <ul className='list'>
          <InputTeans variant='teans' sport={sport} onChange={setTeamAId} />
          {teamA && type && teamA[type].map((element: ApiPlayerDetail) => <Player element={element} type={type} savePlayer={savePlayer} />)}
        </ul >

        <ul className='list'>
          <InputTeans variant='teans' sport={sport} onChange={setTeamBId} />
          {teamB && type && teamB[type].map((element: ApiPlayerDetail) => <Player element={element} type={type} savePlayer={savePlayer} aside={true} />)}
        </ul >

      </div >

      <Slider saves={saves} setSaves={setSaves} />
    </>
  )
}

export default App
