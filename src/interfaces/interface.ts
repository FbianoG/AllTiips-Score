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


export interface ApiMatchesObject {
    currentMatches: ApiMatches[]
    lastMatches: ApiMatches[]
    nextMatches: ApiMatches[]

}

export interface ApiMatches {
    [key: string]: any
    id: number
    startTimestamp: number
    homeScore: {
        current: number
    }
    awayScore: {
        current: number
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
    status: {
        type: 'inprogress' | 'finished' | 'notstarted'
    }
}

export interface ApiPlayerMoreDetails {
    matchesStarted: number
    appearances: number
    touches: number
    minutesPlayed: number
    fouls: number
    [key: string]: string | number
}