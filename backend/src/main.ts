import express from "express";
import Jimp from "jimp";
import { backgroundBase64 } from "./data";
import Database from "better-sqlite3";
import JSZip from "jszip"

const db = new Database("archive.db")
const app = express()

app.use(express.json())

app.post("/api/v1/generate-ponies", async (req, res) => {
  const cards: string[] = req.body.cards;

  const cardBuffers = cards.flatMap((card) => {
    const faces = (db.prepare("SELECT * FROM Faces WHERE name LIKE ?").all(`%${card}%`) as any[])
    const buffers = faces.map((r: any) => JSON.parse(r.data).image).map((d: string) => Buffer.from(d.replace(/^data:image\/\w+;base64,/, ''), "base64"))

    return buffers
  })

  const resultData: string[] = []

  const borderSize = 36

  for (const cardBuffer of cardBuffers) {
    const image = await Jimp.read(cardBuffer)
    const baseImage = await Jimp.read(Buffer.from(backgroundBase64, "base64"))

    baseImage.resize(image.getWidth() + borderSize * 2, image.getHeight() + borderSize * 2)
    baseImage.composite(image, borderSize, borderSize)

    resultData.push(await baseImage.getBase64Async(-1))
  }

  const resultBuffers = resultData.map(d => Buffer.from(d.replace(/^data:image\/\w+;base64,/, ''), "base64"))
  const zip = new JSZip()

  const guid = () => { return Math.random().toString(36).substring(7) }

  for (const buffer of resultBuffers) {
    zip.file(`${guid()}.jpg`, buffer)
  }

  res.setHeader("Content-Type", "application/zip")
  res.setHeader("Content-Disposition", `attachment; filename=${guid()}.zip`)
  res.send(await zip.generateAsync({ type: "nodebuffer" }))
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})