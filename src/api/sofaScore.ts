import axios from "axios"


const getTopPlayers = async (teamId: string, leagueId: string, season: string) => {
    try {
        let resPlayers
        let resTeam
        if (leagueId !== '132') {
            resPlayers = await axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/overall`)
            resTeam = await axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/statistics/overall`)
        }
        else resPlayers = await axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/regularSeason`)
        console.log(resTeam)


        const response = { play: resPlayers.data.topPlayers, stats: resTeam?.data.statistics }

        return response
    } catch (error) {
        console.log(error)
    }
}

const getTeams = async (leagueId: string, season: string) => {

    try {
        const response = await axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/standings/total`)

        return response.data.standings

    } catch (error) {

    }
}



export { getTopPlayers, getTeams }