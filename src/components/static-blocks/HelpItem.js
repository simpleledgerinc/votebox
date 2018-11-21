import React, { Component } from 'react';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class HelpItem extends Component {
  constructor() {
    super();

    this.state = {
      collapse: false,
      item: null
    }
  }

  componentWillMount() {
    this.setState({
      item: this.props.item,
      collapse: this.props.item.collapse
    })
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { item } = this.state;
    return (
      <div>
        <H1 onClick={this.toggle}>{ item.title }
          <span hidden={this.state.collapse}><FontAwesomeIcon icon='plus'/></span>
          <span hidden={!this.state.collapse}><FontAwesomeIcon icon='minus'/></span>
        </H1>
        <Collapse isOpen={this.state.collapse}>
          <P>{ item.content }</P>        
        </Collapse>
      </div>
    )
  }
}

export default HelpItem;

const H1 = styled.h1`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 22px!important;
`;

const P = styled.p`
  font-size: 16px;
  text-align: justify;
  margin-bottom: 20px!important;
`;
