import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';

class Place extends Component {

  render() {
    return (
      <ListItem primaryText={this.props.place.name}
      role="button"
      onKeyPress={this.props.openInfoWindow.bind(this, this.props.place.marker)}
      onClick={this.props.openInfoWindow.bind(this, this.props.place.marker)} />
    )
  }
}


export default Place;
