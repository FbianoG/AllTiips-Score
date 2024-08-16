import axios from "axios"
import { ApiMatches } from "../interfaces/interface"
import { ApiSearchData } from "../interfaces/searchData"

const getTopPlayers = async (teamId: string, leagueId: number, season: number) => { // Estatísticas dos jogadores e do time
    try {
        if (leagueId !== 132) {
            const [responsePlayers, responseTeams] = await Promise.allSettled([
                axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/top-players/overall`),
                axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/unique-tournament/${leagueId}/season/${season}/statistics/overall`)
                //  https://www.sofascore.com/api/v1/player/852534/unique-tournament/325/season/58766/statistics/overall 
            ])
            const response = { play: responsePlayers.status === 'fulfilled' ? responsePlayers.value.data.topPlayers : [], stats: responseTeams.status === 'fulfilled' ? responseTeams.value.data.statistics : [] }
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

const getTeams = async (leagueId: number, season: number) => { // Times participantes da liga
    try {
        if (!leagueId || !season) return
        const response = await axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/standings/total`)
        return response.data.standings
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}

const getMatches = async (leagueId: number, season: number) => { // Partidas da rodada
    try {
        if (!leagueId || !season) return
        let [nMatches, lMatches, round] = await Promise.allSettled([
            axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/events/next/0`),
            axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/events/last/0`),
            axios.get(`https://www.sofascore.com/api/v1/unique-tournament/${leagueId}/season/${season}/rounds`)
        ])
        const currentRound = round.status === 'fulfilled' ? round.value.data.currentRound.round : 0
        const matches = {
            currentMatches: nMatches.status === 'fulfilled' ? nMatches.value.data.events.filter((element: ApiMatches) => element.roundInfo.round === currentRound) : [],
            lastMatches: lMatches.status === 'fulfilled' ? lMatches.value.data.events.filter((element: ApiMatches) => element.roundInfo.round === currentRound && element.status.type !== 'finished') : [],
            nextMatches: nMatches.status === 'fulfilled' ? nMatches.value.data.events.filter((element: ApiMatches) => element.roundInfo.round === currentRound + 1) : []
        }
        return matches
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}

const getPlayerDetails = async (playerId: number, leagueId: number, season: number) => { // Dados e estatísticas do jogador na liga
    try {
        const response = await axios.get(`https://www.sofascore.com/api/v1/player/${playerId}/unique-tournament/${leagueId}/season/${season}/statistics/overall`)
        return response.data.statistics
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}

const getLineUp = async (matcheId: number) => { // Escalação da partida

    // matcheId = 12290215
    try {
        const response = await axios(`https://www.sofascore.com/api/v1/event/${matcheId}/lineups`)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }

}

const getH2h = async (customId: string) => { // Confrontos entre os times

    // matcheId = 12290215
    try {
        const response = await axios(`https://www.sofascore.com/api/v1/event/${customId}/h2h/events`)
        return response.data.events
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }

}

const getMatchDetails = async (matchId: number) => { // Estatísticas da partida da partida
    try {
        const response = await axios.get(`https://www.sofascore.com/api/v1/event/${matchId}/statistics`)
        return response.data.statistics[0].groups[0].statisticsItems
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}

const getReferee = async (matcheId: number) => { // Informações detalhadas da partida + árbitro
    try {
        const response = await axios.get(`https://www.sofascore.com/api/v1/event/${matcheId}`)
        return response.data.event
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }
}

const searchData = async (text: string) => {
    try {
        if (text.length < 2) return []
        const response = await axios.get(`https://www.sofascore.com/api/v1/search/all?q=${text}&page=0`)
        const resJustSoccer = response.data.results.filter((element: ApiSearchData) => element.entity.sport?.name === 'Football' && element.type === 'team')
        return resJustSoccer
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }

}
const getTeamTournaments = async (teamId: number) => {
    try {
        const response = await axios.get(`https://www.sofascore.com/api/v1/team/${teamId}/team-statistics/seasons`)
        return response.data.uniqueTournamentSeasons
    } catch (error) {
        console.log(error)
        throw new Error("Ocorreu algum erro. Tente Novamente!");
    }

}

export { getTopPlayers, getTeams, getMatches, getPlayerDetails, getLineUp, getH2h, getMatchDetails, getReferee, searchData, getTeamTournaments }




// https://www.sofascore.com/api/v1/player/852534/unique-tournament/325/season/58766/statistics/overall