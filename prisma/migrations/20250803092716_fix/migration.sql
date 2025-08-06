-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_exercise_log_id_fkey";

-- AlterTable
ALTER TABLE "public"."Exercise_log" ADD COLUMN     "exerciseId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Exercise_log" ADD CONSTRAINT "Exercise_log_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
