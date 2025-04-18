
import { useApi } from '@/composables/useApi'


const useCompaniesApi = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl
  
    // get all companies
    const getAllCompanies = async (): Promise<any> => {
      return useApiFetch('/companies', {
        method: 'GET',
        baseURL,
      })
    }
  
    const deleteCompany = async (companyId: number): Promise<any> => {
      return useApiFetch(`/companies/${companyId}`, {
        method: 'DELETE',
        baseURL,
      })
    }
  
    const createCompany = async (companyData: {name: string}): Promise<any> => {
      return useApiFetch('/companies', {
        method: 'POST',
        body: companyData,
        baseURL,
      })
    }
  
    const updateCompanyStatus = async (
      companyId: number,
      status: string
    ): Promise<any> => {
      return $fetch(`/companies/${companyId}`, {
        method: 'PATCH',
        body: { status},
        baseURL,
      })
    }
  
    return {
      getAllCompanies,
      deleteCompany,
      createCompany,
      updateCompanyStatus,
    }
  }
  

export default useCompaniesApi
