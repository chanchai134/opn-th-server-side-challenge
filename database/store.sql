--
-- please use PostgreSQL database.
--

--0 Add postgis for location POINT type
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;

--1 Customer
CREATE TABLE "Customer" (
    email character varying(255) PRIMARY KEY NOT NULL,
    name character varying(255) NOT NULL,
    date_of_birth date NOT NULL,
    gender bit(1) NOT NULL,
    location geometry(Point) NOT NULL
);

INSERT INTO "Customer" (email, name, date_of_birth, gender, location) VALUES
    ('chanchai511142@gma.com', 'chanchai', '1998-04-15', '1', 'POINT(13.7658905 100.5670252)');


--2 Product
CREATE TABLE "Product" (
    product_id uuid PRIMARY KEY NOT NULL,
    name character varying(255) NOT NULL
);

INSERT INTO "Product" (product_id, name) VALUES
    ('3855620d-b4a7-465b-bc35-9fd0fda508c5', 'T-shirt');

--3 Category
CREATE TABLE "Category" (
    category_code character varying(255) PRIMARY KEY NOT NULL,
    name character varying(255) NOT NULL UNIQUE
);

INSERT INTO "Category" (category_code, name) VALUES
    ('FASHION', 'fashion clothes'),
    ('SHIRT', 'shirt');

--4 CategoryProduct
CREATE TABLE "CategoryProduct" (
    product_id uuid NOT NULL REFERENCES "Product"(product_id),
    category_code character varying(255) NOT NULL REFERENCES "Category"(category_code),
    UNIQUE (product_id, category_code)
);

INSERT INTO "CategoryProduct" (product_id, category_code) VALUES
    ('3855620d-b4a7-465b-bc35-9fd0fda508c5', 'FASHION'),
    ('3855620d-b4a7-465b-bc35-9fd0fda508c5', 'SHIRT');

--5 VariationGroup
CREATE TABLE "VariationGroup" (
    group_id uuid PRIMARY KEY NOT NULL,
    name character varying(255) NOT NULL UNIQUE
);

INSERT INTO "VariationGroup" (group_id, name) VALUES
    ('2f33d69d-3a3f-48cd-a6bf-477be05e92c7', 'Size');

--6 VariationValue
CREATE TABLE "VariationValue" (
    id uuid PRIMARY KEY NOT NULL,
    name character varying(255) NOT NULL,
    group_id uuid NOT NULL REFERENCES "VariationGroup"(group_id)
);

INSERT INTO "VariationValue" (id, name, group_id) VALUES
    ('b4055fe3-6da4-42ff-a466-24f59575954a', 'S', '2f33d69d-3a3f-48cd-a6bf-477be05e92c7'),
    ('e69ee066-b882-4bad-9a33-540bca0da289', 'M', '2f33d69d-3a3f-48cd-a6bf-477be05e92c7'),
    ('ef64caec-0502-41df-9a97-9a908883b7c9', 'L', '2f33d69d-3a3f-48cd-a6bf-477be05e92c7'),
    ('fbc37de6-685c-47a8-a6c3-f7de0aa07fde', 'XL', '2f33d69d-3a3f-48cd-a6bf-477be05e92c7');

--7 ProductStock
CREATE TABLE "ProductStock" (
    id uuid PRIMARY KEY NOT NULL,
    product_id uuid NOT NULL REFERENCES "Product"(product_id),
    variation_value_id uuid NOT NULL REFERENCES "VariationValue"(id),
    remain integer NOT NULL,
    UNIQUE (product_id, variation_value_id)
);

INSERT INTO "ProductStock" (id, product_id, variation_value_id, remain) VALUES
    ('13ba5265-1f04-4613-b3c8-a907d2ec7afa', '3855620d-b4a7-465b-bc35-9fd0fda508c5', 'b4055fe3-6da4-42ff-a466-24f59575954a', 10),
    ('a93ea10b-362a-433b-ab92-d18fc6dfc015', '3855620d-b4a7-465b-bc35-9fd0fda508c5', 'e69ee066-b882-4bad-9a33-540bca0da289', 5),
    ('2aadf258-d3bc-4d84-87ce-19f42db7382a', '3855620d-b4a7-465b-bc35-9fd0fda508c5', 'ef64caec-0502-41df-9a97-9a908883b7c9', 1),
    ('918e51ed-5bd2-452e-9cc2-36f21cdaa562', '3855620d-b4a7-465b-bc35-9fd0fda508c5', 'fbc37de6-685c-47a8-a6c3-f7de0aa07fde', 2);

--8 Cart table
CREATE TABLE "Cart" (
    cart_id uuid PRIMARY KEY NOT NULL,
    customer_email character varying(255) NOT NULL REFERENCES "Customer"(email),
    status character varying(255) NOT NULL
);

INSERT INTO "Cart" (cart_id, customer_email, status) VALUES
    ('9b70d78e-91ca-4553-a921-cb6f16ac0abf', 'chanchai511142@gma.com', 'Finished');


--9 CartItem
CREATE TABLE "CartItem" (
    cart_id uuid NOT NULL REFERENCES "Cart"(cart_id),
    product_stock_id uuid NOT NULL REFERENCES "ProductStock"(id),
    amount integer NOT NULL,
    UNIQUE (cart_id, product_stock_id)
);

INSERT INTO "CartItem" (cart_id, product_stock_id, amount) VALUES
    ('9b70d78e-91ca-4553-a921-cb6f16ac0abf', '2aadf258-d3bc-4d84-87ce-19f42db7382a', 8),
    ('9b70d78e-91ca-4553-a921-cb6f16ac0abf', 'a93ea10b-362a-433b-ab92-d18fc6dfc015', 1);
