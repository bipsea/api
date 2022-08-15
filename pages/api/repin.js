import NextCors from "nextjs-cors";
import axios from "axios";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  try {
    const { cid } = JSON.parse(req.body);
    if (req.method !== "POST") return res.status(405).send({ error: "Only POST allowed" });
    if (!cid) return res.status(400).send({ error: "Missing cid" });
    await fetch("https://api.web3.storage/pins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WEB3_STORAGE_TOKEN}`,
      },
      body: JSON.stringify({ cid }),
    }).then((res) => res.json());
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
}
