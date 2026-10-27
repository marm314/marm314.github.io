document.getElementById('year').textContent = new Date().getFullYear();

function renderPub(p, plain) {
  const item = document.createElement('article');
  item.className = 'pub';
  const title = document.createElement('div');
  title.className = 'pub-title';
  if (plain) {
    title.textContent = p.title;
  } else {
    const a = document.createElement('a');
    a.href = 'https://doi.org/' + p.doi;
    a.textContent = p.title;
    title.appendChild(a);
  }
  const meta = document.createElement('div');
  meta.className = 'pub-meta';
  meta.textContent = p.authors + ' — ' + p.venue + ' (' + p.year + ')';
  item.append(title, meta);
  if (p.note) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = p.note;
    item.appendChild(badge);
  }
  return item;
}

const list = document.getElementById('pub-list');
const latest = document.getElementById('latest-pub');
if (list || latest) {
  fetch('publications.json')
    .then(r => r.json())
    .then(pubs => {
      if (latest) {
        latest.replaceChildren(renderPub(pubs[0], true));
      }
      if (list) {
        let year = null;
        for (const p of pubs) {
          if (p.year !== year) {
            year = p.year;
            const h = document.createElement('h2');
            h.textContent = year;
            list.appendChild(h);
          }
          list.appendChild(renderPub(p));
        }
      }
    })
    .catch(() => {
      if (list) list.textContent = 'Could not load the publication list. See ORCID instead.';
    });
}
