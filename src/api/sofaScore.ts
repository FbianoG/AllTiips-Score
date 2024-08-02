import axios from "axios"

const getTopPlayers = async (teamId: string, leagueId: string, season: string) => { // Estatísticas dos jogadores e do time
    try {
        if (leagueId !== '132') {
            const [responsePlayers, responseTeams] = await Promise.all([
                axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/overall`),
                axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/statistics/overall`)
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
    }
}

const getTeams = async (leagueId: string, season: string) => { // Times participantes da liga
    try {
        const response = await axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/standings/total`)
        return response.data.standings
    } catch (error) {
        console.log(error)
    }
}

export { getTopPlayers, getTeams }