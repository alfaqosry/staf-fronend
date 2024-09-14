import { defineStore } from "pinia";
import axios from "axios";


export const penugasanStore = defineStore('penugasan', {

    state: () => ({

        dataPenugasan : [],
        dataPenugasanByUser: [],
        isLoading: {
            tombol: false,
            halaman: false
        }
    }),
    getters: {
        penugasan : (state) => state.dataPenugasan,
        penugasanuser : (state) => state.dataPenugasanByUser
    },
    actions : {


        async getPenugasanAll(){
            this.isLoading.halaman = true
            try {
                const response = await axios.get('/api/penugasan')
                this.dataPenugasan = response.data
                console.log(this.dataPenugasan)
            } catch (error) {
                throw error;
            }finally{
                this.isLoading.halaman = false
            }

           

        },
        async getPenugasanByUserId(id){
            this.isLoading.halaman = true
            try {
                const response = await axios.get(`/api/penugasan/${id}`)
                this.dataPenugasanByUser = response.data
                console.log(this.dataPenugasan)

                return response
            } catch (error) {
                throw error;
            }finally{
                this.isLoading.halaman = false
            }

        },

        async storePenugasan(penugasan) {
            console.log('dipanggil')
            this.isLoading.halaman = true
            try {
                const response  = await axios.post('/api/penugasan',
                    {
                        user_id: penugasan.user_id,
                        department_id: penugasan.department_id,
                        startdate : penugasan.startdate,
                        enddate : penugasan.enddate
                    }
                )
                console.log(response)
                // this.dataPegawai = response.data
                return response
                
            } catch (error) {
                
            }
        },

        async updatePenugasan(id,penugasan) {
            this.isLoading.tombol = true;

            try {
                const response = await axios.put(`/api/penugasan/${id}`, {
                    user_id: penugasan.user_id,
                    department_id: penugasan.department_id,
                    startdate : penugasan.startdate,
                    enddate : penugasan.enddate
                })
            } catch (error) {
                throw error;
                
            }finally{
                this.isLoading.tombol = false
            }
        }
    }

})