if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import knex from "knex";

const ssl = process.env.DOCUMENT_DATABASE_HOST === "127.0.0.1" ? false : true;

const DB = knex({
  client: "pg",
  connection: {
    ssl: ssl,
    port: Number(process.env.DOCUMENT_DATABASE_PORT),
    host: process.env.DOCUMENT_DATABASE_HOST,
    database: process.env.DOCUMENT_DATABASE_NAME,
    user: process.env.DOCUMENT_DATABASE_USERNAME,
    password: process.env.DOCUMENT_DATABASE_PASSWORD,
  },
});

export default async function handler(req, res) {
  const result = await DB.select(
    "address",
    "address_id",
    "allowance",
    "allowance_array",
    "audit_trail",
    "create_message_timestamp",
    "create_at_height",
    "deal_count",
    "industry",
    "initial_allowance",
    "issue_create_timestamp",
    "name",
    "org_name",
    "provider_count",
    "received_datacap_change",
    "region",
    "retries",
    "top_provider",
    "used_datacap_change",
    "used_dc",
    "verifier_address_id",
    "verifier_name",
    "website",
    "data"
  ).from("fil-user-explorer");

  res.status(200).json(result);
}
