<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-white text-black">
        <q-toolbar >
            <q-btn dense flat round icon="menu" @click="left = !left" />
            <q-toolbar-title >
                Notes
            </q-toolbar-title>
        </q-toolbar>
    </q-header>

    <q-drawer 
        show-if-above 
        v-model="left" 
        side="left" 
        content-class="bg-grey-2"
    >


        <q-item class="tw-block lg:tw-hidden" clickable exact v-ripple to="/">
            <q-btn dense flat round icon="menu" @click="left = !left" />
        </q-item>

        <q-item clickable exact v-ripple @click="onClickAllNotes" to="/">
            <q-item-section avatar>
                <q-icon name="note" />
            </q-item-section>
            <q-item-section>
                All Notes
            </q-item-section>
        </q-item>

        <q-list v-for="(menuItem, index) in menuList" :key="index">
            <div v-if="menuItem.label === 'Tags'" >
                <TagMenu />
            </div>

            <div v-else>
                <q-item clickable exact v-ripple :to="menuItem.path">
                    <q-item-section avatar>
                        <q-icon :name="menuItem.icon" />
                    </q-item-section>
                    <q-item-section>
                        {{ menuItem.label }}
                    </q-item-section>
                </q-item>

                <q-separator v-if="menuItem.separator" />
            </div>
        </q-list>


        <q-item clickable exact v-ripple to="/archive">
            <q-item-section avatar>
                <q-icon name="archive" />
            </q-item-section>
            <q-item-section>
                Archive
            </q-item-section>
        </q-item>

        <q-item clickable exact v-ripple to="/trash">
            <q-item-section avatar>
                <q-icon name="delete" />
            </q-item-section>
            <q-item-section>
                Trash
            </q-item-section>
        </q-item>

    </q-drawer>

    <q-page-container>
        <div class="tw-m-5">
            <router-view />
        </div>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import TagMenu from 'components/Tag/TagMenu'

export default {
    components: {
        TagMenu
    },
    data () {
        return {
            left: false,
            menuList: [
                {
                    label: 'Tags',
                },
                {
                    icon: 'create',
                    label: 'Edit Tags',
                    separator: true,
                    path: '/tags',
                    clickHandler: null
                },
                {
                    icon: 'settings',
                    label: 'Settings',
                    separator: false,
                    path: '/settings',
                    clickHandler: null
                },
                {
                    icon: 'help',
                    iconColor: 'primary',
                    label: 'Help',
                    separator: false,
                    path: '',
                    clickHandler: null
                }
            ]
        }
    },

    methods: {
        ...mapActions('filters', ['setTagFilters', 'setStateFilter']),
        onClickAllNotes () {
            // clear all filters
            this.setTagFilters([])
            this.setStateFilter('active')
        },

    }
}
</script>
