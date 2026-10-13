// The engine behind the "Try it" demo on the Search & Filter Engine project
// page (src/components/projects/SearchDemo.astro). No page code in here, so it
// can be run and checked with Node on its own.
//
// It is a small JavaScript rebuild of the ideas the case study describes, on
// made-up data: company names are reduced to a brand root, job titles are
// sorted into a level and a function by keyword rules, and a search only reads
// those prepared values. Nothing here comes from the real tool or its data:
// every company name is coined from syllables and there are no people at all.

export const COUNTRIES = ['United States', 'United Kingdom', 'Germany', 'Singapore', 'Australia', 'Japan', 'Canada', 'Philippines'];
export const INDUSTRIES = ['Banking & Finance', 'Technology', 'Manufacturing', 'Healthcare', 'Retail', 'Energy', 'Logistics', 'Telecom'];
export const SIZES = ['1–49', '50–249', '250–999', '1,000–4,999', '5,000+'];
export const LEVELS = ['C-level', 'VP', 'Head', 'Director', 'Manager', 'Staff'];
export const FUNCTIONS = ['Cybersecurity', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Data', 'IT'];

const STAFF = LEVELS.length - 1;

// ---------- Reading a company name ----------

// Words that say nothing about which company it is
const WEAK = new Set([
  'the', 'and', 'company', 'co', 'ltd', 'limited', 'pte', 'pty', 'sdn', 'bhd', 'inc', 'incorporated',
  'corp', 'corporation', 'plc', 'llc', 'group', 'holdings', 'holding',
]);

const tokenize = (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

/** "The Veltrix Logistics Co., Ltd." -> ["veltrix", "logistics"]; the first one is the brand root */
export const strongTokens = (name) => tokenize(name).filter((token) => !WEAK.has(token));

// ---------- Reading a job title ----------

const C_ACRONYMS = ['ceo', 'cmo', 'cro', 'cio', 'cto', 'ciso', 'cfo', 'chro', 'coo', 'cdo'];
// Checked in this order; the first rule with a word in the title decides the level
const LEVEL_RULES = [
  ['chief', ...C_ACRONYMS],
  ['vp', 'svp', 'evp', 'vice'],
  ['head'],
  ['director'],
  ['manager'],
];
// Words that go with a level word and carry no meaning of their own
const LEVEL_COMPANIONS = [['officer'], ['president'], [], [], []];

// Same order as FUNCTIONS. Security comes first so "IT Security" is not read
// as IT; IT comes last because its words are the most general.
const FUNCTION_RULES = [
  ['cybersecurity', 'information security', 'it security', 'security', 'ciso'],
  ['marketing', 'brand', 'growth', 'demand generation', 'cmo'],
  ['sales', 'business development', 'commercial', 'revenue', 'cro'],
  ['finance', 'financial', 'accounting', 'treasury', 'cfo'],
  ['human resources', 'hr', 'people', 'talent', 'chro'],
  ['operations', 'operating', 'supply chain', 'procurement', 'coo'],
  ['data', 'analytics', 'business intelligence', 'cdo'],
  ['information technology', 'it', 'technology', 'infrastructure', 'information', 'cio', 'cto'],
];

const STOP = new Set(['of', 'the', 'and', 'for', 'in', 'at']);

/** Level and function of a title, each -1 when no rule fits, plus the words left over */
function readTitle(text) {
  const tokens = tokenize(text);
  const padded = ` ${tokens.join(' ')} `;
  const used = new Set();

  let level = -1;
  for (let i = 0; i < LEVEL_RULES.length && level < 0; i++) {
    if (!LEVEL_RULES[i].some((word) => tokens.includes(word))) continue;
    level = i;
    [...LEVEL_RULES[i], ...LEVEL_COMPANIONS[i]].forEach((word) => used.add(word));
  }

  let fn = -1;
  for (let i = 0; i < FUNCTION_RULES.length && fn < 0; i++) {
    const phrase = FUNCTION_RULES[i].find((p) => padded.includes(` ${p} `));
    if (!phrase) continue;
    fn = i;
    phrase.split(' ').forEach((word) => used.add(word));
  }

  const rest = tokens.filter((token) => !used.has(token) && !STOP.has(token));
  return { tokens, level, fn, rest };
}

// ---------- Made-up data ----------

// Small seeded random number generator, so everyone gets the same 50,000 rows
function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Company names are coined: one opening and one ending, 40 x 30 = 1,200 brands
const OPENINGS = [
  'Vel', 'Nor', 'Cor', 'Zen', 'Lum', 'Ard', 'Tav', 'Sol', 'Kyn', 'Mer', 'Orb', 'Fen', 'Hal', 'Jun', 'Bry', 'Ost', 'Quil', 'Rav', 'Syl', 'Tor',
  'Ulm', 'Wex', 'Yar', 'Alv', 'Bex', 'Cal', 'Dov', 'Eld', 'Gan', 'Hex', 'Ix', 'Jor', 'Kes', 'Lor', 'Myr', 'Nev', 'Oph', 'Pry', 'Rhi', 'Stra',
];
const ENDINGS = [
  'trix', 'vane', 'dara', 'lith', 'mora', 'nex', 'quon', 'risa', 'tara', 'vex', 'wyn', 'zor', 'bela', 'cora', 'dene',
  'fax', 'gont', 'harta', 'iona', 'kemi', 'lumo', 'nyx', 'ondo', 'pera', 'rune', 'sota', 'tide', 'umbra', 'vio', 'xa',
];
// One or two sector words per industry (same order as INDUSTRIES)
const SECTOR_WORDS = [
  ['Bank', 'Capital'], ['Systems', 'Labs'], ['Foundry', 'Motors'], ['Health', 'Clinics'],
  ['Retail', 'Foods'], ['Energy', 'Power'], ['Logistics', 'Freight'], ['Telecom', 'Networks'],
];
const SUFFIXES = ['Ltd', 'Pte Ltd', 'Sdn Bhd', 'Inc', 'Pty Ltd', 'Co., Ltd.', 'PLC', 'Corp'];
const FORMS = 8;

/** The same company, the eight ways it gets typed into a lead file */
function spell(brand, form) {
  switch (form) {
    case 0: return brand.name;
    case 1: return `${brand.name} ${brand.sector}`;
    case 2: return `${brand.name} ${brand.sector} ${brand.suffix}`;
    case 3: return `${brand.name} ${brand.suffix}`;
    case 4: return `${brand.name} ${brand.sector}`.toUpperCase();
    case 5: return `${brand.name} Holdings ${brand.suffix}`;
    case 6: return `${brand.name} Group`;
    default: return `The ${brand.name} ${brand.sector} Company`;
  }
}

// What each function is called in a title (same order as FUNCTIONS), and its C-level titles
const FUNCTION_NAMES = [
  ['Cybersecurity', 'Information Security', 'IT Security'],
  ['Marketing', 'Digital Marketing', 'Brand', 'Growth', 'Demand Generation'],
  ['Sales', 'Business Development', 'Commercial'],
  ['Finance', 'Accounting', 'Treasury'],
  ['HR', 'Human Resources', 'People', 'Talent Acquisition'],
  ['Operations', 'Supply Chain', 'Procurement'],
  ['Data', 'Analytics', 'Business Intelligence'],
  ['IT', 'Information Technology', 'Technology', 'Infrastructure'],
];
const CHIEFS = [
  ['Chief Information Security Officer', 'CISO'],
  ['Chief Marketing Officer', 'CMO'],
  ['Chief Revenue Officer', 'CRO', 'Chief Commercial Officer'],
  ['Chief Financial Officer', 'CFO'],
  ['Chief People Officer', 'CHRO', 'Chief Human Resources Officer'],
  ['Chief Operating Officer', 'COO'],
  ['Chief Data Officer', 'CDO'],
  ['Chief Information Officer', 'CIO', 'Chief Technology Officer', 'CTO'],
];
// Title wordings per level below C-level (same order as LEVELS, from VP)
const WORDINGS = [
  [(n) => `VP of ${n}`, (n) => `Vice President, ${n}`, (n) => `SVP ${n}`],
  [(n) => `Head of ${n}`, (n) => `Global Head of ${n}`],
  [(n) => `${n} Director`, (n) => `Director of ${n}`, (n) => `Senior Director, ${n}`],
  [(n) => `${n} Manager`, (n) => `Senior ${n} Manager`, (n) => `Manager, ${n}`],
  [(n) => `${n} Specialist`, (n) => `${n} Analyst`, (n) => `${n} Executive`, (n) => `${n} Coordinator`, (n) => `${n} Assistant`],
];
// Share of rows at each level (same order as LEVELS)
const LEVEL_SHARE = [0.04, 0.06, 0.08, 0.14, 0.3, 0.38];

function pickWeighted(random, shares) {
  let r = random();
  for (let i = 0; i < shares.length; i++) {
    r -= shares[i];
    if (r < 0) return i;
  }
  return shares.length - 1;
}

/**
 * Makes the rows and prepares them for searching: every distinct title is read
 * once into a level and a function, and every spelling of every company is
 * reduced to its brand root. Searches afterwards only look these up.
 */
export function buildDataset(rowCount = 50000, seed = 20261013) {
  const random = seeded(seed);
  const pick = (list) => list[Math.floor(random() * list.length)];

  const brands = [];
  for (const opening of OPENINGS) {
    for (const ending of ENDINGS) {
      const industry = Math.floor(random() * INDUSTRIES.length);
      brands.push({
        name: opening + ending,
        industry,
        sector: pick(SECTOR_WORDS[industry]),
        suffix: pick(SUFFIXES),
        size: Math.floor(random() * SIZES.length),
        home: Math.floor(random() * COUNTRIES.length),
      });
    }
  }
  // Shuffle, so the companies with the most rows are not all "Vel..."
  for (let i = brands.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [brands[i], brands[j]] = [brands[j], brands[i]];
  }

  // Titles: `intended` is what the generator meant, kept so the rules can be checked against it
  const titles = [];
  const buckets = FUNCTIONS.map(() => LEVELS.map(() => []));
  const addTitle = (text, fn, level) => {
    const read = readTitle(text);
    buckets[fn][level].push(titles.length);
    titles.push({
      text,
      tokens: new Set(read.tokens),
      level: read.level < 0 ? STAFF : read.level,
      fn: read.fn,
      intended: { fn, level },
    });
  };
  FUNCTIONS.forEach((_, fn) => {
    CHIEFS[fn].forEach((text) => addTitle(text, fn, 0));
    WORDINGS.forEach((wordings, i) => {
      for (const name of FUNCTION_NAMES[fn]) wordings.forEach((wording) => addTitle(wording(name), fn, i + 1));
    });
  });

  const rowBrand = new Uint16Array(rowCount);
  const rowForm = new Uint8Array(rowCount);
  const rowTitle = new Uint16Array(rowCount);
  const rowCountry = new Uint8Array(rowCount);
  const rowFlags = new Uint8Array(rowCount); // 1 = has an email, 2 = has a phone number
  for (let row = 0; row < rowCount; row++) {
    // Skewed toward the front of the list: a few large companies, many small ones
    const brand = Math.floor(random() ** 1.5 * brands.length);
    rowBrand[row] = brand;
    rowForm[row] = random() < 0.35 ? 2 : Math.floor(random() * FORMS);
    rowTitle[row] = pick(buckets[Math.floor(random() * FUNCTIONS.length)][pickWeighted(random, LEVEL_SHARE)]);
    rowCountry[row] = random() < 0.7 ? brands[brand].home : Math.floor(random() * COUNTRIES.length);
    rowFlags[row] = (random() < 0.85 ? 1 : 0) | (random() < 0.55 ? 2 : 0);
  }

  // Brand roots, worked out from the spellings as a lead file would give them
  const roots = new Map();
  brands.forEach((brand, id) => {
    for (let form = 0; form < FORMS; form++) roots.set(strongTokens(spell(brand, form))[0], id);
  });

  return { rowCount, brands, titles, roots, rowBrand, rowForm, rowTitle, rowCountry, rowFlags };
}

export const companyOf = (dataset, row) => spell(dataset.brands[dataset.rowBrand[row]], dataset.rowForm[row]);

/** One row as plain values, for the preview table and the export */
export function rowValues(dataset, row) {
  const brand = dataset.brands[dataset.rowBrand[row]];
  const title = dataset.titles[dataset.rowTitle[row]];
  return {
    company: spell(brand, dataset.rowForm[row]),
    title: title.text,
    level: LEVELS[title.level],
    country: COUNTRIES[dataset.rowCountry[row]],
    industry: INDUSTRIES[brand.industry],
    size: SIZES[brand.size],
    email: (dataset.rowFlags[row] & 1) > 0,
    phone: (dataset.rowFlags[row] & 2) > 0,
  };
}

/** `count` companies from the file, each written in a spelling picked at random (for the examples) */
export function sampleCompanies(dataset, count, seed = 7) {
  const random = seeded(seed);
  const chosen = new Set();
  while (chosen.size < Math.min(count, dataset.brands.length)) chosen.add(Math.floor(random() * dataset.brands.length));
  return [...chosen].map((id) => spell(dataset.brands[id], Math.floor(random() * FORMS)));
}

// ---------- Searching ----------

const NONE = 0;
const INCLUDE = 1;
const EXCLUDE = 2;

/** Lines of a list box; a line that starts with a minus sign is an exclusion */
function readLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (/^[-–]/.test(line) ? { text: line.replace(/^[-–]\s*/, ''), exclude: true } : { text: line, exclude: false }));
}

/** A picklist: which values may pass. Nothing included means every value that is not excluded. */
function allowed(states, size) {
  const anyIncluded = states.includes(INCLUDE);
  const ok = new Uint8Array(size);
  for (let i = 0; i < size; i++) ok[i] = states[i] === EXCLUDE ? 0 : !anyIncluded || states[i] === INCLUDE ? 1 : 0;
  return ok;
}

/**
 * query: { companies, titles } are the list boxes' text; { country, industry, size, level }
 * are arrays of 0 (ignore), 1 (include) or 2 (exclude) per value; { email, phone } likewise.
 * Returns the matching row numbers and how each line was read.
 */
export function search(dataset, query) {
  const { brands, titles, roots, rowCount, rowBrand, rowTitle, rowCountry, rowFlags } = dataset;

  // Companies: each line's strong words are looked up against the brand roots
  const brandState = new Uint8Array(brands.length);
  const companyLines = readLines(query.companies);
  let companiesFound = 0;
  for (const line of companyLines) {
    const ids = strongTokens(line.text).map((token) => roots.get(token)).filter((id) => id !== undefined);
    if (ids.length) companiesFound++;
    for (const id of ids) {
      if (line.exclude) brandState[id] = EXCLUDE;
      else if (brandState[id] !== EXCLUDE) brandState[id] = INCLUDE;
    }
  }
  const companyIncludes = companyLines.some((line) => !line.exclude);

  // Titles: each line becomes a level, a function and leftover words that must all be there
  const titleState = new Uint8Array(titles.length);
  const titleLines = readLines(query.titles).map((line) => ({ ...line, ...readTitle(line.text) }));
  for (const line of titleLines) {
    if (line.level < 0 && line.fn < 0 && !line.rest.length) continue;
    titles.forEach((title, id) => {
      if (line.level >= 0 && title.level !== line.level) return;
      if (line.fn >= 0 && title.fn !== line.fn) return;
      if (!line.rest.every((word) => title.tokens.has(word))) return;
      if (line.exclude) titleState[id] = EXCLUDE;
      else if (titleState[id] !== EXCLUDE) titleState[id] = INCLUDE;
    });
  }
  const titleIncludes = titleLines.some((line) => !line.exclude);

  const countryOk = allowed(query.country, COUNTRIES.length);
  const levelOk = allowed(query.level, LEVELS.length);
  const industryOk = allowed(query.industry, INDUSTRIES.length);
  const sizeOk = allowed(query.size, SIZES.length);
  // The company-level picklists are folded into one yes/no per company, and the title ones per title
  const brandOk = new Uint8Array(brands.length);
  brands.forEach((brand, id) => {
    const listed = brandState[id] !== EXCLUDE && (!companyIncludes || brandState[id] === INCLUDE);
    brandOk[id] = listed && industryOk[brand.industry] && sizeOk[brand.size] ? 1 : 0;
  });
  const titleOk = new Uint8Array(titles.length);
  titles.forEach((title, id) => {
    const listed = titleState[id] !== EXCLUDE && (!titleIncludes || titleState[id] === INCLUDE);
    titleOk[id] = listed && levelOk[title.level] ? 1 : 0;
  });

  const need = (query.email === INCLUDE ? 1 : 0) | (query.phone === INCLUDE ? 2 : 0);
  const forbid = (query.email === EXCLUDE ? 1 : 0) | (query.phone === EXCLUDE ? 2 : 0);

  // One pass over the rows; each test is a lookup in a prepared table
  const matches = new Int32Array(rowCount);
  let count = 0;
  for (let row = 0; row < rowCount; row++) {
    if (!brandOk[rowBrand[row]] || !titleOk[rowTitle[row]] || !countryOk[rowCountry[row]]) continue;
    const flags = rowFlags[row];
    if ((flags & need) !== need || (flags & forbid) !== 0) continue;
    matches[count++] = row;
  }

  return {
    matches: matches.subarray(0, count),
    companies: { lines: companyLines.length, found: companiesFound },
    titles: titleLines.map((line) => ({
      text: line.text,
      exclude: line.exclude,
      level: line.level < 0 ? null : LEVELS[line.level],
      fn: line.fn < 0 ? null : FUNCTIONS[line.fn],
      rest: line.rest,
    })),
  };
}

/** The matching rows as CSV text, with every column */
export function toCsv(dataset, matches) {
  const cell = (value) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
  const lines = ['Company,Job title,Job level,Country,Industry,Company size,Has email,Has phone'];
  for (const row of matches) {
    const v = rowValues(dataset, row);
    lines.push(
      [v.company, v.title, v.level, v.country, v.industry, v.size, v.email ? 'Yes' : 'No', v.phone ? 'Yes' : 'No'].map(cell).join(','),
    );
  }
  return lines.join('\r\n');
}
