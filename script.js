const app = Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100
            
        }
    },
    computed:{
        monsterStyles(){
            return {width: this.monsterHealth + '%'}
        },
        playerStyles(){
            return {width: this.playerHealth + '%'}

        }

    },
    methods:{
        attackMonster(){
            const attackValue = Math.floor(Math.random() * (12-5)) + 5;
            this.monsterHealth = this.monsterHealth - attackValue; 
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = Math.floor(Math.random() * (15-8)) + 8;
            this.playerHealth -= attackValue;
        }
    }

});

app.mount('#game')