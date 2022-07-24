function rpsGame(yourChoice) {
//    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
  
    botChoice = numberToChoice(randToRpsInt());
    console.log("computerChoice", botChoice);
  
    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won
    console.log(results);
  
    message = finalMessage(results);
    console.log(message);
  
    rpsFrontEnd(yourChoice.id, botChoice, message);
  }

  // function to randomly generate numbers for bot choice 
  function randToRpsInt() {
    return Math.floor(Math.random() * 3);
  }

  // function to macth the randomNumber generated to a choice(i.e rock,paper or Scissors)
  function numberToChoice(number) {
    return ["rock", "paper", "scissors"][number];
  }
  
  // function to decide who wins or lose
  function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
      rock: { paper: 0, rock: 0.5, scissors: 1 },
      paper: { rock: 1, paper: 0.5, scissors: 0 },
      scissors: { rock: 0, scissors: 0.5, paper: 1 },
    };
    // creating the database to decide the message in the server
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
  
    return [yourScore, computerScore];
  }
  
  // Decides which message will be displayed based off WIN,LOSE or DRAW conditions
  function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
      return { message: "You lost!", color: "red" };
    } else if (yourScore === 0.5) {
      return { message: "You tied", color: "yellow" };
    } else {
      return { message: "You won", color: "green" };
    }
  }
  
  // reloads the page when called(i.e restart the game)
  function restartGame() {
    document.location.reload()
  }

  // Function to display winner to the DOM  
  function rpsFrontEnd(humanimageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
      rock: document.getElementById("rock").src,
      paper: document.getElementById("paper").src,
      scissors: document.getElementById("scissors").src,
    };
  
   // removes all image elements on the DOM
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();
  
    // create New div elements to be rendered to the DOM.
    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div");
    var button = document.createElement("button")

    // Assigning values to the new DOM elemets created
    humanDiv.innerHTML =
      "<img src='" +
      imagesDatabase[humanimageChoice] +
      "'height=150 width=150 style='box-shadow: 0px 10px 50px rgb(111, 196, 116)'>";
    messageDiv.innerHTML =
      "<h1 style='color: " +
      finalMessage["color"] +
      "; font-size: 60px; padding: 30px; '>" +
      finalMessage["message"] +
      "</h1>";
    botDiv.innerHTML =
      "<img src='" +
      imagesDatabase[botImageChoice] +
      "'height=150 width=150 style='box-shadow: 0px 10px 50px rgb(243, 38, 24, 1)'>";
    button.innerHTML = "Restart Game"
    button.addEventListener("click", restartGame)

    // rendering the newly created elements to the DOM
    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
    document.getElementById("button-element").appendChild(button);
  }
