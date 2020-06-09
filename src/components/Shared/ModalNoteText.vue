<template>
    <q-input 
        class="tw-mt-3" 
        :value="text"
        @input="$emit('update:text', $event)"
        outlined
        label="Text" 
        type="textarea"
    />
</template>

<script>
export default {
    props: ['text'],
}
</script>

<style>

</style>