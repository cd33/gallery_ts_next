import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'data', 'lists.json')
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData.toString())
    res.status(200).json(data)
  } else if (req.method === 'POST') {
    const newWord = {
      en: req.body.en,
      fr: req.body.fr
    }

    const filePath = path.join(process.cwd(), 'data', 'lists.json')
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData.toString())
    data.englishList[0].words.push(newWord)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({message: 'Success !'})
  }
}