// Turns Pokémon type names ("Fire", "Water", ...) into colored badges with
// the type's icon, e.g. <span class="type-badge type-fire">Fire<img></span>.
//
// Opt-in per page with frontmatter `typeBadges`: the list of section headings
// (## ...) where badges apply. Other sections are left alone, because words
// like "Normal" can mean something else there ("Normal Pokémon" = rarity class).
// Text inside links, headings and figure captions is never changed.
// Inline code that is only types (`Fairy/Ice`) becomes a pair of badges.

const TYPES = [
  'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost',
  'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water',
];
const TYPE_WORD = new RegExp(`\\b(${TYPES.join('|')})\\b`, 'g');
const HAS_TYPE = new RegExp(`\\b(${TYPES.join('|')})\\b`); // no /g: .test() must not keep state
const TYPE_PAIR = new RegExp(`^(${TYPES.join('|')})(/(${TYPES.join('|')}))*$`);
const SKIP = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption', 'script', 'style']);

export default function rehypePokemonTypes({ iconBase = '/' } = {}) {
  const textOf = (node) =>
    node.type === 'text' ? node.value : (node.children || []).map(textOf).join('');

  const badge = (type) => ({
    type: 'element',
    tagName: 'span',
    properties: { className: ['type-badge', `type-${type.toLowerCase()}`] },
    children: [
      { type: 'text', value: type },
      {
        type: 'element',
        tagName: 'img',
        properties: { src: `${iconBase}${type.toLowerCase()}.svg`, alt: '', ariaHidden: 'true', width: 16, height: 16 },
        children: [],
      },
    ],
  });

  // Split one text node into text + badge nodes.
  const splitText = (value) => {
    const out = [];
    let last = 0;
    for (const match of value.matchAll(TYPE_WORD)) {
      if (match.index > last) out.push({ type: 'text', value: value.slice(last, match.index) });
      out.push(badge(match[0]));
      last = match.index + match[0].length;
    }
    if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
    return out;
  };

  const enhance = (node) => {
    if (!node.children) return;
    node.children = node.children.flatMap((child) => {
      if (child.type === 'text') return HAS_TYPE.test(child.value) ? splitText(child.value) : [child];
      if (child.type !== 'element' || SKIP.has(child.tagName)) return [child];
      if (child.tagName === 'code') {
        const text = textOf(child);
        if (!TYPE_PAIR.test(text)) return [child];
        return text.split('/').flatMap((type, i) => (i ? [{ type: 'text', value: ' / ' }, badge(type)] : [badge(type)]));
      }
      enhance(child);
      return [child];
    });
  };

  return (tree, file) => {
    const sections = file.data.astro?.frontmatter?.typeBadges;
    if (!Array.isArray(sections) || !sections.length) return;

    // Markdown sections are flat: walk top-level nodes, tracking the current ## heading.
    let current = '';
    for (const node of tree.children) {
      if (node.type === 'element' && node.tagName === 'h2') {
        current = textOf(node).trim();
      } else if (sections.includes(current)) {
        if (node.type === 'element') enhance(node);
      }
    }
  };
}
