import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DrawerMenu from './DrawerMenu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const muiTheme = getMuiTheme({
  palette: {
    "primary1Color": "#ffa000",
    "primary2Color": "#ffe57f",
    "primary3Color": "#ffc400",
    "accent1Color": "#009688",
    "textColor": "#000000",
    "secondaryTextColor": "#757575"
  },
});


class MapView extends Component {


  constructor(props) {
    super(props);
    this.state = {
      'places': this.props.places,
      'map': '',
      'infowindow': '',
      'lastmarker': ''
    };
    this.startMap = this.startMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }


  componentDidMount() {
    window.initMap = this.startMap;
  }


  startMap() {

    var self = this;
    var mapview = document.getElementById('mapView');
    mapview.style.height = '90vh';
    var map = new window.google.maps.Map(mapview, {
      center: {
        lat: 30.7222,
        lng: 76.7794
      },
      zoom: 12,
      mapTypeControl: false
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, 'closeclick', function() {
      self.closeInfoWindow();
    });

    this.setState({
      'map': map,
      'infowindow': InfoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, 'click', function() {
      self.closeInfoWindow();
    });

    var places = [];
    this.state.places.forEach(function(place) {
      var name = place.name;
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(place.lat, place.lng),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener('click', function() {
        self.openInfoWindow(marker);
      });

      place.name = name;
      place.marker = marker;
      place.display = true;
      places.push(place);
    });
    this.setState({
      'places': places
    });
  }


  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      'lastmarker': marker
    });
    this.state.infowindow.setContent('Loading Data...');
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.FourSquareInfo(marker);
  }
     /**
     * Retrive the location data from the foursquare api for the marker and display it in the infowindow
     */

  FourSquareInfo(marker) {
    var self = this;
    var url = "https://api.foursquare.com/v2/venues/search?client_id=NNOK52GQGLISZPVKP53LZCYKZI2Q53XSSH5AU2BPNFVO5X0U&client_secret=04ASXUV0CYEHY4TKD4QZBQAKZCV0PZEX1BDHEW0G0AYDUQ4U&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            self.state.infowindow.setContent("Sorry data can't be loaded");
            return;
          }

          response.json().then(function(data) {
            var location_data = data.response.venues[0];
            var location_name = '<h5>Name: </h5>' + location_data.name + '<br>';
            var location_city = '<h5>City: </h5>' + location_data.location.city + '<br>';
            var location_hours = '<h5>Descriptions: </h5>' + location_data.description + '<br>';
var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
            self.state.infowindow.setContent(location_name + location_city + location_hours + readMore);
          });
        }
      )
      .catch(function(err) {
        self.state.infowindow.setContent("Sorry data can't be loaded");
      });
  }


  closeInfoWindow() {
    if (this.state.lastmarker) {
      this.state.lastmarker.setAnimation(null);
    }
    this.setState({
      'lastmarker': ''
    });
    this.state.infowindow.close();
  }


	 render() {
			return (
				<div>
					<MuiThemeProvider muiTheme={muiTheme}>
						<DrawerMenu places={this.props.places}  openInfoWindow={this.openInfoWindow} closeInfoWindow={this.closeInfoWindow} />
					</MuiThemeProvider>
					<div  id="mapView"/>
					</div>
			);
	}
}
export default MapView;
