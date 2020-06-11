<template>
    <q-page>
        <div class="tw-w-4/6 tw-mx-auto">
            <div class="tw-text-4xl tw-mx-3 tw-mt-10">Settings</div >
            <q-card class="tw-mt-5 tw-mx-auto tw-mt-5">
                <q-card-section>
                    <div class="column">
                        
   
                        <div v-for="option in options" :key="option.name" class="row justify-between items-center">
                            <div>{{option.name}}</div>
                            <q-toggle v-if="option.type === 'toggle'" v-model="option.model" color="primary" />
                        </div>

                    </div>
                </q-card-section>
            </q-card>

        </div>
    </q-page>
</template>

<script>
export default {
    data () {
        return {
            optionValue: false,

            options: [
                {
                    name: 'Option 1',
                    type: 'toggle',
                    model: ''
                },
                {
                    name: 'Option 2',
                    type: 'toggle',
                    model: ''
                },
            ]
        }
    }
}
</script>

<style>

</style>