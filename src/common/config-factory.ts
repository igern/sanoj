import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export class ConfigFactory {
  static mongooseConfig(configService: ConfigService): MongooseModuleOptions {
    return {
      uri: configService.getOrThrow('MONGODB_URI'),
    };
  }
}
