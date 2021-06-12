import React, { Component } from 'react';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import ReservationPage from './pages/ReservationPage';
import SummaryPage from './pages/SummaryPage';
import axios from 'axios';

class App extends Component {
  //definicja state
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      seatsInfo: [],
    }
  }

  // metoda do api i zapisała response w state
  fetchSeatsData = (input) => {
    axios.get('http://localhost:3000/seats')
  .then(response => {
    this.setState({
      pageNumber: 1,
      seatsInfo: response.data,
    });
  })
  .catch(error => {
    console.log(error);
  });
  this.setState({
    input: input
  });
  }

  goToNextPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber+1,
    });
  }

  render() {
    let currentPage = <WelcomePage seatsData={this.fetchSeatsData } />;

    if (this.state.pageNumber === 1) {
      currentPage = <ReservationPage seatsInfo={this.state.seatsInfo} input={this.state.input} nextPage={this.goToNextPage}/>;
    } else if (this.state.pageNumber === 2) {
      currentPage = <SummaryPage seatsInfo={this.state.seatsInfo}/>;
    }

    return (
      <div className="App">
        {currentPage}
      </div>
    );
  }
}

export default App;
