import { ConfigFactory } from '@nestjs/config';
import { Configration } from './configration.interface';
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const configration: Configration = {
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    oauth: {
      authUri: process.env.OAUTH_AUTH_URI,
      tokenUri: process.env.OAUTH_TOKEN_URI,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      redirectUri: process.env.OAUTH_REDIRECT_URI,
    },
  },
  wallets: {
    googleWallet: {
      issuerId: process.env.GOOGLE_WALLET_ISSUER_ID,
      issuerEmail: process.env.GOOGLE_WALLET_ISSUER_EMAIL,
      serviceAccountPrivateKey:process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    }
  }
};
const configFunc: ConfigFactory<Configration> = () => configration;
export default configFunc;
