import { Resend } from "resend";

export default async (req) => {

    if (req.method !== "POST") return new Response("Método no permitido", { status: 405 });

    const resend = new Resend(process.env.RSKEY);

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
        return new Response(
            JSON.stringify({ error: "Todos los campos son requeridos" }),
            { status: 400 }
        );
    }

    const htmlMsg = `
        <p><strong>De:</strong> ${name} (${email}) </p>
        <p><strong>Asunto:</strong> ${subject} </p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
    `;

    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM, //NOTE - EJ: contacto@tudominio.com
            to: process.env.EMAIL_TO, //NOTE - correo personal
            subject: `Nuevo mensaje de ${name}: ${subject}`,
            html: htmlMsg,
        });

        return new Response(
            JSON.stringify({
                ok: true,
                message: "¡Mensaje enviado! Te responderé pronto 😁. Gracias por escribir"
            }),
            { status: 200 }
        );
    } catch (err) {
        console.error("Error al enviar correo:", err.message);
        return new Response(
            JSON.stringify({ error: "Error al enviar el correo, por favor, inténtalo de nuevo" }),
            { status: 500 }
        );
    }

};

export const config = {
    path: "/api/contact"
}