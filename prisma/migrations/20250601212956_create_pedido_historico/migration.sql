-- CreateTable
CREATE TABLE "HistoricoPedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" REAL NOT NULL,
    "pagamento" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'finalizado',
    "userId" INTEGER NOT NULL,
    CONSTRAINT "HistoricoPedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoricoPedidoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "precoUnit" REAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "HistoricoPedidoItem_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "HistoricoPedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HistoricoPedidoItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
