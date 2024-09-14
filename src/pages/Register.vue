<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth px-0">
                <div class="row w-100 mx-0">
                    <div class="col-lg-4 mx-auto">
                        <!-- <div class="alert alert-danger mt-3" v-if="errmessage">{{ errmessage }}</div> -->
                        <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div class="brand-logo">
                                <img src="../../assets/images/logo.svg" alt="logo">
                            </div>
                            <h4>New here?</h4>
                            <h6 class="fw-light">Signing up is easy. It only takes a few steps</h6>
                            <form class="pt-3" @submit.prevent="submitRegister">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="name" placeholder="Nama"
                                        v-model="form.name">
                                    <small v-if="errmessage?.name" class="text-danger">{{ errmessage.name[0]
                                        }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" id="email"
                                        placeholder="Email" v-model="form.email">
                                    <small v-if="errmessage?.email" class="text-danger">{{ errmessage.email[0]
                                        }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="alamat"
                                        placeholder="Alamat" v-model="form.alamat">
                                    <small v-if="errmessage?.alamat" class="text-danger">{{ errmessage.alamat[0]
                                        }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="nosim"
                                        placeholder="Nomor SIM" v-model="form.nosim">
                                    <small v-if="errmessage?.nosim" class="text-danger">{{ errmessage.nosim[0]
                                        }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="nohp"
                                        placeholder="Nomor Telepon" v-model="form.nohp">
                                    <small v-if="errmessage?.nohp" class="text-danger">{{ errmessage.nohp[0]
                                        }}</small>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg" id="password1"
                                        placeholder="Password" v-model="form.password">
                                    <small v-if="errmessage?.password" class="text-danger">{{ errmessage.password[0]
                                        }}</small>
                                </div>
                                <div class="form-group">
                    <input type="password" class="form-control form-control-lg" id="password2" placeholder="Konfirmasi Password" v-model="form.password_confirmation">
                  </div>
                                <div class="mb-4">
                                    <div class="form-check">
                                        <label class="form-check-label text-muted">
                                            <input type="checkbox" class="form-check-input"> I agree to all Terms &
                                            Conditions </label>
                                    </div>
                                </div>
                                <div class="mt-3 d-grid gap-2">
                                    <button type="submit"
                                        class="btn btn-block btn-primary btn-lg fw-medium auth-form-btn">SIGN
                                        UP</button>
                                </div>
                                <div class="text-center mt-4 fw-light"> Already have an account? <router-link
                                        :to="{ name: 'Login' }" class="text-primary">Login</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { authStore } from '../stores/authstore';


const form = ref({
    email: '',
    password: '',
    alamat: '',
    nohp: '',
    nosim: '',
    password_confirmation: ''
})

const router = useRouter();
const useAuth = authStore();
const errmessage = ref();

const submitRegister = async () => {


    try {
        const response = await useAuth.register(form.value);
       
        if (response.status == 204) {
            router.push({ name: 'Home' });
        } else {
            errmessage.value = response.response.data.errors
          
        }

    } catch (error) {
        errmessage.value = error;
    }

}
</script>