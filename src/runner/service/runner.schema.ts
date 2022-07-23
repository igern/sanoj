import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RunnerDocument = Runner & Document;

@Schema()
export class Runner {
  id: string;

  @Prop()
  name: string;
}

export const RunnerSchema = SchemaFactory.createForClass(Runner);
