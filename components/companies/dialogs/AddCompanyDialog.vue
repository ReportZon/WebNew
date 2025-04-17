<script setup lang="ts">
interface CompanyInfo {
name: string | undefined
}
interface Props {
  companyInfo?: CompanyInfo
  isDialogVisible: boolean
}
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'submit', value: CompanyInfo): void
}

const props = withDefaults(defineProps<Props>(), {
  companyInfo: () => ({
    name: '',
  }),
})

const emit = defineEmits<Emit>()

const companyInfo = ref<CompanyInfo>(structuredClone(toRaw(props.companyInfo)))

const resetForm = () => {
  emit('update:isDialogVisible', false)
  companyInfo.value = structuredClone(toRaw(props.companyInfo))
}

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', companyInfo.value)
}


</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 500 "
    :model-value="props.isDialogVisible"
    @update:model-value="val => $emit('update:isDialogVisible', val)"
  >
    <VCard
      v-if="props.companyInfo || true"
      class="pa-sm-11 pa-3"
    >
      <VCardText class="pt-5">
        <!-- 👉 dialog close btn -->
        <DialogCloseBtn
          variant="text"
          size="default"
          @click="resetForm"
        />

        <!-- 👉 Title -->
        <div class="text-center mb-6">
          <h4 class="text-h4 mb-2">
            {{ props.companyInfo.name ? 'Edit' : 'Add New' }} Company
          </h4>

          <p class="text-body-1">
            Add a new company
          </p>
        </div>

        <!-- 👉 Form -->
        <VForm @submit.prevent="onFormSubmit">
          <VRow>
            <!-- 👉 First Name -->
            <VCol
              cols="12"
            >
              <VTextField
                v-model="companyInfo.name"
                label="Company name"
                placeholder="Reportzon"
              />
            </VCol>
            <!-- 👉 Submit and Cancel button -->
            <VCol
              cols="12"
              class="text-center"
            >
              <VBtn
                type="submit"
                class="me-3"
              >
                submit
              </VBtn>

              <VBtn
                variant="outlined"
                color="secondary"
                @click="resetForm"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
