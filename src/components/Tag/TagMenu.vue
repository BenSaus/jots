<template>
    <q-expansion-item
        expand-separator
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
        ...mapActions('filters', ['setTagFilters']),
        onTagItemClick (tag) {
            console.log('onTagItemClick', tag)
            this.setTagFilters([tag.id])
        }
    },
    computed: {
        ...mapGetters('tags', ['allTags']),
        hotBarTags () {
            return this.allTags.filter(tag => tag.hotbar === true)
        }
    }
    
}
</script>

<style>

</style>