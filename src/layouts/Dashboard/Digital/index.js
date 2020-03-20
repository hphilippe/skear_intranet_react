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
              <div style={{ display: 'inline', marginRight: '0', float: 'none' }} class="animated fadeInLeft">DIGI</div>
              <div style={{ display: 'inline', float: 'none' }} class="animated fadeInRight">TAL</div>
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

            <Steps direction="vertical" size="small" current={1}>
              <Step title="FrontEnd" description="Front End avec les modules de bases connecté à GraphCMS" />
              <Step title="BackEnd" description="Back End en NodeJS + PostgreSQL pour remplacer GraphCMS" />
              <Step title="Refactorisation" description="Clean le Front End et back End, améliorations et optimisation du fonctionnement des modules" />
              <Step title="Securité" description="Test de sécurité" />
              <Step title="Mise en ligne" description="inscription + Utilisation public" />
              <Step title="New module" description="Ajout de nouveau module" />
              <Step title="Wrapper" description="Wrapper des différents site de location (airbnb, hotel booking,..)" />
            </Steps>

          </Col>
        </Row>
      </Content>
    );
  }
}

export default App;