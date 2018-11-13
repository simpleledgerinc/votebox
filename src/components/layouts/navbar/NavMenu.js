import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../App.css';
import './NavMenu.css'

export default class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      navItems: [
        {to: '/', icon: 'home', name: <React.Fragment>Create<br/>New Vote Token</React.Fragment>},
        {to: '/', icon: 'home', name: <React.Fragment>Cast<br/>My Votes</React.Fragment>},
        {to: '/', icon: 'home', name: <React.Fragment>Find<br/>Voting Results</React.Fragment>},
        {to: '/', icon: 'home', name: <React.Fragment>Distribute<br/>Vote Tokens</React.Fragment>},
      ],
      activeIndex: 0
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
  render() {
    const { navItems, activeIndex } = this.state
    return (
      <Navbar className='padding-0' light expand="md">
        <NavbarBrand className='pt-0 pb-0' href="/">
          <img alt='logo' width='120px' src='/assets/img/votebox-logo.png' />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            { navItems.map((item, index) => {
              return (
                <NavItem className='f_15' key={index} onClick={this.setActiveIndex.bind(this, index)} active={ activeIndex === index }>
                  <Link to={item.to}>
                    <FontAwesomeIcon icon={item.icon} />
                    { item.name }
                  </Link>
                </NavItem>
              )
            })}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
};