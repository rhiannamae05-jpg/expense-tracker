let expenses = [
    {
        name: "Shopping" ,
        amount: 75 ,
        category: "Food" ,
        date: "2026-11-20" ,
    }, 
    {
        name: "Gym Membership" ,
        amount: 30,
        category: "Fitness" ,
        date: "2026-11-15" ,
    },
    {
        name: "Electricity" ,
        amount: 85 ,
        category: "Bills" ,
        date: "2026-11-01" ,
    },
];

function saveExpenses(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
};

let monthlyBudget = 2000;



function addExpense(name, amount, category, date){
    let newExpense = {
        name: name,
        amount: amount, 
        category: category,
        date: date,
    };
    expenses.push(newExpense)
}


function calculateTotal(){
    let total = 0;
    for(let i = 0; i < expenses.length; i++){
        total += expenses[i].amount
    };
    return total;
};
console.log(calculateTotal());

function calculateRemaining(){
   return monthlyBudget - calculateTotal();
};
console.log(calculateRemaining());

function filterExpenses(category){
    let filteredExpenses = expenses.filter(function(expense){
        return expense.category === category;
    });
        return filteredExpenses;
};

console.log(filterExpenses("Food"));
console.log(filterExpenses("Transport")); 

function calculateCategoryTotal (category){
    let total = 0;
    for (let i =0; i < expenses.length; i++){
        if (expenses[i].category === category){
            total += expenses[i].amount;
        };
    };
    return total;
};

console.log(calculateCategoryTotal("Food"));
console.log(calculateCategoryTotal("Fitness"));

function calculateTotalExpenses(){
    let total = 0
    for (let i =0; i < expenses.length; i++){
        total += expenses[i].amount
    };
    return total;
};

function findHighestExpense(){
    let highestExpense = expenses[0]
    for (let i =0; i < expenses.length; i++){
        if (expenses[i].amount > highestExpense.amount){
            highestExpense = expenses[i]
        };
    };
    return highestExpense;
};

function findLowestExpense(){
    let lowestExpense = expenses[0];
    for (let i=0; i < expenses.length; i++){
        if (expenses[i].amount < lowestExpense.amount){
            lowestExpense = expenses[i]
        };
    };
    return lowestExpense;
};


function countExpensesByCategory(category){
    let count = 0 
    for (let i = 0; i < expenses.length; i++){
    if (expenses[i].category === category){
        count++;
    };
};
    return count;
}; 

function deleteExpense(index){
 expenses.splice(index, 1);
};


function calculateAverageExpense(){
    let total = 0; 
    for (let i =0; i < expenses.length; i++){
        total += expenses[i].amount
    };
    let AverageExpense = total / expenses.length
    return AverageExpense;
};

function getExpensesOverBudget(limit){
let filteredExpenses = expenses.filter(function(expense){
    return expense.amount > limit;
});
return filteredExpenses;
};


function getExpensesByDate(date){
let filteredExpenses = expenses.filter(function(expense){
    return expense.date === date ;
});
return filteredExpenses;
};


function editExpense(index) {
    const expense = expenses[index];

    const newName = prompt("Enter expense name:", expense.name);
    const newAmount = prompt("Enter expense amount:", expense.amount);
    const newCategory = prompt("Enter expense category:", expense.category);
    const newDate = prompt("Enter expense date (YYYY-MM-DD):", expense.date);

    if (newName === null || newAmount === null || newCategory === null || newDate === null) {
        return;
    }

    const updatedExpense = {
        name: newName,
        amount: Number(newAmount),
        category: newCategory,
        date: newDate
    };

    expenses.splice(index, 1, updatedExpense);

    saveExpenses();
    displayExpenses();
    updateSummary();
}


function getMonthlyTotal(month, year){
    let total = 0;
    for (let i = 0; i < expenses.length; i++){
        let dateParts = expenses[i].date.split("-");
        if (
            Number(dateParts[0]) === year && 
            Number(dateParts[1]) === month
        ){
            total += expenses[i].amount
        }
    }
    return total;
};


console.log(getMonthlyTotal(11, 2026));

const expenseList = document.getElementById("expense-list")

function displayExpenses(expensesToDisplay = expenses) {
    expenseList.innerHTML = "";
    for (let i = 0; i < expensesToDisplay.length; i++) {
        let row = document.createElement("tr")
        let expense = expensesToDisplay[i];
        const originalIndex = expenses.indexOf(expense);


    row.innerHTML = `
    <td>${expense.name}</td>
    <td>${expense.category}</td>
    <td>${expense.date}</td>
    <td>${expense.amount.toFixed(2)}</td>

        <td><button onclick="editExpense(${originalIndex})">Edit</button></td>
        <td><button onclick="deleteExpense(${originalIndex})">Delete</button></td>
    `;
        expenseList.appendChild(row);

    }
}

function deleteExpense(index){
    expenses.splice(index, 1);
    displayExpenses();
    updateSummary();
    saveExpenses();
};

function loadExpenses(){
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses !==null) {
        expenses = JSON.parse(savedExpenses);
    }
}




const expenseForm = document.getElementById("expense-form");
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;
    const expenseAmount = Number(amount);

     if (name.trim() === ""){
    alert("Please input an expense name.");
    return;
    };

    if (expenseAmount <= 0){
        alert ("Please enter an amount greater than zero");
        return;
    };

    if (category.trim() === ""){
        alert("Please enter an expense category");
        return;
    };

    if (date === ""){
        alert("Please select an expense date");
        return;
    };

    console.log(name, amount, category, date);

    const newExpense = {
        name: name, 
        amount: expenseAmount,
        category: category,
        date: date,
    };
    
    expenses.push(newExpense);
    saveExpenses();
    displayExpenses();
    expenseForm.reset();
    updateSummary();

   
});


const totalExpenseDisplay = document.getElementById("total-expenses");
const monthlySpendDisplay = document.getElementById("monthly-spending");
const expenseCountDisplay = document.getElementById("expense-count");

function updateSummary(){
    totalExpenseDisplay.textContent = `${calculateTotalExpenses().toFixed(2)}`;
    const today = new Date();
    const month = today.getMonth() +1;
    const year = today.getFullYear(); 
    monthlySpendDisplay.textContent = `${getMonthlyTotal(month, year).toFixed(2)}`;
    expenseCountDisplay.textContent = expenses.length;
}
loadExpenses();
displayExpenses();
updateSummary();

const categoryFilter = document.getElementById("category-filter");
const dateFilter = document.getElementById("date-filter");

function applyFilters() {

    const selectedCategory = categoryFilter.value.trim().toLowerCase();
    const selectedDate = dateFilter.value;

    const filteredExpenses = expenses.filter(function(expense) {

        const categoryMatches =
            selectedCategory === "all" ||
            String(expense.category || "").trim().toLowerCase() === selectedCategory;
            const dateMatches =
            selectedDate === "" ||
            expense.date === selectedDate;

        return categoryMatches && dateMatches;
    });

    displayExpenses(filteredExpenses);
}

categoryFilter.addEventListener("change", applyFilters);
dateFilter.addEventListener("change", applyFilters);