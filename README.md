# Neighbourhood-Map-react
A single-page web application, built using the React framework, that displays a Google Map of an area and various points of interest. Users can search all included landmarks and, when selected, additional information about a landmark is presented from the FourSquare APIs.
You can view live demo [here](https://nearby-places23.herokuapp.com/).
## APIs used in this project
* Google Maps API - To Display Map, Markers and InfoWindow.
* [FourSquare API](https://developer.foursquare.com/) - To Fetch Ratings of the given locations.

## Framework Used
* React

##  Run the project in Development Mode
The project uses [Node.js >= 6.x](https://nodejs.org/en/) and the [Create-React-App starter code](https://github.com/facebookincubator/create-react-app).

After Node is installed in your system, follow the below steps.

1. Navigate to the directory where you want to store the app.
2. Clone the repo `git clone https://github.com/invincisumit/Neighborhood-Map-React-.git`
3. Now install all modules listed as dependencies in `package.json` by running the command `npm install`
4. Launch the app with this command `npm start`

A new browser window open automatically displaying the app.

***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*

## Run the project in Production Mode

1. Build the production ready optimised code. `npm run build`
2. Deploy it to `gh-pages` branch by `npm run deploy`
