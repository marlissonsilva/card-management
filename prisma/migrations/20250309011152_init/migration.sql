-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "responsible" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "installments" INTEGER NOT NULL,
    "dateOfPurchase" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);
