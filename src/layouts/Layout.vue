<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated color="primary">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          Notes
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer 
        show-if-above 
        v-model="left" 
        side="left" 
    >
      <q-list v-for="(menuItem, index) in menuList" :key="index">

        <q-item clickable exact v-ripple :to="menuItem.path">
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>

        <q-separator v-if="menuItem.separator" />

      </q-list>

        <!-- <q-expansion-item
            expand-separator
            label="Tags"
            style="background: white"
        >
            <q-list class="tw-ml-4">
                <q-item>Tag1</q-item>
                <q-item>Tag2</q-item>
                <q-item>Tag3</q-item>
            </q-list>
        </q-expansion-item> -->

    </q-drawer>



    <q-page-container class="tw-bg-gray-800">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

const menuList = [
  {
    icon: 'inbox',
    label: 'Notes',
    separator: false,
    path: '/',
  },
  {
    icon: 'inbox',
    label: 'Tags',
    separator: true,
    path: '/tags',
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
    path: '',
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    path: '',
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    path: '',
  }
]

export default {
  data () {
    return {
      left: false,
      menuList
    }
  }
}
</script>
