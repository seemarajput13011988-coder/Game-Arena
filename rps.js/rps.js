const btns = document.querySelectorAll('[data-move]');
const youEl = document.getElementById('you');
const cpuEl = document.getElementById('cpu');
const resultEl = document.getElementById('result');

let you = 0, cpu = 0;

btns.forEach(b => b.addEventListener('click', () => play(b.dataset.move)));

function cpuMove(){
  return ['rock','paper','scissors'][Math.floor(Math.random()*3)];
}

function judge(p, c){
  if(p===c) return 'Draw';
  if(
    (p==='rock' && c==='scissors') ||
    (p==='paper' && c==='rock') ||
    (p==='scissors' && c==='paper')
  ) return 'You win';
  return 'CPU wins';
}

function play(pick){
  const c = cpuMove();
  const res = judge(pick, c);
  if(res==='You win') you++;
  else if(res==='CPU wins') cpu++;
  youEl.textContent = `You: ${you}`;
  cpuEl.textContent = `CPU: ${cpu}`;
  resultEl.textContent = `You: ${pick} • CPU: ${c} → ${res}`;
}
