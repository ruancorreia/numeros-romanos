# Quiz de Números Romanos

Um aplicativo web interativo para testar conhecimentos sobre números romanos, com sistema de ranking e painel administrativo.

## Funcionalidades

- Quiz com 30 perguntas sobre números romanos
- Sistema de pontuação e ranking
- Painel administrativo para gerenciar perguntas e ranking
- Interface moderna e responsiva

## Tecnologias Utilizadas

- Next.js 14
- React
- TypeScript
- MongoDB
- Tailwind CSS
- Axios

## Pré-requisitos

- Node.js 18 ou superior
- MongoDB Atlas ou MongoDB local
- npm ou yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/numeros-romanos.git
cd numeros-romanos
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:

```env
MONGODB_URI=sua-string-de-conexao-mongodb
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

5. Acesse o aplicativo em `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── questions/
│   │   └── ranking/
│   ├── admin/
│   ├── quiz/
│   └── ranking/
├── components/
├── lib/
└── models/
```

## Deploy no Vercel

1. Crie uma conta no [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente no painel do Vercel
4. Faça o deploy

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
