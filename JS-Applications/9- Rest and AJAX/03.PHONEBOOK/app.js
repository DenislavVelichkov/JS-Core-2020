function solve() {
    const url = "https://phone-book-fe9f7.firebaseio.com/phonebook.json"
    const phoneBookData = document.getElementById("phonebook")

    function createPhone() {
        const person = document.getElementById("person").value
        const phone = document.getElementById("phone").value
        const recordToAdd = { person, phone }

        const headers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recordToAdd)
        };

        fetch(url, headers)
            .then((r) => r.json())
            .then(data => {
                document.getElementById("person").value = ""
                document.getElementById("phone").value = ""

                createDbRecord(recordToAdd, data.name)
            })
            .catch((e) => console.log(e));
    }

    function loadPhoneBook() {
        fetch(url)
            .then(r => r.json())
            .then(data => {
                phoneBookData.innerHTML = ""

                Object.entries(data).forEach((record) => {
                    const [recordId, personInfo] = record

                    if (recordId && personInfo) {

                        createDbRecord(personInfo, recordId)
                    }

                })
            })
            .catch((e) => console.log(e))
    }


    function deletePhone() {
        const recordToRemove = this.parentNode
        const deleteQuery =
            `https://phone-book-fe9f7.firebaseio.com/phonebook/${recordToRemove.id}.json`

        fetch(deleteQuery, {method: "DELETE"})
            .then(() => {
                recordToRemove.remove()
            })
            .catch(() => console.log("Error"))

    }

    function createDbRecord(personInfo, recordId) {
        const li = document.createElement("li")
        li.textContent = `${personInfo.person}: ${personInfo.phone}`
        li.id = recordId
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.addEventListener("click", deletePhone)
        li.appendChild(deleteButton)
        phoneBookData.appendChild(li)
    }

    const createBtn = document.querySelector("#btnCreate")
    createBtn.addEventListener("click", createPhone)

    const loadBtn = document.querySelector("#btnLoad")
    loadBtn.addEventListener("click", loadPhoneBook)
}

solve()