import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { metaDataSchema } from './entities/metadata.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: 'MetaData', schema: metaDataSchema}])],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
