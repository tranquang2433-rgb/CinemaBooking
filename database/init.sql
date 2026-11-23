CREATE DATABASE IF NOT EXISTS cinema_booking
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cinema_booking;

CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
) ENGINE=InnoDB;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) UNIQUE,
  status ENUM('ACTIVE','INACTIVE','BLOCKED') NOT NULL DEFAULT 'ACTIVE',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(role_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_users_role_status (role_id,status)
) ENGINE=InnoDB;

CREATE TABLE genres (
  genre_id INT AUTO_INCREMENT PRIMARY KEY,
  genre_name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE movies (
  movie_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration INT NOT NULL,
  release_date DATE,
  age_rating VARCHAR(20),
  language VARCHAR(50),
  poster_url VARCHAR(500),
  trailer_url VARCHAR(500),
  format ENUM('2D','3D'),
  status ENUM('NOW_SHOWING','COMING_SOON','ENDED') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_movies_duration CHECK (duration > 0),
  INDEX idx_movies_status_release (status,release_date),
  INDEX idx_movies_title (title)
) ENGINE=InnoDB;

CREATE TABLE movie_genres (
  movie_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (movie_id,genre_id),
  CONSTRAINT fk_movie_genres_movie FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_movie_genres_genre FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_movie_genres_genre (genre_id)
) ENGINE=InnoDB;

CREATE TABLE rooms (
  room_id INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(50) NOT NULL UNIQUE,
  capacity INT NOT NULL,
  status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  CONSTRAINT chk_rooms_capacity CHECK (capacity > 0)
) ENGINE=InnoDB;

CREATE TABLE seat_types (
  seat_type_id INT AUTO_INCREMENT PRIMARY KEY,
  type_name VARCHAR(50) NOT NULL UNIQUE,
  extra_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  CONSTRAINT chk_seat_types_extra_price CHECK (extra_price >= 0)
) ENGINE=InnoDB;

CREATE TABLE seats (
  seat_id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  seat_type_id INT NOT NULL,
  row_label VARCHAR(5) NOT NULL,
  seat_number INT NOT NULL,
  status ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  CONSTRAINT uq_seats_position UNIQUE (room_id,row_label,seat_number),
  CONSTRAINT chk_seats_number CHECK (seat_number > 0),
  CONSTRAINT fk_seats_rooms FOREIGN KEY (room_id) REFERENCES rooms(room_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_seats_seat_types FOREIGN KEY (seat_type_id) REFERENCES seat_types(seat_type_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_seats_room_status (room_id,status)
) ENGINE=InnoDB;

CREATE TABLE showtimes (
  showtime_id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  room_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  base_price DECIMAL(12,2) NOT NULL,
  status ENUM('SCHEDULED','ONGOING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
  CONSTRAINT chk_showtimes_time CHECK (end_time > start_time),
  CONSTRAINT chk_showtimes_price CHECK (base_price >= 0),
  CONSTRAINT fk_showtimes_movies FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_showtimes_rooms FOREIGN KEY (room_id) REFERENCES rooms(room_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_showtimes_room_start (room_id,start_time,end_time),
  INDEX idx_showtimes_movie_start (movie_id,start_time),
  INDEX idx_showtimes_status_start (status,start_time)
) ENGINE=InnoDB;

CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  showtime_id INT NOT NULL,
  booking_code VARCHAR(30) NOT NULL UNIQUE,
  total_amount DECIMAL(12,2) NOT NULL,
  status ENUM('PENDING','PAID','FAILED','EXPIRED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  expires_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_bookings_total CHECK (total_amount >= 0),
  CONSTRAINT fk_bookings_users FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_bookings_showtimes FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_bookings_user_created (user_id,created_at),
  INDEX idx_bookings_status_expiry (status,expires_at),
  INDEX idx_bookings_showtime (showtime_id)
) ENGINE=InnoDB;

CREATE TABLE showtime_seats (
  showtime_seat_id INT AUTO_INCREMENT PRIMARY KEY,
  showtime_id INT NOT NULL,
  seat_id INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  status ENUM('AVAILABLE','HELD','BOOKED') NOT NULL DEFAULT 'AVAILABLE',
  held_until DATETIME,
  held_by_booking_id INT,
  CONSTRAINT uq_showtime_seat UNIQUE (showtime_id,seat_id),
  CONSTRAINT chk_showtime_seats_price CHECK (price >= 0),
  CONSTRAINT fk_showtime_seats_showtimes FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_showtime_seats_seats FOREIGN KEY (seat_id) REFERENCES seats(seat_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_showtime_seats_status (showtime_id,status),
  INDEX idx_showtime_seats_hold_expiry (status,held_until),
  INDEX idx_showtime_seats_holder (held_by_booking_id)
) ENGINE=InnoDB;

CREATE TABLE booking_seats (
  booking_seat_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  showtime_seat_id INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  CONSTRAINT uq_booking_seat UNIQUE (booking_id,showtime_seat_id),
  CONSTRAINT chk_booking_seats_price CHECK (price >= 0),
  CONSTRAINT fk_booking_seats_bookings FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_booking_seats_showtime_seats FOREIGN KEY (showtime_seat_id) REFERENCES showtime_seats(showtime_seat_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_booking_seats_showtime_seat (showtime_seat_id)
) ENGINE=InnoDB;

ALTER TABLE showtime_seats
  ADD CONSTRAINT fk_showtime_seats_held_by_booking
  FOREIGN KEY (held_by_booking_id) REFERENCES bookings(booking_id)
  ON UPDATE CASCADE ON DELETE SET NULL;

CREATE TABLE payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  provider VARCHAR(50) NOT NULL,
  transaction_code VARCHAR(100) UNIQUE,
  amount DECIMAL(12,2) NOT NULL,
  status ENUM('PENDING','SUCCESS','FAILED','CANCELLED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  paid_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_payments_amount CHECK (amount >= 0),
  CONSTRAINT fk_payments_bookings FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_payments_booking_status (booking_id,status)
) ENGINE=InnoDB;

CREATE TABLE tickets (
  ticket_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_seat_id INT NOT NULL UNIQUE,
  ticket_code VARCHAR(50) NOT NULL UNIQUE,
  qr_code VARCHAR(500) NOT NULL UNIQUE,
  status ENUM('VALID','USED','CANCELLED') NOT NULL DEFAULT 'VALID',
  used_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tickets_booking_seats FOREIGN KEY (booking_seat_id) REFERENCES booking_seats(booking_seat_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_tickets_status (status)
) ENGINE=InnoDB;

CREATE TABLE notifications (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_users FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX idx_notifications_user_read_created (user_id,is_read,created_at)
) ENGINE=InnoDB;

INSERT IGNORE INTO roles (role_name,description) VALUES
('ADMIN','System administrator'),
('CUSTOMER','Customer who books cinema tickets');

INSERT IGNORE INTO genres (genre_name,description) VALUES
('Hành động','Phim hành động'),
('Hài','Phim hài'),
('Tình cảm','Phim tình cảm'),
('Kinh dị','Phim kinh dị'),
('Hoạt hình','Phim hoạt hình');

INSERT IGNORE INTO seat_types (type_name,extra_price) VALUES
('STANDARD',0),('VIP',30000),('COUPLE',50000);
