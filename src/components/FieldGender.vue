<template lang="pug">
  b-icon.k-icon-gender(:icon='icon')
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    }
  },
  computed: {
    icon() {
      return {
        0: "venus",
        1: "mars"
      }[this.value];
    }
  }
};
</script>
<style lang="scss">
.k-icon-gender {
  .fa-venus {
    color: #f54db8;
  }
  .fa-mars {
    color: #2fa1f5;
  }
}
</style>

