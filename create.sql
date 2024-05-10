drop schema branas cascade;
create schema branas;
create table branas.product (
	product_id integer,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight numeric,
	currency text
);

insert into branas.product (product_id, description, price, width, height, length, weight) values (1, 'A', 1000, 100, 30, 10, 3);
insert into branas.product (product_id, description, price, width, height, length, weight) values (2, 'B', 5000, 50, 50, 50, 22);
insert into branas.product (product_id, description, price, width, height, length, weight) values (3, 'C', 30, 10, 10, 10, 0.9);
insert into branas.product (product_id, description, price, width, height, length, weight) values (4, 'D', 100, 100, 30, 10, 3);

create table branas.coupon (
	code text,
	percentage numeric,
	expire_date timestamp
);

insert into branas.coupon (code, percentage, expire_date) values ('VALE20', 20, '2024-12-01T10:00:00');
insert into branas.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2024-10-01T10:00:00');

create table branas.order (
	order_id uuid,
	coupon_code text,
	email text,
	total numeric,
	freight numeric
);

create table branas.item (
	order_id uuid,
	product_id integer,
	price numeric,
	quantity integer
);