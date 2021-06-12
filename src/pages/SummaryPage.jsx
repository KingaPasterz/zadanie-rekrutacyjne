import React, { Component } from 'react';
import './styles.css';


class SummaryPage extends Component {
  constructor(props) {
    super(props);
  }

  createListItems = () => {
    let chosenSeats = JSON.parse(localStorage["chosenSeats"]);
    let seatsInfo = this.props.seatsInfo;
    let seatsSummary = [];
    let idCords = [];
    seatsInfo.forEach(element => {
      idCords.push(
        {
          id: element.id,
          x: element.cords.x,
          y: element.cords.y
        }
      );
    });

    chosenSeats.forEach(element => {
      idCords.forEach(item => {
        if (element === item.id) {
          seatsSummary.push("rząd " + item.x + ", miejsce " + item.y + " (" + item.id + ")");
        }
      });
    });

    return seatsSummary;
  }


  render() {
    let seatsList = this.createListItems().map((seat) =>
      <li>{seat}</li>);

    return (
      <div className="summaryPage">
        <h1>Twoja rezerwacja przebiegła pomyślnie!</h1>
        <br></br>
        <h2>Wybrałeś miejsca:</h2>
        <ul>
          <li>{seatsList}</li>
        </ul>
        <br></br>
        <h2>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h2>
      </div>
    );
  }
}


export default (SummaryPage);
