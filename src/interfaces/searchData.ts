export interface Main {
    results: ApiSearchData[];
}

export interface ApiSearchData {
    type: Type;
    entity: Entity;
    score: number;
}

export interface Entity {
    name: string;
    slug: string;
    shortName: string;
    gender?: Gender;
    sport?: Sport;
    userCount?: number;
    nameCode?: string;
    disabled?: boolean;
    national?: boolean;
    type?: number;
    id: number;
    country: Country;
    subTeams?: any[];
    teamColors?: TeamColors;
    fieldTranslations?: EntityFieldTranslations;
    team?: Team;
    position?: string;
    jerseyNumber?: string;
    deceased?: boolean;
    teams?: Team[];
    firstName?: string;
    lastName?: string;
    ranking?: number;
}

export interface Country {
    alpha2: string;
    name: string;
}

export interface EntityFieldTranslations {
    nameTranslation: string;
    shortNameTranslation: string;
}

export enum Gender {
    F = "F",
    M = "M",
}

export interface Sport {
    name: string;
    slug: string;
    id: number;
}

export interface Team {
    name: string;
    slug: string;
    shortName: string;
    gender: Gender;
    sport: Sport;
    userCount: number;
    nameCode: string;
    disabled: boolean;
    national: boolean;
    type: number;
    id: number;
    country: Country;
    subTeams: any[];
    teamColors: TeamColors;
    fieldTranslations: any;
}

export interface TeamColors {
    primary: string;
    secondary: string;
    text: string;
}

export enum Type {
    Manager = "manager",
    Player = "player",
    Team = "team",
    Referee = "referee",
}
