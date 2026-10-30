// @ts-nocheck
// Figures for the insight "Too Many Applicants, Too Few Jobs, and How to Win",
// shared by the chart script in src/components/insights/JobMarketStory.astro
// and by src/lib/rehype-job-market.mjs, which writes the data tables and the
// BLS quotes into the page at build time so they read without JavaScript.
// Moved as written from the component's script, so the figures are the same.
// PSA and ONS figures are as the source tables give them; BLS figures are
// worked out from src/data/job-market-occupations.json (passed in as DATA).

/* ---------- formatting ---------- */
export function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
export function signed(v, d) { return (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(d == null ? 1 : d); }
export function thousands(k) { // value given in thousands
  if (Math.abs(k) >= 1000) return (k / 1000).toFixed(1) + " million";
  return Math.round(k * 1000).toLocaleString("en-US");
}
export function pct(v, d) { return v.toFixed(d == null ? 1 : d) + "%"; }

/* ================= PSA: Philippines, Labor Force Survey March 2026 (thousands) ================= */
export var PSA = {
  lf: 51645.78, emp: 49069.00, un: 2576.79,
  // [age band, labor force, unemployed]  (Table 1)
  age: [["15 to 24", 6582.62, 827.55], ["25 to 34", 14863.29, 1001.71], ["35 to 44", 12033.95, 323.07], ["45 to 54", 9557.24, 263.83], ["55 to 64", 5921.21, 136.59], ["65 and over", 2687.48, 24.04]],
  // [highest grade completed, employed, unemployed]  (Tables 5 and 11; each level but college adds undergraduates and graduates)
  edu: [["No grade completed", 429.02, 1.34], ["Elementary", 9188.99, 205.76], ["Junior high school", 20009.14, 688.76], ["Senior high school", 2212.55, 376.56],
    ["Post-secondary", 1655.83, 114.04], ["College, did not graduate", 4580.58, 289.37], ["College graduate", 10992.90, 900.96]],
  // [job search method, persons]  (July 2025, Table 19: the March 2026 tables do not include it)
  search: [["Approached relatives or friends", 598.64], ["Approached the employer directly", 355.86], ["Registered with a private employment agency", 196.51],
    ["Registered with a public employment agency", 147.90], ["Placed or answered advertisements", 136.02], ["Other methods", 29.64]]
};
export var phAll = PSA.un / PSA.lf * 100;

/* ================= ONS: UK labour market, Jan-Mar 2026 (A05, seasonally adjusted) ================= */
export var ageRate = [["16 to 17", 29.4, 138], ["18 to 24", 14.6, 591], ["25 to 34", 4.8, 386], ["35 to 49", 2.9, 348], ["50 to 64", 3.0, 299], ["65 and over", 2.6, 47]];

// [age group, change, Jan-Mar 2025, Jan-Mar 2026] in thousands; changes are from the unrounded levels
export var ageChg = [["16 to 17", 11, 127, 138], ["18 to 24", 92, 499, 591], ["25 to 34", 47, 338, 386], ["35 to 49", 18, 330, 348], ["50 to 64", 21, 278, 299], ["65 and over", -3, 50, 47]];

export var Q = ["Jan–Mar 2025", "Apr–Jun 2025", "Jul–Sep 2025", "Oct–Dec 2025", "Jan–Mar 2026"];
export var young = [12.6, 12.1, 12.8, 14.1, 14.6], all = [4.6, 4.7, 5.0, 5.2, 5.0];

/* ---- ONS: duration (UNEM01, aged 18 to 24, Jan-Mar, thousands; changes from the unrounded levels) ---- */
export var dur = [["Up to 6 months", 323, 352, 9.0], ["6 to 12 months", 71, 105, 47.3], ["Over 12 months", 105, 135, 28.6]];

/* ================= BLS ================= */
export var groups = [["Healthcare support", 8421.5, 13.3], ["Healthcare practitioners and technical", 10232.8, 8.0], ["Life, physical, and social science", 1628.7, 7.5],
  ["Community and social service", 3270.1, 7.4], ["Computer and mathematical", 5493.6, 7.3], ["Architecture and engineering", 2690.0, 6.8],
  ["Management", 13683.4, 6.2], ["Business and financial operations", 11368.5, 5.5], ["Installation, maintenance, and repair", 6494.4, 5.4],
  ["Construction and extraction", 7492.9, 5.1], ["Food preparation and serving", 13826.5, 4.4], ["Personal care and service", 4487.3, 4.4],
  ["Transportation and material moving", 14139.0, 4.3], ["Legal", 1445.7, 2.9], ["Building and grounds cleaning and maintenance", 5699.6, 2.6],
  ["Arts, design, entertainment, sports, and media", 2986.0, 1.5], ["Educational instruction and library", 9907.4, 1.4], ["Protective service", 3871.0, 1.1],
  ["Production", 8780.5, -0.4], ["Sales and related", 14533.2, -1.4], ["Farming, fishing, and forestry", 1036.0, -1.5], ["Office and administrative support", 18792.7, -4.0]];

// Openings per 100 jobs by typical entry education, computed from the occupation data
export function openings(DATA) {
  var agg = DATA.edu.map(function () { return { e: 0, o: 0, n: 0, ex: 0, tr: 0, gr: 0 }; });
  DATA.occ.forEach(function (o) {
    if (o.d < 0) return;
    var a = agg[o.d]; a.e += o.e; a.o += o.o; a.n++; a.ex += o.e * o.er / 100; a.tr += o.e * o.tr / 100; a.gr += o.n / 10;
  });
  return DATA.edu.map(function (name, i) {
    var a = agg[i];
    return { name: name, n: a.n, e: a.e, o: a.o, v: a.o / a.e * 100, ex: a.ex / a.e * 100, tr: a.tr / a.e * 100, gr: a.gr / a.e * 100 };
  });
}

// How often each skill ranks top three across bachelor's-level occupations
export function skills(DATA) {
  var ba = DATA.occ.filter(function (o) { return o.d === 5; }), cnt = DATA.skills.map(function () { return 0; });
  ba.forEach(function (o) { o.top.forEach(function (i) { cnt[i]++; }); });
  var rows = DATA.skills.map(function (s, i) { return { label: s, value: cnt[i] / ba.length * 100, n: cnt[i] }; })
    .filter(function (r) { return r.n > 0; }).sort(function (a, b) { return b.value - a.value; });
  return { rows: rows, total: ba.length };
}

/* BLS's own reasoning, quoted from the data */
export function quotes(DATA) {
  var byCode = {};
  DATA.occ.forEach(function (o) { byCode[o.c] = o; });
  return ["43-4051", "43-9021", "15-1251", "13-1151"].map(function (code) { return byCode[code]; }).filter(function (o) { return o && o.why; }).map(function (o) {
    return {
      text: "“" + o.why.replace(/^[^-]+ - /, "").replace(/^share/, "Share") + "”",
      cite: o.t + ", projected " + signed(o.g) + "% by 2035. BLS, Table 1.12. “Share” means the occupation’s share of jobs within its industries."
    };
  });
}

/* The data table under each chart, by the id of the element it goes in */
export function tables(DATA) {
  var searchTotal = PSA.search.reduce(function (a, r) { return a + r[1]; }, 0);
  return {
    "t-phage": { head: ["Country", "Age group", "Unemployment rate", "Unemployed (thousands)"],
      rows: PSA.age.map(function (r) { return ["Philippines", r[0], pct(r[2] / r[1] * 100), Math.round(r[2]).toLocaleString("en-US")]; })
        .concat([["Philippines", "All aged 15 and over", pct(phAll), Math.round(PSA.un).toLocaleString("en-US")]])
        .concat(ageRate.map(function (r) { return ["United Kingdom", r[0], r[1].toFixed(1) + "%", r[2].toLocaleString("en-US")]; })).concat([["United Kingdom", "All aged 16 and over", "5.0%", "1,808"]]) },
    "t-chg": { head: ["Age group", "Jan to Mar 2025 (thousands)", "Jan to Mar 2026 (thousands)", "Change (thousands)"],
      rows: ageChg.map(function (r) { return [r[0], String(r[2]), String(r[3]), signed(r[1], 0)]; }).concat([["All aged 16 and over", "1,621", "1,808", "+187"]]) },
    "t-line": { head: ["Quarter", "Aged 18 to 24", "All aged 16 and over", "Gap (points)"],
      rows: Q.map(function (q, i) { return [q, young[i].toFixed(1) + "%", all[i].toFixed(1) + "%", (young[i] - all[i]).toFixed(1)]; }) },
    "t-phedu": { head: ["Highest grade completed", "Employed (thousands)", "Unemployed (thousands)", "Unemployment rate", "Share of labor force", "Share of unemployed"],
      rows: PSA.edu.map(function (r) { return [r[0], Math.round(r[1]).toLocaleString("en-US"), Math.round(r[2]).toLocaleString("en-US"), pct(r[2] / (r[1] + r[2]) * 100), pct((r[1] + r[2]) / PSA.lf * 100), pct(r[2] / PSA.un * 100)]; }) },
    "t-dur": { head: ["Time unemployed", "Jan to Mar 2025 (thousands)", "Jan to Mar 2026 (thousands)", "Change"],
      rows: dur.map(function (r) { return [r[0], String(r[1]), String(r[2]), signed(r[3]) + "%"]; }).concat([["All unemployed aged 18 to 24", "499", "591", "+18.5%"]]) },
    "t-search": { head: ["Job search method", "Persons (thousands)", "Share"],
      rows: PSA.search.map(function (r) { return [r[0], Math.round(r[1]).toLocaleString("en-US"), pct(r[1] / searchTotal * 100)]; }) },
    "t-open": { head: ["Typical entry education", "Occupations", "Jobs, 2025", "Openings per year", "Openings per 100 jobs", "Leaving the workforce", "Changing occupation", "Job growth"],
      rows: openings(DATA).map(function (a) { return [a.name, String(a.n), thousands(a.e), thousands(a.o), a.v.toFixed(1), a.ex.toFixed(1), a.tr.toFixed(1), signed(a.gr)]; }) },
    "t-grp": { head: ["Occupational group", "Jobs, 2025", "Projected change, 2025 to 2035"],
      rows: groups.map(function (g) { return [g[0], thousands(g[1]), signed(g[2]) + "%"]; }) },
    "t-skill": { head: ["Skill", "Occupations where it ranks top three", "Share"],
      rows: skills(DATA).rows.map(function (r) { return [r.label, String(r.n), r.value.toFixed(1) + "%"]; }) }
  };
}
