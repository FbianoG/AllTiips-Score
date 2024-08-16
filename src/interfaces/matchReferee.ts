export interface Main {
    event: Event
}

export interface ApiMatchReferee {
    tournament: Tournament
    season: Season
    roundInfo: RoundInfo
    customId: string
    status: Status
    venue: Venue
    referee: Referee
    homeTeam: Team
    awayTeam: Team
    homeScore: AwayScore
    awayScore: AwayScore
    time: AwayScore
    changes: Changes
    hasGlobalHighlights: boolean
    detailId: number
    crowdsourcingDataDisplayEnabled: boolean
    id: number
    defaultPeriodCount: number
    defaultPeriodLength: number
    defaultOvertimeLength: number
    crowdsourcingEnabled: boolean
    startTimestamp: number
    slug: string
    finalResultOnly: boolean
    feedLocked: boolean
    fanRatingEvent: boolean
    seasonStatisticsType: string
    showTotoPromo: boolean
    isEditor: boolean
}

export interface AwayScore {
}

export interface Team {
    name: string
    slug: string
    shortName: string
    gender: string
    sport: Sport
    userCount: number
    manager: Manager
    venue: Venue
    nameCode: string
    disabled: boolean
    national: boolean
    type: number
    id: number
    country: any
    subTeams: any[]
    fullName: string
    teamColors: TeamColors
    foundationDateTimestamp: number
    fieldTranslations: AwayTeamFieldTranslations
    class?: number
}

export interface AwayTeamFieldTranslations {
    nameTranslation: NameTranslation
    shortNameTranslation: AwayScore
}

export interface NameTranslation {
    ar: string
    ru: string
}

export interface Manager {
    name: string
    slug: string
    shortName: string
    id: number
    country: any
    fieldTranslations: ManagerFieldTranslations
}

export interface ManagerFieldTranslations {
    nameTranslation: ShortNameTranslationClass
    shortNameTranslation: ShortNameTranslationClass
}

export interface ShortNameTranslationClass {
    ar: string
}

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

export interface Venue {
    city: City
    stadium: Stadium
    id: number
    country: any
    fieldTranslations: VenueFieldTranslations
}

export interface City {
    name: string
}

export interface VenueFieldTranslations {
    nameTranslation: ShortNameTranslationClass
    shortNameTranslation: AwayScore
}

export interface Stadium {
    name: string
    capacity: number
}

export interface Changes {
    changeTimestamp: number
}

export interface Referee {
    name: string
    slug: string
    yellowCards: number
    redCards: number
    yellowRedCards: number
    games: number
    sport: Sport
    id: number
    country: any
}

export interface RoundInfo {
    round: number
}

export interface Season {
    name: string
    year: string
    editor: boolean
    id: number
}

export interface Status {
    code: number
    description: string
    type: string
}

export interface Tournament {
    name: string
    slug: string
    category: Category
    uniqueTournament: UniqueTournament
    priority: number
    isGroup: boolean
    competitionType: number
    isLive: boolean
    id: number
}

export interface Category {
    name: string
    slug: string
    sport: Sport
    id: number
    country: any
    flag: string
    alpha2: any
}

export interface UniqueTournament {
    name: string
    slug: string
    primaryColorHex: string
    secondaryColorHex: string
    category: Category
    userCount: number
    id: number
    country: AwayScore
    crowdsourcingEnabled: boolean
    hasPerformanceGraphFeature: boolean
    hasEventPlayerStatistics: boolean
    displayInverseHomeAwayTeams: boolean
}
