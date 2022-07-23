import { Module } from '@nestjs/common';
import { RunnerServiceModule } from '../service/runner.service.module';
import { RunnerResolver } from './runner.resolver';

@Module({
  imports: [RunnerServiceModule],
  providers: [RunnerResolver],
})
export class RunnerApiModule {}
