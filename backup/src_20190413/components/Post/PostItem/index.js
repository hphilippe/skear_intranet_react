import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
// Style CSS
import '../style.css';
// Ant design
import { Layout, Row, Col, Icon, Avatar, Modal } from 'antd';
// Mutations
import { GET_POST, DELETE_POST } from '../mutations';
// moment
import Moment from 'react-moment';
import 'moment/locale/fr';
// convert content to html
import Parser from 'html-react-parser';
// Module
import DrawersEditDoc from '../PostEdit';

// Constante
const { Content } = Layout;
const confirm = Modal.confirm;

// await graphql delete then refetch function from query in todolist
async function removePostAsync(client, idItem, refetch) {
  const { data, error } = await client.mutate({
    mutation: DELETE_POST,
    variables: { id: idItem }
  })
  if (data) window.location.pathname = '/post/'
  if (error) alert(error);
}

class PostCreate extends React.Component {

  state = {
    visible: false,
    visibleBanner : true
  };
  
  // Modal delete Item
  showConfirm(client, id, refetch) {
    confirm({
      title: 'Suppression',
      content: 'Cliquer sur "Ok" pour être sûr de surpprimer l\'item',
      onOk() {
        let delconfirm = prompt('Entrez "delete" pour exécuté la surppression','');
        if (delconfirm === 'delete')
           removePostAsync(client, id, refetch);
      },
      onCancel() { },
    });
  }
  
  handleBanner = () => {
    if(this.state.visibleBanner === true){
      this.setState({ visibleBanner: false });
      document.getElementById("dashboard_banner").style.height = "85px";
      // dashboard_banner_right_side
      document.getElementById("dashboard_banner_right_side").style.visibility = "hidden";
      document.getElementById("dashboard_banner_right_side").style.opacity = "0";
      // dashboard_banner_bottom_left
      document.getElementById("dashboard_banner_bottom_left").style.visibility = "hidden";
      document.getElementById("dashboard_banner_bottom_left").style.opacity = "0";
      // Arrow
      document.getElementById("dashboard_banner_bottom_center_up").style.display = "none";
      document.getElementById("dashboard_banner_bottom_center_down").style.display = "block";
    } else {
      this.setState({ visibleBanner: true });
      document.getElementById("dashboard_banner").style.height = "200px";
      // dashboard_banner_right_side
      document.getElementById("dashboard_banner_right_side").style.visibility = "visible";
      document.getElementById("dashboard_banner_right_side").style.opacity = "1";
      // dashboard_banner_bottom_left
      document.getElementById("dashboard_banner_bottom_left").style.visibility = "visible";
      document.getElementById("dashboard_banner_bottom_left").style.opacity = "1";
      // Arrow
      document.getElementById("dashboard_banner_bottom_center_up").style.display = "block";
      document.getElementById("dashboard_banner_bottom_center_down").style.display = "none";
    }
    
  }

  render() {
    const { match } = this.props

    return (
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_POST}
            variables={{ id: match.params.slug }}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, loading, error, refetch }) => {

              if (loading) {
                return <Loading isCenter={true} />;
              }

              if (error) {
                return <ErrorMessage error={error} />;
              }
              
              const style_post_banner = {
                height: '200px',
                backgroundImage: 'url("' + data.posts[0].url + '")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                margin: '0px -16px'
              };

              // RETURN THE CONTENT OF DASHBOARD
              return (
                <Content style={{ margin: '0 16px' }}>
                  <Row>
                    <Col lg={24} md={24} xs={24} className="post_item">
                      
                      <div className="dashboard_banner" id="dashboard_banner" style={style_post_banner} >
                        <div className="dashboard_banner_layer">
                          <div className="dashboard_banner_right_side" id="dashboard_banner_right_side">
                            <h3 className="dashboard_banner_right_side_title">Opérations</h3>
                            <ul>
                              <DrawersEditDoc
                                client={client}
                                values={data.posts[0]}
                              />
                              <a href="#!" onClick={() => {
                                this.showConfirm(client, data.posts[0].id, refetch);
                              }}>
                                <li><Icon type="delete" /> Supprimer</li>
                              </a>
                            </ul>
                          </div>
                          <div className="dashboard_banner_top_left">
                            <h1>{data.posts[0].title}</h1>
                            <p> {data.posts[0].createdAt ? <Moment date={data.posts[0].createdAt} format="DD MMMM YYYY" /> : ''}</p>
                          </div>
                          <div className="dashboard_banner_bottom_left" id="dashboard_banner_bottom_left">
                          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{data.posts[0].users.username ? data.posts[0].users.username : ''}</Avatar>
                          </div>
                          <div className="dashboard_banner_bottom_center">
                            <a href="#!" onClick={this.handleBanner} ><Icon id="dashboard_banner_bottom_center_up" type="up" /></a>
                            <a href="#!" onClick={this.handleBanner} ><Icon id="dashboard_banner_bottom_center_down" style={{ display: 'none' }} type="down" /></a>
                          </div>
                        </div>
                      </div> 

                      <div className="Post_item_content">
                        {Parser(data.posts[0].content)}
                      </div>
                      
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

export default PostCreate;