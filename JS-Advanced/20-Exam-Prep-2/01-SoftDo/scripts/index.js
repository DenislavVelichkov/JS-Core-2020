function mySolution() {
  const html = {
    askQuestionArea: document.querySelector("#inputSection textarea"),
    pendingQusetions: document.querySelector("#pendingQuestions"),
    openQuestions: document.querySelector("#openQuestions"),
    nickNameArea: document.querySelector("#inputSection input"),
  };
  
  const sendButton = document.querySelector("#inputSection button");

  sendButton.addEventListener("click", askQuestionHandler);

  function askQuestionHandler(ev) {
    ev.preventDefault();

    let question = html.askQuestionArea.value;
    let nickName = html.nickNameArea.value;

    let newPendingQuestion = createHTMLElement("div", "pendingQuestion", null, null, null);
    let img = createHTMLElement(
      "img",
      null,
      null,
      [{ key: "src", value: "./images/user.png" }, { key: "width", value: "32" }, { key: "height", value: "32" }],
      null);
    let span = createHTMLElement("span", null, "Anonymous", null, null);
    let p = createHTMLElement("p", null, question, null, null);
    let div = createHTMLElement("div", "actions", null, null, null);
    let buttonArchive = createHTMLElement("button", "archive", "Archive", null, { name: "click", func: archiveQuestion });
    let buttonOpen = createHTMLElement("button", "open", "Open", null, { name: "click", func: openQuestion });

    newPendingQuestion.appendChild(img);
    newPendingQuestion.appendChild(span);
    newPendingQuestion.appendChild(p);
    newPendingQuestion.appendChild(div);
    div.appendChild(buttonArchive);
    div.appendChild(buttonOpen);

    if (nickName) {
      newPendingQuestion.querySelector("span").textContent = nickName;
    }

    html.pendingQusetions.appendChild(newPendingQuestion);
    html.askQuestionArea.value = "";
  }

  function archiveQuestion(ev) {
    ev.target.parentNode.parentNode.remove();
  }

  function openQuestion(ev) {
    let newOpenQuestion = ev.target.parentNode.parentNode.cloneNode(true);
    newOpenQuestion.className = "openQuestion";

    let parent = newOpenQuestion.childNodes[3];
    while (parent.firstChild) {
      parent.removeChild(newOpenQuestion.childNodes[3].lastChild);
    }
   
    let replyBtn = createHTMLElement("button", "reply", "Reply", null, { name: "click", func: replyToQuestion });
    newOpenQuestion.childNodes[3].appendChild(replyBtn);

    let newReplySection = createHTMLElement("div", "replySection", null, [{ key: "style", value: "display: none;" }], null);
    let input = createHTMLElement("input", "replyInput", null, [{ key: "type", value: "text" }, { key: "placeholder", value: "Reply to this question here..."}], null);
    let sendBtn = createHTMLElement("button", "replyButton", "Send", null, { name: "click", func: writeReply });
    let ol = createHTMLElement("ol", "reply", null, [{ key: "type", value: "1"}], null);

    newReplySection.appendChild(input);
    newReplySection.appendChild(sendBtn);
    newReplySection.appendChild(ol);

    newOpenQuestion.appendChild(newReplySection);

    html.openQuestions.appendChild(newOpenQuestion);
    ev.target.parentNode.parentNode.remove()
  }

  function replyToQuestion(ev) {
  
    if (ev.target.textContent === "Reply") {
      ev.target.textContent = "Back"
      ev.target.parentNode.parentNode.childNodes[4].style.display = "block";
    } else {
      ev.target.textContent = "Reply"
      ev.target.parentNode.parentNode.childNodes[4].style.display = "none";
    }

  }

  function writeReply(ev) {
    let replyContent = ev.target.parentNode.childNodes[0];
    let reply = createHTMLElement("li", null, replyContent.value, null, null);
    ev.target.parentNode.childNodes[2].appendChild(reply);
    replyContent.value = "";
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
      Array.from(attributes).forEach(atr => newElemenet.setAttribute(atr.key, atr.value));
    }

    if (event) {
      newElemenet.addEventListener(event.name, event.func);
    }

    return newElemenet;
  }

}