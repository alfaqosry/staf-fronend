<script setup>
import Header from '../../components/Header.vue';
import Sidebar from '../../components/Sidebar.vue';
import Footer from '../../components/Footer.vue';
import Swal from 'sweetalert2';


import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { departmentStore } from '../../stores/departmentstore';

const router = useRouter();
const form = ref({
    department_name: '',
});

const errmessage = ref();
const useDepartment = departmentStore();

const loadDepartment = async () => {

    try {
        const response = await useDepartment.getDepartmentById(router.currentRoute.value.params.id)
        console.log(response);

        if (useDepartment.dataDepartment) {

            form.value = {
                department_name: useDepartment.dataDepartment.data.department_name,
            }

        }

    } catch (error) {

    }

}

onMounted(async () => {

    try {
        await loadDepartment();
    } catch (error) {

    }

})

const submitDepartment = async () => {


    try {
        const response = await useDepartment.update(router.currentRoute.value.params.id,form.value);
        console.log(response);
        if (response.status === 200) {
            Swal.fire({
            position: 'top-end',  
            icon: 'success',      
            title: 'Berhasil update data',
            showConfirmButton: false,  
            timer: 2000,          
            width: '300px',       
            heightAuto: false,   
            toast: true          
        });
            router.push({ name: 'Department' });
        } else {
            console.log(response.data);
            errmessage.value = response.data.errors;
        }



    } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 422) {
            errmessage.value = error.response.data;
        } else {
            console.error("An unexpected error occurred:", error);
            errmessage.value = { general: 'An unexpected error occurred.' };
        }
    }

}

const cancel = () => {
    router.push({ name: 'Department' })
}
</script>



<template>

    <div class="container-scroller">
        <Header />

        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_sidebar.html -->
            <Sidebar />
            <!-- partial -->

            <!-- main-panel ends -->
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Edit Department</h4>
                                    <div v-if="useDepartment.isLoading.halaman"
                                        class="d-flex justify-content-center align-items-center">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <form class="forms-sample" @submit.prevent="submitDepartment" v-else>
                                        <div class="form-group">
                                            <label for="department_name">Nama Departement</label>
                                            <input type="text" class="form-control" id="department_name"
                                                placeholder="Nama department" v-model="form.department_name">
                                            <small v-if="errmessage?.department_name" class="text-danger">{{
                                                errmessage.department_name[0]
                                            }}</small>
                                        </div>
                                        <button type="submit" class="btn btn-primary me-2" disabled
                                            v-if="useDepartment.isLoading.tombol"><span
                                                class="spinner-border spinner-border-sm" role="status"
                                                aria-hidden="true"></span>
                                            <span class="sr-only">Loading...</span></button>
                                        <button type="submit" class="btn btn-primary me-2" v-else>Simpan</button>
                                        <button class="btn btn-light" @click="cancel()">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- footer -->

                <Footer />
            </div>
        </div>


    </div>



</template>