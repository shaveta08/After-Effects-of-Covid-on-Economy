# World Economic Changes 

# DataSet:

Kaggal: https://www.kaggle.com/darknez/gdp-among-world?select=GDPfinal.json

Geo Json of all Countries: https://github.com/datasets/geo-countries

# Project Description: 
Inspired from the nationwide economic trends with the area and analyze the right relations and trends.
The Datasets has the GDP and other effecting factors for the countries over the years 1980-2020, this can be use to analyze the economic trends of each country.
This contains the different descriptive columns in the dataset.The content is available for majority of countries. 

## Concepts Covered:
  * Javascript
  * D3 for Selecting Process.
  * Plotly for Visulaizations
  * Leaflet For Maps and Time Silder on the Map.
  * MongoDb - UnderWork.

## Step1: DataSet Exploration and Merging:
  * During data Exploration process, dataset files with data regarding GDP and inflation were avaliable in the .xls format, so had to convert that into json files
  for using and reading in javascript file.
  * Once Converted We Merged the file content in the properties section of the geoJson file which provides Geodata data package providing geojson polygons for all the world's countries. 
  
## Step 2: Data Visulaizations:
  ### MAP: 
  * Once the data wass loaded, A Time slider control layer was added to show the data dynamically over the time slider.
  * This time shows all the ecnomic gdb percentage change over the years from 1980- 2020.
  * We can slide through the timer to change the data over the map.
  * Legends are added to make sense of all the colors used in the Map.
  * Once you Hover the mouse over the dataset, It will highlight the country.
  * If we click on the country, it will show the country name and the gdp percentage change for that country.
  
 ![IMage_1](https://github.com/shaveta08/World-Economic-Changes-Visualization/blob/master/Capture.PNG)
 
 ## Line Graph:
  * By default complete average gdp of all the world countries is shown on the graph as single trace. 
  * This graph is dynamic in nature.
  * The traces on this graph represent the countries gdp over the years from 1980 -2020.
  * We can add new traces of any country by clicking on that country over the map.
  * Also, we have Delete Trace button at the bottom which will delete the traces from the start one by one.
  * We have speacial legend in the graph also, if you click on the legend then it will hide that particular trace for you for better visulaizations.
 
   ![IMage_1](https://github.com/shaveta08/World-Economic-Changes-Visualization/blob/master/Capture1.PNG)

