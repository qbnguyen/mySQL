DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(30) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Peanut Butter", "food", 2.50, 30),
("Ninja blender", "appliances", 80, 5),
("Dining table", "furniture", 100, 2),
("MacBook Pro", "electronics", 1500, 7), 
("Ipad Air 2", "electronics", 600, 6), 
("Leather Office Chair", "electronics", 100, 3), 
("Knife Set", "home goods", 120, 9), 
("Sony Camera", "electronics", 400, 10), 
("Modern NightStand", "home goods", 90, 10),
("Floor lamp", "furniture", 80, 2);
