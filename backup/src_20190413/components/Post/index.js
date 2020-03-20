import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// components loading error
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/Error';
// module
import PostList from './PostList';
//import CatCreate from './CatCreate';
import DrawersCreateDoc from './PostCreate';
// ant design
import { Layout, Row, Col, Modal } from "antd";
// css
import './style.css';
// Mutations
import { GET_CATEGORIES, GET_ALL_CATEGORIES, DELETE_CATEGORIES } from './mutations';

// constante
const confirm = Modal.confirm;
const { Content } = Layout;

// await graphql delete then refetch function from query in todolist
async function removeCategorieAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_CATEGORIES,
    variables: { id: idItem }
  })
  if (data) refetch()
  if (error) refetch()
}

class Post extends React.Component {
  
  state = {
    selectedValue: 'cjsk1to6xahzj0c15751ehf5b',
  }

  handleClick = (value) => {
    // SetState
    this.setState({
      selectedValue: value,
    });
  }
  
  // Modal delete Item
  showConfirm(client, id, refetch) {
    confirm({
      title: 'Suppression',
      content: 'Cliquer sur "Ok" pour être sûr de surpprimer l\'item et toutes ces catégorie dépendants',
      onOk() {
        let delconfirm = prompt('Entrez "delete" pour exécuté la surppression','');
        if (delconfirm === 'delete')
           removeCategorieAsync(client, id, refetch);
      },
      onCancel() { },
    });
  }

  render() {
    return (
      <Content style={{ margin: '0 16px' }} >
      
      {/* Header article */}
      <Row>
        <Col xs={24}>
          <h1 style={{ margin: '0 auto', textAlign: 'center', width: '100%'}}>
            <div style={{ display: 'inline', marginRight: '0', float: 'none'}} class="animated fadeInLeft">DOCUMENT</div>
            <div style={{ display: 'inline', float: 'none'}} class="animated fadeInRight">ATIONS</div>
          </h1>
        </Col>
      </Row>
      
      {/* Create Categories AND Drawer */}
       <ApolloConsumer>
            {client => (
              <Query
                query={GET_ALL_CATEGORIES}
                notifyOnNetworkStatusChange={true}
              >
                {({ data, loading, error, refetch }) => {

                  if (loading) {
                    return <Loading isCenter={true} />;
                  }

                  if (error) {
                    return <ErrorMessage error={error} />;
                  }

                  /*return (
                    <div>
                      <CatCreate client={client} refetch={refetch} categoriesData={data} />
                    </div>
                  );*/
                  
                  return (
                    <div
                      style={{
                        position: 'fixed',
                        right: '0',
                        top: '48px',
                        zIndex: '200'
                      }}
                    >
                      <DrawersCreateDoc
                        ref={this.drawerState} 
                        client={client}
                        categories={data.categorieses}
                      />
                    </div>
                  );

                }}
              </Query>
            )}
        </ApolloConsumer>
        
        {/* Tree */}
        <ApolloConsumer>
            {client => (
              
              <Query
                query={GET_CATEGORIES}
                notifyOnNetworkStatusChange={true}
              >
                {({ data, loading, error, refetch }) => {

                  if (loading) {
                    return <Loading isCenter={true} />;
                  }

                  if (error) {
                    return <ErrorMessage error={error} />;
                  }

                  return (
                    <div>
                      {/* Tree */}
                      <h2>
                        <div class="animated fadeInLeft">Arbres</div>
                        <div class="animated fadeInRight">des catégories</div>
                      </h2>
                      
                      <Row>
                        <Col span={24} id="scrollcustom" style={{ overflowX: 'scroll', textAlign: 'center', background: 'white', padding: '8px', border: 'solid 1px lightblue', borderRadius: '5px' }} >
                          <div className="tree"  style={{ width: '1611px', margin: '0 auto'}} >
                            <ul>
                              {/* lvl 1 */}
                              {data.categorieses.map(item => (
                                <React.Fragment key={item.id}>
                                  <li key={item.id}>
                                    <a href="#!" onClick={(e) => this.handleClick(item.id, e)}>{item.title}</a>
                                    {/*<a href="#!" onClick={() => {this.showConfirm(client, item.id, refetch)}}><Icon type="delete" /></a>*/}
                                    
                                    {/* lvl 2 */}
                                    {item.categorieses.length > 0 ? 
                                    <ul>
                                      {item.categorieses.map(item2 => (
                                        <React.Fragment key={item2.id}>
                                          <li key={item2.id}>
                                            <a href="#!" onClick={(e) => this.handleClick(item2.id, e)}>{item2.title}</a>
                                            {/*<a href="#!" onClick={() => {this.showConfirm(client, item2.id, refetch)}}><Icon type="delete" /></a>*/}
                                            
                                            {/* lvl 3 */}
                                            {item2.categorieses.length > 0 ? 
                                            <ul>
                                              {item2.categorieses.map(item3 => (
                                                <React.Fragment key={item3.id}>
                                                  <li key={item3.id}>
                                                    <a href="#!" onClick={(e) => this.handleClick(item3.id, e)}>{item3.title}</a>
                                                    {/*<a href="#!" onClick={() => {this.showConfirm(client, item3.id, refetch)}}><Icon type="delete" /></a>*/}
                                                    
                                                    {/* lvl 4 */}
                                                    {item3.categorieses.length > 0 ? 
                                                    <ul>
                                                      {item3.categorieses.map(item4 => (
                                                        <React.Fragment key={item4.id}>
                                                          <li key={item4.id}>
                                                            <a href="#!" onClick={(e) => this.handleClick(item4.id, e)}>{item4.title}</a>
                                                            {/*<a href="#!" onClick={() => {this.showConfirm(client, item4.id, refetch)}}><Icon type="delete" /></a>*/}
                                                            
                                                            {/* lvl 5 */}
                                                            {item4.categorieses.length > 0 ? 
                                                            <ul>
                                                              {item4.categorieses.map(item5 => (
                                                                <React.Fragment key={item5.id}>
                                                                  <li key={item5.id}>
                                                                    <a href="#!" onClick={(e) => this.handleClick(item5.id, e)}>{item5.title}</a>
                                                                    {/*<a href="#!" onClick={() => {this.showConfirm(client, item5.id, refetch)}}><Icon type="delete" /></a>*/}
                                                                  </li>
                                                                </React.Fragment>
                                                              ))}
                                                            </ul>: ''}
                                                            
                                                          </li>
                                                        </React.Fragment>
                                                      ))}
                                                    </ul>: ''}
                                                    
                                                  </li>
                                                </React.Fragment>
                                              ))}
                                            </ul> : ''}
                                    
                                          </li>
                                        </React.Fragment>
                                      ))}
                                    </ul> : ''}
                                    
                                  </li>
                                </React.Fragment>
                              ))}
                            </ul>
                          </div>
                        </Col>
                      </Row>

                    
                    </div>
                  );

              }}
            </Query>
          )}
        </ApolloConsumer>
        
        {/* Todo list default card */}
        <Row>
          <Col span={24}>
            <h2>
              <div class="animated fadeInLeft">Liste des</div>
              <div class="animated fadeInRight">Documentations</div>
            </h2>
            <PostList idcategorie={this.state.selectedValue} />
            
          </Col>
        </Row>
      
      </Content>
    );
  }
}

export default Post;