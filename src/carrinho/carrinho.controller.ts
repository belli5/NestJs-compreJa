import { Controller, Post, Param, Body, Delete, Get, Patch } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}


  @Post('user/:userId/products')
  addMultipleProductsToCart(
  @Param('userId') userId: string,
  @Body('products') products: { productId: number; quantity: number }[],
  ) {
  return this.carrinhoService.addProductToUserCart(+userId, products);
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

  @Patch(':carrinhoId/finalizar')
  finalizarCompra(
  @Param('carrinhoId') carrinhoId: string,
  @Body('pagamento') pagamento: string
    ) {
  return this.carrinhoService.finalizarCompra(+carrinhoId, pagamento);
}
}
