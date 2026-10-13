'use strict';

// Dados extraidos de pesquisas/Grupos_e_Marcas.pdf (fornecido pelo usuario,
// pesquisado em outra IA). Cada marca pode aparecer em mais de um grupo ao
// longo do tempo (ex: Volvo Cars foi da Ford e depois da Geely) — por isso a
// logica de importacao em index.js funde as entradas pelo nome da marca e
// cria um historico de donos (marca-dono) com uma linha por periodo.

module.exports = [
  {
    regiao: 'América do Norte',
    grupos: [
      {
        nome: 'General Motors', nomeCorporativo: 'General Motors Company',
        paisSede: 'Estados Unidos', anoFundacao: 1908, status: 'Ativo',
        marcas: [
          { nome: 'Chevrolet', de: 1918, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Estados Unidos' },
          { nome: 'Cadillac', de: 1909, ate: null, status: 'Ativa', categoriaPrincipal: 'Luxo', paisOrigem: 'Estados Unidos' },
          { nome: 'GMC', de: 1912, ate: null, status: 'Ativa', categoriaPrincipal: 'Comercial / utilitários', paisOrigem: 'Estados Unidos' },
          { nome: 'Buick', de: 1908, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'Estados Unidos' },
          { nome: 'Pontiac', de: 1926, ate: 2010, status: 'Extinta', categoriaPrincipal: 'Volume / Esportivo', paisOrigem: 'Estados Unidos' },
          { nome: 'Oldsmobile', de: 1908, ate: 2004, status: 'Extinta', categoriaPrincipal: 'Premium', paisOrigem: 'Estados Unidos' },
          { nome: 'Saturn', de: 1985, ate: 2010, status: 'Extinta', categoriaPrincipal: 'Volume', paisOrigem: 'Estados Unidos' },
          { nome: 'Hummer', de: 1998, ate: 2010, status: 'Extinta', categoriaPrincipal: 'Off-Road', paisOrigem: 'Estados Unidos' },
          { nome: 'Opel', de: 1929, ate: 2017, status: 'Vendida', categoriaPrincipal: 'Volume', paisOrigem: 'Alemanha' },
          { nome: 'Vauxhall', de: 1925, ate: 2017, status: 'Vendida', categoriaPrincipal: 'Volume', paisOrigem: 'Reino Unido' },
          { nome: 'Saab Automobile', de: 1989, ate: 2010, status: 'Vendida', categoriaPrincipal: 'Premium', paisOrigem: 'Suécia' },
          { nome: 'Holden', de: 1931, ate: 2020, status: 'Extinta', categoriaPrincipal: 'Volume', paisOrigem: 'Austrália' },
          { nome: 'Geo', de: 1989, ate: 1997, status: 'Extinta', categoriaPrincipal: 'Economia', paisOrigem: 'Estados Unidos' },
          { nome: 'Corvette', de: 1953, ate: null, status: 'Ativa', categoriaPrincipal: 'Esportivo', paisOrigem: 'Estados Unidos' },
        ],
      },
      {
        nome: 'Ford Motor Company', nomeCorporativo: 'Ford Motor Company',
        paisSede: 'Estados Unidos', anoFundacao: 1903, status: 'Ativo',
        marcas: [
          { nome: 'Ford', de: 1903, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Estados Unidos' },
          { nome: 'Lincoln', de: 1922, ate: null, status: 'Ativa', categoriaPrincipal: 'Luxo', paisOrigem: 'Estados Unidos' },
          { nome: 'Mercury', de: 1938, ate: 2011, status: 'Extinta', categoriaPrincipal: 'Premium', paisOrigem: 'Estados Unidos' },
          { nome: 'Edsel', de: 1957, ate: 1960, status: 'Extinta', categoriaPrincipal: 'Volume', paisOrigem: 'Estados Unidos' },
          { nome: 'Aston Martin', de: 1987, ate: 2007, status: 'Vendida', categoriaPrincipal: 'Esportivo / Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Jaguar', de: 1989, ate: 2008, status: 'Vendida', categoriaPrincipal: 'Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Land Rover', de: 2000, ate: 2008, status: 'Vendida', categoriaPrincipal: 'Utilitário / Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Volvo Cars', de: 1999, ate: 2010, status: 'Vendida', categoriaPrincipal: 'Premium', paisOrigem: 'Suécia' },
        ],
      },
      {
        nome: 'Tesla, Inc.', nomeCorporativo: 'Tesla, Inc.',
        paisSede: 'Estados Unidos', anoFundacao: 2003, status: 'Ativo',
        marcas: [
          { nome: 'Tesla', de: 2003, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Premium', paisOrigem: 'Estados Unidos' },
        ],
      },
      {
        nome: 'Rivian Automotive', nomeCorporativo: 'Rivian Automotive, Inc.',
        paisSede: 'Estados Unidos', anoFundacao: 2009, status: 'Ativo',
        marcas: [
          { nome: 'Rivian', de: 2009, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Off-Road', paisOrigem: 'Estados Unidos' },
        ],
      },
    ],
  },
  {
    regiao: 'Europa',
    grupos: [
      {
        nome: 'Volkswagen Group', nomeCorporativo: 'Volkswagen Aktiengesellschaft',
        paisSede: 'Alemanha', anoFundacao: 1937, status: 'Ativo',
        marcas: [
          { nome: 'Volkswagen', de: 1937, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Alemanha' },
          { nome: 'Audi', de: 1965, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'Alemanha' },
          { nome: 'Porsche', de: 2012, ate: null, status: 'Ativa', categoriaPrincipal: 'Esportivo / Luxo', paisOrigem: 'Alemanha' },
          { nome: 'Škoda', de: 1991, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'República Tcheca' },
          { nome: 'SEAT', de: 1986, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Espanha' },
          { nome: 'Cupra', de: 2018, ate: null, status: 'Ativa', categoriaPrincipal: 'Esportivo / Volume', paisOrigem: 'Espanha' },
          { nome: 'Bentley', de: 1998, ate: null, status: 'Ativa', categoriaPrincipal: 'Ultra Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Lamborghini', de: 1998, ate: null, status: 'Ativa', categoriaPrincipal: 'Superesportivo', paisOrigem: 'Itália' },
          { nome: 'Bugatti', de: 1998, ate: 2021, status: 'Vendida', categoriaPrincipal: 'Superesportivo', paisOrigem: 'França' },
          { nome: 'Ducati', de: 2012, ate: null, status: 'Ativa', categoriaPrincipal: 'Motocicletas', paisOrigem: 'Itália' },
          { nome: 'MAN', de: 2011, ate: null, status: 'Ativa', categoriaPrincipal: 'Comercial', paisOrigem: 'Alemanha' },
          { nome: 'Scania', de: 2008, ate: null, status: 'Ativa', categoriaPrincipal: 'Comercial', paisOrigem: 'Suécia' },
          { nome: 'Scout Motors', de: 2022, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Off-Road', paisOrigem: 'Estados Unidos' },
        ],
      },
      {
        nome: 'Stellantis', nomeCorporativo: 'Stellantis N.V.',
        paisSede: 'Holanda', anoFundacao: 2021, status: 'Ativo',
        marcas: [
          { nome: 'Fiat', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Itália' },
          { nome: 'Peugeot', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'França' },
          { nome: 'Citroën', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'França' },
          { nome: 'Jeep', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Off-Road', paisOrigem: 'Estados Unidos' },
          { nome: 'Ram', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Utilitários', paisOrigem: 'Estados Unidos' },
          { nome: 'Dodge', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Esportivo / Volume', paisOrigem: 'Estados Unidos' },
          { nome: 'Chrysler', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Estados Unidos' },
          { nome: 'Alfa Romeo', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / Esportivo', paisOrigem: 'Itália' },
          { nome: 'Maserati', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Luxo / Esportivo', paisOrigem: 'Itália' },
          { nome: 'DS Automobiles', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'França' },
          { nome: 'Opel', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Alemanha' },
          { nome: 'Vauxhall', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Reino Unido' },
          { nome: 'Lancia', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'Itália' },
          { nome: 'Abarth', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Esportivo', paisOrigem: 'Itália' },
        ],
      },
      {
        nome: 'BMW Group', nomeCorporativo: 'Bayerische Motoren Werke AG',
        paisSede: 'Alemanha', anoFundacao: 1916, status: 'Ativo',
        marcas: [
          { nome: 'BMW', de: 1916, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'Alemanha' },
          { nome: 'MINI', de: 1994, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / Compacto', paisOrigem: 'Reino Unido' },
          { nome: 'Rolls-Royce Motor Cars', de: 1998, ate: null, status: 'Ativa', categoriaPrincipal: 'Ultra Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Alpina', de: 2022, ate: null, status: 'Ativa', categoriaPrincipal: 'Alta Performance', paisOrigem: 'Alemanha' },
        ],
      },
      {
        nome: 'Mercedes-Benz Group', nomeCorporativo: 'Mercedes-Benz Group AG',
        paisSede: 'Alemanha', anoFundacao: 1926, status: 'Ativo',
        marcas: [
          { nome: 'Mercedes-Benz', de: 1926, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / Luxo', paisOrigem: 'Alemanha' },
          { nome: 'Mercedes-AMG', de: 1999, ate: null, status: 'Ativa', categoriaPrincipal: 'Alta Performance', paisOrigem: 'Alemanha' },
          { nome: 'Mercedes-Maybach', de: 2014, ate: null, status: 'Ativa', categoriaPrincipal: 'Ultra Luxo', paisOrigem: 'Alemanha' },
          { nome: 'Smart', de: 1998, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Urbanos', paisOrigem: 'Alemanha' },
        ],
      },
      {
        nome: 'Renault Group', nomeCorporativo: 'Renault SA',
        paisSede: 'França', anoFundacao: 1899, status: 'Ativo',
        marcas: [
          { nome: 'Renault', de: 1899, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'França' },
          { nome: 'Dacia', de: 1999, ate: null, status: 'Ativa', categoriaPrincipal: 'Economia / Volume', paisOrigem: 'Romênia' },
          { nome: 'Alpine', de: 1973, ate: null, status: 'Ativa', categoriaPrincipal: 'Esportivo', paisOrigem: 'França' },
          { nome: 'Mobilize', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Mobilidade / Elétrico', paisOrigem: 'França' },
          { nome: 'Lada (AvtoVAZ)', de: 2008, ate: 2022, status: 'Vendida', categoriaPrincipal: 'Volume', paisOrigem: 'Rússia' },
        ],
      },
      {
        nome: 'Jaguar Land Rover', nomeCorporativo: 'JLR Automotive PLC',
        paisSede: 'Reino Unido', anoFundacao: 2008, status: 'Ativo',
        marcas: [
          { nome: 'Jaguar', de: 2008, ate: null, status: 'Ativa', categoriaPrincipal: 'Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Land Rover', de: 2008, ate: null, status: 'Ativa', categoriaPrincipal: 'Utilitário / Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Range Rover', de: 2023, ate: null, status: 'Ativa', categoriaPrincipal: 'Ultra Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Defender', de: 2023, ate: null, status: 'Ativa', categoriaPrincipal: 'Off-Road / Luxo', paisOrigem: 'Reino Unido' },
          { nome: 'Discovery', de: 2023, ate: null, status: 'Ativa', categoriaPrincipal: 'Utilitário / Premium', paisOrigem: 'Reino Unido' },
        ],
      },
    ],
  },
  {
    regiao: 'Japão',
    grupos: [
      {
        nome: 'Toyota Motor Corporation', nomeCorporativo: 'Toyota Motor Corporation',
        paisSede: 'Japão', anoFundacao: 1937, status: 'Ativo',
        marcas: [
          { nome: 'Toyota', de: 1937, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Japão' },
          { nome: 'Lexus', de: 1989, ate: null, status: 'Ativa', categoriaPrincipal: 'Luxo', paisOrigem: 'Japão' },
          { nome: 'Daihatsu', de: 1998, ate: null, status: 'Ativa', categoriaPrincipal: 'Compacto / Kei Car', paisOrigem: 'Japão' },
          { nome: 'Hino Motors', de: 2001, ate: null, status: 'Ativa', categoriaPrincipal: 'Comercial', paisOrigem: 'Japão' },
          { nome: 'Scion', de: 2003, ate: 2016, status: 'Extinta', categoriaPrincipal: 'Jovem / Volume', paisOrigem: 'Estados Unidos' },
        ],
      },
      {
        nome: 'Honda Motor Co.', nomeCorporativo: 'Honda Motor Co., Ltd.',
        paisSede: 'Japão', anoFundacao: 1948, status: 'Ativo',
        marcas: [
          { nome: 'Honda', de: 1948, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Japão' },
          { nome: 'Acura', de: 1986, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / Luxo', paisOrigem: 'Japão' },
        ],
      },
      {
        nome: 'Nissan Motor Co.', nomeCorporativo: 'Nissan Motor Co., Ltd.',
        paisSede: 'Japão', anoFundacao: 1933, status: 'Ativo',
        marcas: [
          { nome: 'Nissan', de: 1933, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Japão' },
          { nome: 'Infiniti', de: 1989, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'Japão' },
          { nome: 'Datsun', de: 1931, ate: 2022, status: 'Extinta', categoriaPrincipal: 'Economia / Volume', paisOrigem: 'Japão' },
        ],
      },
      {
        nome: 'Subaru Corporation', nomeCorporativo: 'Subaru Corporation',
        paisSede: 'Japão', anoFundacao: 1953, status: 'Ativo',
        marcas: [
          { nome: 'Subaru', de: 1953, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Japão' },
        ],
      },
      {
        nome: 'Mazda Motor Corporation', nomeCorporativo: 'Mazda Motor Corporation',
        paisSede: 'Japão', anoFundacao: 1920, status: 'Ativo',
        marcas: [
          { nome: 'Mazda', de: 1920, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume / Premium', paisOrigem: 'Japão' },
          { nome: 'Eunos', de: 1989, ate: 1996, status: 'Extinta', categoriaPrincipal: 'Premium', paisOrigem: 'Japão' },
          { nome: 'Ẽfini', de: 1991, ate: 1997, status: 'Extinta', categoriaPrincipal: 'Luxo', paisOrigem: 'Japão' },
          { nome: 'Autozam', de: 1989, ate: 1998, status: 'Extinta', categoriaPrincipal: 'Compacto / Kei Car', paisOrigem: 'Japão' },
        ],
      },
      {
        nome: 'Mitsubishi Motors Corporation', nomeCorporativo: 'Mitsubishi Motors Corporation',
        paisSede: 'Japão', anoFundacao: 1970, status: 'Ativo',
        marcas: [
          { nome: 'Mitsubishi Motors', de: 1970, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Japão' },
        ],
      },
      {
        nome: 'Suzuki Motor Corporation', nomeCorporativo: 'Suzuki Motor Corporation',
        paisSede: 'Japão', anoFundacao: 1909, status: 'Ativo',
        marcas: [
          { nome: 'Suzuki', de: 1909, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume / Compactos', paisOrigem: 'Japão' },
        ],
      },
    ],
  },
  {
    regiao: 'Coreia do Sul',
    grupos: [
      {
        nome: 'Hyundai Motor Group', nomeCorporativo: 'Hyundai Motor Group',
        paisSede: 'Coreia do Sul', anoFundacao: 2000, status: 'Ativo',
        marcas: [
          { nome: 'Hyundai', de: 1967, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Coreia do Sul' },
          { nome: 'Kia', de: 1998, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Coreia do Sul' },
          { nome: 'Genesis', de: 2015, ate: null, status: 'Ativa', categoriaPrincipal: 'Luxo', paisOrigem: 'Coreia do Sul' },
          { nome: 'Ioniq', de: 2020, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico', paisOrigem: 'Coreia do Sul' },
        ],
      },
      {
        nome: 'KG Mobility Corporation', nomeCorporativo: 'KG Mobility Corporation',
        paisSede: 'Coreia do Sul', anoFundacao: 1954, status: 'Ativo',
        marcas: [
          { nome: 'KG Mobility', de: 2022, ate: null, status: 'Ativa', categoriaPrincipal: 'Utilitários / SUV', paisOrigem: 'Coreia do Sul' },
          { nome: 'SsangYong', de: 1988, ate: 2022, status: 'Rebatizada', categoriaPrincipal: 'Utilitários / SUV', paisOrigem: 'Coreia do Sul' },
        ],
      },
    ],
  },
  {
    regiao: 'Ásia/China',
    grupos: [
      {
        nome: 'Geely Holding Group', nomeCorporativo: 'Zhejiang Geely Holding Group Co., Ltd.',
        paisSede: 'China', anoFundacao: 1986, status: 'Ativo',
        marcas: [
          { nome: 'Geely Auto', de: 1997, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'China' },
          { nome: 'Volvo Cars', de: 2010, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'Suécia' },
          { nome: 'Polestar', de: 2015, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Performance', paisOrigem: 'Suécia' },
          { nome: 'Lynk & Co', de: 2016, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / Conectado', paisOrigem: 'China' },
          { nome: 'Zeekr', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Luxo', paisOrigem: 'China' },
          { nome: 'Lotus Cars', de: 2017, ate: null, status: 'Ativa', categoriaPrincipal: 'Superesportivo', paisOrigem: 'Reino Unido' },
          { nome: 'Proton', de: 2017, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Malásia' },
          { nome: 'LEVC', de: 2013, ate: null, status: 'Ativa', categoriaPrincipal: 'Comercial / Mobilidade', paisOrigem: 'Reino Unido' },
          { nome: 'Radar Auto', de: 2022, ate: null, status: 'Ativa', categoriaPrincipal: 'Picape / Elétrico', paisOrigem: 'China' },
        ],
      },
      {
        nome: 'BYD Company', nomeCorporativo: 'BYD Company Limited',
        paisSede: 'China', anoFundacao: 1995, status: 'Ativo',
        marcas: [
          { nome: 'BYD Auto', de: 2003, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume / Elétrico', paisOrigem: 'China' },
          { nome: 'Denza', de: 2010, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / Elétrico', paisOrigem: 'China' },
          { nome: 'Yangwang', de: 2023, ate: null, status: 'Ativa', categoriaPrincipal: 'Ultra Luxo', paisOrigem: 'China' },
          { nome: 'Fangchengbao', de: 2023, ate: null, status: 'Ativa', categoriaPrincipal: 'Off-Road / Premium', paisOrigem: 'China' },
        ],
      },
      {
        nome: 'SAIC Motor Corporation', nomeCorporativo: 'SAIC Motor Corporation Limited',
        paisSede: 'China', anoFundacao: 1955, status: 'Ativo',
        marcas: [
          { nome: 'MG Motor', de: 2007, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'Reino Unido' },
          { nome: 'Roewe', de: 2006, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume / Premium', paisOrigem: 'China' },
          { nome: 'Maxus', de: 2011, ate: null, status: 'Ativa', categoriaPrincipal: 'Comercial / SUV', paisOrigem: 'China' },
          { nome: 'IM Motors', de: 2020, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Luxo', paisOrigem: 'China' },
          { nome: 'Baojun', de: 2010, ate: null, status: 'Ativa', categoriaPrincipal: 'Economia', paisOrigem: 'China' },
          { nome: 'Wuling', de: 2002, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume / Micro', paisOrigem: 'China' },
        ],
      },
      {
        nome: 'Great Wall Motor', nomeCorporativo: 'Great Wall Motor Co., Ltd.',
        paisSede: 'China', anoFundacao: 1984, status: 'Ativo',
        marcas: [
          { nome: 'Haval', de: 2013, ate: null, status: 'Ativa', categoriaPrincipal: 'SUV / Volume', paisOrigem: 'China' },
          { nome: 'ORA', de: 2018, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Urbano', paisOrigem: 'China' },
          { nome: 'TANK', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Off-Road / Premium', paisOrigem: 'China' },
          { nome: 'WEY', de: 2016, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / SUV', paisOrigem: 'China' },
          { nome: 'GWM POER', de: 2019, ate: null, status: 'Ativa', categoriaPrincipal: 'Utilitários / Picape', paisOrigem: 'China' },
        ],
      },
      {
        nome: 'Changan Automobile', nomeCorporativo: 'Chongqing Changan Automobile Co., Ltd.',
        paisSede: 'China', anoFundacao: 1862, status: 'Ativo',
        marcas: [
          { nome: 'Changan', de: 1959, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'China' },
          { nome: 'Deepal', de: 2022, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / NEV', paisOrigem: 'China' },
          { nome: 'Avatr', de: 2021, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium / Elétrico', paisOrigem: 'China' },
          { nome: 'Kaicene', de: 2019, ate: null, status: 'Ativa', categoriaPrincipal: 'Comercial', paisOrigem: 'China' },
        ],
      },
      {
        nome: 'Chery Automobile', nomeCorporativo: 'Chery Automobile Co., Ltd.',
        paisSede: 'China', anoFundacao: 1997, status: 'Ativo',
        marcas: [
          { nome: 'Chery', de: 1997, ate: null, status: 'Ativa', categoriaPrincipal: 'Volume', paisOrigem: 'China' },
          { nome: 'Exeed', de: 2017, ate: null, status: 'Ativa', categoriaPrincipal: 'Premium', paisOrigem: 'China' },
          { nome: 'Jetour', de: 2018, ate: null, status: 'Ativa', categoriaPrincipal: 'SUV / Volume', paisOrigem: 'China' },
          { nome: 'Omoda', de: 2022, ate: null, status: 'Ativa', categoriaPrincipal: 'Crossover / Global', paisOrigem: 'China' },
          { nome: 'Jaecoo', de: 2023, ate: null, status: 'Ativa', categoriaPrincipal: 'Off-Road / Premium', paisOrigem: 'China' },
          { nome: 'Luxeed', de: 2023, ate: null, status: 'Ativa', categoriaPrincipal: 'Elétrico / Tech', paisOrigem: 'China' },
        ],
      },
    ],
  },
];
