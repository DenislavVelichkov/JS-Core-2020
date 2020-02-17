function solve() {
    let priceSoFar = 0;

    let itemInputs = document.querySelectorAll('#add-new input');
    let addButton = document.querySelector('#add-new button');
    let avaliableProductsList = document.querySelector('#products ul')
    let myProductsList = document.querySelector('#myProducts ul');
    let filterInput = document.querySelector('#filter')
    let filterTrigger = document.querySelector('.filter button')

    let totalPriceRef = document.querySelectorAll('h1');

    let buyButton = document.querySelector('#myProducts button')

    buyButton.addEventListener('click', buyHandler)
    avaliableProductsList.addEventListener('click', addProductToBasketHandler)
    addButton.addEventListener('click', addItemHandler)
    filterTrigger.addEventListener('click', filterItems)

    function buyHandler() {
        myProductsList.innerHTML = '';
        totalPriceRef[1].innerHTML = 'Total Price: 0.00'
        priceSoFar = 0;
    }

    function addProductToBasketHandler(e) {
        if (e.target.tagName === 'BUTTON') {

            let productPrice = e.target.parentNode.querySelector('strong').textContent;
            let productName = e.target.parentNode.parentNode.querySelector('span').textContent;
            let basketElement = document.createElement('li')
            basketElement.textContent = productName;

            let productQuantityCountRef = e.target.parentNode.parentNode.querySelector('strong');
            let parsedQuantity = Number(productQuantityCountRef.innerHTML.split(':')[1].trim())
            productQuantityCountRef.innerHTML = `Available: ${parsedQuantity - 1}`

            if (parsedQuantity - 1 === 0) {
                e.target.parentNode.parentNode.remove()
            }

            let basketElementProductPrice = document.createElement('strong')
            basketElementProductPrice.textContent = productPrice;
            basketElement.appendChild(basketElementProductPrice)
            myProductsList.appendChild(basketElement);
            priceSoFar += Number(productPrice);
            totalPriceRef[1].innerHTML = `Total Price: ${(priceSoFar).toFixed(2)}`
        }
    }

    function filterItems() {
        let filterValue = filterInput.value;
        Array.from(avaliableProductsList.children).forEach(el => {
            let productName = el.querySelector('span')
            if (productName.textContent.toLowerCase().includes(filterValue.toLowerCase())) {
                el.style.display = 'block'
            } else {
                el.style.display = 'none'
            }
        })
    }

    function addItemHandler(e) {

        e.preventDefault()

        let newItemLine = document.createElement('li');

        let itemName = document.createElement('span');
        itemName.textContent = itemInputs[0].value;

        let itemQuantity = document.createElement('strong');
        itemQuantity.textContent = `Available: ${itemInputs[1].value}`;

        newItemLine.appendChild(itemName);
        newItemLine.appendChild(itemQuantity);

        let priceContainer = document.createElement('div');

        let priceElement = document.createElement('strong');
        priceElement.textContent = Number(itemInputs[2].value).toFixed(2);

        let addButton = document.createElement('button');
        addButton.textContent = `Add to Client's List`;


        priceContainer.appendChild(priceElement);
        priceContainer.appendChild(addButton);
        newItemLine.appendChild(priceContainer);

        avaliableProductsList.appendChild(newItemLine);
        avaliableProductsList.innerHTML

        itemInputs[0].value = '';
        itemInputs[1].value = '';
        itemInputs[2].value = '';
    }
}