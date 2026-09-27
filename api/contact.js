import nodemailer from 'nodemailer'

// Ova funkcija se pokreće na Vercel-u kao serverless endpoint: /api/contact
// Koristi GoDaddy/Titan SMTP nalog (podešen preko env varijabli u Vercel-u)
// da pošalje mejl kad neko popuni kontakt formu na sajtu.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, address, city, kwh, phone, message } = req.body || {}

  // Osnovna validacija — ime, telefon i poruka su obavezni
  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Nedostaju obavezna polja.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net', // GoDaddy/Titan SMTP server
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER, // npr. info@greenideas.rs
        pass: process.env.EMAIL_PASS, // lozinka za taj mejl nalog
      },
    })

    await transporter.sendMail({
      from: `"Green Ideas sajt" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // gde upit stiže
      replyTo: undefined, // posetilac ne ostavlja svoj mejl u formi, samo telefon
      subject: `Novi upit sa sajta — ${name}`,
      text: [
        `Ime i prezime: ${name}`,
        `Adresa objekta: ${address || '-'}`,
        `Grad: ${city || '-'}`,
        `Prosečna mesečna potrošnja: ${kwh ? kwh + ' kWh' : '-'}`,
        `Telefon: ${phone}`,
        '',
        'Poruka:',
        message,
      ].join('\n'),
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Greška pri slanju mejla:', err)
    return res.status(500).json({ error: 'Slanje nije uspelo. Pokušajte ponovo.' })
  }
}
