<template>
    <div class="row">


        <div class="col row items-center">
            <div class="tw-text-xl">
                <q-input class="tw-text-xl" placeholder="Create New Tag" filled bg-color="white" borderless dense type="text" v-model="tag.name"></q-input>
            </div>
        </div>

        <div class="col-2 row items-center">
            <q-btn flat :color="tag.color" icon="palette">
                <q-tooltip>Tag Color</q-tooltip>
                <ColorPicker @pickColor="onPickColor" />
            </q-btn>
        </div>

        <div class="col row items-center justify-center">
            On HotBar
            <q-toggle v-model="tag.hotbar" color="primary" />
        </div>
        <div class="col-1 row items-center justify-end">
            <q-btn flat icon="add" @click="onClickCreate">
                <q-tooltip>Create New Tag</q-tooltip>
            </q-btn>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
import ColorPicker from 'components/ColorPicker'

export default {
    data () {
        return {
            tag: {
                name: '',
                color: 'blue',
                hotbar: true
            }
        }
    },
    components: { ColorPicker },
    methods: {
        ...mapActions('tags', ['createTag', 'isDuplicateName']),

        onPickColor (color) {
            this.tag.color = color
        },

        async onClickCreate () {
            console.log('OnClickCreate')

            if (this.tag.name.trim === '') {
                // TODO: SHOW WARNING MESSAGE
                return
            }

            // if (this.isDuplicateName(this.tag.name) === false) this.createTag(this.tag)
            // else show name warning!!!!!
            await this.createTag(this.tag)
            console.log(this.tag)

            this.reset()
        },

        reset () {
            this.tag.name = ''
            this.tag.color = 'blue'
            this.tag.hotbar = true
        }
    }

}
</script>

<style>

</style>