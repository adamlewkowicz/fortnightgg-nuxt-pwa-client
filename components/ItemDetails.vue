<template>
  <section class="item-details">
    <header>
      <h2>{{ item.name }}</h2>
      <figcaption><p>{{ item.type }}</p></figcaption>
      <figure>
        <img
          :src="item.imgUrl"
          :class="item.className"
          :alt="item.imgAlt">
      </figure>
    </header>
    <button @click="$emit('closeDetails')">
    </button>
    <table>
      <tbody>
        <tr v-for="(itemProp, itemPropKey) in itemsProps" :key="itemPropKey">
          <td>{{ itemProp[0] }}</td>
          <td>{{ item[itemProp[1]] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      itemsProps: [
        ['Rarity', 'rarity'],
        ['Damage', 'damage'],
        ['DPS', 'dps'],
        ['Headshot', 'headshot'],
        ['Fire rate', 'fireRate'],
        ['Magazine size', 'magSize'],
        ['Ammo', 'ammoName']
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/css/index.scss";

h2 {
  text-align: center;
  font-size: 18px;
  margin-bottom: 0;
}

.item-details {
  padding: 20px;
  box-sizing: border-box;
  background-color: #373971;
  position: relative;
  animation: popIn .4s;
  @include phone {
    animation: easyScale .6s ease;
  }
}

img {
  margin: 0 auto;
  display: block;
  width: 220px;
  height: 220px;
  @for $index from 1 through 5 {
    &.#{nth($rarityNames, $index)} {
      filter: drop-shadow(0px 0px 60px #{nth($rarityColors, $index)});
    }
  }
  @include small {
    width: 150px;
    height: 150px;
  }
}

button {
  position: absolute;
  right: 20px;
  top: 20px;
  background: url('../assets/img/icons/cancel.svg') no-repeat center;
  background-size: 16px;
  border-style: none;
  width: 42px;
  height: 42px;
  &:hover {
    cursor: pointer;
  }
}

p {
  text-align: center;
}

table {
  margin: 20px 0;
  border-collapse: collapse;
}

td {
  width: 160px;
  padding: 5px;
  text-align: center;
  &:first-child {
    color: #b2b2d5;
  }
}

tr:nth-child(even) {
  background-color: rgba(255,255,255,.05);
}
</style>

