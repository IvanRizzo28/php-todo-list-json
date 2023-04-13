const { createApp } = Vue

createApp({
    data() {
        return {
            lista:[],
            aggiungi: ''
        }
    },
    methods:{
        addLista(){
            const dati={
                x: this.lista
            }

            axios.post("http://localhost/php-todo-list-json/php/index.php",dati,{
                headers: {'Content-type': 'multipart/form-data'}
            }).then(response => {
                this.lista=response.data;
                this.lista.forEach(element => {
                    element.done=(element.done=== 'true');
                });
            });
        },
        mandaJson(){
            const dati={
                x: this.lista
            }

            axios.post("http://localhost/php-todo-list-json/php/delete.php",dati,{
                headers: {'Content-type': 'multipart/form-data'}
            }).then(response => {
                console.log(response.data);
            });
        },
        cancella(i){
            this.lista.splice(i,1);
            this.mandaJson();
        },
        setDone(i){
            this.lista[i].done=!this.lista[i].done;
            this.mandaJson();
        },
        invia(){
            console.log(this.lista);
            if (this.aggiungi.trim() !== ''){
                this.lista.push({
                    text: this.aggiungi,
                    done: false
                });
                this.aggiungi='';
                this.mandaJson();
            }
        }
    },
    beforeMount(){
        this.addLista();
    }
}).mount('#app');