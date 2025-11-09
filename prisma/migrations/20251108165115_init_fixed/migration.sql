/*
  Warnings:

  - You are about to drop the column `amount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `LineItem` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amount",
DROP COLUMN "date",
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "customerId" INTEGER,
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "documentId" INTEGER,
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "invoiceDate" TIMESTAMP(3),
ADD COLUMN     "invoiceTotal" DOUBLE PRECISION,
ADD COLUMN     "subTotal" DOUBLE PRECISION,
ADD COLUMN     "totalTax" DOUBLE PRECISION,
ALTER COLUMN "invoiceNumber" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LineItem" DROP COLUMN "price",
ADD COLUMN     "accountCode" TEXT,
ADD COLUMN     "srNo" INTEGER,
ADD COLUMN     "totalPrice" DOUBLE PRECISION,
ADD COLUMN     "unitPrice" DOUBLE PRECISION,
ADD COLUMN     "vatRate" DOUBLE PRECISION,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "date",
ADD COLUMN     "bankAccount" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "category",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "taxId" TEXT;

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "analyticsId" TEXT,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT,
    "fileSize" INTEGER,
    "fileType" TEXT,
    "status" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_externalId_key" ON "Customer"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_analyticsId_key" ON "Document"("analyticsId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_externalId_key" ON "Invoice"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_documentId_key" ON "Invoice"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_externalId_key" ON "Vendor"("externalId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
