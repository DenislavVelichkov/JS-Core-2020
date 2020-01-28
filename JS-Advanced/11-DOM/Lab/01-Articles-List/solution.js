function createArticle() {
	let articleSection = document.getElementById("articles");
	let inputText = document.getElementById("createContent");
	let inputTitle = document.getElementById("createTitle");

	if (!inputText.value || !inputTitle.value) { return alert("Please fill all fields!") }
	
	let newArticle = document.createElement("div");
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