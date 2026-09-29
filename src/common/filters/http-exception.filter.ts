import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class HtttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const errorBody =
        typeof exceptionResponse === 'string'
          ? {
              message: exceptionResponse,
            }
          : (exceptionResponse as { message?: string });
      res.status(status).json({
        success: false,
        ...errorBody,
        message: errorBody.message || 'Da co loi xay ra!',
        path: req.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }
    console.log('Unexpected error', exception);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Da co loi xay ra vui long thu lai sau!',
      errorCode: 'INTERNAL_SERVER_ERROR',
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
