function solve() {

   const html = {
      availableItems: document.querySelector("#products ul"),
      myProductsList: document.querySelector("#myProducts ul"),
      productFilterInput: document.querySelector(".filter input"),
      totalPriceField: document.querySelectorAll("h1")[1],
      addNewProduct: document.querySelectorAll("#add-new input"),
   };

   const addProductButton = document.querySelector("#add-new button");
   const buyButton = document.querySelector("#myProducts button")
   const filterButton = document.querySelector(".filter button");

   addProductButton.addEventListener("click", addProductHandler);
   filterButton.addEventListener("click", filterHandler);
   buyButton.addEventListener("click", buyAllProducts);

   function addProductHandler(ev) {
      ev.preventDefault();

      let name = html.addNewProduct[0];
      let quantity = html.addNewProduct[1];
      let price = html.addNewProduct[2];

      let newElement = createHTMLElement(
         "li", null, null, null, null);
      let span = createHTMLElement(
         "span", null, name.value, null, null);
      let strong = createHTMLElement(
         "strong", null, `Available: ${quantity.value}`, null, null);
      let div = createHTMLElement(
         "div", null, null, null, null);
      let subStrong = createHTMLElement(
         "strong", null, `${Number(price.value).toFixed(2)}`, null, null);
      let button = createHTMLElement(
         "button", null, "Add to Client's List", null, { name: "click", func: addProductToMyProducts });

      newElement.appendChild(span);
      newElement.appendChild(strong);
      div.appendChild(subStrong);
      div.appendChild(button);
      newElement.appendChild(div);

      html.availableItems.appendChild(newElement);

      name.value = "";
      quantity.value = "";
      price.value = "";
   }

   function addProductToMyProducts(ev) {
      let availableCount = parseInt(ev.target.parentNode.parentNode.childNodes[1].textContent.split(":")[1].trim());
      let oldPrice = parseFloat(html.totalPriceField.textContent.split(":")[1].trim());
      let newPrice = parseFloat(ev.target.parentNode.childNodes[0].textContent) + oldPrice;

      if (availableCount - 1 <= 0) {
         ev.target.parentNode.parentNode.remove();
      }

      ev.target.parentNode.parentNode.childNodes[1].textContent = `Available: ${availableCount - 1}`;
      html.totalPriceField.textContent = `Total Price: ${Number(newPrice).toFixed(2)}`;

      let productName = ev.target.parentNode.parentNode.childNodes[0].textContent;
      let productPrice = ev.target.parentNode.childNodes[0].textContent;

      let newElement = createHTMLElement("li", null, productName, null, null);
      let price = createHTMLElement("strong", null, productPrice, null, null);

      newElement.appendChild(price);
      html.myProductsList.appendChild(newElement);
   }

   function filterHandler(ev) {

      let filterValue = html.productFilterInput;
      let availableItems = document.querySelectorAll("#products ul li");

      Array.from(availableItems).forEach(el => {

         let productName = el.childNodes[0];

         if (productName.textContent.toLowerCase().includes(filterValue.value.toLowerCase())) {
            el.style.display = "block";
         } else {
            el.style.display = "none";
         }

      })

      filterValue.value = "";
   }

   function buyAllProducts(ev) {
      html.myProductsList.innerHTML = "";
      html.totalPriceField.textContent = "Total Price: 0.00"
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