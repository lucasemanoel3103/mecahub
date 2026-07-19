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
    const { name, code } = createProductDto;

    const nameExists = await this.prisma.product.findFirst({
      where: { name },
    });

    if (nameExists) {
      throw new ConflictException(`Esse produto já foi cadastrado: ${name}`);
    }

    const codeExists = await this.prisma.product.findFirst({
      where: { code },
    });

    if (codeExists) {
      throw new ConflictException(`Esse código já foi cadastrado: ${code}`);
    }

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name, code } = updateProductDto;

    const productExists = await this.prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException('Produto não encontrado!');
    }

    if (name) {
      const nameExists = await this.prisma.product.findFirst({
        where: { name, id: { not: id } },
      });

      if (nameExists) {
        throw new ConflictException(
          `Esse produto já foi cadastrado: ${name}`,
        );
      }
    }

    if (code) {
      const codeExists = await this.prisma.product.findFirst({
        where: { code, id: { not: id } },
      });

      if (codeExists) {
        throw new ConflictException(`Esse código já foi cadastrado: ${code}`);
      }
    }

    return this.prisma.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  async remove(id: number) {
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