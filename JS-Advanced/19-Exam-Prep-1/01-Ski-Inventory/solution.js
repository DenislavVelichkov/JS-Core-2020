function solve() {
   let addElementButton = document.querySelector("#add-new button");


addElementButton.addEventListener('onClick', function (e) {
   e.preventDefault();

   console.log(fuctionality.addProduct)
});

}

  let fuctionality = {
      addProduct: addProductFunc,
  }

  function addProductFunc(name, quantity, price) {

  }

}