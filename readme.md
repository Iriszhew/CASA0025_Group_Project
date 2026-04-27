# HeatSafe London

HeatSafe London is an interactive Google Earth Engine dashboard for assessing urban heat risk across London boroughs. It combines population density, land surface temperature, urban heat island exposure, green cover, NDVI and a borough-level Heat Risk Index (HRI).

## Author
Millie Wang 25187186
Zhe Wang 25213251
Zeyi Wu 25243122

## Features

- London-wide heat risk overview
- Borough-level indicator dashboard
- Interactive borough selection by dropdown or map click
- Split-screen layer comparison
- Multilingual interface: English, Chinese and Turkish

## Indicators

The dashboard includes:

- Population Density Location Quotient (LQ)
- Mean Land Surface Temperature (LST)
- Urban Heat Island (UHI) proportion
- Green cover percentage
- Mean NDVI
- Heat Risk Index (HRI)

## How It Works

Spatial indicators are preprocessed in Google Earth Engine and aggregated to borough level. The HRI is calculated separately in Python and imported as a preprocessed borough-level table. Users can explore heat risk through a London overview, borough-level analysis and split layer comparison.

## Usage

1. Open the Google Earth Engine Code Editor.
2. Load the main JavaScript file.
3. Ensure all required assets are available or update the asset paths.
4. Run the script to launch the dashboard.
