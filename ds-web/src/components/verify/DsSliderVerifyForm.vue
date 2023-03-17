<template>
    <div class="slider-verify">
        <div class="button" :class="{ 'success':data.verifySuccess }" @click="showVerify">
            <div v-if="data.verifySuccess" class="ds-fx ai-c"><el-icon :size="18" class="mr-10"><SuccessFilled /></el-icon><span>验证成功</span></div>
            <div v-else><span>点击按钮开始验证</span></div>
        </div>
        <el-dialog v-model="data.dialog" width="320px" height="280px" :show-close="false">
            <template #title>
                <div class="title">
                    <div class="text"><span>拖动下方滑块完成拼图</span></div>
                    <div class="" style="margin-right:-16px">
                        <el-link icon="RefreshRight" style="font-size:20px;margin-right:10px;" :underline="false" @click="reset"></el-link>
                        <el-link icon="Close" style="font-size:20px" :underline="false" @click="close"></el-link>
                    </div>
                </div>
            </template>
            <div class="image" style="margin-top:-30px;" v-loading="data.loading">
                <img class="backgroup-img" :src="data.backgroundImage" ref="bgImg" @error="data.backgroundImage = '/src/assets/images/error-img.jpg'"/>
                <img class="slider-img" :src="data.sliderImage" ref="sliderImg"/>
            </div>
            <div class="slide" :class="{'success':data.verifySuccess}">
                <div class="block" ref="sliderBtn" @mousedown="start" @touchstart="start">
                    <el-icon :size="16">
                        <SuccessFilled v-if="data.verifySuccess"/>
                        <Expand v-else/>
                    </el-icon>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType, ref,reactive, watch } from 'vue';
    import dsauth from '@dscloud/api/dsauth';
    export default defineComponent({
        name: 'DsSlideVerifyForm',
        props: {
            modelValue:Number,
            dialog:{
                type: Boolean,
                required: false,
                default: false
            },
            log: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        emits: ['update:modelValue'],
        setup(props, context) {
            const bgImg = ref();
            const sliderImg = ref();
            const sliderBtn = ref();
            const data = reactive({
                dialog:props.dialog,
                //滑块背景图片
                backgroundImage: "",
                //滑块图片
                sliderImage: "",
                //是否已经移动滑块
                startMove: false,
                //验证码唯一ID
                requestId: "",
                //加载遮罩标识
                loading: false,
                //验证成功
                verifySuccess:false,
                originX: 0,
                originY: 0,
                startSlidingTime: null,
                entSlidingTime: null,
                trackList: [],
                bgImageWidth: 0,
                bgImageHeight: 0,
                sliderImageWidth: 0,
                sliderImageHeight: 0,
            });
            /**
             * 打印日志
             */
            const printLog = (msg, ...optionalParams) => {
                if (props.log) {
                    if (optionalParams && optionalParams.length > 0) {
                        console.info(`滑块验证码[${msg}]`, optionalParams.length === 1 ? optionalParams[0] : optionalParams);
                    } else {
                        console.info(`滑块验证码[${msg}]`);
                    }
                }
            };
            /**
             * 生成滑块图片
             */
            const genImg = ()=> {
                data.loading = true;
                dsauth.genVerifyImage({captchaType:"SLIDER"}).then((res) => {
                    printLog("genVerifyImage", res);
                    data.loading = false;
                    if (!res) return;
                    data.backgroundImage = res.backgroundImage;
                    data.sliderImage = res.sliderImage;
                    data.requestId = res.requestId;
                    sliderImg.value.style.transform = 'translate(0px, 0px)';
                    sliderBtn.value.style.transform = 'translate(0px, 0px)';
                    context.emit('update:modelValue', "");
                });
            }
            /**
             * 校验图片
             */
            const validImg = ()=> {
                let validData = {
                    bgImageWidth: bgImg.value.clientWidth,
                    bgImageHeight: bgImg.value.clientHeight,
                    sliderImageWidth: sliderImg.value.clientWidth,
                    sliderImageHeight: sliderImg.value.clientHeight,
                    startSlidingTime: data.startSlidingTime,
                    entSlidingTime: data.entSlidingTime,
                    trackList: data.trackList,
                };
                dsauth.checkVerifyImage(data.requestId,validData).then((res)=>{
                    printLog("checkVerifyImage", res);
                    if(res === true){
                        data.verifySuccess = true;
                        context.emit('update:modelValue', data.requestId);
                        close();
                    }else if(res === false){reset();}
                });
            }
            /**
             * 重新生成图片
             */
            const reset = ()=> {
                genImg();
                data.verifySuccess = false;
                data.loading = false;
                data.requestId= '';
                data.backgroundImage= '';
                data.sliderImage= '';
                data.startMove= false;
                data.originX= 0;
                data.originY= 0;
                data.startSlidingTime= null;
                data.entSlidingTime= null;
                data.trackList= [];
                data.bgImageWidth= 0;
                data.bgImageHeight= 0;
                data.sliderImageWidth= 0;
                data.sliderImageHeight= 0;
            }
            /**
             * 按钮关闭事件
             */
            const close =()=> {
                data.dialog=false;
            }
            /**
             * 开始滑动
             */
            const start = (e)=> {
                data.startSlidingTime = new Date();
                // 获取拖拽起始位置坐标
                data.originX = e.clientX || e.touches[0].clientX;
                data.originY = e.clientY || e.touches[0].clientY;
                data.startMove = true;

                window.addEventListener("mousemove", move);
                window.addEventListener("mouseup", up);
                window.addEventListener("touchmove", move);
                window.addEventListener("touchend", up);
            }
            /**
             * 滑块滑动事件
             */
            const move = (e)=> {
                if (!data.startMove) return false;
                const w = 238;//滑道宽度
                // 获取拖拽移动的距离
                const eventX = e.clientX || e.touches[0].clientX;
                const eventY = e.clientY || e.touches[0].clientY;
                let moveX = eventX - data.originX;
                let moveY = eventY - data.originY;
                data.trackList.push({x: moveX, y: moveY, t: (new Date().getTime() -data.startSlidingTime.getTime())});
                if (moveX < 0)
                    moveX = 0;
                else if (moveX > w)
                    moveX = w;
                sliderImg.value.style.transform = 'translate(' + moveX + 'px, 0px)';
                sliderBtn.value.style.transform = 'translate(' + moveX + 'px, 0px)';
            }
            /**
             * 滑块鼠标抬起事件
             */
            const up = (e)=> {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseup", up);
                window.removeEventListener("touchmove", move);
                window.removeEventListener("touchend", up);
                if (!data.startMove) return false;
                data.startMove = false;
                const eventX = e.clientX || e.changedTouches[0].clientX;
                if (eventX === data.originX) return false;
                data.entSlidingTime = new Date();
                sliderImg.value.style.transform = 'translate(0px, 0px)';
                sliderBtn.value.style.transform = 'translate(0px, 0px)';
                validImg();
            }
            /**
             * 显示验证
             */
            const showVerify = (e)=>{
                if(data.verifySuccess)return;
                data.dialog = true;
                reset();
            }
            return {data,start,close,move,up,showVerify,reset,bgImg,sliderImg,sliderBtn}
        },
        mounted(){
            console.log("mounted");
        },
        beforeUnmount() {
            window.removeEventListener("touchmove", this.move);
            window.removeEventListener("touchend", this.up);
            window.removeEventListener("mousemove", this.move);
            window.removeEventListener("mouseup", this.up);
        }
    });
</script>

<style lang="scss" scoped>
    .slider-verify{
        width: 100%;
        .button{
            display: flex;align-items: center;
            border-width:1px;border-radius: var(--el-border-radius-base);border-color:var(--el-color-info-light-7);border-style: solid;
            padding: 10px 25px;font-size:14px;color:var(--el-text-color-regular);line-height:normal;text-align: left;cursor: pointer;
            transition: var(--el-transition-all);
            &:before{content: "";
                width: 6px;
                background-color: var(--el-color-info-light-5);
                transition: var(--el-transition-all);
                position: absolute;
                left: 0px;
                height: 100%;
                top: 0px;
                border-radius: var(--el-border-radius-base) 0px 0px var(--el-border-radius-base);
            }
            &:hover{
                border-color:var(--el-color-primary-light-5);color:var(--el-color-primary);
                &:before{background-color: var(--el-color-primary);}
            }
            &.success{
                border-color:var(--el-color-success-light-5);color:var(--el-color-success);
                background-color: var(--el-color-success-light-9);
                &:before{background-color: var(--el-color-success);}
            }
        }
        .title{
            user-select: none;
            font-size: 18px;
            color: #333;
            display: flex;
            justify-content: space-between;
        }
        .image{
            height:180px;
            position: relative;
            //.backgroup-img {width: 100%;}
            .backgroup-img{height:166px;width:100%;}
            .slider-img {height:166px;position: absolute;left: 0;top: 0;}
        }
        .slide {
            width: 100%;
            height: 40px;
            border: 1px solid #e4e7eb;
            background-color: #f7f9fa;
            box-sizing: border-box;
            position: relative;

            &::before {
                position: absolute;
                content: "按住左边按钮移动完成上方拼图";
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                color: #999;
                width: 100%;
                height: 100%;
                text-indent: 50px;
            }

            .block {
                width: 40px;
                height: 38px;
                background-color: #fff;
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0px;
                top: 0;
                cursor: pointer;
                background-size: 30px;
                background-repeat: no-repeat;
                background-position: center;
            }

            &.success{
                border-color:var(--el-color-success-light-5);color:var(--el-color-success);
                background-color: var(--el-color-success-light-9);
            }
        }
    }
</style>
