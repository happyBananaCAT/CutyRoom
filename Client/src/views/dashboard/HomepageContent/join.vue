<template>
    <div class="form">
        <p5-title content="调查问卷" class="title"></p5-title>
        <p style="font-size: 18px;">萌屋游戏工作室是湘潭大学。。。。（介绍词）</p>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="size" label-placement="top">
            <div v-for="(question, index) in questions" :key="index">
                <div v-if="question.type === 'input'">
                    <n-form-item :label="question.label" :path="question.path">
                        <n-input v-model:value="formValue[question.path]" :placeholder="question.placeholder" />
                    </n-form-item>
                    <n-divider />
                </div>
                <div v-else-if="question.type === 'radio'">
                    <n-form-item :label="question.label" :path="question.path">
                        <n-radio-group v-model:value="formValue[question.path]">
                            <n-space>
                                <n-radio v-for="option in question.options" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </n-radio>
                            </n-space>
                        </n-radio-group>
                    </n-form-item>
                    <n-divider />
                </div>
            </div>
            <n-form-item>
                <n-button attr-type="button" @click="Submit">
                    提交
                </n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formRef = ref(null);
const size = ref('medium');
const formValue = reactive({
    name: '',
    major: '',
    favorite: '',
    reason: '',
    moreGame: '',
    skill: '',
    advantages: '',
    disadvantages: '',
    direction: '',
    failure: '',
    express: '',
    politics: '',
    genshin: '',
    share: '',
    nickname: ''
});
const questions = ref([
    { type: 'input', label: '您的姓名是?', placeholder: '请输入姓名', path: 'name' },
    { type: 'input', label: '您的专业是?', placeholder: '请输入专业', path: 'major' },
    { type: 'input', label: '您最喜欢的游戏是?', placeholder: '请输入您最喜欢的游戏', path: 'favorite' },
    { type: 'input', label: '您最喜欢此游戏的原因是?', placeholder: '请输入您喜欢该游戏的原因', path: 'reason' },
    { type: 'input', label: '您还玩过哪些游戏?请适量举例一些', placeholder: '请输入您玩过的游戏', path: 'moreGame' },
    {
        type: 'input', label: '您认为您拥有哪些在游戏开发领域可使用的技能?例如blender,ps,ae?或您使用过游戏引擎?又或者您有过组织管理经验?',
        placeholder: '总之，您拥有的任何技能都可能在这个领域发挥用处', path: 'skill'
    },
    { type: 'input', label: '您认为您有哪些优点或优势？', placeholder: '请相信，每个人都有优点', path: 'advantages' },
    { type: 'input', label: '您认为您有哪些缺点或劣势？', placeholder: '请大胆的写出来与大家共勉', path: 'disadvantages' },
    {
        type: 'radio',
        label: '您希望学习和发展的方向是？',
        path: 'direction',
        options: [
            { value: '程序', label: 'A: 程序' },
            { value: '策划', label: 'B: 策划' },
            { value: '美术', label: 'C: 美术' }
        ]
    },
    {
        type: 'radio',
        label: '游戏开发是一项幸苦的工作，您是否能接受反复的失败？',
        path: 'failure',
        options: [
            { value: '能', label: '能' },
            { value: '不能', label: '不能' },
            { value: '如能', label: '如能' },
            { value: '不知道', label: '不知道' },
        ]
    },
    {
        type: 'radio',
        label: '您的表达能力如何？',
        path: 'express',
        options: [
            { value: '经常在公众面前发表讲话', label: '经常在公众面前发表讲话' },
            { value: '有过经验，会有一些正常范围内的怯场', label: '有过经验，会有一些正常范围内的怯场' },
            { value: '能在私下的谈论中良好的表达观点，但在公众面前表达尚有不足', label: '能在私下的谈论中良好的表达观点，但在公众面前表达尚有不足' },
            { value: '不爱说话', label: '不爱说话' },
        ]
    },
    {
        type: 'radio',
        label: '假设您正在办公室工作，此时听到你的同事在讨论尖锐的政治问题，您会：',
        path: 'politics',
        options: [
            { value: '马上制止他们并要求不要随意讨论相关问题', label: '马上制止他们并要求不要随意讨论相关问题' },
            { value: '加入讨论开始键政', label: '加入讨论开始键政' },
            { value: '反驳他们的观点并输出自己的观点', label: '反驳他们的观点并输出自己的观点' },
            { value: '不参与讨论', label: '不参与讨论' },
        ]
    },
    {
        type: 'radio',
        label: "假设您在办公室发现您的一名同事正在玩《原神》,此时您会：",
        path: 'genshin',
        options: [
            { value: "狠狠的嘲笑他并输出自己的单机天龙人观点", label: "狠狠的嘲笑他并输出自己的单机天龙人观点" },
            { value: "认为这没什么大不了的", label: "认为这没什么大不了的" },
            { value: "表面不动声色，内心狠狠的鄙视他", label: "表面不动声色，内心狠狠的鄙视他" },
            { value: "原来你也玩原神", label: "原来你也玩原神" }
        ]
    },
    {
        type: 'radio',
        label: "假设您找到了一些有趣的或有用的资料或博客,此时您会：",
        path: 'share',
        options: [
            { value: "转发或上传某些平台进行分享或供其他人取用", label: "转发或上传某些平台进行分享或供其他人取用" },
            { value: "您没有转发或分享的习惯，不过如果其他人需要，您很乐意把资料给他", label: "您没有转发或分享的习惯，不过如果其他人需要，您很乐意把资料给他" },
            { value: "收藏起来，尽管你自己也不一定会看", label: "收藏起来，尽管你自己也不一定会看" },
            { value: "您有点害羞，觉得别人不一定会喜欢", label: "您有点害羞，觉得别人不一定会喜欢" }
        ]
    },
    {
        type: 'input', label: '最后，欢迎您的加入，请问您希望我们使用什么名字称呼您呢？', placeholder: '可以输入您的网名或昵称', path: 'nickname'
    }
]);
const rules = {
    name: { required: true, message: '请输入您的姓名', trigger: ['input'] },
    major: { required: true, message: '请输入您的专业', trigger: ['input'] },
    favorite: { required: true, message: '请输入您最喜欢的游戏', trigger: ['input'] },
    reason: { required: true, message: '请输入您喜欢该游戏的原因', trigger: ['input'] },
    moreGame: { required: true, message: '请输入您玩过的其他游戏', trigger: ['input'] },
    skill: { required: true, message: '请输入您拥有的技能', trigger: ['input'] },
    advantages: { required: true, message: '请输入您的优点或优势', trigger: ['input'] },
    disadvantages: { required: true, message: '请输入您的缺点或劣势', trigger: ['input'] },
    direction: { required: true, message: '请选择您的发展方向', trigger: ['change'] },
    failure: { required: true, message: '请选择您对失败的态度', trigger: ['change'] },
    express: { required: true, message: '请选择您的表达能力', trigger: ['change'] },
    politics: { required: true, message: '请选择您对讨论政治问题的态度', trigger: ['change'] },
    genshin: { required: true, message: '请选择您对同事玩《原神》的态度', trigger: ['change'] },
    share: { required: true, message: '请选择您对分享资料的态度', trigger: ['change'] },
    nickname: { required: true, message: '请输入您希望被称呼的名字', trigger: ['input'] }
};

const Submit = async () => {
    const isValid = await formRef.value.validate(); // 调用 validate 方法
    if (isValid) {
        console.log('表单提交成功:', formValue);
    } else {
        console.log('表单验证失败');
    }
};
</script>

<style lang="scss" scoped>
.form {
    border-radius: 5px;
    margin: 5vh auto;
    padding: 15px;
    width: 80%;
    background-color: white;
}

.title {
    font-size: 40px;
}
</style>