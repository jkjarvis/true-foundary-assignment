import { Logger, Module } from '@nestjs/common';
import { GithubAuthApiService } from './github-auth-api.service';
import { GithubAuthService } from './github-auth.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GithubAuthApiService, Logger, GithubAuthService],
  exports: [GithubAuthApiService, GithubAuthService],
})
export class GithubAuthModule {}
