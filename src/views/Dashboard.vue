<template>
  <div>
    <Header />

    <div class="container">
      <table
        class="table table-hover animate__animated animate__fadeIn"
        v-if="hasUsers()"
      >
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" v-on:click="editar(user.id)">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
      <div class="row animate__animated animate__fadeIn" v-if="hasUsers()">
        <div class="col">
          <button class="btn btn-primary" v-on:click="paginator1()">
            Prev
          </button>
        </div>
        <div class="col">
          <!-- TODO: Create Form -->
          <button class="btn btn-success">Create</button>
        </div>
        <div class="col">
          <button class="btn btn-primary" v-on:click="paginator2()">
            Next
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Swal from "sweetalert2";
import "animate.css";
import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      users: null,
      page: 1,
      total_pages: 1,
    };
  },
  methods: {
    editar(id) {
      this.$router.push("/editar/" + id);
    },
    hasUsers() {
      return this.users && this.users.length > 0;
    },
    paginator2() {
      if (this.page < this.total_pages) {
        this.page++;
      } else {
        this.page = this.total_pages;
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "No hay mas registros",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 1500,
        });
      }
      axios
        .get(`https://reqres.in/api/users?page=${this.page}`)
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    paginator1() {
      if (this.page <= 1) {
        this.page = 1;
        Swal.fire({
          position: "top-start",
          icon: "warning",
          title: "No hay mas registros",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.page--;
      }
      axios
        .get(`https://reqres.in/api/users?page=${this.page}`)
        .then((res) => {
          this.users = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    let url = `https://reqres.in/api/users?page=${this.page}`;
    axios.get(url).then(async (res) => {
      this.users = await res.data.data;
      this.total_pages = await res.data.total_pages;
    });
  },
};
</script>

<style scoped>
tr {
  cursor: pointer;
}
</style>
