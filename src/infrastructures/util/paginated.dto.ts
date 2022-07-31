import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class PaginatedDTO<TData> {
  @ApiProperty({ description: '總數' })
  total?: number;
  @IsArray()
  @ApiProperty({ isArray: true })
  items: TData[];
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDTO),
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDTO) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
