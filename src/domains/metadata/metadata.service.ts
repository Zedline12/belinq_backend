import { Injectable } from '@nestjs/common';
import {  CreateMetaDataDto  } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetaData } from './entities/metadata.entity';

@Injectable()
export class MetadataService {
  constructor(@InjectModel(MetaData.name) private metaDatumModel: Model<MetaData>){}
  public async create(createMetadatumDto: CreateMetaDataDto ) {
    return await this.metaDatumModel.create(createMetadatumDto)
  }
  findAll() {
    return `This action returns all metadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metadatum`;
  }

  update(id: number, updateMetadatumDto: UpdateMetadatumDto) {
    return `This action updates a #${id} metadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} metadatum`;
  }
}
