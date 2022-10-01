import React, { useState } from 'react';
import Icon from './componenets/Icon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Card, CardBody, Container, Button, Col, Row } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const itemArray = new Array(9).fill('empty')

const App = () => {

  const [isCross, setIsCross] = useState(false)
  const [winMsg, setWinMsg] = useState("")

  const reloadGame = () => {
    setIsCross(false);
    setWinMsg("");
    itemArray.fill("empty")
  }

  const checkIsWinner = (itemArray) => {
    if (itemArray[0] === itemArray[1] && itemArray[0] === itemArray[2] && itemArray[0] !== "empty")
      setWinMsg(`${itemArray[0]} won`)
    if (itemArray[3] === itemArray[4] && itemArray[3] === itemArray[5] && itemArray[3] !== "empty")
      setWinMsg(`${itemArray[3]} won`)
    if (itemArray[6] === itemArray[7] && itemArray[6] === itemArray[8] && itemArray[6] !== "empty")
      setWinMsg(`${itemArray[6]} won`)
    if (itemArray[0] === itemArray[3] && itemArray[0] === itemArray[6] && itemArray[0] !== "empty")
      setWinMsg(`${itemArray[0]} won`)
    if (itemArray[1] === itemArray[4] && itemArray[1] === itemArray[7] && itemArray[1] !== "empty")
      setWinMsg(`${itemArray[1]} won`)
    if (itemArray[2] === itemArray[5] && itemArray[2] === itemArray[8] && itemArray[2] !== "empty")
      setWinMsg(`${itemArray[2]} won`)
    if (itemArray[0] === itemArray[4] && itemArray[0] === itemArray[8] && itemArray[0] !== "empty")
      setWinMsg(`${itemArray[0]} won`)
    if (itemArray[2] === itemArray[4] && itemArray[2] === itemArray[6] && itemArray[2] !== "empty")
      setWinMsg(`${itemArray[2]} won`)
    if (!itemArray.includes("empty")) {
      setWinMsg(`Tie Game !`)
    }
  }

  const checkIsWinnerCopy = (itemArray) => {
    if (itemArray[0] === itemArray[1] && itemArray[0] === itemArray[2] && itemArray[0] !== "empty")
      return true;
    if (itemArray[3] === itemArray[4] && itemArray[3] === itemArray[5] && itemArray[3] !== "empty")
      return true;
    if (itemArray[6] === itemArray[7] && itemArray[6] === itemArray[8] && itemArray[6] !== "empty")
      return true;
    if (itemArray[0] === itemArray[3] && itemArray[0] === itemArray[6] && itemArray[0] !== "empty")
      return true;
    if (itemArray[1] === itemArray[4] && itemArray[1] === itemArray[7] && itemArray[1] !== "empty")
      return true;
    if (itemArray[2] === itemArray[5] && itemArray[2] === itemArray[8] && itemArray[2] !== "empty")
      return true;
    if (itemArray[0] === itemArray[4] && itemArray[0] === itemArray[8] && itemArray[0] !== "empty")
      return true;
    if (itemArray[2] === itemArray[4] && itemArray[2] === itemArray[6] && itemArray[2] !== "empty")
      return true;
    else
      return false;
  }

  const change = itemNumber => {

    changeUser(itemNumber);

    let move = compMove();
    console.log(move);

    changeComp(move);
    // setTimeout( function() { changeComp(move); }, 10000);
    console.log(itemArray);
  }

  const changeUser = itemNumber => {
    if (winMsg) {
      return toast(winMsg, { type: 'success' });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = "circle"
      setIsCross(!isCross)
    } else {
      return toast("already filled", { type: "error" })
    }
    checkIsWinner(itemArray)

  }
  

  const changeComp = move => {
    if (winMsg) {
      return toast(winMsg, { type: 'success' });
    }

    if (itemArray[move] === "empty") {
      itemArray[move] =  "cross" 
      setIsCross(!isCross)
    } else {
      return toast("already filled", { type: "error" })
    }
    checkIsWinner(itemArray)
  }

  const compMove = () => {
    let possibleMoves = [];
    let move;
    
    for (let i = 0; i < itemArray.length; i++){
      if (itemArray[i] === "empty") {
        possibleMoves.push(i);
      }
    }
    const XO = ["cross", "circle"];
    for (const xo of XO) {
      for (const i of possibleMoves) {
        let copy = [...itemArray];
        copy[i] = xo;
        if (checkIsWinnerCopy(copy)) {
          move = i;
          return move;
        }
      }
    }

    let cornersOpen = [];
    let corners = [1, 3, 7, 9];
    for (const i of possibleMoves) {
      if (corners.includes(i)) {
        cornersOpen.push(i)
      }
    }

    if (cornersOpen.length > 0) {
      move = cornersOpen[Math.floor(Math.random() * cornersOpen.length)];
      return move;
    }

    if (possibleMoves.includes(5)) {
      move = 5;
      return move;
    }

    let edgesOpen = [];
    let edges = [2,4,6,8];
    for (const i of possibleMoves) {
      if (edges.includes(i)) {
        edgesOpen.push(i);
      }
    }

    if (edgesOpen.length > 0) {
      move = edgesOpen[Math.floor(Math.random() * edgesOpen.length)];
      return move;
    }

  }


  return (
    <Container className='p-5'>
      <ToastContainer position='bottom-center' />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMsg ? (
            <div className="mb-2 mt-2">
              <h1 className="text-primary text-uppercase text-center">
                {winMsg}
              </h1>
              <Button
                color="success"
                block
                onClick={reloadGame}
              >
                Reload Game
              </Button>
            </div>
          ) : (
            <h1 className='text-center text-warning '>
                {/* {isCross ? "Cross": "Circle"} turn */}
                O : Player......X : Computer
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card color="warning" onClick={() => { change(index) }}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
