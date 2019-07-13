<template lang='pug'>
  section.section.has-text-left(align='center' style='width: 100%'): div(style='max-width: 600px; margin: 0 auto')
    LogoHeader
    br
    br
    SearchPane(v-model='searchObj')
    br
    //- div {{searchObj}}
    //- div {{freshy}}
    //- component(v-bind:is='"FieldGender"' :value='0')
    //- component(v-bind:is='"FieldGender"' :value='1')
    div total {{total}}, perPage {{perPage}}
    div(style='max-width: 600px'): b-table(
      :data='freshy'
      :total='total'
      :per-page='perPage'
      backend-pagination
      @page-change="onPageChange"
      paginated
      :loading='loading'
      pagination-position='both'
    )
      template(slot-scope="props")
        b-table-column(
          v-for="(column, index) in columns"
          :key="index"
          v-bind="column"
        )
          component(
            v-if='column.component'
            :is='column.component'
            :value='props.row[column.field]'
          )
          span(v-else) {{ props.row[column.field] }}
</template>

<script>
import SearchPane from "../components/SearchPane.vue";

import FieldGender from "../components/FieldGender";
import FieldImage from "../components/FieldImage";
import LogoHeader from "../components/LogoHeader.vue";
import { search } from "../resources/freshy.api";

export default {
  name: "home",
  components: {
    SearchPane,
    FieldGender,
    FieldImage,
    LogoHeader
  },
  mounted() {
    this.loadAsyncData();
  },
  methods: {
    async loadAsyncData() {
      this.loading = true;
      // eslint-disable-next-line no-unused-vars
      const res = await search({
        field: this.searchObj,
        page: this.page,
        perPage: this.perPage
      })
        .then(res => {
          this.total = res.total;
          this.freshy = res.data;
          this.page = res.page;
          this.perPage = res.perPage;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async onPageChange(page) {
      this.page = page;
      this.$scrollTo("#searchPane");
      await this.loadAsyncData();
    }
  },
  watch: {
    searchObj() {
      this.loadAsyncData();
    }
  },
  data() {
    return {
      loading: false,
      page: null,
      perPage: null,
      freshy: [],
      searchObj: {},
      total: null,
      // "studentId"
      // "nickname"
      // "gender":
      // "phone":"061-159-3430",
      // "imageUrl":"https://firebasestorage.googleapis.com/v0/b/rnkm-register-62-244919/o/img-uploaded%2F6240090328f7ff9c12ee3dc705e4a014e4b84040c789fe27f013157adb01dfb0d88345174f.jpeg?alt=media&token=4efd331b-94b7-4b88-9d39-0a8cc40a7b17",
      // "dormit":false,
      // "faculty":"Communication Arts",
      // "groupId":"uZ9BgJ8x3",
      // "name":"ปณิธาน ฤทธิ์เพชรรัตน์"},
      columns: [
        { label: "รหัสนิสิต", field: "studentId", visible: false },
        {
          label: "ภาพ",
          field: "imageUrl",
          visible: true,
          component: "FieldImage",
          centered: true
        },
        { label: "ชื่อเล่น", field: "nickname", sortable: true },
        {
          label: "เพศ",
          field: "gender",
          component: "FieldGender",
          sortable: true
        },
        { label: "ชื่อเต็ม", field: "name", visible: true, sortable: true },
        { label: "คณะ", field: "faculty", visible: false, sortable: true }
      ]
    };
  }
};
</script>
