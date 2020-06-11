<template>
    <q-page class="tw-px-5">
        <div class="tw-w-4/6 tw-mx-auto">
            <div class="tw-text-4xl tw-mx-3 tw-mt-10">Edit Tags</div >
            <q-card class="tw-mt-5 tw-mx-auto tw-mt-5">
                <q-card-section>
                    <div class="column">
                        
                        <div v-for="tag in allTags" :key="tag.id" class="row justify-between">
                            
                            <div class="row items-center">
                                <q-icon name="local_offer" class="tw-mr-3"></q-icon>
                                <div class="tw-text-xl">
                                    {{tag.name}}
                                </div>
                            </div>
                            <div>{{tag.color}}</div>
                            <div>On HotBar<q-toggle v-model="tag.hotbar" color="primary" /></div>

                        </div>

                    </div>
                </q-card-section>
            </q-card>

        </div>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

    methods: {
        ...mapActions('tags', ['updateTag', 'createTag', 'deleteTag'])
    },

    computed: {
        ...mapGetters('tags', ['allTags'])
    }
}
</script>

<style>

</style>