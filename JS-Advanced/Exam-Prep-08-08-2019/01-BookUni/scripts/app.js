function solve() {



    
    function createHTMLElement(tagName, className, textContent, attributes, event) {
        let newElemenet = document.createElement(tagName);

        if (className) {
            newElemenet.classList.add(className);
        }

        if (textContent) {
            newElemenet.textContent = textContent;
        }

        if (attributes) {
            attributes.array.forEach(element => element.setAttribute(element.key, element.value));
        }

        if (event) {
            element.addEventListener(event.name, event.func);
        }

        return newElemenet;
    }
}