function solve() {
   const addElementButton = document.querySelector("#add-new button");
   const addElement = document.getElementById("add-new");
   const buyButton = document.querySelector("#myProducts button")
   const filterButton = document.querySelector(".filter button");
   
   addElementButton.addEventListener("click", addProductHandler);
   buyButton.addEventListener("click", buyAllProducts);
   filterButton.addEventListener("click", filterHandler);
   
   function addProductHandler(ev) {
      ev.preventDefault();

      let name = addElement[0].value;
      let quantity = addElement[1].value;
      let price = addElement[2].value;
      
      let newElement = document.createElement("li");
      newElement.innerHTML = `<span>${name}</span>` 
                           + `<strong>Available: ${quantity}</strong>`
                           + `<div>`
                           + `<strong>${price}</strong>`
                           + `<button>Add to Client's List</button>`
                           + `</div>`;
      
      newElement.addEventListener("click", addProductToMyProducts);
      let availableItems = document.querySelector("#products ul");

      availableItems.appendChild(newElement);
   }

   function addProductToMyProducts(ev) {
      ev.preventDefault()

      let availableItems = document.querySelector("#products ul");
      let totalPrice = document.querySelectorAll("h1")[1];
      let availableCount = parseInt(this.querySelector("strong").innerHTML.match(/[0-9]+/g)[0]);
      let oldPrice = parseFloat(totalPrice.innerHTML.match(/[0-9.]+/g)[0]);
      let newPrice = parseFloat(this.querySelector("div strong").innerText) + oldPrice;

      if (availableCount - 1 <= 0) {
         availableItems.removeChild(this);
      }

      this.querySelector("strong").innerHTML = `Available: ${availableCount - 1}`
      totalPrice.innerHTML = `Total Price: ${newPrice.toFixed(2)}`;

      let newElement = document.createElement("li");
      let productName = this.querySelector("span").innerText;
      let productPrice = this.querySelector("div strong").innerText;
      newElement.innerHTML = `${productName}\n<strong>${productPrice}</strong>\n`;

      let myProducts = document.querySelector("#myProducts ul");
      myProducts.appendChild(newElement);
   }

   function filterHandler(ev) {
      ev.preventDefault();
      let filterValue = document.getElementById("filter");
      let availableItems = document.querySelectorAll("#products ul li");

      for (const key in availableItems) {
         if (availableItems.hasOwnProperty(key)) {
            const product = availableItems[key];
            let name = product.querySelector("span").innerText;
            // let pattern = new RegExp(`${filterValue}`, "gm")
            if (name.toLocaleLowerCase().includes(filterValue.value.toLocaleLowerCase())) {
               product.setAttribute("style", "display: block;")
               // product.parentNode.style.display = "block";
            } else {
               product.setAttribute("style", "display: none;")
               // product.parentNode.style.display = "none";
            }
         }
      }
     
      filterValue.value = "";
   }

   function buyAllProducts(ev) {
      ev.preventDefault();

      let allChildren = document.querySelector("#myProducts ul");
      allChildren.innerHTML = "";

      let totalPrice = document.querySelectorAll("h1")[1];
      totalPrice.innerHTML = "Total Price: 0.00"
   }
}