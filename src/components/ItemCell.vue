<template>
  <td class="item-cell" v-if="name !== 'id'">
    <!-- <input
      type="text"
      name="cell"
      v-focus
      v-if="isEdit"
      v-model="cell"
      @blur="closeInput"
      > -->
    <span >{{ cell }}</span>
  </td>
</template>
<script>
export default {
  name: 'ItemCell',
  props: ['cell', 'name'],
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    openInput () {
      this.isEdit = true
    },
    closeInput () {
      this.isEdit = false
    }
  }
}
</script>
