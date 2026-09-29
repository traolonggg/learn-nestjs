import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';
@Injectable()
export class TimingInterCeptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //bat buoc phai co next.handle() vi neu khong co thi no se khong chay sang controller duoc
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
      }),
    );
  }
}
