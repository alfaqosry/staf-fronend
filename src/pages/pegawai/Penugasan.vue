<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted, computed } from 'vue';
import { penugasanStore } from '../../stores/penugasanstore';
import { pegawaiStore } from '../../stores/pegawaistore';
import { useRouter } from 'vue-router';
import { departmentStore } from '../../stores/departmentstore';
import { } from 'vue3-shimmer';

import Swal from 'sweetalert2';

const router = useRouter();
const usePenugasan = penugasanStore();
const usePegawai = pegawaiStore();
const useDeparment = departmentStore();


const pegawai = ref();
const penugasans = ref();
const departments = ref();
const selectedPenugasan = ref();
const searchQuery = ref();
const errmessage = ref();
const newPenugasan = ref({
    user_id: router.currentRoute.value.params.id,
    department_id: '',
    startdate: '',
    enddate: '',
});

onMounted(async () => {
    try {
        await usePenugasan.getPenugasanByUserId(router.currentRoute.value.params.id);
        penugasans.value = usePenugasan.dataPenugasanByUser.data
        console.log(penugasans.value)

        const response = await usePegawai.getPegawaiById(router.currentRoute.value.params.id);
        console.log(usePegawai.dataPegawai.data.name)

        await useDeparment.getDepartmentAll()
        const allDepartments = useDeparment.dataDepartment.data;

        const usedDepartmentIds = penugasans.value.map(penugasan => penugasan.department_id);
        
        departments.value = allDepartments.filter(department => !usedDepartmentIds.includes(department.id));



    } catch (error) {
        console.error('Error fetching data:', error);
    }
})


const pilihPenugasan = (penugasan) => {
    selectedPenugasan.value = penugasan


}

const tambahPenugasan = async () => {
    if (!newPenugasan.value.department_id || !newPenugasan.value.startdate || !newPenugasan.value.enddate) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Pastikan semua field telah diisi!',
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false,
        });
        return;
    }
    try {
        const response = await usePenugasan.storePenugasan(newPenugasan.value);
        if (response.status === 201) {
            const selectedDepartment = departments.value.find(department => department.id === newPenugasan.value.department_id);

            penugasans.value.push({
                ...newPenugasan.value,
                department: selectedDepartment
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Penugasan berhasil ditambahkan',
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
            newPenugasan.value = { department_id: '', startdate: '', enddate: '' };
        } else {
            console.log(response.data);
            errmessage.value = response.data.errors;
        }


    } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 422) {
            errmessage.value = error.response.data;
        } else {
            console.error('Error adding penugasan:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Gagal menambahkan penugasan',
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
        }

    }
};

// const deletePenugasan = async () => {

//     try {
//         const response = await usePenugasan.delete(selectedPenugasan.value.id);
//         console.log(response)
//         penugasans.value = penugasans.value.filter(p => p.id !== selectedPenugasan.value.id);
//         selectedPenugasan.value = null;
//         Swal.fire({
//             position: 'top-end',  
//             icon: 'success',      
//             title: 'Berhasil menghapus data.',
//             showConfirmButton: false,  
//             timer: 1500,          
//             width: '300px',       
//             heightAuto: false,   
//             toast: true          
//         });

//     } catch (error) {
//         console.error('Error deleting pegawai:', error);
//         Swal.fire({
//             position: 'top-end', 
//             icon: 'error',      
//             title: 'Menghapus data gagal!, Ada data yang terkait',
//             showConfirmButton: false, 
//             timer: 1500,          
//             width: '300px',    
//             heightAuto: false,  
//             toast: true          
//         });
//     }



// }



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
                        <div class="col-lg-6">
                            <form>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Cari..." aria-label="Search"
                                        aria-describedby="search-icon" v-model="searchQuery">
                                    <span class="input-group-text" id="search-icon">
                                        <i class="icon-search"></i>
                                    </span>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="row">

                        <div class="col-lg-12 grid-margin stretch-card">

                            <div class="card">
                                <div class="card-body">
                                    <div class="d-sm-flex justify-content-between align-items-start">
                                        <div>

                                            <h4 v-if="usePegawai.isLoading.halaman">
                                                <textShimmer />
                                            </h4>

                                            <h4 class="  card-title card-title-dash" v-else>Riawayat Penugasan <span
                                                    class="text-primary">{{
                                                        usePegawai.dataPegawai.data?.name }}</span>

                                            </h4>
                                        </div>
                                        <div>
                                            <button class="btn btn-primary" data-bs-toggle="modal"
                                                data-bs-target="#tambahModal">Tambah Penugasan</button>
                                        </div>
                                    </div>
                                    <div v-if="usePegawai.isLoading.halaman">
                                        <paragraph-shimmer class="mt-3" :is-loading="true" :lines="4"
                                            :random-size="false" />
                                    </div>

                                    <div class="table-responsive" v-else>
                                        <table class="table table-striped">

                                            <thead>
                                                <tr>
                                                    <th> No </th>
                                                    <th> Department</th>
                                                    <th> Start Date</th>
                                                    <th> End Date</th>
                                                    <th>Aksi</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(penugasan, index) in penugasans">
                                                    <td> {{ index + 1 }} </td>
                                                    <td> {{ penugasan.department?.department_name }} </td>
                                                    <td> {{ penugasan.startdate }} </td>
                                                    <td> {{ penugasan.enddate }} </td>
                                                    <td>
                                                        <router-link class="btn btn-primary btn-sm"
                                                            :to="{ name: 'Department.Edit', params: { id: penugasan.id } }">Edit</router-link>
                                                        <button class="btn btn-danger btn-sm"
                                                            @click="pilihPenugasan(penugasan)" data-bs-toggle="modal"
                                                            data-bs-target="#deleteModal">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>
    <!-- Modal Tambah Penugasan -->
    <div class="modal fade" id="tambahModal" tabindex="-1" aria-labelledby="tambahModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tambahModalLabel">Tambah Penugasan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="department">Department</label>
                        <select class="form-select select2" aria-label="department select"
                            v-model="newPenugasan.department_id">
                            <option selected>Pilih</option>
                            <option v-for="department in departments" :key="department.id" :value="department.id">
                                {{ department.department_name }}
                            </option>

                        </select>
                    </div>
                    <div class="form-group">
                        <label for="startdate">Start Date</label>
                        <input type="date" class="form-control" v-model="newPenugasan.startdate" required>
                    </div>
                    <div class="form-group">
                        <label for="enddate">End Date</label>
                        <input type="date" class="form-control" v-model="newPenugasan.enddate" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-primary" @click="tambahPenugasan"
                        data-bs-dismiss="modal">Simpan</button>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal Konfirmasi Hapus -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Konfirmasi Hapus</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Apakah Anda yakin ingin menghapus department <strong>{{ selectedDepartment?.department_name
                        }}</strong>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-danger" @click="deletePenugasan"
                        data-bs-dismiss="modal">Hapus</button>
                </div>
            </div>
        </div>
    </div>


</template>
