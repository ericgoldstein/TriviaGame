var timeAllowed =20;
var correctAnswer = 0;
var wrongAnswer = 0;
var unansweredAnswer = 0;
var totalTime = 0;
var currentQuestion;
var currentAnswer;
var currentQuestionIndex = 0;
var displayConvertedTime;

var qOne = {
	question: '1. Which professional poker player is nicknamed "the Robin Hood of Poker" because he donates 100% of his winning to charity?',
	choice1: 'Phil Hellmuth',
	choice2: 'Barry Greenstein',
	choice3: 'Doyle Brunson',
	choice4: 'Daniel Negreanu',
	answer: 'Barry Greenstein'
};
var qTwo = {
	question: '2. Which player is known as "The Mouth" because he is allways complaining at the table even if he is winning?',
	choice1: 'Phil Hellmuth',
	choice2: 'Phil Ivey',
	choice3: 'Doyle Brunson',
	choice4: 'Mike Matusow',
	answer: 'Mike Matusow'
}
var qThree = {
	question: '3. Because of his "table tantrums" Phil Hellmuth has been given the nickname?',
	choice1: 'The Poker Brat',
	choice2: 'The Hell Man',
	choice3: 'Steamer Phil',
	choice4: 'Phil "McEnroe" Hellmuth',
	answer: 'The Poker Brat'
}
var qFour = {
	question: '4. Which player won the largest 1st place prize ever in a Poker Tournament?',
	choice1: 'Daniel Negreanu',
	choice2: 'Phil Ivey',
	choice3: 'Antonio Esfandiari',
	choice4: 'Doyle Brunson',
	answer: 'Antonio Esfandiari'
}
var qFive = {
	question: '5. What was the payout for the largest 1st place prize ever in a tournament?',
	choice1: '18 Million',
	choice2: '12 Million',
	choice3: '7 Million',
	choice4: '2 Million',
	answer: '18 Million'
}
var qSix = {
	question: '6. Which player is known as "Kid Poker" because he started playing and winning at such a younge age?',
	choice1: 'Phil Hellmuth',
	choice2: 'Daniel Negreanu',
	choice3: 'Doyle Brunson',
	choice4: 'Antonio Esfandiari',
	answer: 'Daniel Negreanu'
}
var qSeven = {
	question: '7. This 10 time WSOP bracelet winner had a cameo role in the movie "Rounders"?',
	choice1: 'Phil Hellmuth',
	choice2: 'Johnny Chan',
	choice3: 'Doyle Brunson',
	choice4: 'Daniel Negreanu',
	answer: 'Johnny Chan'
}

var listOfQuestions = [qOne, qTwo, qThree, qFour, qFive, qSix, qSeven];
	function showQuestion (x) {
		$("#timerRow").removeClass('fontChangeOne');
		currentQuestion = x;
		timeAllowed = 20;
		counter = setInterval(timer, 1000);
		$("#imagesRow").html(currentQuestion.starterImage);
		$("#questionRow").html(currentQuestion.question);
		$("#timeRow").html(timer());
		$("#choiceRow").append("<p class='choice'>" + currentQuestion.choice1 + "</p>");
		$("#choiceRow").append("<p class='choice'>" + currentQuestion.choice2 + "</p>");
		$("#choiceRow").append("<p class='choice'>" + currentQuestion.choice3 + "</p>");
		$("#choiceRow").append("<p class='choice'>" + currentQuestion.choice4 + "</p>");
			$(".choice").mouseover(function() {
				$(this).addClass("activeAnswer");
			}), function() {
				$(this).removeClass("activeAnswer");
			};
			$("#choiceRow p").on("click", function() {
					currentAnswer = $(this).html();
					checkAnswer(currentAnswer);
			});
		};
		function checkAnswer(choice) {
			if (choice === currentQuestion.answer) {
					totalTime = totalTime + (20 - timeAllowed);
					currentQuestionIndex++;
					correctAnswer++;
					$("#choiceRow").empty();
					$("#timeRow").empty();
					clearInterval(counter);
					$("#imagesRow").html(currentQuestion.image);
					$("#questionRow").html("<p class='textBigger'>You Called It!!</p> " + "<p>" + currentQuestion.answer + "Is Correct. </p><p> Time For The Next Question.</p>");
					areWeDoneYet ();
			}
			else {
				totalTime = totalTime + (20 - timeAllowed);
				currentQuestionIndex++;
				wrongAnswer++;
				$("#choiceRow").empty();
				$("#timeRow").empty();
				clearInterval(counter);
				$("#imagesRow").html(currentQuestion.image);
				$("#questionRow").html("<p class='textBigger'>You Busted!!</p> " + "<p>" + currentQuestion.answer + "Is Correct. </p><p> Time For The Next Question.</p>");
				areWeDoneYet ();
			};
		};
		function timer () {
			timeAllowed--;
			$("#timeRow").html("<p> Time Remaining: " + timeAllowed + "</p>");
				if (timeAllowed === 0) {
						clearInterval(counter);
						unansweredAnswer++;
						timeout ();
				}
				else if (timeAllowed <=5) {
					$("#timeRow").addClass(fontChangeOne);
				};
		};
		function timeOut() {
			totalTime = totalTime + (20 - timeAllowed);
			currentQuestionIndex++;
			$("#questionRow").html("<p class='textBigger'>What No Guess At All???</p><p> Oh Well on to the next one.</p>");
			$("#timeRow").empty();
			$("#choiceRow").empty();
			time = 20;
			areWeDoneYet();
		};
		function areWeDoneYet () {
			if (currentQuestionIndex === (listOfQuestions.length)) {
				setTimeout (function(){allDone()}), 3000;
			}
			else {
				setTimeout(function () {
					showQuestion(listOfQuestions[currentQuestionIndex])}, 3000);
				
			};
		};;
		function allDone () {
			displayConvertedTime = timeConverter(totalTime);
			$("#imagesRow").empty();
			$("#questionRow").html('<p class="enderText">Wrong ' + wrongAnswer + '</p><p class="enderText">Correct ' + correctAnswer + '</p><p class="enderText">Unanswered ' + unansweredAnswer +'</p>' + '<p>You Spent ' + displayConvertedTime + ' total on this quiz answering the questions</p>');
				var resetButton = $("#choiceRow").append("<div class='button'><button class='btn-success btn-xxl'>RESTART GAME</button></div>");
				$(resetButton).one("click", function () {
					$("#choiceRow").empty();
					correctAnswer = 0;
					wrongAnswer = 0;
					unansweredAnswer = 0;
					currentQuestionIndex = 0;
					showQuestion(listOfQuestions[currentQuestionIndex]);
				});
		};
		function timeConverter (t) {
			var minutes = Math.floor(t / 60);
			var seconds = t - (minutes * 60);

				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				if (minutes === 0) {
					minutes = "00";
				}
				else if (minutes < 10) {
					minutes = "0" + minutes;
				}
				return minutes + ":" + seconds;
		};

		$(document).ready(function() {
			var topTitle = $("<h1 class='introTitle'>Poker Triva Game</h1>");
			$("#firstRow").prepend(topTitle);
			$("#questionRow").append("<p>Press the Start Game Button to Begin. Triva questions will be displayed. Click the answer you believe to be correct.  You will be alerted if your answer was correct or incorrect and then the game will move you on to the next question. At the end the game will let you know how many questions you got right and wrong and how much time you spent overall answering questions on the quiz. Have Fun!</p>");
			var startButton = $("#firstRow").append("<div class='button'><button class='btn-primary btn-lg'>START GAME<?button></div>");
			$("#firstRow").append("<br><br><br><br><br><br><br><br>");
			$(startButton).one("click", function () {
				$("button").remove();
				$(".introTitle").empty();
				showQuestion(listOfQuestions[currentQuestionIndex]);
			});
		});
	