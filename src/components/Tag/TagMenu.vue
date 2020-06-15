<template>
    <q-expansion-item
        expand-separator
        dense
        dense-toggle
        label="Notes Tagged"
        style="background: white"
        icon="local_offer"
        class="bg-grey-2"
    >
        <q-list class="tw-ml-10">
            <q-item v-for="tag in hotBarTags" :key="tag.id" clickable @click="onTagItemClick(tag)" to="/">
                {{tag.name}}
            </q-item>
        </q-list>
    </q-expansion-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions('filters', ['setTagFilters', 'setStateFilter']),
        onTagItemClick (tag) {
            console.log('onTagItemClick', tag)
            this.setTagFilters([tag.id])
            this.setStateFilter('active')
        },
    },
    computed: {
        ...mapGetters('tags', ['allTags']),
        hotBarTags () {
            console.log('hotbars')
            
            console.log(this.allTags.filter(tag => tag.hotbar === true))
            return this.allTags.filter(tag => tag.hotbar === true).sort((a, b) => {
                if (a.name < b.name) return -1
                else if (a.name === b.name) return 0
                else return 1
            })
        }
    }
    
}
</script>

<style>

</style>