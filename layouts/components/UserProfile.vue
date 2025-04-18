<script setup lang="ts">
import useAuthSession from '@/composables/useAuthSession'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'


const ability = useAbility()

// TODO: Get type from backend

const {removeSession, getUserData} = useAuthSession()

const userData  = getUserData()

async function logout() {
  try {
    removeSession()

    // Reset user abilities
    ability.update([])

    navigateTo({ name: 'login' })
  }
  catch (error) {
    throw createError(error as Error)
  }
}

const userProfileList = [
  { type: 'divider' },

  {
    type: 'navItem',
    icon: 'ri-home-4-line',
    title: 'Companies',
    to: { name: 'companies' },
  },

  { type: 'divider' },

  {
    type: 'navItem',
    icon: 'ri-home-4-line',
    title: 'Companies',
    to: { name: 'companies' },
  },
  { type: 'divider' },

{
  type: 'navItem',
  icon: 'ri-home-4-line',
  title: 'Companies',
  to: { name: 'companies' },
},
{ type: 'divider' },

{
  type: 'navItem',
  icon: 'ri-home-4-line',
  title: 'Companies',
  to: { name: 'companies' },
},

]
</script>

<template>
  <VBadge
    v-if="userData"
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      size="38"
      :color="!(userData && userData.avatar) ? 'primary' : undefined"
      :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
    >
      <VImg
        v-if="userData && userData.avatar"
        :src="userData.avatar"
      />
      <VIcon
        v-else
        icon="ri-user-line"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="15px"
      >
        <VList>
          <VListItem>
            <div class="d-flex gap-2 align-center">
              <VListItemAction>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    :color="!(userData && userData.avatar) ? 'primary' : undefined"
                    :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
                  >
                    <VImg
                      v-if="userData && userData.avatar"
                      :src="userData.avatar"
                    />
                    <VIcon
                      v-else
                      icon="ri-user-line"
                    />
                  </VAvatar>
                </VBadge>
              </VListItemAction>

              <div>
                <h6 class="text-h6 font-weight-medium">
                  {{ userData.fullName }}
                </h6>
                <VListItemSubtitle class="text-capitalize text-disabled">
                  {{ userData.role }}
                </VListItemSubtitle>
              </div>
            </div>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :to="item.to"
              >
                <template #prepend>
                  <VIcon
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template
                  v-if="item.badgeProps"
                  #append
                >
                  <VBadge
                    inline
                    v-bind="item.badgeProps"
                  />
                </template>
              </VListItem>

              <VDivider
                v-else
                class="my-1"
              />
            </template>

            <VListItem>
              <VBtn
                block
                color="error"
                size="small"
                append-icon="ri-logout-box-r-line"
                @click="logout"
              >
                Logout
              </VBtn>
            </VListItem>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
