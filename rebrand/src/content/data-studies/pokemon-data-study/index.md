---
title: "Pokémon Data Study: What 1,025 Pokémon Reveal About Type Matchups, Stats, and Rarity"
slug: pokemon-data-study
date: 2026-05-22
summary: "A three-part Pokémon analysis covering type matchups, base-stat patterns, and rarity signals across Generations 1 to 9 using Python, pandas, numpy, and matplotlib."
banner: ./banner.png
bannerAlt: "Header visual for the Pokémon Data Study."
facts:
  - label: "Dataset"
    value: "Pokémon Gen 1 to 9"
  - label: "Records"
    value: "1,025 Pokédex IDs"
  - label: "Expanded rows"
    value: "1,207 forms and variants"
  - label: "Focus"
    value: "Typing, stats, rarity"
tools:
  - "Python"
  - "pandas"
  - "numpy"
  - "matplotlib"
dataset: ./complete-1025-pokemon-dataset.csv
repo: https://github.com/ChimCatz/data-analysis-portfolio/tree/main/pokemon_analysis
typeBadges:
  - "Introduction"
  - "Section 1: Type Matchups"
  - "Final Thoughts"
copyright: "This study was created for research, learning, and analysis purposes. The cleaned dataset, analysis structure, and derived charts reflect my own original work. However, Pokémon-related names, characters, and franchise intellectual property belong to their respective owners, and some underlying source data was referenced from third-party public datasets and community resources."
---

## Introduction

Pokémon has been part of my life since childhood. I first discovered it through **Pokémon Emerald**, and from there I got hooked. I played the mainline Gen 3 games like **Emerald, Sapphire, FireRed,** and **LeafGreen**, then moved into the Nintendo DS era with **Black, White, Black 2, White 2, HeartGold,** and **SoulSilver**. Years later, I continued with the Switch titles like **Sword/Shield, Scarlet/Violet,** and **Legends: Arceus**.

Now that Pokémon continues to stay popular with newer titles like **Pokémon Legends: Z-A**, I wanted to look at the franchise in a different way: not only as a player, but as a data analyst.

For this study, I used a cleaned Pokémon dataset based on public data from Kaggle. The dataset covers **1,025 Pokédex IDs** from **Generation 1 to Generation 9**, with **1,207 total rows** after including alternate forms, Mega Evolutions, Primal forms, Paradox forms, and other special variants.

The final dataset includes the familiar battle stats like **HP, Attack, Defense, Special Attack, Special Defense,** and **Speed**, but it also includes extra fields such as **type matchups, experience growth, height, weight, base egg steps, base happiness, capture rate, official class,** and **special group**.

> **Questions that guided the study:** Which types are most common, which typings are strongest offensively and defensively, which Pokémon rise to the top among Standard Pokémon and Special Pokémon, whether defensive Pokémon are really slower, and whether Legendary and Mythical Pokémon are actually harder to catch and slower to train.

This study answers those questions using **Python, pandas, numpy,** and **matplotlib** inside VS Code.

## Section 1: Type Matchups

The first part of the study focuses on Pokémon types. At first glance, type matchups look like a simple rock-paper-scissors system. Fire beats Grass, Water beats Fire, Electric beats Water, and so on. But Pokémon becomes more interesting because many Pokémon have **two types**. A dual-type Pokémon can gain more resistances, more weaknesses, or sometimes both.

To study this, I generated an **18x18 type matchup matrix** and populated it with defensive damage multipliers.

![18 by 18 Pokémon type matchup matrix showing defensive damage multipliers.](./type-matchup-matrix.png "The matchup matrix anchors the type-analysis section by showing how each Pokémon type responds defensively across the full type chart.")

<details open>
<summary><span class="q-label">Q1</span> Which Single-typing is the most and least common?</summary>

The most common single type is **Water**, with **81 single-type Water Pokémon**. The least common single type is **Flying**, with only **4 single-type Flying Pokémon**.

This makes sense from a game-design point of view. Water Pokémon appear across oceans, rivers, lakes, fishing encounters, surfing routes, and many regional Pokédex areas. Flying, on the other hand, is often paired with Normal, so pure Flying Pokémon remain rare.

</details>

<details>
<summary><span class="q-label">Q2</span> Which Double-typing is the most and least common?</summary>

The most common dual typing is **Normal/Flying**, with **31 Pokémon**. Several dual-type combinations appear only once in the dataset.

- `Fairy/Ice` - Alolan Ninetales
- `Electric/Psychic` - Alolan Raichu
- `Dragon/Fairy` - Mega Altaria
- `Bug/Ghost` - Shedinja
- `Steel/Water` - Empoleon
- `Normal/Water` - Bibarel
- `Ghost/Ice` - Froslass
- `Electric/Fire` - Rotom Heat Rotom
- `Fire/Steel` - Heatran

Normal/Flying being the most common is not surprising. Early-route birds have been a repeated design pattern since Gen 1, and many of them share that typing.

</details>

<details>
<summary><span class="q-label">Q3</span> Which Double-typings do not appear even once?</summary>

Not every possible dual-type combination exists in the dataset. Out of the full set of possible pairings, **9 dual typings** do not appear at all.

- `Bug/Dragon`
- `Bug/Normal`
- `Fairy/Fire`
- `Fairy/Ground`
- `Ghost/Rock`
- `Ice/Normal`
- `Ice/Poison`
- `Normal/Rock`
- `Normal/Steel`

That gap is interesting because the type chart allows these combinations, but the series has still never used them in an official Pokémon design through this dataset.

</details>

<details>
<summary><span class="q-label">Q4</span> Which Single-typing has the best offensive capability?</summary>

**Fighting** and **Ground** are tied as the best offensive single types. Each one hits **5 types** for super-effective damage.

Fighting is strong against Normal, Ice, Rock, Dark, and Steel. Ground is strong against Fire, Electric, Poison, Rock, and Steel. Both are strong offensive types, but they win in different matchups.

</details>

<details>
<summary><span class="q-label">Q5</span> Which Single-typing has the best defensive capability?</summary>

**Steel** is the best defensive single type, with a defensive score of **10**. It has **11 resistances** and only **3 weaknesses**, making it one of the strongest defensive types in the game.

This explains why Steel Pokémon often feel hard to break. Even when their stats are not always the highest, their type profile gives them many safe matchups.

</details>

<details>
<summary><span class="q-label">Q6</span> Which Single-typing has the worst offensive capability?</summary>

**Normal** is the worst offensive single type. Normal has **0 super-effective matchups**. It does not hit any type for extra damage, and it cannot affect Ghost-type Pokémon at all.

This does not mean Normal Pokémon are useless. Many Normal Pokémon have strong stats or good move pools. But as an attacking type alone, Normal has the weakest offensive coverage.

</details>

<details>
<summary><span class="q-label">Q7</span> Which Single-typing has the worst defensive capability?</summary>

**Ice** is the worst defensive single type, with a defensive score of **-3**. Ice has only **1 resistance** and **4 weaknesses**: Fire, Fighting, Rock, and Steel.

This confirms something many players already feel in battle: Ice is dangerous offensively, but fragile defensively.

</details>

<details>
<summary><span class="q-label">Q8</span> Which Double-typing has the best offensive capability?</summary>

Several dual-type combinations are tied for the best offensive coverage, each with **7 super-effective matchups**.

- `Grass/Dark`
- `Grass/Ice`
- `Grass/Psychic`
- `Rock/Fighting`
- `Rock/Psychic`

This shows that dual typing can greatly expand offensive reach. Some combinations cover many more matchups than either type could handle alone.

</details>

<details>
<summary><span class="q-label">Q9</span> Which Double-typing has the worst offensive capability?</summary>

Several dual-type combinations have only **1 super-effective matchup**.

- `Bug/Steel`
- `Dark/Ghost`
- `Dark/Poison`
- `Electric/Water`
- `Normal/Ghost`
- `Water/Ground`

This is interesting because some of these typings are still good defensively. A typing can be poor offensively but strong as a defensive profile.

</details>

<details>
<summary><span class="q-label">Q10</span> Which Double-typing has the best defensive capability?</summary>

**Fairy/Steel** and **Steel/Ghost** are tied as the strongest defensive combinations, each with a defensive score of **11**.

These combinations resist many attacker types and have very few bad matchups. This is why Pokémon with these typings often feel difficult to remove from battle.

</details>

<details>
<summary><span class="q-label">Q11</span> Which Double-typing has the worst defensive capability?</summary>

**Grass/Dragon** and **Ice/Psychic** are tied for the weakest defensive score at **-4**.

Both combinations suffer from several weaknesses and limited resistance value. This makes them harder to use defensively, especially against teams with wide type coverage.

</details>

## Section 2: Base Stats

After type matchups, the next part of the study focuses on base stats. Every Pokémon has six main stats: **HP, Attack, Defense, Special Attack, Special Defense,** and **Speed**. These numbers shape how a Pokémon performs in battle, from raw physical damage to bulk and turn order.

For the ranking questions in this section, I split the dataset into **two reader-friendly groups**. **Standard Pokémon** refers to the main regular roster, while **Special Pokémon** refers to alternate forms and rare high-tier entries such as Mega Evolutions, Primal forms, Ultra Beasts, Paradox forms, Mythicals, Legendaries, and other non-standard variants.

> **Why the split matters:** if everything is ranked together, special forms and rare high-tier entries immediately dominate the charts. Splitting them creates a cleaner comparison: Standard Pokémon show the regular roster on its own terms, while Special Pokémon isolate the extreme side of the dataset.

The Standard Pokémon group contains **990 rows**, while the Special Pokémon group contains **217 rows** in the current cleaned dataset.

<details open>
<summary><span class="q-label">Q12A</span> Which Standard Pokémon have the highest total base stats?</summary>

Among Standard Pokémon, **Slaking** ranks first with **670 total base stats**. The next few names are **Palafin Hero Form (650)**, **Greninja Ash-Greninja (640)**, and **Wishiwashi School Form (620)**.

This is a much more interesting result than the old mixed ranking because it highlights powerful non-legendary roster entries without letting Mega or legendary forms immediately take over the chart.

![Top 10 Standard Pokémon by total base stats.](./top10-standard-pool-total.png "The Standard Pokémon total-base-stat chart highlights powerful regular-roster entries without letting the special-form tier dominate the view.")

</details>

<details>
<summary><span class="q-label">Q12B</span> Which Special Pokémon have the highest total base stats?</summary>

Among Special Pokémon, **Eternatus Eternamax** ranks first by a huge margin with **1,125 total base stats**. Behind it are **Mega Mewtwo X**, **Mega Mewtwo Y**, and **Mega Rayquaza**, all tied at **780**, followed by **Primal Groudon** and **Primal Kyogre** at **770**.

Once the full non-standard bucket is included, the chart becomes a true ranking of extreme forms rather than a tiny Mega-only snapshot.

![Top 10 Special Pokémon by total base stats.](./top10-special-pool-total.png "The Special Pokémon total chart becomes a true leaderboard of extreme forms once the full non-standard bucket is included.")

</details>

<details>
<summary><span class="q-label">Q13A</span> Which Standard Pokémon have the highest Attack?</summary>

Among Standard Pokémon, **Rampardos** has the highest Attack at **165**. The next tier includes **Galarian Zen Mode**, **Palafin Hero Form**, and **Slaking**, all at **160**.

That is a good reminder that extreme physical power is not limited to legendary or mythical Pokémon. Some Standard Pokémon still hit incredibly hard on paper.

![Top 10 Standard Pokémon by Attack stat.](./top10-standard-pool-attack.png "The Standard Pokémon Attack ranking keeps the spotlight on raw physical power from the regular roster.")

</details>

<details>
<summary><span class="q-label">Q13B</span> Which Special Pokémon have the highest Attack?</summary>

Among Special Pokémon, **Mega Mewtwo X** leads with **190 Attack**. After that come **Mega Heracross (185)**, **Kartana (181)**, **Deoxys Attack Forme (180)**, **Mega Rayquaza (180)**, and **Primal Groudon (180)**.

This version of the chart is much richer because it includes Mega forms, Ultra Beasts, Mythicals, and legendary battle forms together.

![Top 10 Special Pokémon by Attack stat.](./top10-special-pool-attack.png "The Special Pokémon Attack chart captures how many kinds of non-standard power spikes live at the top end of the dataset.")

</details>

<details>
<summary><span class="q-label">Q14A</span> Which Standard Pokémon have the highest Defense?</summary>

Among Standard Pokémon, **Shuckle** ranks first with a huge **230 Defense**. It is followed by other famous walls such as **Steelix (200)**, **Avalugg (184)**, **Hisuian Avalugg (184)**, and **Aggron (180)**.

The Standard Pokémon group makes the defensive specialists stand out much more clearly than the old mixed ranking did.

![Top 10 Standard Pokémon by Defense stat.](./top10-standard-pool-defense.png "The Standard Pokémon Defense chart surfaces familiar wall archetypes without the special-form ceiling flattening the view.")

</details>

<details>
<summary><span class="q-label">Q14B</span> Which Special Pokémon have the highest Defense?</summary>

Among Special Pokémon, **Eternatus Eternamax** dominates Defense with **250**. It is followed by **Mega Aggron (230)**, **Mega Steelix (230)**, and **Stakataka (211)**.

Compared with Standard Pokémon, this group includes more extreme outliers designed around very high stat ceilings.

![Top 10 Special Pokémon by Defense stat.](./top10-special-pool-defense.png "The Special Pokémon Defense ranking shows the exaggerated stat ceilings built into the non-standard side of the dataset.")

</details>

<details>
<summary><span class="q-label">Q15A</span> Which Standard Pokémon have the highest Special Attack?</summary>

Among Standard Pokémon, **Greninja Ash-Greninja** ranks first with **153 Special Attack**. It is followed by **Chandelure**, **Cursola**, and **Vikavolt**, each at **145**.

This ranking is more useful than the old version because it highlights elite special attackers that still belong to the regular battle roster.

![Top 10 Standard Pokémon by Special Attack stat.](./top10-standard-pool-sp-attack.png "The Standard Pokémon Special Attack chart makes the regular-roster special attackers easier to compare on their own terms.")

</details>

<details>
<summary><span class="q-label">Q15B</span> Which Special Pokémon have the highest Special Attack?</summary>

Among Special Pokémon, **Mega Mewtwo Y** ranks first with **194 Special Attack**. The next strongest entries are **Deoxys Attack Forme (180)**, **Mega Rayquaza (180)**, **Primal Kyogre (180)**, **Mega Alakazam (175)**, and **Xurkitree (173)**.

This is a more convincing Special Pokémon chart because it now reflects several different kinds of non-standard power spikes.

![Top 10 Special Pokémon by Special Attack stat.](./top10-special-pool-sp-attack.png "The Special Pokémon Special Attack chart reflects several different classes of non-standard offensive spikes.")

</details>

<details>
<summary><span class="q-label">Q16A</span> Which Standard Pokémon have the highest Special Defense?</summary>

Among Standard Pokémon, **Shuckle** also leads Special Defense with **230**. Behind it are **Florges (154)**, **Carbink (150)**, **Probopass (150)**, and **Toxapex (142)**.

This list mixes pure walls with bulky support-oriented species, which gives a better picture of natural special bulk in the main roster.

![Top 10 Standard Pokémon by Special Defense stat.](./top10-standard-pool-sp-defense.png "The Standard Pokémon Special Defense chart brings natural walls and support-focused tanks into clearer focus.")

</details>

<details>
<summary><span class="q-label">Q16B</span> Which Special Pokémon have the highest Special Defense?</summary>

Among Special Pokémon, **Eternatus Eternamax** ranks first again with **250 Special Defense**. After that come **Regice (200)**, **Deoxys Defense Forme (160)**, **Primal Kyogre (160)**, **Ho-oh (154)**, and **Lugia (154)**.

The Special Pokémon group is no longer just about offense. It also contains some of the most exaggerated defensive stat profiles in the full dataset.

![Top 10 Special Pokémon by Special Defense stat.](./top10-special-pool-sp-defense.png "The Special Pokémon Special Defense chart shows that this group also contains some of the most extreme defensive stat profiles.")

</details>

<details>
<summary><span class="q-label">Q17A</span> Which Standard Pokémon are the fastest?</summary>

Among Standard Pokémon, **Ninjask** is the fastest with a Speed stat of **160**. It is followed by **Electrode** and **Hisuian Electrode** at **150**, then **Accelgor (145)**.

This is a clean example of how speed monsters still exist outside the legendary and special-form tier.

![Top 10 Standard Pokémon by Speed stat.](./top10-standard-pool-speed.png "The Standard Pokémon Speed leaderboard highlights fast regular-roster species without the Special Pokémon group taking over the chart.")

</details>

<details>
<summary><span class="q-label">Q17B</span> Which Special Pokémon are the fastest?</summary>

Among Special Pokémon, **Regieleki** is the fastest by far with **200 Speed**. It is followed by **Deoxys Speed Forme (180)**, **Pheromosa (151)**, **Calyrex Shadow Rider (150)**, and several Deoxys and Mega entries close behind.

This chart does a much better job of showing how many speed extremes live in the Special Pokémon group.

![Top 10 Special Pokémon by Speed stat.](./top10-special-pool-speed.png "The Special Pokémon Speed chart makes the non-standard speed ceiling immediately obvious.")

</details>

<details>
<summary><span class="q-label">Q18</span> Are Pokémon with higher Defense usually slower?</summary>

For the correlation questions, I kept the **full 1,207-row dataset**. The goal here is to test broad stat relationships across the whole project, not only the two leaderboard buckets.

The data does **not** support the idea that Pokémon with higher Defense are usually slower. The Pearson correlation between Defense and Speed is **-0.0271**, while the Spearman correlation is **0.0300**. Both values are extremely close to zero.

This means there is no clear relationship between Defense and Speed in this dataset. Some defensive Pokémon are slow, but high Defense alone does not strongly predict low Speed.

![Correlation chart comparing Defense and Speed for Pokémon in the dataset.](./defense-vs-speed-correlation.png "The Defense versus Speed chart supports the idea that bulk alone does not reliably predict slowness.")

</details>

<details>
<summary><span class="q-label">Q19</span> Are Pokémon with higher Attack usually slower?</summary>

The data also does **not** support the idea that high-Attack Pokémon are usually slower. The Pearson correlation is **0.3337**, and the Spearman correlation is **0.3283**.

This is a weak positive relationship, not a negative one. In this dataset, higher Attack tends to come with slightly higher Speed on average. The relationship is not strong, but it goes against the idea that physical attackers are usually slow.

![Correlation chart comparing Attack and Speed for Pokémon in the dataset.](./attack-vs-speed-correlation.png "The Attack versus Speed view pushes back on the common assumption that physical attackers are usually slow by default.")

</details>

<details>
<summary><span class="q-label">Q20</span> Are Pokémon with higher Special Attack usually slower?</summary>

The same pattern appears with Special Attack. The Pearson correlation is **0.3786**, and the Spearman correlation is **0.3631**. This is also a weak positive relationship.

In other words, Pokémon with stronger Special Attack tend to be slightly faster on average, not slower. Again, the relationship is weak, but the trend does not support the idea that stronger special attackers are usually slow.

![Correlation chart comparing Special Attack and Speed for Pokémon in the dataset.](./sp-attack-vs-speed-correlation.png "Special offense trends slightly upward with Speed as well, which makes the overall stat picture more mixed than the usual stereotype suggests.")

</details>

## Section 3: Capture Rate, Experience Growth, and Official Class

Not every Pokémon is designed to feel the same. Some are common encounters. Some are rare. Some are meant to be late-game challenges. Legendary and Mythical Pokémon often feel harder to catch and slower to train, but I wanted to test whether the dataset supports that idea.

For this section, I compared three fields: `capture_rate`, `experience_growth`, and `official_class`.

<details open>
<summary><span class="q-label">Q21</span> Do Legendary and Mythical Pokémon generally have lower capture rates?</summary>

Yes. Legendary and Mythical Pokémon generally have much lower capture rates.

- **Normal Pokémon:** `99.67`
- **Legendary Pokémon:** `16.65`
- **Mythical Pokémon:** `9.50`

This shows a clear pattern. Official class is strongly connected to capture difficulty. Legendary and Mythical Pokémon are much harder to catch on average than normal Pokémon.

![Average capture rate by official Pokémon class.](./avg-capture-rate-by-class.png "The average-capture-rate chart makes the class gap easy to scan at a glance.") ![Capture rate boxplot grouped by official Pokémon class.](./capture-rate-boxplot-by-class.png "The boxplot adds distribution shape and reinforces how far Legendary and Mythical groups sit below normal Pokémon.")

</details>

<details>
<summary><span class="q-label">Q22</span> Do Legendary and Mythical Pokémon generally require more experience to reach Level 100?</summary>

Yes. Legendary and Mythical Pokémon generally require more experience to reach Level 100.

- **Normal Pokémon:** `1,046,900.35`
- **Legendary Pokémon:** `1,250,000.00`
- **Mythical Pokémon:** `1,224,648.00`

Legendary Pokémon usually follow the slowest growth curve, while Mythical Pokémon are also much closer to that higher requirement than normal Pokémon.

![Average experience growth by official Pokémon class.](./avg-exp-growth-by-class.png "The average experience chart shows how close Mythical Pokémon sit to the slower Legendary curve.") ![Experience growth boxplot grouped by official Pokémon class.](./exp-growth-boxplot-by-class.png "The grouped distribution makes the higher growth requirements visible beyond a single average value.")

</details>

<details>
<summary><span class="q-label">Q23</span> Is capture rate strongly related to experience growth?</summary>

Capture rate and experience growth are related, but not strongly enough to explain the full pattern by themselves. The Pearson correlation is **-0.2512**, and the Spearman correlation is **-0.4004**.

This means the relationship is weak to moderate and negative. Pokémon that need more experience growth tend to have lower capture rates, but the connection is not strong enough on its own. Something else explains the pattern better.

![Chart comparing Pokémon capture rate and experience growth by official class.](./capture-vs-exp-by-class.png "The capture-versus-experience view hints at a relationship, but the class split explains the pattern more clearly than the raw correlation alone.")

</details>

## Final Thoughts

What makes this dataset interesting is that it turns familiar Pokémon ideas into something measurable. Instead of relying only on player memory or competitive reputation, the numbers reveal which patterns truly repeat across the franchise.

The type section shows that design balance is not evenly distributed. Some typings appear constantly, while others are extremely rare or still unused. Water dominates single typings, Normal/Flying dominates dual typings, and a handful of possible pairings still have no official representative at all. That immediately shows that the Pokémon world is not just built from a complete logical grid. It is shaped by design habits, regional archetypes, and long-running franchise patterns.

The matchup results also reinforce an important distinction: offensive strength and defensive strength are not the same thing. Fighting and Ground stand out offensively among single types, while Steel stands out defensively. Dual typings make this even more dramatic. Some combinations create wide offensive reach, while others are valuable mainly because of resistance profiles. In other words, a type can look amazing in one context and weak in another.

The stat section became much more meaningful after separating **Standard Pokémon** from **Special Pokémon**. Without that split, rare forms with exaggerated stat ceilings would flatten the rankings and hide what is actually impressive inside the regular roster. With the split in place, the page shows two different truths at once: which regular Pokémon are naturally elite, and which special forms are designed to push the franchise beyond normal limits.

The capture-rate and experience findings reveal that rarity is not just a story concept. It is built directly into the numbers. Legendary and Mythical Pokémon are not only framed as special in lore, they are also made harder to catch and slower to raise. That means the gameplay systems, not just the narrative, help communicate importance and rarity to the player.

Another important takeaway is that common player assumptions are not always supported by the data. The correlation analysis does not show strong evidence that bulkier or stronger Pokémon are usually slower. That is a useful reminder that franchise-wide trends can be more nuanced than battle stereotypes suggest.

> **Big picture:** this study shows that Pokémon is built on layered design logic. Type distribution, stat ceilings, rarity systems, and progression difficulty all work together to shape how a Pokémon feels in battle and in the wider game world.

As a final takeaway, the data makes the series feel even more intentional. Behind the creatures, evolutions, and battle mechanics is a long-running system of choices about balance, identity, rarity, and power. That is what makes Pokémon such a good subject for analysis: even a game many people first experience as kids still holds a surprising amount of structural depth when viewed through data.

## Afterword and Source Credits

This project was made possible through public Pokémon datasets and community-maintained references. I used these sources as the foundation for building, cleaning, validating, and expanding the analysis dataset.

1. [Pokémon Dataset by Rounak Banik on Kaggle](https://www.kaggle.com/datasets/rounakbanik/pokemon)
2. [All Pokémon Dataset by maca11 on Kaggle](https://www.kaggle.com/datasets/maca11/all-pokemon-dataset)
3. [Pokémon Type Chart Gist by armgilles](https://gist.github.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6)
4. [Pokémon Database](https://pokemondb.net/)

The full project files, cleaned dataset work, generated charts, and analysis scripts can be found in my GitHub portfolio repository.

[View the Pokémon Analysis Project on GitHub](https://github.com/ChimCatz/data-analysis-portfolio/tree/main/pokemon_analysis)
