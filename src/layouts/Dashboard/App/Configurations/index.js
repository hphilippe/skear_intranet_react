import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Tag, Row, Col, Collapse } from 'antd';
// components loading error
import Loading from '../../../../components/Loading';
import ErrorMessage from '../../../../components/Error';
// CSS
import '../style.css';
import { GET_CONFIGURATIONS } from './mutations';
// convert content to html
import Parser from 'html-react-parser';

// Constante
const Panel = Collapse.Panel;

// CLASS APP
class App extends React.Component {

  render() {

    return (
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_CONFIGURATIONS}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, loading, error, refetch }) => {

              if (loading) {
                return <Loading isCenter={true} />;
              }

              if (error) {
                return <ErrorMessage error={error} />;
              }

              const dataConfig = data.configurationses["0"];
              //-- RETURN THE CONTENT OF DASHBOARD --
              return (
              
                <div>
                 {/* Infrastructure / logiciel */}
                  <Row>
                    <Col xs={24}>
                      <h2>
                        <div style={{ display: 'inline', marginRight: '0'}} className="animated fadeInLeft">INFRASTRUCTURE</div>
                        <div style={{ display: 'inline'}} className="animated fadeInRight">- LOGICIELS</div>
                      </h2>
                    </Col>
                    <Col xs={24}>

                      <Collapse defaultActiveKey={['1','2','3','4']} bordered={false}>
                        {/* Color : Red: #ff0000, Vert: #33cc33, Orange: #f50 */}
                        {/* SkearCloud */}
                        <Panel header="SkearCloud (Owncloud)" key="1">
                          {(() => {
                            switch(dataConfig.skearCloudStatus) {
                              case 'Ok':
                                return <div><Tag color="#33cc33">status : OK</Tag><p></p></div>;
                              case 'Ongoing':
                                return <div><Tag color="#f50">status : En cours création</Tag><p></p></div>;
                              case 'Down':
                                return <div><Tag color="#ff0000">status : Down</Tag><p></p></div>;
                              default:
                                return null;
                            }
                          })()}
                          <div>
                          {Parser(dataConfig.skearcloud)}
                          </div>
                        </Panel>
                        
                        {/* SkearGit */}
                        <Panel header="SkearGit (Gitlab) / Bitbucket" key="2">
                          {(() => {
                            switch(dataConfig.skearGitStatus) {
                              case 'Ok':
                                return <div><Tag color="#33cc33">status : OK</Tag><p></p></div>;
                              case 'Ongoing':
                                return <div><Tag color="#f50">status : En cours création</Tag><p></p></div>;
                              case 'Down':
                                return <div><Tag color="#ff0000">status : Down</Tag><p></p></div>;
                              default:
                                return null;
                            }
                          })()}
                          <div>
                          {Parser(dataConfig.skeargit)}
                          </div>
                        </Panel>
                        
                        {/* Meistertask */}
                        <Panel header="Meistertask" key="3">
                          {(() => {
                            switch(dataConfig.meistertaskStatus) {
                              case 'Ok':
                                return <div><Tag color="#33cc33">status : OK</Tag><p></p></div>;
                              case 'Ongoing':
                                return <div><Tag color="#f50">status : En cours création</Tag><p></p></div>;
                              case 'Down':
                                return <div><Tag color="#ff0000">status : Down</Tag><p></p></div>;
                              default:
                                return null;
                            }
                          })()}
                          <div>
                          {Parser(dataConfig.meistertask)}
                          </div>
                        </Panel>
                        
                        {/* SERVEUR */}
                        <Panel header="SkearNAS (Raspberry PI 3)" key="4">
                          {(() => {
                            switch(dataConfig.skearnasStatus) {
                              case 'Ok':
                                return <div><Tag color="#33cc33">status : OK</Tag><p></p></div>;
                              case 'Ongoing':
                                return <div><Tag color="#f50">status : En cours création</Tag><p></p></div>;
                              case 'Down':
                                return <div><Tag color="#ff0000">status : Down</Tag><p></p></div>;
                              default:
                                return null;
                            }
                          })()}
                          <div>
                          {Parser(dataConfig.skearnas)}
                          </div>
                        </Panel>
                        
                      </Collapse>
                      
                    </Col>
                  </Row>
                  
                  {/* Entreprise */}
                  <Row>
                    <Col xs={24}>
                      <h2>
                        <div style={{ display: 'inline', marginRight: '0'}} className="animated fadeInLeft">ENTRE</div>
                        <div style={{ display: 'inline'}} className="animated fadeInRight">PRISE</div>
                      </h2>
                    </Col>
                    <Col xs={24}>
                      
                      <Collapse defaultActiveKey={['1','2']} bordered={false}>
                      
                        {/* Skear Digital */}
                        <Panel header="Skear Digital (web)" key="1">
                          <div>
                            {Parser(dataConfig.skearDigital)}
                          </div>
                        </Panel>
                        
                        {/* Skear Games */}
                        <Panel header="Skear Games" key="2">
                          <div>
                            {Parser(dataConfig.skearGames)}
                          </div>
                        </Panel>
                        
                      </Collapse>
                      
                    </Col>
                  </Row>
                </div>
                );

            }}
          </Query>
        )}
      </ApolloConsumer>
      
    );
  }
}

export default App;