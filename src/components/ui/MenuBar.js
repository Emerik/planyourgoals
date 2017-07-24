import React,{ Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class MenuBar extends Component {

  state = { activeItem: 'Home' }

  handleItemClick = (e, { name, index }) => {

    switch (index) {
    case 0:
      this.props.history.push('/');
      break;
    case 1:
      this.props.history.push('/dashboard');
      break;
    case 2:
      this.props.history.push('/week-activity');
      break;
    default:
      this.props.history.push('/');
      break;
    }


    return this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (

      <div className="MenuBar">
        <Menu pointing secondary inverted>
          <Menu.Item name='Home'>
            <Image src='./back.jpg' size='mini' shape='circular' />
          </Menu.Item>
          <Menu.Item name='Home' index={0} active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Item name='Dashboard' index={1} active={activeItem === 'Dashboard'} onClick={this.handleItemClick} />
          <Menu.Item name='WeekActivity' index={2} active={activeItem === 'WeekActivity'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item name='Account' index={3} active={activeItem === 'Account'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

MenuBar.propTypes = {
  history: PropTypes.object

};

export default MenuBar;
