const attackValue = 10;
const strongAttackValue = 15
const healValue = 20;

const maxLifeSet = 100;
let currentMonsterHealthBar = maxLifeSet;
let currentPlayerHealthBar = maxLifeSet;
let bonusLifeAvailable = true;
const bonusLifeValue = 0.1;

adjustHealthBars(maxLifeSet);

function currentHealthBars(barValue) {
    currentMonsterHealthBar = barValue;
    currentPlayerHealthBar = barValue;
}

function resultCheck(monsterH, playerH){
    if (playerH <= 0 && bonusLifeAvailable){
        currentPlayerHealthBar = bonusLifeValue;
        setPlayerHealth(bonusLifeValue)
        removeBonusLife();
        bonusLifeAvailable = false;
    } else if (monsterH <= 0 && playerH > 0){
        alert('You won!');
        resetGame(maxLifeSet);
        currentHealthBars(maxLifeSet);
    } else if (playerH <= 0 && monsterH > 0){
        alert('You Lose!');
        resetGame(maxLifeSet);
        currentHealthBars(maxLifeSet);
    } else if (monsterH <= 0 && playerH <=0){
        alert("it's a draw !");
        resetGame(maxLifeSet);
        currentHealthBars(maxLifeSet);
    }
}

function monsterAttackTrigger() {
    if (currentMonsterHealthBar < 100) {
        const damagePlayer = dealPlayerDamage(attackValue);
        currentPlayerHealthBar -= damagePlayer;
    }
    else {
        return;
    }
}

function attackMode(mode) {
    if (mode === 'ATTACK'){
        const damageMonster = dealMonsterDamage(attackValue);
        currentMonsterHealthBar -= damageMonster;
        resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
        monsterAttackTrigger();
    } else {
        const damageMonster = dealMonsterDamage(strongAttackValue);
        currentMonsterHealthBar -= damageMonster;
        resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
        monsterAttackTrigger();
    }
}

function attackTrigger() {
    attackMode('ATTACK')
    resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
}

function strongAttackTrigger() {
    attackMode('STRONG_ATTACK')
    resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
}

function healPlayer() {
    let healValueFunc;
    if (currentPlayerHealthBar >= maxLifeSet - healValue){
        alert("You can't heal more than your maximum life");
        healValueFunc = maxLifeSet - currentPlayerHealthBar;
    } else {
        healValueFunc = healValue;
    }
    increasePlayerHealth(healValueFunc);
    currentPlayerHealthBar += healValueFunc;
}

attackBtn.addEventListener('click',attackTrigger)
strongAttackBtn.addEventListener('click',strongAttackTrigger)
healBtn.addEventListener('click', healPlayer)