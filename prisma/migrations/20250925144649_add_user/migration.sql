/*
  Warnings:

  - You are about to drop the `_movies_actors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `actors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie_posters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_movies_actors` DROP FOREIGN KEY `_movies_actors_A_fkey`;

-- DropForeignKey
ALTER TABLE `_movies_actors` DROP FOREIGN KEY `_movies_actors_B_fkey`;

-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `Movie_poster_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_movie_id_fkey`;

-- DropTable
DROP TABLE `_movies_actors`;

-- DropTable
DROP TABLE `actors`;

-- DropTable
DROP TABLE `movie`;

-- DropTable
DROP TABLE `movie_posters`;

-- DropTable
DROP TABLE `reviews`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
