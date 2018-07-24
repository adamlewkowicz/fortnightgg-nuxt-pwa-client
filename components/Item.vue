<template>
  <div class="item"
    :class="item.rarity_name.toLowerCase()">
    <!-- <div v-for="(prop, propKey) in smallProps" :key="propKey"
      class="hidden-props"
      >
      {{ item[prop] }}
    </div> -->
    <img :src="'http://localhost:4000/' + item.weapon_img">
    <div class="overlap-set">
      {{ item.weapon_name }}
    </div>
    <div class="dots-wrapper">
      <div v-for="(dot, dotKey) in 5" :key="dotKey"
        :style="{
          width: dotKey * 5 + 'px',
          height: dotKey * 5 + 'px',
          order: Math.floor(Math.random() * 5),
          animationDelay: dotKey/4 + 's'
        }"
        class="dot">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      smallProps: ['damage', 'headshot', 'dps', 'magazine_size']
    }
  }
}
</script>

<style lang="scss" scoped>

$rarityNames: common, uncommon, rare, epic, legendary;
$backgrounds:
  (#a9b0b6 0%, #5f6569 100%),
  (#60aa3a 0%,#1d5819 100%),
  (#3da1e8 0%,#143775 100%),
  (#b55de4 0%,#4c2484 100%),
  (#e78245 0%,#78371d 100%);
$borders: #e6e6e6, #66bb30, #38d3ff, #f959ff, #ff7826;
$shadows:
  rgba(202, 202, 202, 0.54),
  rgba(102,233,19,0.54),
  rgba(24,202,252,0.54),
  rgba(202,102,255,0.54),
  rgba(255,120,38,0.54);

.item {
  width: 150px;
  height: 150px;
  margin: 13px;
  position: relative;
  transition: all .3s ease;
  @for $index from 1 through 5 {
    &.#{nth($rarityNames, $index)} {
     background: radial-gradient(ellipse at center, #{nth($backgrounds, $index)});
     border: 2px solid #{nth($borders, $index)};
    //  transition: width .3s ease, height .3s ease;
     transition-delay: .05s;
     &:hover {
       box-shadow: 0px 0px 35px -4px #{nth($shadows, $index)};
       cursor: pointer;
       transform: scale(1.2);
       img {
        z-index: 30;
        position: absolute;
        transform: scale(1.5) rotate(20deg);
       }
       .overlap-set {
         z-index: 80;
         transform: translateY(calc(100% + 2px));
       }
       .dot {
         animation: flowUp 2s ease infinite;
       }
      //  width: 200px;
      //  height: 200px;
     }
    }
  }
}

img {
  transition: transform .3s ease;
  width: 80%;
  padding: 10%;
  user-select: none;
}

.hidden-props {
  position: absolute;
  // @for $index from 1 through 4 {
  //   &:nth-child(#{$index}) {
  //     @if $index < 2 {
  //       top: 0;
  //       left:
  //     } @else {

  //     }
  //   }
  // }
  margin: 0 10px;
  &:first-child {
    top: 0;
    left: 10px;
  }
  &:nth-child(2) {
    top: 0;
    left: 40px;
  }
  &:nth-child(3) {
    bottom: 0;
    right: 10px;
  }
  &:nth-child(4) {
    bottom: 0;
    right: 40px;
  }
  // &:nth-child(2) { left:  }
  // &:nth-child(3), &:last-child {
  //   right: 0;
  //   bottom: 5%;
  // }
}

.dots-wrapper {
  display: flex;
  position: absolute;
  justify-content: space-between;
  width: 80%;
  margin: 0 10%;
  bottom: 0;
}

.dot {
  width: 4px;
  height: 4px;
  background-color: rgba(255,255,255,.1);
  border-radius: 12px;
}

.overlap-set {
  bottom: 0;
  left: 0;
  z-index: 0;
  position: absolute;
  background-color: rgba(1,1,1,.3);
  width: 100%;
  transition: transform .3s ease;
  // height: 25%;
  font-size: 13px;
  padding: 7px;
  box-sizing: border-box;
  font-weight: bold;
}


@keyframes swim {
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes flowUp {
  0% {
    opacity: 0;
    transform: translate(0,0);
  }
  25% {
    // transform: translate(100%, );
    opacity: 1;
  }
  50% {
    transform: translateX(-100%);
  }
  85% {
    transform: translateX(0);
    opacity: 0;
    transform: translateY(-700%);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}
</style>




