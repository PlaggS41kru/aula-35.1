
# 🛡️ Conceitos de Autenticação e JWT

## ✅ 1. O que é Autenticação?

Autenticação é o **processo de verificar a identidade de um usuário**.

### Tipos comuns:
- **Basic Auth**: usuário/senha em toda requisição (inseguro sem HTTPS).
- **Token-Based** (ex: JWT): autentica uma vez, recebe um token.
- **OAuth2**: usado para login via terceiros (Google, GitHub etc).

---

## 📦 2. Onde guardar dados do usuário autenticado?

Após autenticar, você precisa **manter o estado da sessão**:

| Local | Frontend | Backend |
|-------|----------|---------|
| `localStorage` | Persistente, mas exposto a XSS | — |
| `sessionStorage` | Volátil (fecha aba, perde) | — |
| Cookies | Pode ser HTTP-only e seguro | Ideal com tokens (ex: refresh token) |
| Em memória (Redux, Context) | Para apps SPA | — |
| Em banco de dados (com sessions) | — | Armazena sessões persistentes |

> 🔐 **JWT costuma ser salvo no frontend (`localStorage` ou `cookies`)** e enviado no header `Authorization`.

---

## 🔐 3. O que é JWT?

JWT = **JSON Web Token**  
É um **formato de token** usado para autenticação **sem estado**.

### 🧱 Estrutura:
JWT tem 3 partes, separadas por ponto `.`:

```
xxxxx.yyyyy.zzzzz
```

- **Header**: tipo de token e algoritmo
- **Payload**: dados do usuário (NÃO sensíveis!)
- **Signature**: verificação de integridade

### ✨ Exemplo:
```json
{
  "id": "123",
  "nome": "Fulano",
  "exp": 1720000000
}
```

> 📌 Não confunda JWT com criptografia: **ele é apenas assinado**, e pode ser lido por qualquer um. Só a assinatura é segura!

---

## ⚠️ Cuidados com JWT

- **Nunca coloque dados sensíveis** (senha, CPF, etc).
- Use `exp` para definir validade (timestamp).
- Renove com **refresh tokens** em cookies seguros.
- Revogação de JWT não é nativa → precisa ser implementada à parte (lista negra, versionamento etc).

---

# 🧪 Tutorial básico com `jsonwebtoken`

## 📦 Instale a lib:

```bash
npm install jsonwebtoken
```

## 🔑 Gerando um token

```js
const jwt = require("jsonwebtoken");

const usuario = {
  id: 1,
  nome: "Fulano"
};

const token = jwt.sign(usuario, "chave_secreta", {
  expiresIn: "1h"
});

console.log(token);
```

## 🔍 Verificando um token

```js
const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
try {
  const dados = jwt.verify(token, "chave_secreta");
  console.log(dados);
} catch (erro) {
  console.log("Token inválido ou expirado");
}
```

## 🧱 Middleware de autenticação (Express)

```js
function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ erro: "Token ausente" });

  try {
    const usuario = jwt.verify(token, "chave_secreta");
    req.usuario = usuario;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
}
```

### Exemplo de rota protegida

```js
app.get("/protegido", autenticar, (req, res) => {
  res.send(`Olá, ${req.usuario.nome}`);
});
```

## 🧠 Dica extra: `dotenv`

```env
JWT_SECRET=minha_chave_super_secreta
```

```js
const token = jwt.sign(payload, process.env.JWT_SECRET);
```

---

## 📚 Onde aprender mais

- [JWT.io](https://jwt.io/)
- [jsonwebtoken (npm)](https://www.npmjs.com/package/jsonwebtoken)
- Curso: Alura – API Rest com JWT

---
