import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://almorariuex:<Ak.47de.12>@cluster0.p8eonbv.mongodb.net/?retryWrites=true&w=majority"

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient && cachedClient.isConnected()) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      depreciationErrors: false,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  return client;
}

export default connectToDatabase;
