import { defineStore } from "pinia";
import axios from "axios";

export const pegawaiStore = defineStore('pegawai', {

    state: () => ({

        dataPegawai: [],
        isLoading: {
            tombol: false,
            halaman: false
        }
    }),
    getters: {
        pegawai: (state) => state.dataPegawai,
    },
    actions: {
        async getPegawaiAll() {

            this.isLoading.halaman = true
            try {
                const response = await axios.get('/api/pegawai')
                console.log(response)
                this.dataPegawai = response.data
                return response
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading.halaman = false;
            }
        },

        async getPegawaiById(id) {
            this.isLoading.halaman = true
            try {
                const response = await axios.get(`/api/pegawai/${id}`)

                this.dataPegawai = response.data
                console.log(this.dataPegawai)
                console.log(response)
                return response.data
            } catch (error) {
                throw error;
            } finally {
                this.isLoading.halaman = false
            }

        },

        async store(pegawai) {
            this.isLoading.tombol = true
            try {
                const response = await axios.post('/api/pegawai',
                    {
                        name: pegawai.name,
                        email: pegawai.email,
                        phone_number: pegawai.phone_number,
                        position: pegawai.position,
                        department_id: pegawai.department_id,
                        hire_date: pegawai.hire_date,
                        address: pegawai.address,
                        salary: pegawai.salary,
                        password: pegawai.password
                    }
                )
                console.log(response)
                // this.dataPegawai = response.data
                return response
            } catch (error) {
                console.log(error)
                throw error;
            } finally {
                this.isLoading.tombol = false
            }

        },

        async update(id, form) {
            this.isLoading.tombol = true
            try {
                const response = await axios.put(`/api/pegawai/${id}`, form)
                console.log(response)
                return response
            } catch (error) {
                console.error(`Error updating pegawai with ID ${id}:`, error);
                throw error;

            } finally {
                this.isLoading.tombol = false
            }

        },

        async delete(id) {
            this.isLoading.halaman = true
            try {
                const response = await axios.delete(`/api/pegawai/${id}`)
                console.log(response)
                return response
                
            } catch (error) {
                throw error;
            }finally{
                this.isLoading.halaman = false
            }
        }
    }

})

