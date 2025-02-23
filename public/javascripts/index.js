// document.addEventListener("DOMContentLoaded", function () {
//     const expenseForm = document.getElementById("expense-form");
//     const expenseList = document.getElementById("expense-list");
//     const ctx = document.getElementById("expenseChart")?.getContext("2d");
//     let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
//     let chart;

//     function renderExpenses() {
//         if (!expenseList) return;
//         expenseList.innerHTML = "";
//         expenses.forEach((expense, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${expense.description}</td>
//                 <td>$${expense.amount}</td>
//                 <td>${expense.date}</td>
//                 <td>
//                     <button onclick="editExpense(${index})">Edit</button>
//                     <button onclick="deleteExpense(${index})">Delete</button>
//                 </td>
//             `;
//             expenseList.appendChild(row);
//         });
//         localStorage.setItem("expenses", JSON.stringify(expenses));
//         renderChart();
//     }

//     function addExpense(event) {
//         event.preventDefault();
//         const description = document.getElementById("description").value;
//         const amount = document.getElementById("amount").value;
//         const date = document.getElementById("date").value;
        
//         expenses.push({ description, amount, date });
//         renderExpenses();
//         expenseForm.reset();
//     }

//     function renderChart() {
//         if (!ctx) return;
//         if (chart) {
//             chart.destroy();
//         }
//         const categoryTotals = {};
//         expenses.forEach(expense => {
//             categoryTotals[expense.description] = (categoryTotals[expense.description] || 0) + parseFloat(expense.amount);
//         });
//         const labels = Object.keys(categoryTotals);
//         const data = Object.values(categoryTotals);
//         chart = new Chart(ctx, {
//             type: 'pie',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: 'Expenses by Category',
//                     data: data,
//                     backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
//                 }]
//             }
//         });
//     }

//     if (expenseForm) {
//         expenseForm.addEventListener("submit", addExpense);
//     }
//     renderExpenses();
// });