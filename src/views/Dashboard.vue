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
          <input
            type="button"
            class="fadeIn fourth"
            value="Pre"
            v-on:click="paginator1()"
          />
        </div>
        <div class="col">
          <input
            class="fadeIn fourth green"
            value="Create"
            @click.prevent="registro = true"
          />
        </div>
        <div class="col">
          <input
            type="button"
            class="fadeIn fourth"
            value="Next"
            v-on:click="paginator2()"
          />
        </div>
      </div>
      <section
        class="row animate__animated animate__fadeIn mt-5"
        v-if="registro"
      >
        <div class="col centrar">
          <h1 class="m-3">New Register</h1>
          <form class="form-horizontal" v-on:submit.prevent="validatForm">
            <div class="row">
              <div class="col">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  v-model="newUser.first_name"
                />
              </div>
              <div class="col">
                <label for="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  v-model="newUser.last_name"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  v-model="newUser.email"
                />
              </div>
              <div class="col-4">
                <label for="birthday">Birthday</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  placeholder="Birthday"
                  v-model="newUser.birthday"
                />
              </div>
            </div>
            <div class="row">
              <h3 class="m-3">Addresses</h3>
            </div>
            <div class="row">
              <div class="col">
                <label for="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Street"
                  v-model="newUser.address.street"
                />
              </div>
              <div class="col">
                <label for="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  v-model="newUser.address.city"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <label for="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  v-model="newUser.address.country"
                />
              </div>
              <div class="col-4">
                <label for="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Postal Code"
                  v-model="newUser.address.postalCode"
                />
              </div>
            </div>
          </form>
          <input
            class="green fadeIn fourth green mt-5"
            value="Register"
            @click.prevent="validatForm"
          />
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Swal from "sweetalert2";
import "animate.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Footer from "@/components/Footer.vue";
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
      registro: false,
      newUser: {
        id: uuidv4(),
        first_name: "",
        last_name: "",
        email: "",
        birthday: "",
        address: {
          id: uuidv4(),
          street: "",
          city: "",
          country: "",
          postalCode: "",
        },
      },
    };
  },
  methods: {
    validatForm() {
      if (
        this.newUser.first_name == "" ||
        this.newUser.last_name == "" ||
        this.newUser.email == "" ||
        this.newUser.birthday == "" ||
        this.newUser.address.street == "" ||
        this.newUser.address.city == "" ||
        this.newUser.address.country == "" ||
        this.newUser.address.postalCode == ""
      ) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Todos los campos son requeridos",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
          timer: 2500,
        });
        return false;
      } else {
        axios
          .post(`https://reqres.in/api/users`, this.newUser)
          .then((res) => {
            this.users.push(res.data);
            this.newUser = {
              id: "",
              first_name: "",
              last_name: "",
              email: "",
              birthday: "",
              address: {
                id: "",
                street: "",
                city: "",
                country: "",
                postalCode: "",
              },
            };
            this.registro = false;
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registro Exitoso",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Ocurrio un error",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
              showConfirmButton: false,
              timer: 2500,
            });
          });
      }
    },
    editar(id) {
      this.$router.push("/editar/" + id);
    },
    hasUsers() {
      return this.users && this.users.length > 0;
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

.green {
  background-color: rgb(0, 186, 2);
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(0, 186, 2, 0.4);
  box-shadow: 0 10px 30px 0 rgba(0, 186, 2, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.centrar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 6rem;
  border: 1px solid #f6f6f6;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.2);
}

.form-horizontal {
  width: 60%;
}

input[type="text"],
input[type="date"],
input[type="email"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 95%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>
