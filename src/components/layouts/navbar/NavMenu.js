import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../App.css';
import './NavMenu.css'
import styled from 'styled-components';

const Hr = styled.hr`
  margin: 0;
  background: #61d5f6;
  height: 8px;
  border: none;
`;
class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      navItems: [
        {to: '/create-vote-token', icon: 'create_vote', name: <React.Fragment>Create<br/>New Vote Token</React.Fragment>},
        {to: '/cast-vote', icon: 'cast_vote', name: <React.Fragment>Cast<br/>My Votes</React.Fragment>},
        {to: '/find-vote', icon: 'find_vote', name: <React.Fragment>Find<br/>Voting Results</React.Fragment>},
        {to: '/distribute', icon: 'distribute', name: <React.Fragment>Distribute<br/>Vote Tokens</React.Fragment>},
      ]
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  setActiveIndex = (index) => {
    this.setState({
      activeIndex: index
    })
  }
  getActiveIndex = (path) => {
    let activeIndex = 0;
    switch (path) {
      case '/create-vote-token':
        activeIndex = 0;
        break;
      case '/cast-vote':
        activeIndex = 1;
        break;
      case '/find-vote':
        activeIndex = 2;
        break;
      case '/distribute':
        activeIndex = 3;
        break;
      default:
        break;
    }
    return activeIndex; 
  }
  render() {
    const currentPath = this.props.location.pathname;
    const activeIndex = this.getActiveIndex(currentPath);
    const { navItems } = this.state
    return (
      <div>
        <Navbar className='padding-0' light expand="md">
          <NavbarBrand className='pt-0 pb-0' href="/">
            <img alt='logo' width='120px' src='/assets/img/votebox-logo.png' />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              { navItems.map((item, index) => {
                return (
                  <NavItem key={index} active={ activeIndex === index }>
                    <Link to={item.to}>
                      <img style={{width: '19px', marginBottom: '10px'}}
                        src={`/assets/img/${item.icon}${activeIndex === index ? '_active' : ''}.png`}
                      />
                      { item.name }
                    </Link>
                  </NavItem>
                )
              })}
            </Nav>
          </Collapse>
        </Navbar>
        <Hr />
      </div>
    )
  }
};

export default withRouter(NavMenu);