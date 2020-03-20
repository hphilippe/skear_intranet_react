import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// Ant design
import { Layout, Row, Col, Card, Collapse, Tag  } from 'antd';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
import Owncloud from './Owncloud';
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
const Panel = Collapse.Panel;
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
                        <div style={{ display: 'inline', marginRight: '0', float: 'none'}} class="animated fadeInLeft">EXTRA</div>
                        <div style={{ display: 'inline', float: 'none'}} class="animated fadeInRight">SKEAR</div>
                      </h1>
                    </Col>
                  </Row>

                  {/* Last Cards */}
                  <Row>
                    <Col xs={24}>
                      <h2>
                        <div class="animated fadeInLeft">Derniers</div>
                        <div class="animated fadeInRight">Documentations publiés</div>
                      </h2>
                    </Col>
                    {ColList}
                    {/*<CreateGroup client={client} refetch={refetch}/>*/}
                  </Row>

                  {/* Infrastructure / logiciel */}
                  <Row>
                    <Col xs={24}>
                      <h2>
                        <div style={{ display: 'inline', marginRight: '0'}} class="animated fadeInLeft">INFRASTRUCTURE</div>
                        <div style={{ display: 'inline'}}class="animated fadeInRight">- LOGICIELS</div>
                      </h2>
                    </Col>
                    <Col xs={24}>

                      <Collapse defaultActiveKey={['1','2','3','4']} bordered={false}>
                        {/* Color : Red: #ff0000, Vert: #33cc33, Orange: #f50 */}
                        {/* SkearCloud */}
                        <Panel header="SkearCloud (Owncloud)" key="1">
                          <Owncloud />
                        </Panel>
                        
                        {/* SkearGit */}
                        <Panel header="SkearGit (Gitlab)" key="2">
                          <p>
                            <Tag color="#f50">status : En cours création</Tag>
                          </p>
                          <p>
                          Lien site web : none <br/>
                          Lien bureau : none <br/>
                          Bureau Client : <a href="https://www.sourcetreeapp.com">Source Tree</a> <br/>
                          Liste des projets : 
                            <ul>
                              <li>Voyage en Poche (web)</li>
                              <li>ExtraSkear (web)</li>
                              <li>Skear Games (web)</li>
                              <li>Wasteland Project (jeux-vidéo)</li>
                            </ul>
                          </p>
                        </Panel>
                        
                        {/* Meistertask */}
                        <Panel header="Meistertask" key="3">
                          <p>
                            <Tag color="#33cc33">status : Ok</Tag>
                          </p>
                          <p>
                            Gestion de Projet/Ticket : <a href="https://www.meistertask.com">Meistertask</a> <br/>
                          </p>
                        </Panel>
                        
                        {/* SERVEUR */}
                        <Panel header="SkearNAS (Raspberry PI 3)" key="4">
                          <p>
                            <Tag color="#ff0000">status : Down</Tag>
                          </p>
                          <p>
                            Serveur NAS : Rapberry PI 3 <br/>
                          </p>
                        </Panel>
                        
                      </Collapse>
                      
                    </Col>
                  </Row>
                  
                  {/* Entreprise */}
                  <Row>
                    <Col xs={24}>
                      <h2>
                        <div style={{ display: 'inline', marginRight: '0'}} class="animated fadeInLeft">ENTRE</div>
                        <div style={{ display: 'inline'}}class="animated fadeInRight">PRISE</div>
                      </h2>
                    </Col>
                    <Col xs={24}>
                      
                      <Collapse defaultActiveKey={['1','2']} bordered={false}>
                      
                        {/* Skear Digital */}
                        <Panel header="Skear Digital (web)" key="1">
                          <p>
                            Front End Technologie : React <br/>
                            Back End Technologie : NodeJS <br/>
                            Hébergement : Amazon AWS <br/>
                            Lien Utiles : 
                            <ul>
                              <li>Gestion et Préparation de son voyages ou évènement : <a href="http://skearreact.s3-website.eu-west-3.amazonaws.com/">Voyage en poche</a></li>
                              <li>Documentation et Extranet de l'entreprise : <a href="http://skear.extranet.s3-website.eu-west-3.amazonaws.com/">ExtraSkear</a></li>
                              <li>Présentation de Skear Games et de ses jeux : <a href="http://skear.fr/">Skear Games</a></li>
                            </ul>
                          </p>
                        </Panel>
                        
                        {/* Skear Games */}
                        <Panel header="Skear Games" key="2">
                          <p>
                            Moteur de jeu : Unity 3D v2018.2.2f1 <br/>
                            Modélisation 3D : Blender v2.79b <br/>
                            Texture : Substance Painter <br/>
                            Lien Utiles : 
                            <ul>
                                <li>Animation 3D : <a href="https://www.mixamo.com/#/">Mixamo</a></li>
                                <li>Création Personnage 3D : <a href="https://www.adobe.com/fr/products/fuse.html">Fuse</a></li>
                                <li>Model 3D : <a href="https://www.turbosquid.com">Turbosquid</a></li>
                                <li>Model 3D : <a href="https://3dsky.org">3dsky</a></li>
                                <li>Unity Asset : <a href="https://www.assetstore.unity3d.com">Unity Store</a></li>
                                <li>Logiciel Modélisation 3D : <a href="https://www.blender.org">Blender 3D</a></li>
                                <li>Moteur de jeu : <a href="https://unity3d.com/fr">Unity</a></li>
                            </ul>
                          </p>
                        </Panel>
                        
                      </Collapse>
                      
                    </Col>
                  </Row>
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