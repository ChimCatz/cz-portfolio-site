# Pokémon Data Study: What 1,025 Pokémon Reveal About Type Matchups, Stats, and Rarity

Pokémon has been part of my life since childhood. I first discovered it through **Pokémon Emerald**, and from there I got hooked. I played the mainline Gen 3 games like **Emerald, Sapphire, FireRed, and LeafGreen**, then moved into the Nintendo DS era with **Black, White, Black 2, White 2, HeartGold, and SoulSilver**. Years later, I continued with the Switch titles like **Sword/Shield, Scarlet/Violet, and Legends: Arceus**.

Now that Pokémon continues to stay popular with newer titles like **Pokémon Legends: ZA**, I wanted to look at the franchise in a different way: not only as a player, but as a data analyst.

For this study, I used a cleaned Pokémon dataset based on public data from Kaggle. The dataset covers **1,025 Pokédex IDs** from **Generation 1 to Generation 9**, with **1,207 total rows** after including alternate forms, Mega Evolutions, Primal forms, Paradox forms, and other special variants.

The final dataset includes the familiar battle stats like **HP, Attack, Defense, Special Attack, Special Defense, and Speed**, but it also includes extra fields such as **type matchups, experience growth, height, weight, base egg steps, base happiness, capture rate, official class, and special group**.

As a long-time Pokémon player, I had several questions in mind:

- Which types are most common?
- Which typings are strongest offensively and defensively?
- Which non-Legendary Pokémon are the strongest by raw stats?
- Are defensive Pokémon really slower?
- Are Legendary and Mythical Pokémon actually harder to catch?

This study answers those questions using **Python, pandas, numpy, and matplotlib** inside VS Code.

---

## Section 1: Type Matchups — The Rock-Paper-Scissors System of Pokémon

The first part of the study focuses on Pokémon types.

At first glance, Pokémon type matchups look like a simple rock-paper-scissors system. Fire beats Grass, Water beats Fire, Electric beats Water, and so on. But Pokémon becomes more interesting because many Pokémon have **two types**. A dual-type Pokémon can gain more resistances, more weaknesses, or sometimes both.

To study this, I generated an **18x18 type matchup matrix** and populated it with defensive damage multipliers.

**Chart reference:** `type-match-matrix.png`

### Q1: From Generation 1 to 9, which single typing is the most and least common?

The most common single type is **Water**, with **81 single-type Water Pokémon**.

The least common single type is **Flying**, with only **4 single-type Flying Pokémon**.

This makes sense from a game design point of view. Water Pokémon appear across oceans, rivers, lakes, fishing encounters, surfing routes, and many regional Pokédex areas. Flying, on the other hand, is often paired with Normal, so pure Flying Pokémon remain rare.

### Q2: From Generation 1 to 9, which double typing is the most and least common?

The most common dual typing is **Normal/Flying**, with **31 Pokémon**.

Several dual-type combinations appear only once in the dataset. Examples include:

- Fairy/Ice
- Electric/Psychic
- Dragon/Fairy
- Bug/Ghost
- Steel/Water
- Normal/Water
- Ghost/Ice
- Electric/Fire
- Fire/Steel

Normal/Flying being the most common is not surprising. Early-route birds have been a repeated design pattern since Gen 1, and many of them share that typing.

### Q3: Which single typing has the best offensive capability?

**Fighting** and **Ground** are tied as the best offensive single types. Each one hits **5 types** for super-effective damage.

Fighting is strong against:

- Normal
- Ice
- Rock
- Dark
- Steel

Ground is strong against:

- Fire
- Electric
- Poison
- Rock
- Steel

Both are strong offensive types, but they win in different matchups. Fighting is excellent against bulky Normal, Rock, Dark, and Steel Pokémon. Ground is one of the best answers to Electric, Fire, Poison, Rock, and Steel.

### Q4: Which single typing has the best defensive capability?

**Steel** is the best defensive single type, with a defensive score of **10**.

It has **11 resistances** and only **3 weaknesses**, making it one of the strongest defensive types in the game.

This explains why Steel Pokémon often feel hard to break. Even when their stats are not always the highest, their type profile gives them many safe matchups.

### Q5: Which single typing has the worst offensive capability?

**Normal** is the worst offensive single type.

Normal has **0 super-effective matchups**. It does not hit any type for extra damage, and it cannot affect Ghost-type Pokémon at all.

This does not mean Normal Pokémon are useless. Many Normal Pokémon have strong stats or good move pools. But as an attacking type alone, Normal has the weakest offensive coverage.

### Q6: Which single typing has the worst defensive capability?

**Ice** is the worst defensive single type, with a defensive score of **-3**.

Ice has only **1 resistance** and **4 weaknesses**:

- Fire
- Fighting
- Rock
- Steel

This confirms something many players already feel in battle: Ice is dangerous offensively, but fragile defensively.

### Q7: Which double typing has the best offensive capability?

Several dual-type combinations are tied for the best offensive coverage, each with **7 super-effective matchups**.

Examples include:

- Grass/Dark
- Grass/Ice
- Grass/Psychic
- Rock/Fighting
- Rock/Psychic

This shows that dual typing can greatly expand offensive reach. Some combinations cover many more matchups than either type could handle alone.

### Q8: Which double typing has the worst offensive capability?

Several dual-type combinations have only **1 super-effective matchup**.

Examples include:

- Bug/Steel
- Dark/Ghost
- Dark/Poison
- Electric/Water
- Normal/Ghost
- Water/Ground

This is interesting because some of these typings are still good defensively. A typing can be poor offensively but strong as a defensive profile.

### Q9: Which double typing has the best defensive capability?

**Fairy/Steel** and **Steel/Ghost** are tied as the strongest defensive combinations, each with a defensive score of **11**.

These combinations resist many attacker types and have very few bad matchups. This is why Pokémon with these typings often feel difficult to remove from battle.

### Q10: Which double typing has the worst defensive capability?

**Grass/Dragon** and **Ice/Psychic** are tied for the weakest defensive score at **-4**.

Both combinations suffer from several weaknesses and limited resistance value. This makes them harder to use defensively, especially against teams with wide type coverage.

---

## Section 2: Base Stats — Who Looks Strongest on Paper?

After type matchups, the next part of the study focuses on base stats.

Every Pokémon has six main stats:

- HP
- Attack
- Defense
- Special Attack
- Special Defense
- Speed

These numbers shape how a Pokémon performs in battle. A high Attack stat can turn a Pokémon into a physical threat. A high Defense stat can make it hard to knock out. A high Speed stat can decide who moves first.

For this section, I focused on **non-Legendary and non-Mythical Pokémon**. This makes the ranking more interesting because it removes the obvious Legendary and Mythical powerhouses.

### Q11: Which non-Legendary and non-Mythical Pokémon have the highest total base stats?

Among the filtered Pokémon, **Eternatus Eternamax** ranks first with **1,125 total base stats**.

The rest of the top 10 list is heavily dominated by special forms such as Mega Evolutions, Primal forms, Ultra Necrozma, and Zygarde Complete Forme. This shows that alternate battle forms take most of the highest raw stat totals in the dataset.

**Related files:**

- `top10_non_legendary_total_base_stats.csv`
- `top10_non_legendary_total_base_stats.png`

### Q12: Which non-Legendary and non-Mythical Pokémon have the highest Attack?

**Mewtwo Mega Mewtwo X** has the highest Attack in this filtered group, with an Attack stat of **190**.

The top Attack list is mostly filled with Mega forms and other powerful alternate forms. **Kartana** also stands out as one of the strongest physical attackers in the group.

**Related files:**

- `top10_non_legendary_attack.csv`
- `top10_non_legendary_attack.png`

### Q13: Which non-Legendary and non-Mythical Pokémon have the highest Defense?

**Eternatus Eternamax** also leads the Defense ranking with a massive Defense stat of **250**.

Behind it are extremely defensive forms such as **Mega Aggron** and **Mega Steelix**. This shows that the top Defense list is mostly filled with Pokémon designed as bulky walls or extreme-form stat monsters.

**Related files:**

- `top10_non_legendary_defense.csv`
- `top10_non_legendary_defense.png`

### Q14: Which non-Legendary and non-Mythical Pokémon have the highest Special Attack?

**Mewtwo Mega Mewtwo Y** ranks first in Special Attack with a stat of **194**.

The top 10 Special Attack list includes powerful forms such as **Mega Rayquaza, Primal Kyogre, and Ultra Necrozma**. At the very top, special offense is mostly carried by alternate forms with boosted stat totals.

**Related files:**

- `top10_non_legendary_sp_attack.csv`
- `top10_non_legendary_sp_attack.png`

### Q15: Which non-Legendary and non-Mythical Pokémon have the highest Special Defense?

**Eternatus Eternamax** also has the highest Special Defense, reaching **250**.

The top Special Defense list mixes extreme forms with classic defensive specialists like **Shuckle**. This shows that high special bulk can come from two different design styles: special battle forms or naturally defensive Pokémon.

**Related files:**

- `top10_non_legendary_sp_defense.csv`
- `top10_non_legendary_sp_defense.png`

### Q16: Which non-Legendary and non-Mythical Pokémon are the fastest?

**Ninjask** is the fastest non-Legendary and non-Mythical Pokémon in this dataset, with a Speed stat of **160**.

The rest of the top 10 includes fast Ultra Beasts, Mega Evolutions, and alternate forms. This suggests that extreme Speed is shared by both naturally fast species and special transformed forms.

**Related files:**

- `top10_non_legendary_speed.csv`
- `top10_non_legendary_speed.png`

### Q17: Are Pokémon with higher Defense usually slower?

The data does **not** support the idea that Pokémon with higher Defense are usually slower.

The Pearson correlation between Defense and Speed is **-0.0271**, while the Spearman correlation is **0.0300**. Both values are extremely close to zero.

This means there is no clear relationship between Defense and Speed in this dataset. Some defensive Pokémon are slow, but high Defense alone does not strongly predict low Speed.

**Related files:**

- `defense_vs_speed_correlation.png`
- `base_stat_correlation_summary.csv`

### Q18: Are Pokémon with higher Attack usually slower?

The data also does **not** support the idea that high-Attack Pokémon are usually slower.

The Pearson correlation is **0.3337**, and the Spearman correlation is **0.3283**. This is a weak positive relationship, not a negative one.

So in this dataset, higher Attack tends to come with slightly higher Speed on average. The relationship is not strong, but it goes against the idea that physical attackers are usually slow.

**Related files:**

- `attack_vs_speed_correlation.png`
- `base_stat_correlation_summary.csv`

### Q19: Are Pokémon with higher Special Attack usually slower?

The same pattern appears with Special Attack.

The Pearson correlation is **0.3786**, and the Spearman correlation is **0.3631**. This is also a weak positive relationship.

In other words, Pokémon with stronger Special Attack tend to be slightly faster on average, not slower. Again, the relationship is weak, but the trend does not support the idea that stronger special attackers are usually slow.

**Related files:**

- `sp_attack_vs_speed_correlation.png`
- `base_stat_correlation_summary.csv`

---

## Section 3: Capture Rate, Experience Growth, and Official Class

Not every Pokémon is designed to feel the same.

Some Pokémon are common encounters. Some are rare. Some are meant to be late-game challenges. Legendary and Mythical Pokémon often feel harder to catch and slower to train, but I wanted to test whether the dataset supports that idea.

For this section, I compared three fields:

- `capture_rate`
- `experience_growth`
- `official_class`

The official class field groups Pokémon into labels such as **normal, legendary, and mythical**.

### Q20: Do Legendary and Mythical Pokémon generally have lower capture rates?

Yes. Legendary and Mythical Pokémon generally have much lower capture rates.

The mean capture rate is:

- Normal Pokémon: **99.67**
- Legendary Pokémon: **16.65**
- Mythical Pokémon: **9.50**

This shows a clear pattern. Official class is strongly connected to capture difficulty. Legendary and Mythical Pokémon are much harder to catch on average than normal Pokémon.

**Related files:**

- `capture_rate_by_official_class.csv`
- `capture_rate_boxplot_by_class.png`
- `avg_capture_rate_by_class.png`

### Q21: Do Legendary and Mythical Pokémon generally require more experience to reach Level 100?

Yes. Legendary and Mythical Pokémon generally require more experience to reach Level 100.

The mean experience growth is:

- Normal Pokémon: **1,046,900.35**
- Legendary Pokémon: **1,250,000.00**
- Mythical Pokémon: **1,224,648.00**

Legendary Pokémon usually follow the slowest growth curve, while Mythical Pokémon are also much closer to that higher requirement than normal Pokémon.

**Related files:**

- `experience_growth_by_official_class.csv`
- `exp_growth_boxplot_by_class.png`
- `avg_exp_growth_by_class.png`

### Q22: Is capture rate strongly related to experience growth?

Capture rate and experience growth are related, but not strongly enough to explain the full pattern by themselves.

The Pearson correlation is **-0.2512**, and the Spearman correlation is **-0.4004**. This means the relationship is weak to moderate and negative.

Pokémon that need more experience growth tend to have lower capture rates, but the connection is not strong enough on its own. Something else explains the pattern better.

**Related file:**

- `capture_vs_exp_by_class.png`

### Q23: Is official class a stronger signal than raw correlation?

Yes. Official class is a stronger signal than the raw numeric correlation between capture rate and experience growth.

Normal Pokémon have much higher capture rates on average. Legendary and Mythical Pokémon have much lower capture rates and higher experience requirements.

This suggests that the category of the Pokémon explains the pattern better than the numeric relationship alone. In simple terms, being Legendary or Mythical matters more than the raw link between capture rate and experience growth.

**Related files:**

- `official_class_distribution.csv`
- `capture_rate_by_official_class.csv`
- `experience_growth_by_official_class.csv`
- `capture_vs_exp_by_class.png`

---

## Final Thoughts

This Pokémon dataset started as a fun project, but it quickly became a strong data study.

The type matchup section confirmed several long-time player instincts. Water is extremely common. Steel is one of the best defensive types. Ice is dangerous offensively but weak defensively. Dual typing can either create powerful coverage or expose major weaknesses.

The stat section showed that raw power is often controlled by special forms. Mega Evolutions, Primal forms, Ultra forms, and other alternate forms dominate the highest stat rankings. But the correlation tests also challenged some assumptions. High Defense does not clearly mean low Speed. High Attack and high Special Attack actually show weak positive relationships with Speed.

The capture and experience section showed a cleaner pattern. Legendary and Mythical Pokémon are harder to catch and usually require more experience to reach Level 100. The category of the Pokémon explains this better than raw correlation alone.

As a player, these results make the games feel even more intentional. As an analyst, it shows how much structure exists behind a game that many of us first loved as kids.

Pokémon may look simple on the surface, but the numbers behind it tell a deeper story: every type, stat, class, and form is part of a larger design system.

---

## Afterword and Source Credits

This project was made possible through public Pokémon datasets and community-maintained references. I used these sources as the foundation for building, cleaning, validating, and expanding the analysis dataset:

- [Pokémon Dataset by Rounak Banik on Kaggle](https://www.kaggle.com/datasets/rounakbanik/pokemon)
- [All Pokémon Dataset by maca11 on Kaggle](https://www.kaggle.com/datasets/maca11/all-pokemon-dataset)
- [Pokémon Type Chart Gist by armgilles](https://gist.github.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6)
- [Pokémon Database](https://pokemondb.net/)

The full project files, cleaned dataset work, generated charts, and analysis scripts can be found in my GitHub portfolio repository:

[View the Pokémon Analysis Project on GitHub](https://github.com/ChimCatz/data-analysis-portfolio/tree/main/pokemon_analysis)

