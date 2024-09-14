import { defineStore } from "pinia";
import axios from "axios";
export const mobilStore = defineStore('mobil', {

    state : () => ({
        dataMobil : [],
        isLoading : false

    }),
    getters: {
        mobil: (state) => state.dataMobil,
        loading : (state) => state.isLoading
    },



    actions: {

        async getMobilAll() {
            this.isLoading = true;
            try {
                const response = await axios.get('/api/mobil');
                this.dataMobil =  response
             
                
            } catch (error) {
                throw error
            }finally{
                this.isLoading = false;
            }
            
        },

        async getMobilById(id) {
            console.log('knlknlkn')
        this.isLoading = true
            try {
                const response = await axios.get(`/api/mobil/${id}`)
                this.dataMobil = response.data
                
                
            } catch (error) {
                console.error(error)
                
            }finally{
                this.isLoading = false
            }

        },

        async updateMobil(id, formData){
            this.isLoading = true
        try {
            const response = await axios.put(`/api/mobil/${id}`, formData);
            console.log(response)

            return response
            
        } catch (error) {
            throw error;
            
        }finally{
            this.isLoading = false
        }



        },

        async postMobil(mobil) {
            this.isLoading = true;
            try {
                const response = await axios.post('/api/mobil',{
                    merek : mobil.merek,
                    model : mobil.merek,
                    plat_nomor : mobil.plat_nomor,
                    tarif_sewa : mobil.tarif_sewa
                });

                return response;
            } catch (error) {
                return error;
            }finally{
                this.isLoading = false;
            }
        }

    }
})