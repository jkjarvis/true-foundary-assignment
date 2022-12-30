import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { GithubAuthService } from './github-auth.service';
dotenv.config();

@Injectable()
export class GithubAuthApiService {
  constructor(
    private readonly logger: Logger,
    private readonly githubAuthService: GithubAuthService,
  ) {}

  async getAccessToken(code: string) {
    try {
      const data = '';

      const config = {
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
        headers: {
          Accept: 'application/json',
        },
        data: data,
      };

      const res = await axios(config);
      return res.data.access_token;
    } catch (error) {}
  }

  async createRepository(userId: string) {
    this.logger.log(`userId: ${userId}`);
    const accessToken = await this.githubAuthService.getTokenForUser(userId);
    this.logger.log(`accToken: ${accessToken}`);
    try {
      const data = JSON.stringify({
        name: 'test-repo',
        description: 'This is your first repo!',
        homepage: 'https://github.com',
        private: false,
        is_template: false,
      });

      const config = {
        method: 'post',
        url: `https://api.github.com/user/repos`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      const res = await axios(config);
      this.logger.log(res.data);
      return;
    } catch (error) {}
  }
}
