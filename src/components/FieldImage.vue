<template lang="pug">
  .k-field-gender(style='height: 110px')
    img(:src='value' @click='open=true' style='height: 100%; width: auto;')
    b-modal(:active.sync='open' :width='420')
      //- p.image(style='display: flex; justify-content: center;')
      img(:src='value' style='max-height: 90vh; width: auto')
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      open: false
    };
  }
};
</script>
