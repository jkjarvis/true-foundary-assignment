/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "repo_name" TEXT NOT NULL,
    "token_id" INTEGER NOT NULL,
    CONSTRAINT "user_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "github_token" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("id", "repo_name", "token_id") SELECT "id", "repo_name", "token_id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
