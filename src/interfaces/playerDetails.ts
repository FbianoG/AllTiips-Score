export interface main {
    statistics: ApiPlayerMoreDetails;
    team: Team;
}

export interface ApiPlayerMoreDetails {
    [key: string]: any
    rating: number;
    totalRating: number;
    countRating: number;
    goals: number;
    bigChancesCreated: number;
    bigChancesMissed: number;
    assists: number;
    expectedAssists: number;
    goalsAssistsSum: number;
    accuratePasses: number;
    inaccuratePasses: number;
    totalPasses: number;
    accuratePassesPercentage: number;
    accurateOwnHalfPasses: number;
    accurateOppositionHalfPasses: number;
    accurateFinalThirdPasses: number;
    keyPasses: number;
    successfulDribbles: number;
    successfulDribblesPercentage: number;
    tackles: number;
    interceptions: number;
    yellowCards: number;
    directRedCards: number;
    redCards: number;
    accurateCrosses: number;
    accurateCrossesPercentage: number;
    totalShots: number;
    shotsOnTarget: number;
    shotsOffTarget: number;
    groundDuelsWon: number;
    groundDuelsWonPercentage: number;
    aerialDuelsWon: number;
    aerialDuelsWonPercentage: number;
    totalDuelsWon: number;
    totalDuelsWonPercentage: number;
    minutesPlayed: number;
    goalConversionPercentage: number;
    penaltiesTaken: number;
    penaltyGoals: number;
    penaltyWon: number;
    penaltyConceded: number;
    shotFromSetPiece: number;
    freeKickGoal: number;
    goalsFromInsideTheBox: number;
    goalsFromOutsideTheBox: number;
    shotsFromInsideTheBox: number;
    shotsFromOutsideTheBox: number;
    headedGoals: number;
    leftFootGoals: number;
    rightFootGoals: number;
    accurateLongBalls: number;
    accurateLongBallsPercentage: number;
    clearances: number;
    errorLeadToGoal: number;
    errorLeadToShot: number;
    dispossessed: number;
    possessionLost: number;
    possessionWonAttThird: number;
    totalChippedPasses: number;
    accurateChippedPasses: number;
    touches: number;
    wasFouled: number;
    fouls: number;
    hitWoodwork: number;
    ownGoals: number;
    dribbledPast: number;
    offsides: number;
    blockedShots: number;
    passToAssist: number;
    saves: number;
    cleanSheet: number;
    penaltyFaced: number;
    penaltySave: number;
    savedShotsFromInsideTheBox: number;
    savedShotsFromOutsideTheBox: number;
    goalsConcededInsideTheBox: number;
    goalsConcededOutsideTheBox: number;
    punches: number;
    runsOut: number;
    successfulRunsOut: number;
    highClaims: number;
    crossesNotClaimed: number;
    matchesStarted: number;
    penaltyConversion: number;
    setPieceConversion: number;
    totalAttemptAssist: number;
    totalContest: number;
    totalCross: number;
    duelLost: number;
    aerialLost: number;
    attemptPenaltyMiss: number;
    attemptPenaltyPost: number;
    attemptPenaltyTarget: number;
    totalLongBalls: number;
    goalsConceded: number;
    tacklesWon: number;
    tacklesWonPercentage: number;
    scoringFrequency: number;
    yellowRedCards: number;
    savesCaught: number;
    savesParried: number;
    totalOwnHalfPasses: number;
    totalOppositionHalfPasses: number;
    totwAppearances: number;
    expectedGoals: number;
    goalKicks: number;
    ballRecovery: number;
    id: number;
    type: string;
    appearances: number;
}

export interface Team {
    name: string;
    slug: string;
    shortName: string;
    gender: string;
    sport: Sport;
    userCount: number;
    nameCode: string;
    disabled: boolean;
    national: boolean;
    type: number;
    id: number;
    teamColors: TeamColors;
    fieldTranslations: FieldTranslations;
}

export interface FieldTranslations {
    nameTranslation: NameTranslation;
    shortNameTranslation: ShortNameTranslation;
}

export interface NameTranslation {
    ru: string;
}

export interface ShortNameTranslation {
}

export interface Sport {
    name: string;
    slug: string;
    id: number;
}

export interface TeamColors {
    primary: string;
    secondary: string;
    text: string;
}
