create database grupo16;
use grupo16;

create table categorys(
category_id int NOT NULL auto_increment,
category_name varchar(60) NOT NULL,
primary key (category_id)
);
create table users(
user_id int NOT NULL auto_increment,
user_dni int NOT NULL unique,
user_name varchar(40) NOT NULL,
user_image varchar(60) ,
user_address varchar(40) NOT NULL,
user_pass varchar(35) NOT NULL,
user_is_admin boolean,
primary key (user_id)
);

create table orders(
order_id int NOT NULL auto_increment,
order_date timestamp NOT NULL,
order_status boolean NOT NULL,
primary key (order_id)
);

create table products(
product_id int NOT NULL auto_increment,
product_name varchar(50) NOT NULL,
product_price int NOT NULL,
product_description varchar(180) NOT NULL,
product_image_front varchar(60) NOT NULL,
product_image_back varchar(60) NOT NULL,
category_id int NOT NULL,
primary key (product_id),
foreign key (category_id) references categorys(category_id)
);

create table orders_products(
order_products_id int NOT NULL auto_increment,
order_id int NOT NULL,
product_id int NOT NULL,
primary key (order_products_id),
foreign key (order_id) references orders(order_id),
foreign key (product_id) references products(product_id)
);


insert into categorys(category_name) values("La Liga");
insert into categorys(category_name) values("Serie A");
insert into categorys(category_name) values("Premier League");
insert into categorys(category_name) values("Primera Division Argentina");
insert into categorys(category_name) values("MLS");
insert into categorys(category_name) values("Selecciones Mundiales");
insert into categorys(category_name) values("Primera Division Colombiana");

insert into products(product_name, product_price, product_description, product_image_front, product_image_back, category_id) values("Camiseta Argentina", 20000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "image-default.png", "image-default.png", 6);
insert into products(product_name, product_price, product_description, product_image_front, product_image_back, category_id) values("Camiseta Millonarios", 18000, "Camiseta marca Adidas, manga corta, tela antitranspirante sin numeración.", "image-default.png", "image-default.png", 7);



insert into users(user_dni, user_name, user_image, user_adress, user_pass, user_is_admin) values(2, "admin", "image_user_default.png", "Avenida 111", "admin",true);
insert into users(user_dni, user_name, user_image, user_adress, user_pass, user_is_admin) values(33, "user", "image_user_default.png", "asd 123", "user",false);


