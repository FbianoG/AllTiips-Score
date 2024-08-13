export interface ApiH2hMain {
    events: Event[]
}

export interface ApiH2h {
    tournament: Tournament
    season: Season
    roundInfo: RoundInfo
    customId: string
    status: Status
    winnerCode?: number
    homeTeam: Team
    awayTeam: Team
    homeScore: Score
    awayScore: Score
    time: Time
    changes: Changes
    hasGlobalHighlights: boolean
    hasXg?: boolean
    hasEventPlayerStatistics?: boolean
    hasEventPlayerHeatMap?: boolean
    detailId?: number
    crowdsourcingDataDisplayEnabled: boolean
    id: number
    awayRedCards?: number
    crowdsourcingEnabled: boolean
    startTimestamp: number
    slug: string
    finalResultOnly: boolean
    feedLocked: boolean
    isEditor: boolean
    aggregatedWinnerCode?: number
    previousLegEventId?: number
    coverage?: number
    homeRedCards?: number
}

export interface Score {
    current?: number
    display?: number
    period1?: number
    period2?: number
    normaltime?: number
    aggregated?: number
    overtime?: number
    penalties?: number
}

export interface Team {
    name: string
    slug: string
    shortName: string
    gender: string
    sport: Sport
    userCount: number
    nameCode: string
    disabled: boolean
    national: boolean
    type: number
    id: number
    country: Country
    subTeams: any[]
    teamColors: TeamColors
    fieldTranslations: FieldTranslations
}

export interface Country {
    alpha2?: string
    alpha3?: string
    name?: string
}

export interface FieldTranslations {
    nameTranslation: NameTranslation
    shortNameTranslation: SeasonCoverageInfo
}

export interface NameTranslation {
    ru: string
}

export interface SeasonCoverageInfo { }

export interface Sport {
    name: string
    slug: string
    id: number
}

export interface TeamColors {
    primary: string
    secondary: string
    text: string
}

export interface Changes {
    changes?: string[]
    changeTimestamp: number
}

export interface RoundInfo {
    round: number
    name?: string
    slug?: string
    cupRoundType?: number
}

export interface Season {
    name: string
    year: string
    editor: boolean
    id: number
    seasonCoverageInfo?: SeasonCoverageInfo
}

export interface Status {
    code: number
    description: string
    type: string
}

export interface Time {
    injuryTime1?: number
    injuryTime2?: number
    currentPeriodStartTimestamp?: number
    injuryTime3?: number
    injuryTime4?: number
}

export interface Tournament {
    name: string
    slug: string
    category: Category
    uniqueTournament: UniqueTournament
    priority: number
    isGroup: boolean
    isLive: boolean
    id: number
}

export interface Category {
    name: string
    slug: string
    sport: Sport
    id: number
    country: Country
    flag: string
    alpha2?: string
}

export interface UniqueTournament {
    name: string
    slug: string
    primaryColorHex: string
    secondaryColorHex: string
    category: Category
    userCount: number
    id: number
    country: SeasonCoverageInfo
    crowdsourcingEnabled: boolean
    hasPerformanceGraphFeature: boolean
    hasEventPlayerStatistics: boolean
    displayInverseHomeAwayTeams: boolean
}
