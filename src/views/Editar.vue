<template>
  <div>
    <Header />
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-4">
          <img v-bind:src="this.form.avatar" alt="Avatar" />
        </div>
        <div class="col-sm-8">
          <form v-on:submit.prevent action="" class="form-horizontal">
            <div class="form-group left">
              <label for="first_name" class="control-label col-sm-2"
                >Nombre</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="first_name"
                  placeholder="Nombre"
                  v-model="form.first_name"
                />
              </div>
            </div>
            <div class="form-group left">
              <label for="last_name" class="control-label col-sm-2"
                >Apellido</label
              >
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="last_name"
                  placeholder="Nombre"
                  v-model="form.last_name"
                />
              </div>
            </div>
            <div class="form-group left">
              <label for="email" class="control-label col-sm-2">Correo</label>
              <div class="col-sm-10">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Correo"
                  v-model="form.email"
                />
              </div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-outline-success m-3"
                v-on:click="editar(id)"
              >
                Editar
              </button>
              <button
                type="submit"
                class="btn btn-outline-danger m-3"
                v-on:click="eliminar(id)"
              >
                Eliminar
              </button>
              <button
                type="submit"
                class="btn btn-outline-info m-3"
                v-on:click="salir()"
              >
                Salir
              </button>
            </div>
          </form>
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
import axios from "axios";
export default {
  name: "Editar",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      id: null,
      form: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      },
    };
  },
  methods: {
    editar(id) {
      let url = `https://reqres.in/api/users/${id}`;
      axios
        .put(url, this.form)
        .then((res) => {
          this.form = res.data;
          console.log(res);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se modifico correctamente",
            footer: `
              <pre>
                <code>
                  ${JSON.stringify(res.data, null, 2)}
                </code>
              </pre>
            `,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminar(id) {
      let url = `https://reqres.in/api/users/${id}`;
      axios
        .delete(url)
        .then((res) => {
          console.log(res);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Se elimino correctamente",
            footer: `
              <pre>
                <code>
                  Respuesta del Servidor: ${JSON.stringify(res.status, null, 2)}
                </code>
              </pre>
            `,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    salir() {
      this.$router.push("/dashboard");
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    let url = `https://reqres.in/api/users/${this.id}`;
    axios.get(url).then((res) => {
      this.user = res.data.data;

      this.form.id = this.user.id;
      this.form.email = this.user.email;
      this.form.first_name = this.user.first_name;
      this.form.last_name = this.user.last_name;
      this.form.avatar = this.user.avatar;

      console.log(this.form);
    });
  },
};
</script>

<style scoped>
.left {
  text-align: left;
}

img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
