export interface ApiMatchesDetails {
    name: string
    home: string
    away: string
    compareCode: number
    homeValue: number
    awayValue: number
    renderType: number
    key: string
    homeTotal?: number
    awayTotal?: number
    [key: string]: any
}