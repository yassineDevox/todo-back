-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 13 déc. 2021 à 11:45
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `todos-db`
--

-- --------------------------------------------------------

--
-- Structure de la table `todos`
--

CREATE TABLE `todos` (
  `ID` int(11) NOT NULL,
  `TITLE` varchar(60) NOT NULL,
  `STATUS` enum('COMPLETED','INPROGRESS','CANCELED','TODO') NOT NULL,
  `TYPE` enum('FRONT','BACK','TESTING','DESIGN') NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `todos`
--

INSERT INTO `todos` (`ID`, `TITLE`, `STATUS`, `TYPE`, `userId`) VALUES
(2, 'task 1', 'COMPLETED', 'FRONT', 1),
(3, 'CREATE GLOBAL DESIGN', 'TODO', 'DESIGN', 1),
(4, 'task1', 'TODO', 'BACK', 1),
(7, 'task2', '', 'BACK', 1),
(11, 'task2', '', 'BACK', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `FIRSTNAME` varchar(60) NOT NULL,
  `LASTNAME` varchar(60) NOT NULL,
  `USERNAME` varchar(60) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `AVATAR_URL` varchar(255) NOT NULL,
  `TOKEN` varchar(256) NOT NULL,
  `FLAG` tinyint(20) NOT NULL,
  `DATETOKEN` datetime NOT NULL DEFAULT current_timestamp(),
  `SENDMAILDATE` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `FIRSTNAME`, `LASTNAME`, `USERNAME`, `PASSWORD`, `AVATAR_URL`, `TOKEN`, `FLAG`, `DATETOKEN`, `SENDMAILDATE`) VALUES
(1, 'maryam', 'bouderham', 'aaaaaaaaaa', 'Pass1234', '_', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(2, 'saytama', 'yamagi', 'aaa', 'bbb', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(5, 'saytama', 'yamagi', 'aaaa', 'bbbb1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(8, 'saytama', 'yamagi', 'zzzz', 'bbbB1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(9, 'saytama', 'yamar', 'zzzaa', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(10, 'saytama', 'yamar', 'zzzaaa', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(11, 'saytama', 'yamar', 'bbbbbbb', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(12, 'saytama', 'yamar', 'cccccccc', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(13, 'saytama', 'yamar', 'ddddddddd', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(14, 'saytama', 'yamar', 'eeeeeee', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(15, 'saytama', 'yamar', 'ffffff', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(16, 'saytama', 'yamar', 'jjjjjjjj', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(17, 'saytama', 'yamar', 'kkkkkkkkk', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(18, 'saytama', 'yamar', 'lllllllll', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 1, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(19, 'saytama', 'yamar', 'ppppppp', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 1, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(20, 'saytama', 'yamar', 'cjdscjdlkc', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 1, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(21, 'saytama', 'yamar', 'jfdjshfihequi', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 1, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(22, 'saytama', 'yamar', 'ijfckjejrjeiio', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(23, 'saytama', 'yamar', 'idjuzehufze', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(24, 'saytama', 'yamar', 'yyyyyy', 'aaddEE1234', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(25, 'saytama', 'yamar', 'iledfshuic', 'f65533a1623ef17839d850b4bf4a5c67810c7567', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(28, 'saytama', 'yamar', 'iuuigygyugy', 'f65533a1623ef17839d850b4bf4a5c67810c7567', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 0, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(30, 'saytama', 'yamar', 'uhduzegydg', 'f65533a1623ef17839d850b4bf4a5c67810c7567', 'hdshduze', 'bURsr8nVotuT5EimV9UgxebwfQ23ibz6', 1, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(31, 'saytama', 'yamar', 'hfzuefhzsk', 'f65533a1623ef17839d850b4bf4a5c67810c7567', 'hdshduze', '', 1, '2021-12-07 15:31:56', '2021-12-08 09:49:36'),
(32, 'saytama', 'yamar', 'maryam.bouderham@gmail.com', 'b16c5a5509d011d112f749cbb10914ecd1673035', 'hdshduze', '', 1, '2021-12-08 09:16:03', '2021-12-08 10:52:07');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `todos`
--
ALTER TABLE `todos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;