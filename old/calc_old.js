var operator = null,
    firstNum = [],
    secondNum = [];
    result = [];
    didOperate = false;


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
      inputNumber(element.innerHTML);
   })
})

operateArray.forEach(element => {
   element.addEventListener("click", _ => {
      inputOperate(element.id);
   })
})

function clearAll() {
   mathDisplay.innerText = "";
   firstNum = [];
   secondNum = [];
   result = [];
   operator = null;
   !didOperate;
}

function inputOperate(element) {
   if (result != "") {
      console.log("result !=")
      firstNum = result;
   }

   // stack operations
   if (secondNum != "" && operator != null && element != "btn-equals" && didOperate)  {
      console.log("inputOperate function: " + firstNum + " " + operator + " " + secondNum);
      operate(firstNum, secondNum);
      secondNum = "";
   }

   switch (element) {
      case "btn-add":
         operator = "add";
         break;
      case "btn-subtract":
         operator = "subtract";
         break;

      case "btn-mult":
         operator = "multiply";
         break;

      case "btn-divide":
         operator = "divide";
         break;

      case "btn-equals":
         // starts a new operation, similar to clearAll()
         if (operator != null && firstNum != "" && secondNum != "" && !didOperate) {
            operate(firstNum, secondNum)
            firstNum = [];
            secondNum = [];
            operator = null;
         } else if (didOperate) {
            operate(firstNum, secondNum);
            !didOperate;
            firstNum = [];
            secondNum = [];
            operator = null;
         }
   }
}

function inputNumber(element) {
   // console.log("before running inputnumber(): " + firstNum);

   if (element.match(/[0-9]/)) {
      if (operator == null) {
         console.log("adding onto firstNum...");
         mathDisplay.innerText = firstNum += element;
      } else if (operator != null) {
         console.log(secondNum);

         mathDisplay.innerText = [];
         mathDisplay.innerText = secondNum += element;
         console.log(secondNum);

      }
   } else if (element == ".") {
      if (!/(\.)/.test(firstNum)) {
         mathDisplay.innerText = firstNum += element;
      } else if (!/(\.)/.test(secondNum)) {
         mathDisplay.innerText = secondNum += element;
      }
   }
}


function operate(firstNum, secondNum) {
   console.log("operate function: " + firstNum + " " + operator + " " + secondNum);

   firstNum = parseFloat(firstNum);
   secondNum = parseFloat(secondNum);
   switch (operator) {
      case "add":
      result = (firstNum + secondNum);
      console.log(result);
      break;

      case "subtract":
      result = (firstNum - secondNum);
      break;

      case "multiply":
      result = (firstNum * secondNum);
      break;

      case "divide":
      if (secondNum != 0) {
         result = (firstNum / secondNum);
      } else {
         alert("Cannot divide by zero");
         return;
      }
      break;
   }
   mathDisplay.innerText = result.toFixed(9);
   didOperate = true;
   firstNum = result;
   secondNum = "";
   operator = null;
}
