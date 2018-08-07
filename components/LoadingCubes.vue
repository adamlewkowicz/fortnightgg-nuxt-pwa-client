<template>
  <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
</template>

<style scoped>
.spinner {
  position: absolute;
  top: 300px;
  left: 50%;
}

.cube1, .cube2 {
  background-color: #1aa1eb;
  width: 15px;
  height: 15px;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  animation-delay: -0.9s;
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
  }
}
</style>
