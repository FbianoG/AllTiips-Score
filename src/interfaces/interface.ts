export interface ApiPlayer {
    [key: string]: ApiPlayerDetail[];
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