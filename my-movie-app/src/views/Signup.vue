<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1 class="signup-title">회원가입 페이지</h1>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/signin">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSignup() {
      if (!this.validateEmail(this.email)) {
        alert("Please enter a valid email address!");
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // 회원가입 로직
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      // 데이터를 LocalStorage에 저장
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const emailExists = users.some((u) => u.email === this.email);

      if (emailExists) {
        alert("Email already exists. Please log in.");
        return;
      }

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("회원가입이 완료되었습니다!");
      this.$router.push("/signin");
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
/* 회원가입 페이지 스타일 */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/path/to/background.jpg') no-repeat center center;
  background-size: cover;
  background-color: #f8f9fa; /* 배경 이미지가 없을 경우를 위한 기본 배경 */
}

.signup-box {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 320px;
  text-align: center;
}

.signup-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: black;
}

.form-group input {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
}

.signup-button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: #218838;
}

.login-link {
  font-size: 14px;
  margin-top: 20px;
  color: black;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
