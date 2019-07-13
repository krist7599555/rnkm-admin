<template lang='pug'>
  #searchPane.is-flex
    div(style='margin-right: 0.7rem;')
      b-field
        b-button(type='is-info' @click='openSearch')
          b-icon(icon='search')
    div
      b-field(v-for='{key, val, valAlt} in searchConditions' :key='key')
        .control
          .button.is-static
            span {{key}}
            b-icon(icon='angle-right')
            span {{valAlt || val}}
        .control
          .button.is-danger(@click='remove(key)')
              b-icon(icon='times')

</template>

<script>
import SearchModal from "./SearchModal.vue";
import _ from "lodash";
export default {
  name: "searchPane",
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      searchConditions: []
    };
  },
  methods: {
    openSearch() {
      this.$modal.open({
        component: SearchModal,
        hasModalCard: true,
        events: {
          submit: obj => {
            this.remove(obj.key);
            this.searchConditions.push(obj);
            this.$emit("input", this.valueAsObj);
          }
        }
      });
    },
    remove(key) {
      console.log("remove");
      this.searchConditions = _.filter(
        this.searchConditions,
        o => o.key !== key
      );
      this.$emit("input", this.valueAsObj);
    }
  },
  computed: {
    valueAsObj() {
      return this.searchConditions.reduce((obj, { key, val }) => {
        obj[key] = val;
        return obj;
      }, {});
    }
  }
};
</script>
