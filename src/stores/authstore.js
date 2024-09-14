import { defineStore } from "pinia";
import axios from "axios";

export const authStore = defineStore('auth',
    {

        state: () => ({
            authUser: null,
            isLoading: false,
            isAuthenticated: false
        }),
        getters: {
            user: (state) => state.authUser,
            loading: (state) => state.isLoading
        },
        actions: {

            async login(cre) {

                this.isLoading = true
                try {
                    await this.getToken();
                    const response = await axios.post('/login', {
                        email: cre.email,
                        password: cre.password
                    });
                    this.isAuthenticated = true;
                    return response;

                } catch (error) {
                    throw error.response.data.message || 'Login gagal coba lagi!';
                } finally {
                    this.isLoading = false;
                }


            },

            async register(data) {
                this.isLoading = true;
                console.log(data)

                try {
                    await this.getToken();
                    const response = await axios.post('/register', {
                        name: data.name,
                        email: data.email,
                        alamat: data.alamat,
                        nosim: data.nosim,
                        nohp: data.nohp,
                        password: data.password,
                        password_confirmation: data.password_confirmation
                    })

                    this.isAuthenticated = true;
                    return response;
                } catch (error) {
                    return error;

                }
                finally {
                    this.isLoading = false;
                }

            },


            async getToken() {
                await axios.get('sanctum/csrf-cookie');
            },


            async getUser() {

                try {

                    const data = await axios.get('/api/user');
                    this.authUser = data.data
                    this.isAuthenticated = !!this.authUser;
                } catch (error) {
                    this.isAuthenticated = false;
                }
            },

            async logOut(router) {
                try {
                    await axios.post('/logout');
                    this.authUser = null;
                    this.isAuthenticated = false;
                    router.push({ name: 'Login' });
                } catch (error) {
                    console.error("Logout error:", error);
                    throw error;
                }
            }


        }
    }
);

