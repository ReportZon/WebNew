<script setup lang="ts">

import { ref } from 'vue';
import useCompaniesApi from '@/composables/companies/useCompaniesApi';
import CompaniesTable from '@/views/companies/CompaniesTable.vue';
const isDialogVisible = ref(false);
definePageMeta({
  layout: 'default',
  public: true,
})

const {createCompany} = useCompaniesApi()

const createCompanyHandler = async (companyData: any) => {
    console.log('Company Data:', companyData);
  try {
    const response = await createCompany(companyData);
    console.log('Company created successfully:', response);
  } catch (error) {
    console.error('Error creating company:', error);
  }
};


</script>
<template>
    <VRow>
        <AddCompanyDialog v-model:is-dialog-visible="isDialogVisible" @submit="createCompanyHandler" />
        <VCol class="d-flex justify-space-around align-center mb-2" >
            <VCardText class="text-h4">COMPANIES</VCardText>
            <VBtn @click="isDialogVisible = true" variant="elevated" class=""> 
                <VIcon size="24" icon="ri-add-line"  />
                Add Company
            </VBtn>
        </VCol>
            <CompaniesTable/>
    </VRow>
</template>
