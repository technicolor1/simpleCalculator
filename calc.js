

let mathStack = {
   // first number to operate
   firstNum: "",
   // second number to operate
   secondNum: "",
   // math to operate on firstNum and secondNum
   operator: null,
   // number inside mathDisplay
   currentNum: "",
   // remember number
   memory: 0,
   // remember operation
   didOperate: false
}

const mathDisplay = document.getElementById("display");
const allBtns = [];


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

btnArray.forEach(button => {
   allBtns.push(button);
})
operateArray.forEach(button => {
   allBtns.push(button);
})

const reset = document.querySelector(".reset");
reset.addEventListener("click", _ => {
   window.location = window.location;
})

function clearAll() {
   mathDisplay.innerHTML = "";
   mathStack = {
      firstNum: "",
      secondNum: "",
      currentNum: "",
      memory: 0,
      didOperate: false
   }
}

function inputHandle(element) {
   // positive-negative
   if (element === "btn-posneg") {
      mathDisplay.innerHTML *= -1;
      mathStack.currentNum = mathDisplay.innerHTML;
      if (mathStack.didOperate === true) {
         mathStack.firstNum = mathDisplay.innerHTML;
      }

      if (mathStack.secondNum !== "") {
         mathStack.secondNum = mathDisplay.innerHTML;
      }
   }

   // backspace
   if (element === "btn-back") {
      mathDisplay.innerHTML = mathDisplay.innerHTML.slice(0, -1);
      mathStack.currentNum = mathDisplay.innerHTML;
      if (mathStack.didOperate === true) {
         mathStack.firstNum = mathStack.currentNum;
      }

      if (mathStack.secondNum !== "") {
         mathStack.secondNum = mathStack.currentNum;
      }
   }

   // clear
   if (element === "btn-clear") {
      clearAll();
   }

   // numeric
   if (/[0-9.]/.test(element)) {
      mathStack.memory = 0;

      // prevent several zeroes
      if (element === 0 || element === "0" && mathDisplay.innerHTML === "0") {
         return;
      }

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

   }

   // operation, not equals
   if (element !== "btn-equals" &&
   element === "btn-add" ||
   element === "btn-subtract" ||
   element === "btn-mult" ||
   element === "btn-divide") {

      if (mathDisplay.innerHTML.charAt(0) === "0") {
         mathDisplay.innerHTML = mathDisplay.innerHTML.substr(1);
      }

      // regular
      if (mathStack.firstNum === "" || mathStack.didOperate) {
         if (mathStack.memory !== 0) {
            if (mathStack.memory !== mathStack.firstNum) {
               mathStack.memory = mathStack.firstNum;
            }
            mathStack.firstNum = mathStack.memory;
            mathStack.currentNum = "";
            mathStack.didOperate = false;
         } else {
            mathStack.firstNum = mathStack.currentNum;
            mathStack.currentNum = "";
            mathStack.didOperate = false;
         }

      // chained operations
      } else {


         mathStack.secondNum = mathStack.currentNum;
         if (mathStack.secondNum) {
            numValidator();
            if (numValidator() === false) {
               mathStack.firstNum = 0;
            }

            mathStack.currentNum = (operate(mathStack.firstNum, mathStack.secondNum));
            if (largeResult(mathStack.currentNum) === true) {
               return;
            }

            mathStack.firstNum = mathStack.currentNum;
         }
         mathDisplay.innerHTML = mathStack.currentNum;
         mathStack.currentNum = "";
      }
      mathStack.operator = element;

   }

   // equals
   if (element === "btn-equals") {
      numValidator();
      if (numValidator() === false) {
         return;
      }

      // push currentNum to secondNum
      mathStack.secondNum = mathStack.currentNum || mathStack.secondNum;
      // process operation
      mathStack.currentNum = (operate(mathStack.firstNum, mathStack.secondNum));
      if (largeResult(mathStack.currentNum) === true) {
         return;
      }

      // display result
      mathDisplay.innerHTML = mathStack.currentNum;
      // push result to firstNum
      mathStack.firstNum = mathStack.currentNum;
      mathStack.memory = mathStack.firstNum;
      mathStack.currentNum = "";
      mathStack.didOperate = true;
   }

   console.table(mathStack);
}

// helper function-
// handles very long results
function largeResult(num) {
   if (String(num).length > 12) {
      alert("Overflow!!");
      clearAll();
      return true;
   }
}

// helper function-
// stops NaN results
function numValidator() {
   const a = mathStack.firstNum;
   const b = mathStack.secondNum;
   const c = mathStack.currentNum;

   if (a === "") {
      return false;
   } else if (a === "." || b === "." || c === ".") {
      return false;
   }
   return true;
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
         // no toString?
         return (parseFloat((mathStack.firstNum + mathStack.secondNum).toPrecision(11)));

      case "btn-subtract":
         return (parseFloat((mathStack.firstNum - mathStack.secondNum).toPrecision(11)));

      case "btn-mult":
         return (parseFloat((mathStack.firstNum * mathStack.secondNum).toPrecision(11)));

      case "btn-divide":
         if (mathStack.secondNum !== 0) {
         return (parseFloat((mathStack.firstNum / mathStack.secondNum).toPrecision(11)));
         } else {
            document.removeEventListener("keyup", keyPress);
            document.removeEventListener("keydown", keyPress);

            const calcContainer = document.querySelector("#container");
            calcContainer.classList.add("hinge");
            reset.classList.add("show");
            return 0;
         }
   }
   return mathStack.operator;
}

document.addEventListener("keyup", keyPress);
document.addEventListener("keydown", keyPress);

function keyPress(event) {

   if (event.repeat === true) {
      return;
   }

   // ignore keystrokes with meta keys
   if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
   }

   if (event.type === "keydown") {
      switch (event.key) {
         default: return;
         case "Backspace":
            inputHandle("btn-back");
            break;
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
   }

   allBtns.some(button => {
      if (button.attributes[1].value === event.key) {
         if (event.type === "keydown") {
            button.classList.add("pressed");
            return true;
         } else if (event.type === "keyup") {
            button.classList.remove("pressed");
            return true;
         }
      }
   })

   event.stopPropagation();
}
