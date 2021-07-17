export interface Temperature {
    Metric: Celsius
    Imperial: Fahrenheit
  }
  
  export interface Celsius {
    Value: number
    Unit: string
    UnitType: number
  }
  
  export interface Fahrenheit {
    Value: number
    Unit: string
    UnitType: number
  }