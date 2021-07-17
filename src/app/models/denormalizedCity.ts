import { Country } from "./country";

export interface DenormalizedCity {
    Version: number
    Key: string
    Type: string
    Rank: number
    LocalizedName: string
    Country: Country
    AdministrativeArea: AdministrativeArea
}

export interface AdministrativeArea {
    ID: string
    LocalizedName: string
}