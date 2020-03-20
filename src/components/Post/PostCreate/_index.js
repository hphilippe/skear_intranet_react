import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
// Style CSS
import '../style.css';
// Ant design
import { Layout, Row, Col, Icon, Avatar, Modal, Input } from 'antd';
// Mutations
import { CREATE_POST, GET_POST } from '../mutations';
// moment
import Moment from 'react-moment';
import 'moment/locale/fr';
// convert content to html
// import Parser from 'html-react-parser';
// editor quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// constante Editor Quill
const FormatsQuill = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
const EditorQuill = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

// Constante
const { Content } = Layout;
const confirm = Modal.confirm;

class PostCreate extends React.Component {

  state = {
    visible: false,
    visibleBanner : true
  };
  
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

              // RETURN THE CONTENT OF DASHBOARD
              return (
                <Content>
                  <Row>
                    <Col lg={24} md={24} xs={24} className="post_item">
                      
                      {data.posts[0].cover ? (
                        <div className="dashboard_banner" id="dashboard_banner" style={{backgroundImage: 'url("https://media.graphcms.com/' +data.cover.handle+ '")', height: '200px', backgroundSize: 'cover', backgroundPosition: 'center center'}} >
                          <div className="dashboard_banner_layer">
                            <div className="dashboard_banner_right_side" id="dashboard_banner_right_side">
                              <h3 className="dashboard_banner_right_side_title">Opérations</h3>
                              <ul>
                                <a href="#!"><li><Icon type="edit" /> Éditer</li></a>
                                <a href="#!"><li><Icon type="edit" /> Éditer</li></a>
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
                       ) : (
                        <div className="dashboard_banner" id="dashboard_banner" style={{backgroundColor: 'lightblue', height: '200px', backgroundSize: 'cover', backgroundPosition: 'center center'}} >
                          <div className="dashboard_banner_layer">
                            <div className="dashboard_banner_top_left">
                              <h1><Input placeholder="Titre" /></h1>
                              <p> <Moment fromNow format="DD MMMM YYYY" /> </p>
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
                      )}
                      
                      <div className="Post_item_content">
                        <ReactQuill 
                          theme='snow'
                          modules={EditorQuill}
                          formats={FormatsQuill}
                          placeholder="Écrivez quelque chose"
                        />
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