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
  showMenu();
});

var DEPARTMENTINFO = [];
var DEPARTMENTHEADER = ["| DEPARTMENT ID | " + " DEPARTNEMT NAME".padEnd(22) + "| " + "OVER HEAD COSTS " 
                    + "| " + "PRODUCT SALES " + "| " + "TOTAL PROFIT " + "|"];
DEPARTMENTHEADER.push("-".repeat(90));

var updateDepartmentsInfo = function (arg) {
    for (var i = 0; i < arg.length; i++) {
        var departmentID = arg[i].id;
        var departmentName = arg[i].department_name;
        var overHeadCosts = arg[i].over_head_costs;
        var productSales = arg[i].product_sales;
        var totalProfit = arg[i].total_profit;
        var item = "| " + departmentID.toString().padStart(13) + " | " + departmentName.padEnd(22) + "| $ " + overHeadCosts.toString().padEnd(14) + "| $ ";
        (productSales !== null) ? ( item += productSales.toString().padEnd(12) ) : ( item += "0".padEnd(12) );
        item += "| $ ";
        (totalProfit !== null) ? ( item += totalProfit.toString().padEnd(11) ) : ( item += (-overHeadCosts).toString().padEnd(11) );
        item += "| ";
        DEPARTMENTINFO.push(item);
    }
}

var showMenu = function () {
    inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "MENU OPTIONS:",
            choices: [
                "Create New Department",
                "View Product Sales by Department"
            ]
        }
    ]).then( function(response) {
        console.log(response);
        switch (response.select) {
            case "Create New Department":
                createNewDepartment();
                break;
            case "View Product Sales by Department":
                console.log("\n");
                showDepartmentInfo();
                break;
        }
    });
}

var createNewDepartment = function () {
    inquirer.prompt([
        {
            name: "department_name",
            type: "input",
            message: "Department Name:"
        },
        {
            name: "over_head_costs",
            type: "input",
            message: "Over Head Costs:"
        },
        {
            name: "confirmation",
            type: "confirm",
            message: "Please confirm to add the department:"
        }
    ]).then( function(response) {
        if (response.confirmation) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: response.department_name,
                    over_head_costs: response.over_head_costs
                },
                function(err) {
                    if (err) throw err;
                }
            );
            console.log("Successfully added the department:", response.department_name);
        } else {
            console.log("Failed to confirm; the department is not added.\n")
        }
        connection.end();
    });
}

var showDepartmentInfo = function () {
    var query = "SELECT d.*, SUM(p.product_sales) AS product_sales, (SUM(p.product_sales) - d.over_head_costs) AS total_profit ";
    query += "FROM departments d ";
    query += "LEFT JOIN products p ON d.department_name = p.department_name ";
    query += "GROUP BY d.id";
    
    connection.query(
        query,
        function(err, res) {
            if (err) throw err;
            updateDepartmentsInfo(res);
            console.log(DEPARTMENTHEADER);
            console.log(DEPARTMENTINFO);
        }
    );
    connection.end();
}