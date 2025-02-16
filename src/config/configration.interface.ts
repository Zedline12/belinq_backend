export interface Configration {
  auth: {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    oauth: {
      authUri: string;
      tokenUri: string;
      clientId: string;
      clientSecret: string;
      redirectUri: string;
    };
  };
  wallets: {
    googleWallet: {
      issuerId: string;
      issuerEmail: string;
      serviceAccountPrivateKey: string;
    };
  };
  email: {
    transport?: {
      auth: {
        user: string;
        pass: string;
      };
    };
  };
}
