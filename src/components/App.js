import React from 'React';
import Welcome from './Welcome';

class App extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
    /*Timer, listener, Ajax*/

  }

  componentWillUnmount(){/*Timer, listener, Ajax*/

  }

  render () {
    return (
      <div className="App">
        <Welcome />
      </div>
    );
  }

}

export default App;
