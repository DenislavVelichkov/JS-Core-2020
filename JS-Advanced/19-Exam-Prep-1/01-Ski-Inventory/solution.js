function solve() {
   const addElementButton = document.querySelector("#add-new button");
   const addElement = document.getElementById("add-new");
   const availableItems = document.querySelector("#products ul");
   const totalPrice = document.querySelectorAll("h1")[1];
   const myProducts = document.querySelector("#myProducts ul");
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
      newElement.innerHTML = `<span>${name}</span>\n
                              <strong>Available: ${quantity}</strong>\n
                              <div>\n
                              <strong>${price}</strong>\n
                              <button>Add to Client's List</button>\n
                              </div>\n`;

      newElement.addEventListener("click", addProductToMyProducts);
      availableItems.appendChild(newElement);
   }

   function addProductToMyProducts(ev) {
      ev.preventDefault()

      let availableCount = parseInt(this.querySelector("strong").innerHTML.match(/[0-9]+/g)[0]);
      let oldPrice = parseFloat(totalPrice.innerHTML.match(/[0-9.]+/g)[0]);
      let newPrice = parseFloat(this.querySelector("div strong").innerText) + oldPrice;

      if (availableCount - 1 <= 0) {
         availableItems.removeChild(this);
      }

      this.querySelector("strong").innerHTML = `Available: ${availableCount - 1}`
      totalPrice.innerHTML = `Total Price: ${newPrice}`;
      let newElement = document.createElement("li");
      let productName = this.querySelector("span").innerText;
      let productPrice = this.querySelector("div strong").innerText;
      newElement.innerHTML = `${productName}\n<strong>${productPrice}</strong>`;
      myProducts.appendChild(newElement);
   }

   function filterHandler(ev) {
      ev.preventDefault();

      for (const key in availableItems.children) {
         const product = availableItems.children[key];
         let name = product.querySelector("span").innerHTML;
         let filterValue = document.querySelector("#filter").value;
         let pattern = new RegExp(`${filterValue}`, "gm")

         if(name.match(pattern)){
            product.setAttribute("style", "display: block")
         } else {
            product.setAttribute("style", "display: none")
         }

      }
   }

   function buyAllProducts(ev) {
      ev.preventDefault();

      let allChildren = document.querySelector("#myProducts ul");
      allChildren.innerHTML = "";
      totalPrice.innerHTML = "Total Price: 0.00"
   }

}