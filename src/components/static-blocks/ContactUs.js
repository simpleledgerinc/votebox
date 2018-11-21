import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Form, FormGroup, Input, Button, Row, Col } from 'reactstrap';
import BreadCrumb from '../layouts/BreadCrumb';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

export class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <img alt='banner' src='assets/img/about-banner.png' />
        <CContainer>
          <BreadCrumb crumb='Policies' />
          <h1 style={{marginBottom: '30px'}}>CONTACT US</h1>
          <Row>
            <Col md='8'>
              <Form>
                <FormGroup>
                  <CInput onClick={this.handleChange} type='name' name='name' id='name' placeholder='Name' />
                </FormGroup>
                <FormGroup>
                  <CInput onClick={this.handleChange} type='email' name='email' id='email' placeholder='Email' />
                </FormGroup>
                <FormGroup>
                  <CInput onClick={this.handleChange} type='message' name='message' id='message' placeholder='Your Message' />
                </FormGroup>
                <CButton onClick={this.handleSubmit}>SUBMIT</CButton>
              </Form>
            </Col>
            <Col md='4'>
              <img alt='contact' width='100%' src='assets/img/about-img-1.png' />
            </Col>
          </Row>
        </CContainer>
        <MapContainer>
          <Map google={this.props.google} zoom={14}>
            <Marker name={'Current Location'} />
          </Map>
        </MapContainer>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBaA95Ldz-IMAxoTK5eIivCVP19UJ-tPBo'})(ContactUs);

const CInput = styled(Input)`
  border-radius: 0!important;
`;

const CButton = styled(Button)`
  background: #27a3e0!important;
  border: #27a3e0!important;
  padding: 8px 25px!important;
`;

const CContainer = styled(Container)`
  max-width: 900px!important;
  * {
    font-family: sans-serif;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  position: relative;
  margin-top: 40px;
`;