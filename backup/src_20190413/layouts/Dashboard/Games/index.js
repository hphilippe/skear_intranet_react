import React from "react";
// Ant design
import { Steps, Layout, Row, Col } from 'antd';
// CSS
import '../style.css';

// constante
const Step = Steps.Step;
const { Content } = Layout;

// CLASS APP
class App extends React.Component {

  render() {

    return (
      <Content style={{ margin: '0 16px' }} >

        <Row>
          <Col xs={24}>
            <h1 style={{ margin: '0 auto', textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline', marginRight: '0', float: 'none' }} class="animated fadeInLeft">GAM</div>
              <div style={{ display: 'inline', float: 'none' }} class="animated fadeInRight">ES</div>
            </h1>
          </Col>
        </Row>

        <Row>
          <Col xs={24}>
            <h2>
              <div style={{ display: 'inline', marginRight: '0' }} class="animated fadeInLeft">ROAD</div>
              <div style={{ display: 'inline' }} class="animated fadeInRight">MAPS</div>
            </h2>
          </Col>
          
          <Col xs={24}>

            <Steps direction="vertical" size="small" current={0}>
              <Step title="POC" description="Réalisation d'un POC" />
              <Step title="Approbation du POC" description="Approbation de la direction du jeu" />
              <Step title="Amélioration" description="Amélioration du POC" />
            </Steps>

          </Col>
        </Row>
      </Content>
    );
  }
}

export default App;