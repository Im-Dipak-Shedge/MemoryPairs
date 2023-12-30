let cardsarray = [
  {
    name: "html",
    img: "images/htmlpng.webp",
  },
  {
    name: "js",
    img: "images/jslogo.webp",
  },
  {
    name: "python",
    img: "images/python.webp",
  },
  {
    name: "reactjs",
    img: "images/reactjs.webp",
  },
  {
    name: "sql",
    img: "images/sqllogo.webp",
  },
  {
    name: "vscode",
    img: "images/vscode.webp",
  },
];

let matchedCount = 0;

//step 2
const gameCards = cardsarray.concat(cardsarray);

//step 3 shuffuling
const myNumbers = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const shuffuledChild = myNumbers(gameCards);

//step 1
var parentDiv = document.querySelector("#card-section");

for (let i = 0; i < shuffuledChild.length; i++) {
  const childDiv = document.createElement("div");
  childDiv.classList.add("card");
  childDiv.dataset.name = shuffuledChild[i].name;
  // childDiv.style.backgroundImage = `url(${shuffuledChild[i].img})`
  let front_div = document.createElement("div");
  front_div.classList.add("front-card");
  let back_div = document.createElement("div");
  back_div.classList.add("back-card");
  back_div.style.backgroundImage = `url(${shuffuledChild[i].img})`;

  parentDiv.appendChild(childDiv);
  childDiv.appendChild(front_div);
  childDiv.appendChild(back_div);
}

let clickCount = 0;
let first_card = "";
let second_card = "";

// step 6
const card_matches = () => {
  let card_selected = document.querySelectorAll(".card_selected");
  card_selected.forEach((curElem) => {
    curElem.classList.add("card_match");
    matchedCount++;
    if (matchedCount === 12) {
      displayCongratulationsMessage();
    }
  });
};

//step 9

const resetGame = () => {
  first_card = "";
  second_card = "";
  clickCount = 0;

  let card_selected = document.querySelectorAll(".card_selected");
  card_selected.forEach((curElem) => {
    curElem.classList.remove("card_selected");
  });
};

//body event listener
document.body.addEventListener("click", (event) => {
  const clickedElement = event.target;
  console.log("body clicked");
  // Check if the click is outside of the card-section
  if (clickedElement.contains(parentDiv)) {
    console.log("parentdiv was clicked");
  } else {
    console.log("parentdiv not clicked");
  }
});

//step 10 making moves
let val = 0;
function movecount() {
  var divtext = document.querySelector(".moves");
  val = divtext.innerHTML;
  ++val;
  divtext.textContent = val;
}

//step11

//step 4
parentDiv.addEventListener("click", (event) => {
  let curCard = event.target;
  clickCount++;
  // if(curCard.classList.contains)
  if (clickCount < 3) {
    if (clickCount === 1) {
      first_card = curCard.parentNode.dataset.name;
      curCard.parentNode.classList.add("card_selected");
      movecount();
    } else {
      second_card = curCard.parentNode.dataset.name;
      if (!curCard.parentNode.classList.contains("card_selected")) {
        curCard.parentNode.classList.add("card_selected");
        movecount();
      } else {
        curCard.parentNode.classList.remove("card_selected");
        movecount();
      }
    }

    if (first_card !== "" && second_card !== "") {
      if (first_card === second_card) {
        // step 7
        //step 8 delay
        setTimeout(() => {
          card_matches();
          resetGame();
        }, 1000);
      } else {
        setTimeout(() => {
          resetGame();
        }, 1000);
      }
    }
  }
});

const bd_div = document.getElementsByClassName("bd");
function displayCongratulationsMessage() {
  // seting moves into the leaderboard
  localStorage.setItem("highscore", val);

  // Create a message element.
  const messageElement = document.createElement("div");
  const cong_msg = document.createElement("h2");
  const but1 = document.createElement("button");
  const but2 = document.createElement("button");
  but1.innerText = "Restart";
  but2.innerText = "Back to Menu";
  cong_msg.innerHTML = "CONGRATULATIONS !";
  cong_msg.classList.add("congo");
  but1.classList.add("congo_buttons");
  but2.classList.add("congo_buttons");
  messageElement.classList.add("congratulations-message");
  document.body.appendChild(messageElement);
  messageElement.appendChild(cong_msg);
  messageElement.appendChild(but1);
  messageElement.appendChild(but2);
  parentDiv.classList.add("blur");
  const h1 = document.querySelector("h1");
  h1.classList.add("blur");
  but1.addEventListener("click", () => {
    // alert("dne");
    document.location.reload();
  });

  but2.addEventListener("click", () => {
    // console.log("Dipak Shedge");
    window.location.href = "index.html";
  });
}
