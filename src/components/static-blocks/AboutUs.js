import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import BreadCrumb from '../layouts/BreadCrumb';

const AboutUs = () => {
  return (
    <div>
      <img src='assets/img/about-banner.png' />
      <CContainer>
        <BreadCrumb crumb='About Vote'/>
        <h1>ABOUT US</h1>
        <Row>
          <Col md='7' className='mr-5'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Nulla! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Nulla!</p>
          </Col>
          <Col md='4'>
            <Image className='float-right' src='assets/img/about-img-1.png' />
          </Col>
        </Row>
        <Row style={{marginTop: '40px'}}>
          <Col md='4'>
            <Image src='assets/img/about-img-2.png' />
            <Image src='assets/img/about-img-3.png' />
          </Col>
          <Col md='7' className='ml-5'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Nulla! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Nulla!</p>
          </Col>
        </Row>
      </CContainer>
        <section style={{backgroundColor: '#60d5f6'}}>
          <Container style={{padding: '80px 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
            <h2>What People Says</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat.</p>
            <h6>Albert Hall, USA</h6>
          </Container>
        </section>
    </div>
  )
}

export default AboutUs;

const CContainer = styled(Container)`
  * {
    font-size: 18px;
    line-height: 1.45;
    text-align: justify;
  }
`;

const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
`