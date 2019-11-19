

const store = new Vuex.Store({
    state: {
        result: '', // 计算结果
        enter: '', // 输入
    },

    mutations: {
        calculate(state, v) {
            if (v === '=') {
                state.result = eval(state.enter)
                state.enter += v
            } else if (v === 'clear') {
            } else {

            }
        }
    },
})

Vue.component('keyboard', {
    props: [
        'value',
    ],

    template: `
        <div class="key"
        @click="getValue"
        v-bind:data-value="value">{{value}}</div>`,

    methods: {
        getValue(e) {
            let v = e.target.dataset.value
            this.$store.commit('calculate', v)
        }
    },
})

const __main = () => {
    const app = new Vue({
        el: '#app',

        store,

        data: {
            keys: [
                'clear', '+', '-', '*',
                '7', '8', '9', '/',
                '4', '5', '6', '0',
                '1', '2', '3', '=',
            ]
        },

        computed: {
            result() {
                let r = this.$store.state.result
                return r
            },

            enter() {
                let e = this.$store.state.enter
                return e === '' ? 0 : e
            },
        },
    })
}

__main()