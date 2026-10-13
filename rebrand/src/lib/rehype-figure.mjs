// Markdown image helpers. A paragraph that holds only images becomes:
//
//   ![Alt](./a.png "Caption")
//     -> <figure><img><figcaption>Caption</figcaption></figure>
//
//   ![Alt](./a.png "Caption") ![Alt](./b.png "Caption")
//     -> <div class="figure-row"> with one figure each (side by side on wide screens)
//
//   ![Slide 1](./s1.png) ![Slide 2](./s2.png) ...
//     -> <div class="gallery"> of thumbnails (images without captions)
//
// A single image without a title is left alone. Tables get a <div class="table-wrap">.
export default function rehypeFigure() {
  const isBlank = (node) => node.type === 'text' && !node.value.trim();
  const isImg = (node) => node.type === 'element' && node.tagName === 'img';
  const el = (tagName, className, children) => ({
    type: 'element',
    tagName,
    properties: className ? { className: [className] } : {},
    children,
  });

  const toFigure = (img) => {
    const caption = img.properties.title ? String(img.properties.title) : '';
    delete img.properties.title;
    const children = [img];
    if (caption) children.push(el('figcaption', null, [{ type: 'text', value: caption }]));
    return el('figure', null, children);
  };

  const transform = (p) => {
    const content = p.children.filter((child) => !isBlank(child));
    if (!content.length || !content.every(isImg)) return p;
    const titled = content.filter((img) => img.properties?.title);

    if (content.length === 1) return titled.length ? toFigure(content[0]) : p;
    if (titled.length === content.length) return el('div', 'figure-row', content.map(toFigure));
    return el('div', 'gallery', content);
  };

  const walk = (parent) => {
    if (!parent.children) return;
    parent.children = parent.children.map((node) => {
      if (node.type === 'element' && node.tagName === 'p') return transform(node);
      // Tables scroll inside their own box on narrow screens
      if (node.type === 'element' && node.tagName === 'table') return el('div', 'table-wrap', [node]);
      walk(node);
      return node;
    });
  };

  return (tree) => walk(tree);
}
