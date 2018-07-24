<template>
  <div class="details-wrapper" @click.self="$emit('closeDetails')">
    <div class="item-details">
      <button @click="$emit('closeDetails')">
      </button>
      <p>{{ item.weapon_name }}</p>
      <img :src="'http://localhost:4000/' + item.weapon_img">
      <table>
        <tbody>
          <tr v-for="(itemProp, itemPropKey) in itemsProps" :key="itemPropKey">
            <td>{{ itemProp[0] }}</td>
            <td>{{ item[itemProp[1]] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      itemsProps: [
        ['Rarity', 'rarity_name'],
        ['Damage', 'damage'],
        ['Type', 'type_name'],
        ['Ammo', 'ammo_name'],
        ['Headshot', 'headshot']
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
.details-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(1,1,1,.4);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-details {
  padding: 20px;
  box-sizing: border-box;
  background-color: #373971;
  position: relative;
  animation: popIn .4s;
}

img {
  margin: 0 auto;
  display: block;
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
}

td {
  width: 160px;
  padding: 5px;
  text-align: center;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(.3);
  }
  65% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>

