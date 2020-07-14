<template>
    <q-input 
        v-model="editedText"
        @input="onInput"
        outlined
        type="textarea"
        rows=32
        ref="inputArea"
    />
</template>

<script>
export default {
    props: ['text'],
    data () {
        return {
            editedText: '',
        }
    },
    created () {
        this.editedText = this.text
    },
    mounted () {
        // Set onscroll handler manually
        console.log('Created TextArea')
        const textArea = this.$refs.inputArea.$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
        textArea.onscroll = this.onScroll
        console.log(textArea)
    },
    methods: {
        onInput (event) {
            this.$emit('onInput', event)
        },
        onScroll (event) {
            this.$emit('onScroll', event.target.scrollTop / event.target.scrollTopMax)
        }
    }
}
</script>

<style>

</style>