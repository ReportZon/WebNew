<script setup lang="ts">
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'

import authV2RegisterIllustrationDark from '@images/pages/auth-v2-register-illustration-dark.png'
import authV2RegisterIllustrationLight from '@images/pages/auth-v2-register-illustration-light.png'
import { themeConfig } from '@themeConfig'
import { VForm } from 'vuetify/components/VForm'

import useAuthApi from '@/composables/useAuthApi'
import { confirmedValidator, emailValidator, requiredValidator } from '@core/utils/validators'

import tree2 from '@images/misc/tree2.png'
import authV2RegisterIllustrationBorderedDark from '@images/pages/auth-v2-register-illustration-bordered-dark.png'
import authV2RegisterIllustrationBorderedLight from '@images/pages/auth-v2-register-illustration-bordered-light.png'
import authV2MaskDark from '@images/pages/mask-v2-dark.png'
import authV2MaskLight from '@images/pages/mask-v2-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const authThemeImg = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark,
  authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true)

definePageMeta({
  layout: 'blank',
  unauthenticatedOnly: true,

})

const credentials = ref({
  fName: 'lemi',
  lName: 'dinku',
  companyName: 'reportzon',
  email: 'lemid@gmail.com',
  password: 'password',
  confirmPassword: 'password',
  privacyPolicies: false,
})

const errors = ref<Record<string, string | undefined>>({
  fName: undefined,
  lName: undefined,
  companyName: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
})

const isPasswordVisible = ref(false)
const refVForm = ref<VForm>()

const {register: useRegister, checkEmail: useCheckEmail} = useAuthApi()

const register = async () => {

  try {
  const message = await useRegister(credentials.value);
  console.log('message', message)
  } catch (error) {
    // handle error
    console.error('Registration error:', error)
    return;
  }

  // redirect to login page or show success message
  navigateTo( '/login')
}

const checkIfEmailExists = async () => {

  try {
    const exists = await useCheckEmail(credentials.value.email)
    if (exists) {
      // handle email already exists
      errors.value.email = 'Email already exists'
      return false
    }
    return true
 } catch (error) {
    // handle error
    console.error('Email check error:', error)
    return true
  }
}


const onSubmit = () => {
  refVForm.value?.validate()
    .then(({ valid: isValid }) => {
      if (isValid && !checkIfEmailExists())
        register()
     
    })
}
</script>

<template>
  <NuxtLink to="/">
    <div class="auth-logo d-flex align-center gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />
      <h1 class="auth-title">
        {{ themeConfig.app.title }}
      </h1>
    </div>
  </NuxtLink>

  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="8"
      class="d-none d-md-flex position-relative"
    >
      <div class="d-flex align-center justify-end w-100 h-100 pa-10 pe-0">
        <VImg
          max-width="797"
          :src="authThemeImg"
          class="auth-illustration"
        />
      </div>

      <img
        class="auth-footer-mask"
        height="360"
        :src="authThemeMask"
      >

      <div class="d-flex gap-x-2 auth-footer-tree">
        <img
          :src="tree2"
          alt="tree image"
          height="180"
        >
        <img
          :src="tree2"
          alt="tree image"
          height="120"
          class="align-self-end"
        >
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h4 class="text-h4 mb-1">
            Adventure starts here 🚀
          </h4>
          <p class="mb-0">
            Make your app management easy and fun!
          </p>
        </VCardText>

        <VCardText>
          <VForm 
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- fName -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.fName"
                  label="First Name"
                  placeholder="John"
                  :rules="[requiredValidator]"
                  :error-messages="errors.fName"
                />
              </VCol>

              <!-- lName -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.lName"
                  label="Last Name"
                  placeholder="Smith"
                  :rules="[requiredValidator]"
                  :error-messages="errors.lName"
                />
              </VCol>

              <!-- companyName -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.companyName"
                  label="Company Name"
                  placeholder="Company Name"
                  :rules="[requiredValidator]"
                  :error-messages="errors.companyName"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  :rules="[requiredValidator]"
                  :error-messages="errors.password"
                />
              </VCol>
                <!-- confirm password -->
                <VCol cols="12">

                <VTextField
                  v-model="credentials.confirmPassword"
                  label="Confirm password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  :rules="[requiredValidator, confirmedValidator(credentials.password, credentials.confirmPassword)]"
                  :error-messages="errors.confirmPassword"
                />

                <div class="d-flex align-center my-5">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="credentials.privacyPolicies"
                    inline
                  />
                  <VLabel
                    for="privacy-policy"
                    style="opacity: 1;"
                  >
                    <span class="me-1 text-high-emphasis">I agree to</span>
                    <a
                      href="javascript:void(0)"
                      class="text-primary"
                    >privacy policy & terms</a>
                  </VLabel>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Sign up
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12">
                <div class="text-center text-base">
                  <span class="d-inline-block">Already have an account?</span> <NuxtLink
                    class="text-primary d-inline-block"
                    :to="{ name: 'login' }"
                  >
                    Sign in instead
                  </NuxtLink>
                </div>
              </VCol>

              <VCol cols="12">
                <div class="d-flex align-center">
                  <VDivider />
                  <span class="mx-4 text-high-emphasis">or</span>
                  <VDivider />
                </div>
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
