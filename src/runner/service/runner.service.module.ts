import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Runner, RunnerSchema } from './runner.schema';
import { RunnerService } from './runner.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Runner.name, schema: RunnerSchema }]),
  ],
  providers: [RunnerService],
  exports: [RunnerService],
})
export class RunnerServiceModule {}
