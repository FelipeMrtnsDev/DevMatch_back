/*
  Warnings:

  - The primary key for the `candidacies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `competencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `developer_profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `professional_experiences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project_participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_competencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `vacancies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `vacancy_competencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,vacancyId]` on the table `candidacies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "candidacies" DROP CONSTRAINT "candidacies_userId_fkey";

-- DropForeignKey
ALTER TABLE "candidacies" DROP CONSTRAINT "candidacies_vacancyId_fkey";

-- DropForeignKey
ALTER TABLE "developer_profiles" DROP CONSTRAINT "developer_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "professional_experiences" DROP CONSTRAINT "professional_experiences_userId_fkey";

-- DropForeignKey
ALTER TABLE "project_participants" DROP CONSTRAINT "project_participants_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_participants" DROP CONSTRAINT "project_participants_userId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "user_competencies" DROP CONSTRAINT "user_competencies_competencyId_fkey";

-- DropForeignKey
ALTER TABLE "user_competencies" DROP CONSTRAINT "user_competencies_userId_fkey";

-- DropForeignKey
ALTER TABLE "vacancies" DROP CONSTRAINT "vacancies_postedById_fkey";

-- DropForeignKey
ALTER TABLE "vacancy_competencies" DROP CONSTRAINT "vacancy_competencies_competencyId_fkey";

-- DropForeignKey
ALTER TABLE "vacancy_competencies" DROP CONSTRAINT "vacancy_competencies_vacancyId_fkey";

-- AlterTable
ALTER TABLE "candidacies" DROP CONSTRAINT "candidacies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "vacancyId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "candidacies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "candidacies_id_seq";

-- AlterTable
ALTER TABLE "competencies" DROP CONSTRAINT "competencies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "competencies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "competencies_id_seq";

-- AlterTable
ALTER TABLE "developer_profiles" DROP CONSTRAINT "developer_profiles_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "developer_profiles_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "professional_experiences" DROP CONSTRAINT "professional_experiences_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "professional_experiences_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "professional_experiences_id_seq";

-- AlterTable
ALTER TABLE "project_participants" DROP CONSTRAINT "project_participants_pkey",
ALTER COLUMN "projectId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "project_participants_pkey" PRIMARY KEY ("projectId", "userId");

-- AlterTable
ALTER TABLE "projects" DROP CONSTRAINT "projects_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "creatorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "projects_id_seq";

-- AlterTable
ALTER TABLE "user_competencies" DROP CONSTRAINT "user_competencies_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "competencyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_competencies_pkey" PRIMARY KEY ("userId", "competencyId");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "vacancies" DROP CONSTRAINT "vacancies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "postedById" SET DATA TYPE TEXT,
ADD CONSTRAINT "vacancies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "vacancies_id_seq";

-- AlterTable
ALTER TABLE "vacancy_competencies" DROP CONSTRAINT "vacancy_competencies_pkey",
ALTER COLUMN "vacancyId" SET DATA TYPE TEXT,
ALTER COLUMN "competencyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "vacancy_competencies_pkey" PRIMARY KEY ("vacancyId", "competencyId");

-- CreateIndex
CREATE UNIQUE INDEX "candidacies_userId_vacancyId_key" ON "candidacies"("userId", "vacancyId");

-- AddForeignKey
ALTER TABLE "developer_profiles" ADD CONSTRAINT "developer_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_experiences" ADD CONSTRAINT "professional_experiences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_competencies" ADD CONSTRAINT "user_competencies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_competencies" ADD CONSTRAINT "user_competencies_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "competencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_participants" ADD CONSTRAINT "project_participants_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_participants" ADD CONSTRAINT "project_participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancy_competencies" ADD CONSTRAINT "vacancy_competencies_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancy_competencies" ADD CONSTRAINT "vacancy_competencies_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "competencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidacies" ADD CONSTRAINT "candidacies_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidacies" ADD CONSTRAINT "candidacies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
