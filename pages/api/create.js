import { Sequelize} from "sequelize";
import isValidMetadata from "../../src/isValidMetadata";
import Items from "../../src/models/Items";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { metadataUri } = req.body;
    if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });
    if (!metadataUri) return res.status(400).send({ error: "Missing metadataUri" });
    const metadata = await axios.get(metadataUri).then((res) => res.data);
    if (!(await isValidMetadata(metadata))) return res.status(400).send({ error: "Invalid metadataUri" });
    // connect to db 
    if (!process.env.POSTRESQL_CONNECTION) throw new Error("POSTRESQL_CONNECTION is not defined");
    const sequelize = new Sequelize(process.env.POSTRESQL_CONNECTION);
    await sequelize.authenticate();
    // await Items(sequelize).sync({force: true}); // force: true will drop the table if it already exists
    const items = Items(sequelize);
    await items.create({
      itemId: metadata.itemId,
      title: metadata.title,
      description: metadata.description,
      imageUri: metadata.imageUri,
      chain: metadata.chain,
      price: metadata.price,
      seller: metadata.seller,
      filename: metadata.filename,
      encryptedFileUri: metadata.encryptedFileUri,
      encryptedSymmetricKey: metadata.encryptedSymmetricKey,
      onchain: false,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
}
