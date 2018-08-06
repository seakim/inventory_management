require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PSWD,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayAllItems();
});

var QUERYRESULT = null;
var ITEMSINFO = [];
var ITEMHEADER = ["|ID | " + " ITEM NAME".padEnd(73) + "| " + " DEPARTNEMT".padEnd(22) + "| " + " PRICE " + "| " + "LIST PRICE " + "| " + "DISCOUNT " + "| " + "INVENTORY " + "|"];
ITEMHEADER.push("-".repeat(149));

var updateItemsInfo = function (arg) {
    for (var i = 0; i < arg.length; i++) {
        var itemId = arg[i].id;
        var itemName = arg[i].product_name;
        var departmentName = arg[i].department_name;
        var price = arg[i].price;
        var listPrice = arg[i].list_price;
        var discount = arg[i].discount_rate;
        var inventory = arg[i].stock_quantity;
        var item = "| " + itemId.toString().padEnd(2) + "| " + itemName.padEnd(73) + "| " + departmentName.padEnd(22) + "| $" + price.toString().padEnd(6)
                 + "| $" + listPrice.toString().padEnd(10) + "| " + discount.toString().padStart(7) + "% | " + inventory.toString().padStart(9) + " |";  
        ITEMSINFO.push(item);
    }
}

var displayAllItems = function() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        QUERYRESULT = res;
        console.log("Welcome to Bamazon! We have", res.length, "items available.\n");
        updateItemsInfo(res);
        console.log(ITEMHEADER);
        console.log(ITEMSINFO);
        console.log("\n")
        selectItemAndUpdate();
    });
}

var selectItemAndUpdate = function () {
    inquirer.prompt([
        {
            name: "select",
            type: "input",
            message: "Please enter the ID of the product that you want to buy\n",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units do you want?"
        }
    ]).then( function(response) {
        if (QUERYRESULT[response.select - 1].stock_quantity < response.quantity) {
            console.log(`Insufficient quantity!`);
        } else {
            QUERYRESULT[response.select - 1].stock_quantity -= response.quantity;
            // console.log("after in stock:",QUERYRESULT[response.select - 1].stock_quantity);

            QUERYRESULT[response.select - 1].product_sales += 
                (QUERYRESULT[response.select - 1].price * response.quantity);
            // console.log(QUERYRESULT[response.select - 1].product_sales);
            
            /** UPDATE UNITS */
            // updateUnits(); // does not work
            connection.query(
                "UPDATE products SET ? WHERE ?", 
                [
                    { stock_quantity: QUERYRESULT[response.select - 1].stock_quantity },
                    // { product_sales: }
                    { id: response.select}
                ], 
                function(err, res) {
                if (err) throw err;
                console.log("\nSuccessfully purchased", QUERYRESULT[response.select - 1].product_name, "( x", response.quantity, ")");
                console.log("The total cost of your purchase is: $", QUERYRESULT[response.select - 1].price * response.quantity,"\n");
            });
            connection.end();
        }            
    });
}
// var updateUnits = function (response) {
//     connection.query(
//         "UPDATE products SET ? WHERE ?", 
//         [
//             { stock_quantity: QUERYRESULT[response.select - 1].stock_quantity },
//             { id: response.select}
//         ], 
//         function(err, res) {
//         if (err) throw err;
//         console.log(res);
//     });
// }