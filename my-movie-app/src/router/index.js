import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from "@/views/Home.vue";
import Popular from "@/views/Popular.vue";
import Search from "@/views/Search.vue";
import Wishlist from "@/views/Wishlist.vue";
import Signin from "@/views/Signin.vue";
import Signup from "@/views/Signup.vue";
import MovieDetail from "@/views/MovieDetail.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/popular", name: "Popular", component: Popular },
  { path: "/search", name: "Search", component: Search },
  { path: "/wishlist", name: "Wishlist", component: Wishlist },
  { path: "/signin", name: "Signin", component: Signin },
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetail }, // 영화 상세 페이지
  { path: "/signup", name: "Signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (to.path !== "/signin" && !isLoggedIn) {
    next("/signin"); // 로그인 페이지로 리다이렉트
  } else {
    next(); // 허용
  }
});


export default router;
