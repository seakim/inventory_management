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

var queryResult = null;
var ItemsInfo = [];

var updateItemsInfo = function (arg) {
    for (var i = 0; i < arg.length; i++) {
        var item =             
            arg[i].id +
            " || " +
            arg[i].product_name +
            " ( " +
            arg[i].department_name +
            " ) || Price: $" +
            arg[i].price;
            if (arg[i].discount_rate !== 0) {
                item += (" ( " +arg[i].discount_rate + " % discount )");
            }
            item += " || in Stock: " + arg[i].stock_quantity;
        
        ItemsInfo.push(item);
    }
}

var displayAllItems = function() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        queryResult = res;
        console.log("Welcome to Bamazon! We have", res.length, "items available.\n");
        updateItemsInfo(res);
        console.log(ItemsInfo);
        console.log("\n")
        selectItem();
    });
}

var selectItem = function () {
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
        if (queryResult[response.select - 1].stock_quantity < response.quantity) {
            console.log(`Insufficient quantity!`);
        } else {

            // console.log("before:",queryResult[response.select - 1].stock_quantity);
            queryResult[response.select - 1].stock_quantity -= parseInt(response.quantity);
            // console.log("after:",queryResult[response.select - 1].stock_quantity);

            /** UPDATE UNITS */
            // updateUnits(); // does not work
            connection.query(
                "UPDATE products SET ? WHERE ?", 
                [
                    { stock_quantity: queryResult[response.select - 1].stock_quantity },
                    { id: response.select}
                ], 
                function(err, res) {
                if (err) throw err;
                console.log("\nSuccessfully purchased", queryResult[response.select - 1].product_name, "( x", response.quantity, ")");
                console.log("The total cost of your purchase is: $", queryResult[response.select - 1].price * response.quantity,"\n");
            });
            connection.end();
        }            
    });
}
// var updateUnits = function (response) {
//     connection.query(
//         "UPDATE products SET ? WHERE ?", 
//         [
//             { stock_quantity: queryResult[response.select - 1].stock_quantity },
//             { id: response.select}
//         ], 
//         function(err, res) {
//         if (err) throw err;
//         console.log(res);
//     });
// }