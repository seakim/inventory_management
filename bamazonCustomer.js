require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.PSWD,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayAllItems();
});

var itemList = [];
var queryResult = null;

var displayAllItems = function() {
    
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        queryResult = res;
        console.log(res.length + " matches found!");
        
        /** RUN QUERY AND PUSH DATA TO itemList */
        for (var i = 0; i < res.length; i++) {
            itemList.push(
                res[i].id +
                " || " +
                res[i].product_name +
                " || Section: " +
                res[i].department_name +
                " || Price: $" +
                res[i].price
            );
        }
        console.log(itemList);
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
            console.log("before:",queryResult[response.select - 1].stock_quantity);
            queryResult[response.select - 1].stock_quantity -= parseInt(response.quantity);
            console.log("after:",queryResult[response.select - 1].stock_quantity);

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
                console.log("Successfully purchased", queryResult[response.select - 1].product_name, "( x", response.quantity, ")");
                console.log("The total cost of your purchase is:", queryResult[response.select - 1].price * response.quantity)
            });
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