import { NotFoundException } from '@nestjs/common';

export class TodoNotFoundException extends NotFoundException {
  constructor(id: number) {
    super({
      message: `Khong tim thay todo voi id${id}`,
      errorCode: 'TODO_NOT_FOUND',
      field: 'id',
    });
  }
}
