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
    displayTable();
});

function displayTable(){
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(error, response){
        if (error){
            console.log(error);
        }
        console.log("HERE ARE ALL THE ITEMS AVAILABLE FOR SALE: ");

        console.log("==========================================="); 
        console.table(response);
        console.log("===========================================");
        promptItem(response);
    });
}

function promptItem(response){
    inquirer.prompt([
        {
            type: "integer",
            name: "item_id",
            message: "What is the item ID of the product?"
        }
    ])
    .then(function(userResponse){
        console.log(userResponse.item_id);
        console.log("===========================================");
        promptQuantity(response);
    }
    )

}


function promptQuantity(response){
    inquirer.prompt([
        {
            type: "integer",
            name: "stock_quantity",
            message: "How many would you like to purchase?"
        }
    ])
    .then(function(userResponse){
        console.log(userResponse.stock_quantity);
        console.log("===========================================");
        // if (promptQuantity < response[i].stock_quantity){
        //     connection.query("UPDATE products SET? WHERE?",
        //     stock_quantity: stock_quantity[i] - userResponse.stock_quantity)
        // //         for (let i = 0; i < stock_quantity.length; i++) {
        // //             console.log("congrats")
        // //         }
        // }
    })
}



