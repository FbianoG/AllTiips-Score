import axios from "axios"


const getTopPlayers = async (teamId: string, leagueId: string, season: string) => {
    try {
        let response
        if (leagueId !== '132') response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/overall`)
        else response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/regularSeason`)
        console.log(response)

        return response.data.topPlayers
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