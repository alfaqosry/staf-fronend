import { defineStore } from "pinia";
import axios from "axios";

export const pinjamStore = defineStore('pinjam', {

    state : () => ({
        dataPinjam : [],
        isLoading : false,
        dataMobil : [],
        tglSewa : [{
            tgl_mulai : '',
            tgl_akhir: ''
        }]
    }),

    getters : {
        pinjam : (state) =>  state.dataPinjam,
        mobil : (state) => state.dataMobil,
        tglsewa : (state) => state.tglSewa,
    },

    actions: {

        async pinjamMobil(id, formData) {
            this.isLoading = true
            try {
                const response = await axios.post(`/api/mobil/pinjam/${id}`,formData);
                console.log(response);
                return response;
            } catch (error) {
                console.log(error)
            }finally{
                this.isLoading = false
            }
        },
        async kembalikanMobil(formData) {
            this.isLoading = true
            try {
                const response = await axios.post('/api/getmobilbyplat',formData);
                
                this.dataMobil = response.data
                console.log(this.dataMobil);
                return response;
            } catch (error) {
                console.log(error)
            }finally{
                this.isLoading = false
            }
        },

        async postPengembalian(id){
            this.isLoading = true;
            try {
                const response = await axios.post('/api/postpengembalian', {
                    id: id
                })

                console.log(response)
            } catch (error) {
                
            }finally{
                this.isLoading = false
            }

        },
        async pilihTanggal(tgl){

            this.tglSewa = tgl;

        },


        async cekKetersediaan(formData){
            this.isLoading = true;

            try {
                const response = await axios.post('/api/ketersediaanmobil',formData)
                console.log(response)
                this.dataMobil = response
            } catch (error) {
                
            }finally{
                this.isLoading = false
            }
        },

        async getPinjamById(id){
            try {
                const response = await axios.get(`/api/mobil/pinjam/${id}`)
                console.log(response.data);
                this.dataPinjam = response.data

            } catch (error) {
                console.log(error)
            }
        },

        async getPinjamByUser(id){

            this.isLoading = true
            try {

                const response = await axios.get(`/api/mobil/daftarpinjam/${id}`)
                console.log(response.data);
                this.dataPinjam = response.data

            } catch (error) {
                console.log(error)
            }finally{
                this.isLoading = false
            }
        }
    }
})