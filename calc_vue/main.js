const log = console.log.bind(console)

const store = new Vuex.Store({
    // vuex 的 store 相当于创建了一个全局对象
    // 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation
    // 例如 this.$store.commit('calculate', v) , calculate 是一个 mutations 方法, 后面跟的是传进去的参数
    // 使用时机, 构建大型复杂的 web 项目时,用来存储那些不同兄弟或者父子爷孙组件之间共用的数据

    state: {
        result: '', // 计算结果
        enter: '', // 输入
    },

    mutations: {
        // 根据传入的 v 来计算更新 enter 和 state
        calculate(state, v) {
            let en = state.enter
            if (v === '=') {
                state.result = eval(en === '' ? 0 : en)
            } else if (v === 'clear') {
                state.result = ''
                state.enter = ''
            } else if ('+-*/'.indexOf(v) !== -1) {
                if (en !== '') {
                    state.enter += v
                }
            } else {
                state.enter = String(Number(en + v))
            }
        }
    },
})

// 将计算器的每一个按钮当成一个子组件
Vue.component('keyboard', {
    // 声明一个 keyboard 组件
    props: [
        'value',
        // 接受一个 value 的属性
    ],

    // 组件的 模板
    // 给组件绑定自己的事件
    // @click 是 v-on:click 的简写
    // 通过 v-bind 绑定 value 的值到元素的 dataset 自定义属性上
    // :data-value 是 v-bind:data-value 的简写
    // 元素显示的就是 value
    template: `
        <div class="key"
        @click="getValue"
        :data-value="value">{{value}}</div>`,


    // 组件的事件
    methods: {
        getValue(e) {
            let v = e.target.dataset.value

            // 父组件里注册了 store 实例, 此处子组件可以直接 this.$store 调用
            // 触发 vuex 的计算函数,变更 vuex 的数据
            this.$store.commit('calculate', v, v)

            if (v === 'clear') {
                // 增加一个子组件自定义事件, 始终使用 kebab-case 的事件名 emit-event, 后面跟上传的参数
                // 父组件里监听 emit-event 就能触发并拿到传出去的参数
                this.$emit('emit-event', 'this is clear')
            }
        }
    },
})

const __main = () => {
    const app = new Vue({
        // 挂载 vue 实例的元素选择器
        el: '#app',

        // 此处给 app 指定使用的 store
        // 根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 来访问
        store: store,

        // vue 实例的数据,可以通过 {{}} 或者 v-html v-bind 绑定到 页面, 或者 v-model 实现双向绑定
        data: {
            keys: [
                'clear', '+', '-', '*',
                '7', '8', '9', '/',
                '4', '5', '6', '0',
                '1', '2', '3', '=',
            ]
        },

        computed: {
            // 计算属性
            // 基本同 data 用法, 可以把需要一定逻辑实现的 data 包装一层 computed
            result() {
                let r = this.$store.state.result
                return r
            },

            enter() {
                let e = this.$store.state.enter
                return e === '' ? 0 : e
            },
        },

        methods: {
            testEmit(params) {
                // 用来监听并接受子组件通过自定义事件'发射'出来参数的函数
                log(params, 'test emit-----params :::  is here-----')
            }
        },
    })
}

__main()