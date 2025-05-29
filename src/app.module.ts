import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule, PrismaModule, CarrinhoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
