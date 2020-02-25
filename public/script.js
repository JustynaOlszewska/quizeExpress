const buttonQuestion = document.querySelectorAll(".answer-btn");
const divQuestions = document.querySelector("#questions");
const spanGoodAnswers = document.querySelector("#good-answers");
const callToAFriend = document.querySelector("#callToAFriend");
const halfOnHalf = document.querySelector("#halfOnHalf");
const questionToTheCrowd = document.querySelector('#questionToTheCrowd');
const h2 = document.querySelector('h2')
buttonQuestion.forEach(button =>
  
  button.addEventListener("click", () => {
    
    const numberNameButton = button.getAttribute("data-answer");

    correctAnswersFromClient(numberNameButton);
  })
  
);

function fillquestionAndAnswers(data) {
  divQuestions.innerText = data.question || data.text;

  for (const button of buttonQuestion) {
    const numberNameButton = button.getAttribute("data-answer");
    if (data.answers) {
      button.innerText = data.answers[numberNameButton];
    } else if (data.text) {
      button.style.display = "none";
      callToAFriend.style.display = "none";
      halfOnHalf.style.display = "none";
      questionToTheCrowd.style.display = "none";
      h2.style.display = "none"
    }
  }
}

function btnText() {
  fetch("/question")
    .then(res => res.json())
    .then(data => fillquestionAndAnswers(data));
}
btnText();
function rightAnswer(data) {
  spanGoodAnswers.innerText = data.currentQuestion;
  btnText();
}
function correctAnswersFromClient(numberNameButton) {
  const options = { method: "post" };
  fetch(`/answers/${numberNameButton}`, options)
    .then(res => res.json())
    .then(data => rightAnswer(data));
}

const tip = document.querySelector('#tip');
callToAFriend.addEventListener("click", () => {
  callAFriend();
});
function friendAnswers(data) {
 tip.innerText = data.text
 tip.style.color = "red"
}
function callAFriend() {
  fetch("/help/friend")
    .then(res => res.json())
    .then(data => friendAnswers(data));
}

function handlehalf(data) {
tip.innerText = data.text || null
const arr = data.arr;

for (const button of buttonQuestion) {
    arr.forEach((a, index)=> {
        if(arr[index] === button.innerText ) {
            button.innerText=""
        }      
    })   
  }   

}
function half () {
    fetch('/help/half')
    .then(res=> res.json())
    .then(data=> handlehalf(data))
}
halfOnHalf.addEventListener("click", half)

function crowd(data){
  if(data.text) {
    tip.innerText = data.text
  }

 buttonQuestion.forEach((button, index)=> {
   button.innerText += ` ${data.chart[index]}%`
 })
  
}

function questionCrowd(){
  fetch('/help/crowd')
  .then(res=>res.json())
  .then(data=> crowd(data))
}
questionToTheCrowd.addEventListener("click", questionCrowd)