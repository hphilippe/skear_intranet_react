import React from "react";
import { Query, ApolloConsumer } from 'react-apollo';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
// Ant Design
import { Drawer, Button, Avatar, Input, Select, Icon, message } from 'antd';
// Moment date 
//import Moment from 'react-moment';
//import 'moment/locale/fr';
// Mutations
import { UPDATE_POST, GET_ALL_CATEGORIES } from '../mutations';
// editor quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// const select
const Option = Select.Option;

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
// Alert map
/*const content = (items, client, refetch, idgroup, selectedValue) => items.map((item,i) => 
  <div key={i} style={{ marginBottom: '8px' }} >
    <Alert 
      style={{ display: 'block', marginBottom: '8px' }} 
      description={item.content} message={ item.title + ' - ' + moment(item.dateStart).format('HH:mm') } type={item.type} 
    /> 
  </div>
);*/

// await graphql create function from query 
async function createDocumentationAsync(client, value) {
  const { data, error } = await client.mutate({
    mutation: UPDATE_POST,
    variables: {
      id : value.id,
      title: value.title,
      content: value.content,
      idcat: value.categorieid,
      iduser: value.usernameid,
      url: value.url
    }
  })
  if (data) {
    var titleUnderscore = data.updatePost.title.split(" ").join("_");
    window.location.pathname = '/post/' + data.updatePost.id + '/' + titleUnderscore
  }
  if (error) {
    message.warning('problème survenue à l\'enregistrement');
    alert(error);
  }
}
  
class DrawersEditDoc extends React.Component {
  
  componentWillMount() {
    this.setState({
      url: this.props.values.url,
      categorieid: this.props.values.categories.id,
      title: this.props.values.title,
      content: this.props.values.content,
      usernameid: this.props.values.users.username
    })
  }

  state = { 
    visible: false,
    username : '',
    usernameid : '',
    title : '',
    content: '',
    categorieid: '',
    url: ''
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  
  handleCreate = (client, datapost) => {
    let values = { 
      id: datapost.id,
      username : datapost.users.username,
      usernameid : datapost.users.id,
      title : this.state.title,
      content: this.state.content,
      categorieid: this.state.categorieid,
      url: this.state.url
    }
    
    message.info('Article en cours d\'enregistrement');
    createDocumentationAsync(client, values);
  }
  
  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  
  handleChangeUrl = (e) => {
    this.setState({ url: e.target.value });
  }

  handleChangeCat = (value) => {
    this.setState({ categorieid: value });
  }

  handleChangeContent = (value) => {
    this.setState({ content: value });
  }
  
  render() {
    const { values } = this.props
    
    // MAP ROW
    const CatList = (data) => data.categorieses.map(({ ...item }) => {
      return (
        <Option key={item.id} value={item.id}>{item.title}</Option>
      );
    });
          
    return (
      <div>
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
                  
                  /* Drawer */
                  return (
                    <div>
                      <a href="#!" onClick={this.showDrawer}><li><Icon type="edit" /> Éditer</li></a>
                      <Drawer
                        //title="Créer une documentation"
                        width='calc(100% - 200px)'
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                      >
                        {/* Content */}
                        <div className="dashboard_banner" id="dashboard_banner" style={{backgroundImage: "url("+this.state.url+")", height: '200px', backgroundSize: 'cover', backgroundPosition: 'center center'}} >
                          <div className="dashboard_banner_layer">
                            <div className="dashboard_banner_right_side_edit" id="dashboard_banner_right_side">
                              <Input 
                                placeholder="url image"
                                defaultValue={values.url}
                                onChange={this.handleChangeUrl}
                              />
                            </div>
                            <div className="dashboard_banner_top_left">
                              <h1>
                                <Input 
                                  placeholder="Titre" 
                                  onChange={this.handleChangeTitle}
                                  defaultValue={values.title}
                                />
                              </h1>
                              {/*<p> <Moment fromNow format="DD MMMM YYYY" /> </p>*/}
                            </div>
                            <div className="dashboard_banner_bottom_left" id="dashboard_banner_bottom_left">
                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>noname</Avatar>
                            </div>
                            <div className="dashboard_banner_bottom_center">
                              <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Catégorie"
                                optionFilterProp="children"
                                onChange={this.handleChangeCat}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                defaultValue={values.categories.id}
                              >
                                {CatList(data)}
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="Post_item_content">
                          <ReactQuill 
                            theme='snow'
                            modules={EditorQuill}
                            formats={FormatsQuill}
                            placeholder="Écrivez quelque chose"
                            onChange={this.handleChangeContent}
                            defaultValue={values.content}
                          />
                        </div>
                        
                        {/* Footer */}
                        <div>
                          <Button
                            onClick={() => this.handleCreate(client, values)}
                            style={{ float: 'left' }}
                          >
                            Sauvegarder
                          </Button>
                          
                          <Button
                            onClick={this.onClose}
                            style={{ float: 'right' }}
                          >
                            Fermer
                          </Button>
                        </div>
                        
                      </Drawer>
                    </div>
                  );
                  /* END Drawer */
      
                }}
              </Query>
            )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default DrawersEditDoc;