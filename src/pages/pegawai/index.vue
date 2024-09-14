<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import { ref, onMounted, computed } from 'vue';
import { pegawaiStore } from '../../stores/pegawaistore';


const usePegawai = pegawaiStore();
const pegawais = ref();
const searchQuery = ref('');
const selectedPegawai = ref();
onMounted(async () => {
    try {
        await usePegawai.getPegawaiAll();

        pegawais.value = usePegawai.dataPegawai.data;


    } catch (error) {
        console.error('Error fetching data:', error);
    }
})

const cariPegawai = computed(() => {
    if (!searchQuery.value) {
        return pegawais.value; // Jika tidak ada input pencarian, tampilkan semua pegawai
    }
    return pegawais.value.filter(pegawai =>
        pegawai.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        pegawai.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        pegawai.phone_number.includes(searchQuery.value)
    );
});

const pilihPegawai = (pegawai) => {
    selectedPegawai.value = pegawai


}

const deletePegawai = async () => {

    try {
        const response = await usePegawai.delete(selectedPegawai.value.id);
        console.log(response)
        pegawais.value = pegawais.value.filter(p => p.id !== selectedPegawai.value.id);
        selectedPegawai.value = null;

    } catch (error) {
        console.error('Error deleting pegawai:', error);
    }


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

                                    <div v-if="usePegawai.isLoading.halaman">
                                        <paragraph-shimmer class="mt-3" :is-loading="true" :lines="4"
                                            :random-size="false" />

                                    </div>
                                    <div v-else>
                                        <div class="d-sm-flex justify-content-between align-items-start">
                                            <div>
                                                <h4 class="card-title card-title-dash">Daftar Pegawai</h4>
                                            </div>
                                            <div>
                                                <router-link class="btn btn-primary  text-white mb-0 me-0"
                                                    :to="{ name: 'Pegawai.Create' }"><i
                                                        class="mdi mdi-account-plus"></i>
                                                    Tambah Pegawai</router-link>
                                            </div>
                                        </div>

                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> Nama </th>
                                                        <th> Email</th>
                                                        <th> No TLPN </th>
                                                        <th>Position</th>
                                                        <th>Department</th>
                                                        <th>Hire Date</th>
                                                        <th> Gaji </th>
                                                        <th> Aksi </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="pegawai in cariPegawai">

                                                        <td> {{ pegawai.name }} </td>
                                                        <td> {{ pegawai.email }} </td>
                                                        <td> {{ pegawai.phone_number }} </td>
                                                        <td> {{ pegawai.position }} </td>
                                                        <td>
                                                            <div class="badge badge-sm badge-primary me-1"> {{
                                                                pegawai.department.department_name }}</div>
                                                            <div class="badge badge-sm badge-warning me-1"
                                                                v-for="item in pegawai.departmentassignments"> {{
                                                                    item.department.department_name }} </div>
                                                        </td>
                                                        <td>{{ pegawai.hire_date }} </td>
                                                        <td> Rp. {{ pegawai.salary }} </td>
                                                        <td>
                                                            <router-link class="btn btn-primary btn-sm"
                                                                :to="{ name: 'Pegawai.Edit', params: { id: pegawai.id } }">Edit</router-link>
                                                            <button class="btn btn-danger btn-sm"
                                                                @click="pilihPegawai(pegawai)" data-bs-toggle="modal"
                                                                data-bs-target="#deleteModal">
                                                                Delete
                                                            </button>
                                                            <router-link class="btn btn-primary btn-sm"
                                                                :to="{ name: 'Pegawai.Penugasan', params: { id: pegawai.id } }">Penugasan</router-link>
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
                    Apakah Anda yakin ingin menghapus pegawai <strong>{{ selectedPegawai?.name }}</strong>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-danger" @click="deletePegawai"
                        data-bs-dismiss="modal">Hapus</button>
                </div>
            </div>
        </div>
    </div>


</template>
