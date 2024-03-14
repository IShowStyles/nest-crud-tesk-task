import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => ({
        timestamp: new Date().toISOString(),
        path: request.url,
        data,
      })),
      catchError((error) => {
        if (error instanceof BadRequestException) {
          throw new BadRequestException({
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            error: error.message,
          });
        }
        throw error;
      }),
    );
  }
}
