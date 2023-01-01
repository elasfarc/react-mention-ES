type Person = {
  label: string;
  name: string;
  email: string;
};

type ElasticConfig = {
  cloudID: string;
  username: string;
  password: string;
  apiKey: string;
};

type OpenaiConfig = { apiKey: string };

export { ElasticConfig, OpenaiConfig, Person };
