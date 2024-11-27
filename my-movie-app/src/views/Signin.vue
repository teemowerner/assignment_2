<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 로그인 페이지 제목 -->
      <h1 class="login-title">로그인 페이지</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            type="text"
            v-model="username"
            placeholder="Username or Email"
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
        <div class="form-options">
          <!-- 텍스트 색상을 검정색으로 설정 -->
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe" />
            아이디/패스워드 저장
          </label>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit" class="login-button">LOGIN</button>
      </form>
      <p class="signup-link">
        Don’t have an account? <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    handleLogin() {
      if (this.username && this.password) {
        // 로그인 로직
        localStorage.setItem("isLoggedIn", true);
        this.$router.push("/");
      } else {
        alert("Please enter valid credentials!");
      }
    },
  },
};
</script>

<style scoped>
/* 전체 배경 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/path/to/background.jpg') no-repeat center center;
  background-size: cover;
}

/* 로그인 박스 */
.login-box {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
}

/* 제목 스타일 */
.login-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: black; /* 제목을 검정색으로 설정 */
}

/* 입력 필드 스타일 */
.form-group input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
}

/* 옵션 섹션 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-label {
  font-size: 14px;
  color: black; /* 체크박스 텍스트를 검정색으로 설정 */
}

.forgot-password {
  font-size: 14px;
  text-decoration: none;
  color: #007bff;
}

/* 로그인 버튼 */
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

/* 회원가입 링크 */
.signup-link {
  font-size: 14px;
  margin-top: 20px;
  color: black; /* 회원가입 텍스트 색상도 검정색으로 설정 */
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
}
</style>
