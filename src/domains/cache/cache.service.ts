import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
export enum CacheType {
  USER = 'user',
}
@Injectable()
export class CacheService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({ host: 'localhost', port: 6379 }); // Adjust as needed
  }

  async set(key: string, value: any, ttl?: number) {
    const data = JSON.stringify(value);
    if (ttl) {
      await this.redisClient.setex(key, ttl, data); // Set with expiration
    } else {
      await this.redisClient.set(key, data);
    }
  }

  async get(key: string) {
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    await this.redisClient.del(key);
  }
  getCacheKey(CacheType: CacheType, id: string): string {
    return `${CacheType}:${id}`;
  }
}
