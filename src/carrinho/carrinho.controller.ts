import { Controller, Post, Param, Body, Delete, Get } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}


  @Post('user/:userId/product/:productId')
  addProductToUserCart(
  @Param('userId') userId: string,
  @Param('productId') productId: string,
  @Body('quantity') quantity: number,
  ) {
   return this.carrinhoService.addProductToUserCart(+userId, +productId, quantity);
 }

  @Delete(':carrinhoId/product/:productId')
  removeFromCart(
    @Param('carrinhoId') carrinhoId: string,
    @Param('productId') productId: string
  ) {
    return this.carrinhoService.removeProduct(+carrinhoId, +productId);
  }

  @Delete(':carrinhoId')
  deleteCart(@Param('carrinhoId') carrinhoId: string) {
    return this.carrinhoService.deleteCart(+carrinhoId);
  }

  @Get(':carrinhoId')
  getCart(@Param('carrinhoId') carrinhoId: string) {
    return this.carrinhoService.getCart(+carrinhoId);
  }
}
