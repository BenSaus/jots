<template>
    <div class="row justify-end">


        <div class="col row items-center">
            <div class="tw-text-xl">
                <q-input 
                    class="tw-text-xl" 
                    type="text" 
                    filled 
                    bg-color="white" 
                    borderless 
                    dense 
                    ref="nameInput"
                    :value="tag.name"
                    @blur="onInputBlur"
                ></q-input>
            </div>
        </div>

        <div class="col-2 row items-center">
            <q-btn flat :color="tag.color" icon="palette">
                <q-tooltip>Tag Color</q-tooltip>
                <ColorPicker @pickColor="onColorClick"/>
            </q-btn>
        </div>

        <div class="col row items-center justify-center">
            On HotBar
            <q-toggle :value="tag.hotbar" color="primary" @input="onHotBarClick"/>
        </div>
        <div class="col-1 row items-center justify-end">
            <q-btn flat icon="delete" color="negative" @click="onClickDelete">
                <q-tooltip>Delete Tag</q-tooltip>
            </q-btn>
        </div>

        <DeletePrompt :show="showDeleteTagPrompt" :text="deleteTagPromptText" @confirm="onConfirmDelete" @cancel="showDeleteTagPrompt = false" />
        
    </div>
</template>

<script>
import ColorPicker from 'components/ColorPicker'
import DeletePrompt from 'components/DeletePrompt'
import { mapActions } from 'vuex'

export default {
    props: ['tag'],
    data () {
        return {
            showDeleteTagPrompt: false,
            deleteTagPromptText: '',
            modifiedName: ''
        }
    },
    components: { 
        DeletePrompt,
        ColorPicker,
    },
    created () {
        this.modifiedName = this.tag.name
    },
    methods: {
        ...mapActions('tags', ['updateTag', 'deleteTag']),
        // onInput (text) {
        //     console.log('OnInput')
            
        //     this.modifiedName = text
        //     console.log(text)
        // },
        onInputBlur () {
            console.log('Blur')
            console.log(this.$refs.nameInput.innerValue, this.tag.name)
            console.log(this.$refs.nameInput.innerValue !== this.tag.name)
            
            if (this.$refs.nameInput.innerValue !== this.tag.name) {
                console.log('Updating tag name')
                
                // Copy prop and change the copy
                const updatedTag = { ...this.tag }
                updatedTag.name = this.modifiedName
    
                this.updateTag(updatedTag)
            }
        },
        onColorClick (color) {
            console.log(this.tag)
            console.log(color)

            // Copy prop and change the copy
            const updatedTag = { ...this.tag }
            updatedTag.color = color

            this.updateTag(updatedTag)
        },
        onHotBarClick (value) {
            console.log(this.tag)
            console.log(value)

            // Copy prop and change the copy
            const updatedTag = { ...this.tag }
            updatedTag.hotbar = value

            this.updateTag(updatedTag)
        },

        onClickDelete () {
            this.deleteTagPromptText = `Delete ${this.tag.name}?`
            this.showDeleteTagPrompt = true
        },
        onConfirmDelete () {
            this.showDeleteTagPrompt = false
            this.deleteTag({ id: this.tag.id })
        },
        
    }
}
</script>

<style>

</style>