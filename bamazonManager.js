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
            connection.end();
            break;
    
        case "View low inventory":
            viewLowInventory();
            connection.end();
            break;

        case "Add to inventory":
            addInventory();
            
            break;

        case "Add a new product":
            addNewProduct();
            
            break;

        case "Exit":
            console.log("BYE!")
            connection.end();
            break;
    }
// allows manager to see all of the items available in the store
   function viewStock(){
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
    
    });
// allows manager to see how low inventory is running
    function viewLowInventory(){
        console.log("----LOW INVENTORY----")

        connection.query("SELECT * FROM products", function(error, response){
            if (error) throw err;
            
            for (var i =0;  i<response.length; i++){
                if (response[i].stock_quantity <= 5){
                    console.log("ID: "+ response[i].item_id + "|" + "Product: "+ response[i].product_name + "|" + "Quantity: " + response[i].stock_quantity+ "|")
                }
            }
        })
    }

// allows manager to update inventory
    function addInventory(){
        console.log("----ADD NEW INVENTORY HERE----")
        connection.query("SELECT * FROM products", function(error, response){
            if(error) throw err;

        //query for 
        })
    }
// allows Manager to add new product to the store
    function addNewProduct(){
        console.log("----ADD NEW PRODUCT HERE----")
    }



}