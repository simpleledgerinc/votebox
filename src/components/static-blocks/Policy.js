import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import BreadCrumb from '../layouts/BreadCrumb';

export class Policy extends Component {
  render() {
    return (
      <div>
        <img alt='banner' src='assets/img/about-banner.png' />
        <CContainer>
          <BreadCrumb crumb='Policies' />
          <h1>LABORIS NISI UT ALIQUIP EXN</h1>
          <P>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Nulla! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Nulla!</P>
          <h1>LABORIS NISI UT ALIQUIP EXN</h1>
          <P>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.</P>
          <h1>LABORIS NISI UT ALIQUIP EXN</h1>
          <P>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.</P>
        </CContainer>
      </div>
    )
  }
}

export default Policy

const CContainer = styled(Container)`
  max-width: 900px!important;
  margin-bottom: 50px!important;
  * {
    font-family: sans-serif;
  }
`;

const P = styled.p`
  font-size: 16px;
  text-align: justify;
`;