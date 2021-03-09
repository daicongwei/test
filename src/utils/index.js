import Vue from 'vue'
import * as utils from "./utils"

Object.defineProperty(Vue.prototype, '$utils', {
    value: utils
})
