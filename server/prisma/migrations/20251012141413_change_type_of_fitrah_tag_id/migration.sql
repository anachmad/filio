/*
  Warnings:

  - The primary key for the `_ActivityToFitrahTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `fitrah_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."_ActivityToFitrahTag" DROP CONSTRAINT "_ActivityToFitrahTag_B_fkey";

-- AlterTable
ALTER TABLE "_ActivityToFitrahTag" DROP CONSTRAINT "_ActivityToFitrahTag_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ActivityToFitrahTag_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "fitrah_tags" DROP CONSTRAINT "fitrah_tags_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "fitrah_tags_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "fitrah_tags_id_seq";

-- AddForeignKey
ALTER TABLE "_ActivityToFitrahTag" ADD CONSTRAINT "_ActivityToFitrahTag_B_fkey" FOREIGN KEY ("B") REFERENCES "fitrah_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
