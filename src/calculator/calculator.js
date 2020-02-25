import React, { Component } from "react";
import calculatorData from "./calculatorData";

class Calculator extends Component {
  render() {
    const buttons = calculatorData.map(button => {
      return (
        <button
          className={`${button.classes.map(className => className)}`}
          id={button.id}
          value={button.value}
        >
          {button.display}
        </button>
      );
    });
    return buttons;
  }
}

export default Calculator;
