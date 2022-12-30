import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubAuthModule } from './github-auth/github-auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GithubAuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
