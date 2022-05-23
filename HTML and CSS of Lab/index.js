function Quiz(questions){
    this.questions=questions;
    this.score=0;
    this.questionIndex=0;
}
function Question(text,options,answer){
    this.text=text;
    this.options=options;
    this.answer=answer;
}
let questions=[
	new Question("Which type of JavaScript language is", ["Object-Oriented", "Object-Based","Assembly-language", "High-level"], "Object-Based"),
	new Question("A set of unordered properties that, has a name and value is called", ["String", "Array", "Serialized Object", "Object"], "Object"),
	new Question("Which of the following type of a variable is volatile?", ["Mutable variable", "Dynamic variable","Volatile variable", "Immutable variable"], "Mutable variable"),
	new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
	new Question("Which one of the following is not a keyword: ", ["If", "With", "debugger", "use strict"], "use strict")
  ];
 
let quiz= new Quiz(questions);

Quiz.prototype.getQuestionByIndex=function(){
    return this.questions[this.questionIndex];
}
Quiz.prototype.checkUserAttempt=function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}
Question.prototype.isCorrectAnswer=function(choice){
    return choice===this.answer
} 
Quiz.prototype.isEnded=function(){
    return this.questionIndex===this.questions.length;
}
function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    }else{
        let elem=document.getElementById("question" );
        elem.innerHTML=quiz.getQuestionByIndex().text;
        let options=quiz.getQuestionByIndex().options;
        for(let i=0;i<options.length;i++){
            let eachOption=document.getElementById("choice"+i);
            eachOption.innerText=options[i]; 
            handleOptionBtn("btn"+i,options[i]);               
            }
            showProgress();
        }
 }
 function showScores(){
     let endResult="<h1>Result</h1>";
     endResult+="<h2 id='score'>Your scores:"+quiz.score+" . and percentage is:"+(quiz.score/questions.length*100)+"% </h2>";
    let elem=document.getElementById("quiz");
    elem.innerHTML=endResult;
    }
 function handleOptionBtn(id,currentOption){
     let btn=document.getElementById(id);
     btn.onclick=function(){
         quiz.checkUserAttempt(currentOption);
         loadQuestions();
     }
 }
 function showProgress(){
     let currentQuestionNumber=quiz.questionIndex+1;
     let  elem=document.getElementById("progress");
     elem.innerHTML="Question "+ currentQuestionNumber +" of "+ quiz.questions.length;
 }
loadQuestions();