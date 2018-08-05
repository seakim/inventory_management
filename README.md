# inventory_management
node inventory management system with sql database


challenge 1:

* Create a database and a table for "products" with item_id, product_name, department_name, price, stock_quantity.
* Insert mock data.

* From node, display all items.
* Using inquirer npm, users can choose the item id and units that they want to purchase.
    * If the store has enough of the product to meet the customer's request:
        * Update the quantity on the database.
        * Return the total cost of the purchase to the user.
    * If not:
        * return `Insufficient quantity!`, and then prevent the order from going through. 

