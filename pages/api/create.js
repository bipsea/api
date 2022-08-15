import axios from "axios";
import { Pool } from "pg";
import isValidMetadata from "../../src/isValidMetadata";

export default async function handler(req, res) {
  try {
    const { metadataUri } = req.body;
    if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });
    if (!metadataUri) return res.status(400).send({ error: "Missing metadataUri" });
    const metadata = await axios.get(metadataUri).then((res) => res.data);
    if (!(await isValidMetadata(metadata))) return res.status(400).send({ error: "Invalid metadataUri" });
    if (!process.env.POSTRESQL_CONNECTION) throw new Error("POSTRESQL_CONNECTION is not defined");
    // connect to db
    const pool = new Pool({ connectionString: process.env.POSTRESQL_CONNECTION });
    const query = `INSERT INTO items(item_id, metadata_uri, title, description, image_uri, chain, price, seller, filename, encrypted_file_uri, encrypted_symmetric_key, onchain) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const values = [metadata.itemId, metadataUri, metadata.title, metadata.description, metadata.imageUri, metadata.chain, metadata.price, metadata.seller, metadata.filename, metadata.encryptedFileUri, metadata.encryptedSymmetricKey, false];
    await pool.query(query, values);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
}
