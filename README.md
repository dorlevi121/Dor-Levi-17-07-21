# WeatherApp

##Pages
•	Home
-	days-forecasts
•	Favorites
-	Locations
##Services
•	api
•	Local Storage
•	Favorites – hold favorites list, server request, favorites list manipulations
•	Settings – temperature type, theme type, location, current city
•	Accuweather – all server request
##Features
•	Ask the user location
•	Display temperature in Celsius and Fahrenheit
•	Display Tel Aviv weather by default
•	Search city by autocomplete
•	Full compatibility to mobile devices
##API
GET Current Conditions 
Resource URL: http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
5 Days of Daily Forecasts
Resource URL: http://dataservice.accuweather.com/forecasts/v1/daily/5day/{locationKey}
Autocomplete search
Resource URL: http://dataservice.accuweather.com/locations/v1/cities/autocomplete ?apikey= &q=
Params:
•	Apikey 
•	q – Search terms


