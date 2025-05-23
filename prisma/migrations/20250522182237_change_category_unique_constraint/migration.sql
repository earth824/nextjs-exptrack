/*
  Warnings:

  - A unique constraint covering the columns `[type,sequence]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_sequence_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_type_sequence_key" ON "categories"("type", "sequence");
