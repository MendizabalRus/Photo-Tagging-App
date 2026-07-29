-- AlterTable
CREATE SEQUENCE ranking_id_seq;
ALTER TABLE "Ranking" ALTER COLUMN "id" SET DEFAULT nextval('ranking_id_seq'),
ADD CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE ranking_id_seq OWNED BY "Ranking"."id";

-- DropIndex
DROP INDEX "Ranking_id_key";
