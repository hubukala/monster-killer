const attackValue = 10;

let maxLifeSet = 100;
let currentMonsterHealthBar = maxLifeSet;
let currentPlayerHealthBar = maxLifeSet

adjustHealthBars(maxLifeSet);

function resultCheck(monsterH, playerH){
    if (monsterH <= 0 && playerH > 0){
        alert('You won!');
        resetGame(maxLifeSet);
    } else if (playerH <= 0 && monsterH > 0){
        alert('You Lose!');
        resetGame(maxLifeSet);
    } else if (monsterH <= 0 && playerH <=0){
        alert("it's a draw !");
    }
}

function attackTrigger() {
    const damageMonster = dealMonsterDamage(attackValue);
    currentMonsterHealthBar -= damageMonster;
    resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
    const damagePlayer = dealPlayerDamage(attackValue);
    currentPlayerHealthBar -= damagePlayer;
    resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
}

attackBtn.addEventListener('click',attackTrigger)