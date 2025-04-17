<script setup lang="ts">

import { ref } from 'vue';
const isDialogVisible = ref(false);

    definePageMeta({
  layout: 'default',
  public: true,
})

</script>
<template>
    <VRow>
        <AddCompanyDialog v-model:is-dialog-visible="isDialogVisible" />
        <VCol class="d-flex justify-space-around align-center mb-2" >
            <VCardText class="text-h4">COMPANIES</VCardText>
            <VBtn @click="isDialogVisible = true" variant="elevated" class=""> 
                <VIcon size="24" icon="ri-add-line"  />
                Add Company
            </VBtn>
        </VCol>
            <CompaniesTable />
    </VRow>
</template>
