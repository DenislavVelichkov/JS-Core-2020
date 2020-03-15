function solve() {
    const url = "https://messages-8cc67.firebaseio.com/messenger.json"
    const messagesData = document.getElementById("messages")
    const sendBtn = document.getElementById("submit")
    sendBtn.addEventListener("click", submitMessage)
    const refreshBtn = document.getElementById("refresh")
    refreshBtn.addEventListener("click", refreshMessages)

    function refreshMessages() {
        let inputMessages = []

        fetch(url)
            .then(resources => resources.json())
            .then(data => {
                Object.entries(data)
                    .forEach(([_, message]) => {
                        const {
                            author,
                            content
                        } = message;
                        inputMessages.push(`${author}: ${content}`)
                    })

                messagesData.textContent = inputMessages.join("\n")
            })
            .catch((e) => console.log(e));
    }

    function submitMessage() {
        const name = document.getElementById("author").value
        const message = document.getElementById("content").value

        const headers = {
            "Content-Type": "application/json"
        }


        fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                author: name,
                content: message
            })
        })
            .then(() => {
                document.getElementById("author").value = ""
                document.getElementById("content").value = ""

                refreshMessages()
            })
            .catch((e) => console.log(e))
    }
}

solve()