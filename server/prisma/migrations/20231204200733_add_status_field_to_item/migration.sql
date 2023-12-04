-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "quantity" TEXT NOT NULL DEFAULT '1',
    "status" TEXT NOT NULL DEFAULT 'PENDING'
);
INSERT INTO "new_Item" ("createdAt", "id", "quantity", "title") SELECT "createdAt", "id", "quantity", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
