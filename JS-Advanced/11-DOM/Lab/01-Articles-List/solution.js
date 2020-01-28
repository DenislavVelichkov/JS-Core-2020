function createArticle() {
	let articleSection = document.getElementById("articles");
	let inputText = document.getElementById("createContent");
	let inputTitle = document.getElementById("createTitle");

	if (!inputText.value || !inputTitle.value) { return;}
	
	let newArticle = document.createElement("article");
	let newTitle = document.createElement("h3")
	newTitle.innerHTML = `${inputTitle.value}`;
	let newContent = document.createElement("p")
	newContent.innerHTML = `${inputText.value}`;

	newArticle.appendChild(newTitle);
	newArticle.appendChild(newContent);
	articleSection.appendChild(newArticle);

	inputText.value = '';
	inputTitle.value = '';
}