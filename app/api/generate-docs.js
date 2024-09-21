import { NextApiRequest, NextApiResponse } from 'next';
import htmlToDocx from 'html-to-docx';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { htmlContent } = req.body;

    // Generate the DOCX file
    const buffer = await htmlToDocx(htmlContent);

    // Set headers to trigger download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename="document.docx"');

    // Send the buffer to the client
    res.send(buffer);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}