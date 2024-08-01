export interface ApiPlayer {
    [key: string]: ApiPlayerDetail[]
}

export interface ApiPlayerDetail {
    playedEnough: boolean
    type: string
    result: number
    average: number
    statistics: Stats
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

interface Stats {
    type: any
    id: number
    appearances: number
    [key: string]: number // Permitir propriedades dinâmicas
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