import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import Mailjet from 'node-mailjet';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Verifica se as credenciais da Mailjet estão definidas
if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY) {
  console.error('❌ MAILJET_API_KEY and MAILJET_SECRET_KEY are required in .env');
  process.exit(1);
}

// Configura o cliente Mailjet
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos da pasta de build (ex: dist)
app.use(express.static(path.join(__dirname, 'dist')));

//
// 📬 ROTA DE CONTATO – envia e-mail para a empresa
//
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'no-reply@saviosoares.com', // Verificado na Mailjet
            Name: 'Website Contact Form',
          },
          To: [
            {
              Email: 'office@savioselections.com',
              Name: 'Savio Soares Selections',
            },
          ],
          Subject: 'New contact form submission',
          TextPart: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
          HTMLPart: `<h3>New Contact Message</h3>
                     <p><strong>Name:</strong> ${name}</p>
                     <p><strong>Email:</strong> ${email}</p>
                     <p><strong>Message:</strong></p>
                     <p>${message}</p>`,
        },
      ],
    });

    console.log('Mailjet response:', request.body);

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact message:', error?.response?.body || error.message);
    res.status(500).json({ error: 'Failed to send contact message' });
  }
});

//
// 📩 ROTA DE NEWSLETTER – envia e-mail de boas-vindas para o visitante
//
app.post('/api/newsletter-subscribe', async (req, res) => {
  const { email } = req.body;

  const isValidEmail = /^[\w.-]+@[\w-]+\.[a-z]{2,}$/i.test(email);
  if (!email || !isValidEmail) {
    return res.status(400).json({ error: 'Invalid or missing email address' });
  }

  try {
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'office@savioselections.com',
            Name: 'Savio Soares Selections',
          },
          To: [
            {
              Email: email,
              Name: 'Subscriber',
            },
          ],
          Subject: 'Welcome to the Savio Soares Selections Newsletter',
          TextPart: 'Thank you for subscribing!',
          HTMLPart: `<h3>Welcome!</h3>
                     <p>Thank you for subscribing to our newsletter.</p>`,
        },
      ],
    });

    res.json({ message: 'Subscription successful, welcome email sent' });
  } catch (error) {
    console.error('Error sending newsletter email:', error?.response?.body || error.message);
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
});

// SPA fallback – para aplicações frontend com React, Vue, etc.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Inicia o servidor
import https from 'https';
import fs from 'fs';

const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

// Inicia servidor HTTPS
const server = https.createServer({ key, cert }, app);
server.listen(PORT, () => {
  console.log(`✅ Server is running on https://localhost:${PORT}`);
});
