---
title: "Too Many Applicants, Too Few Jobs, and How to Win"
slug: too-many-applicants-too-few-jobs-and-how-to-win
date: 2026-10-13
summary: "What the numbers say about getting hired. A data story about the line every new graduate stands in: how long it is, why it barely moves, and how to get to the front."
banner: ./banner.webp
bannerAlt: "A crowded job fair: lines of applicants holding resumes and folders in front of rows of employer booths."
story: job-market
highlights:
  - "12.6% of Filipinos aged 15 to 24 in the labor force are unemployed, against 5.0% overall."
  - "1 in 3 unemployed Filipinos is a college graduate: 901,000 people."
  - "Only 1 in 9 projected US job openings needs a bachelor's degree and no prior experience."
  - "41% of unemployed Filipinos looking for work search through relatives and friends (July 2025)."
chapters:
  - { label: "The line", id: line }
  - { label: "Why it stalls", id: stalls }
  - { label: "At the front", id: front }
  - { label: "How to win", id: win }
  - { label: "Sources and credits", id: sources }
  - { label: "Download the data", id: data }
tools:
  - "Python"
  - "openpyxl"
  - "JavaScript"
  - "HTML and CSS"
datasets:
  - name: "Labor Force Survey, March 2026 and March 2025"
    owner: "Philippine Statistics Authority (PSA)"
    detail: "Final estimates, full statistical tables 1 to 11 for each month, as 22 Excel files. This page uses tables 1, 5, 6, 9 and 11."
    file: ./psa-labor-force-survey-march-2026-and-2025-tables.zip
    license: "© Philippine Statistics Authority. Shared unchanged, for non-commercial research and educational use, with attribution."
    source: "https://psa.gov.ph/statistics/labor-force-survey/node/1684083411"
  - name: "Labor Force Survey, July 2025"
    owner: "Philippine Statistics Authority (PSA)"
    detail: "Final estimates, statistical tables 1 to 20, as 20 Excel files. This page uses tables 19 and 20, job search methods and weeks spent looking, which the March tables do not include."
    file: ./psa-labor-force-survey-july-2025-tables.zip
    license: "© Philippine Statistics Authority. Shared unchanged, for non-commercial research and educational use, with attribution."
    source: "https://psa.gov.ph/statistics/labor-force-survey/node/1684084238"
  - name: "UK labour market tables, October 2026"
    owner: "Office for National Statistics (ONS), United Kingdom"
    detail: "Labour Force Survey datasets A02, A05, A06, EMP01, RED01 and UNEM01 and the claimant count (CLA01), released October 2026, with every quarter back to 1992. This page uses January to March 2026 and the same quarter of 2025 and 2024."
    file: ./ons-labour-market-tables-october-2026.zip
    license: "Contains public sector information licensed under the Open Government Licence v3.0."
    source: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/employmentintheuk/march2026/relateddata"
  - name: "Employment Projections 2025 to 2035: occupational data"
    owner: "US Bureau of Labor Statistics (BLS)"
    detail: "Tables 1.1 to 1.12: employment, projected change, openings, entry education, experience and the reasons behind each projection."
    file: ./bls-occupational-data-2025-2035.xlsx
    license: "Public domain. A work of the US federal government."
    source: "https://www.bls.gov/emp/data/occupational-data.htm"
  - name: "Employment Projections 2025 to 2035: skills data"
    owner: "US Bureau of Labor Statistics (BLS)"
    detail: "Tables 6.1 to 6.5: importance scores for 17 skill categories and the top three skills of every occupation."
    file: ./bls-skills-data-2025-2035.xlsx
    license: "Public domain. A work of the US federal government."
    source: "https://www.bls.gov/emp/data/skills-data.htm"
  - name: "Employment Projections 2025 to 2035: detailed skills data"
    owner: "US Bureau of Labor Statistics (BLS)"
    detail: "The detailed EP Skills Data file: the specific abilities behind each skill category, drawn from the O*NET 30.0 Database."
    file: ./bls-skills-data-detailed-2025-2035.xlsx
    license: "Public domain. A work of the US federal government."
    source: "https://www.bls.gov/emp/data/skills-data.htm"
  - name: "skill2vec dataset: 50K job descriptions"
    owner: "Van-Duyet Le, Vo Minh Quan and Dang Quang An"
    detail: "The job-description file behind the job-ad skill lists, with the authors' README and licence."
    file: ./skill2vec-50k-job-descriptions.zip
    license: "© 2019 Van-Duyet Le. MIT License, included in the download."
    source: "https://arxiv.org/abs/1707.09751"
copyright: "© 2026 Chim Zoe Catalan. Analysis, text and visual design only. All underlying data and source material belong to their respective owners and are used for non-commercial research and educational purposes with attribution. See Sources and credits. Last updated October 2026."
---

<section class="jm-open">
  <p class="byline">Research, analysis and visualization by <b>Chim Zoe Catalan</b>. Data from the PSA, ONS, BLS, OECD and others, <a href="#sources">credited below</a>.</p>
  <p class="scene first">You are standing in a line.</p>
  <p class="scene">It starts at a folding table at the far end of the hall and runs back past the booths, almost to the door. You are holding a folder with your resume in it. So is everyone else.</p>
  <p>You graduated a few months ago. The news says unemployment is low. You have sent more applications than you can count, and you cannot work out why this is so hard.</p>
  <p>This is the story of that line: how long it is, why it barely moves, what waits at the front, and how to get there. Every number comes from public data and is sourced.</p>
  <div class="twin">
    <div><div class="big">12.6%</div><div class="where"><b>Philippines</b>Ages 15 to 24, March 2026</div></div>
    <div><div class="big">14.6%</div><div class="where"><b>United Kingdom</b>Ages 18 to 24, January to March 2026</div></div>
  </div>
  <p class="twin-cap"><strong>of young people in the labor force are unemployed.</strong> For the workforce as a whole, the rate is 5.0% in both.</p>
  <p class="src">Sources: PSA, Labor Force Survey, March 2026. ONS, table A05, October 2026 release.</p>
  <div class="note"><strong>Three countries, side by side.</strong> Philippine figures come from the Philippine Statistics Authority (PSA), UK figures from the Office for National Statistics (ONS), and US projections from the Bureau of Labor Statistics (BLS). Nothing here adds them together. The Philippines and the UK are compared March with March: the March 2026 survey against March 2025, and the UK&rsquo;s January to March 2026 average against the same months of 2025. The US data shows where jobs are heading.</div>
</section>

<!-- Chapter 1 -->
<section id="line">
  <div class="jm-text">
    <div class="num">Chapter 1</div>
    <h2>The line is longer than it looks</h2>
    <p class="ask">Your question: <b>why is the job market so harsh on fresh graduates?</b></p>
    <p class="scene">The first thing you learn in the line is that the headline was never about you.</p>
    <p>Unemployment was 5.0% in both the Philippines and the UK in early 2026. That sounds healthy. Split it by age, and you find where you are standing.</p>
  </div>
  <figure class="fig">
    <h4>Two countries, one shape: unemployment is a young person&rsquo;s problem</h4>
    <p class="sub">Unemployment rate by age group</p>
    <div class="duo">
      <div><h5>Philippines, March 2026</h5><div id="c-phage" style="--labw: 34%"></div></div>
      <div><h5>United Kingdom, January to March 2026</h5><div id="c-age" style="--labw: 34%"></div></div>
    </div>
    <div id="t-phage"></div>
    <p class="src">Sources: PSA, Labor Force Survey March 2026, Table 1 (my calculation: unemployed divided by labor force). ONS, table A05, seasonally adjusted. Age bands differ slightly; the UK 16 to 17 group is small and mostly still in school.</p>
  </figure>
  <div class="jm-text">
    <p>Filipinos aged 15 to 24 are 13% of the labor force but 32% of the unemployed. In the UK, an 18 to 24-year-old is three times as likely to be out of work as the average worker. Different economies, same shape.</p>
  </div>
  <div class="tiles">
    <div class="tile"><div class="lab">Unemployment rate, all ages</div><div class="val">5.0%</div><div class="ctx">Up from 3.9% in March 2025. 2.58 million people</div><span class="tag">Philippines</span></div>
    <div class="tile"><div class="lab">Unemployment rate, ages 15 to 24</div><div class="val">12.6%</div><div class="ctx">828,000 young people</div><span class="tag">Philippines</span></div>
    <div class="tile"><div class="lab">Share of the unemployed who are aged 15 to 24</div><div class="val">32%</div><div class="ctx">They are 13% of the labor force</div><span class="tag">Philippines</span></div>
    <div class="tile"><div class="lab">Share of the unemployed who are under 35</div><div class="val">71%</div><div class="ctx">Seven in every ten</div><span class="tag">Philippines</span></div>
  </div>
  <p class="src jm-text">Source: PSA, Labor Force Survey March 2026 and March 2025, Table 1.</p>
  <div class="jm-text sub-h">
    <h3>And this year, the line got longer</h3>
    <p>In a year, UK unemployment rose by 187,000 people. 92,000 of them were 18 to 24-year-olds.</p>
  </div>
  <figure class="fig">
    <h4>18 to 24-year-olds account for half the rise in UK unemployment</h4>
    <p class="sub">Change in the number of unemployed people, January to March 2025 to January to March 2026, thousands</p>
    <div id="c-chg" class="db" style="--labw: 22%"></div>
    <div id="t-chg"></div>
    <p class="src">Source: ONS, table A05, seasonally adjusted. Total change across all ages: +187,000.</p>
  </figure>
  <div class="jm-text">
    <p>Young adults are under a third of the unemployed but half of the rise. Their rate climbed 2.0 points in a year; the overall rate, 0.4.</p>
  </div>
  <figure class="fig">
    <h4>The gap between young adults and everyone else widened by a fifth in a year</h4>
    <p class="sub">UK unemployment rate, five consecutive quarters, seasonally adjusted</p>
    <div class="legend"><span><i style="background:var(--jm-accent)"></i>Aged 18 to 24</span><span><i style="background:var(--jm-muted)"></i>All aged 16 and over</span></div>
    <div id="c-line" class="lc"></div>
    <div id="t-line"></div>
    <p class="src">Source: ONS, table A05. Gap: 8.0 percentage points in January to March 2025, 9.6 points in January to March 2026.</p>
  </figure>
  <div class="jm-text">
    <p>The Philippines moved the same way: from March 2025 to March 2026, unemployment rose from 1.93 million to 2.58 million people, and youth unemployment from 11.0% to 12.6%.</p>
    <h3 class="sub-h">&ldquo;Aren&rsquo;t those just students looking for part-time work?&rdquo;</h3>
    <p>Mostly not. The ONS separates young people still in full-time education from those who have left it.</p>
  </div>
  <div class="tiles">
    <div class="tile"><div class="lab">Unemployed 18 to 24-year-olds who are <b>not</b> in full-time education</div><div class="val">425,000</div><div class="ctx">About three in four of the 560,000 total</div><span class="tag">UK</span></div>
    <div class="tile"><div class="lab">Their unemployment rate</div><div class="val">13.6%</div><div class="ctx">Against 4.8% for 25 to 34-year-olds</div><span class="tag">UK</span></div>
    <div class="tile"><div class="lab">18 to 24-year-olds out of full-time education and in work</div><div class="val">70.8%</div><div class="ctx">2.70 million of 3.81 million</div><span class="tag">UK</span></div>
  </div>
  <div class="jm-text">
    <p class="src" style="margin-top:0">Source: ONS, tables A06 and A05, January to March 2026, not seasonally adjusted.</p>
    <h3 class="sub-h">Surely the degree moves you forward?</h3>
    <p class="scene">This is the part that stings. You did the thing you were told would work.</p>
    <p>The PSA records the highest grade completed by everyone in work and everyone looking for it, which gives an unemployment rate for each level of schooling.</p>
  </div>
  <figure class="fig">
    <h4>A Filipino college graduate is more than three times as likely to be unemployed as someone who stopped at elementary school</h4>
    <p class="sub">Unemployment rate by highest grade completed, Philippines, March 2026</p>
    <div id="c-phedu" style="--labw: 34%"></div>
    <div id="t-phedu"></div>
    <p class="src">Source: my calculation from PSA, Labor Force Survey March 2026, Tables 5 and 11 (unemployed divided by employed plus unemployed at each level). Each level combines those who completed it and those who started but did not finish, except college, which is shown separately.</p>
  </figure>
  <div class="tiles">
    <div class="tile"><div class="lab">Unemployed Filipinos who are college graduates</div><div class="val">1 in 3</div><div class="ctx">35.0% of the unemployed, but 23.0% of the labor force</div><span class="tag">Philippines</span></div>
    <div class="tile"><div class="lab">College graduates without work</div><div class="val">901,000</div><div class="ctx">March 2026</div><span class="tag">Philippines</span></div>
    <div class="tile"><div class="lab">Unemployment rate among college graduates</div><div class="val">7.6%</div><div class="ctx">Against 5.0% for the whole labor force</div><span class="tag">Philippines</span></div>
  </div>
  <div class="jm-text">
    <p>That does not make a degree worthless. Graduates are younger on average, and age is the bigger effect: senior high school leavers, most of them under 25, have the highest rate of all at 14.5%. And people with less schooling more often take whatever work exists, which keeps them out of the count but not out of hardship.</p>
    <p>It does mean a degree does not move you to the front, and that is not new. In 2015 data, the OECD found people with higher education were 26% of the Philippine labor force and 35% of the unemployed. Today college graduates are 23% and 35%.</p>
    <h3 class="sub-h">Count the jobs at the front</h3>
    <p>About 11.0 million Filipinos with a college degree are in work. The three top-skill occupation groups, managers, professionals, and technicians, hold about 7.0 million jobs.</p>
  </div>
  <div class="tiles">
    <div class="tile"><div class="lab">College graduates in work</div><div class="val">11.0m</div><div class="ctx">22% of everyone employed</div><span class="tag">Philippines</span></div>
    <div class="tile"><div class="lab">Jobs in managerial, professional and technical occupations</div><div class="val">7.0m</div><div class="ctx">14% of all jobs</div><span class="tag">Philippines</span></div>
    <div class="tile"><div class="lab">Jobs in elementary occupations</div><div class="val">25%</div><div class="ctx">The largest single group</div><span class="tag">Philippines</span></div>
  </div>
  <div class="jm-text">
    <p class="src" style="margin-top:0">Source: my calculation from PSA, Labor Force Survey March 2026, Tables 5 and 6.</p>
    <p>Even if every one of those jobs went to a graduate, about four million working graduates would be doing something else. Too many applicants, too few jobs: for graduate work in the Philippines, that is close to literal.</p>
  </div>
</section>

<!-- Chapter 2 -->
<section id="stalls">
  <div class="jm-text">
    <div class="num">Chapter 2</div>
    <h2>Why the line barely moves</h2>
    <p class="ask">Your question: <b>what factors are driving it?</b></p>
    <p class="scene">You shuffle forward one step. Then nothing, for a long time. What is happening at the front?</p>
    <p>Seven things hold the line in place. Each is labeled with its source.</p>
  </div>
  <div class="factor">
    <div class="jm-text">
      <div class="evid">Reason 1 &middot; UK official statistics</div>
      <h3>Nobody at the front is leaving</h3>
      <p>The UK employment rate barely moved in a year: 75.0%, against 75.1%. Redundancies, though, rose from 3.1 to 4.2 per 1,000 employees in two years.</p>
      <p>Career strategist Jessica Hernandez calls the US version a &ldquo;low-hire, higher-fire&rdquo; market: people in jobs stay put, employers trim instead of grow, and whoever is outside waits longest.</p>
    </div>
    <div class="tiles">
      <div class="tile"><div class="lab">Employment rate, ages 16 to 64</div><div class="val">75.0%</div><div class="ctx">75.1% a year earlier</div><span class="tag">UK</span></div>
      <div class="tile"><div class="lab">Redundancies per 1,000 employees</div><div class="val">4.2</div><div class="ctx">3.8 a year earlier, 3.1 two years earlier</div><span class="tag">UK</span></div>
      <div class="tile"><div class="lab">People claiming unemployment-related benefits, March 2026</div><div class="val">1.67m</div><div class="ctx">Down from 1.71m a year earlier, up from 1.65m in January</div><span class="tag">UK</span></div>
    </div>
    <p class="src jm-text">Source: ONS, tables A02, RED01 and CLA01, seasonally adjusted.</p>
  </div>
  <div class="factor">
    <div class="jm-text">
      <div class="evid">Reason 2 &middot; US government projections</div>
      <h3>Graduate jobs come up least often</h3>
      <p>A seat opens when someone leaves the workforce, someone changes occupation, or a new job is created. The BLS projects all three for every US occupation to 2035.</p>
    </div>
    <figure class="fig">
      <h4>Jobs that need a degree come up about half as often as jobs that need no credential</h4>
      <p class="sub">Projected openings per year for every 100 existing jobs, by typical education needed for entry, US, 2025 to 2035</p>
      <div class="legend"><span><i style="background:var(--jm-accent)"></i>Someone leaves the workforce</span><span><i style="background:var(--jm-s2)"></i>Someone changes occupation</span><span><i style="background:var(--jm-s3)"></i>A new job is created</span></div>
      <div id="c-open" class="sb" style="--labw: 36%"></div>
      <div id="t-open"></div>
      <p class="src">Source: my calculation from BLS Employment Projections 2025 to 2035, Tables 1.2 and 1.10, 831 occupations. Labels are total openings per 100 jobs; shrinking groups have no new-job segment.</p>
    </figure>
    <div class="jm-text">
      <p>For every 100 jobs that need a bachelor&rsquo;s degree, about 7 open each year; for jobs needing no credential, more than 14. Graduate-level occupations hold a quarter of US jobs but produce under a fifth of the openings. They grow faster than average, 5.6% against 3.5%, but people leave them less often.</p>
    </div>
  </div>
  <div class="factor">
    <div class="jm-text">
      <div class="evid">Reason 3 &middot; US government projections</div>
      <h3>A third of &ldquo;graduate&rdquo; openings want experience you do not have yet</h3>
      <p class="scene">You know this one already. You need the job to get the experience, and the experience to get the job.</p>
      <p>Among openings in bachelor&rsquo;s-level occupations, 35% expect prior experience in a related job, including some of the biggest: general and operations managers, management analysts, financial managers.</p>
    </div>
    <div class="tiles">
      <div class="tile"><div class="lab">Bachelor&rsquo;s-level openings that expect prior related experience</div><div class="val">35%</div><div class="ctx">17% under five years, 18% five years or more</div><span class="tag">US</span></div>
      <div class="tile"><div class="lab">All openings that need a bachelor&rsquo;s degree <b>and</b> no experience</div><div class="val">1 in 9</div><div class="ctx">11.6% of projected yearly openings</div><span class="tag">US</span></div>
      <div class="tile"><div class="lab">That many true graduate entry points each year</div><div class="val">2.0m</div><div class="ctx">Of 17.5 million total openings</div><span class="tag">US</span></div>
    </div>
    <div class="jm-text">
      <p class="src" style="margin-top:0">Source: my calculation from BLS Employment Projections, occupational data Table 1.2.</p>
      <p>The finder in Chapter 3 shows which doors are open to you now.</p>
    </div>
  </div>
  <div class="factor">
    <div class="jm-text">
      <div class="evid">Reason 4 &middot; US government projections</div>
      <h3>The first rung is being automated</h3>
      <p>US employment is projected to grow just 3.5% in ten years. Office and administrative support, the largest occupational group, is projected to lose 752,000 jobs.</p>
    </div>
    <figure class="fig">
      <h4>Care and computing grow. Office support and sales shrink.</h4>
      <p class="sub">Projected change in US employment by major occupational group, 2025 to 2035</p>
      <div class="legend"><span><i style="background:var(--jm-accent)"></i>Projected to grow</span><span><i style="background:var(--jm-neg)"></i>Projected to shrink</span></div>
      <div id="c-grp" class="db" style="--labw: 40%"></div>
      <div id="t-grp"></div>
      <p class="src">Source: BLS Employment Projections, Table 1.1. All occupations: +3.5%.</p>
    </figure>
    <div class="jm-text">
      <p>Many classic first office jobs are on the shrinking list: word processors and typists (&minus;34.4%), data entry keyers (&minus;25.5%), payroll and timekeeping clerks (&minus;15.9%), bank tellers (&minus;13.2%), general office clerks (&minus;6.0%) and customer service representatives (&minus;5.3%).</p>
      <p>The BLS names artificial intelligence in its reasoning for 42 occupations; in 38 it is a reason for losing ground. In its own words:</p>
    </div>
    <div id="bls-quotes"></div>
    <div class="tiles">
      <div class="tile"><div class="lab">Office and administrative support jobs projected to disappear</div><div class="val">752,000</div><div class="ctx">&minus;4.0% by 2035</div><span class="tag">US</span></div>
      <div class="tile"><div class="lab">Occupations where the BLS names AI in its reasoning</div><div class="val">42</div><div class="ctx">38 of them losing share of jobs</div><span class="tag">US</span></div>
      <div class="tile"><div class="lab">Projected growth in STEM occupations</div><div class="val">+7.4%</div><div class="ctx">Against +3.2% for everything else</div><span class="tag">US</span></div>
      <div class="tile"><div class="lab">Bachelor&rsquo;s-level occupations projected to shrink</div><div class="val">33</div><div class="ctx">Of 177</div><span class="tag">US</span></div>
    </div>
    <div class="jm-text">
      <p class="src" style="margin-top:0">Source: BLS Employment Projections, occupational data Tables 1.2, 1.5, 1.11 and 1.12.</p>
      <p>A degree is no shield: computer programmers (&minus;7.3%), journalists (&minus;5.9%) and graphic designers (&minus;1.7%) all shrink, while data scientists grow 34.6% and information security analysts 21.0%. Which line you join matters more than it used to.</p>
    </div>
  </div>
  <div class="factor">
    <div class="jm-text">
      <div class="evid">Reason 5 &middot; OECD review and industry learning data</div>
      <h3>While you were studying, the list of skills changed</h3>
      <p>Employers were short of skills before AI. In a Philippine labor department survey reported by the OECD, 36% of firms said a lack of the right skills was the main reason vacancies were hard to fill. A World Bank survey found the hardest to find were not technical: managerial, leadership, interpersonal and communication skills.</p>
    </div>
    <div class="tiles">
      <div class="tile"><div class="lab">Firms naming a lack of the right skills as the main reason vacancies are hard to fill</div><div class="val">36%</div><div class="ctx">Department of Labor and Employment survey, 2012</div><span class="tag">Philippines</span></div>
      <div class="tile"><div class="lab">Firms calling an inadequately educated workforce a major constraint on growth</div><div class="val">10.1%</div><div class="ctx">2015, up from 7.8% in 2009</div><span class="tag">Philippines</span></div>
      <div class="tile"><div class="lab">Young Filipinos not in employment, education or training</div><div class="val">1 in 4</div><div class="ctx">2013</div><span class="tag">Philippines</span></div>
    </div>
    <div class="jm-text">
      <p class="src" style="margin-top:0">Source: all three as reported in OECD (2017), <em>Employment and Skills Strategies in the Philippines</em>, chapter 1. These are the oldest figures on this page.</p>
      <p>Then generative AI moved the goalposts. Coursera tracks what six million people learning through their employers, governments and universities enroll in: not what employers demand, but what people already in work think they need next.</p>
    </div>
    <div class="tiles">
      <div class="tile"><div class="lab">Growth in generative AI enrollments in one year, all enterprise learners</div><div class="val">+234%</div><div class="ctx">Coursera, 2024 to 2025</div><span class="tag">Industry</span></div>
      <div class="tile"><div class="lab">Growth in critical thinking enrollments among generative AI learners</div><div class="val">+185%</div><div class="ctx">+168% among data learners, +101% software, +91% IT</div><span class="tag">Industry</span></div>
      <div class="tile"><div class="lab">Top skills in job ads asking for AI that are human skills</div><div class="val">8 of 10</div><div class="ctx">Communication, problem-solving, leadership. Lightcast, cited by Coursera</div><span class="tag">Industry</span></div>
      <div class="tile"><div class="lab">Job ads asking for AI skills that are outside IT and computer science</div><div class="val">Over half</div><div class="ctx">2024. Lightcast, cited by Coursera</div><span class="tag">Industry</span></div>
    </div>
    <div class="jm-text">
      <p class="src" style="margin-top:0">Source: Coursera (2026), <em>Job Skills Report 2026</em>.</p>
      <p>Employers already short of people who communicate, lead and decide now also want people who can work with AI, and the workers ahead of you are learning both.</p>
    </div>
  </div>
  <div class="factor">
    <div class="jm-text">
      <div class="evid">Reason 6 &middot; UK and Philippine official statistics</div>
      <h3>The wait is long, or it is hidden</h3>
      <p>When hiring slows, people stay unemployed longer. In the UK, the fastest-growing group of young jobseekers has been looking for six months to a year.</p>
    </div>
    <figure class="fig">
      <h4>The number of young adults searching for 6 to 12 months grew 47% in a year</h4>
      <p class="sub">Unemployed 18 to 24-year-olds by how long they have been looking, UK, thousands</p>
      <div class="legend"><span><i style="background:var(--jm-quiet)"></i>January to March 2025</span><span><i style="background:var(--jm-accent)"></i>January to March 2026</span></div>
      <div id="c-dur" class="pair" style="--labw: 24%"></div>
      <div id="t-dur"></div>
      <p class="src">Source: ONS, table UNEM01, seasonally adjusted.</p>
    </figure>
    <div class="jm-text">
      <p>About 239,000 young adults in the UK, 40% of those unemployed, have been looking for more than six months.</p>
      <p>In the Philippines the wait looks short on paper: 4.1 weeks on average in July 2025, the latest figure. Few can afford to stay unemployed for long, so the wait moves inside work: short-term jobs, too few hours, and looking from there.</p>
    </div>
    <div class="tiles">
      <div class="tile"><div class="lab">Employed Filipinos who want more hours of work</div><div class="val">12.3%</div><div class="ctx">6.0 million people. 13.4% a year earlier</div><span class="tag">Philippines</span></div>
      <div class="tile"><div class="lab">Employed Filipinos in short-term, seasonal or day-to-day work</div><div class="val">Nearly 1 in 4</div><div class="ctx">20.0% short-term or seasonal, 3.3% a different employer day to day</div><span class="tag">Philippines</span></div>
      <div class="tile"><div class="lab">Temporary employees who could not find a permanent job</div><div class="val">23.0%</div><div class="ctx">371,000 people. 24.8% a year earlier, 21.4% two years earlier</div><span class="tag">UK</span></div>
      <div class="tile"><div class="lab">Part-time workers who could not find a full-time job</div><div class="val">893,000</div><div class="ctx">10.4% of part-time workers</div><span class="tag">UK</span></div>
    </div>
    <p class="src jm-text">Sources: PSA, Labor Force Survey March 2026 and March 2025, Tables 1 and 9. ONS, table EMP01, January to March 2026. These figures cover all ages.</p>
  </div>
  <div class="factor">
    <div class="jm-text">
      <div class="evid">Reason 7 &middot; Industry-reported, not official statistics</div>
      <h3>The line itself has become noisy</h3>
      <p>The last reason is not in any government table. It comes from hiring platforms and surveys gathered by Hernandez in September 2026. Treat it as indicative: I could not check the original methods.</p>
    </div>
    <div class="tiles">
      <div class="tile"><div class="lab">Job postings with no intent to hire (&ldquo;ghost jobs&rdquo;)</div><div class="val">1 in 5</div><div class="ctx">Greenhouse platform data</div><span class="tag">Industry</span></div>
      <div class="tile"><div class="lab">Applications LinkedIn receives compared with any other job site</div><div class="val">158&times;</div><div class="ctx">Huntr, Q1 and Q2 2026 reports</div><span class="tag">Industry</span></div>
      <div class="tile"><div class="lab">Hiring managers who think many resumes now look AI-generated</div><div class="val">77%</div><div class="ctx">Survey cited by Hernandez, source not named</div><span class="tag">Industry</span></div>
      <div class="tile"><div class="lab">Small businesses that struggle to tell who is qualified from a resume</div><div class="val">54%</div><div class="ctx">Survey cited by Hernandez, source not named</div><span class="tag">Industry</span></div>
    </div>
    <div class="jm-text">
      <p class="src" style="margin-top:0">Source: figures as cited in Hernandez, J. (3 September 2026), <em>Why Is Finding a Job So Hard in 2026?</em></p>
      <p>Some booths are empty, most of the crowd queues at one, and the people behind the table trust your folder less than they used to. A new graduate, with the thinnest track record, feels that most.</p>
    </div>
  </div>
</section>

<!-- Chapter 3 -->
<section id="front">
  <div class="jm-text">
    <div class="num">Chapter 3</div>
    <h2>What is waiting at the front</h2>
    <p class="ask">Your question: <b>which skills and tools make me relevant?</b></p>
    <p class="scene">Eventually you reach the table. Someone looks up from a stack of folders and asks what you can do.</p>
    <p>The BLS scores every occupation on 17 skills and publishes its top three. Among occupations that need a bachelor&rsquo;s degree, a few turn up again and again.</p>
  </div>
  <figure class="fig">
    <h4>Adaptability is a top-three skill in four out of five graduate-level occupations</h4>
    <p class="sub">Share of the 177 US occupations typically needing a bachelor&rsquo;s degree in which each skill ranks in the top three</p>
    <div id="c-skill" style="--labw: 38%"></div>
    <div id="t-skill"></div>
    <p class="src">Source: my calculation from BLS Employment Projections, skills data Table 6.2. Skills that rank in no occupation&rsquo;s top three are omitted.</p>
  </figure>
  <div class="jm-text">
    <p>The most common are not tools: learning quickly, reading and writing well, and making decisions. They match what Philippine employers find hardest to hire for, and what AI job ads list first.</p>
    <p>Tools still matter, and they change fast. These skills climbed Coursera&rsquo;s enrollment rankings fastest over two years.</p>
  </div>
  <figure class="fig">
    <h4>What people already in work are racing to learn</h4>
    <p class="sub">Five fastest-growing skills by career area, Coursera enterprise learners, October 2023 to September 2025</p>
    <div class="ranks">
      <div><h5>Data</h5><ol><li>Multimodal prompts</li><li>Critical thinking</li><li>AI personalization</li><li>Prompt engineering</li><li>Excel formulas</li></ol></div>
      <div><h5>IT</h5><ol><li>JSON</li><li>Generative model architectures</li><li>Machine learning methods</li><li>Natural language processing</li><li>Artificial neural networks</li></ol></div>
      <div><h5>Software and product</h5><ol><li>Unsupervised learning</li><li>Supervised learning</li><li>Artificial neural networks</li><li>Generative model architectures</li><li>Web applications</li></ol></div>
      <div><h5>Generative AI, any role</h5><ol><li>Content creation</li><li>AI personalization</li><li>Generative AI agents</li><li>Image analysis</li><li>Information privacy</li></ol></div>
    </div>
    <p class="src">Source: Coursera (2026), <em>Job Skills Report 2026</em>. Ranked by improvement in enrollment rank among six million enterprise learners. This measures what learners choose to study, not what employers require. SQL also appears in the top ten for both IT and software.</p>
  </figure>
  <div class="jm-text">
    <p>So the answer at the table has three layers: a foundation that does not date, a current tool or two, and the judgment to check what the tool gives you.</p>
    <h3 class="sub-h">Now ask it for your own job</h3>
    <p>Type a job title to see the official outlook for the closest occupation, whether it expects experience, why the BLS expects it to grow or shrink, the skills it demands, and what turns up beside it in real job ads.</p>
  </div>
  <div class="finder">
    <label for="jm-q">Search a job title</label>
    <div class="combo">
      <input id="jm-q" type="text" role="combobox" aria-expanded="false" aria-controls="jm-q-list" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="e.g. data analyst, accountant, graphic designer">
      <ul id="jm-q-list" role="listbox" hidden></ul>
    </div>
    <div class="quick" id="jm-quick"><span>Try:</span></div>
    <div id="jm-profile" aria-live="polite"></div>
  </div>
  <p class="src jm-text">Outlook, pay, experience, turnover, reasoning and skill scores: BLS Employment Projections 2025 to 2035 (US figures, pay in US dollars). Job-ad skills: the skill2vec dataset of job descriptions. Fastest-growing skills: Coursera <em>Job Skills Report 2026</em>. See <a href="#sources">Sources and credits</a> for how each part works and where it is weak.</p>
</section>

<!-- Chapter 4 -->
<section id="win">
  <div class="jm-text">
    <div class="num">Chapter 4</div>
    <h2>How to get to the front</h2>
    <p class="ask">Your question: <b>what strategies actually help when applying?</b></p>
    <p class="scene">You cannot make the line shorter. You can choose which line you stand in, what you carry, and whether anyone at the front is expecting you.</p>
    <p>Start with how people actually find work. The PSA asks every unemployed Filipino who is looking how they look.</p>
  </div>
  <figure class="fig">
    <h4>Four in ten Filipino job-seekers look through relatives and friends. Fewer than one in ten use advertisements.</h4>
    <p class="sub">Main job search method of unemployed persons looking for work, Philippines, July 2025</p>
    <div id="c-search" style="--labw: 40%"></div>
    <div id="t-search"></div>
    <p class="src">Source: PSA, Labor Force Survey July 2025, Table 19, the latest with this question. Covers the 1.46 million unemployed people actively looking for work.</p>
  </figure>
  <div class="jm-text">
    <p>People first, postings last: two thirds go through someone they know or straight to the employer. LinkedIn reports the same from the other side of the world: candidates are three times more likely to be hired where they already know an employee. Each strategy below answers a reason from Chapter 2.</p>
  </div>
  <div class="strats">
    <div class="strat">
      <h3>Choose your line</h3>
      <p>Before you commit months to one job title, look it up in the finder: projected growth, openings per year, and whether it expects experience. A shrinking occupation that wants five years of experience is the wrong line, however good you are.</p>
      <p class="why"><b>Why:</b> only 1 in 9 openings is a true graduate entry point, and 33 of 177 bachelor&rsquo;s-level occupations are shrinking. <em>BLS</em></p>
    </div>
    <div class="strat">
      <h3>Lead with the skills that travel</h3>
      <p>Give each of the three most common graduate skills one concrete story:</p>
      <ul>
        <li><b>Adaptability:</b> something you learned fast, under pressure.</li>
        <li><b>Writing and reading:</b> something you wrote that someone used.</li>
        <li><b>Problem solving:</b> a decision you made with incomplete information.</li>
      </ul>
      <p class="why"><b>Why:</b> they rank in the top three for 80%, 53% and 33% of bachelor&rsquo;s-level occupations, and employers report communication and interpersonal skills as the hardest to find. <em>BLS, OECD</em></p>
    </div>
    <div class="strat">
      <h3>Add the AI layer, and the judgment to check it</h3>
      <p>Learn one generative AI tool properly for your field. Then practice the harder half: checking its output and explaining what is wrong. A short, recognized certificate makes the skill visible.</p>
      <p class="why"><b>Why:</b> generative AI enrollments grew 234% in a year and critical thinking 185% alongside it. Coursera also reports that 96% of employers say micro-credentials strengthen an application, though that figure comes from its own research. <em>Industry-reported (Coursera)</em></p>
    </div>
    <div class="strat">
      <h3>Show proof, not polish</h3>
      <p>Everyone has a polished resume now. Build one or two pieces of visible work in your field, write applications in your own voice, and link to the work.</p>
      <p class="why"><b>Why:</b> employers report they can no longer tell candidates apart on paper and are turning to assessments, work samples and trials. <em>Industry-reported</em></p>
    </div>
    <div class="strat">
      <h3>Check the booth is staffed</h3>
      <p>Before spending an evening on an application, check for signs of a ghost job:</p>
      <ul>
        <li>Posted 90 or more days ago</li>
        <li>Reposted again and again</li>
        <li>No company name or specific details</li>
        <li>A generic, catch-all description</li>
        <li>An unusually wide salary range</li>
      </ul>
      <p class="why"><b>Why:</b> roughly one posting in five has no hire behind it. <em>Industry-reported (Greenhouse)</em></p>
    </div>
    <div class="strat">
      <h3>Do not queue at the busiest booth</h3>
      <p>Keep the big job boards, but do not rely on them alone: use company career pages, sector boards, your university careers service, public employment offices and direct approaches.</p>
      <p class="why"><b>Why:</b> LinkedIn reportedly receives around 158 times the applications of any other site, while a quarter of Filipino job-seekers go straight to the employer. <em>Industry-reported (Huntr), PSA</em></p>
    </div>
    <div class="strat">
      <h3>Get a name inside before you apply</h3>
      <p>For any role you really want, find one person at the company first: an alum, a classmate, a relative, a friend of a friend. Ask about the work, not for a job. Then apply.</p>
      <p class="why"><b>Why:</b> 41% of Filipino job-seekers already search through relatives and friends, LinkedIn reports a threefold hiring advantage for candidates who know an employee, and one in three companies has turned to referrals to cut applicant volume. <em>PSA, industry-reported (LinkedIn, Erin)</em></p>
    </div>
    <div class="strat">
      <h3>Plan for a longer search</h3>
      <p>Budget money and energy for six months or more, not six weeks. Keep one skill-building project going so the gap on your resume has an answer. A temporary or part-time role while you search is common, not a failure.</p>
      <p class="why"><b>Why:</b> 40% of unemployed young adults in the UK have been looking for over six months, and nearly one in four employed Filipinos is in short-term, seasonal or day-to-day work. <em>ONS, PSA</em></p>
    </div>
  </div>
  <div class="jm-text">
    <p class="scene">The line is real, and it is longer than it was. You did not make it, and standing in it harder will not move it.</p>
    <p>What you can change is which line you join, what is in your folder, and whether someone at the front already knows your name. The data cannot make the wait short, but it can stop you spending it in the wrong place.</p>
  </div>
</section>

<!-- Sources And Credits -->
<section id="sources">
  <div class="jm-text method">
    <div class="num">Sources and credits</div>
    <h2>Where every number comes from</h2>
    <p>Research, analysis, writing and visualization by <b>Chim Zoe Catalan</b>. The data belongs to the organizations and authors below. I am grateful to all of them for publishing it.</p>
    <h3>Official statistics and datasets</h3>
    <ul>
      <li><b>Philippine Statistics Authority (PSA).</b> <em>Labor Force Survey, March 2026</em> and <em>March 2025</em>, final estimates, full statistical tables 1 to 11. Used here: Tables 1, 5, 6, 9 and 11. <a href="https://psa.gov.ph/statistics/labor-force-survey/node/1684083411">psa.gov.ph</a>. <em>Labor Force Survey, July 2025</em>, final estimates, statistical tables 1 to 20. Used here: Tables 19 and 20, job search methods and weeks spent looking, which the March tables do not include. <a href="https://psa.gov.ph/statistics/labor-force-survey/node/1684084238">psa.gov.ph</a></li>
      <li><b>Office for National Statistics (ONS), United Kingdom.</b> Labour market datasets, October 2026 release: A02, A05, EMP01, RED01 and UNEM01 (seasonally adjusted), A06 (not seasonally adjusted) and the claimant count, CLA01. Labour Force Survey estimates for January to March 2026, compared with the same quarter of 2025 and 2024. <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/employmentintheuk/march2026/relateddata">ons.gov.uk</a></li>
      <li><b>US Bureau of Labor Statistics (BLS), Employment Projections program.</b> <em>Skills data, 2025 to 2035</em>: Tables 6.1 to 6.5 and the detailed EP Skills Data file. <a href="https://www.bls.gov/emp/data/skills-data.htm">bls.gov/emp/data/skills-data.htm</a>. <em>Occupational data, 2025 to 2035</em>: Tables 1.1, 1.2, 1.5, 1.10, 1.11 and 1.12. <a href="https://www.bls.gov/emp/data/occupational-data.htm">bls.gov/emp/data/occupational-data.htm</a></li>
      <li><b>O*NET 30.0 Database</b>, US Department of Labor, Employment and Training Administration. The underlying skill elements in the BLS skills data.</li>
      <li><b>Van-Duyet, L., Quan, V. M., and An, D. Q.</b> (2017). <em>Skill2vec: Machine Learning Approach for Determining the Relevant Skills from Job Description.</em> arXiv:1707.09751. <a href="https://arxiv.org/abs/1707.09751">arxiv.org/abs/1707.09751</a>. Dataset: skill2vec-dataset, 50K job descriptions file, &copy; 2019 Van-Duyet Le, MIT License.</li>
    </ul>
    <h3>Reports and articles</h3>
    <ul>
      <li><b>OECD.</b> (2017). <em>Employment and Skills Strategies in the Philippines.</em> OECD Reviews on Local Job Creation. OECD Publishing, Paris. ISBN 978-92-64-27342-9. <a href="https://www.oecd.org/content/dam/oecd/en/publications/reports/2017/05/employment-and-skills-strategies-in-the-philippines_g1g78524/9789264273436-en.pdf">oecd.org</a></li>
      <li><b>Coursera.</b> (2026). <em>Job Skills Report 2026: Insights on the fastest-growing job skills for business, government, and education leaders.</em> <a href="https://www.coursera.org/skills-reports/job-skills">coursera.org/skills-reports/job-skills</a></li>
      <li><b>Hernandez, J.</b> (3 September 2026). <em>Why Is Finding a Job So Hard in 2026? (4 Real Reasons).</em> LinkedIn. <a href="https://www.linkedin.com/pulse/why-finding-job-so-hard-2026-4-real-reasons-jessica-rvmfe/">linkedin.com</a></li>
    </ul>
    <h3>Sources cited inside those reports</h3>
    <p>I did not consult these originals. I am reporting them as the reports above describe them, and each is labeled that way where it appears.</p>
    <ul>
      <li><b>Through the OECD review:</b> Philippine Statistics Authority, Labour Force Survey 2015. Department of Labor and Employment establishment survey, 2012, as reported by the PSA (2016). World Bank Enterprise Survey, Philippines, 2015. Asian Development Bank staff estimates from the Labour Force Survey, 2013.</li>
      <li><b>Through the Coursera report:</b> Lightcast (2025), <em>Beyond the Buzz: Developing the AI Skills Employers Actually Need</em>. Coursera (2025), <em>Micro-Credentials Impact Report 2025</em>.</li>
      <li><b>Through the Hernandez article:</b> Greenhouse hiring platform data. Huntr, Q1 and Q2 2026 job search reports. LinkedIn. Erin, employee referral software. The 77% and 54% resume figures are cited there without a named source.</li>
    </ul>
    <h3>How I worked</h3>
    <ol>
      <li><b>Philippines.</b> From the March 2026 and March 2025 tables: unemployment rates by age (unemployed divided by labor force) and by highest grade completed (unemployed divided by employed plus unemployed), and employed college graduates against jobs in the three top-skill occupation groups.</li>
      <li><b>United Kingdom.</b> Unemployment by age and by time spent looking, education status, temporary and part-time work, redundancies and the claimant count, January to March 2026 against the same quarter one and two years earlier.</li>
      <li><b>United States.</b> The BLS skills and occupational tables joined on occupation code for 831 occupations and grouped by typical entry education: openings per 100 jobs and their causes, prior experience, and how often each skill ranks in the top three. I also counted the occupations whose all-industry explanation mentions artificial intelligence.</li>
      <li><b>Job-ad skills.</b> For 74 occupations and 22 everyday job titles I chose a few defining terms by hand (for a graphic designer: &ldquo;graphic design&rdquo;, &ldquo;graphic designer&rdquo;), found the skill2vec job descriptions listing any of them, and ranked the other skills by how often they appear. A skill shows only if it is at least twice as common there as in the file overall; job titles, degrees and generic words are removed.</li>
      <li><b>Job-title search.</b> It matches the 831 BLS occupation titles plus 95 everyday titles I mapped by hand to the closest one, such as &ldquo;data analyst&rdquo;, which has no BLS occupation of its own.</li>
    </ol>
    <h3>Limits you should know about</h3>
    <ul>
      <li><b>Different countries, different years.</b> Philippines: March 2026 against March 2025 (July 2025 for job search). UK: January to March 2026 against 2025, as three-month averages. US: projections to 2035. OECD: the Philippines, 2012 to 2015. The patterns agree, but one does not prove the other.</li>
      <li><b>Nobody publishes &ldquo;fresh graduates&rdquo; directly.</b> I use young adults (15 to 24 in the Philippines, 18 to 24 in the UK) and, in the Philippines, college graduates of all ages. The PSA tables cannot separate age from education.</li>
      <li><b>Survey estimates move around.</b> Both labor force surveys are samples, so I compare year on year. The ONS says its estimates from January to March 2025 onwards include its 2024 survey improvements, so the two years compare fairly, but advises against reading much into short-term changes. Philippine youth unemployment swings with the school year, hence March against March. The PSA job-search tables (July 2025) cover only the 1.46 million unemployed people actively looking. No source here counts vacancies.</li>
      <li><b>Projections are not forecasts of your job search.</b> BLS figures describe expected US change over ten years. &ldquo;Typical education&rdquo; and &ldquo;work experience&rdquo; describe a typical path, not a rule.</li>
      <li><b>The job-ad lists are the weakest part.</b> The skill2vec file holds about 46,000 job descriptions collected before 2018, mostly from South Asian job boards and tilted toward IT, finance, sales and marketing. It predates generative AI, shows which skills appear together rather than which are required, and is too thin for health, teaching, law or science roles, which show official skills only.</li>
      <li><b>Coursera measures learners, not employers.</b> Its rankings show what people enroll in. Coursera sells courses, so treat its findings on the value of courses and certificates with that in mind.</li>
      <li><b>Industry figures are second-hand.</b> The ghost-job, application-volume and resume-trust figures come from one practitioner&rsquo;s article citing company data, mostly from the US. I could not review their methods.</li>
    </ul>
    <div class="notice">
      <p><b>Data ownership and use.</b> I do not own any of the data or source material used on this page. All statistics, tables, reports and quotations remain the property of the organizations and authors credited above. They are used here for non-commercial research and educational purposes only, with attribution.</p>
      <p>ONS material contains public sector information licensed under the Open Government Licence v3.0. BLS material is in the public domain. The skill2vec dataset is used under the MIT License. Material from the PSA, the OECD, Coursera and Jessica Hernandez remains &copy; its respective publisher or author.</p>
      <p>The analysis, calculations, charts and wording are my own, and so are any errors. Nothing here is endorsed by the organizations cited. It is general information, not career, financial or legal advice. If you hold rights to anything shown here and would like it corrected or removed, please contact me through this site.</p>
    </div>
  </div>
</section>
