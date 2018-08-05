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
  menuOptions();
});


var menuOptions = function () {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Menu Options:",
        choices: [
            `View Products for Sale`,
            `View Low Inventory`,
            `Add to Inventory`,
            `Add New Product`
        ]
    }).then( function (response) {
        switch (response.options) {
            case `View Products for Sale`:
                listAvailableItems();
                break;
            case `View Low Inventory`:
                listItemsLowInStock();
                break;
            case `Add to Inventory`:
                updateItemQuantity();
                break;
            case `Add New Product`:
                addItemsToInventory();
                break;
        }
    });
}

var QUERYRESULT = null;
var ITEMSINFO = [];

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
        
            ITEMSINFO.push(item);
    }
}

var listAvailableItems = function () {
    connection.query(
        "SELECT * FROM products WHERE NOT ?",
        { stock_quantity: 0 },
        function(err, res) {
            if (err) throw err;
            updateItemsInfo(res);
            console.log(ITEMSINFO);
            connection.end();
        }
    );
}

var listItemsLowInStock = function () {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?",
        [0, 4],
        function(err, res) {
            if (err) throw err;
            updateItemsInfo(res);
            console.log(ITEMSINFO);
            connection.end();
        }
    );
}

var updateItemQuantity = function () {        
    connection.query(
        "SELECT * FROM products",
        function(err, res) {
            if (err) throw err;
            QUERYRESULT = res;
            updateItemsInfo(res);
            console.log(ITEMSINFO);
            selectItemAndUpdate();
        }
    );
}

var selectItemAndUpdate = function () {
    inquirer.prompt([
        {
            name: "select",
            type: "input",
            message: "Please enter the ID of the product that you want to add\n",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units do you want to add?"
        }
    ]).then( function(response) {
        QUERYRESULT[response.select - 1].stock_quantity += parseInt(response.quantity);
        connection.query(
            "UPDATE products SET ? WHERE ?", 
            [
                { stock_quantity: QUERYRESULT[response.select - 1].stock_quantity },
                { id: response.select}
            ], 
            function(err, res) {
            if (err) throw err;
            console.log("\nSuccessfully update the inventory of", QUERYRESULT[response.select - 1].product_name, "( x", QUERYRESULT[response.select - 1].stock_quantity, ")");
        });
        connection.end();
    });
}

var addItemsToInventory = function () {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Product Name:"
        },
        {
            name: "department_name",
            type: "input",
            message: "Department Name:"
        },
        {
            name: "price",
            type: "input",
            message: "Price:"
        },
        {
            name: "list_price",
            type: "input",
            message: "List Price: (press enter if list price is same as above)"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many items do you want to add?"
        },
        {
            name: "confirmation",
            type: "confirm",
            message: "Please confirm to add the item(s):"
        }
    ]).then( function(response) {
        if (response.confirmation) {
            var discount = 0;
            if (response.list_price ==="") {
                response.list_price = response.price;
            } else {
                discount = (1 - (response.price / response.list_price)) * 100;
            }
            console.log(response.list_price);
            console.log(discount);

            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: response.product_name,
                    department_name: response.department_name,
                    price: response.price,
                    list_price: response.list_price,
                    discount_rate: discount,
                    stock_quantity: response.stock_quantity
                },
                function(err) {

                if (err) throw err;
            });
            console.log("Successfully added the item:", response.product_name, " ( x", response.stock_quantity, ")")

        } else {
            console.log("Failed to confirm; the item is not added.\n")
        }
        connection.end();
    });
}