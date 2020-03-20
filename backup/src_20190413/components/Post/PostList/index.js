import React from "react";
// Ant design
import { Col, Card } from 'antd';
import { Query, ApolloConsumer } from 'react-apollo';
// components loading error
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/Error';
// Mutations
import { GET_POSTS } from '../mutations';
// moment
import Moment from 'react-moment';
import 'moment/locale/fr';
// image
import noImage from '../../../assets/img/noimage.png';

// constante
const { Meta } = Card;

// Redirect group select, custom url
function GroupSelect(item) {
  localStorage.setItem("groupSelectId", item.id);
  var titleUnderscore = item.title.split(" ").join("_");
  window.location.pathname = '/post/' + item.id + '/' + titleUnderscore
}

class Postlist extends React.Component {

  render() {
    const { idcategorie } = this.props

    return (
    <ApolloConsumer>
        {client => (
          <Query
            query={GET_POSTS}
            variables={{ idcategorie: idcategorie }}
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
              
              // RETURN THE CONTENT OF DASHBOARD
              return (
                <div>
                  {ColList}
                </div>
              );
              
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }

}

export default Postlist;