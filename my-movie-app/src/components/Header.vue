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
  transition: box-shadow 0.3s, filter 0.3s; /* 부드러운 효과 추가 */
}

.header:hover {
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.6); /* 흰색으로 빛나는 효과 */
  filter: brightness(1.2); /* 살짝 밝아지게 */
}

nav {
  display: flex;
  gap: 15px;
}

nav a {
  color: white;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s; /* 효과를 부드럽게 */
}

nav a:hover {
  color: #00bcd4; /* 밝게 빛나는 색상 */
  transform: scale(1.1); /* 약간 커지는 효과 */
}

.user-icon {
  cursor: pointer;
  transition: transform 0.3s, filter 0.3s;
}

.user-icon:hover {
  transform: scale(1.2); /* 아이콘 확대 효과 */
  filter: brightness(1.5); /* 밝게 빛나는 효과 */
}

.logo {
  cursor: pointer;
  transition: transform 0.3s, filter 0.3s;
}

.logo:hover {
  transform: scale(1.2); /* 로고 확대 효과 */
  filter: brightness(1.5); /* 밝게 빛나는 효과 */
}
</style>
