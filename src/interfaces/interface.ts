export interface PlayerRating {
    rating: Array<{

        playedEnough: boolean
        statistics: {
            id: number
        },
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
    }>
}