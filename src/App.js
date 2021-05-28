import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/table/Table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: "",
      fetch: false
    }
  }

  getFetch = () => {
    fetch('http://178.128.196.163:3000/api/records', { method: 'GET' })
      .then(response => response.json())
      .then(data => this.setState({ persons: data, fetch: !this.state.fetch }))
  }

  componentDidMount() {
    this.getFetch();
    this.timer = setInterval(() => this.getFetch(), 100);
  }
  componentWillUnmount() {
    this.timer = null;
  }

  addNewRow = (text) => {
    let data = { data: { name: text } }
    fetch('http://178.128.196.163:3000/api/records', {
      method: 'PUT',
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  deleteRow = i => {
    fetch(`http://178.128.196.163:3000/api/records/${i}`, { method: 'delete' })
      .then(response => response.json())
  };

  updateRowContent = (name, age, i) => {
    let data = {
      data: {
        name: name,
        age: age,
      }
    };

    fetch(`http://178.128.196.163:3000/api/records/${i}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    
  };

  setRow = (item) => {
    return (
      <div>
        <Table key={item._id} index={item._id} name={item.data.name} age={item.data.age} update={this.updateRowContent} remove={this.deleteRow} />
      </div>
    );
  };



  render() {
    if (!this.state.persons.length) return null;
    return (
      <div className="App">
        <div className="wrapp">
          <div >{this.state.persons.map(this.setRow)}</div>
          <button className="save-btn" onClick={this.addNewRow('Name')}>Add</button>
        </div>
      </div>
    );
  }
};







export default App;
