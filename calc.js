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
const mathDisplay = document.getElementById("display");
const btnArray = Array.from(document.getElementsByClassName("numeric"));
const operateArray = Array.from(document.getElementsByClassName("operate"));
const btnClear = document.getElementById("btn-clear");


btnClear.addEventListener("click", _ => {
   clearAll();
   console.log("cleared")
})

btnArray.forEach(element => {
   element.addEventListener("click", _ => {
      inputHandle(element.innerHTML);
   })
})

operateArray.forEach(element => {
   element.addEventListener("click", _ => {
      inputHandle(element.id);
   })
})

function clearAll() {
   didOperate = false;
   mathDisplay.innerHTML = "";
   mathStack = {
      firstNum: "",
      secondNum: "",
      currentNum: ""
   }
}

function inputHandle(element) {

   // if CE is pressed
   if (element == "btn-clear") {
      clearAll();

   // if numeric are pressed
   } else if (/[0-9.]/.test(element)) {

      // if number inside mathDisplay already has a decimal
      if (element == "." && mathStack.currentNum.includes(".")) {
         return;
      }

      // overflow
      if (mathStack.currentNum.length >= 13) {
         return;
      } else {
         // push number to mathDisplay
         mathStack.currentNum += element;
         mathDisplay.innerHTML = mathStack.currentNum;
      }

   // if operation buttons other than equals is pressed
   } else if (element !== "btn-equals" && element === "btn-add" || element === "btn-subtract" || element === "btn-mult" || element === "btn-divide") {

      // regular
      if (mathStack.firstNum === "" || didOperate) {
         mathStack.firstNum = mathStack.currentNum;
         mathStack.currentNum = "";
         didOperate = false;

      // chained operations
      } else {
         mathStack.secondNum = mathStack.currentNum;
         if (mathStack.secondNum) {
            mathStack.currentNum = (operate(mathStack.firstNum, mathStack.secondNum)).substring(0, 13);
            mathStack.firstNum = mathStack.currentNum;
         }
         mathDisplay.innerHTML = mathStack.currentNum;
         mathStack.currentNum = "";
      }
      mathStack.operator = element;

   } else if (element === "btn-equals") {
      // push currentNum to secondNum
      mathStack.secondNum = mathStack.currentNum || mathStack.secondNum;
      // process operation
      mathStack.currentNum = (operate(mathStack.firstNum, mathStack.secondNum)).substring(0, 13);
      // display result
      mathDisplay.innerHTML = mathStack.currentNum;
      // push result to firstNum
      mathStack.firstNum = mathStack.currentNum;

      mathStack.currentNum = "";
      didOperate = true;
   }
   console.log(mathStack);
}


function operate() {

   mathStack.firstNum = parseFloat(mathStack.firstNum);
   mathStack.secondNum = parseFloat(mathStack.secondNum);
   console.log(mathStack.firstNum, mathStack.secondNum);
   switch (mathStack.operator) {
      case "btn-add":
      return ((mathStack.firstNum + mathStack.secondNum)).toString();

      case "btn-subtract":
      return ((mathStack.firstNum - mathStack.secondNum)).toString();

      case "btn-mult":
      return ((mathStack.firstNum * mathStack.secondNum)).toString();

      case "btn-divide":
      if (mathStack.secondNum != 0) {
         return ((mathStack.firstNum / mathStack.secondNum).toFixed(12)).toString();
      } else {
         mathDisplay.innerHTML = "ERR";
         return;
      }
   }
   return mathStack.operator;
}
