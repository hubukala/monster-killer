const attackValue = 10;

let maxLifeSet = 100;
let currentMonsterBar = maxLifeSet;

adjustHealthBars(maxLifeSet);

function attackTrigger() {
    const damage = dealMonsterDamage(attackValue);
    currentMonsterBar -= damage;
}

attackBtn.addEventListener('click',attackTrigger)