export interface ApiPlayer {
    [key: string]: ApiPlayerDetail[]
}

export interface ApiPlayerDetail {
    playedEnough: boolean
    type: string
    result: number
    average: number
    statistics: {
        type: any
        id: number
        appearances: number
        [key: string]: number
    }
    player: {
        name: string
        slug: string
        shortName: string
        position: string
        userCount: number
        id: number
        fieldTranslations: {
            nameTranslation: {
                ar: string
            }
            shortNameTranslation: {
                ar: string
            }
        }
    }
}

export interface ApiTeams {
    descriptions: string[]
    draws: number
    id: number
    losses: number
    matches: number
    points: number
    position: number
    promotion: {
        text: string
        id: number
        [key: string]: any
    }
    scoresAgainst: number
    scoresFor: number
    team: {
        name: string
        slug: string
        shortName: string
        gender: string
        id: number
        [key: string]: any
    }
    wins: number
}

export interface ApiLeagues {
    leagueId: string
    season: string
    name: string
}


export interface ApiMatches {
    [key: string]: any
    tournament: {
        name: string
        id: number
        startTimestamp: number
        homeScore: any
        awayScore: any
        time: any
        [key: string]: any
    }
    roundInfo: {
        round: number
    }
    homeTeam: {
        name: string
        slug: string
        shortName: string
        id: number
    }
    awayTeam: {
        name: string
        slug: string
        shortName: string
        id: number
    }
}

export interface ApiPlayerMoreDetails {
    matchesStarted: number
    appearances: number
    touches: number
    minutesPlayed: number
    [key: string]: string | number
}