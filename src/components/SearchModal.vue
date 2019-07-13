<template lang='pug'>
  form(@submit.prevent='submit')
    .modal-card(style='width: auto')
      header.modal-card-head
        p.modal-card-title Add Search Condition
      section.modal-card-body
        b-field
          b-select(v-model='key' expanded type='email' placeholder='Field' required)
            option(v-for='(v, k) in schema') {{k}}


        b-field
          b-input(v-model='text' v-if='key == null || schema[key] === null' :disabled='key===null' type='text' placeholder='Search' required expanded)
          b-select(v-model='text' v-else-if='typeof schema[key] === "object"' required expanded)
            option(v-for='(field, word) in schema[key]' :value='field') {{word}}

      footer.modal-card-foot
        b-button(native-type='submit' type='is-success' icon-left='plus')
          span Add Search Condition
</template>

<script>
import schema from "../resources/search.schema";
import _ from "lodash";
export default {
  name: "searchModal",
  data() {
    return {
      schema,
      text: "",
      key: null
    };
  },
  methods: {
    submit() {
      if (this.key === null || this.text === null || this.text === "") {
        this.$toast.open({
          type: "is-danger",
          message: `key is ${this.key}; text is ${this.text}`
        });
      } else {
        this.$emit("submit", {
          key: this.key,
          val: this.text,
          valAlt: schema[this.key]
            ? _.findKey(schema[this.key], x => x == this.text)
            : this.text
        });
        this.$toast.open({
          type: "is-info",
          message: "Adding Search Condition"
        });
        this.$emit("close");
      }
    }
  }
};
</script>
