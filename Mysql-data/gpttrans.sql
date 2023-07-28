-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： mysql
-- 產生時間： 2023 年 05 月 28 日 15:31
-- 伺服器版本： 8.0.31
-- PHP 版本： 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `gpttrans`
--

-- --------------------------------------------------------

--
-- 資料表結構 `bookshelf`
--
CREATE DATABASE IF NOT EXISTS `gpttrans` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `gpttrans`;

CREATE TABLE `bookshelf` (
  `id` int UNSIGNED NOT NULL,
  `uuid` varchar(20) DEFAULT NULL,
  `filepath` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lang` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `destription` varchar(200) DEFAULT NULL,
  `matadata` varchar(200) DEFAULT NULL,
  `orig_uuid` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cate` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `title` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `bookshelf`
--

INSERT INTO `bookshelf` (`id`, `uuid`, `filepath`, `lang`, `author`, `name`, `destription`, `matadata`, `orig_uuid`, `created_at`, `created_by`, `cate`, `public`, `title`) VALUES
(49, 'ori-64622bb85eaff', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990.epub', NULL, 'Louis Ng1', 'algorithm_1990.epub', NULL, NULL, NULL, '2023-05-15 12:55:20', '7f68c813-67e0-41d4-93fe-b57f0eb0a776', 'testcate', 1, 'algorithm : 1900'),
(50, 'tran-64622bd0b6f69', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Korean.epub', 'Korean', NULL, 'algorithm_1990_bilingual_Korean.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-15 12:55:44', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(51, 'tran-64622c230a982', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Japanese.epub', 'Japanese', NULL, 'algorithm_1990_bilingual_Japanese.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-15 12:57:07', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(52, 'tran-64622c72901ac', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Traditional Chinese.epub', 'Traditional Chinese', NULL, 'algorithm_1990_bilingual_Traditional Chinese.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-15 12:58:26', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(53, 'tran-64622c9e56eca', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Simplified Chinese.epub', 'Simplified Chinese', NULL, 'algorithm_1990_bilingual_Simplified Chinese.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-15 12:59:10', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(54, 'tran-64622d8842b1e', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Arabic.epub', 'Arabic', NULL, 'algorithm_1990_bilingual_Arabic.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-15 13:03:04', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(55, 'tran-64622db5df730', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Danish.epub', 'Danish', NULL, 'algorithm_1990_bilingual_Danish.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-15 13:03:49', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(56, 'ori-6463cd93e6e14', '/var/www/html/trans-book-py/bookshelf/ori/ori-6463cd93e6e14/algorithm_1990.epub', NULL, 'Louis Ng1', 'algorithm_1990.epub', NULL, NULL, NULL, '2023-05-16 18:38:11', '7f68c813-67e0-41d4-93fe-b57f0eb0a776', 'testcate', 1, 'algorithm : 1900'),
(57, 'tran-6463cdafe218e', '/var/www/html/trans-book-py/bookshelf/ori/ori-6463cd93e6e14/algorithm_1990_bilingual_Japanese.epub', 'Japanese', NULL, 'algorithm_1990_bilingual_Japanese.epub', NULL, NULL, 'ori-6463cd93e6e14', '2023-05-16 18:38:39', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(59, 'tran-646e15943114d', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Greek.epub', 'Greek', NULL, 'algorithm_1990_bilingual_Greek.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-24 13:48:04', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(62, 'tran-6470488ecff3f', '/var/www/html/trans-book-py/bookshelf/ori/ori-64704873d710d/jinyoung_langh_bilingual_Japanese.epub', 'Japanese', NULL, 'jinyoung_langh_bilingual_Japanese.epub', NULL, NULL, 'ori-64704873d710d', '2023-05-26 05:50:06', 'system_trans', 'tempuscategory', NULL, '笑傲江湖'),
(63, 'tran-647048d44bef7', '/var/www/html/trans-book-py/bookshelf/ori/ori-64704873d710d/jinyoung_langh_bilingual_Korean.epub', 'Korean', NULL, 'jinyoung_langh_bilingual_Korean.epub', NULL, NULL, 'ori-64704873d710d', '2023-05-26 05:51:16', 'system_trans', 'tempuscategory', NULL, '笑傲江湖'),
(64, 'tran-647049d92d558', '/var/www/html/trans-book-py/bookshelf/ori/ori-64622bb85eaff/algorithm_1990_bilingual_Hebrew.epub', 'Hebrew', NULL, 'algorithm_1990_bilingual_Hebrew.epub', NULL, NULL, 'ori-64622bb85eaff', '2023-05-26 05:55:37', 'system_trans', 'tempuscategory', NULL, 'algorithm : 1900'),
(67, 'tran-647053e750a4a', '/var/www/html/trans-book-py/bookshelf/ori/ori-64705328d27e8/jinyoung_langh_bilingual_English.epub', 'English', NULL, 'jinyoung_langh_bilingual_English.epub', NULL, NULL, 'ori-64705328d27e8', '2023-05-26 06:38:31', 'system_trans', 'tempuscategory', NULL, '笑傲江湖'),
(68, 'tran-6470572675f7c', '/var/www/html/trans-book-py/bookshelf/ori/ori-64705328d27e8/jinyoung_langh_bilingual_Japanese.epub', 'Japanese', NULL, 'jinyoung_langh_bilingual_Japanese.epub', NULL, NULL, 'ori-64705328d27e8', '2023-05-26 06:52:22', 'system_trans', 'tempuscategory', NULL, '笑傲江湖'),
(70, 'tran-647057958dc50', '/var/www/html/trans-book-py/bookshelf/ori/ori-6470576bb5f3b/jinyoung_langh_bilingual_Japanese.epub', 'Japanese', NULL, 'jinyoung_langh_bilingual_Japanese.epub', NULL, NULL, 'ori-6470576bb5f3b', '2023-05-26 06:54:13', 'system_trans', 'tempuscategory', NULL, '笑傲江湖'),
(71, 'ori-64705bca99399', '/var/www/html/trans-book-py/bookshelf/ori/ori-64705bca99399/jinyoung_langh.epub', NULL, '金庸', 'jinyoung_langh.epub', NULL, NULL, NULL, '2023-05-26 07:12:10', '7f68c813-67e0-41d4-93fe-b57f0eb0a776', 'testcate', 1, '笑傲江湖'),
(72, 'tran-64705c9ced7f9', '/var/www/html/trans-book-py/bookshelf/ori/ori-64705bca99399/jinyoung_langh_bilingual_Japanese.epub', 'Japanese', NULL, 'jinyoung_langh_bilingual_Japanese.epub', NULL, NULL, 'ori-64705bca99399', '2023-05-26 07:15:40', 'system_trans', 'tempuscategory', NULL, '笑傲江湖'),
(78, 'ori-647073298d0ba', '/var/www/html/trans-book-py/bookshelf/ori/ori-647073298d0ba/filename', NULL, '金庸', 'filename', NULL, NULL, NULL, '2023-05-26 08:51:53', '7f68c813-67e0-41d4-93fe-b57f0eb0a776', 'testcate', NULL, '笑傲江湖'),
(79, 'ori-64708fd19a278', '/var/www/html/trans-book-py/bookshelf/ori/ori-64708fd19a278/Harry_PotterSorcerer.epub', NULL, 'J.K. Rowling', 'Harry_PotterSorcerer.epub', NULL, NULL, NULL, '2023-05-26 10:54:09', '900ab4b2-7536-1719-1838-9ba41396524a', 'testcate', 1, 'Sorcerer\'s Stone'),
(80, 'ori-64708fe8665e8', '/var/www/html/trans-book-py/bookshelf/ori/ori-64708fe8665e8/jingyoung_deer.epub', NULL, '金庸', 'jingyoung_deer.epub', NULL, NULL, NULL, '2023-05-26 10:54:32', '900ab4b2-7536-1719-1838-9ba41396524a', 'testcate', 1, '鹿鼎記'),
(81, 'ori-64709000afab1', '/var/www/html/trans-book-py/bookshelf/ori/ori-64709000afab1/jingyoung_shotbrid.epub', NULL, '金庸', 'jingyoung_shotbrid.epub', NULL, NULL, NULL, '2023-05-26 10:54:56', '900ab4b2-7536-1719-1838-9ba41396524a', 'testcate', 1, '射鵰英雄傳一'),
(83, 'ori-647090367f27d', '/var/www/html/trans-book-py/bookshelf/ori/ori-647090367f27d/Harry_PotterPrisoner_of_Azkaban.epub', NULL, 'J.K. Rowling', 'Harry_PotterPrisoner_of_Azkaban.epub', NULL, NULL, NULL, '2023-05-26 10:55:50', '900ab4b2-7536-1719-1838-9ba41396524a', 'testcate', 1, 'Prisoner of Azkaban'),
(84, 'ori-6470921cc6804', '/var/www/html/trans-book-py/bookshelf/ori/ori-6470921cc6804/killPeople_detective.epub', NULL, '西村京太郎', 'killPeople_detective.epub', NULL, NULL, NULL, '2023-05-26 11:03:56', '900ab4b2-7536-1719-1838-9ba41396524a', 'testcate', 1, '南紀殺人路線'),
(85, 'ori-64709008b1ad9', '/var/www/html/trans-book-py/bookshelf/ori/ori-64709008b1ad9/warAndPeace.epub', NULL, 'graf Leo Tolstoy', 'warAndPeace.epub', NULL, NULL, NULL, '2023-05-26 10:55:04', '900ab4b2-7536-1719-1838-9ba41396524a', 'testcate', 1, 'War and Peace'),
(89, 'tran-647097db7faac', '/var/www/html/trans-book-py/bookshelf/ori/ori-64709008b1ad9/warAndPeace_bilingual_Traditional Chinese.epub', 'Traditional Chinese', NULL, 'warAndPeace_bilingual_Traditional Chinese.epub', NULL, NULL, 'ori-64709008b1ad9', '2023-05-26 11:28:27', 'system_trans', 'tempuscategory', NULL, 'War and Peace'),
(90, 'ori-6470d77fdf1e1', '/var/www/html/trans-book-py/bookshelf/ori/ori-6470d77fdf1e1/filename', NULL, 'graf Leo Tolstoy', 'filename', NULL, NULL, NULL, '2023-05-26 15:59:59', 'e8eadbb0-5c7f-6594-c882-f225cde77860', 'testcate', NULL, 'War and Peace'),
(103, 'tran-6471f3774af8d', '/var/www/html/trans-book-py/bookshelf/ori/ori-6463cd93e6e14/algorithm_1990_bilingual_Spanish.epub', 'Spanish', NULL, 'algorithm_1990_bilingual_Spanish.epub', NULL, NULL, 'ori-6463cd93e6e14', '2023-05-27 12:11:35', '7f68c813-67e0-41d4-93fe-b57f0eb0a776', 'tempuscategory', NULL, 'algorithm : 1900'),
(111, 'ori-6472065fb1a9b', '/var/www/html/trans-book-py/bookshelf/ori/ori-6472065fb1a9b/Harry_PotterSorcererImage.epub', NULL, 'J.K. Rowling', 'Harry_PotterSorcererImage.epub', NULL, NULL, NULL, '2023-05-27 13:32:15', '68f35e89-4d44-47c7-a134-68ea2d4fc806', 'testcate', 0, 'Harry Potter and the Sorcerer\'s Stone'),
(112, 'tran-647206e968cb4', '/var/www/html/trans-book-py/bookshelf/ori/ori-6472065fb1a9b/Harry_PotterSorcererImage_bilingual_Spanish.epub', 'Spanish', NULL, 'Harry_PotterSorcererImage_bilingual_Spanish.epub', NULL, NULL, 'ori-6472065fb1a9b', '2023-05-27 13:34:33', 'system_trans', 'tempuscategory', NULL, 'Harry Potter and the Sorcerer\'s Stone');

-- --------------------------------------------------------

--
-- 資料表結構 `comment`
--

CREATE TABLE `comment` (
  `id` int UNSIGNED NOT NULL,
  `uuid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `bookid` varchar(20) DEFAULT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `created_at` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `comment`
--

INSERT INTO `comment` (`id`, `uuid`, `username`, `bookid`, `comment`, `created_at`) VALUES
(8, '69913797-d996-4fae-bade-fdff4a848ade', 'test@test', 'ori-64622bb85eaff', 'New comment ', 'May 24, 2023 at 3:30 AM'),
(9, '39e8533a-ef6f-44cf-b066-c6f6049ae41f', 'test@test', 'ori-64622bb85eaff', 'Testytttttttting  comment ', 'May 24, 2023 at 3:32 AM'),
(10, 'd8f3525e-fcf5-4d04-80a9-4ec4cf593bc2', 'test@test', 'ori-6463cd93e6e14', 'Another noon comment ', 'May 24, 2023 at 3:39 AM'),
(11, '9288590b-0031-4ecd-85df-cc780728ac2a', 'test@test', 'ori-64622bb85eaff', 'Greek book created!!!', 'May 24, 2023 at 9:48 PM'),
(12, 'testuuid', 'testusername', 'ori-64622bb85eaff', 'the first comment here', 'now'),
(13, 'eb19ab39-f7e4-442d-af83-ed8e7ecba9e0', 'test@test', 'ori-64622bb85eaff', 'youuuu', 'May 26, 2023, 1:06 AM'),
(14, '8fc60bf7-f496-1948-90ad-ccef7de6ca4d', 'test@test', 'ori-64622bb85eaff', 'youuuu2', 'May 26, 2023, 1:08 AM'),
(15, '1ef7ea47-6cc8-a7ef-3ffb-7d3d77591d0b', 'test@test', 'ori-64622bb85eaff', 'youuuu22', 'May 26, 2023, 1:10 AM'),
(16, 'e6bf7fdf-9811-a7c0-2ca7-85e0eefa57bb', 'test@test', 'ori-64622bb85eaff', '234', 'May 26, 2023, 1:12 AM'),
(17, 'b5592469-3ef9-2551-c382-cc0b81506035', 'test@test', 'ori-6463cd93e6e14', 'commet form web', 'May 26, 2023, 3:40 AM'),
(18, 'ba421b02-d1db-85f1-27f9-61136f95f496', 'test@test', 'ori-646dde3a4c0c8', 'jkijh', 'May 26, 2023, 4:03 AM'),
(19, 'c3613bab-6b47-36fe-8dd8-5b4ac30667cd', 'test@test', 'ori-64705bca99399', 'test jin', 'May 26, 2023, 3:35 PM'),
(20, '74027c04-8e83-b5a5-0cc2-7dbc0c87aa2f', 'test@test', 'ori-6463cd93e6e14', 'first comment this', 'May 27, 2023, 12:03 AM'),
(21, '5ba23c61-9901-87de-e799-2f08cd1ec230', 'test@test', 'ori-6463cd93e6e14', 'hello world 123123123', 'May 27, 2023, 12:04 AM'),
(22, 'd7918aab-e82a-c99e-1c5f-c17f1895c4af', 'test@test', 'ori-64709000afab1', 'comment on 射鵰英雄傳一', 'May 27, 2023, 12:09 AM'),
(23, 'af8eeed7-e300-adc2-bca7-52014b0c19ae', 'test@test', 'ori-647073298d0ba', 'cooment on 笑傲江湖', 'May 27, 2023, 12:10 AM'),
(24, 'a01e3a59-12ec-470e-9787-578419a09783', 'test@gmail.com', 'ori-6470e34541e4c', 'Comment here', 'May 27, 2023 at 12:51 AM'),
(25, 'b872ea4c-8561-4dd4-b34a-80a3351a3093', 'test@gmail.com', 'ori-6470e34541e4c', 'Comment here HK ', 'May 27, 2023 at 12:51 AM'),
(26, '93e28398-1d61-4694-b079-5cd3f4aa55d0', 'test@test', 'ori-64705bca99399', '金融', 'May 27, 2023 at 12:52 AM'),
(27, '359498c5-209c-4808-83e6-562666812b0e', 'test@test', 'ori-64709008b1ad9', '我', 'May 27, 2023 at 12:53 AM'),
(28, 'b01a5efd-0784-4af1-9425-4bba4802b9cc', 'test@test.uk', 'ori-64709008b1ad9', 'Okkkkk demo', 'May 27, 2023 at 2:42 PM');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` int UNSIGNED NOT NULL,
  `uuid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `uuid`, `username`, `password`, `email`, `phone`) VALUES
(4, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(5, '4d0931ff-fa37-401f-9c2e-3f38e3872f0d', 'test@test.hk', 'testtest123', 'test@test.hk', 12345678),
(6, '7f68c813-67e0-41d4-93fe-b57f0eb0a776', 'test@test', 'testest123', 'test@test', 12345678),
(7, 'testuuidAngular', 'usernameAngular', '123123testpassword', 'andymo00101@gmail.com', 234234),
(8, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(9, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(10, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(11, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(12, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(13, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(14, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(15, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(16, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(17, 'testuuid777', 'testname', 'testpass', 'testemail', 123123),
(18, '900ab4b2-7536-1719-1838-9ba41396524a', 'test@test.com', 'testest123', 'test@test.com', 123123),
(19, 'e8eadbb0-5c7f-6594-c882-f225cde77860', 'test@test.tg', 'testest', 'test@test.tg', 123123),
(20, '9fe74038-9110-4c5b-9e0e-cd156291ec71', 'test@gmail.com', 'testest123', 'test@gmail.com', 12345678),
(21, '68f35e89-4d44-47c7-a134-68ea2d4fc806', 'test@test.uk', 'testest123', 'test@test.uk', 12345678);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `bookshelf`
--
ALTER TABLE `bookshelf`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bookshelf`
--
ALTER TABLE `bookshelf`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
