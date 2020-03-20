import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Layout, Row, Col, Card } from 'antd';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
import Configurations from './Configurations';
import Todo from './Todo';
// CSS
import '../style.css';
import './style.css';
// Import module
//import CreateGroup from './createGroup.js';
//import EditGroup from './editGroup';
// import graphql query
import { GET_POST_DASHBOARD } from './mutations';
// moment
import Moment from 'react-moment';
import 'moment/locale/fr';
// image
import noImage from '../../../assets/img/noimage.png';

// Constante
const { Content } = Layout;
const { Meta } = Card;
//const Panel = Collapse.Panel;
//const userEmail = localStorage.getItem("email");

// Redirect group select, custom url
function GroupSelect(item) {
  localStorage.setItem("groupSelectId", item.id);
  var titleUnderscore = item.title.split(" ").join("_");
  window.location.pathname = '/post/' + item.id + '/' + titleUnderscore
}

// await graphql delete then refetch
/*async function removeGroupAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_POST,
    variables: { id: idItem }
  })
  if (data) refetch()
  if (error) refetch()
}

// Modal delete Item
const confirm = Modal.confirm;
function showDeleteConfirm(client, id, refetch) {
  confirm({
    title: 'Suppression',
    content: 'Cliquer sur "Ok" pour être sûr de surpprimer l\'évènement et toutes ces données lui faissant référence',
    onOk() {
      removeGroupAsync(client, id, refetch);
    },
    onCancel() { },
  });
}*/

// CLASS APP
class App extends React.Component {

  render() {

    return (
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_POST_DASHBOARD}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, loading, error, refetch }) => {

              if (loading) {
                return <Loading isCenter={true} />;
              }

              if (error) {
                return <ErrorMessage error={error} />;
              }

              // MAP ALL ITEM
              const ColList = data.posts.map(({ ...group }) => {
              const areImages = group.url
                return (
                  <Col lg={6} md={12} xs={24} className={"gutter-row"} key={group.id} >
                    <Card
                      hoverable
                      style={{ textAlign: 'center', marginLeft: '5px', marginRight: '5px' }}
                      cover={
                        areImages
                          ? <img style={{ height: '250px', objectFit: 'cover' }} alt="example" src={`${areImages}`} onClick={() => { GroupSelect(group) }} />
                          : <img style={{ height: '250px', objectFit: 'cover' }} alt="example" src={noImage} onClick={() => { GroupSelect(group) }} />
                      }
                    >
                      <Meta
                        onClick={() => { GroupSelect(group) }}
                        title={group.title}
                      />
                      <div className="group_name">
                        {group.users.username} - {group.categories.title}
                      </div>
                      <div className="group_date">
                        {group.updatedAt ? <Moment date={group.updatedAt} format="DD MMMM YYYY" /> : ''}
                      </div>
                    </Card>
                  </Col>
                );
              });

              //-- RETURN THE CONTENT OF DASHBOARD --
              return (
                <Content style={{ margin: '0 16px' }} >
                  
                  {/* Entête */}
                  <Row>
                    <Col xs={24}>
                      <h1 style={{ margin: '0 auto', textAlign: 'center', width: '100%'}}>
                        <div style={{ display: 'inline', marginRight: '0', float: 'none'}} className="animated fadeInLeft">EXTRA</div>
                        <div style={{ display: 'inline', float: 'none'}} className="animated fadeInRight">SKEAR</div>
                      </h1>
                    </Col>
                  </Row>

                  {/* Last Cards */}
                  <Row>
                    <Col xs={24}>
                      <h2>
                        <div className="animated fadeInLeft">Derniers</div>
                        <div className="animated fadeInRight">Documentations publiés</div>
                      </h2>
                    </Col>
                    {ColList}
                    {/*<CreateGroup client={client} refetch={refetch}/>*/}
                  </Row>
                  
                  {/* TODO LISTE */}
                  <Todo />
                  
                  {/* Configurations */}
                  <Configurations />
                </Content>
              );

            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default App;