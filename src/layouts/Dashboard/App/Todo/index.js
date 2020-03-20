import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Row, Col, Tabs } from 'antd';
// import graphql query
import { GET_TODO } from './mutations';
// components loading error
import Loading from '../../../../components/Loading';
import ErrorMessage from '../../../../components/Error';
// CSS
import '../style.css';
import './style.css';
// convert content to html
import Parser from 'html-react-parser';

// Constante
const TabPane = Tabs.TabPane;

// CLASS APP
class App extends React.Component {

  render() {

    return (
    <ApolloConsumer>
        {client => (
          <Query
            query={GET_TODO}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, loading, error, refetch }) => {

              if (loading) {
                return <Loading isCenter={true} />;
              }

              if (error) {
                return <ErrorMessage error={error} />;
              }
              
              //-- RETURN THE CONTENT --
              return (
                  <Row>
                    <Col xs={24}>
                      <h2>
                        <div style={{ display: 'inline', marginRight: '0'}} className="animated fadeInLeft">ANNONCES</div>
                        <div style={{ display: 'inline'}} className="animated fadeInRight">- TODO LISTE</div>
                      </h2>
                    </Col>

                    <Col xs={24}>
                      <div className="card-container">
                        <Tabs
                          type="card"
                          defaultActiveKey="1"
                          tabPosition="top"
                        >
                        {data.todoses.map(todo => {
                          if(todo.rank === 1){
                            return <TabPane tab={todo.title} style={{color: 'red'}} key={todo.rank}>{Parser(todo.content)}</TabPane>
                          } else {
                            return <TabPane tab={todo.title} key={todo.rank}>{Parser(todo.content)}</TabPane>
                          }
                        })}
                        </Tabs>
                      </div>
                    </Col>
                  </Row>
                  
              );

            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default App;