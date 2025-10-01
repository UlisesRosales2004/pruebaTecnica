/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "disponible" DROP NOT NULL,
ALTER COLUMN "fechaNacimiento" DROP NOT NULL,
ALTER COLUMN "dni" DROP NOT NULL,
ALTER COLUMN "sexo" DROP NOT NULL,
ALTER COLUMN "estadoCivil" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");
