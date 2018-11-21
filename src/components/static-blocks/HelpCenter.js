import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import Breadcrumb from '../layouts/BreadCrumb';
import HelpItem from './HelpItem';

export class HelpCenter extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.setState({
      items: [{
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: true
      }, {
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: false
      }, {
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: false
      }, {
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: false
      }, {
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: false
      }, {
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: false
      }, {
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: false
      }, {
        title: 'LABORIS NISI UT ALIQUIP EXN',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum.',
        collapse: false
      }]
    })
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <img alt='banner' src='assets/img/about-banner.png' />
        <CContainer>
          <Breadcrumb crumb='Help Center' />
          <Row style={{marginTop: '40px'}}>
            <Col md='8'>
              { items.map((item, index) => {
                return (
                  <HelpItem key={index} item={item}/>
                )
              })}
            </Col>
            <Col md='4'>
              <img alt='contact' width='100%' src='assets/img/about-img-1.png' />
            </Col>
          </Row>
        </CContainer>        
      </div>
    )
  }
}

export default HelpCenter;

const CContainer = styled(Container)`
  max-width: 900px!important;
  * {
    font-family: sans-serif;
  }
`;