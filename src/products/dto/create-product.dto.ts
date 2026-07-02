import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  @IsString({ message: 'O nome deve ser um String' })
  name: string;

  @IsNotEmpty({ message: 'A marca do produto é obrigatório.' })
  @IsString({ message: 'A marca deve ser um String' })
  mark: string;

  @IsNotEmpty({ message: 'O valor do produto é obrigatório.' })
  @IsPositive({ message: 'O preço deve ser um valor maior que zero.' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 2,
    },
    {
      message:
        'O preço deve ser um número válido com no máximo 2 casas decimais.',
    },
  )
  price: number;

  @IsNotEmpty({ message: 'A descrição do produto é obrigatório.' })
  @IsString({ message: 'A descrição deve ser um String' })
  description: string;
}
