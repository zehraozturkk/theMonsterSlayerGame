const getRandomValue=(min,max)=>{
    return Math.floor(Math.random() * (max-min)) + min;

}

const app = Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100,
            currentRound: 0,
            winner:null,
            messages:[]
            
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                //A draw
                this.winner = 'draw';
            }else if(value <= 0){
                //player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if(value<=0){
                this.winner = 'player';
            }
        }
    },
    computed:{
        monsterStyles(){
            if(this.monsterHealth < 0){
                return{width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerStyles(){
            if(this.playerHealth < 0){
                return{width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        }

    },
    methods:{
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealth = this.monsterHealth - attackValue; 
            this.addMessages('player', 'attack', attackValue )
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            this.playerHealth -= attackValue;
            this.addMessages('monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addMessages('player', 'Special attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.addMessages('player', 'heal', healValue);

            this.attackPlayer();
        },
        reStartingGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.messages = []
        },
        surrender(){
            this.winner = 'monster';
        },
        addMessages(who, what, value){
            this.messages.unshift ({
                actionby:who,
                actiontype:what,
                actionValue:value
            });
            
        }
    }

});

app.mount('#game')