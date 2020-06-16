<template>
    <div>
        <q-input 
            ref="textarea"
            class="tw-mt-3" 
            :value="text"
            @input="$emit('update:text', $event)"
            outlined
            
            type="textarea"
            rows=32
        />
    </div>
</template>

<script>
export default {
    props: ['text'],
}
</script>

<style lang="css" scoped>

</style>