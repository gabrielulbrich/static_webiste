document
  .getElementById("send-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let nome = document.getElementsByName("nome")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let telefone = document.getElementsByName("telefone")[0].value;
    let mensagem = document.getElementsByName("mensagem")[0].value;
    let aceito_wpp = document.getElementsByName("aceito_wpp")[0].checked;
    let aceito_email = document.getElementsByName("aceito_email")[0].checked;
    let termo = document.getElementsByName("termo")[0].checked;

    if ((nome === "") || (email === "") || (telefone === "") || (mensagem === "")) {
        alert('Todos os campos são obrigatórios')
        return;
    }

    aceito_wpp = aceito_wpp == true ? "1" : "0";
    aceito_email = aceito_email == true ? "1" : "0";
    termo = termo == true ? "1" : "0";

    let data = new FormData();

    data.append("nome", nome);
    data.append("email", email);
    data.append("telefone", telefone);
    data.append("mensagem", mensagem);
    data.append("aceito_wpp", aceito_wpp);
    data.append("aceito_email", aceito_email);
    data.append("termo", termo);

    // // Convert to a query string
    let queryString = new URLSearchParams(data).toString();

    fetch("https://api.gabrielulbrich.com.br/gabrielulbrich/static-page", {
      method: "POST",
      body: queryString,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        if (response.ok) {
          alert("Lead enviado com sucesso");
          console.log(response);
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        alert("Something went wrong.");
      });
  });
