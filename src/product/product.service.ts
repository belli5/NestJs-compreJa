import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    const products = await this.prisma.product.findMany();

    return products.filter(product => 
        product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async findByCategory(category: string){
    const products = await this.prisma.product.findMany() as any[]; 
    
    return products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );
  }

  update(id: number, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
