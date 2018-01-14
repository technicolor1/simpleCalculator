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

   // if numeric digits are pressed
   } else if (/[0-9\.]/.test(element)) {

      // new operation
      // if (didOperate) {
      //    clearAll();
      //    didOperate = false;
      // }
      // if number inside mathDisplay already has a decimal
      if (element == "." && mathStack.currentNum.includes(".")) {
         return;
      }

      // push number to mathDisplay
      mathStack.currentNum += element;
      mathDisplay.innerHTML = mathStack.currentNum;

   // if operation buttons other than equals is pressed
   } else if (element !== "btn-equals" && element === "btn-add" || element === "btn-subtract" || element === "btn-mult" || element === "btn-divide") {

      // if currentNum is populated, push it to firstNum
      if (mathStack.currentNum !== "") {
         mathStack.firstNum = mathStack.currentNum;
         mathStack.currentNum = "";
      }
      mathStack.operator = element;

   } else if (element === "btn-equals") {
      // push currentNum to secondNum
      mathStack.secondNum = mathStack.currentNum || mathStack.secondNum;
      // process operation
      mathStack.currentNum = operate(mathStack.firstNum, mathStack.secondNum);
      // display result
      mathDisplay.innerHTML = mathStack.currentNum;
      // push result to firstNum
      mathStack.firstNum = mathStack.currentNum;
      mathStack.currentNum = "";
      didOperate = true;
   }
   console.log(mathStack);
}


function operate(firstNum, secondNum) {

   mathStack.firstNum = parseFloat(mathStack.firstNum);
   mathStack.secondNum = parseFloat(mathStack.secondNum);
   console.log(mathStack.firstNum, mathStack.secondNum);
   switch (mathStack.operator) {
      case "btn-add":
      return (mathStack.firstNum + mathStack.secondNum);

      case "btn-subtract":
      return (mathStack.firstNum - mathStack.secondNum);

      case "btn-mult":
      return (mathStack.firstNum * mathStack.secondNum);

      case "btn-divide":
      if (mathStack.secondNum != 0) {
         return (mathStack.firstNum / mathStack.secondNum);
      } else {
         alert("Cannot divide by zero");
         return;
      }
   }
   return mathStack.operator;
}
