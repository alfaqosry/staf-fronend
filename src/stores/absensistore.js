import { defineStore } from "pinia";
import axios from "axios";


export const absensiStore = defineStore('absensi', {

    state: () => ({

        dataAbsen: [],
        isLoading: {
            tombol: false,
            halaman: false
        }
    }),
    getters: {
        absensi: (state) => state.dataAbsen
    },
    actions: {
        async getAbsensiAll() {
            this.isLoading.halaman = true
            try {
                const response = await axios.get('/api/absensi')
                console.log(response)

                this.dataAbsen = response.data
            } catch (error) {
                throw error
            } finally {

                this.isLoading.halaman = false
            }
        }


    }




})