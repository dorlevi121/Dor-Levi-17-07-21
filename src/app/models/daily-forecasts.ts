
export interface DailyForecasts {
    Date: string
    EpochDate: number
    Temperature: TemperatureDaliy
    Day: Day
    Night: Day
    Sources: string[]
    MobileLink: string
    Link: string
}

export interface TemperatureDaliy {
    Minimum: Minimum
    Maximum: Maximum
}

interface Minimum {
    Value: number
    Unit: string
    UnitType: number
}

interface Maximum {
    Value: number
    Unit: string
    UnitType: number
}

interface Day {
    Icon: number
    IconPhrase: string
    HasPrecipitation: boolean
}