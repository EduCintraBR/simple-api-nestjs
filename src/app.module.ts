import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { FileModule } from './file/file.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    FileModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    forwardRef(() => UserModule), 
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'orin56@ethereal.email',
          pass: 'w7hPtHuf9hmgaqKSQf',
        },
      },
      defaults: {
        from: '"ArtnicDev" <orin56@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: ThrottlerGuard
  }],
  exports: [AppService],
})
export class AppModule {}
