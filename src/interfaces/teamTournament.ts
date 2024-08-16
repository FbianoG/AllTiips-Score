export interface Main {
    uniqueTournamentSeasons: ApiTeamTournament[];
    typesMap: any
}

export interface ApiTeamTournament {
    uniqueTournament: UniqueTournament;
    seasons: ApiTeamTournamentsSeason[];
}

export interface ApiTeamTournamentsSeason {
    name: string;
    year: string;
    editor: boolean;
    id: number;
    seasonCoverageInfo?: any;
}

export interface UniqueTournament {
    name: string;
    slug: string;
    primaryColorHex: string;
    secondaryColorHex: string;
    category: Category;
    userCount: number;
    id: number;
    displayInverseHomeAwayTeams: boolean;
}

export interface Category {
    name: string;
    slug: string;
    sport: Sport;
    id: number;
    flag: string;
    alpha2?: string;
}

export interface Sport {
    name: string;
    slug: string;
    id: number;
}
