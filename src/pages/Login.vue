<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth px-0">
                <div class="row w-100 mx-0">
                    <div class="col-lg-4 mx-auto">
                        <div class="alert alert-danger mt-3" v-if="errmessage">{{ errmessage }}</div>
                        <div v-if="successMessage" class="alert alert-success">
                            {{ successMessage }}
                        </div>
                        <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div class="brand-logo">
                                <img src="../assets/images/logo.svg" alt="logo">

                            </div>
                            <h4>Kepegawaian UP</h4>
                            <h6 class="fw-light">Sign in to continue.</h6>
                            <form @submit.prevent="submitLogin" class="pt-3">
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" id="email"
                                        placeholder="Username" v-model="form.email">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg"
                                        id="exampleInputPassword1" placeholder="Password" v-model="form.password">
                                </div>
                                <div class="mt-3 d-grid gap-2">
                                    <button type="submit"
                                        class="btn btn-block btn-primary btn-lg fw-medium auth-form-btn"
                                        v-if="useAuth.loading == false">SIGN
                                        IN</button>
                                    <button type="submit"
                                        class="btn btn-block btn-primary btn-lg fw-medium auth-form-btn" disabled
                                        v-if="useAuth.loading == true"> <span class="spinner-border spinner-border-sm"
                                            role="status" aria-hidden="true"></span>
                                        <span class="sr-only">Loading...</span></button>
                                </div>
                                <div class="my-2 d-flex justify-content-between align-items-center">
                                    <div class="form-check">
                                        <label class="form-check-label text-muted">
                                            <input type="checkbox" class="form-check-input"> Keep me signed in </label>
                                    </div>
                                    <a href="#" class="auth-link text-black">Forgot password?</a>
                                </div>

                                <div class="text-center mt-4 fw-light"> Don't have an account? <router-link
                                        :to="{ name: 'Register' }" class="text-primary">Create></router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { authStore } from '../stores/authstore';


const form = ref({
    email: '',
    password: ''
})

const router = useRouter();
const useAuth = authStore();
const errmessage = ref();
const successMessage = ref();

onMounted(() => {

    console.log(router.currentRoute.value.query.success)
    if (router.currentRoute.value.query.success) {
        successMessage.value = router.currentRoute.value.query.success;
    }
});

const submitLogin = async () => {

    console.log(useAuth.getToken());

    try {
        const response = await useAuth.login(form.value);
        console.log(response);

        if (response.status == 200 || response.status == 204) {
            router.push('/');
        }

    } catch (error) {

        console.log(error);
        errmessage.value = error;
    }

}
</script>