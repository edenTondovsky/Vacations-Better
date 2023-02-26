-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2023 at 09:11 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(7, 108),
(7, 111),
(7, 112),
(7, 113),
(7, 114),
(7, 118),
(7, 120),
(7, 122),
(17, 108),
(17, 109),
(17, 112),
(17, 113),
(17, 114);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Eden', 'Tondovsky', 'eden19197@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'Admin'),
(7, 'עדן', 'טונדובסקי', 'eden@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(8, 'dana', 'davidi', 'dana@gmail.com', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d', 'User'),
(9, 'roni', 'shalev', 'roni@gmail.com', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d', 'User'),
(10, 'עדן', 'tondovsky', 'eden1@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(17, 'me', 'anyb', 'me@co.il', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(108, 'Amsterdam', 'Amsterdam is a vibrant and picturesque city located in the Netherlands, known for its charming canals,\r\n historic architecture, world-class museums, and lively nightlife, making it a popular destination for travelers seeking both culture and fun.', '2023-02-25', '2023-02-28', '790.00', 'c616cc9e-4a8b-49e1-be86-b94e5958f8c8.jpg'),
(109, 'Peru', 'Peru is a breathtaking country located in South America, known for its rich history, diverse landscapes, and vibrant culture. From the ancient Inca ruins of Machu Picchu and the colorful colonial architecture of Lima, to the stunning natural wonders of the Amazon rainforest and the soaring Andes mountains, Peru offers a truly unique and unforgettable travel experience.', '2023-03-03', '2023-03-03', '899.00', '1798d42d-b54e-46aa-a7e6-b640ccb5d9e4.jpeg'),
(110, 'Berlin', 'Berlin is a cosmopolitan city in the heart of Germany, known for its fascinating history, diverse arts and culture scene, and modern, innovative spirit. From the iconic Brandenburg Gate and the remnants of the Berlin Wall, to the trendy cafes, galleries and nightlife of neighborhoods like Kreuzberg and Prenzlauer Berg, Berlin offers a captivating blend of old and new, tradition and innovation, making it a must-see destination for any traveler.', '2023-03-08', '2023-03-14', '350.00', '5223a136-54fa-4d28-b883-8aff577759bc.jpeg'),
(111, 'Italy', 'Italy is a stunning country in Southern Europe, known for its rich history, breathtaking art and architecture, and world-renowned cuisine. From the ancient ruins of Rome and the iconic canals of Venice, to the picturesque Tuscan countryside and the glamorous Amalfi Coast, Italy offers a wealth of diverse and beautiful destinations for travelers to explore. With its vibrant culture, warm hospitality, and timeless beauty, Italy is a truly unforgettable travel experience.', '2023-03-27', '2023-04-06', '670.00', '3655f15f-5bd1-46db-9fdc-3e3fe22ea52d.jpeg'),
(112, 'Bolivia', 'Bolivia is a fascinating and diverse country in South America, known for its rugged landscapes, colorful indigenous cultures, and unique blend of tradition and modernity. From the breathtaking peaks of the Andes mountains and the vast salt flats of Uyuni, to the bustling cities of La Paz and Santa Cruz, Bolivia offers a wealth of natural and cultural attractions for travelers to discover. With its friendly people, rich history, and stunning scenery, Bolivia is a destination that will leave a lasting impression on any visitor.', '2023-03-25', '2023-04-03', '890.00', '6fae4b64-58c1-4c52-a9b0-7ce4f7ceed5d.jpg'),
(113, 'Prague', 'Prague is a charming city in the heart of Europe, famous for its stunning architecture, rich history, and vibrant culture. From the iconic Charles Bridge to the colorful Old Town Square, Prague offers a wealth of attractions for travelers to discover. With its fairy-tale charm and romantic ambiance, Prague is a must-visit destination for anyone traveling to Europe.', '2023-03-09', '2023-03-15', '400.00', '60f9810f-cc86-479d-926f-e4239d4135af.jpg'),
(114, 'Brazil', 'Brazil is a vast and diverse country in South America, known for its stunning natural beauty, vibrant culture, and lively festivals. From the lush Amazon rainforest and the towering waterfalls of Iguazu, to the sun-kissed beaches of Rio de Janeiro and the colorful streets of Salvador, Brazil offers a wealth of unique and unforgettable travel experiences. With its friendly people, delicious cuisine, and rich history, Brazil is a destination that will capture your heart and leave you wanting more.', '2023-02-28', '2023-03-21', '1200.00', '605645a7-c8af-4048-bd1b-733aec65a87e.jpeg'),
(115, 'Turkey', 'Welcome to Turkey, a land of ancient wonders, stunning landscapes, and vibrant culture that\'s waiting to be explored. With its warm hospitality, delicious cuisine, and rich history, Turkey offers a unique and unforgettable travel experience. Explore the ancient ruins of Ephesus, marvel at the fairy chimneys of Cappadocia, or soak up the vibrant atmosphere of Istanbul\'s bazaars and cafes. And with its beautiful beaches, crystal-clear waters, and picturesque villages, the Mediterranean coast is the perfect place to unwind and soak up the sun. So pack your bags and get ready for a journey you\'ll never forget in Turkey!', '2023-03-04', '2023-03-11', '299.00', '7bdebfdd-e199-46d1-907f-262db6bf8ee5.jpeg'),
(116, 'Moscow', 'Moscow, the vibrant capital of Russia, offers a unique blend of history, modernity, and culture. Explore iconic landmarks like the Red Square and the Kremlin, sample traditional Russian cuisine, and soak up the city\'s unique atmosphere in lively neighborhoods like Arbat and Kitay-Gorod. With its fascinating history, world-class museums, and warm hospitality, Moscow is a must-visit destination for any traveler.', '2023-03-06', '2023-03-20', '699.00', 'e7729850-df61-4a8f-abfd-10aed36b5aa0.jpg'),
(117, 'Mexico', 'Mexico is a vibrant and colorful country in North America, known for its stunning beaches, rich history, and vibrant culture. From the ancient ruins of Chichen Itza and the vibrant markets of Mexico City, to the beautiful beaches of Cancun and the charming colonial towns of Oaxaca, Mexico offers a wealth of diverse and unforgettable travel experiences. Sample delicious cuisine, explore vibrant neighborhoods, and soak up the warm hospitality of the Mexican people. With its unique blend of history, culture, and natural beauty, Mexico is a destination that will captivate and inspire you.', '2023-03-27', '2023-04-27', '2300.00', '17f77308-a06a-4e59-81fb-ca2b76c4141b.jpg'),
(118, 'Zanzibar', 'Zanzibar is a tropical paradise off the coast of Tanzania, known for its pristine beaches, crystal-clear waters, and rich culture. Explore the historic Stone Town, snorkel in turquoise waters, and sample delicious seafood cuisine. With warm hospitality and stunning natural beauty, Zanzibar is a must-visit destination for any traveler seeking relaxation and adventure.', '2023-03-28', '2023-04-11', '2500.00', '44cdd40f-6759-4f59-9dd0-2062d2a0e79c.jpg'),
(119, 'Switzerland', 'Switzerland is a breathtaking country of snow-capped mountains, pristine lakes, and charming villages. Sample delicious Swiss chocolate and cheese, hike through stunning alpine landscapes, and soak up the country\'s unique atmosphere. With its warm hospitality and stunning natural beauty, Switzerland is a must-visit destination for any traveler seeking adventure and relaxation.', '2023-03-25', '2023-04-07', '760.00', '22934d28-d3c8-4db3-843f-be2c4c1bd4b3.jpg'),
(120, 'Thailand', 'Thailand is a land of smiles, known for its warm hospitality, stunning beaches, and vibrant culture. From the bustling streets of Bangkok and the ancient ruins of Ayutthaya, to the idyllic islands of Phuket and Koh Samui, Thailand offers a wealth of diverse and unforgettable travel experiences. Sample delicious street food, explore colorful markets, and immerse yourself in the country\'s rich history and culture. With its stunning natural beauty, welcoming locals, and affordable prices, Thailand is a destination that will leave you feeling inspired and energized.', '2023-04-12', '2023-04-29', '1200.00', 'cf00dc69-dbac-4a93-8dc6-5fe6e3faa876.jpg'),
(121, 'India', 'India is a land of contrasts, where ancient traditions blend with modernity and bustling cities coexist with serene natural beauty. From the iconic Taj Mahal to the Himalayas, India offers diverse and unforgettable travel experiences. Sample delicious cuisine, explore vibrant markets, and immerse yourself in the country\'s rich history and culture. With its warm hospitality and stunning architecture, India is a must-visit destination for any traveler seeking adventure and inspiration.', '2023-03-26', '2023-04-12', '899.00', '40c3ce26-c72c-4ac9-aca7-b1a646ee4a8e.jpg'),
(122, 'New York City', 'New York City is a vibrant and bustling metropolis, known for its iconic landmarks, world-class museums, and diverse culinary scene. From the towering Empire State Building and the serene Central Park, to the dazzling lights of Times Square and the trendy neighborhoods of Brooklyn, New York offers a wealth of diverse and unforgettable travel experiences. With its energy, creativity, and endless entertainment options, New York is a must-visit destination for any traveler seeking excitement and inspiration.', '2023-04-20', '2023-05-04', '2950.00', 'ed0a82c0-fd06-4b4c-8870-2173e6d4294e.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacaticionId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
