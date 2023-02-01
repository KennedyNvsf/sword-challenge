import {client} from "../../lib/sanity-client";

export default async function handler(req,res) {
  if(req.method === 'POST') {
    const user = req.body;
    client.createIfNotExists(user)
    .then(() => res.status(200).json('Login Successful'));
  }
}