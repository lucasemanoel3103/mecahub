import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { name } = createProductDto;

    const productExists = await this.prisma.product.findFirst({
      where: { name },
    });

    if (productExists) {
      throw new ConflictException(`Esse produto já foi cadastrado: ${name}`);
    }

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!productExists) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return this.prisma.product.update({
      data: updateProductDto,
      where: {
        id: id,
      },
    });
  }

  async remove(id: number){
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
