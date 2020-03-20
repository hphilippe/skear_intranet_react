import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Comment, Avatar } from 'antd';
import Loading from '../../../components/Loading';

const About = ({ data: { loading, error, userses } }) => {
  if (error) return <h1>Error fetching userses!</h1>

  if (loading) return <Loading isCenter={true} />

  if (!loading) {
    return (
      <div style={{ padding: '0 50px', marginTop: 50 }}>
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
      </div>

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