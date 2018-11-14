import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <Container>
        <Row>
          <Col md='3' sm='12'>
            <img alt='logo' width='80%' src='assets/img/logo-symbol.png' />
          </Col>
          <Col md='3' sm='12'>
            <h5>Know More</h5>
            <Link to='/'>About Vote</Link><br />
            <Link to='/'>Contact Us</Link><br />
            <Link to='/'>Policies</Link><br />
            <Link to='/'>Help Center</Link><br />
          </Col>
          <Col md='3' sm='12'>
            <h5>Quick Links</h5>
            <Link to='/'>Create New Vote Token</Link><br />
            <Link to='/'>Cast My Votes</Link><br />
            <Link to='/'>Find Voting Results</Link><br />
            <Link to='/'>Distribute Vote Token</Link><br />
          </Col>
          <Col md='3' sm='12'>
            <h5>Get Social</h5>
            <Link to='/'>Facebook</Link><br />
            <Link to='/'>Instagram</Link><br />
            <Link to='/'>Twitter</Link><br />
            <Link to='/'>Youtube</Link><br />
          </Col>
        </Row>
        <hr />
        <p>© 2018 <span>VoteBox.io</span>. All rights reserved.</p>
      </Container>
    </div>
  )
}

export default Footer;