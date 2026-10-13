'use strict';

const fs = require('fs');
const path = require('path');
const gruposMarcasSeed = require('./data/grupos-marcas-seed');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const apis = ['grupo', 'marca', 'marca-dono', 'modelo', 'motorizacao', 'versao'];
    const actions = ['find', 'findOne'];

    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    for (const api of apis) {
      for (const action of actions) {
        const actionId = `api::${api}.${api}.${action}`;
        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action: actionId, role: publicRole.id } });

        if (!existing) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: { action: actionId, role: publicRole.id },
          });
        }
      }
    }

    await seedExampleData(strapi);
    await importGruposMarcas(strapi);
    await fixSituacao(strapi);
    await limparDonosDuplicados(strapi);
    await importModelosGeracoes(strapi);
    await fixMissingSlugs(strapi);
    await despublicarMarcasPrematuras(strapi);
  },
};

// Correcao pontual: antes do bugfix do fixMissingSlugs, uma tentativa
// interrompida da importacao de modelos/geracoes publicou 10 marcas novas
// sem querer. Essas marcas devem ficar como rascunho ate revisao, igual as
// outras criadas pela mesma importacao.
const MARCAS_PARA_DESPUBLICAR = ['AC', 'Arcfox', 'Ariel', 'Aro', 'Artega', 'Aurus', 'BAIC', 'Borgward', 'Bristol', 'Bufori'];
async function despublicarMarcasPrematuras(strapi) {
  for (const nome of MARCAS_PARA_DESPUBLICAR) {
    const publicado = await strapi.documents('api::marca.marca').findFirst({ filters: { nome }, status: 'published' });
    if (publicado) {
      await strapi.documents('api::marca.marca').unpublish({ documentId: publicado.documentId });
    }
  }
}

// Apelidos entre o nome usado no CSV de pesquisa e o nome ja cadastrado via
// o PDF de grupos/marcas (mesma marca, grafias diferentes) — evita criar
// marcas duplicadas.
const ALIASES_MARCA = {
  ds: 'DS Automobiles', lada: 'Lada (AvtoVAZ)', geely: 'Geely Auto', kgm: 'KG Mobility',
  maybach: 'Mercedes-Maybach', mitsubishi: 'Mitsubishi Motors', 'rolls-royce': 'Rolls-Royce Motor Cars',
  volvo: 'Volvo Cars', scout: 'Scout Motors', saab: 'Saab Automobile', byd: 'BYD Auto',
  mg: 'MG Motor', lotus: 'Lotus Cars',
};

function parseCsvLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } else inQuotes = false;
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

// Importa o catalogo de modelos/geracoes gerado pela pesquisa do usuario
// (CatalogoAutomotivo). Tudo entra como RASCUNHO (nao publicado) porque a
// propria fonte marca os dados como "RASCUNHO_PENDENTE_VALIDACAO" — fica
// disponivel pra revisar no painel, sem aparecer no site publico ainda.
async function importModelosGeracoes(strapi) {
  const csvPath = path.join(__dirname, 'data', 'modelos_e_geracoes.csv');
  const markerPath = path.join(__dirname, 'data', '.modelos_geracoes_importado');
  if (!fs.existsSync(csvPath) || fs.existsSync(markerPath)) return;

  const lines = fs.readFileSync(csvPath, 'utf8').split('\n').filter((l) => l.trim().length > 0);
  const header = parseCsvLine(lines[0]);
  const col = (cols, name) => cols[header.indexOf(name)];

  const existingMarcas = await strapi.documents('api::marca.marca').findMany({ pagination: { pageSize: 500 } });
  const marcaCache = {};
  existingMarcas.forEach((m) => { marcaCache[m.nome.toLowerCase()] = m.documentId; });

  async function resolverMarca(nomeCsv) {
    const lower = nomeCsv.toLowerCase();
    if (marcaCache[lower]) return marcaCache[lower];
    const aliasAlvo = ALIASES_MARCA[lower];
    if (aliasAlvo && marcaCache[aliasAlvo.toLowerCase()]) return marcaCache[aliasAlvo.toLowerCase()];
    const nova = await strapi.documents('api::marca.marca').create({
      data: { nome: nomeCsv, tipo: 'Carros', iniciais: gerarIniciais(nomeCsv) },
    });
    marcaCache[lower] = nova.documentId;
    return nova.documentId;
  }

  const modeloCache = {};
  let criados = 0;
  let ignorados = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const marcaNome = (col(cols, 'marca') || '').trim();
    const modeloNome = (col(cols, 'modelo') || '').trim();
    const geracao = (col(cols, 'geracao') || '').trim();
    const anoInicio = parseInt(col(cols, 'ano_inicio_geracao'), 10);
    const anoFimRaw = (col(cols, 'ano_fim_geracao') || '').trim();
    const anoFim = anoFimRaw ? parseInt(anoFimRaw, 10) : null;
    const carroceria = (col(cols, 'carroceria') || '').trim();
    const fonte = (col(cols, 'fonte') || '').trim();
    const licenca = (col(cols, 'licenca_dados') || '').trim();

    if (!marcaNome || !modeloNome || !geracao || !Number.isFinite(anoInicio)) {
      ignorados++;
      continue;
    }

    const marcaDocId = await resolverMarca(marcaNome);
    const modeloKey = marcaDocId + '|' + modeloNome.toLowerCase();
    let modeloDocId = modeloCache[modeloKey];
    if (!modeloDocId) {
      const existente = await strapi.documents('api::modelo.modelo').findFirst({
        filters: { nome: modeloNome, marca: marcaDocId },
      });
      if (existente) {
        modeloDocId = existente.documentId;
      } else {
        const novoModelo = await strapi.documents('api::modelo.modelo').create({
          data: { nome: modeloNome, categoria: carroceria || undefined, marca: marcaDocId },
        });
        modeloDocId = novoModelo.documentId;
      }
      modeloCache[modeloKey] = modeloDocId;
    }

    const decada = Math.floor(anoInicio / 10) * 10 + 's';

    await strapi.documents('api::versao.versao').create({
      data: {
        geracao,
        anoInicio,
        anoFim,
        decada,
        modelo: modeloDocId,
        fontes: fonte ? `${fonte} | Licença: ${licenca}` : undefined,
      },
    });

    criados++;
    if (criados % 500 === 0) strapi.log.info(`Importação modelos/gerações: ${criados} versões criadas...`);
  }

  strapi.log.info(
    `Importação modelos/gerações concluída: ${criados} versões criadas como rascunho (pendente revisão), ${ignorados} linhas ignoradas por falta de dados.`
  );
  fs.writeFileSync(markerPath, new Date().toISOString());
}

// O seed de exemplo (5 marcas) e a importacao do PDF se sobrepoem em
// Chevrolet/Opel/Fiat/Honda/Volkswagen, criando periodos de dono repetidos.
// Remove duplicatas exatas (mesma marca+grupo+ano de entrada) e, no caso da
// Opel, fica com o ano mais preciso do PDF (Stellantis desde 2021, nao 2017 —
// a Opel ficou com a PSA sozinha entre 2017 e a fusao que criou a Stellantis).
async function limparDonosDuplicados(strapi) {
  const todos = await strapi.documents('api::marca-dono.marca-dono').findMany({
    populate: ['marca', 'grupo'],
    pagination: { pageSize: 500 },
  });

  const vistos = new Set();
  for (const dono of todos) {
    if (!dono.marca || !dono.grupo) continue;
    const chave = `${dono.marca.nome}|${dono.grupo.nome}|${dono.de}`;
    const chaveObsoleta = dono.marca.nome === 'Opel' && dono.grupo.nome === 'Stellantis' && dono.de === 2017;

    if (vistos.has(chave) || chaveObsoleta) {
      await strapi.documents('api::marca-dono.marca-dono').delete({ documentId: dono.documentId });
    } else {
      vistos.add(chave);
    }
  }
}

// Correcao pontual: o campo "status" tinha o mesmo nome do parametro
// reservado do Strapi (rascunho/publicado) e foi renomeado para "situacao".
// Isso preenche os registros que ja foram criados antes da renomeacao.
async function fixSituacao(strapi) {
  const sentinela = await strapi.documents('api::marca.marca').findFirst({ filters: { nome: 'Opel' } });
  if (sentinela && sentinela.situacao === 'Ativa') return;

  for (const regiaoBlock of gruposMarcasSeed) {
    for (const g of regiaoBlock.grupos) {
      const grupoDoc = await strapi.documents('api::grupo.grupo').findFirst({ filters: { nome: g.nome } });
      if (grupoDoc) {
        await strapi.documents('api::grupo.grupo').update({
          documentId: grupoDoc.documentId,
          data: { situacao: g.status },
          status: 'published',
        });
      }

      for (const m of g.marcas) {
        const marcaDoc = await strapi.documents('api::marca.marca').findFirst({ filters: { nome: m.nome } });
        if (marcaDoc) {
          await strapi.documents('api::marca.marca').update({
            documentId: marcaDoc.documentId,
            data: { situacao: m.status },
            status: 'published',
          });
        }
      }
    }
  }
}

function gerarIniciais(nome) {
  const palavras = nome.split(/\s+/).filter(Boolean);
  if (palavras.length >= 2) return (palavras[0][0] + palavras[1][0]).toUpperCase();
  return nome.slice(0, 2).toUpperCase();
}

async function importGruposMarcas(strapi) {
  const jaImportado = await strapi.documents('api::grupo.grupo').findFirst({
    filters: { nome: 'Toyota Motor Corporation' },
  });
  if (jaImportado) return;

  const grupoDocIds = {};

  for (const regiaoBlock of gruposMarcasSeed) {
    for (const g of regiaoBlock.grupos) {
      let grupoDoc = await strapi.documents('api::grupo.grupo').findFirst({ filters: { nome: g.nome } });
      if (!grupoDoc) {
        grupoDoc = await strapi.documents('api::grupo.grupo').create({
          data: {
            nome: g.nome,
            nomeCorporativo: g.nomeCorporativo,
            paisSede: g.paisSede,
            anoFundacao: g.anoFundacao,
            regiao: regiaoBlock.regiao,
            situacao: g.status,
          },
          status: 'published',
        });
      }
      grupoDocIds[g.nome] = grupoDoc.documentId;

      for (const m of g.marcas) {
        let marcaDoc = await strapi.documents('api::marca.marca').findFirst({ filters: { nome: m.nome } });
        if (!marcaDoc) {
          marcaDoc = await strapi.documents('api::marca.marca').create({
            data: {
              nome: m.nome,
              tipo: m.categoriaPrincipal.includes('Motocicletas') ? 'Motos' : 'Carros',
              iniciais: gerarIniciais(m.nome),
              categoriaPrincipal: m.categoriaPrincipal,
              paisOrigem: m.paisOrigem,
              situacao: m.status,
            },
            status: 'published',
          });
        } else {
          await strapi.documents('api::marca.marca').update({
            documentId: marcaDoc.documentId,
            data: { categoriaPrincipal: m.categoriaPrincipal, paisOrigem: m.paisOrigem, situacao: m.status },
            status: 'published',
          });
        }

        let donoExistente;
        try {
          donoExistente = await strapi.documents('api::marca-dono.marca-dono').findFirst({
            filters: { marca: marcaDoc.documentId, grupo: grupoDocIds[g.nome], de: m.de },
          });
        } catch (e) {
          donoExistente = null;
        }

        if (!donoExistente) {
          await strapi.documents('api::marca-dono.marca-dono').create({
            data: { marca: marcaDoc.documentId, grupo: grupoDocIds[g.nome], de: m.de, ate: m.ate },
          });
        }
      }
    }
  }

  strapi.log.info('Importação de grupos e marcas (PDF) concluída.');
}

function slugify(s) {
  const semAcento = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return semAcento.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function fixMissingSlugs(strapi) {
  for (const api of ['grupo', 'marca']) {
    const docs = await strapi.documents(`api::${api}.${api}`).findMany({ filters: { slug: { $null: true } } });
    for (const doc of docs) {
      // Preserva o status atual (rascunho continua rascunho) — só corrige o slug.
      await strapi.documents(`api::${api}.${api}`).update({
        documentId: doc.documentId,
        data: { slug: slugify(doc.nome) },
        status: doc.publishedAt ? 'published' : 'draft',
      });
    }
  }
}

async function seedExampleData(strapi) {
  const grupoCount = await strapi.documents('api::grupo.grupo').count();
  if (grupoCount > 0) return;

  const grupos = {};
  for (const nome of ['General Motors', 'Stellantis', 'Honda Motor Co.', 'Volkswagen Group']) {
    const doc = await strapi.documents('api::grupo.grupo').create({ data: { nome }, status: 'published' });
    grupos[nome] = doc.documentId;
  }

  const motorizacoes = {};
  for (const nome of ['4 cilindros', 'V6', 'V8', 'Bicilíndrico']) {
    const doc = await strapi.documents('api::motorizacao.motorizacao').create({ data: { nome } });
    motorizacoes[nome] = doc.documentId;
  }

  const motorIds = (nomes) => nomes.map((n) => motorizacoes[n]);

  const brandsData = [
    {
      nome: 'Chevrolet', tipo: 'Carros', iniciais: 'CH',
      donos: [{ grupo: 'General Motors', de: 1918, ate: null }],
      modelos: [
        { nome: 'Vectra', categoria: 'Sedã', versoes: [
          { geracao: 'A', anoInicio: 1993, anoFim: 1996, decada: '1990s', motor: ['4 cilindros'] },
          { geracao: 'B', anoInicio: 1997, anoFim: 2005, decada: '2000s', motor: ['4 cilindros', 'V6'] },
          { geracao: 'C', nota: 'Pré-facelift', anoInicio: 2006, anoFim: 2008, decada: '2000s', motor: ['4 cilindros'] },
          { geracao: 'C', nota: 'Facelift', anoInicio: 2009, anoFim: 2011, decada: '2010s', motor: ['4 cilindros'] },
        ] },
        { nome: 'Opala', categoria: 'Sedã', versoes: [
          { geracao: '1ª geração', anoInicio: 1968, anoFim: 1972, decada: '1960s', motor: ['4 cilindros', 'V6', 'V8'] },
          { geracao: '1ª geração', anoInicio: 1973, anoFim: 1978, decada: '1970s', motor: ['4 cilindros', 'V6', 'V8'] },
          { geracao: '2ª geração', anoInicio: 1979, anoFim: 1986, decada: '1980s', motor: ['4 cilindros', 'V6', 'V8'] },
          { geracao: '2ª geração', anoInicio: 1987, anoFim: 1992, decada: '1990s', motor: ['4 cilindros', 'V6', 'V8'] },
        ] },
        { nome: 'Celta', categoria: 'Hatch', versoes: [
          { geracao: 'Geração única', anoInicio: 2000, anoFim: 2006, decada: '2000s', motor: ['4 cilindros'] },
          { geracao: 'Geração única', nota: 'Facelift', anoInicio: 2007, anoFim: 2016, decada: '2010s', motor: ['4 cilindros'] },
        ] },
      ],
    },
    {
      nome: 'Opel', tipo: 'Carros', iniciais: 'OP',
      donos: [{ grupo: 'General Motors', de: 1929, ate: 2017 }, { grupo: 'Stellantis', de: 2017, ate: null }],
      modelos: [],
    },
    {
      nome: 'Fiat', tipo: 'Carros', iniciais: 'FI',
      donos: [{ grupo: 'Stellantis', de: 2021, ate: null }],
      modelos: [
        { nome: 'Uno', categoria: 'Hatch', versoes: [
          { geracao: 'Uno antigo', anoInicio: 1984, anoFim: 2013, decada: '1980s', motor: ['4 cilindros'] },
          { geracao: 'Novo Uno', anoInicio: 2010, anoFim: 2021, decada: '2010s', motor: ['4 cilindros'] },
        ] },
      ],
    },
    {
      nome: 'Honda', tipo: 'Motos', iniciais: 'HM',
      donos: [{ grupo: 'Honda Motor Co.', de: 1948, ate: null }],
      modelos: [
        { nome: 'CB 500', categoria: 'Moto', versoes: [
          { geracao: '1ª geração', anoInicio: 1993, anoFim: 2003, decada: '1990s', motor: ['Bicilíndrico'] },
          { geracao: 'CB 500F', nota: 'Geração atual', anoInicio: 2013, anoFim: 2024, decada: '2010s', motor: ['Bicilíndrico'] },
        ] },
      ],
    },
    {
      nome: 'Volkswagen', tipo: 'Carros', iniciais: 'VW',
      donos: [{ grupo: 'Volkswagen Group', de: 1937, ate: null }],
      modelos: [],
    },
  ];

  for (const b of brandsData) {
    const marca = await strapi.documents('api::marca.marca').create({
      data: { nome: b.nome, tipo: b.tipo, iniciais: b.iniciais },
      status: 'published',
    });

    for (const periodo of b.donos) {
      await strapi.documents('api::marca-dono.marca-dono').create({
        data: { marca: marca.documentId, grupo: grupos[periodo.grupo], de: periodo.de, ate: periodo.ate },
      });
    }

    for (const m of b.modelos) {
      const modelo = await strapi.documents('api::modelo.modelo').create({
        data: { nome: m.nome, categoria: m.categoria, marca: marca.documentId },
        status: 'published',
      });

      for (const v of m.versoes) {
        await strapi.documents('api::versao.versao').create({
          data: {
            geracao: v.geracao,
            nota: v.nota || null,
            anoInicio: v.anoInicio,
            anoFim: v.anoFim,
            decada: v.decada,
            modelo: modelo.documentId,
            motorizacoes: motorIds(v.motor),
          },
          status: 'published',
        });
      }
    }
  }

  strapi.log.info('Seed de exemplo criado: 5 marcas, 4 grupos, 4 modelos, 12 versoes.');
}
