import React from 'react';
import {Button, ButtonToolbar, PageHeader} from 'react-bootstrap';
import MainGrid from './MainGrid'
import './App.css';

class App extends React.Component {
  render() {
    return (
      
      <div>
        <PageHeader className="text-center">The Article Shop</PageHeader>
        <br/>

        <MainGrid/>
        <br/>
        <Button bsStyle="primary">Sell Article</Button>

      </div>
    );
  }
}

export default App;
