import axios from "axios"
import { ApiMatches } from "../interfaces/interface"

const getTopPlayers = async (teamId: string, leagueId: string, season: string) => { // Estatísticas dos jogadores e do time
    try {
        if (leagueId !== '132') {
            const [responsePlayers, responseTeams] = await Promise.all([
                axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/overall`),
                axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/statistics/overall`)
                //  https://www.sofascore.com/api/v1/player/852534/unique-tournament/325/season/58766/statistics/overall 
            ])
            const response = { play: responsePlayers.data.topPlayers, stats: responseTeams.data.statistics }
            return response
        } else {
            const responsePlayers = await axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/regularSeason`)
            const response = { play: responsePlayers.data.topPlayers, stats: [] }
            return response
        }
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}

const getTeams = async (leagueId: string, season: string) => { // Times participantes da liga
    try {
        if (!leagueId || !season) return
        const response = await axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/standings/total`)
        return response.data.standings
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}


const getMatches = async (leagueId: string, season: string) => {
    try {
        if (!leagueId || !season) return
        const [response, round] = await Promise.all([
            axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/events/next/0`),
            axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/rounds`)
        ])
        const currentRound = round.data.currentRound.round
        const matches = response.data.events.filter((element: ApiMatches) => element.roundInfo.round === currentRound)
        return matches
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}

export { getTopPlayers, getTeams, getMatches }