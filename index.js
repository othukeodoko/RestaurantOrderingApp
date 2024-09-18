import {menuArray} from '/data.js'

let sectionHtml = document.getElementById('menu-item')
let orderBtn = document.getElementById('add-btn')
let checklistSectionHtml = document.getElementById('check-section')
//let removeButton = document.getElementById('remove-btn')
const orderArray = []

// function handleRemove(e){
            
//             console.log(e.target.id)
// }
        
function handleClick(e){
    console.log(e.target.id)
}
// Function to render the menu items
function renderMenu(){
    return menuArray.map(function(item, index){
        return  `
        <div class="menu-container">
            <div class="emoji-image">${item.emoji}</div>
            <div class="item-list">
                <h1>${item.name}</h1>
                <p>${item.ingredients.join(", ")}</p>
                <p>$${item.price}</p>
            </div>
            <button id="add-btn-${index}" class="add-btn">+</button>
        </div>`;
    }).join('');
}
sectionHtml.innerHTML = renderMenu();

// Add event listeners to each "Add" button
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener("click", orderFoodItem);
});

function orderFoodItem(event){
     //Retrieve the price and item name for the item list container
    //Create an array/Object to hold all orders
    //Allow the users to add orders to the array 
    //Allow the users to remove orders from the array.
    //Get the name of the item clicked and add it to the list
    //Get the price of the item selected
    //Include a divider
    //Add it to a total Price variable
    //Add a button for Complete Order
    //I was stuck at how to retrieve the item name and price and had to use chatgpt 
    //to clarify.
    //My initial approach was to use document.getElementsByClassName(event.target.id)
    //It returned an HtmlCollection
    //I also declared and empty OrderArray. I went to chatgpt to get the fix
    //const ItemId = event.target.id.replace('add-btn','')
    //let item = menuArray[parseInt(ItemId)]
    const item = menuArray[parseInt(event.target.id.replace('add-btn-', ''))];
    const order = {
        name: item.name,
        price: item.price
    };
    orderArray.push(order);
    console.log(orderArray);
    AddtoOrderSummary();
}

// Function to handle removing items from the order
function handleRemove(index) {
    orderArray.splice(index, 1);
    AddtoOrderSummary(); // Update the order summary after removal
}

// Function to update the order summary
function AddtoOrderSummary(){
    let total = orderArray.reduce((total, item) => total + item.price, 0);
    checklistSectionHtml.innerHTML = 
        `<div class="main-container">
            <h2 class="checklist-header">Your Order</h2>
            <ul>
                ${orderArray.map((item, index) => `
                    <li class="order-items"><span>${item.name}</span>
                        <a href="#" class="remove-btn" data-index="${index}">REMOVE</a>
                       <span> $${item.price}
                    </li>
                `).join('')}
            </ul>
            <p class="total-info">Total Price: $${total}</p>
            <button class="btn-complete" id="btn-complete">Complete Order</button>
        </div>`;
       
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const index = parseInt(button.getAttribute('data-index'));
            handleRemove(index);
        });
    });

    const btnCompleteOrder = document.getElementById('btn-complete');
    if (btnCompleteOrder) {
        btnCompleteOrder.addEventListener("click", function(){
            document.querySelector(".payment-modal").style.display = "block";
            document.getElementById('container').style.backgroundColor = "dark-grey";
        });
    }
}

const payBtn = document.getElementById('pay-btn');
if (payBtn) {
    payBtn.addEventListener("click", function(e){
        const payerName = document.getElementById('payer-name').value;
        document.querySelector(".payment-modal").style.display = "none";
        checklistSectionHtml.style.display = "none";
        document.getElementById('payment-success').style.display = "block";
        document.getElementById('payment-success').innerHTML = `Thanks ${payerName}, your order is on its way!`;
    });
}