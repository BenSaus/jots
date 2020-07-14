<template>
    <div>

        <template v-if="!showMarkdown">
            <div class="textAreaWrapper">
                <ModalTextArea :text="editedText" @onScroll="onScroll" @onInput="onInput" />
            </div>
        </template>

        <template v-else>
            <div class="tw-hidden md:tw-block">
                <q-splitter
                    v-model="splitterModel"
                    style="height: 620px"
                >
                    <template v-slot:before>
                        <div class="textAreaWrapper">
                            <ModalTextArea :text="editedText" @onScroll="onScroll" @onInput="onInput" />
                        </div>
                    </template>
                    <template v-slot:after>
                        <div ref="markdownWrapDesktop" class="markdownWrapper">
                            <div class="markdownDiv">
                                <VueMarkdown ref="markdownDesktop" :source="editedText"></VueMarkdown>
                            </div>
                        </div>
                    </template>
                </q-splitter>
            </div>
            <div class="tw-block md:tw-hidden">
                <div class="markdownWrapper">
                    <div ref="markdownWrapMobile" class="markdownDiv">
                        <VueMarkdown :source="editedText"></VueMarkdown>
                    </div>
                </div>
                <div class="tw-mt-3 textAreaWrapper">
                    <ModalTextArea :text="editedText" @onInput="onInput" />
                </div>
            </div>
        </template>

    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import ModalTextArea from './ModalTextArea'

export default {
    props: ['text', 'showMarkdown'],
    data () {
        return {
            editedText: '',
            markdown: '',
            splitterModel: 50, // start at 50%
            scrollPos: 0
        }
    },
    components: {
        VueMarkdown,
        ModalTextArea
    },
    created () {
        this.editedText = this.text
    },
    mounted () {
        // console.log(this.$refs.markdownWrapDesktop)
    },
    methods: {
        onInput (event) {
            this.$emit('onChange', event)
            this.editedText = event
        },
        onScroll (event) {
            console.log('scroll', event)
            // this.scrollPos = event

            this.$refs.markdownWrapDesktop.scrollTop = event * this.$refs.markdownWrapDesktop.scrollTopMax
            this.$refs.markdownWrapMobile.scrollTop = event * this.$refs.markdownWrapMobile.scrollTopMax

            console.log(this.$refs.markdownWrapDesktop.scrollTop)
        }
    }
}
</script>

<style>

    .nowrap {
        white-space: pre;
        overflow-wrap: normal;
        overflow-x: scroll;
    }

    .textAreaWrapper {

    }

    .markdownWrapper {
        border-radius: 5px;
        overflow: auto;
        border: 1px solid #ccc;

    }

    .markdownDiv {
        max-height: 100%;
        height: 618px;
        padding: 10px;
    }

    .markdownDiv h1 {
        margin: 0.1rem 0 0.1rem 0;
        font-size: 3rem;
        line-height: 1.25;
    }
    .markdownDiv h2 {
        margin: 0.1rem 0 0.1rem 0;
        font-size: 2.5rem;
    }    
    .markdownDiv h3 {
        margin: 0.1rem 0 0.1rem 0;
        font-size: 2rem;
    }
    .markdownDiv h4 {
        margin: 0.1rem 0 0.1rem 0;
        font-size: 1.5rem;
    }
    .markdownDiv h5 {
        margin: 0.1rem 0 0.1rem 0;
        font-size: 1.25rem;
    }
    .markdownDiv h6 {
        margin: 0.1rem 0 0.1rem 0;
        font-size: 1rem;
    }

    .markdownDiv ul {
        margin-top: 0.1rem;
    }

</style>