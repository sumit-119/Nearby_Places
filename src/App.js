import React, {
  Component
} from 'react';
import './App.css';
import MapView from './components/MapView';
import places from './components/Utility/places';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      places,
    };
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadGoogleMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyCNIsZuFCeuRXvjnrhQeWpCqFcXudAwcE8&callback=initMap')

  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });

  handleClose = () => this.setState({
    open: false
  });
  render() {
    return ( <main className = "App" role={'application'} >
      <MapView places = {places }/> 
            </main >
    );
  }
}

export default App;

function loadGoogleMap(src) {
  var context = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Failed to Load Google Maps,Please check your internet Connection.....");
  };
  context.parentNode.insertBefore(script, context);
}
