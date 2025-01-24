export interface Configration {
  auth: {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    oauth: {
      authUri: string;
      tokenUri:string
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }; 
  }
}
