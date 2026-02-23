-- Run this in PHPMyAdmin to create the contacts table
-- For XAMPP: http://localhost/phpmyadmin
-- Make sure database "velocraft" exists first

USE velocraft;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) DEFAULT NULL,
  service VARCHAR(255) DEFAULT NULL,
  message TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
