<template>
  <div>
    <h1>로그인</h1>
    <input v-model="email" type="email" placeholder="이메일" />
    <input v-model="password" type="password" placeholder="비밀번호" />
    <button @click="login">로그인</button>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        alert("로그인 성공!");
        this.$router.push("/");
      } else {
        alert("이메일과 비밀번호를 입력하세요.");
      }
    },
  },
};
</script>
