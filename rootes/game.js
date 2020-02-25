function gameRootes(app) {
  let currentQuestion = 0;
  let friend = false;
  let isGameOver = false;
  let crowd = false;
let half = false;
  const questions = [
    {
      question: "Raz przypisana do stałej wartość nie może zostać już zmodyfikowana. To zdanie pauje do zmiennej zadeklarowanej za pomocą:",
      answers: ["const", "let", "var", "zadnej z nich"],
      correctAnswer: 0
    },
    {
      question: "Metoda odpowiedzialna za przetwarzanie udanego wywołania to: ",
      answers: ["fetch", "catch", "then", "zadna"],
      correctAnswer: 1
    },
    {
      question: "Funkcja, która nie jest dostępna globalnie w JavaScript to:",
      answers: ["String()", "isNaN()", "eval()", "closure"],
      correctAnswer: 3
    },
    {
      question: "Co wyświetli poniższy kod: var array = [2,3,4,5]; for (var i in array)console.log(i)",
      answers: ["0,1,2,3", "1,2,3", "5", "14"],
      correctAnswer: 0
    },
    {
      question: "Który znacznik nie jest znacznikiem semantycznym",
      answers: ["header", "footer", "div", "aside"],
      correctAnswer: 2
    }
  ];
  app.get("/question", (req, res) => {
    if (isGameOver === true) {
      res.json({
        text: "Błędna odpowiedź. Koniec gry. "
      });
    } else if (currentQuestion === questions.length) {
      res.json({
        text: "wygrałeś!!!!!!!!!!!!!"
      });
    }
    const text = questions[currentQuestion];

    const { question, answers } = text;
    res.json({
      question,
      answers
    });
  });
  app.post("/answers/:index", (req, res) => {
    const { index } = req.params;
    const correct = questions[currentQuestion].correctAnswer;

    if (Number(index) === correct) {
      currentQuestion++;
      res.json({
        currentQuestion
      });
    } else {
      isGameOver = true;
      currentQuestion;
      res.json({
        currentQuestion
      });
    }
  });
  app.get("/help/friend", (req, res) => {
    const text = questions[currentQuestion].correctAnswer;
    const textAnswer = questions[currentQuestion].answers

       const random = ~~(Math.random()*(textAnswer.length))
  
      if(friend === true) {
          res.json({
              text:'To kolo zostalo juz wykorzystane'
          })
      }
      friend =true;
        if(random === text) {
     res.json({
         text: `Wydaje mi się, że prawidłowa odpowiedź to ${textAnswer[text]}`
     })
     return;
        }else {

            res.json({
              text: `Nie znam prawidłowej odpowiedzi. Byc może to odpowiedź ${textAnswer[random]}`
          })
          return;
        }
    
  });
  app.get('/help/half', (req, res)=> {

if(half === true) {
    res.json({
        text: 'To koło zostało juz wykorzystane'
    })
    
}
half = true;

const text = questions[currentQuestion].answers
const wrongText = text.filter(t=> t !== text[questions[currentQuestion].correctAnswer])
const random = ~~(Math.random()* wrongText.length)
wrongText.splice(random, 1)

  return res.json ({
      arr: wrongText,
  
  })
  })
   app.get('/help/crowd', (req, res)=> {
    if(crowd === true) {
      res.json({
          text: 'To koło zostało juz wykorzystane'
      })
      
  }
  crowd = true;

  let chart = [10,20,30,40]
for(let i = chart.length - 1; i > 0; i--) {
  const random = ~~(Math.random() * 20 - 10);
chart[i] += random;
chart[i -1] -= random
const question = questions[currentQuestion];
  const {correctAnswer} = question;
// [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]]
}
// for(let i = 0; i <chart.length -1; i++) {
//   const random = ~~(Math.random() * 20 - 10);
// chart[i] -= random;
// chart[i -1] += random
// }
res.json({
chart
})

   })
}
module.exports = gameRootes;

