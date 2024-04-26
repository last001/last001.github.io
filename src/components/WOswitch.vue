<template>
    <div class="ds-fx bg-page w-full p-5 br-1 ps-r" :class="`woswitch-${size}`">
        <div class="transition-3 fx-size-1 text-center pointer bold br-2 zi-9"
            :class="item.isActive ? 'c-primary' : ''" v-for="(item, index) in modelData" :key="index"
            @click="handler('switchHandle', item, index)">
            {{ item.name }}
        </div>
        <div class="active" v-if="options.sliderLeft" :style="{ left: options.sliderLeft, width: options.sliderW }"></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, reactive, onMounted ,PropType} from 'vue';
export default defineComponent({
    name: "WOswitch",
    props: {
        modelValue: String,
        modelData: {
            type: Array,
            default: [],
        },
        initialIndex: {
            type: Number,
            default: 0
        },
        size:{
            type:String,
            default:"default"
        }
    },
    emits: ["update:modelValue"],
    setup(props: any, context) {
        const options = reactive({
            modelValue: props.modelValue,
            initialIndex: props.initialIndex,
            sliderW: "",
            sliderLeft: '',
        })

        const handler = (command: string, data?: any, event?: any) => {
            switch (command) {
                case "switchHandle":
                    if (data.isActive) return;
                    props.modelData.forEach((v: any) => {
                        v.isActive = false;
                    })
                    data.isActive = true;
                    console.log(event);
                    options.initialIndex = event;
                    options.sliderLeft = options.initialIndex == 0 ? '5px' : `calc(calc(100%/${props.modelData.length}) * ${options.initialIndex })`
                    console.log(options.sliderLeft);
                    context.emit('update:modelValue', data.value);
                    break;

                default:
                    break;
            }
        }

        onMounted(() => {
            options.sliderW = `calc(calc(100%/${props.modelData.length}) - 5px)`;
            options.sliderLeft = options.initialIndex == 0 ? '5px' : `calc(calc(100%/${props.modelData.length}) * ${options.initialIndex })`
        })

        watch(() => props.modelValue, (newValue, value) => {
            if (newValue !== value) {
                options.modelValue = newValue;
                context.emit('update:modelValue', newValue);
                return true;
            }
            return false;
        });
        return {
            options, handler
        }
    }
})
</script>

<style lang="scss" scoped>
.woswitch-small{
    padding: 3px;
}
.woswitch-large{
    padding:7px;
}
.active {
    display: block;
    position: absolute;
    top: 5px;
    /* left: 5px; */
    height: calc(100% - 10px);
    background-color: #FFF;
    transition: all .3s;
}
</style>