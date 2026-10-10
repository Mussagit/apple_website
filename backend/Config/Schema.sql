-- ==========================================
-- 1. PRODUCTS TABLE (PARENT TABLE)
-- ==========================================

CREATE TABLE IF NOT EXISTS product_table (
    product_id INT AUTO_INCREMENT,
    product_url VARCHAR(255) NOT NULL,
    product_name VARCHAR(100) NOT NULL,

    PRIMARY KEY (product_id)
);


-- ==========================================
-- 2. PRODUCT DESCRIPTION TABLE
--    CHILD TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS product_description_table (
    description_id INT AUTO_INCREMENT,
    product_id INT NOT NULL,

    product_brief_description TEXT NOT NULL,
    product_description TEXT NOT NULL,
    product_img VARCHAR(500) NOT NULL,
    product_link VARCHAR(500) NOT NULL,

    PRIMARY KEY (description_id),

    CONSTRAINT fk_description_product
        FOREIGN KEY (product_id)
        REFERENCES product_table(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ==========================================
-- 3. PRODUCT PRICE TABLE
--    CHILD TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS product_price_table (
    price_id INT AUTO_INCREMENT,
    product_id INT NOT NULL,

    starting_price VARCHAR(50) NOT NULL,
    price_range VARCHAR(255) NOT NULL,

    PRIMARY KEY (price_id),

    CONSTRAINT fk_price_product
        FOREIGN KEY (product_id)
        REFERENCES product_table(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ==========================================
-- 4. USER TABLE
--    ADDITIONAL TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS user_table (
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    user_password VARCHAR(255) NOT NULL,

    PRIMARY KEY (user_id)
);


-- ==========================================
-- 5. ORDERS TABLE
--    CHILD TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS orders_table (
    order_id INT AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT NOT NULL,

    PRIMARY KEY (order_id),

    CONSTRAINT fk_order_product
        FOREIGN KEY (product_id)
        REFERENCES product_table(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_order_user
        FOREIGN KEY (user_id)
        REFERENCES user_table(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);