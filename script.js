const CHECKED_IMG = "images/checked.png";
const UNCHECKED_IMG = "images/unchecked.png";
const selected = {"one": null, "two": null, "three": null}
const checkboxes = document.querySelectorAll('.choice-grid img');
activateCheckboxes();

function activateCheckboxes(){
	for (let checkbox of checkboxes){
    	checkbox.addEventListener('click', check);
  	}
}

function check(event) {
  	const clickedBox = event.currentTarget;
  	const item = clickedBox.parentElement;
  	unselectAll(item.dataset.questionId);
  	selectItem(item);
  	if (isComplete()){
    	processComplete();
  	}
}

function processComplete(){
	for (const checkbox of checkboxes){
    	checkbox.removeEventListener('click', check);
  	}
  	const result = getResult();
  	setResultBox(result);
}

function isComplete() {
  	return (selected["one"] !== null) && (selected["two"] !== null) && (selected["three"]!== null);
}

function unselectAll(questionId){
  	allItems = document.querySelectorAll('div[data-question-id=' + questionId + ']');
  	for (let item of allItems){
    	unselectItem(item);
  	}
}

function unselectItem(item){
  	const checkbox = item.querySelector('.checkbox');
  	checkbox.src = UNCHECKED_IMG;
  	item.style.opacity = 0.6;
  	item.style.backgroundColor = "#f4f4f4";
}

function selectItem(item){
  	const checkbox = item.querySelector('.checkbox');
  	checkbox.src = CHECKED_IMG;
  	item.style.backgroundColor = "#cfe3ff";
  	item.style.opacity = 1;
  	selected[item.dataset.questionId] = item.dataset.choiceId;
}

function resetItem(item){
  	const checkbox = item.querySelector('.checkbox');
  	checkbox.src = UNCHECKED_IMG;
  	item.style.backgroundColor = "#f4f4f4";
  	item.style.opacity = 1;
}

function getResult(){
  	const tallyMap = {};
  	for (let question in selected){
    	if (tallyMap[selected[question]]){
      		tallyMap[selected[question]] ++;
    	}
    	else {
      	tallyMap[selected[question]] = 1;
    	}
  	}
  	if (Object.keys(tallyMap).length === 3){
    	return selected["one"];
  	}
  	else {
    	let mode = "blep";
    	for (const item in tallyMap){
      		if (!tallyMap[mode] || tallyMap[item] > tallyMap[mode]){
        		mode = item;
      		}
    	}
    	return mode;
  	}
}

function setResultBox(result){
  	const resultBox = document.createElement("div");
  	const container = document.querySelector("article");
  	container.appendChild(resultBox);
  	resultBox.style.margin = "20px 0px";
  	resultBox.style.padding = "20px";
  	const resultTitle = document.createElement("h2");
  	resultTitle.textContent = "You got: " + RESULTS_MAP[result].title;
  	resultBox.appendChild(resultTitle);
  	const resultText = document.createElement("div");
  	resultText.style.padding = "18px 0px";
  	resultText.textContent = RESULTS_MAP[result].contents;
  	resultBox.appendChild(resultText);

  	const restartButton = document.createElement("div");
  	restartButton.style.backgroundColor = "#cecece";
  	restartButton.style.height = "50px";
  	restartButton.style.display = "flex";
  	restartButton.style.alignItems= "center";
  	restartButton.style.justifyContent = "center";
  	restartButton.textContent = "Restart quiz";
  	restartButton.style.fontSize = "18px";
  	restartButton.addEventListener('mouseover', mouseover);
  	restartButton.addEventListener('mouseout', mouseout);
  	restartButton.addEventListener('click', restart);
  	resultBox.appendChild(restartButton);
}

function restart(event){
	for (const key in selected){
    	selected[key] = null;
  	}	
  	activateCheckboxes();
  	event.currentTarget.parentElement.remove();
  	for (const checkbox of checkboxes){
    	resetItem(checkbox.parentElement);
  	}
  	const firstQuestion = document.querySelector(".question-name");
  	firstQuestion.scrollIntoView();
}

function mouseover(event){
  	const button = event.currentTarget;
  	button.style.backgroundColor = "#e0e0e0";
}

function mouseout(event){
	  const button = event.currentTarget;
  	button.style.backgroundColor = "#cecece";
}