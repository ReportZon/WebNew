<script setup lang="ts">

import { CompanyStatus, type Company } from '@/types/company'

import useCompaniesApi from '@/composables/companies/useCompaniesApi'

const editDialog = ref(false)
const deleteDialog = ref(false)
const confirmStatusDialog = ref(false)

const {updateCompanyStatus, getAllCompanies} = useCompaniesApi()

const defaultItem = ref<Company>({
  id: -1,
  name: '',
  status: CompanyStatus.ACTIVE,
  createdAt: '',
  totalEmployee: 0,
})

const editedItem = ref<Company>({ ...defaultItem.value })
const companyList = ref<Company[]>([])

const headers = [
  { title: 'NAME', key: 'name' },
  { title: 'JOINED DATE', key: 'createdAt' },
  { title: 'TOTAL EMPLOYEES', key: 'totalEmployee' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions' },
]

const resolveStatusColor = (status: string) => status==CompanyStatus.ACTIVE ? 'primary' : 'error'

const selectedStatusItem = ref<Company | null>(null)


// status update functions

const toggleStatus = (item: Company) => {
  selectedStatusItem.value = item
  confirmStatusDialog.value = true
}

const confirmStatusChange = () => {
    // Call API to update status
    if (selectedStatusItem.value) {
        const newStatus = selectedStatusItem.value.status== CompanyStatus.SUSPENDED ? CompanyStatus.ACTIVE : CompanyStatus.SUSPENDED
        const companyId = selectedStatusItem.value.id
        try {
        const response  = updateCompanyStatus(companyId, newStatus)
        console.log('Company status updated successfully:', response)
        }
        catch (error) {
            console.error('Error updating company status:', error)
        }
    }
    confirmStatusDialog.value = false

}

const cancelStatusChange = () => {
 selectedStatusItem.value = null
 confirmStatusDialog.value = false
}



// edit functions
const editItem = (item: Company) => {
  editedItem.value = { ...item }
  editDialog.value = true
}

const deleteItem = (item: Company) => {
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const closeEdit = () => {
  editDialog.value = false
  editedItem.value = { ...defaultItem.value }
}

const cancelDelete = () => {
  deleteDialog.value = false
  editedItem.value = { ...defaultItem.value }
}

const confirmEdit = () => {
    // make the API call to update the company

  closeEdit()
}

const deleteConfirm = () => {
  // make the API call to delete the company
  cancelDelete()
}


onMounted(async () => {

  // fetch the company list from the API

  const response = await getAllCompanies()

  companyList.value = response.companies.map((company: Company) => ({
    ...company,
    createdAt: formatDate(company.createdAt),
  }))
})


</script>

<template>
  <VDataTable
    :headers="headers"
    :items="companyList"
    :items-per-page="5"
    class="text-no-wrap"
  >
    <!-- Status column with switch + chip -->
    <template #item.status="{ item }">
      <div class="d-flex align-center gap-2">
        <VSwitch
          :model-value="item.status"
          hide-details
          color="primary"
          inset
          @update:model-value="toggleStatus(item)"
        />
        <VChip
          :color="resolveStatusColor(item.status)"
          size="small"
        >
          {{ item.status }}
        </VChip>
      </div>
    </template>

    <!-- Actions -->
    <template #item.actions="{ item }">
      <div class="d-flex gap-1">
        <IconBtn size="small" @click="editItem(item)">
          <VIcon color="primary" icon="ri-pencil-line" />
        </IconBtn>
        <IconBtn size="small" @click="deleteItem(item)">
          <VIcon color="error" icon="ri-delete-bin-line" />
        </IconBtn>
      </div>
    </template>
  </VDataTable>

  <!-- Edit Dialog -->
  <VDialog v-model="editDialog" max-width="500px">
    <VCard title="Edit Company">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
          variant="text"
          size="default"
          @click="editDialog = false"
        />
      <VCardText>
        <VTextField v-model="editedItem.name" label="Company Name" />
      </VCardText>
      <VCardText>
        <div class="d-flex justify-end gap-4">
          <VBtn color="error" variant="outlined" @click="closeEdit">Cancel</VBtn>
          <VBtn color="primary" variant="elevated" @click="confirmEdit">Save</VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Delete Dialog -->
  <VDialog v-model="deleteDialog" max-width="500px">
    <VCard :title="`Are you sure you want to delete ${editedItem.name}?`">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn color="error" variant="outlined" @click="cancelDelete">No</VBtn>
          <VBtn color="primary" variant="elevated" @click="deleteConfirm">Yes</VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

<!-- Confirm Status Dialog -->
<VDialog v-model="confirmStatusDialog" max-width="400px">
  <VCard class="pa-4">
    <VCardTitle class="text-h6">
      Confirm Status Change
    </VCardTitle>
    <VCardText>
      Are you sure you want to mark
      <strong>{{ selectedStatusItem?.name }}</strong>
      as <strong>{{ 
      selectedStatusItem?.status==CompanyStatus.ACTIVE ? CompanyStatus.SUSPENDED : CompanyStatus.ACTIVE

      }}</strong>?
    </VCardText>
    <VCardActions class="justify-end d-flex gap-2">
      <VBtn variant="outlined" color="error" @click="cancelStatusChange">Cancel</VBtn>
      <VBtn variant="elevated" color="primary" @click="confirmStatusChange">Confirm</VBtn>
    </VCardActions>
  </VCard>
</VDialog>
</template>
