function solve() {
    let textElement = document.getElementById("input");
    let text = textElement.innerText;
    let textToFormat = text.split(".");
    let output = document.getElementById("output");
    let sentenceCouner = 0;

    while (textToFormat.length !== 0) {
        let sentence = textToFormat.shift() + ".";

        if (sentenceCouner % 3 === 0) {
            let additionalParagraph = document.createElement("p");
            additionalParagraph.innerHTML = sentence;
            output.appendChild(additionalParagraph);
        } else {
            output.lastElementChild.innerHTML += `${sentence} `;
        }

        sentenceCouner++;
    }

}