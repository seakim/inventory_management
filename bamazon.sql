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
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Bounty Select-a-Size Paper Towels, White, Huge Roll, 8 Count', 'health & household', 15.89, 23.99, 34, 2948)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Puritan\'s Pride Garlic Oil 5,000mg, 250 Rapid Release Softgels', 'health & household', 14.95, 14.95, 0, 2)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('OFM Essentials Leather Executive Office/Computer Chair with Arms', 'home & kitchen', 55, 64.33, 15, 210)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Linenspa 8 Inch Memory Foam and Innerspring Hybrid Mattress - Twin', 'home & kitchen', 99.99, 99.99, 0, 21)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Pepperidge Farm, Goldfish, Classic Mix, 29 oz, Pack Of 30', 'grocery & gourmet food', 9.48, 9.48, 0, 5)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('FIJI Natural Artesian Water, 16.9 Fl Oz (Pack of 24 Bottles)', 'grocery & gourmet food', 23.99, 23.99, 0, 2136)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Instant Pot Duo Mini 3 Qt 7-in-1 Multi- Use Programmable Pressure Cooker, Slow Cooker', 'appliances', 79.99, 79.99, 0, 59)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Ninja Professional 72oz Countertop Blender with 1000-Watt Base', 'appliances', 89.99, 89.99, 0, 125)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Gillette Fusion Manual Men’s Razor Blade Refills, 12 Count', 'beauty & personal care', 23.61, 47.99, 51, 593)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('LilyAna Naturals Retinol Cream Moisturizer 1.7 Oz', 'beauty & personal care', 19.99, 39.99, 50, 0)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('Echo (2nd Generation) - Smart speaker with Alexa - Charcoal Fabric', 'electronics', 99.99, 99.99, 0, 8453)
;
INSERT INTO products (product_name, department_name, price, list_price, discount_rate, stock_quantity)
VALUES ('TCL 55S405 55-Inch 4K Ultra HD Roku Smart LED TV (2017 Model)', 'electronics', 379.99, 599.99, 37, 0)
;


