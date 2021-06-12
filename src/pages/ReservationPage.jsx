import React, { Component } from 'react';
import { Button, Row, Col, Divider } from 'antd';
import "./styles.css";

const style = { height: '4vw', paddingTop: '17px' };

class ReservationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenSeats: [],
      buttonsForTable: [],
    }
  }


  onSubmitReservation = () => {
    localStorage.chosenSeats = JSON.stringify(this.state.chosenSeats);
    this.props.nextPage();
  }

  onClickSeatButton = (x, y) => {
    const id = "s" + x + y;
    let chosenSeats = this.state.chosenSeats || [];
    let buttonsFortable = this.state.buttonsForTable;
    if (chosenSeats.includes(id)) {
      // usuwamy
      const index = chosenSeats.indexOf(id);
      chosenSeats.splice(index, 1);
      buttonsFortable[x][y].value = "wolne"
      buttonsFortable[x][y].className = "";
    } else {
      buttonsFortable[x][y].value = "wybrane";
      buttonsFortable[x][y].className = "orangeBg";
      chosenSeats.push(id);
    }
    //zapisujemy
    this.setState({ chosenSeats: chosenSeats });
  }

  proposeSeats = (buttonsTable) => {
    let seatsNum = this.props.input.ilość;
    let nextTo = this.props.input.czy_obok;
    let seats = 0;
    let chosenSeats = this.state.chosenSeats;
    let cordsYmax = buttonsTable[0].length - 1;

    if (nextTo) {
      let proposalCondition = 0;
      buttonsTable.forEach(element => {
        element.forEach(item => {
          let cordsY = element.indexOf(item);
          let cordsX = buttonsTable.indexOf(element);
          let check = 0;
          if (proposalCondition === 0) {
            for (let seat = 0; seat < seatsNum; seat++) {
              if (cordsY < element.length) {
                console.log("check 0 " + cordsY);
                console.log("row" + cordsX);
                if (element[cordsY].className === "free") {
                  check += 1;
                  cordsY += 1;

                  console.log(cordsY);
                  console.log(check);
                  console.log("ok");

                  let cordsYend = cordsY + seatsNum;
                  let cordsYstart = cordsY - seatsNum;
                  if (check === seatsNum && cordsYend < cordsYmax && cordsYstart >= 0) {
                    let y;
                    for (y = cordsY - seatsNum; y < cordsY; y++) {
                      console.log("jestem w pętli");
                      // console.log(cordsY);
                      console.log(buttonsTable[cordsX][y].value);
                      buttonsTable[cordsX][y].value = "wybrane";
                      buttonsTable[cordsX][y].className = "orangeBg";
                      chosenSeats.push(buttonsTable[cordsX][y].id);
                    }
                    proposalCondition = 1;
                  }
                }
              }
            }
          }
        });
      });
    } else {
      buttonsTable.forEach(element => {
        element.forEach(item => {
          if (seats < seatsNum) {
            if (item.value === "wolne") {
              item.value = "wybrane";
              item.className = "orangeBg"
              seats += 1;
              chosenSeats.push(item.id);
            }
          }
        })
      });
    }
    this.setState({ buttonsForTable: buttonsTable });
    this.setState({ chosenSeats: chosenSeats });
  }

  prepareButtons = (data) => {
    let matrix = [];
    let maxRowLength = 0;
    let maxColLength = 0;

    data.forEach(cell => {
      if (cell.cords) {
        let className = "free";
        let value = "wolne";
        let id = cell.id;
        let disabled;

        if (cell.reserved) {
          className = "greyBg";
          value = "zajęte";
          disabled = cell.reserved;
        }

        if (this.state.chosenSeats.includes(cell.id)) {
          className = "orangeBg";
          value = "wybrane";
        }

        let X = cell.cords.x;
        let Y = cell.cords.y;
        if (X + 1 > maxColLength) maxColLength = X;
        if (Y + 1 > maxRowLength) maxRowLength = Y;

        if (!matrix[X]) matrix[X] = [];

        const onClick = () => this.onClickSeatButton(X, Y, cell);

        matrix[X][Y] = {
          value: value,
          disabled: disabled,
          className: className,
          id: id,
          onClick: onClick
        }
      }
    });

    // fill empty spaces
    for (let i = 0; i <= maxColLength; i++) {
      if (!matrix[i]) matrix[i] = [];
      for (let j = 0; j <= maxRowLength; j++) {
        if (!matrix[i][j]) {
          matrix[i][j] = {
            className: "pusty",
            value: ""
          }
        };
      }
    }
    return matrix;
  }

  componentDidMount() {
    let buttonsForTable = this.prepareButtons(this.props.seatsInfo);
    let proposal = this.proposeSeats(buttonsForTable);
  }


  render() {

    let tempTable = (
      <table id="seatsPlan">
        <tbody>
          {this.state.buttonsForTable.map(row => {
            return (
              <tr>
                {row.map(cell => (
                  <td>
                    {<Button
                      value={cell.value}
                      className={cell.className}
                      id={cell.id}
                      disabled={cell.disabled}
                      onClick={cell.onClick}>
                      {cell.value}
                    </Button>}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    return (
      <div>
        {tempTable}
        <Divider orientation="left"></Divider>
        <div style={{ paddingLeft: "140px" }}>
          <Row gutter={8}>
            <Col className="gutter-row" span={2}>
              <div></div>
            </Col>
            <Col className="gutter-row">
              <div className="free"></div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div style={style}>Miejsca dostępne</div>
            </Col>
            <Col className="gutter-row">
              <div className="reserved"></div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div style={style}>Miejsca zarezerwowane</div>
            </Col>
            <Col className="gutter-row">
              <div className="choosed"></div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div style={style}>Twój wybór</div>
            </Col>
            <Col className="gutter-row" span={4}>
              <Button id="reserve" type="dashed" onClick={this.onSubmitReservation} style={
                {
                  height: "3.5vw",
                  width: "8vw",
                  backgroundColor: "#B8DDFF"
                }
              }>Rezerwuj</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default (ReservationPage);
