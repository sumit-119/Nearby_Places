import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import PlaceList from './PlaceList';


class DrawerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div role={'menu'}>

      <AppBar
        title="Nearby Places"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.handleToggle}
        role = {'header'} />

      <Drawer
      role={'drawer'}
        docked={false}
        width={300}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}>
          <div className="search">
        <p style={{marginTop:40,color: '#ffa000',fontSize:'2.5rem',textAlign: 'center',}}>Search</p>
        <PlaceList places={this.props.places} openInfoWindow={this.props.openInfoWindow}
                          closeInfoWindow={this.props.closeInfoWindow}/>
        </div>
        </Drawer>

      </div>
    );
  }
}

export default DrawerMenu;
