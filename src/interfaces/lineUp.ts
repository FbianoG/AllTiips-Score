export interface lineUp {
    confirmed: boolean;
    home: Away;
    away: Away;
}

export interface Away {
    players: PlayerElement[];
    supportStaff: any[];
    formation: string;
}

export interface PlayerElement {
    player: PlayerPlayer;
    shirtNumber: number;
    jerseyNumber: string;
    position: Position;
    substitute: boolean;
    statistics: Statistics;
    captain?: boolean;
}

export interface PlayerPlayer {
    name: string;
    firstName?: string;
    lastName?: string;
    slug: string;
    shortName: string;
    position: Position;
    jerseyNumber: string;
    userCount: number;
    id: number;
    country: Country;
    dateOfBirthTimestamp: number;
}

export interface Country {
    alpha2: string;
    alpha3: string;
    name: string;
}

export enum Position {
    D = "D",
    F = "F",
    G = "G",
    M = "M",
}

export interface Statistics {
    totalPass?: number;
    accuratePass?: number;
    totalLongBalls?: number;
    accurateLongBalls?: number;
    goodHighClaim?: number;
    savedShotsFromInsideTheBox?: number;
    saves?: number;
    minutesPlayed?: number;
    touches?: number;
    rating?: number;
    possessionLostCtrl?: number;
    ratingVersions?: RatingVersions;
    totalCross?: number;
    aerialLost?: number;
    aerialWon?: number;
    duelLost?: number;
    duelWon?: number;
    challengeLost?: number;
    totalClearance?: number;
    interceptionWon?: number;
    keyPass?: number;
    outfielderBlock?: number;
    wasFouled?: number;
    blockedScoringAttempt?: number;
    totalTackle?: number;
    accurateCross?: number;
    fouls?: number;
    dispossessed?: number;
    totalContest?: number;
    shotOffTarget?: number;
    penaltyConceded?: number;
    onTargetScoringAttempt?: number;
    goals?: number;
    wonContest?: number;
    totalOffside?: number;
}

export interface RatingVersions {
    original: number;
    alternative: null;
}
