import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GithubAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async createToken(token: string) {
    return await this.prismaService.githubToken.create({
      data: {
        token: token,
      },
    });
  }

  async createUser(state: string, tokenId: number, repoName: string) {
    await this.prismaService.user.create({
      data: {
        id: state,
        repo_name: repoName,
        token_id: tokenId,
      },
    });
  }

  async getTokenForUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        GithubToken: true,
      },
    });
    return user.GithubToken.token;
  }
}
