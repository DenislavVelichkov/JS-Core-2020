function solution() {
    const html = {
        addGiftInput: document.querySelector(".container").childNodes[1].childNodes[3].childNodes[1],
        addGiftBtn: document.querySelector(".container").childNodes[1].childNodes[3].childNodes[3],
        listOfGifts: document.querySelector(".container").childNodes[3].childNodes[3],
        discardedGifts: document.querySelector(".container").childNodes[7].childNodes[3],
        sentGifts: document.querySelector(".container").childNodes[5].childNodes[3]
    }

    html.addGiftBtn.addEventListener("click", addGift);

    function addGift(ev) {
        
        let giftName = html.addGiftInput;
        let newGift = createHTMLElement("li", { key: "class", value: "gift" }, giftName.value, null, null);
        let sendBtn = createHTMLElement("button", { key: "id", value: "sendButton" }, "Send", null, { name: "click", func: sendGift })
        let discardBtn = createHTMLElement("button", { key: "id", value: "discardButton" }, "Discard", null, { name: "click", func: discardGift })

        newGift.appendChild(sendBtn);
        newGift.appendChild(discardBtn);

        html.listOfGifts.appendChild(newGift);

        
        Array.from(html.listOfGifts.childNodes).sort((a, b) => {
            let result = a.textContent.localeCompare(b.textContent);

            if(result === 1) {
         
                html.listOfGifts.insertBefore(b, a);
                
            }

            if(result === -1){
                
                html.listOfGifts.insertBefore(a, b);  
                
            }

            return result; //!== 0 ? result : a.textContent.length - b.textContent.length;
        });

        html.addGiftInput.value = "";
    };

    function sendGift(ev) {
        let giftToSend = ev.target.parentNode.cloneNode(true);
        let giftName = giftToSend.textContent;
        giftName = giftName.replace(giftName.match(/SendDiscard/gm)[0], "");

        giftToSend.textContent = giftName;
        
        ev.target.parentNode.remove();
        html.sentGifts.appendChild(giftToSend);
    }

    function discardGift(ev) {
        let giftToDiscard = ev.target.parentNode.cloneNode(true);
        let giftName = giftToDiscard.textContent;
        giftName = giftName.replace(giftName.match(/SendDiscard/gm)[0], "");
        
        giftToDiscard.textContent = giftName;

        ev.target.parentNode.remove();
        html.discardedGifts.appendChild(giftToDiscard);
    }

    function createHTMLElement(tagName, identity, textContent, attributes, event) {

        let newElemenet = document.createElement(tagName);

        if (identity) {
            switch (identity.key) {
                case "class":
                    newElemenet.classList.add(identity.value);
                    break;
                case "id":
                    newElemenet.id = identity.value;
                    break;
            }
        }

        if (textContent) {
            newElemenet.textContent = textContent;
        }

        if (attributes) {
            Array.from(attributes).forEach(atr => newElemenet.setAttribute(atr.key, atr.value));
        }

        if (event) {
            newElemenet.addEventListener(event.name, event.func);
        }

        return newElemenet;
    };
}