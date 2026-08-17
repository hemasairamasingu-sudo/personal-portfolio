const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/contact",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            }
        );

        const data = await response.json();

        document.getElementById("response").textContent =
            data.message;

        contactForm.reset();

    } catch (error) {

        document.getElementById("response").textContent =
            "Unable to send message.";

        console.error(error);
    }

});