import React from "react";
// Ant design
import { Tag } from 'antd';
// CSS
import '../style.css';

// CLASS APP
class App extends React.Component {

  render() {

    return (
      <div>
        <p>
        <Tag color="#ff0000">status : Down</Tag>
        </p>
        <p>
          Lien site web : skear.ddns <br/>
          Lien bureau : skear.ddns <br/>
          Bureau Client : <a href="https://owncloud.org/download/">Owncloud</a>
        </p>
      </div>
    );
  }
}

export default App;