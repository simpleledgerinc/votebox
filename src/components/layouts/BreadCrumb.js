import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BreadCrumb = (props) => {
  const Wrapper = styled.div`
    display: inline-block;
    color: #a8a8a8;
  `;
  const Crumb = styled.span`
    color: #6a6869;
    font-weight: bold;
    font-size: 13px;
  `;
  return (
    <Wrapper>
      <FontAwesomeIcon icon='home' />
      &nbsp; Home &nbsp;> &nbsp;
      <Crumb>{ props.crumb }</Crumb>
    </Wrapper>
  )
}

export default BreadCrumb;