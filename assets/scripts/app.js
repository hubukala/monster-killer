const attackValue = 10;
const strongAttackValue = 15
const healValue = 20;
const bonusLifeValue = 0.1;
const modeAttack = 'ATTACK';
const modeStrongAttack = 'STRONG_ATTACK';
const logPlayerAttack = 'PLAYER_ATTACK';
const logPlayerStrongAttack = 'PLAYER_STRONG_ATTACK';
const logMonsterAttack = 'MONSTER_ATTACK';
const logPlayerHeal = 'PLAYER_HEAL';
const logGameOver = 'GAME_OVER';


let currentMonsterHealthBar;
let currentPlayerHealthBar;
let maxLifeSet;
let bonusLifeAvailable = true;
let storeLog = [];

enteredValue = prompt("Enter the number to set life values.", "100")

function saveLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };
    if (ev === logPlayerAttack || ev === logPlayerStrongAttack) {
        logEntry.target = 'MONSTER';
    } else if (ev === logPlayerHeal) {
        logEntry.target = 'PLAYER';
    }
    storeLog.push(logEntry);
}

if (enteredValue < 0 || isNaN(enteredValue)) {
    throw {message: "Invalid input, it's not a number!"};
} else {
    maxLifeSet = parseInt(enteredValue);
    adjustHealthBars(maxLifeSet);
    currentMonsterHealthBar = maxLifeSet;
    currentPlayerHealthBar = maxLifeSet;
}

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
        addBonusLife();
        bonusLifeAvailable = true;
        saveLog(logGameOver, 'PLAYER WON !', currentMonsterHealthBar, currentPlayerHealthBar);
    } else if (playerH <= 0 && monsterH > 0){
        alert('You Lose!');
        resetGame(maxLifeSet);
        currentHealthBars(maxLifeSet);
        addBonusLife();
        bonusLifeAvailable = true;
        saveLog(logGameOver, 'MONSTER WON !', currentMonsterHealthBar, currentPlayerHealthBar);
    } else if (monsterH <= 0 && playerH <=0){
        alert("it's a draw !");
        resetGame(maxLifeSet);
        currentHealthBars(maxLifeSet);
        addBonusLife();
        bonusLifeAvailable = true;
        saveLog(logGameOver, 'IT IS A DRAW !', currentMonsterHealthBar, currentPlayerHealthBar);
    }
}

function monsterAttackTrigger() {
    if (currentMonsterHealthBar < maxLifeSet) {
        const damagePlayer = dealPlayerDamage(attackValue);
        currentPlayerHealthBar -= damagePlayer;
        saveLog(logMonsterAttack, damagePlayer, currentMonsterHealthBar, currentPlayerHealthBar);
    }
    else {
        return;
    }
}

function attackMode(mode) {
    let logMode;
    if (mode === modeAttack){
        const damageMonster = dealMonsterDamage(attackValue);
        currentMonsterHealthBar -= damageMonster;
        saveLog(logPlayerAttack, damageMonster, currentMonsterHealthBar, currentPlayerHealthBar);
        resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
        monsterAttackTrigger();
    } else {
        const damageMonster = dealMonsterDamage(strongAttackValue);
        currentMonsterHealthBar -= damageMonster;
        saveLog(logPlayerStrongAttack, damageMonster, currentMonsterHealthBar, currentPlayerHealthBar);
        resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
        monsterAttackTrigger();
    }
}

function attackTrigger() {
    attackMode(modeAttack)
    resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
}

function strongAttackTrigger() {
    attackMode(modeStrongAttack)
    resultCheck(currentMonsterHealthBar, currentPlayerHealthBar);
}

function healPlayer() {
    let healValueFunc;
    let healed;
    if (currentPlayerHealthBar >= maxLifeSet - healValue){
        alert("You can't heal more than your maximum life");
        healValueFunc = maxLifeSet - currentPlayerHealthBar;
    } else {
        healValueFunc = healValue;
        healed = true;
    }
    increasePlayerHealth(healValueFunc);
    currentPlayerHealthBar += healValueFunc;
    saveLog(logPlayerHeal, healValueFunc, currentMonsterHealthBar, currentPlayerHealthBar);
}

function printLog() {
    for (let i = 0; i < storeLog.length; i++){
        console.log(storeLog[i]);
    };
}

attackBtn.addEventListener('click',attackTrigger)
strongAttackBtn.addEventListener('click',strongAttackTrigger)
healBtn.addEventListener('click', healPlayer)
logBtn.addEventListener('click', printLog)