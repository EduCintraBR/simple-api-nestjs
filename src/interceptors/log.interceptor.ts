import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const req = context.switchToHttp().getRequest();
                console.log(`Request path: ${req.url}`);
                console.log(`Request method: ${req.method}`);
                console.log(`Request time: ${Date.now() - now}ms`);
            }),
        );
    }
}