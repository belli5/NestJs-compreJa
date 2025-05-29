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

  async addProductToUserCart(userId: number, productId: number, quantity: number) {
  // Tentar encontrar carrinho do usuário
  let carrinho = await this.prisma.carrinho.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' }, // pega o mais recente
  });

  // Se não existe carrinho, cria um novo
  if (!carrinho) {
    carrinho = await this.createCart(userId);
  }

  // Adiciona ou atualiza produto no carrinho
  return this.prisma.carrinhoItem.upsert({
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
  });
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

  
}
