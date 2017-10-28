import React from 'react';
import {PageHeader} from 'react-bootstrap';
import FlexExample from './FlexExample'
import Main from './Main'
import './App.css';

class App extends React.Component {
  render() {
    return (
      
      <div>
        <PageHeader className="text-center">The Article Shop</PageHeader>

        <Main/>
        <br/>

      </div>
    );
  }
}

export default App;
