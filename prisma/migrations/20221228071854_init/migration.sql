-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "repo_name" TEXT NOT NULL,
    "token_id" INTEGER NOT NULL,
    CONSTRAINT "user_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "github_token" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "github_token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL
);
