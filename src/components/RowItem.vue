<template>
  <tr class="row-item">
    <ItemCell v-for="(cell, name) in user" :key="cell.id" :cell="cell" :name="name"/>
    <td>
      <button class="btn btn-warning" @click="editRow(user)">Update</button>
    </td>
    <td>
      <button class="btn btn-danger" @click="showModalDelete">Delete</button>
    </td>
    <!-- modal edit -->
    <b-modal v-model="modalShow" title="Edit Item" hide-footer>
        <b-form @submit.prevent="saveRow">
          <!-- name -->
          <b-form-group
            id="input-group-1"
            label-for="input-1"
            description="name">
            <b-form-input
              id="input-1"
              v-model="editedItem.name"
              type="text"
              placeholder="Enter  name"
            ></b-form-input>
          </b-form-group>
          <!-- height -->
          <b-form-group
            id="input-group-2"
            label-for="input-2"
            description="height">
            <b-form-input
              id="input-2"
              v-model="editedItem.height"
              type="text"
              placeholder="Enter  height"
            ></b-form-input>
          </b-form-group>
          <!-- mass -->
          <b-form-group
            id="input-group-3"
            label-for="input-3"
            description="mass">
            <b-form-input
              id="input-3"
              v-model="editedItem.mass"
              type="text"
              placeholder="Enter  mass"
            ></b-form-input>
          </b-form-group>
          <!-- hair_color -->
          <b-form-group
            id="input-group-4"
            label-for="input-4"
            description="hair color">
            <b-form-input
              id="input-4"
              v-model="editedItem.hair_color"
              type="text"
              placeholder="Enter  hair color"
            ></b-form-input>
          </b-form-group>
          <!-- skin_color -->
          <b-form-group
            id="input-group-5"
            label-for="input-5"
            description="skin color">
            <b-form-input
              id="input-5"
              v-model="editedItem.skin_color"
              type="text"
              placeholder="Enter skin color"
            ></b-form-input>
          </b-form-group>
          <!-- eye_color -->
          <b-form-group
            id="input-group-6"
            label-for="input-6"
            description="eye color">
            <b-form-input
              id="input-6"
              v-model="editedItem.eye_color"
              type="text"
              placeholder="Enter eye color"
            ></b-form-input>
          </b-form-group>
          <!-- birth_year -->
          <b-form-group
            id="input-group-7"
            label-for="input-7"
            description="birth year" >
            <b-form-input
              id="input-7"
              v-model="editedItem.birth_year"
              type="text"
              placeholder="Enter birth year"
            ></b-form-input>
          </b-form-group>
          <!-- gender -->
          <b-form-group
            id="input-group-8"
            label-for="input-8"
            description="gender">
            <b-form-input
              id="input-8"
              v-model="editedItem.gender"
              type="text"
              placeholder="Enter  gender"
            ></b-form-input>
          </b-form-group>
          <div class="btn__wrap d-flex justify-content-around">
            <b-button size="sm" variant="danger" @click="close" >
              Cancel
            </b-button>
            <b-button type="submit" size="sm" variant="success">
              Submit
            </b-button>
          </div>
        </b-form>
    </b-modal>
    <!-- modal delete row confirm -->
    <b-modal v-model="modalDeleteShow" title="Are you sure you want to delete this entry?" hide-footer>
      <h2 class="text-center">
        {{user.name}}
      </h2>
      <div class="btn__wrap d-flex justify-content-around">
        <b-button size="sm" variant="danger" @click="modalDeleteShow = false" >
          Cancel
        </b-button>
        <b-button @click="deleteRow" size="sm" variant="success">
          Submit
        </b-button>
      </div>
    </b-modal>
  </tr>
</template>
<script>
import ItemCell from '@/components/ItemCell.vue'

import { mapActions } from 'vuex'

export default {
  name: 'RowItem',
  props: ['user'],
  data () {
    return {
      modalShow: false,
      modalDeleteShow: false,
      editedItem: {},
      editedId: null
    }
  },
  components: {
    ItemCell
  },
  methods: {
    ...mapActions(['updateRow', 'setCurrentPage', 'removeRow']),
    editRow (item) {
      this.modalShow = true
      this.editedItem = Object.assign({}, item)
    },
    showModalDelete () {
      this.modalDeleteShow = true
    },
    deleteRow () {
      this.removeRow(this.editedId)
      this.updatePage()
      setTimeout(() => {
        this.modalDeleteShow = false
      }, 300)
    },
    saveRow () {
      this.updateRow({
        user: this.editedItem,
        id: this.editedId
      })
      this.updatePage()
      this.close()
    },
    close () {
      this.modalShow = false
      setTimeout(() => {
        this.editedItem = Object.assign({})
      }, 300)
    },
    updatePage () {
      this.$emit('updatePage')
    }
  },
  created () {
    this.editedId = this.user.id
  }
}
</script>
