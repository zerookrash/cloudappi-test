<template>
  <div>
    <b-navbar toggleable="lg" class="nav">
      <b-navbar-brand href="#">
        <img alt="Brand" src="@/assets/logo.png" />
      </b-navbar-brand>
      <input
        class="green fadeIn fourth green mt-5"
        value="Log out"
        @click.prevent="logOut"
      />
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.nav {
  background-color: #f8f9fa;
  margin-bottom: 20px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green {
  background-color: rgb(186, 74, 0);
  border: none;
  color: white;
  padding: 15px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(186, 74, 0, 0.4);
  box-shadow: 0 10px 30px 0 rgba(186, 74, 0, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 5px 5px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
</style>
