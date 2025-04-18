<script setup lang="ts">
import type { Company } from './companiesData'
import data from './companiesData'

const editDialog = ref(false)
const deleteDialog = ref(false)
const confirmStatusDialog = ref(false)

const defaultItem = ref<Company>({
  id: -1,
  name: '',
  isActive: false,
  joinedDate: '',
  totalEmployee: 0,
})

const editedItem = ref<Company>({ ...defaultItem.value })
const editedIndex = ref(-1)
const companyList = ref<Company[]>([])

const headers = [
  { title: 'NAME', key: 'name' },
  { title: 'JOINED DATE', key: 'joinedDate' },
  { title: 'TOTAL EMPLOYEES', key: 'totalEmployee' },
  { title: 'STATUS', key: 'isActive' },
  { title: 'ACTIONS', key: 'actions' },
]

const resolveStatusText = (status: boolean) => status ? 'Active' : 'Inactive'
const resolveStatusColor = (status: boolean) => status ? 'primary' : 'error'

const selectedStatusItem = ref<Company | null>(null)
const pendingStatus = ref<boolean | null>(null)

const toggleStatus = (item: Company) => {
  selectedStatusItem.value = item
  pendingStatus.value = !item.isActive
  confirmStatusDialog.value = true
}

const confirmStatusChange = () => {
  if (selectedStatusItem.value && pendingStatus.value !== null) {
    const index = companyList.value.findIndex(c => c.id === selectedStatusItem.value!.id)
    if (index !== -1) {
      companyList.value[index].isActive = pendingStatus.value
    }
  }
  closeConfirmStatus()
}

const cancelStatusChange = () => {
  if (selectedStatusItem.value) {
    // Restore previous value
    const index = companyList.value.findIndex(c => c.id === selectedStatusItem.value!.id)
    if (index !== -1) {
      companyList.value[index].isActive = !pendingStatus.value
    }
  }
  closeConfirmStatus()
}

const closeConfirmStatus = () => {
  selectedStatusItem.value = null
  pendingStatus.value = null
  confirmStatusDialog.value = false
}

const editItem = (item: Company) => {
  editedIndex.value = companyList.value.indexOf(item)
  editedItem.value = { ...item }
  editDialog.value = true
}

const deleteItem = (item: Company) => {
  editedIndex.value = companyList.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const close = () => {
  editDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const closeDelete = () => {
  deleteDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const save = () => {
  if (editedIndex.value > -1)
    Object.assign(companyList.value[editedIndex.value], editedItem.value)
  else
    companyList.value.push(editedItem.value)

  close()
}

const deleteItemConfirm = () => {
  companyList.value.splice(editedIndex.value, 1)
  closeDelete()
}

onMounted(() => {
  companyList.value = JSON.parse(JSON.stringify(data))
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
    <template #item.isActive="{ item }">
      <div class="d-flex align-center gap-2">
        <VSwitch
          :model-value="item.isActive"
          hide-details
          color="primary"
          inset
          @update:model-value="toggleStatus(item)"
        />
        <VChip
          :color="resolveStatusColor(item.isActive)"
          size="small"
        >
          {{ resolveStatusText(item.isActive) }}
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
          <VBtn color="error" variant="outlined" @click="close">Cancel</VBtn>
          <VBtn color="primary" variant="elevated" @click="save">Save</VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Delete Dialog -->
  <VDialog v-model="deleteDialog" max-width="500px">
    <VCard :title="`Are you sure you want to delete ${editedItem.name}?`">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn color="error" variant="outlined" @click="closeDelete">No</VBtn>
          <VBtn color="primary" variant="elevated" @click="deleteItemConfirm">Yes</VBtn>
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
      as <strong>{{ resolveStatusText(pendingStatus!) }}</strong>?
    </VCardText>
    <VCardActions class="justify-end d-flex gap-2">
      <VBtn variant="outlined" color="error" @click="cancelStatusChange">Cancel</VBtn>
      <VBtn variant="elevated" color="primary" @click="confirmStatusChange">Confirm</VBtn>
    </VCardActions>
  </VCard>
</VDialog>
</template>
