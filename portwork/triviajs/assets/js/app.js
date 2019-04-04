var triviaQuestions = {
	q1: {
	question: "In what year was Gallaudet University founded?",
	answerList: ["1979", "1726", "1864", "2000"],
	answer: 2
},

	q2:{
	question: "Historically, ASL is related to...",
	answerList: ["French Sign Language", "German sign language", "Spanish sign language", "British Sign Language"],
	answer: 0
},
	q3:{
	question: "ASL is used most by Deaf people in which of the following countries?",
	answerList: ["Canada and US", "France", "USA", "Germany"],
	answer: 0
},
	q4: {
	question: "what percentage of deaf people have deaf parents?",
	answerList: ["20%", "50%", "10%", "26%"],
	answer: 2
},
	q5: {
	question: "ASL and deaf culture are transmitter to Deaf people from generation to generation primarily:",
	answerList: ["in the home.", "in residential deaf schools.", "in all mainstream schools.", "everywhere."],
	answer: 3
},
	q6: {
	question: "The role of facial expressions, head movements, and eye gaze in ASL primarily:",
	answerList: ["behavioral.", "grammatical", "no meaning whatsoever", "friendly emphasis of the meaning."],
	answer: 1
},
	q7: {
	question: "While watching another person sign, it is appropriate to focus on the signers ",
	answerList: ["hands.", "body behavior.", "their eyes.", "their face."],
	answer: 3
},
	q8: {
	question: "Among ASL signers, fingerspelling is mainly used in what ways?",
	answerList: ["names, brands and places.", "when the sign is unknown.", "to annoy the other person.", "when the person is slow to learn."],
	answer: 0
},
	q9: {
	question: "Which of the options below is not how ASL makes use of space in front of a signers body to:",
	answerList: ["convey distance", "contrast two people, places things or ideas", "express time concepts", "show off their dance moves."],
	answer: 3
},
	q10: {
	question: "to get the attention of a Deaf person who is looking the other way, you should ...",
	answerList: ["Wave in their face.", "Tap their shoulder.", "Yell really loudly. ", "Hand them a piece of paper."],
	answer: 1
},
	q11: {
	question: "If you path is blocked by two signers coversing with each other, you should:",
	answerList: ["Sign 'excuse-me' and wait for them to wave you through.", "wave hello and get into the conversation.", "just walk through", "Yell until they respond."],
	answer: 2
},
	q12: {
	question: "Which of the following are considered rude by Deaf people?",
	answerList: ["looking at a signed conversation without indicating you know sign language", "talking without signing in the presence of Deaf people", "mock their signs in a comical manner", "all of the above."],
	answer: 3
},
	q13: {
	question: "In general, the least effective communication strategy between Deaf and hearing people is:",
	answerList: ["sign language", "text messaging", "phone calls", "speech and lip-reading"],
	answer: 3
},
	q14: {
	question: "What is a hearing aid?",
	answerList: ["An amplifcation device for the ear", "Thing that old people wear", "Something to help someone listen", "An artist's protective ear device."],
	answer: 0
},
	q15: {
	question: "Where do deaf people most often experience discrimination?",
	answerList: ["Job interviews", "Education", "Medical", "all of the above."],
	answer: 3
}};

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {
	correct: "Correct!",
	incorrect: "Good try!",
	endTime: "Out of time!",
	finished: "Alright! Let's see how much you know about deaf culture."
}

document.getElementById("startBtn").addEventListener("click", function(){
    triviaQuestions.newGame();
})

$('#startOverBtn').on('click', function(){
    $(this).hide();
    console.log(this);
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}