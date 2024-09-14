import { defineStore } from "pinia";
import axios  from "axios";

export const departmentStore = defineStore('department', {

    state: () => ({

        dataDepartment : [],
        isLoading: {
            tombol: false,
            halaman: false
        }
    }),
    getters : {
        department : (state) => state.dataDepartment,

    },
    actions : {


        async getDepartmentAll() {
            this.isLoading.halaman = true
            try {
                const response = await axios.get('/api/department')
                this.dataDepartment = response.data
            } catch (error) {
                console.log(error)
            }finally{
                this.isLoading.halaman = false
            }
        },
        async getDepartmentById(id) {
            this.isLoading.halaman = true
            try {
                const response = await axios.get(`/api/department/${id}`)

                this.dataDepartment = response.data
                console.log(this.dataDepartment)
                return response.data
            } catch (error) {
                throw error;
            } finally {
                this.isLoading.halaman = false
            }

        },
        async store(department) {
            this.isLoading.tombol = true
            try {
                const response = await axios.post('/api/department',
                    {
                        department_name: department.department_name,
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
                const response = await axios.put(`/api/department/${id}`, form)
                console.log(response)
                return response
            } catch (error) {
                console.error(`Error updating department with ID ${id}:`, error);
                throw error;

            } finally {
                this.isLoading.tombol = false
            }

        },
        async delete(id) {
           
            try {
                const response = await axios.delete(`/api/department/${id}`)
                console.log(response)
                return response
                
            } catch (error) {
                throw error;
            }finally{
             
            }
        }
    }


})