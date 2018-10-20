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
    else{
        displayTable();

    }
    
});

function displayTable(){
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(error, response){
        if (error){
            console.log(error);
        }
        else{
            console.log("HERE ARE ALL THE ITEMS AVAILABLE FOR SALE: ");

            console.log("==========================================="); 
            console.table(response);
            inquirer.prompt(
                [{
                    type: "list",
                    name: "confirmation",
                    message: "Would you like to purchase today?",
                    choices: ["yes", "no"]

                }]
            )
            .then(function(answer){
                if (answer.confirmation == "yes"){
                    console.log("===========================================");
                    promptItem(response); 
                }else{
                    console.log("please come again");
                    process.exit(0);
                }
            });
            
            
        }
        
    });
}

function promptItem(inventory){
    inquirer.prompt([
        {
            type: "integer",
            name: "item_id",
            message: "What is the item ID of the product?"
        }
    ])
    .then(function(userResponse){
        var productID = userResponse.item_id;
        for ( var i =0; i< inventory.length; i++){
            if (productID == inventory[i].item_id){
                var item = inventory[i];
            }
        }
        if (item){
            promptQuantity(item);
        }else{
            console.log("Sorry item does not exist");
            displayTable();
        }
        // console.log("===========================================");
        
    }
    );

}


function promptQuantity(item){
    inquirer.prompt([
        {
            type: "integer",
            name: "stock_quantity",
            message: "How many would you like to purchase?"
        }
    ])
    .then(function(userResponse){
        var quantity = userResponse.stock_quantity;
        console.log("===========================================");
         if (quantity <= item.stock_quantity){
             connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
            [quantity, item.item_id], function(error, res){
                if (error){
                    console.log(error);
                }else{
                    console.log("congrats. You have purchased " + item.product_name + ". Your total cost is $" + item.price * quantity + "." );
                    displayTable();
                }
                 
            
             
            });
    
        }
        else{
            console.log("Sorry we do not have that amount in stock");
            displayTable();
        }
    });
}



