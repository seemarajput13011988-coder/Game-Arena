const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restart');

// 8 pairs -> 16 cards; supply images memory-1.png ... memory-8.png in /assets/images
const pairs = Array.from({length: 8}, (_,i) => `memory-${i+1}.png`);
let cards = [];
let first = null, second = null, lock = false, matchedCount = 0;

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function setup(){
  const all = [...pairs, ...pairs].map(src => ({ src, id: crypto.randomUUID() }));
  shuffle(all);
  grid.innerHTML = '';
  matchedCount = 0; first = second = null; lock = false;

  for(const card of all){
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.src = card.src;
    el.innerHTML = `
      <div class="inner">
        <div class="front"></div>
        <div class="back"><img alt="" src="../../assets/images/${card.src}"></div>
      </div>
    `;
    el.addEventListener('click', () => flip(el));
    grid.appendChild(el);
  }
  cards = Array.from(document.querySelectorAll('.card'));
}

function flip(card){
  if(lock) return;
  if(card.classList.contains('flipped')) return;
  card.classList.add('flipped');
  if(!first){ first = card; return; }
  second = card; lock = true;

  const match = first.dataset.src === second.dataset.src;
  setTimeout(() => {
    if(!match){
      first.classList.remove('flipped');
      second.classList.remove('flipped');
    } else {
      matchedCount += 1;
      // optional: disable clicks
      first.style.pointerEvents = 'none';
      second.style.pointerEvents = 'none';
      if(matchedCount === pairs.length){
        alert('You matched all pairs!');
      }
    }
    first = second = null; lock = false;
  }, 700);
}

restartBtn.addEventListener('click', setup);
setup();
