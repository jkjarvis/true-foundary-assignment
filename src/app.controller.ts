import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { GithubAuthApiService } from './github-auth/github-auth-api.service';
import { v4 as uuidv4 } from 'uuid';
import { GithubAuthService } from './github-auth/github-auth.service';
dotenv.config();

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
    private readonly githubAuthApiService: GithubAuthApiService,
    private readonly githubAuthService: GithubAuthService,
  ) {}

  @Get()
  getHomepage(): string {
    const state = uuidv4();
    return `<!DOCTYPE html>
              <html>
              <body>

              <h1>Authroize Github</h1>

              <a href="https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&login&scope=repo&state=${state}"><button type="button">Click Me!</button></a>
              
              </body>
              </html>`;
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Query('state') state: string) {
    const accessToken = await this.githubAuthApiService.getAccessToken(code);
    const token = await this.githubAuthService.createToken(accessToken);
    await this.githubAuthService.createUser(state, token.id, 'default');

    return `<!DOCTYPE html>
              <html>
              <body>

              <h1>Create Repo</h1>

              <a href="${process.env.SERVER_BASE_URL}/create-repo?state=${state}"><button type="button">Create Repo!</button></a>
              
              </body>
              </html>`;
  }

  @Get('create-repo')
  async createRepo(@Query('state') state: string) {
    await this.githubAuthApiService.createRepository(state);
    return '<!DOCTYPE html><h1>Done</h1></html>';
  }
}
