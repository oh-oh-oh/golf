import { EnvKey, EnvKeys } from './env.generated';

class EnvironmentVariables {
  private missingKeys: string[] = [];

  constructor() {
    EnvKeys.forEach(key => {
      if (!process.env[key]) this.missingKeys.push(key);
    });
    if (this.missingKeys.length)
      throw new Error(
        `Missing Environment Variables: ${this.missingKeys.join(', ')}`,
      );
  }

  get(key: EnvKey) {
    return process.env[key]!;
  }

  getOptional(key: string, fallback: string) {
    return process.env[key] || fallback;
  }

  NODE_ENV: 'production' | 'development' | 'test' = this.get('NODE_ENV') as any;
  PORT = this.getOptional('PORT', '3000');
  JWT_SECRET = this.get('JWT_SECRET');
  ALLOWED_CORS_ORIGIN = this.get('ALLOWED_CORS_ORIGIN');

}

export default new EnvironmentVariables();
