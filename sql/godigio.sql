-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 03, 2016 at 12:46 PM
-- Server version: 5.5.44-MariaDB-cll-lve
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `visionpa_DemoDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Datenight`
--

CREATE TABLE IF NOT EXISTS `Datenight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `datetype` tinyint(1) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `Datenight`
--

INSERT INTO `Datenight` (`id`, `user`, `datetype`, `date`, `time`, `description`) VALUES
(1, 1, 0, '2016-02-13', '19:00:00', 'Valentine%27s%20masquerade%20ball.'),
(2, 2, 0, '2016-02-14', '14:09:00', 'My%20place'),
(6, 2, 0, '0002-02-16', '00:00:05', 'my house'),
(5, 2, 2, '0000-00-00', '00:00:06', 'night out on the town'),
(7, 3, 3, '2016-02-26', '22:45:00', 'let%27s get it!!!'),
(8, 18, 2, '2016-03-05', '21:30:00', 'let%27s go dutching lol');

-- --------------------------------------------------------

--
-- Table structure for table `DatenightInvites`
--

CREATE TABLE IF NOT EXISTS `DatenightInvites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datenight` int(11) NOT NULL,
  `invitee` int(11) NOT NULL,
  `invited` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `datenight` (`datenight`,`invitee`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `DatenightInvites`
--

INSERT INTO `DatenightInvites` (`id`, `datenight`, `invitee`, `invited`) VALUES
(3, 5, 1, 0),
(4, 2, 3, 0),
(5, 1, 2, 0),
(6, 2, 18, 0),
(7, 6, 18, 0),
(8, 8, 2, 0),
(9, 6, 3, 0),
(10, 7, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `DatenightLikes`
--

CREATE TABLE IF NOT EXISTS `DatenightLikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datenight` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `datenight` (`datenight`),
  KEY `user` (`user`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE IF NOT EXISTS `Likes` (
  `user` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  KEY `user` (`user`),
  KEY `likes` (`likes`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Likes`
--

INSERT INTO `Likes` (`user`, `likes`) VALUES
(3, 7),
(2, 3),
(1, 2),
(2, 7),
(3, 16),
(15, 1),
(3, 15),
(18, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE IF NOT EXISTS `Messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromuser` int(11) NOT NULL,
  `touser` int(11) NOT NULL,
  `text` varchar(800) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `messageread` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fromuser` (`fromuser`),
  KEY `touser` (`touser`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=90 ;

--
-- Dumping data for table `Messages`
--

INSERT INTO `Messages` (`id`, `fromuser`, `touser`, `text`, `timestamp`, `messageread`) VALUES
(1, 2, 5, 'Hi%20Kinne', '2016-01-26 09:24:20', NULL),
(2, 3, 6, 'hey%20dj', '2016-01-26 09:43:37', NULL),
(3, 2, 3, 'hey%20hun', '2016-01-26 09:54:52', 1),
(4, 3, 2, 'hey%20whats%20good', '2016-01-26 09:59:06', 1),
(5, 3, 2, NULL, '2016-01-26 09:59:08', 1),
(6, 3, 2, 'hey', '2016-01-28 19:03:47', 1),
(7, 3, 2, 'hey%20what%27s%20up', '2016-01-30 22:26:03', 1),
(8, 3, 2, NULL, '2016-01-30 22:26:07', 1),
(9, 15, 1, 'Hi there hun.', '2016-02-24 13:13:31', 1),
(10, 1, 15, 'Hey there.  How are you?', '2016-02-24 13:14:17', 1),
(11, 15, 1, 'I am fine and you?', '2016-02-24 13:15:09', 1),
(12, 1, 15, 'I%27m doing well.  What are you up to?', '2016-02-24 13:16:55', 1),
(13, 15, 1, 'Just chillin  You?', '2016-02-24 13:21:17', 1),
(14, 1, 15, 'Same here.', '2016-02-24 13:22:14', 1),
(15, 1, 15, 'Got any weekend plans?', '2016-02-24 13:29:32', 1),
(16, 15, 1, 'I%27m hoping to get some.  How about you?', '2016-02-24 13:32:05', 1),
(17, 1, 15, 'Maybe we should make plans together.', '2016-02-24 19:09:59', 1),
(18, 15, 1, 'I like the sound of that!', '2016-02-24 19:14:57', 1),
(19, 15, 1, 'What kinds of activities do you like?', '2016-02-24 19:26:56', 1),
(20, 1, 15, 'I like just about anything.', '2016-02-24 19:29:59', 1),
(21, 15, 1, 'Great!  So how about bowling Saturday night?', '2016-02-24 19:34:38', 1),
(22, 1, 15, 'That sounds awesome!', '2016-02-24 19:37:34', 1),
(23, 15, 1, 'Cool.  So how about the one in Hendersonville?', '2016-02-24 19:40:01', 1),
(24, 1, 15, 'Sure.  Just send me the address.', '2016-02-24 20:29:42', 1),
(25, 15, 1, 'Okay.  Let me look it up.', '2016-02-24 20:30:13', 1),
(26, 1, 15, 'What time are you thinking about?', '2016-02-24 20:31:28', 1),
(27, 15, 1, 'About 8 pm?', '2016-02-24 20:32:34', 1),
(28, 1, 15, 'That sounds good to me.', '2016-02-24 20:49:48', 1),
(29, 15, 1, 'Cool.  I%27m looking forward to meeting you.', '2016-02-24 20:50:11', 1),
(30, 1, 15, 'Me too!', '2016-02-24 20:50:29', 1),
(31, 3, 15, 'Hey', '2016-02-24 23:52:17', 1),
(32, 16, 3, 'Hi', '2016-02-25 00:09:55', 1),
(33, 2, 3, 'yo yo', '2016-02-25 20:27:00', 1),
(34, 3, 2, 'what%27s good hun\n', '2016-02-25 20:27:56', 1),
(35, 3, 2, 'Hey pretty what the move like? Lol', '2016-03-01 15:00:13', 1),
(36, 1, 15, 'Hi there cutie.', '2016-03-01 17:53:16', 1),
(37, 15, 1, 'Hello again.', '2016-03-01 17:54:15', 1),
(38, 1, 15, 'Hi there.', '2016-03-01 17:54:25', 1),
(39, 15, 1, 'How was your weekend?\n', '2016-03-01 17:54:38', 1),
(40, 15, 1, 'Hey.  Still there?', '2016-03-01 17:56:25', 1),
(41, 1, 15, 'Yes.  I%27m still here.', '2016-03-01 17:56:45', 1),
(42, 15, 1, 'Okay.  I asked how was your weekend.', '2016-03-01 17:56:59', 1),
(43, 1, 15, 'Oh.  That message didn%27t come through.', '2016-03-01 17:57:12', 1),
(44, 15, 1, 'Hmm....I wonder what happened.', '2016-03-01 17:57:23', 1),
(45, 1, 15, 'Not sure.  I%27ll check the chat logs.', '2016-03-01 17:57:40', 1),
(46, 15, 1, NULL, '2016-03-01 17:57:43', 1),
(47, 15, 1, 'Hmmm....it just sent a message that I had tried to send earlier.  The %22Hi there hun%22 message.', '2016-03-01 17:58:54', 1),
(48, 1, 15, 'That%27s odd.', '2016-03-01 17:59:06', 1),
(49, 1, 2, 'Hello Damita.  How are you?', '2016-03-02 12:59:16', 1),
(50, 2, 1, 'I got it', '2016-03-02 13:01:21', 1),
(51, 2, 3, 'hey boo', '2016-03-02 13:02:08', 1),
(52, 1, 2, 'Great!', '2016-03-02 13:02:19', 1),
(53, 2, 1, 'Great!', '2016-03-02 13:02:57', 1),
(54, 1, 2, 'I hope this goes through without you having to refresh.', '2016-03-02 13:03:38', 1),
(55, 1, 2, 'Here is another message.', '2016-03-02 13:04:29', 1),
(56, 3, 2, 'hey dj hope your having a good day!! let me know if your getting this message okay...', '2016-03-03 11:00:39', 1),
(57, 2, 3, 'got it!', '2016-03-03 20:02:28', 1),
(58, 3, 17, 'hey hun', '2016-03-04 18:56:54', NULL),
(59, 3, 17, NULL, '2016-03-04 18:56:54', NULL),
(60, 2, 3, 'yo yo', '2016-03-04 19:16:46', 1),
(61, 18, 2, 'hey hun nice pic, who%27s your friend and do she get%27s down with the get down??? lol', '2016-03-04 19:19:08', 1),
(62, 2, 3, 'close your box after i send this message and tell me if you get my next message', '2016-03-04 19:19:12', 1),
(63, 2, 3, 'tell me when you close it\n', '2016-03-04 19:19:36', 1),
(64, 18, 2, 'what%27s really good for tonight??', '2016-03-04 19:22:43', 1),
(65, 18, 2, 'what%27s really good for tonight??', '2016-03-04 19:22:43', 1),
(66, 2, 3, 'nevr mind.  i see i had to refresh to see the other messages\n', '2016-03-04 19:24:16', 1),
(67, 3, 2, 'hey dj i was texting you from my other profile page!! did you get any the messages?', '2016-03-04 19:27:41', 1),
(68, 2, 18, 'yup yup lol', '2016-03-04 19:41:00', NULL),
(69, 2, 3, 'whats up playa', '2016-03-04 19:41:16', 1),
(70, 2, 1, 'test message.  hey john', '2016-03-04 19:41:40', NULL),
(71, 3, 2, 'what did you have for lunch today???', '2016-03-04 19:42:05', 1),
(72, 2, 3, 'chicken', '2016-03-04 19:43:53', 1),
(73, 2, 3, 'i got it', '2016-03-04 19:45:32', 1),
(74, 3, 2, 'tell me a crazy secret of yours hun', '2016-03-04 19:46:37', 1),
(75, 2, 3, 'im a lesbian lol', '2016-03-04 19:47:54', 1),
(76, 3, 2, 'what are some of your fears', '2016-03-04 19:48:56', 1),
(77, 2, 3, 'falling in love', '2016-03-04 19:49:44', 1),
(78, 3, 2, 'yooo who in the hell is the girl in the pic and odes she gets down with the get down?? lolllll', '2016-03-04 19:50:22', 1),
(79, 2, 3, 'my side boo', '2016-03-04 19:52:13', 1),
(80, 2, 19, 'hi', '2016-03-07 12:24:46', 1),
(81, 2, 19, NULL, '2016-03-07 12:24:48', 1),
(82, 19, 2, 'Hello back!', '2016-03-07 12:25:04', 1),
(83, 3, 2, 'Dj are you online?', '2016-04-17 13:21:19', NULL),
(84, 3, 2, 'I see you online ', '2016-04-17 15:11:35', NULL),
(85, 2, 3, 'How about now', '2016-04-17 15:34:12', 1),
(86, 3, 2, 'I see on now', '2016-04-17 15:38:22', NULL),
(87, 3, 2, 'Djjjjj wyd over there?', '2016-04-17 15:48:22', NULL),
(88, 2, 1, 'Hey John', '2016-04-17 15:52:05', NULL),
(89, 3, 20, 'So what do you think so far', '2016-04-20 10:58:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Recovery`
--

CREATE TABLE IF NOT EXISTS `Recovery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `token` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `Recovery`
--

INSERT INTO `Recovery` (`id`, `user`, `token`) VALUES
(1, 1, '{7E5F9613-2DB4-6CE8-FCBB-8F247E132453}'),
(2, 1, '{5E7665F3-A11D-6FDC-39FC-ABAA0EB1413B}'),
(3, 1, '{94B50307-F457-4947-1BB9-E56136F5A014}'),
(4, 1, '{90947615-E1F5-52F9-D673-4BDCD486B9B2}'),
(5, 1, '5180E0F8-C2FC-4500-94C5-DD0FB8CDF039'),
(6, 1, 'com_create_guid'),
(7, 1, '9C144168-F6F4-4B3F-A791-63D0EE0DF056');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(80) DEFAULT NULL,
  `last_name` varchar(80) DEFAULT NULL,
  `username` varchar(40) NOT NULL,
  `headline` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `seeking` tinyint(1) NOT NULL,
  `looking` tinyint(1) DEFAULT NULL,
  `marital` tinyint(1) DEFAULT NULL,
  `ethnicity` tinyint(1) DEFAULT NULL,
  `ambition` tinyint(1) DEFAULT NULL,
  `eyecolor` tinyint(1) DEFAULT NULL,
  `ownscar` tinyint(1) DEFAULT NULL,
  `education` tinyint(1) DEFAULT NULL,
  `wantschildren` tinyint(1) DEFAULT NULL,
  `drugs` tinyint(1) DEFAULT NULL,
  `religion` tinyint(1) DEFAULT NULL,
  `haircolor` tinyint(1) DEFAULT NULL,
  `bodytype` tinyint(1) DEFAULT NULL,
  `height` tinyint(1) DEFAULT NULL,
  `income` tinyint(1) DEFAULT NULL,
  `secondlanguage` tinyint(1) DEFAULT NULL,
  `haschildren` tinyint(1) DEFAULT NULL,
  `smokes` tinyint(1) DEFAULT NULL,
  `drinks` tinyint(1) DEFAULT NULL,
  `profession` varchar(20) DEFAULT NULL,
  `description` varchar(8000) DEFAULT NULL,
  `interests` varchar(800) DEFAULT NULL,
  `activities` varchar(800) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` tinyint(1) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `profileimage` varchar(30) DEFAULT NULL,
  `image0` varchar(30) DEFAULT NULL,
  `image1` varchar(30) DEFAULT NULL,
  `image2` varchar(30) DEFAULT NULL,
  `image3` varchar(30) DEFAULT NULL,
  `image4` varchar(30) DEFAULT NULL,
  `last_online` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `first_name`, `last_name`, `username`, `headline`, `email`, `password`, `gender`, `seeking`, `looking`, `marital`, `ethnicity`, `ambition`, `eyecolor`, `ownscar`, `education`, `wantschildren`, `drugs`, `religion`, `haircolor`, `bodytype`, `height`, `income`, `secondlanguage`, `haschildren`, `smokes`, `drinks`, `profession`, `description`, `interests`, `activities`, `city`, `country`, `zip`, `state`, `dob`, `profileimage`, `image0`, `image1`, `image2`, `image3`, `image4`, `last_online`) VALUES
(1, 'John', 'Drake', 'jmdrake', 'I%27m the man...I%27m the man...', 'johnmdrake@gmail.com', 'acespade', 0, 1, 0, 2, 0, 1, 0, 0, 5, 1, 0, 10, 2, 3, 13, 0, 0, 0, 0, 0, 'Freelance web develo', 'Not sure what to put here.', 'That depends on what interests  you.', 'I%27m open.', 'Nashville', 127, '37207', 49, '1968-07-29', '0', 'user1image0.png', 'user1image1.jpeg', NULL, NULL, NULL, '2016-04-30 10:00:34'),
(7, 'Shay', NULL, 'Shay954', 'ShayChevy', 'Chelchev@gmail.com', 'girltoy22', 1, 2, 1, 1, 0, 2, 0, NULL, 3, 1, 0, 10, 2, 4, 6, 0, NULL, 0, 1, 1, NULL, NULL, 'Real Estate, Cooking, Watching Realty Shows', NULL, 'Atlanta', 127, NULL, 12, '1987-06-29', '0', 'user7image0.jpeg', NULL, NULL, NULL, NULL, '2016-02-17 13:05:49'),
(2, 'Damita Jo', 'Jackson', 'Damitajo1', 'Looking for love', 'msdjo1@gmail.com', 'Madi2008', 1, 2, 0, NULL, 0, 2, 0, 0, 1, 1, 0, 14, 2, 2, 1, 2, NULL, 1, 0, 2, 'Cosmetologist', 'Pretty and fun', 'Reading and writing', 'Bowling and skating', 'DETROIT', 127, '30345', 26, '1979-09-19', '3', 'user2image0.jpeg', 'user2image1.png', 'user2image2.png', 'user2image3.png', 'user2image4.png', '2016-04-17 16:02:00'),
(3, 'Kinne', NULL, 'kinne', 'What%27s%20good%3F%3F%3F', 'kinneal10@gmail.com', 'play', 0, 1, 1, NULL, 0, 3, 0, 0, 2, 1, 0, 0, 2, 4, 10, 3, 5, 0, 0, 1, 'Sales', 'Total%20package%21%21', '%24%24%24%24%24', 'Ice%20hockey%2Clol', 'fort%20lauderdale', 127, '33312', 11, '1982-08-25', '1', 'user3image0.jpeg', 'user3image1.jpeg', 'user3image2.jpeg', 'user3image3.jpeg', NULL, '2016-04-20 19:24:06'),
(4, NULL, NULL, 'Damita919', NULL, 'Damita.madison@gmail.com', 'madi1125', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1979-09-19', NULL, NULL, NULL, NULL, NULL, NULL, '2016-01-25 21:20:42'),
(5, NULL, NULL, 'msdamitajo', NULL, 'ddavis@arrowexterminators.com', 'vluv8398', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1979-09-19', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, NULL, NULL, 'damita1979', NULL, 'damita919@gmail.com', 'msdj1979', 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1979-09-17', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, NULL, 'BigDawgStatus', 'Always Coolin%27', 'mtlftlatl514@hotmail.com', 'Olivier1', 0, 1, 0, 1, 0, 3, 0, 0, 3, 1, NULL, NULL, 2, 1, 12, 0, 5, 0, NULL, 1, 'Professional', NULL, NULL, NULL, 'Atlanta', 127, NULL, 12, '1984-03-29', '0', NULL, NULL, NULL, NULL, NULL, '2016-02-16 14:32:36'),
(9, NULL, NULL, 'carly', NULL, 'c.abelia@outlook.com', 'pureirishlinen', 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1982-09-16', NULL, NULL, NULL, NULL, NULL, NULL, '2016-02-22 06:03:28'),
(10, NULL, NULL, 'LowKeyLee', NULL, 'juiceboxx513@gmail.com', 'Bubbles1', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1984-10-26', NULL, NULL, NULL, NULL, NULL, NULL, '2016-02-18 09:53:46'),
(11, NULL, NULL, 'kin', NULL, 'kinne@godigio.com', 'play', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1982-08-25', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, NULL, NULL, 'jmartin', NULL, 'mlmnovice@mail.com', 'acespade', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1994-05-18', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, 'cameraman', NULL, 'camtalentscount@mail.com', 'acespade', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1984-07-20', NULL, NULL, NULL, NULL, NULL, NULL, '2016-02-19 04:55:02'),
(14, NULL, NULL, 'Kinne33', NULL, 'kinne@comcast.net', 'playtime', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1982-08-25', NULL, NULL, NULL, NULL, NULL, NULL, '2016-03-01 08:33:00'),
(15, 'Jennifer', NULL, 'jennyluv', NULL, 'jennyluv@mail.com', 'password', 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1986-09-16', '0', 'user15image0.jpeg', NULL, NULL, NULL, NULL, '2016-03-02 12:57:20'),
(16, NULL, NULL, 'Angel25', NULL, 'sgamblerowe@yahoo.com', 'alicia25', 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1981-09-25', NULL, NULL, NULL, NULL, NULL, NULL, '2016-02-25 07:51:54'),
(17, NULL, NULL, 'kenisha38', NULL, 'kenishalittle@yahoo.com', 'peewee38', 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1977-05-13', NULL, NULL, NULL, NULL, NULL, NULL, '2016-03-04 19:39:57'),
(18, 'k dog', NULL, 'kdog', 'Let%27s build it from the ground up......', 'kinnea@comcast.net', 'playtime', 0, 1, 0, 0, 0, 3, 0, 0, NULL, 1, 0, 0, 0, 4, 10, 4, 5, 0, 1, NULL, 'Laying pipe', 'All about the mulaaaa', '$$$$$$$', 'golf.....', 'atlanta', 127, '30281', 12, '1982-08-25', '0', 'user18image0.jpeg', NULL, NULL, NULL, NULL, '2016-03-04 19:34:02'),
(19, NULL, NULL, 'tempuser', NULL, 'kinneyperry@gmail.com', 'KpTr19722016$#$', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1972-11-03', NULL, NULL, NULL, NULL, NULL, NULL, '2016-03-07 18:01:53'),
(20, 'Shianne', NULL, 'royalty', NULL, 'webdesignsbyshi@gmail.com', 'Shibaby1', 1, 0, NULL, NULL, 0, NULL, 0, 0, 2, NULL, NULL, 10, NULL, NULL, 1, NULL, NULL, 1, NULL, 1, 'Student', NULL, NULL, NULL, 'Lauderhill', NULL, NULL, 11, '1993-11-11', '0', 'user20image0.jpeg', NULL, NULL, NULL, NULL, '2016-05-03 12:46:57'),
(21, NULL, NULL, '', NULL, '', '', 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Views`
--

CREATE TABLE IF NOT EXISTS `Views` (
  `viewer` int(11) NOT NULL,
  `viewed` int(11) NOT NULL,
  `firstviewed` datetime DEFAULT NULL,
  `lastviewed` datetime DEFAULT NULL,
  `timesviewed` int(10) NOT NULL,
  KEY `viewer` (`viewer`),
  KEY `viewed` (`viewed`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Views`
--

INSERT INTO `Views` (`viewer`, `viewed`, `firstviewed`, `lastviewed`, `timesviewed`) VALUES
(1, 2, '2016-01-31 23:18:25', '2016-03-02 12:58:35', 32),
(2, 3, '2016-02-02 14:07:10', '2016-04-17 15:33:58', 3),
(2, 4, '2016-02-02 14:08:27', '2016-02-02 14:09:41', 4),
(2, 1, '2016-02-02 14:09:56', '2016-04-17 15:51:49', 2),
(3, 2, '2016-02-02 17:29:04', '2016-04-17 15:55:57', 37),
(14, 2, '2016-03-01 08:25:11', '2016-03-01 08:25:11', 1),
(1, 7, '2016-03-01 08:34:25', '2016-04-12 21:29:31', 3),
(15, 1, '2016-03-01 17:52:00', '2016-03-01 18:15:08', 2),
(1, 15, '2016-03-01 17:53:04', '2016-03-01 17:53:04', 1),
(3, 15, '2016-03-02 12:44:11', '2016-04-19 22:04:36', 5),
(3, 7, '2016-03-03 11:03:45', '2016-04-14 23:58:31', 4),
(17, 8, '2016-03-04 18:40:01', '2016-03-04 18:40:01', 1),
(3, 17, '2016-03-04 18:48:51', '2016-03-05 11:00:16', 6),
(18, 17, '2016-03-04 19:09:24', '2016-03-04 19:19:26', 2),
(18, 2, '2016-03-04 19:10:56', '2016-03-04 19:22:07', 3),
(18, 15, '2016-03-04 19:25:38', '2016-03-04 19:25:38', 1),
(2, 10, '2016-03-07 12:16:26', '2016-03-07 12:16:26', 1),
(19, 2, '2016-03-07 12:19:16', '2016-03-07 12:44:27', 3),
(2, 19, '2016-03-07 12:24:13', '2016-03-07 12:24:13', 1),
(3, 6, '2016-04-17 15:26:47', '2016-04-17 15:56:16', 2),
(3, 16, '2016-04-17 15:36:57', '2016-04-17 15:37:50', 4),
(20, 3, '2016-04-20 10:45:40', '2016-05-03 10:25:33', 4),
(20, 18, '2016-04-20 10:46:49', '2016-04-20 10:46:49', 1),
(3, 20, '2016-04-20 10:55:30', '2016-04-20 19:23:49', 5),
(20, 1, '2016-04-20 11:57:41', '2016-04-20 11:57:41', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Winks`
--

CREATE TABLE IF NOT EXISTS `Winks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromuser` int(11) NOT NULL,
  `touser` int(11) NOT NULL,
  `winktype` tinyint(1) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fromuser` (`fromuser`),
  KEY `touser` (`touser`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `Winks`
--

INSERT INTO `Winks` (`id`, `fromuser`, `touser`, `winktype`, `timestamp`) VALUES
(9, 1, 2, 0, '2016-02-11 18:28:40'),
(10, 3, 2, 0, '2016-02-11 19:23:53'),
(11, 3, 2, 3, '2016-02-15 09:29:42'),
(12, 10, 2, 3, '2016-02-18 09:53:39'),
(13, 2, 1, 1, '2016-02-21 21:24:44'),
(14, 2, 3, 3, '2016-02-21 21:25:21'),
(15, 3, 2, 0, '2016-02-22 07:52:57'),
(16, 2, 3, 1, '2016-02-25 21:03:45'),
(17, 2, 3, 0, '2016-03-04 19:48:42'),
(18, 3, 2, 0, '2016-03-04 19:49:29'),
(19, 3, 7, 0, '2016-04-14 23:58:44'),
(20, 3, 15, 3, '2016-04-14 23:59:21'),
(21, 2, 3, 1, '2016-04-17 15:34:04'),
(22, 2, 1, 3, '2016-04-17 15:51:58');

-- --------------------------------------------------------

--
-- Table structure for table `ratchet_admin`
--

CREATE TABLE IF NOT EXISTS `ratchet_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `ratchet_admin`
--

INSERT INTO `ratchet_admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `ratchet_date_night`
--

CREATE TABLE IF NOT EXISTS `ratchet_date_night` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `place` varchar(200) NOT NULL,
  `d_time` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `message` varchar(5000) NOT NULL,
  `type` varchar(200) NOT NULL,
  `pid` int(11) NOT NULL,
  `accept` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=118 ;

--
-- Dumping data for table `ratchet_date_night`
--

INSERT INTO `ratchet_date_night` (`id`, `uid`, `place`, `d_time`, `date`, `message`, `type`, `pid`, `accept`, `status`) VALUES
(36, 75, 'test', '12.00', '12/2/14', 'gfgfrg', '', 75, 1, 1),
(48, 75, 'test', '03:30', '20/12/2015', 'hi', '', 75, 0, 1),
(57, 75, 'test', '12.00', '12/15', 'haiiiiiiii', 'Romantic date', 75, 1, 1),
(59, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(58, 75, '', '', '', '', 'Romantic date', 0, 0, 0),
(60, 76, 'long horns', '7:30pm', '5/10/15', 'Please where something sexy and hot;)\n', 'Romantic date', 77, 1, 1),
(61, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(62, 76, 'my back yard', '11pm', '05/07/2015', 'please be bout that action', 'Ratchet Love', 77, 1, 1),
(63, 76, '', '', '', '', 'Romantic date', 77, 1, 1),
(64, 76, '', '', '', '', 'Romantic date', 77, 1, 1),
(65, 76, '', '', '', '', 'Romantic date', 77, 0, 1),
(66, 76, '', '', '', '', 'Romantic date', 77, 1, 1),
(67, 76, '', '', '', '', 'Romantic date', 77, 1, 1),
(68, 77, 'my house', '7pm', '5/14/15', 'see you soon', '', 0, 0, 0),
(69, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(70, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(71, 77, '', '', '', '', 'Romantic date', 0, 0, 0),
(72, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(73, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(74, 85, 'p', 't', '05-09-2015', 'mm', 'Romantic date', 87, 0, 1),
(75, 85, 'p', 't', '05-09-2015', 'mm', 'Romantic date', 87, 0, 1),
(76, 87, '', '', '', '', 'Romantic date', 85, 0, 1),
(77, 87, 'p', 't', '05/22/2015', 'mm', 'Romantic date', 85, 0, 1),
(78, 85, 'p', 't', '05-09-2015', 'mm', 'Romantic date', 87, 0, 1),
(79, 87, 'ty', '07:00:00', '05/22/2015', 'mm', 'Romantic date', 85, 0, 1),
(80, 87, 'ty', '07:00:00', '05/22/2015', 'mm', 'Romantic date', 85, 0, 1),
(81, 85, 'tr', '06:00:00', '05-09-2015', 'mm', 'Romantic date', 87, 0, 1),
(82, 75, 'test', '06:10:00', '05/16/2015', 'edfdfd', 'Romantic date', 85, 0, 0),
(83, 79, 'test', '10.00 AM', '12/12/2015', 'hiiiiiiiiii', 'Romantic date', 77, 1, 1),
(84, 79, 'test', '12.00 PM', '12/12/2015', 'dddddddd', 'Romantic date', 85, 0, 0),
(85, 77, 'vvv', '12.00', '2.00', 'gggg', 'Romantic date', 79, 1, 1),
(86, 77, 'test', '10.00', '12/15', 'haiidjfdjfn fdkjfdkjfdlfd,nfd dfdn', 'Romantic date', 75, 1, 1),
(87, 77, 'tttt', '12.00', '12/2015', 'ghgh', 'Romantic date', 75, 1, 1),
(88, 90, 'pp', '7.00', '05-09-2015', 'hello', 'Romantic date', 89, 0, 1),
(89, 77, 'test', '12.00', '12/15', 'test', 'Romantic date', 75, 1, 1),
(90, 90, '', '', '', '', 'Dutch date', 89, 0, 1),
(91, 90, 'ppp', '7.00am', '05-09-2015', 'mm', 'Romantic date', 89, 0, 1),
(92, 89, 'ooooo', '8.00am', '12/12/2015', 'hello', 'Romantic date', 90, 0, 1),
(93, 90, 'ppp', '8.00 am', '05-09-2015', 'hhhhhh', 'Romantic date', 89, 1, 1),
(94, 75, 'tester', '12.30 AM', '2015-04-15', 'tester', 'Romantic date', 77, 1, 1),
(95, 90, 'wwww', '8.00 pm', '05-09-2015', 'qqqqqqq', 'Romantic date', 89, 0, 1),
(96, 89, 'test', '15.00', '10/15', 'test', 'Romantic date', 84, 0, 0),
(97, 89, 'hj', '12.00', '10/15', 'gfg', 'Romantic date', 79, 0, 0),
(98, 90, 'pp', '8.00 am', '05-09-2015', 'mm', 'Romantic date', 89, 0, 1),
(99, 90, 'dd', '07:00:00', '05/22/2015', 'qq', 'Dutch date', 89, 1, 1),
(100, 89, 'miami', '12.00am', '12/12/2015', 'mm', 'Hangout friends', 90, 1, 1),
(101, 89, 'miami', '12.00am', '12/12/2015', 'mm', 'Romantic date', 90, 1, 1),
(102, 90, 'pp', '06:00:00', '05/22/2015', 'qq', 'Romantic date', 89, 1, 1),
(103, 76, 'yo momma house,', '7pm', '05/24/15', 'please meet me at ya momma house, ya dig??', 'Ratchet Love', 77, 1, 1),
(104, 76, 'publix,tn', '7pm', '05/24/15', 'please be nice', 'Hangout friends', 77, 1, 1),
(105, 77, 'my place', '9 pm', 'dutch', 'see you there', 'Romantic date', 0, 0, 0),
(106, 76, 'my spot', '7pm', '5/28/15', 'Please no Luceeee\n\n', 'Dutch date', 77, 0, 1),
(107, 77, '', '', '', '', 'Romantic date', 0, 0, 0),
(108, 77, '', '', '', '', 'Romantic date', 0, 0, 0),
(109, 77, '', '', '', '', 'Romantic date', 0, 0, 0),
(110, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(111, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(112, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(113, 76, '', '', '', '', 'Romantic date', 0, 0, 0),
(114, 75, 'd', '545', 'gf', 'fg', 'Romantic date', 92, 0, 0),
(115, 76, '', '', '', '', 'Romantic date', 77, 1, 1),
(116, 76, 'my backyard', '10pm', '6/5/15', 'Let''s be animal''s\n', 'Romantic date', 77, 1, 1),
(117, 76, 'rubey tuesday', '7pm', '06/05/15', 'dress to impress', 'Dutch date', 77, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ratchet_messages`
--

CREATE TABLE IF NOT EXISTS `ratchet_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `message` varchar(5000) NOT NULL,
  `status` int(11) NOT NULL,
  `date_time` varchar(100) NOT NULL,
  `read` int(11) NOT NULL,
  `read_time` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=143 ;

--
-- Dumping data for table `ratchet_messages`
--

INSERT INTO `ratchet_messages` (`id`, `from_id`, `to_id`, `message`, `status`, `date_time`, `read`, `read_time`) VALUES
(103, 87, 79, 'mmm', 0, '05-21-15 03:39:06', 0, ''),
(138, 77, 76, 'Ok I''m driving but hey kinne', 0, '06-02-15 01:33:16', 1, '11:56:10'),
(93, 55, 51, 'Hello', 0, '04-20-15 01:29:29', 0, ''),
(92, 55, 35, 'Hello', 0, '04-20-15 01:27:35', 1, '10:24:17'),
(97, 48, 52, 'Hi', 0, '04-29-15 07:45:51', 0, ''),
(137, 76, 77, 'Send me a long message like this one hun', 0, '06-02-15 04:48:21', 1, '01:32:41'),
(87, 35, 52, 'hiiii', 0, '04-16-15 05:43:14', 0, ''),
(68, 35, 51, 'TEST', 0, '04-15-2015 10:07:01', 0, ''),
(94, 35, 51, 'hello its me', 0, '04-20-15 01:34:11', 0, ''),
(110, 89, 90, 'i am rem', 0, '05-22-15 11:13:38', 1, '11:13:51'),
(142, 76, 77, 'Hello.', 0, '08-06-15 11:56:01', 0, ''),
(109, 90, 89, 'i am jov', 0, '05-22-15 11:13:14', 1, '11:13:24'),
(86, 35, 53, 'yuy', 0, '04-16-15 05:27:38', 0, ''),
(84, 54, 53, 'hiiii', 0, '04-16-15 05:02:49', 1, '05:03:12'),
(85, 35, 52, 'hi', 0, '04-16-15 05:17:37', 0, ''),
(95, 34, 51, 'hwegrtgr-hello123', 0, '04-20-15 01:41:35', 0, ''),
(96, 48, 52, 'Hey pretty lady', 0, '04-22-15 03:39:51', 0, ''),
(140, 76, 77, 'Okay thanks I got it', 0, '06-02-15 01:43:05', 0, ''),
(141, 76, 77, 'On deck. Where on our way', 0, '06-02-15 01:44:54', 0, ''),
(117, 75, 89, 'hiii', 0, '05-30-15 03:01:56', 0, ''),
(118, 75, 89, 'hioii', 0, '05-30-15 03:03:35', 0, ''),
(119, 76, 77, 'Pisssss', 0, '05-30-15 04:16:08', 0, ''),
(120, 77, 75, 'hi rockyyyyyyyyy', 0, '05-31-15 10:07:55', 1, '02:45:50'),
(121, 75, 77, 'we are testing', 0, '05-31-15 10:25:43', 0, ''),
(122, 75, 77, 'testingsssss', 0, '05-31-15 10:49:32', 0, ''),
(123, 85, 75, 'Another testing', 0, '05-31-15 11:51:20', 1, '11:54:41'),
(124, 75, 85, 'gh', 0, '06-01-15 02:01:05', 0, ''),
(134, 91, 92, ':)', 0, '06-01-15 02:26:31', 1, '02:38:43'),
(126, 92, 91, 'how r u', 0, '06-01-15 02:18:25', 1, '02:25:32'),
(128, 92, 91, 'ok', 0, '06-01-15 02:19:37', 1, '02:19:51'),
(132, 92, 91, '', 0, '06-01-15 02:26:05', 0, ''),
(133, 92, 91, '', 0, '06-01-15 02:26:06', 1, '02:27:34'),
(131, 91, 92, '', 0, '06-01-15 02:25:43', 1, '02:25:57'),
(135, 91, 92, ':)', 0, '06-01-15 02:26:32', 1, '02:26:48'),
(136, 76, 77, 'Heyyyyyy', 0, '06-01-15 07:41:45', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `ratchet_payments`
--

CREATE TABLE IF NOT EXISTS `ratchet_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `plan` varchar(200) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `fname` varchar(200) NOT NULL,
  `lname` varchar(200) NOT NULL,
  `city` varchar(200) NOT NULL,
  `state` varchar(200) NOT NULL,
  `zip` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `ratchet_payments`
--

INSERT INTO `ratchet_payments` (`id`, `uid`, `plan`, `amount`, `status`, `fname`, `lname`, `city`, `state`, `zip`, `email`) VALUES
(1, 35, '3 Month Plan', 57, 0, 'fhf', 'fgdfg', 'fgf', 'fgf', 'fgf', 'fgf'),
(2, 35, '3 Month Plan', 57, 0, 'fhf', 'fgdfg', 'fgf', 'fgf', 'fgf', 'fgf'),
(3, 35, '3 Month Plan', 57, 0, 'fhf', 'fgdfg', 'fgf', 'fgf', 'fgf', 'fgf'),
(4, 35, '9 Month Plan', 84, 0, 'fhf', 'fgdfg', 'fgf', 'fgf', '5454', 'primoremodeling62@gmail.com'),
(5, 35, '9 Month Plan', 84, 0, 'fhf', 'fgdfg', 'fgf', 'fgf', '5454', 'primoremodeling62@gmail.com'),
(6, 35, '6 Month Plan', 66, 0, 'fhf', 'fgdfg', 'fgf', 'fgf', '5454', 'primoremodeling62@gmail.com'),
(7, 35, '6 Month Plan', 66, 0, 'fhf', 'fgdfg', 'fgf', 'fgf', '5454', 'primoremodeling62@gmail.com'),
(8, 35, '9 Month Plan', 84, 1, 'fhf', 'fgdfg', 'fgf', 'fgf', '5454', 'cenveo11@gmail.com'),
(9, 55, '6 Month Plan', 38, 0, 'ggh', 'gj', 'Ernakulam', 'ess', '55', 'dgf@gmail.com'),
(10, 0, '3', 38, 1, 'bibin', 'wer', 'wefg', 'e3r3', '1234567', 'cenveo4@gmail.com'),
(11, 35, '3', 38, 1, 'test', 'test', 'test', 'test', '123456', 'cenveo4@gmail.com'),
(12, 72, '3', 38, 0, 'ghg', 'fghg', 'Amsterdam', 'ff', '4545', 'rahimpvlr1@gmail.com'),
(13, 72, '1', 19, 0, 'ghg', 'fghg', 'Amsterdam', 'ff', '4545', 'rahimpvlr1@gmail.com'),
(14, 72, '1', 19, 0, 'ghg', 'fghg', 'Amsterdam', 'ff', '4545', 'rahimpvlr1@gmail.com'),
(15, 72, '1', 19, 0, 'ghg', 'fghg', 'Amsterdam', 'ff', '4545', 'rahimpvlr1@gmail.com'),
(16, 72, '6', 53, 0, 'ghg', 'fghg', 'Amsterdam', 'ff', '4545', 'rahimpvlr1@gmail.com'),
(17, 72, '3', 38, 0, 'ghg', 'gj', 'Ernakulam', 'miami', '55', 'rahimpvlr1@gmail.com'),
(18, 82, '1', 19, 1, 'nn', 'll', 'w', 'state', '12345', 'cenveo11@gmail.com'),
(19, 85, '1', 19, 1, 'fg', 'll', 'w', 'state', '12345', '1@gmail.com'),
(20, 86, '1', 19, 1, 'fj', 'hjhjh', 'jj', 'hh', '12345', '2@gmail.com'),
(21, 87, '1', 19, 1, 'r4', 't', 'city1', 'ss', '12345', 'cenveo11@gmail.com'),
(22, 90, '1', 19, 1, 'jov', 'jo', 'city', 'state', '12345', 'male@gmail.com'),
(23, 89, '1', 19, 1, 'rem', 'raj', 'cc', 'ss', '12345', 'femail@gmail.com'),
(24, 92, '1', 19, 0, 'ss', 'dd', 'df', 'f', '12345', '1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `ratchet_profile`
--

CREATE TABLE IF NOT EXISTS `ratchet_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seeking` varchar(200) NOT NULL,
  `height` varchar(200) NOT NULL,
  `looking` varchar(200) NOT NULL,
  `hair_color` varchar(200) NOT NULL,
  `body_type` varchar(200) NOT NULL,
  `own_car` varchar(100) NOT NULL,
  `education` varchar(200) NOT NULL,
  `eye_color` varchar(200) NOT NULL,
  `second_language` varchar(200) NOT NULL,
  `want_children` varchar(100) NOT NULL,
  `marital_status` varchar(100) NOT NULL,
  `have_children` varchar(100) NOT NULL,
  `smoke` varchar(100) NOT NULL,
  `drug` varchar(100) NOT NULL,
  `drink` varchar(100) NOT NULL,
  `religion` varchar(100) NOT NULL,
  `profession` varchar(200) NOT NULL,
  `pets` varchar(100) NOT NULL,
  `personality` varchar(200) NOT NULL,
  `ambitious` varchar(100) NOT NULL,
  `income` varchar(100) NOT NULL,
  `headline` varchar(500) NOT NULL,
  `description` varchar(8000) NOT NULL,
  `uid` int(11) NOT NULL,
  `interests` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `viewpermission` int(11) NOT NULL DEFAULT '0',
  `date_night` int(11) NOT NULL,
  `galimg1` varchar(250) NOT NULL,
  `galimg2` varchar(250) NOT NULL,
  `galimg3` varchar(250) NOT NULL,
  `galimg4` varchar(250) NOT NULL,
  `galimg5` varchar(250) NOT NULL,
  `galimg6` varchar(250) NOT NULL,
  `galimg7` varchar(250) NOT NULL,
  `galimg8` varchar(250) NOT NULL,
  `galimg9` varchar(250) NOT NULL,
  `galimg10` varchar(250) NOT NULL,
  `galimg11` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=60 ;

--
-- Dumping data for table `ratchet_profile`
--

INSERT INTO `ratchet_profile` (`id`, `seeking`, `height`, `looking`, `hair_color`, `body_type`, `own_car`, `education`, `eye_color`, `second_language`, `want_children`, `marital_status`, `have_children`, `smoke`, `drug`, `drink`, `religion`, `profession`, `pets`, `personality`, `ambitious`, `income`, `headline`, `description`, `uid`, `interests`, `image`, `viewpermission`, `date_night`, `galimg1`, `galimg2`, `galimg3`, `galimg4`, `galimg5`, `galimg6`, `galimg7`, `galimg8`, `galimg9`, `galimg10`, `galimg11`) VALUES
(37, 'Female', '178', 'Friends', 'Black', '0', 'Yes', 'Some college', 'Brown', 'French', 'No', '---select---', 'Yes', 'No', 'No', 'Yes', 'Non-religious', 'assistant manager', 'No', '', 'Very Ambitious', '35,001 to 50,000', 'I''m', 'I''m grown', 76, 'Live,laugh,love....', 'pic11.jpg', 1, 1, '20150425_212600.jpg', 'IMG_20141127_162404.jpg', '20150414_2306041.jpg', '', '', '', '', '', '', '', ''),
(38, 'Female', '152', 'Dating', 'Black', 'Thin', 'Yes', 'Some college', 'Brown', 'Dutch', 'Yes', '---select---', 'Yes', 'Yes', 'No', 'Yes', 'Non-religious', 'Sales', 'Yes', '', 'Very Ambitious', '35,001 to 50,000', 'Royalty', 'Loving me and possibly you', 77, 'Love and living', 'image6.jpg', 1, 1, 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', '', '', '', '', '', '', ''),
(36, 'Female', '152', 'Hang Out', 'Blond', 'Thin', 'Yes', 'High school', 'Blue', 'Chinese', 'No', 'Still Married', 'No', 'Yes', 'Yes', 'Yes', 'New age', 'hgrgt', 'No', '', 'Not Ambitious', '25,001 to 35,000', 'test', 'tester tester tester', 75, 'test,', 'Short-mens-hair-20133.jpg', 0, 1, 'about_us19.jpg', 'banner1.jpg', 'images317.jpg', 'img12.jpg', 'pic7.jpg', 'cn15.jpg', '25.jpg', 'img31.jpg', 'pic8.jpg', '514.jpg', 'p1.jpg'),
(46, 'Male', '170', 'Hang Out', 'Red', 'Average', 'Yes', 'Bachelors degree', 'Grey', 'Dutch', 'Yes', 'Still Married', 'Yes', 'Yes', 'Yes', 'No', 'Catholic', 'jkukuy', 'Yes', '', 'Somewhat Ambitious', '50,001 to 75,000', 'uyiuyi', 'uiuyi', 79, 'uyiuyiyui', 'about_us21.jpg', 0, 1, '511.jpg', 'about_us1.jpg', 'img21.jpg', 'images316.jpg', '', '', 'img13.jpg', '', '', '', ''),
(47, 'Male', '152', 'Hang Out', 'Black', 'Thin', 'Yes', 'High school', 'Blue', 'Dutch', 'Yes', 'Still Married', 'Yes', 'Yes', 'Yes', 'No', 'Muslim', 'gg', 'Yes', '', 'Somewhat Ambitious', '25,001 to 35,000', 'pp', 'dd', 81, 'ii', '26.jpg', 0, 0, '53cfe118ca60ehomebanner2.jpg', '91.jpg', 'a_b_01.jpg', 'a_b_02.jpg', '', '', 'awards_03.jpg', '', '', '', ''),
(48, 'Male', '198', 'Hang Out', 'Black', 'Average', 'Yes', 'Some University', 'Hazel', 'English', 'Yes', '---select---', 'Yes', 'Yes', 'No', 'No', 'Muslim', 'gh', 'No', '', 'Not Ambitious', '35,001 to 50,000', 'g', 'g', 82, 'hg', 'a_b_021.jpg', 0, 0, 'a_b_03.jpg', 'abo.jpg', 'accred-bnr.jpg', '27.jpg', 'awards_011.jpg', 'bbb_(1).png', 'awards_031.jpg', 'c_b_012.jpg', 'c_b_031.jpg', 'Chrysanthemum7.jpg', 'Jellyfish.jpg'),
(49, 'Female', '168', 'Friends', 'Brown', 'Average', 'Yes', 'Some college', 'Hazel', 'Italian', 'Yes', 'Still Married', 'Yes', 'Yes', 'Yes', 'Yes', 'Muslim', 'nmnmv', 'No', '', 'Somewhat Ambitious', '25,001 to 35,000', 'nmnm', 'mnm', 84, 'nmnm', 'about_us20.jpg', 0, 1, 'banner2.jpg', 'banner_im11.jpg', 'images318.jpg', 'cn17.jpg', '', '', 'cn17.jpg', '', '', '', ''),
(50, 'Male', '155', 'Hang Out', 'Blond', 'Athletic', 'Yes', 'High school', 'Blue', 'Arabic', 'Yes', '---select---', 'Yes', 'Yes', 'Yes', 'Yes', 'New age', 'gh', 'Yes', '', 'Not Ambitious', 'Less Than 25,000', 'pp', 'dd', 85, 'dd', '28.jpg', 0, 1, 'awards_01112.jpg', 'awards_01113.jpg', 'awards_01114.jpg', 'awards_01115.jpg', 'awards_01116.jpg', 'awards_01117.jpg', 'awards_01118.jpg', 'awards_01119.jpg', 'awards_01120.jpg', 'awards_01121.jpg', 'awards_01122.jpg'),
(51, 'Female', '155', 'Hang Out', 'Black', 'Thin', 'No', 'Some college', 'Blue', 'Tagalog', 'Yes', 'Still Married', 'No', 'No', 'Yes', 'Yes', 'Muslim', 'pp', 'Yes', '', 'Not Ambitious', '25,001 to 35,000', 'pp', 'dd', 86, 'jj', 'a_b_035.jpg', 0, 0, 'awards_0111.jpg', 'awards_0112.jpg', 'awards_0113.jpg', 'awards_0114.jpg', 'awards_0115.jpg', 'awards_0116.jpg', 'awards_0117.jpg', 'awards_0118.jpg', 'awards_0119.jpg', 'awards_01110.jpg', 'awards_01111.jpg'),
(52, 'Female', '155', 'Hang Out', 'Black', 'Thin', 'Yes', 'Some college', 'Hazel', 'Spanish', 'Yes', '---select---', 'No', 'Yes', 'Yes', 'Yes', 'New age', 'pp', 'Yes', '', 'Not Ambitious', '25,001 to 35,000', 'pp', 'dddddd', 87, 'hg', 'awards_0315.jpg', 0, 1, 'awards_034.jpg', 'awards_035.jpg', 'awards_036.jpg', 'awards_037.jpg', 'awards_038.jpg', 'awards_039.jpg', 'awards_0310.jpg', 'awards_0311.jpg', 'awards_0312.jpg', 'awards_0313.jpg', 'awards_0314.jpg'),
(53, 'Male', '152', 'Friends', 'Black', 'Athletic', 'Yes', 'Some college', 'Hazel', 'Chinese', 'Yes', 'Still Married', 'No', 'Yes', 'No', 'No', 'Buddhist', '989', 'No', '', 'Not Ambitious', '25,001 to 35,000', '99', '77', 88, 'fvv', 'awards_01136.jpg', 0, 0, 'awards_01132.jpg', 'awards_01133.jpg', 'awards_01134.jpg', '', '', '', 'awards_01135.jpg', '', '', '', ''),
(54, 'Female', '183', 'Hang Out', 'Blond', 'Athletic', 'Yes', 'High school', 'Hazel', 'Arabic', 'Yes', 'Still Married', 'Yes', 'Yes', 'Yes', 'Yes', 'Catholic', 'pp', 'Yes', '', 'Not Ambitious', 'Less Than 25,000', 'pp', 'dd', 90, 'inte', 'abo9.jpg', 0, 1, 'awards_01138.jpg', 'awards_01139.jpg', 'awards_01140.jpg', 'awards_01141.jpg', 'awards_01142.jpg', 'awards_01143.jpg', 'awards_01144.jpg', 'awards_01145.jpg', 'awards_01146.jpg', 'awards_01147.jpg', 'awards_01148.jpg'),
(55, 'Male', '152', 'Hang Out', 'Black', 'Thin', 'Yes', 'High school', 'Blue', 'Arabic', 'Yes', 'Separated', 'Yes', 'Yes', 'Yes', 'Yes', 'Catholic', 'ppp', 'Yes', '', 'Not Ambitious', 'Less Than 25,000', 'pp', 'dd', 89, 'int', 'f_b_011.jpg', 0, 1, 'abo8.jpg', 'awards_0316.jpg', 'awards_01137.jpg', 'a_b_016.jpg', 'a_b_037.jpg', 'a_b_026.jpg', 'box-img1.jpg', 'Chrysanthemum8.jpg', 'f_b_021.jpg', 'Desert8.jpg', '53cfe118ca60ehomebanner24.jpg'),
(56, 'Female', '152', 'Hang Out', 'Black', 'Thin', 'Yes', 'Some college', 'Hazel', 'Russian', 'No', 'Single', 'No', 'No', 'No', 'No', 'Non-religious', 'pp', 'Yes', '', 'Somewhat Ambitious', '25,001 to 35,000', 'phl', 'dd', 91, 'int', 'awards_01149.jpg', 0, 1, '53cfe118ca60ehomebanner25.jpg', '915.jpg', 'a_b_017.jpg', '', '', '', 'a_b_027.jpg', '', '', '', ''),
(57, 'Male', '160', 'Hang Out', 'Brown', 'Athletic', 'Yes', 'High school', 'Hazel', 'Norwegian', 'Yes', 'Single', 'No', 'Yes', 'No', 'No', 'New age', 're', 'Yes', '', 'Not Ambitious', '25,001 to 35,000', '5gg', 'dd', 92, 'int', 'Penguins1.jpg', 0, 1, 'c_b_0121.jpg', 'c_b_022.jpg', 'c_b_0311.jpg', '', '', '', 'Chrysanthemum9.jpg', '', '', '', ''),
(58, 'Male', '170', 'Dating', 'Black', 'Average', 'Yes', 'Some college', 'Brown', 'Other', 'Yes', 'Single', 'Yes', 'No', 'No', 'No', 'Catholic', 'Nonya', 'No', '', 'Very Ambitious', '25,001 to 35,000', 'Ha', 'Hahahaha', 0, 'Hahaha', 'image7.jpg', 0, 1, 'image8.jpg', 'image9.jpg', 'image10.jpg', '', '', '', 'image11.jpg', '', '', '', ''),
(59, 'Female', '185', 'Hang Out', 'Black', 'Athletic', 'Yes', 'PhD / Post Doctoral', 'Brown', 'Other', 'Yes', 'Divorced', 'Yes', 'No', 'No', 'No', 'Christian - other', 'Nonya beezwax', 'Yes', '', 'Somewhat Ambitious', 'Less Than 25,000', 'Heeeeee yaaaa Hey yaaa', 'Message me and find out.', 96, 'sex, drugs, rock and roll', 'jiggly_puff_daddy.jpg', 0, 1, 'pikachu.png', 'kirby.gif', 'bluesky.jpg', '', '', '', 'pic2.png', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `ratchet_register`
--

CREATE TABLE IF NOT EXISTS `ratchet_register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `city` varchar(300) NOT NULL,
  `country` varchar(200) NOT NULL,
  `zip` varchar(100) NOT NULL,
  `looking_for` varchar(3000) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `ethnicity` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  `upgrade` int(11) NOT NULL,
  `last_online` varchar(100) NOT NULL,
  `time` varchar(250) NOT NULL,
  `email` varchar(200) NOT NULL,
  `plan` varchar(200) NOT NULL,
  `upgrade_date` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=98 ;

--
-- Dumping data for table `ratchet_register`
--

INSERT INTO `ratchet_register` (`id`, `first_name`, `last_name`, `city`, `country`, `zip`, `looking_for`, `username`, `password`, `gender`, `age`, `ethnicity`, `status`, `state`, `upgrade`, `last_online`, `time`, `email`, `plan`, `upgrade_date`) VALUES
(97, 'John', 'Wayne', 'Nashville', 'United States', '37207', 'I am a man looking for a woman', 'notarealuser', 'acespade', 'male', 45, 'Black', 0, 'Tennessee', 0, '', '', 'screwthecops@mail.com', '', ''),
(76, 'kinne', 'alcime', 'Fort lauderdale', 'United States', '33312', 'I am a man looking for a woman', 'kinne32', 'play', 'male', 32, 'Black', 1, 'Florida', 1, '', '10:50:55', 'kinneal10@gmail.com', '', '05-04-15'),
(77, 'Damita', 'Davis', 'Atlanta', 'United States', '30329', 'I am a man looking for a woman', 'Damitajo1', 'madi2008', 'female', 35, 'Black', 1, 'Georgia', 1, '', '11:49:47', 'Damita.davis@icloud.com', '', ''),
(79, 'jose', 'cj', 'fghfgh', 'United Kingdom', '125', 'I am a man looking for a woman', 'tomjose', '123', 'male', 24, 'Indian', 1, 'Arizona', 1, '', '10:34:25', 'cenveo15@gmail.com', '', ''),
(80, 'vbvcbv', 'vbvcb', 'vbvcb', 'United States', '25', 'I am a woman looking for a man', 'vbvcbvcvcbcvb', 'vcb', 'female', 26, 'Caucasian', 0, 'District Of Columbia', 0, '', '', 'cenveo33@gmail.com', '', ''),
(81, 'jj', 'kk', 'city', 'United States', '33025', 'I am a woman looking for a man', 'cenveo', '123456', 'male', 25, 'Black', 0, 'Alaska', 0, '', '02:05:10', 'cenveo11@gmail.com', '', ''),
(82, 'fff', 'lll', 'w', 'United States', '12345', 'I am a man looking for a man', 'admin', 'admin', 'male', 21, 'Black', 0, 'Arizona', 1, '', '02:44:53', 'cenveo17@gmail.com', '1', '05-21-15'),
(83, 'bgdb', 'gngf', 'nfn', 'Canada', '475', 'I am a man looking for a man', 'iii', '123', 'female', 24, 'Caucasian', 0, 'Arizona', 0, '', '', 'cenveo30@gmail.com', '', ''),
(84, 'dcfd', 'fgfg', 'fgfdg', 'Canada', '425fgf', 'I am a man looking for a woman', 'iiii', '123', 'male', 24, 'Black', 0, 'American Samoa', 0, '', '02:43:20', 'cenveo35@gmail.com', '', ''),
(85, 'ff', 'll', 'city', 'United States', '12345', 'I am a woman looking for a man', 'm', 'm', 'female', 21, 'Indian', 0, 'American Samoa', 1, '', '02:14:29', 'f@gmail.com', '1', '05-21-15'),
(86, 'mm', 'll', 'city1', 'United States', '12345', 'I am a man looking for a woman', '1', '1', 'male', 25, 'Black', 0, 'Arizona', 1, '', '03:09:32', 'm@gmail.com', '1', '05-21-15'),
(87, 'f', 'l', 'c', 'United States', '33055', 'I am a man looking for a woman', 'm1', '1', 'male', 25, 'Black', 0, 'Alaska', 1, '', '04:01:41', 'm1@gmail.com', '1', '05-21-15'),
(88, 'mm', 'll', 'city1', 'United States', '12345', 'I am a woman looking for a man', '11', '11', 'male', 25, 'Caucasian', 0, 'Alaska', 0, '', '', 'veldomeshelters@gmail.com', '', ''),
(89, 'rem', 'raj', 'cc', 'United States', '12345', 'I am a woman looking for a man', 'female', '1', 'female', 21, 'Caucasian', 1, 'American Samoa', 1, '', '01:31:24', 'female@gmail.com', '1', '05-22-15'),
(90, 'jov', 'jo', 'city', 'United States', '12345', 'I am a man looking for a woman', 'male', '1', 'male', 25, 'Caucasian', 1, 'Alaska', 1, '', '01:31:41', 'male@gmail.com', '1', '05-22-15'),
(91, 'jov6', 'jose6', 'city', 'United States', '12345', 'I am a man looking for a woman', 'mm', '123', 'male', 30, 'Indian', 0, 'Alaska', 0, '', '03:01:18', 'mm@gmail.com', '', ''),
(92, 'anju', 'jo', 'dd', 'Brazil', '12345', 'I am a woman looking for a man', 'ff', '123', 'female', 28, 'Indian', 1, 'Armed Forces Americas', 0, '', '02:16:47', 'ff@gmail.com', '1', '06-01-15'),
(93, 'Shay', 'Boo', 'Miami Gardens ', 'United States', '33169', 'I am a woman looking for a man', 'Shayboo', 'Solo1456', 'female', 27, 'Black', 1, 'Florida', 0, '', '', 'Simplyshay2014@gmail.com', '', ''),
(94, 'Jyvonda', 'Marshall', 'Atlanta', 'United States', '30345', 'I am a woman looking for a woman', 'Focuzed24', 'frizzy24', 'female', 32, 'Black', 0, 'Georgia', 0, '', '', 'JLMarshall24@Gmail.com', '', ''),
(95, 'big', 'boy', 'lauderdale', 'United States', '33312', 'I am a man looking for a woman', 'kdob', 'play', 'male', 32, 'Black', 0, 'Florida', 0, '', '06:02:25', 'myratchetlove@gmail.com', '', ''),
(96, 'John', 'Smith', 'Nashville', 'United States', '37207', 'I am a man looking for a woman', 'randomusername', 'acespade', 'male', 45, 'Black', 0, 'Tennessee', 0, '', '', 'mlmnovice@mail.com', '', ''),
(75, 'test', 'test', 'test', 'United States', '4545', 'I am a man looking for a woman', 'rocky', '123', 'male', 20, 'Caucasian', 1, 'American Samoa', 1, '', '03:06:00', 'rahiads@gmail.com', '1', '05-04-15');

-- --------------------------------------------------------

--
-- Table structure for table `ratchet_view`
--

CREATE TABLE IF NOT EXISTS `ratchet_view` (
  `viewid` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(250) NOT NULL,
  `whoview` varchar(250) NOT NULL,
  `time` varchar(250) NOT NULL,
  `ownerimg` varchar(250) NOT NULL,
  `viewimg` varchar(250) NOT NULL,
  PRIMARY KEY (`viewid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `ratchet_view`
--

INSERT INTO `ratchet_view` (`viewid`, `owner`, `whoview`, `time`, `ownerimg`, `viewimg`) VALUES
(12, '35', '41', '06:50:05am', 'tm8.png', '1427561412016-2129410438.jpg'),
(11, '35', '48', '11:59:01pm', 'tm8.png', 'pic1.jpg'),
(10, '35', '52', '08:39:13pm', 'tm8.png', 'image.jpg'),
(13, '41', '35', '11:49:49pm', '1427561412016-2129410438.jpg', 'tm8.png'),
(14, '35', '51', '02:30:29am', 'tm8.png', 'fb.jpg'),
(15, '60', '52', '11:54:37pm', 'Tulips2.jpg', 'image.jpg'),
(16, '48', '52', '04:43:04pm', 'pic1.jpg', 'image.jpg'),
(17, '35', '60', '10:12:09pm', 'tm8.png', 'Tulips2.jpg'),
(18, '48', '51', '04:44:30pm', 'pic1.jpg', 'fb.jpg'),
(19, '48', '75', '10:59:32am', 'pic1.jpg', 'Short-mens-hair-20133.jpg'),
(20, '75', '75', '05:27:09am', 'Short-mens-hair-20133.jpg', 'Short-mens-hair-20133.jpg'),
(21, '75', '76', '09:05:00pm', 'Short-mens-hair-20133.jpg', 'pic11.jpg'),
(22, '76', '75', '10:39:31am', '14307746504161948165034.jpg', 'Short-mens-hair-20133.jpg'),
(23, '76', '77', '11:55:34am', 'pic11.jpg', 'image6.jpg'),
(24, '77', '76', '01:36:17pm', 'image6.jpg', 'pic11.jpg'),
(25, '76', '79', '03:23:55pm', 'pic11.jpg', 'about_us21.jpg'),
(26, '79', '75', '01:25:09am', '21.jpg', 'Short-mens-hair-20133.jpg'),
(27, '75', '79', '04:23:52am', 'Short-mens-hair-20133.jpg', '21.jpg'),
(28, '75', '77', '10:49:21pm', 'Short-mens-hair-20133.jpg', 'image6.jpg'),
(29, '79', '77', '01:56:24am', '21.jpg', 'image1.jpg'),
(30, '81', '75', '02:04:44am', '26.jpg', 'Short-mens-hair-20133.jpg'),
(31, '81', '79', '02:04:54am', '26.jpg', '21.jpg'),
(32, '81', '77', '02:04:58am', '26.jpg', 'image1.jpg'),
(33, '87', '79', '03:38:57am', 'abo6.jpg', '21.jpg'),
(34, '85', '87', '03:44:59am', '28.jpg', 'abo6.jpg'),
(35, '79', '85', '07:17:08am', 'about_us21.jpg', '28.jpg'),
(36, '79', '79', '10:13:39pm', 'about_us21.jpg', 'about_us21.jpg'),
(37, '89', '90', '01:50:30am', 'f_b_011.jpg', 'abo9.jpg'),
(38, '90', '89', '01:51:43am', 'abo9.jpg', 'f_b_011.jpg'),
(39, '76', '89', '02:13:06pm', 'pic11.jpg', 'f_b_011.jpg'),
(40, '77', '79', '06:42:46pm', 'image6.jpg', 'about_us21.jpg'),
(41, '75', '89', '05:32:05am', 'Short-mens-hair-20133.jpg', 'f_b_011.jpg'),
(42, '77', '75', '10:07:37pm', 'image6.jpg', 'Short-mens-hair-20133.jpg'),
(43, '85', '75', '01:32:51am', '28.jpg', 'Short-mens-hair-20133.jpg'),
(44, '75', '85', '02:00:57am', 'Short-mens-hair-20133.jpg', '28.jpg'),
(45, '91', '92', '02:25:35am', 'awards_01149.jpg', 'Penguins1.jpg'),
(46, '92', '91', '02:20:30am', 'Penguins1.jpg', 'awards_01149.jpg'),
(47, '76', '92', '04:46:18am', 'pic11.jpg', 'Penguins1.jpg'),
(48, '76', '81', '07:50:40pm', 'pic11.jpg', '26.jpg'),
(49, '96', '77', '10:52:09am', 'jiggly_puff_daddy.jpg', 'image6.jpg'),
(50, '0', '76', '03:28:02pm', 'image7.jpg', 'pic11.jpg'),
(51, '76', '0', '11:56:34am', 'pic11.jpg', 'image7.jpg');
--
-- Database: `visionpa_godigio`
--

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE IF NOT EXISTS `Comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(1000) NOT NULL,
  `user` int(11) NOT NULL,
  `post` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`id`, `text`, `user`, `post`) VALUES
(4, 'Yes%20we%20need%20to%20stop%20world%20hunger.', 4, 5),
(3, 'Commenting%20on%20my%20first%20post.', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `FanMatrix`
--

CREATE TABLE IF NOT EXISTS `FanMatrix` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fan` int(50) NOT NULL,
  `fanof` int(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `FanMatrix`
--

INSERT INTO `FanMatrix` (`id`, `fan`, `fanof`) VALUES
(1, 1, 4),
(2, 2, 4),
(3, 4, 1),
(4, 5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Inbox`
--

CREATE TABLE IF NOT EXISTS `Inbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to` int(11) NOT NULL,
  `from` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `image` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE IF NOT EXISTS `Likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `like_dislike` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Likes`
--

INSERT INTO `Likes` (`id`, `post`, `user`, `like_dislike`) VALUES
(1, 5, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE IF NOT EXISTS `Posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(1000) NOT NULL,
  `user` int(11) NOT NULL,
  `post_shared` int(11) NOT NULL,
  `image` varchar(40) NOT NULL,
  `video` varchar(60) NOT NULL,
  `audio` varchar(60) NOT NULL,
  `tags` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `tags` (`tags`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`id`, `text`, `user`, `post_shared`, `image`, `video`, `audio`, `tags`) VALUES
(4, 'A%20post%20with%20an%20image.', 1, 0, 'posts4.jpeg', '', '', ''),
(3, 'My%20first%20post.', 1, 0, '', '', '', ''),
(7, 'I%20Am%20A%20Man%21', 4, 0, 'posts7.jpeg', '', '', ''),
(6, 'Camping%20photo', 4, 0, 'posts6.jpeg', '', '', ''),
(8, 'I%27m%20happy%20with%20the%20current%20progress%20of%20Fanhub.', 4, 0, '', '', '', ''),
(9, '', 4, 0, 'posts9.png', '', '', ''),
(10, 'Bear in stream', 4, 0, '', '6b2ce4acb0ccd31f9a639c7f724389c7.mp4', '', ''),
(11, 'Handel - Entrance of the Queen of Sheba', 4, 0, '', '', 'e185a6f6a1774bdc1f279ebea0bbe6ce.mp3', ''),
(12, 'MUSIC IS MY PASSION, GOD AND FAMILY ARE MY LIFE! CHECK OUT COJO KO OH HAPPY DAYS', 5, 0, '20901024dd81aef9fe655c0b4d6d8f61.jpeg', '', '', ''),
(13, 'MUSIC IS MY PASSION.', 5, 0, '012f380acc5f2e3920635e577594266b.jpeg', '', '', ''),
(14, 'MUSIC IS MY PASSION.', 5, 0, '7d53768b15640f07c5faa69d2979161e.jpeg', '', '', ''),
(15, 'MUSIC IS MY PASSION.', 5, 0, 'a56c24e49d0e7ad26107e91e7e836d55.jpeg', '', '', ''),
(19, 'Guns and Roses is coming to Nashville Nissan Stadium July 9th.', 4, 0, '7ce9fb49716864dfab54720c94aa0f85.jpeg', '', '', 'rock'),
(16, '', 4, 0, '', '', '', ''),
(17, 'Allegro from Duet', 4, 0, '', '', 'dd55f2c2af34487745b13e7ebc2a2447.mp3', ''),
(18, 'A new song', 4, 0, '', '', '9c78c3b9ad2d4867e43771208c8920d6.mp3', ''),
(35, 'Stephen%20Snipes%20concert.%20%20May%201st.', 4, 0, '', '', '', 'r_and_b'),
(33, 'Singer%2Fsongwriter%2Frapper%20and%20producer%20Jahkoy%20has%20a%20ready%20description%20for%20everything.%20He%20categorizes%20his%20signature%20sound%20as%20bipolar%2C%20describes%20himself%20as%20a%20hopeless%20romantic%2C%20and%20provides%20a%20surprisingly%20complex%20overview%20of%20love%20for%20someone%20who%20admits%20to%20having%20only%20a%20few%20years%20of%20practical%20experience%20in%20the%20matter.%20Nevertheless%2C%20his%20hazy%2C%20mid-tempo%20brand%20of%20emotive%20electro-R%26bB%20speaks%20of%20an%20abounding%20heart%20and%20instinctive%20understanding%20of%20songwriting%20and%20human%20emotion.%20So%20much%20so%2C%20he%20found%20his%20forthcoming%20studio%20album%20Temptations%20enjoying%20the%20support%20of%20Pharrell%20Williams%20despite%20the%20two%20having%20never%20met.%0A%0Ahttp%3A%2F%2Fwww.highsnobiety.com%2F2016%2F04%2F19%2Fjahkoy-interivew%2F', 4, 0, '12d5271a73a46616d2f2ac5a9d238c55.jpeg', '', '', 'r_and_b'),
(34, '%0A%0A%0A%0Afanof%20profile%20image%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0Auser%20profile%20image%20%0A%0A%0A%0AJohn%20Drake%0A%0ALocation%20%3A%20Nashville%20TN%0A%0AGenres%20%3Ar_and_b%20indie%20rock%20gospel%20hip_hop%20jazz%20country%0A%0AInterest%20%3Amusic%20business%0A%0A%0A%0A%0A%0APhotos%0A%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%20%0A%0Aphoto%0AAll%20Photos%20%0A%0A%0ASongs%0A%0A%0A%0AHandel%20-%20Entrance%20of%20the%20Queen%20of%20Sheba%0A%0A%20%20%0A%0A%0AAllegro%20from%20Duet%0A%0A%20%20%0A%0A%0AA%20new%20song%0A%0A%20%20%0A%0A%0A%0A%0A%20%0AAll%20Songs%20%0A%0A%0AVideos%0A%0A%0A%20%20%0ABear%20in%20stream%0A%0A%20%0AAll%20Videos%20%0A%0A%0A%0ARecent%20Blogs%0A%0A%0A%0A%0A%0A%0A%0APrevew%20Image%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0ATim%20McGraw%20Takes%20on%20Humble%20and%20Kind%20Role%20Joins%', 4, 0, '9eb6b29b51bf4049da1b512f95c7aea0.jpeg', '', '', 'r_and_b'),
(30, 'Henry%20Threadgill%20Awarded%20Pulitzer%20Prize%20%E2%80%9CIn%20For%20a%20Penny%2C%20In%20For%20a%20Pound%E2%80%9D%20cited%20as%20distinguished%20composition%20By%20JazzTimes%20The%202016%20Pulitzer%20Prize%20for%20Music%20has%20been%20awarded%20to%20saxophonist%2Fflutist%2Fcomposer%20Henry%20Threadgill.%20The%20Pulitzer%20Prize%20Board%20called%20Threadgill%E2%80%99s%202015%20album%20In%20For%20a%20Penny%2C%20In%20For%20a%20Pound%20(Pi%20Recordings)%20%E2%80%9Ca%20highly%20original%20work%20in%20which%20notated%20music%20and%20improvisation%20mesh%20in%20a%20sonic%20tapestry%20that%20seems%20the%20very%20expression%20of%20modern%20American%20life.%E2%80%9D', 4, 0, '07f36cf025b0468ae124b45341ee86a8.jpeg', '', '', 'jazz'),
(31, 'Future%20Covers%20GQ%2527s%20%2522Most%20Stylish%20Men%2522%20Issue%2C%20So%20Does%20Drake.%20%0A%0Ahttp%3A%2F%2Fwww.hotnewhiphop.com%2Ffuture-covers-gqs-most-stylish-men-issue-news.21147.html%20%0A%0A%20%0A%0Ahip_hop', 4, 0, '064d147c5324937df27f8c6d88c6dc8f.jpeg', '', '', 'hip_hop'),
(29, 'Tim%20McGraw%20Takes%20on%20Humble%20and%20Kind%20Role%20Joins%20Board%20of%20Directors%20of%20Health%20Company%20by%20alison%20bonaguro%204%2F18%2F2016%20Share%20to%20Facebook%20Tweet%20to%20Twitter%20More%20Tim%20McGraw%20is%20living%20out%20the%20lyrics%20to%20his%20massive%20hit%20song%20%E2%80%9CHumble%20and%20Kind.%E2%80%9D%20He%20recently%20accepted%20a%20position%20on%20the%20board%20of%20directors%20for%20Narus%20Health%2C%20a%20Nashville-based%20palliative%20care%20company.', 4, 0, 'a8833ce87887584025c9ea042b66e16c.jpeg', '', '', 'country');

-- --------------------------------------------------------

--
-- Table structure for table `Recovery`
--

CREATE TABLE IF NOT EXISTS `Recovery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `token` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `image` varchar(40) DEFAULT NULL,
  `userimage` varchar(40) NOT NULL,
  `bannerimage` varchar(40) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `zip` varchar(15) DEFAULT NULL,
  `marital` tinyint(4) DEFAULT NULL,
  `location` varchar(40) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `genres` varchar(50) NOT NULL,
  `interests` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  FULLTEXT KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `image`, `userimage`, `bannerimage`, `dob`, `gender`, `zip`, `marital`, `location`, `timestamp`, `genres`, `interests`) VALUES
(1, 'Test User', 'testuser1@mail.com', 'pass', 'user1pic.jpeg', 'user1pic.jpeg', 'bannerimage1.jpeg', '1980-01-31', NULL, NULL, NULL, 'Nashville TN', '2016-02-29 23:47:18', '', ''),
(2, 'Test User2', 'testuser2@mail.com', 'pass', 'user2pic.jpeg', 'userimage2.gif', 'bannerimage2.jpeg', '1998-01-31', NULL, NULL, NULL, 'Birmingham AL', '2016-02-29 23:50:43', '', ''),
(3, 'Test User3', 'testuser3@mail.com', 'pass', NULL, '', '', NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '', ''),
(4, 'John Drake', 'john@godigio.com', 'acespade', 'userimage4.png', 'userimage4.png', 'bannerimage4.jpeg', '1968-07-29', NULL, NULL, NULL, 'Nashville TN', '2016-04-20 03:50:30', 'r_and_b indie rock gospel hip_hop jazz country', 'music business'),
(5, 'JESSE BOYCE', 'jesseboycemusic@gmail.com', 'WATERFALL68', NULL, 'userimage5.jpeg', 'bannerimage5.jpeg', '2016-03-04', NULL, NULL, NULL, '', '2016-03-04 22:45:07', '', ''),
(6, 'Alexis Chateau', 'grantfreelancing@gmail.com', 'Chevelle_01', NULL, '', '', NULL, NULL, NULL, NULL, '', '2016-04-07 18:10:35', '', ''),
(7, 'Steven', 'steven@godigio.com', 'Password!', NULL, 'userimage7.jpeg', 'bannerimage7.jpeg', '1985-09-07', NULL, NULL, NULL, 'Nashville, TN', '2016-04-07 23:49:32', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
