function mySolution() {
  const html = {
    askQuestionArea: () => document.querySelector("#inputSection textarea"),
    pendingQusetions: () => document.querySelector("#pendingQuestions"),
    openQuestions: () => document.querySelector("#openQuestions"),
    nickNameArea: () => document.querySelector("#inputSection input"),
  };
  const sendButton = document.querySelector("#inputSection button");

  sendButton.addEventListener("click", askQuestionHandler);

  function askQuestionHandler(ev) {
    ev.preventDefault();

    let question = html.askQuestionArea().value;
    let nick = html.nickNameArea().value;

    let newPendingQuestion = document.createElement("div");
    newPendingQuestion.setAttribute("class", "pendingQuestion");
    newPendingQuestion.innerHTML = `<img src="./images/user.png" width="32" height="32" />`
      + `<span>Anonymous</span>`
      + `<p>` + `</p>`
      + `<div class="actions">`
      + `<button class="archive">Archive</button>`
      + `<button class="open">Open</button>`
      + `</div>`.trim();

    if (nick) {
      newPendingQuestion.querySelector("span").textContent = nick;
    }
    newPendingQuestion.querySelector("p").textContent = question;

    newPendingQuestion.querySelector(".archive").addEventListener("click", archiveQuestion);
    newPendingQuestion.querySelector(".open").addEventListener("click", openQuestion);

    html.pendingQusetions().appendChild(newPendingQuestion);

    html.askQuestionArea().value = "";
    html.nickNameArea().value = "";
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
    console.log(newOpenQuestion.innerHTML)
    console.log(newOpenQuestion.innerText)
    console.log(newOpenQuestion.textContent)

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
    html.openQuestions().appendChild(newOpenQuestion);

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

}