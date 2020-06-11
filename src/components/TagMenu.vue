<template>
    <q-expansion-item
        expand-separator
        label="Tags"
        style="background: white"
        icon="local_offer"
        class="bg-grey-2"
    >

            <q-list class="tw-ml-10">
                <q-item v-for="tag in allTags" :key="tag.id" clickable @click="onTagItemClick(tag)">{{tag.name}}</q-item>
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
        ...mapGetters('tags', ['allTags'])
    }
}
</script>

<style>

</style>