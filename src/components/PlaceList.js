import React, {Component}from 'react';
import Place from './Place'
import {List}from 'material-ui/List';
import TextField from 'material-ui/TextField';


class PlacesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'places': '',
            'search': '',
        };
        this.filterPlaces = this.filterPlaces.bind(this);
    }

    filterPlaces(event) {
    		this.props.closeInfoWindow();
    		const {
    			value
    		} = event.target;
    		var places = [];
    		this.props.places.forEach(function (place) {
    			if (place.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
    				place.marker.setVisible(true);
    				places.push(place);
    			} else {

    				place.marker.setVisible(false);
    			}
    		});

        this.setState({
            'places': places,
            'search': value
        });

    }

    componentWillMount() {

        this.setState({
            'places': this.props.places
        });

    }
    render() {

var placelist = this.state.places.map(function(place, index) {
            return ( <Place key = {index}
                role={'button'}
                openInfoWindow = {this.props.openInfoWindow.bind(this)}
                place = {place}/>)
                ;}, this);
                //eslint-disable-next-line
                if (placelist == '') {
                    return (
                      <div role={'menu'}>
                        <TextField
                        role={'search'}
                        hintText = "Search here..."
                        value = {this.state.search}
                        onChange = {this.filterPlaces}/> <br/><br/>
                        <div> Sorry!No Place Found </div>
                        </div>
                    )
                } else {
                    return ( <div role={'menu'}>
                        <TextField hintText = "Search here..."
                            role={'search'}
                        value = {this.state.search}
                        onChange = {this.filterPlaces}/>
                        <List> {placelist} </List>
                        </div>
                    )
                }
            }
        }
  export default PlacesList;
