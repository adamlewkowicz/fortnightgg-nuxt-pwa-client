<template>
  <div class="item"
    @click="$emit('choosenItem', item)"
    :class="item.rarity.toLowerCase()">
    <img :src="'http://localhost:4000/static/' + item.img">
    <div class="overlap-set">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      smallProps: ['damage', 'headshot', 'dps', 'magazine_size'],
      showDetails: -1
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
     transition-delay: .05s;
     &:hover {
       position: relative;
       z-index: 10;
       box-shadow: 0px 0px 35px -4px #{nth($shadows, $index)};
       cursor: pointer;
       transform: scale(1.2);
       img {
        transform: scale(1.5) rotate(20deg);
       }
       .overlap-set {
         transform: translateY(calc(100% + 2px));
         background-color: rgba(1,1,1,.8);
       }
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

.overlap-set {
  bottom: 0;
  left: 0;
  position: absolute;
  background-color: rgba(1,1,1,.3);
  width: 100%;
  transition: transform .3s ease, background-color .3s ease;
  font-size: 13px;
  padding: 7px;
  box-sizing: border-box;
  font-weight: bold;
}
</style>




