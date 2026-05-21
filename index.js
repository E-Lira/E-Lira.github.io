function saudacao() {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia 👋";
    if (h < 18) return "Boa tarde 👋";
    return "Boa noite 👋";
}

function emailValido(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = document.querySelector("#contactForm");
const feedback = document.querySelector("#feedback");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const msg = form.mensagem.value.trim();

        limpar();

        if (!nome || !email || !msg) {
            erro("Preencha todos os campos!");
            marcar();
            return;
        }

        if (!emailValido(email)) {
            erro("Email inválido!");
            form.email.style.border = "2px solid red";
            return;
        }

        if (feedback) {
            feedback.style.color = "#5bbe42";
            feedback.textContent = `${saudacao()} ${nome}, mensagem enviada com sucesso!`;
        }

        localStorage.setItem("ultimoUsuario", nome);
        form.reset();
    });
}

function erro(msg) {
    if (feedback) {
        feedback.style.color = "red";
        feedback.textContent = msg;
    }
}

function marcar() {
    if (!form) return;
    form.nome.style.border = "2px solid red";
    form.email.style.border = "2px solid red";
    form.mensagem.style.border = "2px solid red";
}

function limpar() {
    if (!form) return;
    form.nome.style.border = "";
    form.email.style.border = "";
    form.mensagem.style.border = "";
}

const cards = document.querySelectorAll(".card");

cards.forEach(c => {
    c.addEventListener("click", () => {
        c.style.transform = "scale(1.08)";
        setTimeout(() => c.style.transform = "scale(1)", 150);
    });
});

window.addEventListener("load", () => {
    const ultimo = localStorage.getItem("ultimoUsuario");
    if (ultimo) console.log(ultimo);

    const logado = localStorage.getItem("logged");
    const auth = document.getElementById("authSection");
    const contact = document.getElementById("contactSection");

    if (logado === "true" && auth && contact) {
        auth.style.display = "none";
        contact.style.display = "block";
    }
});

function register() {
    const u = document.getElementById("regUser").value.trim();
    const p = document.getElementById("regPass").value.trim();
    const m = document.getElementById("registerMsg");

    if (!u || !p) {
        m.style.color = "red";
        m.textContent = "Preencha todos os campos!";
        return;
    }

    localStorage.setItem("user", u);
    localStorage.setItem("pass", p);

    m.style.color = "#5bbe42";
    m.textContent = "Cadastro realizado!";
}

function login() {
    const u = document.getElementById("loginUser").value.trim();
    const p = document.getElementById("loginPass").value.trim();

    const su = localStorage.getItem("user");
    const sp = localStorage.getItem("pass");

    const m = document.getElementById("loginMsg");

    if (!u || !p) {
        m.style.color = "red";
        m.textContent = "Preencha todos os campos!";
        return;
    }

    if (u === su && p === sp) {
        localStorage.setItem("logged", "true");

        const auth = document.getElementById("authSection");
        const contact = document.getElementById("contactSection");

        if (auth && contact) {
            auth.style.display = "none";
            contact.style.display = "block";
        }
    } else {
        m.style.color = "red";
        m.textContent = "Usuário ou senha inválidos!";
    }
}

function toggleForms() {
    const l = document.getElementById("loginBox");
    const r = document.getElementById("registerBox");

    if (!l || !r) return;

    if (l.style.display === "none") {
        l.style.display = "block";
        r.style.display = "none";
    } else {
        l.style.display = "none";
        r.style.display = "block";
    }
}

function logout() {
    localStorage.removeItem("logged");

    const auth = document.getElementById("authSection");
    const contact = document.getElementById("contactSection");

    if (auth && contact) {
        auth.style.display = "block";
        contact.style.display = "none";
    }
}