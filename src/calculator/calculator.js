import React, { Component } from "react";
import calculatorData from "./calculatorData";
import './calculator.css'

class Calculator extends Component {

  buttonify(button){
    return(
      <button
      onClick={e=>{
        e.preventDefault()
        console.log(e.target.value)
      }}
          className={`${button.classes.map(className => className).join(' ')}`}
          id={button.id}
          value={button.value}
        >
          {button.display}
        </button>
    )
  }
  render() {
    let fourthRow =[]
    let thirdRow =[]
    let secondRow =[]
    let firstRow =[]


    calculatorData.forEach(buttonData=>{
      if(buttonData.classes.includes('row4')){
        fourthRow.push(this.buttonify(buttonData))
      }
      if(buttonData.classes.includes('row3')){
        thirdRow.push(this.buttonify(buttonData))
      }
      if(buttonData.classes.includes('row2')){
        secondRow.push(this.buttonify(buttonData))
      }
      if(buttonData.classes.includes('row1')){
        firstRow.push(this.buttonify(buttonData))
      }
    })
    console.log(firstRow)

   
    
    return( 
      <>
        <h1>Helpulator</h1>
        <p>Helpulator is a calculator designed to help you with your mental math skills! Enter your equation, enter your guess, hit equals and if your guess was wrong we'll give you a hint for next time!</p>
        <div id="calcContainer">
          <div>{fourthRow}</div>
          <div>{thirdRow}</div>
          <div>{secondRow}</div>
          <div>{firstRow}</div>
        </div>
    </>
)
  }
}

export default Calculator;
