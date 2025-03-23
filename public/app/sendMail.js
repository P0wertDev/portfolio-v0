const mailForm = document.getElementById("mail-form");
mailForm.onsubmit = async (e) => {
	e.preventDefault();

	const notificationMsg = document.getElementById("notification-message");
	notificationMsg.innerHTML = "";
	notificationMsg.setAttribute("style", "display: block");
	notificationMsg.classList.remove("animation-msg-out");

	const formData = new FormData(mailForm);
	const data = Object.fromEntries(formData.entries());

	try {
		const response = await fetch("/sendMail.js", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseText = await response.text();
		if (response.status > 300) {
			notificationMsg.innerHTML = responseText;
			notificationMsg.setAttribute("style", "color:peru");
			notificationMsg.classList.add("animation-msg-in");
			setTimeout(() => {
				notificationMsg.classList.remove("animation-msg-in");
				notificationMsg.classList.add("animation-msg-out");
			}, 5000);
			setTimeout(() => {
				notificationMsg.setAttribute("style", "display: none");
			}, 6000);
			return;
		}

		if (response.status >= 200 && response.status < 300) {
			notificationMsg.innerHTML = responseText;
			notificationMsg.classList.add("animation-msg-in");
			setTimeout(() => {
				notificationMsg.classList.remove("animation-msg-in");
				notificationMsg.classList.add("animation-msg-out");
			}, 5000);
			setTimeout(() => {
				notificationMsg.setAttribute("style", "display: none");
			}, 6000);
		}
	} catch (err) {
		console.error("Error al enviar:", err);
	}
	
	mailForm.reset();
};
