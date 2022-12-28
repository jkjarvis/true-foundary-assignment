import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubAuthController } from './github-auth/github-auth.controller';

@Module({
  imports: [],
  controllers: [AppController, GithubAuthController],
  providers: [AppService],
})
export class AppModule {}
