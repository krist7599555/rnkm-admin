<template lang="pug">
  #logoHeader.hero
    .hero-body
      img.logo(src='~@/assets/logo.png')
</template>

<script>
import { TweenMax } from "gsap/TweenMax";

export default {
  mounted() {
    const tw = new TweenMax(".logo");
    tw.repeat(100);
    tw.to(2, { backgroundColor: "red" });
    // TweenMax.to(".logo", 2, {
    //   left: "50%",
    //   backgroundColor: "white"
    // });
    // TweenMax.to(".logo", 0, { rotate: 0 }).to(".logo", 6, {
    //   rotate: 90
    // });
  }
};
</script>


<style lang="scss" scoped>
@keyframes logoSpin {
  40% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(90deg);
  }
  75% {
    transform: rotate(-30deg);
  }
  95% {
    transform: rotate(740deg);
  }
  100% {
    transform: rotate(720deg);
  }
}
#logoHeader {
  &.hero {
    background-color: pink;
    overflow: hidden;
  }
  .logo {
    position: relative;
    // animation: logoSpin 7s ease-in-out infinite;
    // background-color: white;
    border-radius: 1000px;
    padding: 30px;
    transform-origin: -50% 50%;
    background-color: "white";
  }
}
</style>
