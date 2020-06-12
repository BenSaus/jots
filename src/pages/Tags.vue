<template>
    <q-page class="tw-px-5">
        <div class="lg:tw-w-4/6 tw-mx-auto">
            <div class="tw-text-4xl tw-mx-3 tw-mt-10">Edit Tags</div >

            <q-card v-if="!loading" class="tw-mt-5 tw-mx-auto tw-mt-5">
                <q-card-section>
                    <NewTag />
                    <hr>
                    <div v-for="tag in allTags" :key="tag.id">
                        <EditTag :tag="tag" />
                    </div>

                </q-card-section>
            </q-card>

        </div>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import NewTag from '../components/Tag/NewTag'
import EditTag from '../components/Tag/EditTag'

export default {
    data () {
        return {
            internalTags: [],
            loading: true
        }
    },
    components: {
        NewTag,
        EditTag
    },
    async created () {
        await this.fetchTags()
        this.loading = false

        console.log('Tags - Created')
    },
    methods: {
        ...mapActions('tags', ['fetchTags']),
    },
    computed: {
        ...mapGetters('tags', ['allTags'])
    }

}
</script>

<style>

</style>