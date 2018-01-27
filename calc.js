"use strict";

let mathStack = {
   // first number to operate
   firstNum: "",
   // second number to operate
   secondNum: "",
   // math to operate on firstNum and secondNum
   operator: null,
   // number inside mathDisplay
   currentNum: ""
}
let didOperate = false;
let memory = 0;
const mathDisplay = document.getElementById("display");


const btnClear = document.getElementById("btn-clear");
btnClear.addEventListener("click", clearAll());

const btnArray = Array.from(document.getElementsByClassName("numeric"));
btnArray.forEach(element => {
   element.addEventListener("click", _ => {
      inputHandle(element.innerHTML);
   })
})

const operateArray = Array.from(document.getElementsByClassName("operate"));
operateArray.forEach(element => {
   element.addEventListener("click", _ => {
      inputHandle(element.id);
   })
})

const reset = document.querySelector(".reset");
reset.addEventListener("click", _ => {
   window.location = window.location;
})

function clearAll() {
   memory = 0;
   didOperate = false;
   mathDisplay.innerHTML = "";
   mathStack = {
      firstNum: "",
      secondNum: "",
      currentNum: ""
   }
}

function inputHandle(element) {

   // ce is pressed
   if (element === "btn-clear") {
      clearAll();

      // numeric are pressed
   } else if (/[0-9.]/.test(element)) {
      memory = 0;

      // number inside mathDisplay already has a decimal
      if (element === "." && mathStack.currentNum.includes(".")) {
         return;
      }

      // overflow
      if (mathStack.currentNum.length >= 12) {
         return;
      } else {
         // push number to mathDisplay
         mathStack.currentNum += element;
         mathDisplay.innerHTML = mathStack.currentNum;
      }

      // operation buttons other than equals is pressed
   } else if (element !== "btn-equals" && element === "btn-add" || element === "btn-subtract" || element === "btn-mult" || element === "btn-divide") {

      // regular
      if (mathStack.firstNum === "" || didOperate) {
         if (memory !== 0) {
            mathStack.firstNum = memory;
            mathStack.currentNum = "";
            didOperate = false;
         } else {
            mathStack.firstNum = mathStack.currentNum;
            mathStack.currentNum = "";
            didOperate = false;
         }

      // chained operations
      } else {
         mathStack.secondNum = mathStack.currentNum;
         if (mathStack.secondNum) {
            mathStack.currentNum = (operate(mathStack.firstNum, mathStack.secondNum)).substring(0, 11);
            mathStack.firstNum = mathStack.currentNum;
         }
         mathDisplay.innerHTML = mathStack.currentNum;
         mathStack.currentNum = "";
      }
      mathStack.operator = element;

   } else if (element === "btn-equals") {
      if (mathStack.firstNum === "") {
         return;
      } else if (Number.isNaN(mathStack.firstNum) || Number.isNaN(mathStack.secondNum)) {
         return;
      }

      // push currentNum to secondNum
      mathStack.secondNum = mathStack.currentNum || mathStack.secondNum;
      // process operation
      mathStack.currentNum = (operate(mathStack.firstNum, mathStack.secondNum)).substring(0, 11);
      // display result
      mathDisplay.innerHTML = mathStack.currentNum;
      // push result to firstNum
      mathStack.firstNum = mathStack.currentNum;
      memory = mathStack.firstNum;

      mathStack.currentNum = "";
      didOperate = true;
   }
   console.log(mathStack);
}

function operate() {
   mathStack.firstNum = parseFloat(mathStack.firstNum);
   // secondNum empty
   if (mathStack.secondNum === "") {
      mathStack.secondNum = 0;
   }
   mathStack.secondNum = parseFloat(mathStack.secondNum);

   switch (mathStack.operator) {
      default:
         mathDisplay.innerHTML = "ERR";
      break;

      case "btn-add":
         return ((mathStack.firstNum + mathStack.secondNum)).toFixed(5).toString();

      case "btn-subtract":
         return ((mathStack.firstNum - mathStack.secondNum)).toFixed(5).toString();

      case "btn-mult":
         return ((mathStack.firstNum * mathStack.secondNum)).toFixed(5).toString();

      case "btn-divide":
         if (mathStack.secondNum !== 0) {
         return ((mathStack.firstNum / mathStack.secondNum).toFixed(5)).toString();
         } else {
            const calc = document.querySelector("#container");
            calc.classList.add("broken");
            reset.classList.add("show");
            return;
         }
   }
   return mathStack.operator;
}

window.addEventListener("keydown", event => {

   if (event.defaultPrevented) {
      // do nothing if the event was already processed
      return;
   }

   if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
   }

   switch (event.key) {
      default: return;
      case "Enter":
         inputHandle("btn-equals");
         break;
      case "1":
         inputHandle(1);
         break;
      case "2":
         inputHandle(2);
         break;
      case "3":
         inputHandle(3);
         break;
      case "4":
         inputHandle(4);
         break;
      case "5":
         inputHandle(5);
         break;
      case "6":
         inputHandle(6);
         break;
      case "7":
         inputHandle(7);
         break;
      case "8":
         inputHandle(8);
         break;
      case "9":
         inputHandle(9);
         break;
      case "0":
         inputHandle(0);
         break;
      case ".":
         inputHandle(".");
         break;
      case "c":
         inputHandle("btn-clear");
         break;
      case "+":
         inputHandle("btn-add");
         break;
      case "-":
         inputHandle("btn-subtract");
         break;
      case "*":
         inputHandle("btn-mult");
         break;
      case "/":
         inputHandle("btn-divide");
         break;
   }

   event.preventDefault();
}, true);
