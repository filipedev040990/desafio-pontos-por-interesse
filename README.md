# 💬 Project Name

## ✳️ Objetivo

Repositório do desafio https://github.com/backend-br/desafios/blob/master/points-of-interest/PROBLEM.md

Seu desafio será implementar um serviço para a empresa XY Inc., especializada na produção de excelentes receptores GPS (Global Positioning System). A diretoria está empenhada em lançar um dispositivo inovador que promete auxiliar pessoas na localização de pontos de interesse (POIs), e precisa muito de sua ajuda. Você foi contratado para desenvolver a plataforma que fornecerá toda a inteligência ao dispositivo. Esta plataforma deve ser baseada em serviços REST, para flexibilizar a integração.

## Exemplo

Considere a seguinte base de dados de POIs:

'Lanchonete' (x=27, y=12)
'Posto' (x=31, y=18)
'Joalheria' (x=15, y=12)
'Floricultura' (x=19, y=21)
'Pub' (x=12, y=8)
'Supermercado' (x=23, y=6)
'Churrascaria' (x=28, y=2)
Dado o ponto de referência (x=20, y=10) indicado pelo receptor GPS, e uma distância máxima de 10 metros, o serviço deve retornar os seguintes POIs:

Lanchonete
Joalheria
Pub
Supermercado

## Requisitos técnicos

- Cadastrar pontos de interesse, com 03 atributos: nome do POI, coordenada X (inteiro não negativo) e coordenada Y (inteiro não negativo).

- Os POIs devem ser armazenados em uma base de dados.

- Listar todos os POIs cadastrados.

- Listar os POIs por proximidade. Este serviço receberá uma coordenada X e uma coordenada Y, especificando um ponto de referência, bem como uma distância máxima (d-max) em metros. O serviço deverá retornar todos os POIs da base de dados que estejam a uma distância menor ou igual a d-max a partir do ponto de referência.

---

## 🛠 Ferramentas Utilizadas

- [Node](https://nodejs.dev)
- [Express](https://expressjs.com/pt-br/)
- [Mysql](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io)

---

## 💻 Clonando o repositório

- Clone o projeto

  ```bash
  git clone git@github.com:filipedev040990/desafio-backend-magalu.git
  ```

---

## 🏠 Adicionando variáveis de ambiente (.env)

Existe o arquivo `.env.example` com todas as variáveis utilizadas para rodar o sistema. Faça uma cópia desse arquivo e renomeie a cópia para `.env` antes de executar o comando para iniciar a aplicação.

---

## ▶️ Executando o projeto

- Execute o seguinte comando.

  ```bash
    docker compose up -d
  ```

- Utilize o comandos abaixo para verificar se os containers (notifications, database) estão todos rodando.

  ```bash
    docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
  ```

- Utilize o comandos abaixo para acompanhar os logs do serviço order.
  ```bash
    docker logs -f notifications
  ```

---

## Dependências para a execução

Basta ter o docker instalado em sua máquina para executar os containers.

---

## Logs 🖥

Sempre que o serviço ler uma mensagem da fila, ele emitirá um log com informações sobre.
![alt text](image-2.png)

---

## 🧩 Swagger

É possível acessar a documentação da API pelo [Swagger da API](http://localhost:3000/api-docs) e simular os endpoints

---

## 🧪 Testes:

- Rodar todos os testes
  ```bash
  npm t
  ```

---

## 🚀 Commits no projeto

O projeto possui [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à **Lint**;
2. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);

- Padrão no desenvolvimento de um card:
  > tipo(#numero_do_card): descrição em inglês (em letras minúsculas)
- Padrão de desenvolvimento não relacionado a cards
  > tipo(escopo): descrição em inglês (em letras minúsculas)

Exemplos de tipos:

- feat: introduz uma nova funcionalidade à base de código;
- fix: correção de um bug na base de código;
- build: Introduz uma mudança que afeta o build do sistema ou alguma dependência externa (exemplos de escopos: gulp, broccoli, npm);
- chore: atualização de ferramentas, configurações e bibliotecas
- ci: Introduz uma mudança aos arquivos e scripts de configuração do CI/CD (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
- docs: Alterações na documentação
- style: Introduz uma mudança que não afeta o significado do código (remoção de espaços em branco, formatação, ponto e virgula faltando, etc)
- refactor: Uma mudança no código que nem corrige um bug nem adiciona uma nova funcionalidade
- perf: Um mundança no código que melhora a performance
- test: Adicionar testes faltando ou corrigir testes existentes

Exemplos de commits válidos:

```bash
git commit -m "feat(#300): creating auth service"
git commit -m "fix(#30): correcting product type"
git commit -m "style(lint): removing some lint warnings"
git commit -m "docs(readme): removing deploy section from readme"
```

---
