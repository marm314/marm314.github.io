document.getElementById('year').textContent = new Date().getFullYear();

const list = document.getElementById('pub-list');
if (list) {
  fetch('publications.json')
    .then(r => r.json())
    .then(pubs => {
      let year = null;
      for (const p of pubs) {
        if (p.year !== year) {
          year = p.year;
          const h = document.createElement('h2');
          h.textContent = year;
          list.appendChild(h);
        }
        const item = document.createElement('article');
        item.className = 'pub';
        const a = document.createElement('a');
        a.href = 'https://doi.org/' + p.doi;
        a.textContent = p.title;
        const title = document.createElement('div');
        title.className = 'pub-title';
        title.appendChild(a);
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
        list.appendChild(item);
      }
    })
    .catch(() => {
      list.textContent = 'Could not load the publication list. See ORCID instead.';
    });
}
