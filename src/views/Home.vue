<template>
  <div class="home">
    <div class="top__dashboard m-3 text-right">
      <div class="search__wrap m-3">
        <label class="search__label mr-3" for="search">Search</label>
        <input
        type="text"
        name="search"
        id="search"
        v-model="searchValue"
        @input="search(searchValue)">
        <div class="search__warning">
          <span v-if="isNotLiter"> only letters please !</span>
        </div>
      </div>
      <button class="btn btn-primary mr-3" @click="modalAdd = true">Add new entry</button>
    </div>
    <table class="table table-striped table-bordered" id="my-table" >
        <thead>
            <tr>
              <th v-for="(title, index) in titlesTable" :key="index">{{ title }}</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
        </thead>
        <tbody>
          <RowItem
            v-for="(user,index) in filteredUsers()"
            :user="user"
            :key="getId() + index + componentKey"
            @updatePage="updatePage"
          />
        </tbody>
      </table>
      <div v-if="emptySearch" class="empty__message">по вашему запросу ничего на найдено</div>
      <b-pagination
        v-model="currentPagination"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        @click.prevent.native="changeCurrentPage"
    ></b-pagination>
            <!-- modal add -->
        <b-modal v-model="modalAdd" title="Add new entry" hide-footer>
            <b-form @submit.prevent="addRow">
              <!-- name -->
              <b-form-group
                id="input-group-1"
                label-for="input-1"
                description="name">
                <b-form-input
                  id="input-1"
                  v-model="newRow.name"
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
                  v-model="newRow.height"
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
                  v-model="newRow.mass"
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
                  v-model="newRow.hair_color"
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
                  v-model="newRow.skin_color"
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
                  v-model="newRow.eye_color"
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
                  v-model="newRow.birth_year"
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
                  v-model="newRow.gender"
                  type="text"
                  placeholder="Enter  gender"
                ></b-form-input>
              </b-form-group>
              <div class="btn__wrap d-flex justify-content-around">
                <b-button size="sm" variant="danger" @click="cancelAddRow" >
                  Cancel
                </b-button>
                <b-button type="submit" size="sm" variant="success">
                  Submit
                </b-button>
              </div>
            </b-form>
        </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import RowItem from '@/components/RowItem.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    RowItem
  },
  data () {
    return {
      perPage: 5,
      currentPagination: 1,
      componentKey: 0,
      modalAdd: false,
      searchValue: '',
      copyUsersList: [],
      emptySearch: false,
      isNotLiter: false,
      newRow: {
        id: null,
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: ''
      }
    }
  },
  computed: {
    ...mapState(['titlesTable', 'currentPage']),
    ...mapGetters(['userList']),
    rows () {
      return this.copyUsersList.length
    }
  },
  methods: {
    ...mapActions(['setCurrentPage', 'addNewRow']),
    changeCurrentPage () {
      this.setCurrentPage(this.currentPagination)
    },
    updatePage () {
      this.componentKey++
      this.copyUsersList = this.userList
      if (this.searchValue) {
        this.search(this.searchValue)
      }
    },
    filteredUsers () {
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      const currentList = this.copyUsersList.slice(startIndex, endIndex)
      if (currentList.length === 0 && this.currentPagination > 1) {
        this.setCurrentPage(this.currentPagination - 1)
        this.currentPagination = this.currentPage
      }
      return currentList
    },
    addRow () {
      this.newRow.id = this.getId()
      this.addNewRow({
        newRow: this.newRow
      })
      this.updatePage()
      this.modalAdd = false
      this.clearAddForm()
    },
    clearAddForm () {
      this.newRow = {
        id: null,
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: ''
      }
    },
    cancelAddRow () {
      this.clearAddForm()
      this.modalAdd = false
    },
    // filtered by search
    filterUsersBySearchValue (value) {
      this.copyUsersList = this.userList
      this.emptySearch = false
      if (value) {
        this.copyUsersList = this.copyUsersList.filter(function (item) {
          return item.name.toLowerCase().includes(value.toLowerCase())
        })
        this.setCurrentPage(1)
        if (this.copyUsersList.length === 0) { this.emptySearch = true }
      } else {
        this.copyUsersList = this.userList
      }
    },
    search (value) {
      const val = this.valid(value)
      setTimeout(() => {
        this.filterUsersBySearchValue(val)
      }, 300)
    },
    valid (value) {
      this.isNotLiter = (/[^A-Za-z]/gi).test(value)
      setTimeout(() => {
        this.isNotLiter = false
      }, 1800)
      const val = this.searchValue = value.replace(/[^A-Za-z]/gi, '')
      return val
    },
    getId () {
      const id = `f${(+new Date()).toString(16)}`
      return id
    }
  },
  mounted () {
    this.setCurrentPage(1)
    this.currentPagination = this.currentPage
    this.copyUsersList = JSON.parse(JSON.stringify(this.userList))
  }
}
</script>
<style lang="scss" scoped>
  .empty__message {
    text-align: center;
    margin: 30px;
    text-transform: uppercase;
    color: red;
    font-size: 24px;
  }
  .search__warning {
    color: red;
    min-height: 24px;
    position: relative;
    span {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
    }
  }
</style>
