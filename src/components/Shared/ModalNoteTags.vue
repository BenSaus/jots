<template>
    <div class="tw-mt-5">
        <q-select
            multiple
            outlined
            v-model="model"
            :options="options"
            label="Tags"
            use-chips
            stack-label
            @input="onInput"
        >
            <template v-slot:option="scope">
                <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                    dense
                >
                    <q-item-section>
                        <q-item-label v-html="scope.opt.name" />
                    </q-item-section>
                </q-item>
            </template>

            <template v-slot:selected-item="scope">
                <q-chip
                    removable
                    
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    :color="scope.opt.color"
                    text-color="white"
                    class="q-mr-1"
                >
                    {{ scope.opt.name }}
                </q-chip>
            </template>

        </q-select>

    </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ['tags'],
    data () {
        return {
            model: [],
            options: []
        }
    },
    created () {
        // load available tags from db
        this.options = this.allTags
        if (this.tags.length > 0) this.loadTags()

        console.log('Created Note Tags')
        console.log(this.tags, this.model)
    },
    methods: {
        onInput () {
            // send message up to parent here
            const tags = this.model.map(tag => tag.id)
            this.$emit('change', tags)
        },
        loadTags () {
            this.model = this.allTags.filter(tag => {
                if (this.tags.includes(tag.id)) return true
                else return false
            })
        }
    },
    computed: {
        ...mapGetters('tags', ['allTags'])
    }
}
</script>

<style>

</style>