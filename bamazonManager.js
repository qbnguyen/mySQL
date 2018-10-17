var mysql = require("mysql");
var inquirer = require("inquirer");
require ("console.table");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "nguyen95",
    database: "bamazon_DB"
});

connection.connect(function(error){
    if (error){
        console.log("error", error.stack);
    }
    managerPrompt();
});

function managerPrompt(){
    inquirer.prompt({
        type:"list",
        name: "managerPrompt",
        message: "What would you like to do?",
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add a new product", "Exit"]

}).then(function(ans){
    switch (ans.managerPrompt) {
        case "View products for sale":
            viewStock();
            break;
    
        case "View low inventory":
            break;

        case "Add to inventory":
            break;

        case "Add a new product":
            break;

        case "Exit":
            console.log("BYE!")
            break;
    }
//rewrite into a switch case statement
   function viewStock()
   {
       var queryStr ="SELECT item_id, product_name, price, stock_quantity FROM products";
        connection.query(queryStr, function(error, response){
            if (error){
                console.log(error);
            }
                console.log("HERE ARE ALL THE ITEMS FOR SALE: ");
                console.log("==========================================="); 
                console.table(response);
                console.log("===========================================");
            });
        
        }
    
    })
}