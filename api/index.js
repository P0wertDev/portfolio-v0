import express from 'express';
import path from 'path';
import { configDotenv } from 'dotenv';
import { Resend } from 'resend';
import cors from 'cors';

configDotenv()

const app = express();
const PORT = process.env.PORT;
const resend = new Resend(process.env.RSKEY);

app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(path.resolve(), "/")))
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.post("/sendMail.js", async (req, res) => {
    const { name, email, subject, html } = req.body;

    const htmlMsg = `<p><strong>De:</strong> ${email} </p> <p><strong>Mensaje:</strong></p> <p>${html}</p>`

    if (!name || !email || !html) return (res.status(400).json({ error: "Todos los datos son requeridos, gracias" }));

    try {
        const data = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `Mensaje nuevo de ${name}`,
            html: htmlMsg,
        })

        console.log({ data });

        return res.status(200).send("¡Gracias por contactarme 😁! Te responderé lo antes posible");

    } catch (err) {
        console.error("Error al enviar el correo", err.message);
        return res.status(500).send("❌ Error al enviar el correo ❌ Inténtalo de nuevo");
    }
});

app.listen(PORT, () => console.log(`Ejecutando el puerto ${PORT}`));

export default app;