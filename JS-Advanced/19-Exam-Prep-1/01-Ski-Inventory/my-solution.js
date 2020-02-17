function solve() {

   let html = {
      availableItems: () => document.querySelector("#products ul"),
      myProductsList: () => document.querySelector("#myProducts ul"),
      productFilterInput: () => document.querySelector(".filter input"),
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

      let name = html.addNewProduct()[0];
      let quantity = html.addNewProduct()[1];
      let price = html.addNewProduct()[2];

      let newElement = document.createElement("li");
      newElement.innerHTML = `<span>${name.value}</span>`
         + `<strong>Available: ${quantity.value}</strong>`
         + `<div>`
         + `<strong>${price.value}</strong>`
         + `<button>Add to Client's List</button>`
         + `</div>`;

      newElement.querySelector("button").addEventListener("click", addProductToMyProducts);

      html.availableItems().appendChild(newElement);

      name.value = "";
      quantity.value = "";
      price.value = "";
   }

   function addProductToMyProducts(ev) {

      let availableCount = parseInt(ev.target.parentNode.parentNode.querySelector("strong").innerText.match(/[0-9]+/gm)[0]);
      let oldPrice = parseFloat(html.totalPriceField().innerText.match(/[0-9.]+/gm)[0]);
      let newPrice = parseFloat(ev.target.parentNode.querySelector("strong").innerText) + oldPrice;

      if (availableCount - 1 <= 0) {
         html.availableItems().removeChild(ev.target.parentNode.parentNode);
      }

      ev.target.parentNode.parentNode.querySelector("strong").innerText = `Available: ${availableCount - 1}`
      html.totalPriceField().innerText = `Total Price: ${newPrice.toFixed(2)}`;

      let newElement = document.createElement("li");
      let productName = ev.target.parentNode.parentNode.querySelector("span").innerText;
      let productPrice = ev.target.parentNode.querySelector("strong").innerText;
      newElement.innerHTML = `${productName}\n<strong>${productPrice}</strong>\n`;

      html.myProductsList().appendChild(newElement);
   }

   function filterHandler(ev) {

      let filterValue = html.productFilterInput();
      let availableItems = document.querySelectorAll("#products ul li");

      Array.from(availableItems).forEach(el => {
         let productName = el.querySelector('span')
         if (productName.innerText.toLowerCase().includes(filterValue.value.toLowerCase())) {
            el.style.display = 'block'
         } else {
            el.style.display = 'none'
         }
      })

      // for (const key in availableItems) {
      //    if (availableItems.hasOwnProperty(key)) {
      //       const product = availableItems[key];
      //       let name = product.querySelector("span").innerText;

      //       if (name.toLowerCase().includes(filterValue.value.toLowerCase())) {
      //          product.setAttribute("style", "display: block;")
      //       } else {
      //          product.setAttribute("style", "display: none;")
      //       }

      //    }
      // }

      filterValue.value = "";
   }

   function buyAllProducts(ev) {
      html.myProductsList().innerText = "";
      html.totalPriceField().innerText = "Total Price: 0.00" 
   }
}