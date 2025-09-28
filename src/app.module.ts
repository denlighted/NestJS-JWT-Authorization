import {type MiddlewareConsumer, Module, type NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';




@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggingMiddleware).forRoutes({path: '*', method: RequestMethod.POST});
  // }
}
