# Enciclopédia Automotiva

Uma "Wikipédia de carros e motos": catálogo por marca/grupo → modelo → geração/versão → ano, com ficha técnica, história, curiosidades e galeria de fotos.

## Como trabalhar com o usuário

- O usuário **não programa** e faz o projeto por hobby, usando IA. Responda em **português**, em linguagem simples, e explique o que fez de forma curta.
- Ele gosta de coisas que funcionam e de sugestões de ferramentas/ideias que ele não conhece. Sugira, mas sem encher de opções.
- **Regra de ouro: custo zero.** Nada de API paga ou serviço com cobrança recorrente. Prefira ferramentas gratuitas e execução local.
- **Design:** não redesenhe "no escuro". Duas tentativas sem referência já foram rejeitadas ("cara de site de IA"). Peça um print, link ou referência antes de mudar o visual.
- Commits só quando o usuário pedir. Não abrir pull request sem pedido.

## Estrutura do repositório

- `index.html` — frontend inteiro (HTML/CSS/JS puro, sem build, sem framework). Fica na raiz.
- `cms/` — backend Strapi (dados + painel administrativo, banco SQLite local).
- `cms/src/data/` — CSVs de importação (modelos por marca) e scripts de seed.
- `cms/src/index.js` — contém `importarListasDeModelosPorMarca`, que importa os CSVs.
- `pesquisas/` — material de pesquisa.
- Repositório: `omisael-crypto/enciclopedia-automotiva` (público, necessário pro GitHub Pages grátis).
- Na máquina do usuário a pasta é `C:\Users\Misael\enciclopedia-automotiva\` (Windows). O pipeline Python de pesquisa dele fica em `C:\Users\Misael\Documents\CatalogoAutomotivo\`.

## Publicação

- **Site:** GitHub Pages, `https://omisael-crypto.github.io/enciclopedia-automotiva/`. Atualiza sozinho a cada push na branch `master`.
- **Strapi:** roda só no PC do usuário (`http://localhost:1337/admin`). Para acesso externo usa túnel grátis do Cloudflare (`cloudflared tunnel --url http://localhost:1337`). O endereço muda a cada reinício, então é preciso atualizar a constante `API_URL` no topo do `<script>` do `index.html`.
- **Migração para hospedagem permanente** (Render roda o Strapi + Supabase como banco Postgres, planos grátis): decidida, mas **adiada de propósito** até o usuário cadastrar mais dados. Migrar antes perderia edições feitas no painel.

## Modelo de dados

- **Grupo** (conglomerado: General Motors, Stellantis)
- **Marca** (Chevrolet, Honda) — tem histórico de donos (`marca-dono`: marca + grupo + ano início + ano fim). Ex.: Opel foi GM até 2017, depois Stellantis.
- **Modelo** (Chevrolet Opala) — pertence a uma marca.
- **Versão** (geração/facelift, com anos, motorizações) — pertence a um modelo.
- **Motorização** (tag reutilizável: "V6", "4 cilindros", "Elétrico") — associada à versão.
- O card da grade é **um por modelo**; a setinha do card percorre as gerações em ordem cronológica.
- O frontend busca a API do Strapi com `fetch` e usa `exampleBrands` como fallback se a API não responder.

### Tipo de veículo (`tipoVeiculo`: Carro | Moto | Caminhão)

Se a marca tem mais de um tipo, aparecem abas no topo da página dela; se tem só um, nada aparece. Regras já decididas, não perguntar de novo:

- **Picapes contam como Carro** (S10, Hilux, Ranger, Silverado, D-20...).
- **Caminhão** só quando a categoria diz mesmo "Caminhão" (comercial pesado).
- **Elétrico/híbrido continua sendo Carro** — é tag de motorização, não tipo de veículo.
- `categoria` (Sedã, Hatch, SUV, Picape, Esportivo...) é separada e serve de filtro secundário dentro de cada tipo.

## Pipeline de dados

O usuário pesquisa fora (outra IA ou o pipeline Python dele), gera um CSV e o Claude importa no Strapi.

Formato, um arquivo por marca, nome `<marca>-modelos.csv` em `cms/src/data/`:

```
marca,nome_modelo,categoria,regiao_origem,ano_inicio,ano_fim,status_producao
```

Qualquer `*-modelos.csv` nessa pasta é processado automaticamente quando o Strapi reinicia: cria o modelo, uma versão "placeholder" e classifica o `tipoVeiculo` sozinho. Não precisa mexer em código.

Já importado: ~7.394 linhas (`modelos_e_geracoes.csv`, 164 marcas) como rascunho pendente de revisão, mais a lista completa de modelos históricos da Chevrolet (338 linhas).

## Estado visual

- Tela inicial (abas Marcas/Grupos), página da marca com grade de modelos, filtros (categoria/motor/década), página de detalhe com galeria e linha do tempo de gerações, timeline de donos da marca.
- Navegação usa `history.pushState`/`popstate`, então o botão voltar físico do celular funciona. Há botão "‹ Voltar" visível na página da marca.
- Fotos atuais são **placeholders** do Lorem Picsum (`picsum.photos`), não são fotos reais dos carros.
- Cor de destaque por marca (hash do nome → paleta de 9 cores), só dentro da página da marca/detalhe.

## Pendências

1. Fichas técnicas ricas (motor, potência, torque, dimensões). Combinado manter simples (nível 1, só o nome) por enquanto; nível 2 fica pra depois.
2. Fotos reais com licença livre. Ideia sugerida: Wikimedia Commons (API grátis) com crédito do autor.
3. Migração para Render + Supabase (adiada).
4. Menu de ícones por carroceria dentro da página da marca (referência: configurador de carro). Só a decisão de onde ficaria foi tomada.
