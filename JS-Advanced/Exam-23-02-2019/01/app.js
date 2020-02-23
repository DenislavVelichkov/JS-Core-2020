function solve() {
    const html = {
        authorInput: document.querySelector("form").childNodes[1].childNodes[3],
        titleInput: document.querySelector("form").childNodes[3].childNodes[3],
        categoryInput: document.querySelector("form").childNodes[5].childNodes[3],
        contentInput: document.querySelector("form").childNodes[7].childNodes[3],
        sendBtn: document.querySelector("form").childNodes[9],
        articleArea: document.querySelector(".site-content").childNodes[1].childNodes[1],
        archiveSection: document.querySelector(".archive-section").childNodes[3],
    }

    html.sendBtn.addEventListener("click", createArticle)

    function createArticle(ev) {
        let author = html.authorInput.value;
        let title = html.titleInput.value;
        let category = html.categoryInput.value;
        let content = html.contentInput.value;
        let newArticle = createHTMLElement("article", null, null, null, null);
        let h1 = createHTMLElement("h1", null, title, null, null);
        let p = createHTMLElement("p", null, "Category: ", null, null)
        let strong = createHTMLElement("strong", null, category, null, null)
        let p1 = createHTMLElement("p", null, "Creator: ", null, null)
        let strong1 = createHTMLElement("strong", null, author, null, null)
        let p3 = createHTMLElement("p", null, content, null, null)
        let div = createHTMLElement("div", { key: "class", value: ["buttons"] }, null, null, null)
        let deleteBtn = createHTMLElement("button", { key: "class", value: ["btn", "delete"] }, "Delete", null, { name: "click", func: deleteArticle })
        let archiveBtn = createHTMLElement("button", { key: "class", value: ["btn", "archive"] }, "Archive", null, { name: "click", func: archiveArticle })

        p.appendChild(strong)
        p1.appendChild(strong1)
        div.appendChild(deleteBtn)
        div.appendChild(archiveBtn)
        newArticle.appendChild(h1)
        newArticle.appendChild(p)
        newArticle.appendChild(p1)
        newArticle.appendChild(p3)
        newArticle.appendChild(div)
        html.articleArea.appendChild(newArticle)

        ev.preventDefault();
    }

    function archiveArticle(ev) {
        let articleTitle = ev.target.parentNode.parentNode.childNodes[0].textContent;
        let archiveArticle = createHTMLElement("li", null, articleTitle, null, null)
        html.archiveSection.appendChild(archiveArticle)
        ev.target.parentNode.parentNode.remove()

        Array.from(html.archiveSection.childNodes).sort((a, b) => {
            let result = a.textContent.localeCompare(b.textContent);

            if (result === 1) {
                html.archiveSection.insertBefore(b, a);
            }

            if (result === -1) {
                html.archiveSection.insertBefore(a, b);
            }

            return result !== 0 ? result : 1;
        });

        ev.preventDefault();
    }

    function deleteArticle(ev) {
        ev.target.parentNode.parentNode.remove()
    }

    function createHTMLElement(tagName, identity, textContent, attributes, event) {
        let newElemenet = document.createElement(tagName);

        if (identity) {
            switch (identity.key) {
                case "class":
                    newElemenet.classList.add(...identity.value);
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
    }

}
