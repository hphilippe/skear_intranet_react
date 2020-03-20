import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Comment, Avatar, Layout, Row, Col } from 'antd';
import Loading from '../../../components/Loading';

// Constante
const { Content } = Layout;

const About = ({ data: { loading, error, userses } }) => {
  if (error) return <h1>Error fetching userses!</h1>

  if (loading) return <Loading isCenter={true} />

  if (!loading) {
    return (
      <Content style={{ margin: '0 16px' }} >
        <Row>
          <Col xs={24}>
            <h1 style={{ margin: '0 auto', textAlign: 'center', width: '100%'}}>
              <div style={{ display: 'inline', marginRight: '0', float: 'none'}} class="animated fadeInLeft">ÉQU</div>
              <div style={{ display: 'inline', float: 'none'}} class="animated fadeInRight">IPES</div>
            </h1>
          </Col>
        </Row>
                    
        <Row>
          <Col xs={24}>
            {userses.map(user => (

              <div key={user.id}>
                <Comment
                  actions={[<span>{user.email}</span>]}
                  author={<a href={'#!'} >{user.name} {user.firstname}</a>}
                  avatar={(
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  )}
                  content={user.description}
                  datetime={(
                    <span>{user.username}</span>
                  )}
                />
              </div>

            ))}
          </Col>
        </Row>
        
      </Content>
    )
  }

}

export const users = gql`
  query users {
    userses {
      id
      name
      firstname
      username
      email
      description
      avatar {
        handle
      }
    }
  }
`

export default graphql(users)(About)