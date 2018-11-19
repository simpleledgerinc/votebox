import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

export class ContactUs extends Component {
  render() {
    return (
      <div>
        <img alt='banner' src='assets/img/about-banner.png' />
        <CContainer>
          <h1 style={{marginBottom: '30px'}}>CONTACT US</h1>
          <Row>
            <Col md='8'>
              <Div>
                <Label>Mail</Label>
                <Span>test@test.com</Span>
              </Div><br />
              <Div>
                <Label>Mobile</Label>
                <Span>1234567890</Span>
              </Div><br />
              <Div>
                <Label>Address</Label>
                <Span>ABC street, XYZ road, Pqr Ausyin USA</Span>
              </Div><br />
            </Col>
            <Col md='4'>
              <img alt='contact' width='100%' className='float-right' src='assets/img/about-img-1.png' />
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

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  width: 30%;
`;

const Span = styled.span`
  font-size: 16px;
  width: 70%;
`;

const Div = styled.div`
  width: 100%;
  display: inline-block;
`;

const CContainer = styled(Container)`
  max-width: 900px!important;
`;

const MapContainer = styled.div`
  height: 400px;
  position: relative;
  margin-top: 40px;
`;