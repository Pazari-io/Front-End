import Moralis from "moralis/node";

const appId = "jHlgkX0b9FI3ULS05l2DUKeoeVHXFgZNvYxfBZ81"
const serverUrl = "https://glo3xa5f7seh.usemoralis.com:2053/server"

const main = async () => {
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;

  const query = new Moralis.Query("User");
  const result = await query.find()
  console.log(result);
};

main()
  .then(() => process.exit(0))
  .catch((err: Error) => {
    console.error(err);
    process.exit(1);
  });