function solve() {

    let html = {
        availableItems: () => document.querySelector("#products ul"),
        myProductsList: () => document.querySelector("#myProducts ul"),
        productFilterInput: () => document.getElementsByTagName("input")[0],
        totalPriceField: () => document.querySelectorAll("h1")[1],
        addNewProduct: () => document.querySelectorAll("#add-new input"),
    };

    const addElementButton = document.querySelector("#add-new button");
    const buyButton = document.querySelector("#myProducts button")
    const filterButton = document.querySelector(".filter button");

    addElementButton.addEventListener("click", addProductHandler);
    filterButton.addEventListener("click", filterHandler);
    buyButton.addEventListener("click", buyAllProducts);

    function addProductHandler(ev) {
        ev.preventDefault();

        let name = html.addNewProduct()[0].value;
        let quantity = html.addNewProduct()[1].value;
        let price = html.addNewProduct()[2].value;

        let newElement = document.createElement("li");
        newElement.innerHTML = `<span>${name}</span>`
            + `<strong>Available: ${quantity}</strong>`
            + `<div>`
            + `<strong>${price}</strong>`
            + `<button>Add to Client's List</button>`
            + `</div>`;

        newElement.addEventListener("click", addProductToMyProducts);

        html.availableItems().appendChild(newElement);

        html.addNewProduct()[0].value = "";
        html.addNewProduct()[1].value = "";
        html.addNewProduct()[2].value = "";
    }

    function addProductToMyProducts(ev) {
       
        let availableCount = parseInt(this.querySelector("strong").innerText.match(/[0-9]+/gm)[0]);
        let oldPrice = parseFloat(html.totalPriceField().innerText.match(/[0-9.]+/gm)[0]);
        let newPrice = parseFloat(this.querySelector("div strong").innerText) + oldPrice;

        if (availableCount - 1 <= 0) {
            html.availableItems().removeChild(this);
        }

        this.querySelector("strong").innerText = `Available: ${availableCount - 1}`
        html.totalPriceField().innerText = `Total Price: ${newPrice.toFixed(2)}`;

        let newElement = document.createElement("li");
        let productName = ev.target.parentNode.parentNode.querySelector("span").innerText;
        let productPrice = ev.target.parentNode.querySelector("strong").innerText;
        newElement.innerHTML = `${productName}\n<strong>${productPrice}</strong>\n`;

        html.myProductsList().appendChild(newElement);
        ev.preventDefault();
    }

    function filterHandler(ev) {
        ev.preventDefault();

        let filterValue = document.getElementById("filter");
        let availableItems = document.querySelectorAll("#products ul li");

        for (const key in availableItems) {
            if (availableItems.hasOwnProperty(key)) {
                const product = availableItems[key];
                let name = product.querySelector("span").innerText;
          
                if (name.toLowerCase().includes(filterValue.value.toLowerCase())) {
                    product.setAttribute("style", "display: block;")
                } else {
                    product.setAttribute("style", "display: none;")
                }

            }
        }

        filterValue.value = "";
    }

    function buyAllProducts(ev) {
        ev.preventDefault();

        let allChildren = document.querySelector("#myProducts ul");
        allChildren.innerText = "";

        let totalPrice = document.querySelectorAll("h1")[1];
        totalPrice.innerText = "Total Price: 0.00"
    }
}