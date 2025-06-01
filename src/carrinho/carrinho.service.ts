import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CarrinhoService {
  constructor(private prisma: PrismaService) {}

  // usado apenas para ser chamado na função addProductToUserCart
  async createCart(userId: number) {
  return this.prisma.carrinho.create({
    data: {
      userId,
    },
  });
 }

  async addProductToUserCart(
  userId: number,
  products: { productId: number; quantity: number }[]
 ) {
  // Buscar ou criar o carrinho do usuário
  let carrinho = await this.prisma.carrinho.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' }, // mais recente
  });

  if (!carrinho) {
    carrinho = await this.createCart(userId);
  }

  // Processar cada produto recebido
  const operations = products.map(({ productId, quantity }) =>
    this.prisma.carrinhoItem.upsert({
      where: {
        carrinhoId_productId: {
          carrinhoId: carrinho.id,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        carrinhoId: carrinho.id,
        productId,
        quantity,
      },
    })
  );

  // Executar todas as operações em paralelo
  return Promise.all(operations);
 }



  async removeProduct(carrinhoId: number, productId: number) {
    return this.prisma.carrinhoItem.deleteMany({
      where: {
        carrinhoId: carrinhoId,
        productId: productId,
      },
    });
  }

  async deleteCart(carrinhoId: number) {
  // Primeiro, apagar todos os itens do carrinho
  await this.prisma.carrinhoItem.deleteMany({
    where: { carrinhoId },
  });

  // Depois, apagar o carrinho
  return this.prisma.carrinho.delete({
    where: { id: carrinhoId },
  });
 }


  async getCart(carrinhoId: number) {
    return this.prisma.carrinho.findUnique({
      where: { id: carrinhoId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async finalizarCompra(carrinhoId: number, formaPagamento: string) {
  const carrinho = await this.prisma.carrinho.findUnique({
    where: { id: carrinhoId },
    include: {
      items: { include: { product: true } },
      user: true
    }
  });

  if (!carrinho || carrinho.items.length === 0) {
    throw new Error("Carrinho inválido ou vazio.");
  }

  const total = carrinho.items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const pedido = await this.prisma.historicoPedido.create({
    data: {
      userId: carrinho.userId,
      total: total,
      pagamento: formaPagamento,
      status: 'finalizado',
      itens: {
        create: carrinho.items.map(item => ({
          quantidade: item.quantity,
          precoUnit: item.product.price,
          productId: item.productId,
        }))
      }
    },
    include: {
      itens: true
    }
  });

  // Limpar o carrinho
  await this.prisma.carrinhoItem.deleteMany({ where: { carrinhoId } });
  // Remove o carrinho
  await this.prisma.carrinho.delete({ where: { id: carrinhoId } });

  return pedido;
 }

}
