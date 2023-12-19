CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_age INT NOT NULL,
    user_gender VARCHAR(10) NOT NULL,
    user_phone VARCHAR(15) NOT NULL,
    user_batch_time VARCHAR(10) NOT NULL,
    user_start_date DATE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    fee_status BOOLEAN DEFAULT true
);
