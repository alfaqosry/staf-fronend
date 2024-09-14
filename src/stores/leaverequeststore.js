import { defineStore } from "pinia";
import axios from 'axios';

export const leaveRequestStore = defineStore('leaverequest', {
    state: () => ({
        dataLeaveRequest: [],
        isLoading: {
            tombol: false,
            halaman: false
        }
    }),

    getters: {
        leaverequest: (state) => state.dataLeaveRequest
    },

    actions: {
        async getLeaveRequestAll() {
            this.isLoading.halaman = true;
            try {
                const response = await axios.get('/api/leave-request');
                this.dataLeaveRequest = response.data;

                console.log(response.data)
            } catch (error) {
                console.error('Error fetching leave requests:', error);
               
            } finally {
                this.isLoading.halaman = false;
            }
        },

        async terima(id) {
            this.isLoading.tombol = true
            try {
                const response = await axios.post(`/api/leave-request/terima/${id}`)
                this.dataLeaveRequest = response.data;
                console.log(response.data)

            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }finally{
                this.isLoading.halaman = false;
            }
        },

        async tolak(id) {
            this.isLoading.tombol = true

            try {
                const response = await axios.post(`/api/leave-request/tolak/${id}`)
                this.dataLeaveRequest = response.data
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }finally{

                this.isLoading.tombol = false
            }


        }
    }
});
