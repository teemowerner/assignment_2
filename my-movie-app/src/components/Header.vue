<template>
  <header class="header">
    <div class="logo" @click="$router.push('/')">
      <i class="fas fa-ticket-alt"></i>
    </div>
    <nav>
      <router-link to="/">홈</router-link>
      <router-link to="/popular">대세 콘텐츠</router-link>
      <router-link to="/search">찾아보기</router-link>
      <router-link to="/wishlist">내가 찜한 리스트</router-link>
    </nav>
    <div class="user-icon" @click="$router.push('/signin')">
      <i class="fas fa-user"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111;
  color: white;
  padding: 10px 20px;
  text-decoration: none; /* 밑줄 제거 */
}
nav {
  display: flex;
  gap: 15px;
  text-decoration: none; /* 밑줄 제거 */
}
nav a {
  color: white;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
  text-decoration: none; /* 밑줄 제거 */
}
.user-icon {
  cursor: pointer;
}
.logo {
  cursor: pointer;
}
</style>
