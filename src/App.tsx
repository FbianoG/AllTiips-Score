import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import InputTeans from './components/InputTeans';

import Slider from './components/slider';



function App() {

  const [teamAId, setTeamAId] = useState<number | null>(null)
  const [teamA, setTeamA] = useState<any>(null)

  const [teamBId, setTeamBId] = useState<number | null>(null)
  const [teamB, setTeamB] = useState<any>(null)


  const [type, setType] = useState<string | null>(null)

  useEffect(() => { getStatusA() }, [teamAId])

  useEffect(() => { getStatusB() }, [teamBId])

  const getStatusA = async () => {
    try {
      if (!teamAId) return
      const response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamAId}/unique-tournament/325/season/58766/top-players/overall`)
      setTeamA(response.data.topPlayers)
      // console.log(response.data.topPlayers[type])
    } catch (error) {
      console.log(error)
    }
  }

  const getStatusB = async () => {
    try {
      if (teamBId) {
        const response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamBId}/unique-tournament/325/season/58766/top-players/overall`)
        setTeamB(response.data.topPlayers)
      }
    } catch (error) {
      console.log(error)
    }
  }


  // for slider

  const [saves, setSaves] = useState<any>([])


  const savePlayer = (player: any, average: string) => {
    player.type = type
    player.average = average
    setSaves([...saves, player])
  }

  return (
    <>
      <div className="item">
        <select className='type' onChange={(e) => setType(e.target.value)}>
          <option value="" disabled selected>Fundamento</option>
          <option value="goals">Gols</option>
          <option value="totalShots">Finalizações (Total)</option>
          <option value="shotsOnTarget">Finalizações (Ao Gol)</option>
          <option value="accuratePasses">Passes (Certos)</option>
          <option value="tackles">Desarmes</option>
          <option value="yellowCards">C. Amarelo</option>
        </select>
        <ul>
          <InputTeans onChange={setTeamAId} />
          {teamA && type && teamA[type].map((element: any) => {
            const average = (element.statistics[type] / element.statistics.appearances).toFixed(2)
            return (
              <li key={element.statistics.id} onClick={() => savePlayer(element, average)}>
                <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />
                <span className={`pos ${element.player.position}`}>{element.player.position}</span>
                <p>{element.player.shortName}</p>
                <div className="data">
                  <span >{element.statistics[type]} (total)</span>
                  <span className='note'>{average}</span>
                </div>
              </li>
            )
          })}
        </ul >
        <ul>
          <InputTeans onChange={setTeamBId} />
          {teamB && type && teamB[type].map((element: any) => {

            const average = (element.statistics[type] / element.statistics.appearances).toFixed(2)
            return (
              <li key={element.statistics.id} onClick={() => savePlayer(element, average)}>
                <div className="data" style={{ margin: '0' }}>
                  <span className='note' style={{ margin: '0', background: '#71cc56' }}>{average}</span>
                  <span>(total) {element.statistics[type]}</span>
                </div>
                <p style={{ textAlign: 'right', margin: '0 0 0 auto' }}>{element.player.shortName}</p>
                <span className={`pos ${element.player.position}`}>{element.player.position}</span>
                <img src={`https://api.sofascore.app/api/v1/player/${element.player.id}/image`} alt='' />
              </li>
            )
          })}
        </ul >
      </div >


      <Slider saves={saves} setSaves={setSaves} />
    </>
  )
}

export default App
