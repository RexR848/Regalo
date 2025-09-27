document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const addBtn = document.getElementById('add-btn');
  let total = 24;

  function createSquare(n){
    const el = document.createElement('div');
    el.className = 'card';
    el.textContent = n;
    return el;
  }

  function renderInitial(count){
    const fragment = document.createDocumentFragment();
    for(let i=1;i<=count;i++){
      fragment.appendChild(createSquare(i));
    }
    grid.appendChild(fragment);
  }

  addBtn.addEventListener('click', () => {
    total++;
    const sq = createSquare(total);
    grid.appendChild(sq);
    sq.scrollIntoView({behavior:'smooth',block:'center'});
  });

  renderInitial(total);
});
