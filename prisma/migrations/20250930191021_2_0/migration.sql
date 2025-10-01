/*
  Warnings:

  - Made the column `disponible` on table `Factura` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."DetallesFactura" DROP CONSTRAINT "DetallesFactura_facturaId_fkey";

-- AlterTable
ALTER TABLE "public"."DetallesFactura" ALTER COLUMN "facturaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Factura" ALTER COLUMN "disponible" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."DetallesFactura" ADD CONSTRAINT "DetallesFactura_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "public"."Factura"("id") ON DELETE SET NULL ON UPDATE CASCADE;
