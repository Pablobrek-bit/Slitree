-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
