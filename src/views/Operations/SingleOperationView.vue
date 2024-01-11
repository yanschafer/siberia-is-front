<template>
  <MDBContainer class="single-user-info d-flex flex-column gap-3">
    <MDBRow class="d-flex">
      <MDBRow class="w-auto">
        <h1 class="username-heading">{{operation}} <template v-if="from !== ''">from "{{from}}"</template> <template v-if="to !== ''"> to "{{to}}"</template></h1>
      </MDBRow>
    </MDBRow>
    <MDBRow class="d-flex flex-nowrap w-100">
      <span class="user-roles-heading">STATUS</span>
      <span class="username">{{ status }}</span>
      <template v-if="selectedOperation.availableStatuses">
        <MDBContainer>
          <template v-for="item in selectedOperation.availableStatuses">
            <template v-if="isInProgressStatus(item.id)">
            </template>
            <template v-else>
                <MDBRow><p class="cursor-pointer" @click="changeToStatus(item.id)">{{item.name}}</p></MDBRow>
            </template>
          </template>
        </MDBContainer>
      </template>
    </MDBRow>
  </MDBContainer>
  <MDBContainer class="mt-4">
    <MDBRow class="w-auto">
      <h1 class="username-heading mb-2">Products in {{operation}}</h1>
    </MDBRow>
    <SearchComponent />
    <TableComponent :rows="products" :columns="productColumns" :search-term="searchTerm" />
  </MDBContainer>
</template>
<script lang="ts">
import {MDBContainer, MDBRow} from "mdb-vue-ui-kit";
import TableComponent from "@/components/Elements/TableComponent.vue";
import SearchComponent from "@/components/Elements/SearchComponent.vue";
import {useOperationStore} from "@/stores/operation.store";
import {useRoute} from "vue-router";
import {TransactionStatus, TransactionType} from "@/api/conf/app.conf";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  name: 'SingleOperationView',
  components: {SearchComponent, TableComponent, MDBRow, MDBContainer},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    typeMapper: {
      [TransactionType.INCOME]: "Arrival",
      [TransactionType.OUTCOME]: "Sale",
      [TransactionType.TRANSFER]: "Request"
    },
    productColumns: [
      { field: 'name', header: 'NAME' },
      { field: 'vendorCode', header: 'SKU' },
      { field: 'amount', header: 'QUANTITY' },
    ],
    searchTerm: ""
  }),
  created() {
    if (this.selectedOperation.type.id != TransactionType.TRANSFER)
      this.productColumns.push({ field: 'price', header: 'PRICE' })
    
  },
  async setup() {
    const operationStore = useOperationStore()
    // const
    const route = useRoute()
    
    await operationStore.loadSelectedOperation(parseInt(route.params.id.toString()))
    
    return {
      operationStore
    }
  },
  methods: {
    isInProgressStatus(statusId: number) {
      return statusId == TransactionStatus.IN_PROGRESS
    },
    changeToStatus(statusId: number) {
      LoggerUtil.debug(statusId)
      this.operationStore.changeStatus(this.id, statusId)
    }
  },
  computed: {
    selectedOperation() {
      return this.operationStore.getSelectedOperation
    },
    operation() {
      return this.typeMapper[this.selectedOperation.type.id] || '';
    },
    from() {
      return this.selectedOperation.from?.name || '';
    },
    to() {
      return this.selectedOperation.to?.name || '';
    },
    status() {
      return this.selectedOperation.status.name || '';
    },
    products() {
      return this.selectedOperation.products.map(el => ({
        id: el.product.id,
        name: el.product.name,
        amount: el.amount,
        vendorCode: el.product.vendorCode,
        price: el.price
      }))
    }
  }
}
</script>
<style scoped>
.username-heading {
  font-weight: 600;
  margin-bottom: 0;
  color: #121212;
  font-size: 32px;
  width: fit-content;
  text-align: left;
}
.user-roles-heading {
  width: fit-content;
}
.utility-btn {
  height: auto;
  width: 100%;
  min-width: 4rem;
  max-width: fit-content;
  font-weight: 800;
  max-height: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 7px;
}
.username {
  color: #121212;
  font-weight: 600;
}
.single-user-info {
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 2rem;
}

.tab-item {
  font-weight: 800!important;
}
:deep(.nav-link) {
  font-weight: 600!important;
}
</style>