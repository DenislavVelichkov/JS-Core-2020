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
    let newOpenQuestion = document.createElement("div");
    let newReplySection = document.createElement("div");
    let questionContent = ev.target.parentNode.parentNode.querySelector("p").textContent;
    let nickName = ev.target.parentNode.parentNode.querySelector("span").textContent;

    newOpenQuestion.setAttribute("class", "openQuestion");
    newOpenQuestion.innerHTML =
      `<img src="./images/user.png" width="32" height="32" />`
      + `<span>Anonymous</span>`
      + `<p></p>`
      + `<div class="actions">`
      + `<button class="reply">Reply</button>`
      + `</div>`.trim();

    if (nickName) {
      newOpenQuestion.querySelector("span").textContent = nickName;
    }

    newReplySection.setAttribute("class", "replySection");
    newReplySection.innerHTML =
      `<input class="replyInput" type="text" placeholder="Reply to this question here..." />`
      + `<button class="replyButton">Send</button>`
      + `<ol class="reply" type="1"></ol>`.trim();

    newOpenQuestion.querySelector(".reply").addEventListener("click", replyToQuestion);
    newOpenQuestion.querySelector("p").textContent = questionContent;

    newReplySection.setAttribute("style", "display: none;");
    newReplySection.querySelector(".replyButton").addEventListener("click", writeReply);

    newOpenQuestion.appendChild(newReplySection);
    html.openQuestions.appendChild(newOpenQuestion);

    ev.target.parentNode.parentNode.remove()
  }

  function replyToQuestion(ev) {

    if (ev.target.textContent === "Reply") {
      ev.target.textContent = "Back"
      ev.target.parentNode.parentNode.querySelector(".replySection").style.display = "block";
    } else {
      ev.target.textContent = "Reply"
      ev.target.parentNode.parentNode.querySelector(".replySection").style.display = "none";
    }

  }

  function writeReply(ev) {
    let replyContent = document.querySelector(".replySection input");
    let reply = document.createElement("li");
    reply.textContent = replyContent.value;
    ev.target.parentNode.querySelector(".reply").appendChild(reply);
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