 import React from 'react';
 import { Container, Row, Col } from 'reactstrap';
 
 const CenterStatic = () => {
   return (
     <div>
      <Container className='text-center' style={{padding: '80px 0', maxWidth: '900px', margin: '0 auto'}}>
        <section style={{padding: '0 50px', marginBottom: '60px'}}>
          <h2>Labore et dolore magnam aliquam</h2>
          <p style={{textAlign: 'justify', fontSize: '18px'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus nam saepe repudiandae nobis, magni eum qui vel eveniet sunt laudantium blanditiis, explicabo fugiat. Vitae voluptas omnis totam modi ipsum harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni itaque eveniet quas minus soluta tenetur hic quisquam nihil iusto, deleniti saepe officia facere vitae quam! Veritatis quaerat doloremque consectetur in?. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, ipsa officiis tempora eaque, adipisci a eum odio fuga ratione vitae nemo voluptatem illum est similique voluptate, facilis reiciendis libero! Nulla!</p>
        </section>
        <section>
          <Row>
            <Col style={{overflow: 'hidden'}} md='4' sm='12'>
              <img style={{height: '100%'}} width='90%' alt='static1' src='assets/img/banner1.jpg' />
            </Col>
            <Col md='4' sm='12'>
              <img style={{padding: '5px'}} alt='static2' src='assets/img/banner1.jpg' />
              <img style={{padding: '5px'}} alt='static3' src='assets/img/banner1.jpg' />
            </Col>
            <Col style={{overflow: 'hidden'}} md='4' sm='12'>
              <img style={{height: '100%', margin: '0 auto'}} width='90%' alt='static4' src='assets/img/banner1.jpg' />
            </Col>
          </Row>
        </section>
      </Container>
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
 
 export default CenterStatic;