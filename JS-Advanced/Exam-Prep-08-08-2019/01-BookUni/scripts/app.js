function solve() {
    const html = {
        bookInput: document.querySelector("form").childNodes[3],
        yearInput: document.querySelector("form").childNodes[7],
        priceInput: document.querySelector("form").childNodes[11],
        addNewBookBtn: document.querySelector("form").childNodes[13],
        newBookSection: document.querySelector("#outputs").childNodes[3].childNodes[3],
        oldBookSection: document.querySelector("#outputs").childNodes[1].childNodes[3],
        totalStoreProfit: document.querySelector("body").childNodes[5],
    };
  
    html.addNewBookBtn.addEventListener("click", addNewBook);
   
    function addNewBook(ev) {
        ev.preventDefault();

        let bookTitle = html.bookInput.value;
        let year = html.yearInput.value;
        let price = html.priceInput.value;

        if (bookTitle && year && price && year > 0) {
            let stringifyPrice = parseFloat(price).toFixed(2);

            let newBook = createHTMLElement("div", "book", null, null, null);
            let p = createHTMLElement("p", null, `${bookTitle} [${year}]`, null, null);
            let btnBuy = createHTMLElement("button", null, null, null, null);
            let btnMove = createHTMLElement("button", null, "Move to old section", null, null);

            btnBuy.addEventListener("click", buyBook);
            btnMove.addEventListener("click", moveBook);

            newBook.appendChild(p);

            if(year >= 2000) {
                newBook.appendChild(btnBuy);
                btnBuy.textContent = `Buy it only for ${stringifyPrice} BGN`;
                newBook.appendChild(btnMove);
                html.newBookSection.appendChild(newBook);
            } else {
                stringifyPrice = stringifyPrice * 0.85;
                stringifyPrice = stringifyPrice.toFixed(2);
                btnBuy.textContent = `Buy it only for ${stringifyPrice} BGN`;
                newBook.appendChild(btnBuy);
                html.oldBookSection.appendChild(newBook);
            }
            
        }

    }

    function buyBook(ev) {
        let profit = parseFloat(ev.target.parentNode.childNodes[1].textContent.match(/\d+/gm).join("."));
        let oldProfit = parseFloat(html.totalStoreProfit.textContent.match(/\d+/gm).join("."));
        profit += oldProfit;
        profit = profit.toFixed(2)
        
        html.totalStoreProfit.textContent = `Total Store Profit: ${profit} BGN`;
        ev.target.parentNode.remove();
    }

    function moveBook(ev) {
        let bookToMove = ev.target.parentNode.cloneNode(true);
        bookToMove.childNodes[1].addEventListener("click", buyBook);
        bookToMove.childNodes[2].remove()

        let newPrice = parseFloat(bookToMove.childNodes[1].textContent.match(/\d+/gm).join(".")) * 0.85; 
        newPrice = newPrice.toFixed(2);

        bookToMove.childNodes[1].textContent = `Buy it only for ${newPrice} BGN`;

        html.oldBookSection.appendChild(bookToMove);
        ev.target.parentNode.remove();
    }

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