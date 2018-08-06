# inventory_management
node inventory management system with sql database


challenge 1:

* Create a database and a table for "products" with item_id, product_name, department_name, price, stock_quantity.
* Insert mock data.

* On bamazonCustomer.js, customers can purchase listed items.
    * SELECT * FROM the database
    * Customer can choose from the listed items.

    * If the store has enough of the product to meet the customer's request:
        * Update the quantity on the database.
        * Return the total cost of the purchase to the user.
    * If not:
        * return `Insufficient quantity!`, and then prevent the order from going through. 


challenge 2:

* On bamazonManager.js, manager can do the following actions:
    * Show all products for sale:
    * Show all low inventory
    * Add to inventory
    * Add new product

    * If "show all products for sale":
        * SELECT all products if in stock > 0

    * If "show all low inventory":
        * SELECT all products if in stock < 5

    * If "add to inventory":
        * UPDATE the product inventory
    
    * If "add new product":
        * INSERT new product INTO the database table


challenge 3:

* Create a database and a table for "department" with department_id, department_name, price, over_head_costs.
* Modify the products table so that there's a product_sales column.
    * the product_sales value is updated with each individual products total revenue from each sale.

* On bamazonSupervisor.js, supervisor can do the following actions:
    * View Product Sales by Department
    * Create New Department

    * If "View Product Sales by Department":
        * SELECT all departments with cost, sales, and total profit, GROUP BY departments
    
    * If "Create New Department":
        * INSERT new department INTO the database table
