DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(9,2),
  list_price DECIMAL(9,2),
  discount_rate DECIMAL(4,2),
  stock_quantity INT(9),
  product_sales DECIMAL(12,2),
  PRIMARY KEY (id)
);

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(12,2),
  PRIMARY KEY (id)
);


-- INSERT products DATA  
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('Bounty Select-a-Size Paper Towels, White, Huge Roll, 8 Count', 'health & household', 15.89, 23.99, 34, 2948, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('OFM Essentials Leather Executive Office/Computer Chair with Arms', 'home & kitchen', 55, 64.33, 15, 210, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('Linenspa 8 Inch Memory Foam and Innerspring Hybrid Mattress - Twin', 'home & kitchen', 99.99, 99.99, 0, 21, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('Pepperidge Farm, Goldfish, Classic Mix, 29 oz, Pack Of 30', 'grocery & gourmet food', 9.48, 9.48, 0, 5, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('FIJI Natural Artesian Water, 16.9 Fl Oz (Pack of 24 Bottles)', 'grocery & gourmet food', 23.99, 23.99, 0, 2136, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('Instant Pot Duo Mini 3 Qt 7-in-1 Multi- Use Programmable Pressure Cooker', 'appliances', 79.99, 79.99, 0, 59, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('Ninja Professional 72oz Countertop Blender with 1000-Watt Base', 'appliances', 89.99, 89.99, 0, 125, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('Gillette Fusion Manual Men’s Razor Blade Refills, 12 Count', 'beauty & personal care', 23.61, 47.99, 51, 593, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('LilyAna Naturals Retinol Cream Moisturizer 1.7 Oz', 'beauty & personal care', 19.99, 39.99, 50, 0, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('Echo (2nd Generation) - Smart speaker with Alexa - Charcoal Fabric', 'electronics', 99.99, 99.99, 0, 8453, 2000000)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity, product_sales)
VALUES ('TCL 55S405 55-Inch 4K Ultra HD Roku Smart LED TV (2017 Model)', 'electronics', 379.99, 599.99, 37, 0, 2000000)
;


-- INSERT departments DATA
INSERT INTO departments (department_name, over_head_costs)
VALUES ('health & household', 1000000)
;
INSERT INTO departments (department_name, over_head_costs)
VALUES ('home & kitchen', 1000000)
;
INSERT INTO departments (department_name, over_head_costs)
VALUES ('grocery & gourmet food', 1000000)
;
INSERT INTO departments (department_name, over_head_costs)
VALUES ('appliances', 1000000)
;
INSERT INTO departments (department_name, over_head_costs)
VALUES ('beauty & personal care', 1000000)
;
INSERT INTO departments (department_name, over_head_costs)
VALUES ('electronics', 1000000)
;

