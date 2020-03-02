import React, { Component } from "react";
import calculatorData from "./calculatorData";
import "./calculator.css";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: "",
      numbers: [],
      display: [],
      operations: [],
      numInProgress: [],
      disabledOperations: true
    };
  }

  compute(equation) {
    if (equation.length === 1) {
      return equation;
    }

    let newEquation = [];
    if (
      newEquation.length &&
      (!newEquation.includes("×") || !newEquation.includes("÷"))
    ) {
      for (let i = 0; i <= equation.length; i++) {
        if (i === "+") {
          return equation[i - 1] + equation[i + 1];
        }
        if (i === "-") {
          return equation[i - 1] - equation[9 + 1];
        }
      }
    }
    let firstOperations = ["×", "÷"];

    for (let i = 0; i <= equation.length; i++) {
      if (firstOperations.includes(equation[i])) {
        if (equation[i] === "×") {
          newEquation.push(equation[i - 1] * equation[i + 1]);
        } else newEquation.push(equation[9 - 1] / equation[i + 1]);
      } else newEquation.push(equation[i]);
    }
  }

  //if equation contains multiplication or division need to do those first
  //otherwise do equation in order

  operationDisabled(name) {
    if (name.includes("operation") && this.state.disabledOperations) {
      return "disabled";
    }
  }
  handleDisabled() {
    if (this.state.disabledOperations) {
      this.setState({ disabledOperations: false });
    } else this.setState({ disabledOperations: true });
  }

  buttonify(button) {
    return (
      <button
        onClick={e => {
          e.preventDefault();
          this.handleDisabled();
          const operations = ["subtract", "multiply", "divide", "add"];
          if (typeof button.value === "number") {
            const numInProgress = this.state.numInProgress;
            const numberDisplay = this.state.display;
            numberDisplay.push(button.value);
            numInProgress.push(button.value);
            this.setState({
              numInProgress: numInProgress,
              display: numberDisplay
            });
          } else if (button.value === "erase") {
            this.setState({
              guess: "",
              numbers: [],
              display: [],
              operations: [],
              numInProgress: []
            });
          }
          if (operations.includes(e.target.value)) {
            console.log("got it");
            const finishedNumber = this.state.numInProgress.join("");
            const currentNumbers = this.state.numbers;
            const operations = this.state.operations;
            const newDisplay = this.state.display;
            newDisplay.push(button.display);
            currentNumbers.push(finishedNumber);
            operations.push(e.target.value);

            this.setState({
              operations: operations,
              numInProgress: [],
              numbers: currentNumbers,
              display: newDisplay
            });
          }
          if (e.target.value === "equals") {
            const finalNumber = this.state.numInProgress.join("");
            const allNumbers = this.state.numbers;
            const finalEquation = this.state.display;
            finalEquation.push(finalNumber);
            allNumbers.push(finalNumber);
            this.setState({ disabledOperations: true });
          }
          if (this.state.display[this.state.display.length]) {
            console.log(this.state.display[this.state.display.length]);
            return;
          }
        }}
        className={`${button.classes.map(className => className).join(" ")}`}
        id={button.id}
        value={button.value}
        disabled={this.operationDisabled(button.classes)}
      >
        {button.display}
      </button>
    );
  }
  render() {
    let fourthRow = [];
    let thirdRow = [];
    let secondRow = [];
    let firstRow = [];

    calculatorData.forEach(buttonData => {
      if (buttonData.classes.includes("row4")) {
        fourthRow.push(this.buttonify(buttonData));
      }
      if (buttonData.classes.includes("row3")) {
        thirdRow.push(this.buttonify(buttonData));
      }
      if (buttonData.classes.includes("row2")) {
        secondRow.push(this.buttonify(buttonData));
      }
      if (buttonData.classes.includes("row1")) {
        firstRow.push(this.buttonify(buttonData));
      }
    });
    console.log(firstRow);

    return (
      <>
        <h1>Helpulator</h1>
        <p>
          Helpulator is a calculator designed to help you with your mental math
          skills! Enter your equation, enter your guess, hit equals and if your
          guess was wrong we'll give you a hint for next time!
        </p>
        <div id="answerDisplay">{this.state.display}</div>
        <div id="calcContainer">
          <div>{fourthRow}</div>
          <div>{thirdRow}</div>
          <div>{secondRow}</div>
          <div>{firstRow}</div>
        </div>
      </>
    );
  }
}

export default Calculator;
