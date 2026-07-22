import { startWorkers } from './snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.no-bundler.js';


function __wbg_reset_state () {
    __wbg_instance_id++;
    cachedBigInt64ArrayMemory0 = null;
    cachedBigUint64ArrayMemory0 = null;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt16ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;
    if (typeof numBytesDecoded !== 'undefined') numBytesDecoded = 0;
    if (typeof WASM_VECTOR_LEN !== 'undefined') WASM_VECTOR_LEN = 0;
    __wbg_reinit_scheduled = false;
    wasmInstance = new WebAssembly.Instance(wasmModule, __wbg_get_imports());
    wasm = wasmInstance.exports;
    wasm.__wbindgen_start();
}

/**
 * @param {number} num_threads
 * @returns {Promise<any>}
 */
export function initThreadPool(num_threads) {
    let ret;
    __wbg_call_guard();
    ret = wasm.initThreadPool(num_threads);
    return ret;
}

/**
 * @returns {Promise<void>}
 */
export function run() {
    __wbg_call_guard();
    wasm.run();
}

export class wbg_rayon_PoolBuilder {
    static __wrap(ptr) {
        const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
        obj.__wbg_ptr = ptr;
        Object.defineProperty(obj, '__wbg_inst', { value: __wbg_instance_id, writable: true });

        wbg_rayon_PoolBuilderFinalization.register(obj, { ptr, instance: __wbg_instance_id }, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof wbg_rayon_PoolBuilder)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        wbg_rayon_PoolBuilderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        __wbg_call_guard();
        wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);

    }
    build() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        __wbg_call_guard();
        wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
    }
    /**
     * @returns {string}
     */
    mainJS() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.wbg_rayon_poolbuilder_mainJS(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    numThreads() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    receiver() {
        if (this.__wbg_inst !== undefined && this.__wbg_inst !== __wbg_instance_id) {
            throw new Error('Invalid stale object from previous Wasm instance');
        }
        let ret;
        __wbg_call_guard();
        ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) wbg_rayon_PoolBuilder.prototype[Symbol.dispose] = wbg_rayon_PoolBuilder.prototype.free;

/**
 * @param {number} receiver
 */
export function wbg_rayon_start_worker(receiver) {
    __wbg_call_guard();
    wasm.wbg_rayon_start_worker(receiver);
}
function __wbg_get_imports(memory) {
    const import0 = {
        __proto__: null,
        __wbg_1_80c82bbccc16a46d: function() {
            const ret = RegExp.$1;
            return ret;
        },
        __wbg_2_de4ff69b9be49bcd: function() {
            const ret = RegExp.$2;
            return ret;
        },
        __wbg_3_a6cfcff440140943: function() {
            const ret = RegExp.$3;
            return ret;
        },
        __wbg_4_f69f03af63ec7831: function() {
            const ret = RegExp.$4;
            return ret;
        },
        __wbg_5_8173164f7cffa444: function() {
            const ret = RegExp.$5;
            return ret;
        },
        __wbg_6_a4d9053825872032: function() {
            const ret = RegExp.$6;
            return ret;
        },
        __wbg_7_f1c794a7d33038de: function() {
            const ret = RegExp.$7;
            return ret;
        },
        __wbg_8_6fdc4a196043328d: function() {
            const ret = RegExp.$8;
            return ret;
        },
        __wbg_9_18dd49780fa6871c: function() {
            const ret = RegExp.$9;
            return ret;
        },
        __wbg_BigInt_7c5b46c866f07602: function() { return handleError(function (arg0) {
            const ret = BigInt(arg0);
            return ret;
        }, arguments); },
        __wbg_BigInt_9fb73aa817d633b1: function(arg0) {
            const ret = BigInt(arg0);
            return ret;
        },
        __wbg_BigInt_ff69cca7a537413a: function(arg0, arg1) {
            const ret = BigInt(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Error_92b29b0548f8b746: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Number_9a4e0ecb0fa16705: function(arg0) {
            const ret = Number(arg0);
            return ret;
        },
        __wbg_Symbol_95bcfdf7de297659: function(arg0, arg1) {
            const ret = Symbol(arg0 === 0 ? undefined : getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_URL_2ed964996434c035: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.URL;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_UTC_68ebfdd22eb35b77: function(arg0, arg1) {
            const ret = Date.UTC(arg0, arg1);
            return ret;
        },
        __wbg_Window_65ef42d29dc8174d: function(arg0) {
            const ret = arg0.Window;
            return ret;
        },
        __wbg_Window_c7f91e3f80ae0a0e: function(arg0) {
            const ret = arg0.Window;
            return ret;
        },
        __wbg_WorkerGlobalScope_d272430d4a323303: function(arg0) {
            const ret = arg0.WorkerGlobalScope;
            return ret;
        },
        __wbg___wbindgen_add_4688e624d168e155: function(arg0, arg1) {
            const ret = arg0 + arg1;
            return ret;
        },
        __wbg___wbindgen_bigint_get_as_i64_d968e41184ae354f: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_bit_and_1baf7d5d6fcd48ac: function(arg0, arg1) {
            const ret = arg0 & arg1;
            return ret;
        },
        __wbg___wbindgen_bit_not_9130e59ebb4b3c17: function(arg0) {
            const ret = ~arg0;
            return ret;
        },
        __wbg___wbindgen_bit_or_e854f11b02e5214a: function(arg0, arg1) {
            const ret = arg0 | arg1;
            return ret;
        },
        __wbg___wbindgen_bit_xor_c34c924d0c7afe9d: function(arg0, arg1) {
            const ret = arg0 ^ arg1;
            return ret;
        },
        __wbg___wbindgen_boolean_get_fa956cfa2d1bd751: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_checked_div_d866621a1bf29621: function(arg0, arg1) {
            let result;
            try {
                result = arg0 / arg1;
            } catch (e) {
                if (e instanceof RangeError) {
                    result = e;
                } else {
                    throw e;
                }
            }
            const ret = result;
            return ret;
        },
        __wbg___wbindgen_copy_to_typed_array_4db0cbe2cc60dbee: function(arg0, arg1, arg2) {
            new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(getArrayU8FromWasm0(arg0, arg1));
        },
        __wbg___wbindgen_debug_string_c25d447a39f5578f: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_div_3d33613a29e32e11: function(arg0, arg1) {
            const ret = arg0 / arg1;
            return ret;
        },
        __wbg___wbindgen_exports_27710d94a5fc917d: function() {
            const ret = wasm;
            return ret;
        },
        __wbg___wbindgen_function_table_808ea415bac79cd6: function() {
            const ret = wasm.__wbindgen_export;
            return ret;
        },
        __wbg___wbindgen_ge_96498cdf515f1f70: function(arg0, arg1) {
            const ret = arg0 >= arg1;
            return ret;
        },
        __wbg___wbindgen_gt_1a9543af7b57c54b: function(arg0, arg1) {
            const ret = arg0 > arg1;
            return ret;
        },
        __wbg___wbindgen_in_aca499c5de7ff5e5: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_instance_d56c0f43f6c124d1: function() {
            const ret = wasmInstance;
            return ret;
        },
        __wbg___wbindgen_is_bigint_2f76dc55065b4273: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_falsy_a6dfe792ff282f10: function(arg0) {
            const ret = !arg0;
            return ret;
        },
        __wbg___wbindgen_is_function_1ff95bcc5517c252: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_ea9085d691f535d3: function(arg0) {
            const ret = arg0 === null;
            return ret;
        },
        __wbg___wbindgen_is_null_or_undefined_f39ff01e68a1554f: function(arg0) {
            const ret = arg0 == null;
            return ret;
        },
        __wbg___wbindgen_is_object_a27215656b807791: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_ea5e6cc2e4141dfe: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_symbol_0c0690b48e92ec04: function(arg0) {
            const ret = typeof(arg0) === 'symbol';
            return ret;
        },
        __wbg___wbindgen_is_undefined_c05833b95a3cf397: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_e659fcf7b0e32763: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_db4c3b15f63fc170: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_le_37b4c7337e57197c: function(arg0, arg1) {
            const ret = arg0 <= arg1;
            return ret;
        },
        __wbg___wbindgen_lt_f5e407c37b70b8b0: function(arg0, arg1) {
            const ret = arg0 < arg1;
            return ret;
        },
        __wbg___wbindgen_memory_de265df8aadd6273: function() {
            const ret = wasm.memory;
            return ret;
        },
        __wbg___wbindgen_module_a22faa8909381977: function() {
            const ret = wasmModule;
            return ret;
        },
        __wbg___wbindgen_mul_266312490a503a23: function(arg0, arg1) {
            const ret = arg0 * arg1;
            return ret;
        },
        __wbg___wbindgen_neg_69ea89900918a95f: function(arg0) {
            const ret = -arg0;
            return ret;
        },
        __wbg___wbindgen_number_get_394265ed1e1b84ee: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_pow_bbb60641dd979426: function(arg0, arg1) {
            const ret = arg0 ** arg1;
            return ret;
        },
        __wbg___wbindgen_reinit_ecd4a8d70c8ce492: function() {
            __wbg_reinit_scheduled = true;
        },
        __wbg___wbindgen_rem_962b4c6d64e1bfc4: function(arg0, arg1) {
            const ret = arg0 % arg1;
            return ret;
        },
        __wbg___wbindgen_rethrow_4915403b40f010b4: function(arg0) {
            throw arg0;
        },
        __wbg___wbindgen_shl_edb503bb48d9ce9e: function(arg0, arg1) {
            const ret = arg0 << arg1;
            return ret;
        },
        __wbg___wbindgen_shr_ad10001a7b001d7f: function(arg0, arg1) {
            const ret = arg0 >> arg1;
            return ret;
        },
        __wbg___wbindgen_string_get_b0ca35b86a603356: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_sub_75d977ca7e0e5910: function(arg0, arg1) {
            const ret = arg0 - arg1;
            return ret;
        },
        __wbg___wbindgen_throw_344f42d3211c4765: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg___wbindgen_try_into_number_7d6e501e1d68d326: function(arg0) {
            let result;
            try { result = +arg0 } catch (e) { result = e }
            const ret = result;
            return ret;
        },
        __wbg___wbindgen_typeof_b1bf2ff71f77b13e: function(arg0) {
            const ret = typeof arg0;
            return ret;
        },
        __wbg___wbindgen_unsigned_shr_9e868de87f5386a8: function(arg0, arg1) {
            const ret = arg0 >>> arg1;
            return ret;
        },
        __wbg__wbg_cb_unref_fffb441def202758: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_abort_5e52e86f3b904d19: function(arg0) {
            const ret = AbortSignal.abort(arg0);
            return ret;
        },
        __wbg_abort_8bae0f33e7833997: function(arg0) {
            arg0.abort();
        },
        __wbg_abort_eee9248a6d680839: function(arg0, arg1) {
            arg0.abort(arg1);
        },
        __wbg_abort_ff982e6226e6d345: function() {
            const ret = AbortSignal.abort();
            return ret;
        },
        __wbg_aborted_2b7b403d16663f24: function(arg0) {
            const ret = arg0.aborted;
            return ret;
        },
        __wbg_abs_ffaffa30bcccf2d8: function(arg0) {
            const ret = Math.abs(arg0);
            return ret;
        },
        __wbg_accessKeyLabel_683e22efa9a8273a: function(arg0, arg1) {
            const ret = arg1.accessKeyLabel;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_accessKey_a38ec907ee3a4b3c: function(arg0, arg1) {
            const ret = arg1.accessKey;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_acos_325643a4ad9f211c: function(arg0) {
            const ret = Math.acos(arg0);
            return ret;
        },
        __wbg_acosh_52c484a96477b0a1: function(arg0) {
            const ret = Math.acosh(arg0);
            return ret;
        },
        __wbg_activeElement_4bc99dc1a7094c27: function(arg0) {
            const ret = arg0.activeElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_activeVRDisplays_44bcd4d0a66417c3: function(arg0) {
            const ret = arg0.activeVRDisplays;
            return ret;
        },
        __wbg_adapterInfo_092e774447fcfdf0: function(arg0) {
            const ret = arg0.adapterInfo;
            return ret;
        },
        __wbg_addEventListener_109ae44e5cc4d506: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0);
        }, arguments); },
        __wbg_addEventListener_589856accb324eb0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0, arg5 === 0xFFFFFF ? undefined : arg5 !== 0);
        }, arguments); },
        __wbg_addEventListener_d85450ee1320c989: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_addListener_b5b7f95360b22984: function() { return handleError(function (arg0, arg1) {
            arg0.addListener(arg1);
        }, arguments); },
        __wbg_adoptNode_343e7c41c142aa09: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.adoptNode(arg1);
            return ret;
        }, arguments); },
        __wbg_adoptedStyleSheets_4e7f54b083e68092: function(arg0) {
            const ret = arg0.adoptedStyleSheets;
            return ret;
        },
        __wbg_after_06d32662c1919a96: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.after(arg1, arg2, arg3);
        }, arguments); },
        __wbg_after_0773caa8b31cb9c5: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.after(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_after_209b125e0edc9bb5: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.after(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_after_32adee03c8939590: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.after(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_after_38874470eb2a2ae0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.after(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_after_4f292ff23ac5b3e6: function() { return handleError(function (arg0) {
            arg0.after();
        }, arguments); },
        __wbg_after_6547c441f7120939: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.after(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_after_6615bb87709299c0: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.after(arg1, arg2);
        }, arguments); },
        __wbg_after_6b350b47d97c3de9: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.after(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_after_7228aa382912a6a4: function() { return handleError(function (arg0) {
            arg0.after();
        }, arguments); },
        __wbg_after_79b0be61dacede79: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.after(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }, arguments); },
        __wbg_after_86a454002f090b3f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.after(arg1, arg2, arg3, arg4, arg5, arg6);
        }, arguments); },
        __wbg_after_b446a35781f9750b: function() { return handleError(function (arg0, arg1) {
            arg0.after(...arg1);
        }, arguments); },
        __wbg_after_b84e9f25f2f1e791: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.after(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_after_c77c5eb3d1f44fd5: function() { return handleError(function (arg0, arg1) {
            arg0.after(...arg1);
        }, arguments); },
        __wbg_after_df018acb2f2ec6ea: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.after(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_after_df67c635bd3c3bdc: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.after(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_after_eecfd092d63e92e9: function() { return handleError(function (arg0, arg1) {
            arg0.after(arg1);
        }, arguments); },
        __wbg_alert_007f258dceb5a5db: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.alert(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_alert_c55c0774429100c1: function() { return handleError(function (arg0) {
            arg0.alert();
        }, arguments); },
        __wbg_align_c1d47cc090e772a0: function(arg0, arg1) {
            const ret = arg1.align;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_allSettled_263aedb5f1e674ba: function(arg0) {
            const ret = Promise.allSettled(arg0);
            return ret;
        },
        __wbg_all_aa886891c0b624c8: function(arg0) {
            const ret = Promise.all(arg0);
            return ret;
        },
        __wbg_allocationSize_d197df2ee1229671: function() { return handleError(function (arg0) {
            const ret = arg0.allocationSize();
            return ret;
        }, arguments); },
        __wbg_altKey_50f830d1793a2eea: function(arg0) {
            const ret = arg0.altKey;
            return ret;
        },
        __wbg_altKey_f3e24c4c9cfcf271: function(arg0) {
            const ret = arg0.altKey;
            return ret;
        },
        __wbg_alt_8c55990bd40fb1e3: function(arg0, arg1) {
            const ret = arg1.alt;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_angle_84c37074181add82: function() { return handleError(function (arg0) {
            const ret = arg0.angle;
            return ret;
        }, arguments); },
        __wbg_animate_8f41e2f47c7d04ab: function(arg0, arg1, arg2) {
            const ret = arg0.animate(arg1, arg2);
            return ret;
        },
        __wbg_any_a57fdb241e47190d: function(arg0) {
            const ret = AbortSignal.any(arg0);
            return ret;
        },
        __wbg_any_be1608f9272c2567: function(arg0) {
            const ret = Promise.any(arg0);
            return ret;
        },
        __wbg_appCodeName_0a0d16127df25f84: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.appCodeName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_appCodeName_adb822ef91fb4248: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.appCodeName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_appName_2263c5af98cc7df6: function(arg0, arg1) {
            const ret = arg1.appName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_appName_960747be68a049cc: function(arg0, arg1) {
            const ret = arg1.appName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_appVersion_83b9668129f78c9f: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.appVersion;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_appVersion_cdbae86ff4a83188: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.appVersion;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_appendChild_f553e8704c4f14a6: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.appendChild(arg1);
            return ret;
        }, arguments); },
        __wbg_append_079ee586d66a9eab: function() { return handleError(function (arg0) {
            arg0.append();
        }, arguments); },
        __wbg_append_12ffdc1276bac666: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_append_15d8ce488b7792e6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.append(arg1, arg2, arg3, arg4, arg5, arg6);
        }, arguments); },
        __wbg_append_176f41f25706aa6c: function() { return handleError(function (arg0, arg1) {
            arg0.append(...arg1);
        }, arguments); },
        __wbg_append_1a619adc9c093baa: function() { return handleError(function (arg0, arg1) {
            arg0.append(...arg1);
        }, arguments); },
        __wbg_append_1fc952e0970d8db4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_append_23887873db35617e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.append(arg1, arg2, arg3);
        }, arguments); },
        __wbg_append_25858910a56a06f8: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.append(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_append_2c2e338a7ab64d55: function() { return handleError(function (arg0, arg1) {
            arg0.append(...arg1);
        }, arguments); },
        __wbg_append_6a2a99c06c578a7b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.append(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }, arguments); },
        __wbg_append_6c3c5a4e89d0c763: function() { return handleError(function (arg0, arg1) {
            arg0.append(arg1);
        }, arguments); },
        __wbg_append_74acb34749cb3022: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_append_7bc044cbd9920332: function() { return handleError(function (arg0) {
            arg0.append();
        }, arguments); },
        __wbg_append_7cb71f7edd443686: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_append_7d64748c7936e071: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_append_85c5e3224853d822: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.append(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_append_88884982ee3e15a6: function() { return handleError(function (arg0) {
            arg0.append();
        }, arguments); },
        __wbg_append_93042686e5c5fc0c: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.append(arg1, arg2);
        }, arguments); },
        __wbg_append_96c0aa0de20a8ab1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_append_9def942c680567be: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.append(arg1, arg2, arg3);
        }, arguments); },
        __wbg_append_a62de6cbb4cd692c: function() { return handleError(function (arg0, arg1) {
            arg0.append(arg1);
        }, arguments); },
        __wbg_append_a847d48bbce0bb47: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.append(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_append_af0257626df44691: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.append(arg1, arg2, arg3, arg4, arg5, arg6);
        }, arguments); },
        __wbg_append_b2d76bdcbdcd07bf: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_append_b6f18b5380009605: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.append(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_append_bf89d8afa3ef3758: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_append_c114aaa32d677b80: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_append_c777aaecb101c8bb: function() { return handleError(function (arg0, arg1) {
            arg0.append(...arg1);
        }, arguments); },
        __wbg_append_c77900b253b36455: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_append_ce17587de615ff37: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.append(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_append_ce7735ff657b8d31: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.append(arg1, arg2);
        }, arguments); },
        __wbg_append_d36779f005a52a49: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_append_e86a5c26ad79333e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.append(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }, arguments); },
        __wbg_append_eb80227084d72f45: function() { return handleError(function (arg0) {
            arg0.append();
        }, arguments); },
        __wbg_append_f4265dbe91538e82: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_append_fd7e6187fdc5d12c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_architecture_f38729714a4e4ba8: function(arg0, arg1) {
            const ret = arg1.architecture;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_arrayBuffer_a158e423a87ee756: function(arg0) {
            const ret = arg0.arrayBuffer();
            return ret;
        },
        __wbg_asIntN_b456de16b5701733: function(arg0, arg1) {
            const ret = BigInt.asIntN(arg0, arg1);
            return ret;
        },
        __wbg_asUintN_cf959278d4e0aaa0: function(arg0, arg1) {
            const ret = BigInt.asUintN(arg0, arg1);
            return ret;
        },
        __wbg_asin_9513da367a9112a6: function(arg0) {
            const ret = Math.asin(arg0);
            return ret;
        },
        __wbg_asinh_d379e7d630a4fe00: function(arg0) {
            const ret = Math.asinh(arg0);
            return ret;
        },
        __wbg_assert_0d938b2809f565c4: function(arg0, arg1) {
            console.assert(arg0 !== 0, arg1);
        },
        __wbg_assert_17a29835a871471c: function(arg0, arg1, arg2, arg3) {
            console.assert(arg0 !== 0, arg1, arg2, arg3);
        },
        __wbg_assert_3b759a8b91bce7cc: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.assert(arg0 !== 0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_assert_42b9644647ef88fc: function(arg0) {
            console.assert(arg0 !== 0);
        },
        __wbg_assert_4583b7778b8756de: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.assert(arg0 !== 0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_assert_46872ba52ce15b9e: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            console.assert(arg0 !== 0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        },
        __wbg_assert_8e81771c623dd9d5: function(arg0, arg1, arg2) {
            console.assert(arg0 !== 0, arg1, arg2);
        },
        __wbg_assert_984eb54bbe6814bd: function(arg0, arg1) {
            console.assert(arg0 !== 0, ...arg1);
        },
        __wbg_assert_c56943cc350d8ddc: function() {
            console.assert();
        },
        __wbg_assert_cbd4238fdb8e1107: function(arg0, arg1, arg2, arg3, arg4) {
            console.assert(arg0 !== 0, arg1, arg2, arg3, arg4);
        },
        __wbg_asyncIterator_6507fe0ec70c68c6: function() {
            const ret = Symbol.asyncIterator;
            return ret;
        },
        __wbg_async_37b7cd4cbabb646c: function(arg0) {
            const ret = arg0.async;
            return ret;
        },
        __wbg_at_1c1ff17bf3ad7754: function(arg0, arg1, arg2) {
            const ret = arg1.at(arg2);
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_at_1e380e062f4115ae: function(arg0, arg1, arg2) {
            const ret = arg1.at(arg2);
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_at_238df75b7290c408: function(arg0, arg1, arg2) {
            const ret = arg1.at(arg2);
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_at_34cac582a9c9468f: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >> 0;
        },
        __wbg_at_3ab413e5f53d50fc: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_at_50a3d4ffe4b6ef84: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_at_78a95399841be950: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_at_83b72b8cd37767f3: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_at_b5704590eaf872f9: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_at_bd0ec5e5b99e0302: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : Math.fround(ret);
        },
        __wbg_at_be3d452be11dbfa8: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_at_bf16e12d521123fd: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_at_fa7d6a72f1c545a9: function(arg0, arg1) {
            const ret = arg0.at(arg1);
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : Math.fround(ret);
        },
        __wbg_atan2_6eaf864d302723b8: function(arg0, arg1) {
            const ret = Math.atan2(arg0, arg1);
            return ret;
        },
        __wbg_atan_da33123bdc0783c9: function(arg0) {
            const ret = Math.atan(arg0);
            return ret;
        },
        __wbg_atanh_76ff23e44de5af46: function(arg0) {
            const ret = Math.atanh(arg0);
            return ret;
        },
        __wbg_atob_a0344522e34088aa: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.atob(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_atob_bc0b28dbf8cb8c2e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.atob(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_autofocus_6c2684ff1f7a1268: function(arg0) {
            const ret = arg0.autofocus;
            return ret;
        },
        __wbg_autoplay_5d50981647c9f219: function(arg0) {
            const ret = arg0.autoplay;
            return ret;
        },
        __wbg_availHeight_436c378c48684906: function() { return handleError(function (arg0) {
            const ret = arg0.availHeight;
            return ret;
        }, arguments); },
        __wbg_availLeft_d9439538e73ceaee: function() { return handleError(function (arg0) {
            const ret = arg0.availLeft;
            return ret;
        }, arguments); },
        __wbg_availTop_28ef8daf244c7def: function() { return handleError(function (arg0) {
            const ret = arg0.availTop;
            return ret;
        }, arguments); },
        __wbg_availWidth_0d54fec2bf303e16: function() { return handleError(function (arg0) {
            const ret = arg0.availWidth;
            return ret;
        }, arguments); },
        __wbg_baseURI_c671f15fd795f3db: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.baseURI;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_base_name_0602bfc56b21475a: function(arg0) {
            const ret = arg0.baseName;
            return ret;
        },
        __wbg_before_057910b7f16371b6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.before(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_before_2caeca59fd07d36a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.before(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }, arguments); },
        __wbg_before_2ea1abb6a39e5a85: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.before(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_before_4fb86e7d7f42e244: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.before(arg1, arg2, arg3);
        }, arguments); },
        __wbg_before_504153bb85be4492: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.before(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_before_6204d5fa5d6677b2: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.before(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_before_76c07f6784a8f153: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.before(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_before_8140026c48b54af3: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.before(arg1, arg2, arg3, arg4, arg5, arg6);
        }, arguments); },
        __wbg_before_9f3672471765680a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.before(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_before_a2a880ac39618a79: function() { return handleError(function (arg0, arg1) {
            arg0.before(...arg1);
        }, arguments); },
        __wbg_before_d0b01e57cd8d2b88: function() { return handleError(function (arg0, arg1) {
            arg0.before(arg1);
        }, arguments); },
        __wbg_before_d4c25004a2cb1681: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.before(arg1, arg2);
        }, arguments); },
        __wbg_before_d5ae146929f64a84: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.before(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_before_d8291d347fd9e141: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.before(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_before_db64f02704143ec1: function() { return handleError(function (arg0, arg1) {
            arg0.before(...arg1);
        }, arguments); },
        __wbg_before_dd3e830582f17bfc: function() { return handleError(function (arg0) {
            arg0.before();
        }, arguments); },
        __wbg_before_e9f04c58e60b9416: function() { return handleError(function (arg0) {
            arg0.before();
        }, arguments); },
        __wbg_before_f8e8c961afbdf0fe: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.before(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_beginComputePass_43b0c6751d870fcf: function(arg0, arg1) {
            const ret = arg0.beginComputePass(arg1);
            return ret;
        },
        __wbg_beginComputePass_c22430569b83a84a: function(arg0) {
            const ret = arg0.beginComputePass();
            return ret;
        },
        __wbg_beginOcclusionQuery_258903e0012f8d0b: function(arg0, arg1) {
            arg0.beginOcclusionQuery(arg1 >>> 0);
        },
        __wbg_beginRenderPass_865cbdfaecf89f93: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.beginRenderPass(arg1);
            return ret;
        }, arguments); },
        __wbg_blockSize_5af477b962b2b031: function(arg0) {
            const ret = arg0.blockSize;
            return ret;
        },
        __wbg_blur_bd2cb6edd9f9f09f: function() { return handleError(function (arg0) {
            arg0.blur();
        }, arguments); },
        __wbg_blur_e902dcc79406e89c: function() { return handleError(function (arg0) {
            arg0.blur();
        }, arguments); },
        __wbg_body_40ec34e0a2931fe8: function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_borderBoxSize_ff7f5405dcc6554e: function(arg0) {
            const ret = arg0.borderBoxSize;
            return ret;
        },
        __wbg_border_ef145244b100c7f0: function(arg0, arg1) {
            const ret = arg1.border;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_bottom_e6ed49b80d965dae: function(arg0) {
            const ret = arg0.bottom;
            return ret;
        },
        __wbg_boundingClientRect_0776888095b16b8c: function(arg0) {
            const ret = arg0.boundingClientRect;
            return ret;
        },
        __wbg_brand_3bc196a43eceb8af: function(arg0, arg1) {
            const ret = arg1.brand;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_brands_b7dcf262485c3e7c: function(arg0) {
            const ret = arg0.brands;
            return ret;
        },
        __wbg_btoa_7e6fbd5fcda1260e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.btoa(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_btoa_8040fa178275d917: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.btoa(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_bubbles_07bec919f30033ab: function(arg0) {
            const ret = arg0.bubbles;
            return ret;
        },
        __wbg_buffer_0f212447ac64c53b: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_1238f2449a89002d: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_233df66b6f325d32: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_54b87055582c8a81: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_588d396808b6c583: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_58d81a4ce8bed033: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_6edcf68879f874fc: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_9f531b545738de39: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_a4db72d57272966b: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_cb8ae3a7c76cbf4a: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_dbba9af9ae5e8d70: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_dd4a6db812895671: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_f4eea4d59f45bb38: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_buffer_fd608aae012f1b9f: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_button_f6a9a7b725f1838e: function(arg0) {
            const ret = arg0.button;
            return ret;
        },
        __wbg_buttons_d8acd46cf8f40ae9: function(arg0) {
            const ret = arg0.buttons;
            return ret;
        },
        __wbg_byteLength_022a2c5c06baa70d: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_41862ca4020b9c43: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_45e3c2280ba6f978: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_47eafd0bff4dce39: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_55880514502c081d: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_674fc1986a52e7fe: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_6b10f410298d0233: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_95878c980ed21641: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_9e9ec2061108e3fb: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_a0707d81b05b7e38: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_a7f5d15834323fa1: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_b449ddccf9a5f01d: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_b5784f4992d081a8: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_f50a48f0f20a152d: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteLength_fd70c55073d97a43: function(arg0) {
            const ret = arg0.byteLength;
            return ret;
        },
        __wbg_byteOffset_33d9154f6df5f6c5: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_40c72d2e7cfd15b3: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_4ba12bc779acef1d: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_6a23587bfab46afa: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_a2fdc138a14fdf59: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_afcce1906272d326: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_b6d5fd1685a295b0: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_c0c8694e5a3d0b99: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_c3e4d3d081212e29: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_d38ab86af9bfd325: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_d42e18c4441f628b: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_dfd5ecc433a8368d: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_byteOffset_f2e161f7a5af4290: function(arg0) {
            const ret = arg0.byteOffset;
            return ret;
        },
        __wbg_bytes_5156fa63947f9e90: function(arg0) {
            const ret = arg0.bytes();
            return ret;
        },
        __wbg_calendar_7e27b421e1c90c3a: function(arg0) {
            const ret = arg0.calendar;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_call_8a2dd23819f8a60a: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_a6e5c5dce5018821: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_canPlayType_f5ce3c2619780cf2: function(arg0, arg1, arg2, arg3) {
            const ret = arg1.canPlayType(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_canShare_e28e1e566530c073: function(arg0) {
            const ret = arg0.canShare();
            return ret;
        },
        __wbg_cancelAnimationFrame_086d6084925c4e06: function() { return handleError(function (arg0, arg1) {
            arg0.cancelAnimationFrame(arg1);
        }, arguments); },
        __wbg_cancelBubble_5b5f51787bb379dc: function(arg0) {
            const ret = arg0.cancelBubble;
            return ret;
        },
        __wbg_cancelIdleCallback_b9e469156370a1e5: function(arg0, arg1) {
            arg0.cancelIdleCallback(arg1 >>> 0);
        },
        __wbg_cancel_65f38182e2eeac5c: function(arg0) {
            arg0.cancel();
        },
        __wbg_cancelable_72abf4180e264ab2: function(arg0) {
            const ret = arg0.cancelable;
            return ret;
        },
        __wbg_canvas_b6a15d1dd84c23a1: function(arg0) {
            const ret = arg0.canvas;
            return ret;
        },
        __wbg_captureEvents_2f2a00f1032edb8d: function(arg0) {
            arg0.captureEvents();
        },
        __wbg_case_first_66e2853d17def7df: function(arg0) {
            const ret = arg0.caseFirst;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_catch_c1a60df4c30d76d3: function(arg0, arg1) {
            const ret = arg0.catch(arg1);
            return ret;
        },
        __wbg_cause_5eb2f50e6f22fd6c: function(arg0) {
            const ret = arg0.cause;
            return ret;
        },
        __wbg_cbrt_f36c846baf1bb15b: function(arg0) {
            const ret = Math.cbrt(arg0);
            return ret;
        },
        __wbg_ceil_bb1a51dcb66517d9: function(arg0) {
            const ret = Math.ceil(arg0);
            return ret;
        },
        __wbg_charAt_104e7726047d53f3: function(arg0, arg1) {
            const ret = arg0.charAt(arg1 >>> 0);
            return ret;
        },
        __wbg_charCodeAt_2a30bc7c17474cc6: function(arg0, arg1) {
            const ret = arg0.charCodeAt(arg1 >>> 0);
            return ret;
        },
        __wbg_charCode_739feacaa07dec08: function(arg0) {
            const ret = arg0.charCode;
            return ret;
        },
        __wbg_characterSet_b8412f7ed3c098f1: function(arg0, arg1) {
            const ret = arg1.characterSet;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_charset_f2a032d34af7ffc0: function(arg0, arg1) {
            const ret = arg1.charset;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_childElementCount_02cdc7dd82dc3bf9: function(arg0) {
            const ret = arg0.childElementCount;
            return ret;
        },
        __wbg_childElementCount_4c6f7be2f93e9961: function(arg0) {
            const ret = arg0.childElementCount;
            return ret;
        },
        __wbg_childNodes_c4fcb612cf4b6de1: function(arg0) {
            const ret = arg0.childNodes;
            return ret;
        },
        __wbg_className_e522d33630cb9937: function(arg0, arg1) {
            const ret = arg1.className;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_clearBuffer_1a66bf0852937316: function(arg0, arg1, arg2) {
            arg0.clearBuffer(arg1, arg2);
        },
        __wbg_clearBuffer_58a508395b832bbf: function(arg0, arg1, arg2, arg3) {
            arg0.clearBuffer(arg1, arg2, arg3 >>> 0);
        },
        __wbg_clearBuffer_59e5bf520d7c8b51: function(arg0, arg1) {
            arg0.clearBuffer(arg1);
        },
        __wbg_clearBuffer_8b28969d396ae40b: function(arg0, arg1, arg2, arg3) {
            arg0.clearBuffer(arg1, arg2, arg3);
        },
        __wbg_clearBuffer_9cc624bde5f42d2d: function(arg0, arg1, arg2, arg3) {
            arg0.clearBuffer(arg1, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_clearBuffer_c5a207db32737b5a: function(arg0, arg1, arg2, arg3) {
            arg0.clearBuffer(arg1, arg2 >>> 0, arg3);
        },
        __wbg_clearBuffer_cba31f50211a34a8: function(arg0, arg1, arg2) {
            arg0.clearBuffer(arg1, arg2 >>> 0);
        },
        __wbg_clearInterval_2e2069e95ad09d4f: function(arg0, arg1) {
            arg0.clearInterval(arg1);
        },
        __wbg_clearInterval_9f55b79cf2100470: function(arg0, arg1) {
            arg0.clearInterval(arg1);
        },
        __wbg_clearInterval_bee8bbcc18c1d88e: function(arg0) {
            arg0.clearInterval();
        },
        __wbg_clearInterval_e5201a083a22f74b: function(arg0) {
            arg0.clearInterval();
        },
        __wbg_clearTimeout_0bf8130fa6abba3a: function(arg0) {
            arg0.clearTimeout();
        },
        __wbg_clearTimeout_85d0e8c9a61f2d3a: function(arg0, arg1) {
            arg0.clearTimeout(arg1);
        },
        __wbg_clearTimeout_8f6e1bb5acdf8291: function(arg0) {
            arg0.clearTimeout();
        },
        __wbg_clearTimeout_8f80437be2324e09: function(arg0, arg1) {
            arg0.clearTimeout(arg1);
        },
        __wbg_clear_b9863ce80bd06b3f: function() {
            console.clear();
        },
        __wbg_click_22281da934e153f5: function(arg0) {
            arg0.click();
        },
        __wbg_clientHeight_994541cde34d3ca0: function(arg0) {
            const ret = arg0.clientHeight;
            return ret;
        },
        __wbg_clientLeft_bdcddc3e40fccaa7: function(arg0) {
            const ret = arg0.clientLeft;
            return ret;
        },
        __wbg_clientTop_e520b4852e059784: function(arg0) {
            const ret = arg0.clientTop;
            return ret;
        },
        __wbg_clientWidth_6852617da948be39: function(arg0) {
            const ret = arg0.clientWidth;
            return ret;
        },
        __wbg_clientX_a7dcb4081126cd4b: function(arg0) {
            const ret = arg0.clientX;
            return ret;
        },
        __wbg_clientY_c0560910b20ee192: function(arg0) {
            const ret = arg0.clientY;
            return ret;
        },
        __wbg_cloneNode_5f99da4333e10617: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.cloneNode(arg1 !== 0);
            return ret;
        }, arguments); },
        __wbg_cloneNode_cec725abcb361e80: function() { return handleError(function (arg0) {
            const ret = arg0.cloneNode();
            return ret;
        }, arguments); },
        __wbg_clone_ff14d56a80017780: function() { return handleError(function (arg0) {
            const ret = arg0.clone();
            return ret;
        }, arguments); },
        __wbg_close_3423cc7dafc477bb: function(arg0) {
            arg0.close();
        },
        __wbg_close_90cc288ec0e6eb50: function() { return handleError(function (arg0) {
            arg0.close();
        }, arguments); },
        __wbg_close_adb3a7073894d04e: function(arg0) {
            arg0.close();
        },
        __wbg_close_b7f7a81586d09595: function(arg0) {
            arg0.close();
        },
        __wbg_closed_a9e0ba86bfa233c0: function() { return handleError(function (arg0) {
            const ret = arg0.closed;
            return ret;
        }, arguments); },
        __wbg_closest_d889c758da4bb13b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.closest(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_clz32_da93d1ac8dce1305: function(arg0) {
            const ret = Math.clz32(arg0);
            return ret;
        },
        __wbg_codePointAt_c621746f94c11958: function(arg0, arg1) {
            const ret = arg0.codePointAt(arg1 >>> 0);
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_codePointAt_ebd6d9bd1f1ee816: function(arg0, arg1) {
            const ret = arg0.codePointAt(arg1 >>> 0);
            return ret;
        },
        __wbg_code_89c999e407c79eef: function(arg0, arg1) {
            const ret = arg1.code;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_code_cb4327cfc515673b: function(arg0) {
            const ret = arg0.code;
            return ret;
        },
        __wbg_codedHeight_58ce877b12d394ea: function(arg0) {
            const ret = arg0.codedHeight;
            return ret;
        },
        __wbg_codedRect_fec6eea701954f55: function(arg0) {
            const ret = arg0.codedRect;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_codedWidth_bd5a46bfc634df43: function(arg0) {
            const ret = arg0.codedWidth;
            return ret;
        },
        __wbg_collation_bd48d58f7b705993: function(arg0) {
            const ret = arg0.collation;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_colorDepth_c2810ee84ae692c3: function() { return handleError(function (arg0) {
            const ret = arg0.colorDepth;
            return ret;
        }, arguments); },
        __wbg_columnNumber_6cb60fbfac26958d: function(arg0) {
            const ret = arg0.columnNumber;
            return ret;
        },
        __wbg_compareDocumentPosition_2396436dc1fc2727: function(arg0, arg1) {
            const ret = arg0.compareDocumentPosition(arg1);
            return ret;
        },
        __wbg_compare_97c1748c91116e32: function(arg0) {
            const ret = arg0.compare;
            return ret;
        },
        __wbg_compatMode_be1641a1b8d9df20: function(arg0, arg1) {
            const ret = arg1.compatMode;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_compileStreaming_1f1bcb4569c31647: function(arg0) {
            const ret = WebAssembly.compileStreaming(arg0);
            return ret;
        },
        __wbg_compile_6372456a133997b2: function(arg0) {
            const ret = WebAssembly.compile(arg0);
            return ret;
        },
        __wbg_complete_590c59f0fb4902bd: function(arg0) {
            const ret = arg0.complete;
            return ret;
        },
        __wbg_composedPath_3d7ca98a55bce60f: function(arg0) {
            const ret = arg0.composedPath();
            return ret;
        },
        __wbg_composed_54555f5751938185: function(arg0) {
            const ret = arg0.composed;
            return ret;
        },
        __wbg_concat_2aa06260073610e2: function(arg0, arg1) {
            const ret = arg0.concat(arg1);
            return ret;
        },
        __wbg_concat_many_ca53282d86f1e17d: function(arg0, arg1, arg2) {
            const ret = arg0.concat_many(getArrayJsValueViewFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_configure_c0a3d80e97c0e7b1: function() { return handleError(function (arg0, arg1) {
            arg0.configure(arg1);
        }, arguments); },
        __wbg_confirm_7b650741ac476979: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.confirm(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_confirm_c1965ca3843bfb63: function() { return handleError(function (arg0) {
            const ret = arg0.confirm();
            return ret;
        }, arguments); },
        __wbg_construct_8e1a801612157ea1: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.construct(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_containing_97fe0fd82dbe7187: function(arg0, arg1) {
            const ret = arg0.containing(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_contains_7189b09a477442a6: function(arg0, arg1) {
            const ret = arg0.contains(arg1);
            return ret;
        },
        __wbg_contentBoxSize_74fbbc51859ff90e: function(arg0) {
            const ret = arg0.contentBoxSize;
            return ret;
        },
        __wbg_contentEditable_151c1e80991def11: function(arg0, arg1) {
            const ret = arg1.contentEditable;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_contentRect_1d6e15e2e0d3e3c3: function(arg0) {
            const ret = arg0.contentRect;
            return ret;
        },
        __wbg_contentType_68f1fa84fe9c663b: function(arg0, arg1) {
            const ret = arg1.contentType;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_controls_9a698aa573209dba: function(arg0) {
            const ret = arg0.controls;
            return ret;
        },
        __wbg_convertToBlob_5b26d021dffa831a: function() { return handleError(function (arg0) {
            const ret = arg0.convertToBlob();
            return ret;
        }, arguments); },
        __wbg_copyBufferToBuffer_37aba91b51093886: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4 >>> 0);
        }, arguments); },
        __wbg_copyBufferToBuffer_3b119149df2dc5eb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_copyBufferToBuffer_7faf9d5a8db560ca: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_copyBufferToBuffer_98dd08ad2ccd3e43: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4 >>> 0, arg5);
        }, arguments); },
        __wbg_copyBufferToBuffer_9d5b0cdd73a016b1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.copyBufferToBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0);
        }, arguments); },
        __wbg_copyBufferToBuffer_9e5aea97d7828aa3: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_copyBufferToBuffer_a9a03ae37accafd8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2 >>> 0, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_copyBufferToBuffer_b01074f9588d6616: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_copyBufferToBuffer_cb7ec6450fedb34b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2 >>> 0, arg3, arg4, arg5);
        }, arguments); },
        __wbg_copyBufferToBuffer_d504e42fdee3d624: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.copyBufferToBuffer(arg1, arg2 >>> 0, arg3, arg4);
        }, arguments); },
        __wbg_copyBufferToBuffer_dc1efc9d968aff84: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0, arg5);
        }, arguments); },
        __wbg_copyBufferToBuffer_ddc3e4afc1d14f33: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_copyBufferToTexture_46f05a7a84552c50: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyBufferToTexture(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyBufferToTexture_830f164b1b709e29: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyBufferToTexture(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyExternalImageToTexture_305b23364c470d9e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyExternalImageToTexture(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyExternalImageToTexture_f26a51f2c13af3fe: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyExternalImageToTexture(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyTextureToBuffer_a9b82ac765521aab: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyTextureToBuffer(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyTextureToBuffer_d4d5b0e92cffa455: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyTextureToBuffer(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyTextureToTexture_bb85c4b0b746d312: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyTextureToTexture(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyTextureToTexture_c9d4d27300d9c138: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.copyTextureToTexture(arg1, arg2, arg3);
        }, arguments); },
        __wbg_copyWithin_03acb2eb7b110e9b: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_3085fab8a7a21f0a: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_37aebd788bc85bbf: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_427a1be3f6c178a8: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_4351b81c28279e6f: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_4414443214ab62f7: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_4c32f3cd758246f5: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_73d1a67d3ff87fb5: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_8807acb14791e7e6: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_aca1eb8fe0e6d474: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_ae8e82e403bdd4f3: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_copyWithin_de6f167ace4a2e23: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.copyWithin(arg1, arg2, arg3);
            return ret;
        },
        __wbg_cos_1b28cdb8d5ae37b9: function(arg0) {
            const ret = Math.cos(arg0);
            return ret;
        },
        __wbg_cosh_88ec8cbb26d336b3: function(arg0) {
            const ret = Math.cosh(arg0);
            return ret;
        },
        __wbg_countReset_29cb480e951a8de3: function(arg0, arg1) {
            console.countReset(getStringFromWasm0(arg0, arg1));
        },
        __wbg_countReset_9678a6cfb16a884f: function() {
            console.countReset();
        },
        __wbg_count_05c0f21ab3f9b2f9: function(arg0, arg1) {
            console.count(getStringFromWasm0(arg0, arg1));
        },
        __wbg_count_2f6ca10b3370f1d3: function(arg0) {
            const ret = arg0.count;
            return ret;
        },
        __wbg_count_8c0f2b3fd43a317b: function() {
            console.count();
        },
        __wbg_createBindGroupLayout_59891d473ac8665d: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createBindGroupLayout(arg1);
            return ret;
        }, arguments); },
        __wbg_createBindGroup_4cb86ff853df5c69: function(arg0, arg1) {
            const ret = arg0.createBindGroup(arg1);
            return ret;
        },
        __wbg_createBuffer_3fa0256cba655273: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createBuffer(arg1);
            return ret;
        }, arguments); },
        __wbg_createCommandEncoder_11ff934155cce39d: function(arg0) {
            const ret = arg0.createCommandEncoder();
            return ret;
        },
        __wbg_createCommandEncoder_98e3b731629054b4: function(arg0, arg1) {
            const ret = arg0.createCommandEncoder(arg1);
            return ret;
        },
        __wbg_createComputePipelineAsync_01839c6557505b0d: function(arg0, arg1) {
            const ret = arg0.createComputePipelineAsync(arg1);
            return ret;
        },
        __wbg_createComputePipeline_9d101515d504e110: function(arg0, arg1) {
            const ret = arg0.createComputePipeline(arg1);
            return ret;
        },
        __wbg_createElementNS_013b3fb26f4796ec: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_createElementNS_7b45568b261a3a34: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
            return ret;
        }, arguments); },
        __wbg_createElement_eaba52e6da21cc60: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.createElement(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_createElement_fcbc0805de826d62: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_createEvent_c6b6f6d11db60b83: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createEvent(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_05ef1e9ed2121a77: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_073896e67f484394: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_18b34be164ae3acf: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_201cc1f85e348d89: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_21351f9df94ae2d7: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_34acfd3951552110: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_3cc85ba341666cd6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_414c6b538e60e6bd: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_4177f4ded9cd7891: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_470d9df3903b2197: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_48ffdc4d676bb114: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_49c9cd0242c0548d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_49fe4243c8d03689: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_4c4d2250ef203dac: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_4cacac0d8a33f081: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_4e311b94d2494f53: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_55e6a43b64dea0dd: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_5971c199ac9afbe1: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_5bf67b4af57ad179: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_5dbcdc6d11d377bd: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_5e2f13bd9707526d: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_6270f48b79eccc8f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_69cfaec1b62eec10: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_70894ec40e25b599: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_71a207accd2fb8c2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_73e9459f362dabc4: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_7746b56a514e8308: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_78e718ff38520696: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_7aa9fb5d0441d79b: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_7bf959d9e0dffbad: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_7c54c548c7ad1f9e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_7fb1605709e0e6c5: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_82312dce73edd37b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_8304dca70cf8bb72: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_856e8a81597fab44: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_8d28db5ab99f5220: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_8de4fba435154f18: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_92cc8e48e129e51d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_965f9a2b1169feac: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_98d385a709e23be1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_a0ca35f7c031350b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_a20a3b28be1e2b40: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_a7bd838ca71146a0: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_a98d374f732dea8b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_aafc16815632b5f9: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_ace1415c89240311: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_ae21b5b71439a07e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_af80a1ec5a02fe53: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_b0568ac525f7bb9f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_bbbee2bd2e25df2f: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_bc5bedbdf9a62820: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_bf05eb3b16408fe1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_c19b112c2c0b2f09: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_d2f982ea3b8708b4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_d5498987502e3716: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_dbb3729baba313bb: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_dcb65834de1122a3: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_e1656295d370e353: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_e3447a9379c9fa6b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_e55b3d5cdb215457: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_e8fdda7678b04029: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createImageBitmap(arg1);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_f562bafb59d088f6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_f77e7752827dcefc: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createImageBitmap(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_createImageBitmap_f7b217ee9fcfcfa3: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.createImageBitmap(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_createNSResolver_58656de671973124: function(arg0, arg1) {
            const ret = arg0.createNSResolver(arg1);
            return ret;
        },
        __wbg_createObjectURL_416e527781e6fd6d: function() { return handleError(function (arg0, arg1) {
            const ret = URL.createObjectURL(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_createPipelineLayout_270b4fd0b4230373: function(arg0, arg1) {
            const ret = arg0.createPipelineLayout(arg1);
            return ret;
        },
        __wbg_createQuerySet_062b688bddf6971f: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createQuerySet(arg1);
            return ret;
        }, arguments); },
        __wbg_createRenderBundleEncoder_c6c93cbb173c947e: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createRenderBundleEncoder(arg1);
            return ret;
        }, arguments); },
        __wbg_createRenderPipelineAsync_95c6a6c33201a5cd: function(arg0, arg1) {
            const ret = arg0.createRenderPipelineAsync(arg1);
            return ret;
        },
        __wbg_createRenderPipeline_4c120add6a62a442: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createRenderPipeline(arg1);
            return ret;
        }, arguments); },
        __wbg_createSampler_0bb015454d542b91: function(arg0) {
            const ret = arg0.createSampler();
            return ret;
        },
        __wbg_createSampler_95bff4f5405a3dd1: function(arg0, arg1) {
            const ret = arg0.createSampler(arg1);
            return ret;
        },
        __wbg_createShaderModule_f0aa469466c7bdaa: function(arg0, arg1) {
            const ret = arg0.createShaderModule(arg1);
            return ret;
        },
        __wbg_createTexture_28341edbcc7d129e: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createTexture(arg1);
            return ret;
        }, arguments); },
        __wbg_createView_7eb0c2739cd6ce69: function() { return handleError(function (arg0) {
            const ret = arg0.createView();
            return ret;
        }, arguments); },
        __wbg_createView_d04a0f9bdd723238: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.createView(arg1);
            return ret;
        }, arguments); },
        __wbg_crossOrigin_3a7595913e748e6f: function(arg0, arg1) {
            const ret = arg1.crossOrigin;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_crossOrigin_e8eb7aa46569fc3e: function(arg0, arg1) {
            const ret = arg1.crossOrigin;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_cssText_3328a7be1d25193a: function(arg0, arg1) {
            const ret = arg1.cssText;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_ctrlKey_2e52816fa7160097: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_ctrlKey_50bd8324959ca786: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_currentScript_640ca296ab696522: function(arg0) {
            const ret = arg0.currentScript;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_currentSrc_8101386db03b1d1b: function(arg0, arg1) {
            const ret = arg1.currentSrc;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_currentSrc_e5c500de6e13261d: function(arg0, arg1) {
            const ret = arg1.currentSrc;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_currentTarget_a8ed7ef60b89f253: function(arg0) {
            const ret = arg0.currentTarget;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_currentTime_bf4477d7ec91feea: function(arg0) {
            const ret = arg0.currentTime;
            return ret;
        },
        __wbg_customSections_3702745a55d47b3d: function(arg0, arg1, arg2) {
            const ret = WebAssembly.Module.customSections(arg0, getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_data_0965368f2b7f680a: function(arg0) {
            const ret = arg0.data;
            return ret;
        },
        __wbg_data_1396ceda978277ba: function(arg0) {
            const ret = arg0.data;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_data_d6abbdd903c05db4: function(arg0, arg1) {
            const ret = arg1.data;
            const ptr1 = passArray8ToWasm0(ret, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_days_b39568c9fd02d80c: function(arg0, arg1) {
            const ret = arg1.days;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_debug_1c383f748c703b83: function() {
            console.debug();
        },
        __wbg_debug_22efeb0c2a888720: function(arg0, arg1) {
            console.debug(arg0, arg1);
        },
        __wbg_debug_3aa21e2a19c76429: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.debug(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_debug_3d99dcfb5accf7bb: function(arg0, arg1, arg2, arg3, arg4) {
            console.debug(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_debug_42a6fcd9d74e106e: function(arg0) {
            console.debug(...arg0);
        },
        __wbg_debug_62071508c4c83e83: function(arg0, arg1, arg2) {
            console.debug(arg0, arg1, arg2);
        },
        __wbg_debug_87fd9b1a625b7efb: function(arg0) {
            console.debug(arg0);
        },
        __wbg_debug_cf53e2612c84e4ee: function(arg0, arg1, arg2, arg3) {
            console.debug(arg0, arg1, arg2, arg3);
        },
        __wbg_debug_daf67646fd0418aa: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.debug(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_decodeURIComponent_eeb2408cbb904737: function() { return handleError(function (arg0, arg1) {
            const ret = decodeURIComponent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_decodeURI_18a692a085393a8e: function() { return handleError(function (arg0, arg1) {
            const ret = decodeURI(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_decode_b7f9ea1cf06f8098: function(arg0) {
            const ret = arg0.decode();
            return ret;
        },
        __wbg_decoding_af99032cf152f79f: function(arg0, arg1) {
            const ret = arg1.decoding;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_defaultMuted_d2a5444d4b788dca: function(arg0) {
            const ret = arg0.defaultMuted;
            return ret;
        },
        __wbg_defaultPlaybackRate_4997a6b2ee5c2d7d: function(arg0) {
            const ret = arg0.defaultPlaybackRate;
            return ret;
        },
        __wbg_defaultPrevented_996f88f12d6fe393: function(arg0) {
            const ret = arg0.defaultPrevented;
            return ret;
        },
        __wbg_defaultView_825e0a4fbb97180d: function(arg0) {
            const ret = arg0.defaultView;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_deltaMode_d869228efd74f393: function(arg0) {
            const ret = arg0.deltaMode;
            return ret;
        },
        __wbg_deltaX_5d829ffba565ed10: function(arg0) {
            const ret = arg0.deltaX;
            return ret;
        },
        __wbg_deltaY_6cfce8f8da250c23: function(arg0) {
            const ret = arg0.deltaY;
            return ret;
        },
        __wbg_deltaZ_42c86f225c34aa04: function(arg0) {
            const ret = arg0.deltaZ;
            return ret;
        },
        __wbg_depthOrArrayLayers_7f8be8d9378f586a: function(arg0) {
            const ret = arg0.depthOrArrayLayers;
            return ret;
        },
        __wbg_description_f6ebcdce701b056b: function(arg0, arg1) {
            const ret = arg1.description;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_destroy_0e8b506c96c4a3d6: function(arg0) {
            arg0.destroy();
        },
        __wbg_destroy_813c330d26908724: function(arg0) {
            arg0.destroy();
        },
        __wbg_destroy_a1ad55d8110037a7: function(arg0) {
            arg0.destroy();
        },
        __wbg_destroy_ce807b0d8ddbb656: function(arg0) {
            arg0.destroy();
        },
        __wbg_detached_18ea05d62519f58b: function(arg0) {
            const ret = arg0.detached;
            return ret;
        },
        __wbg_detail_d5bf72d54e944c4a: function(arg0) {
            const ret = arg0.detail;
            return ret;
        },
        __wbg_devicePixelContentBoxSize_dca8701a53307aca: function(arg0) {
            const ret = arg0.devicePixelContentBoxSize;
            return ret;
        },
        __wbg_devicePixelRatio_1c0e0ed7deb19cd8: function(arg0) {
            const ret = arg0.devicePixelRatio;
            return ret;
        },
        __wbg_device_1ebafe67bf52c019: function(arg0, arg1) {
            const ret = arg1.device;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_dimension_a61ba270d9a1c7db: function(arg0) {
            const ret = arg0.dimension;
            return (__wbindgen_enum_GpuTextureDimension.indexOf(ret) + 1 || 4) - 1;
        },
        __wbg_dir_118769083fff2fef: function(arg0) {
            console.dir(arg0);
        },
        __wbg_dir_3375ade88d98b93c: function(arg0, arg1) {
            const ret = arg1.dir;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_dir_3ff550c918016b8e: function(arg0, arg1) {
            const ret = arg1.dir;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_dir_505f22437faad883: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.dir(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_dir_5a4f1c704da473d9: function(arg0, arg1) {
            console.dir(arg0, arg1);
        },
        __wbg_dir_61b5d1e472bb148f: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.dir(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_dir_788a2fb42c4d405f: function(arg0, arg1, arg2, arg3) {
            console.dir(arg0, arg1, arg2, arg3);
        },
        __wbg_dir_99445e8545993da9: function(arg0, arg1, arg2) {
            console.dir(arg0, arg1, arg2);
        },
        __wbg_dir_acc6feea0c066784: function(arg0, arg1, arg2, arg3, arg4) {
            console.dir(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_dir_afac9b7244263cc6: function(arg0) {
            console.dir(...arg0);
        },
        __wbg_dir_eea5f6a1e6c66802: function() {
            console.dir();
        },
        __wbg_direction_65ea6d30020aa7a3: function(arg0) {
            const ret = arg0.direction;
            return ret;
        },
        __wbg_dirxml_0122377c9d9497cc: function(arg0, arg1) {
            console.dirxml(arg0, arg1);
        },
        __wbg_dirxml_605a87ab84942379: function(arg0) {
            console.dirxml(arg0);
        },
        __wbg_dirxml_69f58b1fb560f15c: function(arg0, arg1, arg2) {
            console.dirxml(arg0, arg1, arg2);
        },
        __wbg_dirxml_6c63467d1f9d8538: function(arg0, arg1, arg2, arg3, arg4) {
            console.dirxml(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_dirxml_b9ce3f25bcf0b76c: function() {
            console.dirxml();
        },
        __wbg_dirxml_c452fc077a07f131: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.dirxml(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_dirxml_c71ed7b1b2e85461: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.dirxml(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_dirxml_c77e53b2510d930d: function(arg0) {
            console.dirxml(...arg0);
        },
        __wbg_dirxml_ca2ac44061341111: function(arg0, arg1, arg2, arg3) {
            console.dirxml(arg0, arg1, arg2, arg3);
        },
        __wbg_disconnect_39bfdcb35b1fc7b9: function(arg0) {
            arg0.disconnect();
        },
        __wbg_disconnect_491a6bfd82cdd887: function(arg0) {
            arg0.disconnect();
        },
        __wbg_dispatchEvent_ca78eaf3d469bc25: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.dispatchEvent(arg1);
            return ret;
        }, arguments); },
        __wbg_dispatchWorkgroupsIndirect_94154bd122d10b07: function(arg0, arg1, arg2) {
            arg0.dispatchWorkgroupsIndirect(arg1, arg2);
        },
        __wbg_dispatchWorkgroupsIndirect_c26774c1f7a7d95b: function(arg0, arg1, arg2) {
            arg0.dispatchWorkgroupsIndirect(arg1, arg2 >>> 0);
        },
        __wbg_dispatchWorkgroups_208814b961e8d955: function(arg0, arg1, arg2) {
            arg0.dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_dispatchWorkgroups_26f6198195c36ca4: function(arg0, arg1, arg2, arg3) {
            arg0.dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_dispatchWorkgroups_f115155453f29fd5: function(arg0, arg1) {
            arg0.dispatchWorkgroups(arg1 >>> 0);
        },
        __wbg_displayHeight_f06554969d4d6de8: function(arg0) {
            const ret = arg0.displayHeight;
            return ret;
        },
        __wbg_displayWidth_fdcc0a114d98d13e: function(arg0) {
            const ret = arg0.displayWidth;
            return ret;
        },
        __wbg_doNotTrack_cd45392c5eacf60b: function(arg0, arg1) {
            const ret = arg1.doNotTrack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_documentElement_b7ec99417969bfbc: function(arg0) {
            const ret = arg0.documentElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_documentURI_d9954a3f3d76c790: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.documentURI;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_document_179650d6cb13c263: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_done_89b2b13e91a60321: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_draggable_4470ea5c4cdd6d7f: function(arg0) {
            const ret = arg0.draggable;
            return ret;
        },
        __wbg_drawIndexedIndirect_1a1024b3ad58fd26: function(arg0, arg1, arg2) {
            arg0.drawIndexedIndirect(arg1, arg2 >>> 0);
        },
        __wbg_drawIndexedIndirect_412e325d0a761346: function(arg0, arg1, arg2) {
            arg0.drawIndexedIndirect(arg1, arg2);
        },
        __wbg_drawIndexedIndirect_9acfb1b4d30b4744: function(arg0, arg1, arg2) {
            arg0.drawIndexedIndirect(arg1, arg2 >>> 0);
        },
        __wbg_drawIndexedIndirect_e594d3740e91607c: function(arg0, arg1, arg2) {
            arg0.drawIndexedIndirect(arg1, arg2);
        },
        __wbg_drawIndexed_0874828e2e080afe: function(arg0, arg1) {
            arg0.drawIndexed(arg1 >>> 0);
        },
        __wbg_drawIndexed_7a3d9093aa5ff0df: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
        },
        __wbg_drawIndexed_9ff4d3205b519c2b: function(arg0, arg1, arg2) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_drawIndexed_b6fd33dc19a7cded: function(arg0, arg1, arg2, arg3) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_drawIndexed_bae1c5f8f7bad15a: function(arg0, arg1, arg2) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_drawIndexed_c5c881410da69535: function(arg0, arg1, arg2, arg3) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_drawIndexed_cc7c04c1088cafad: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
        },
        __wbg_drawIndexed_d7bd8b657d725c69: function(arg0, arg1) {
            arg0.drawIndexed(arg1 >>> 0);
        },
        __wbg_drawIndexed_de186e2b51eaaabf: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
        },
        __wbg_drawIndexed_ed0ab06f102e5dfb: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
        },
        __wbg_drawIndirect_3a312875b0451097: function(arg0, arg1, arg2) {
            arg0.drawIndirect(arg1, arg2 >>> 0);
        },
        __wbg_drawIndirect_558bbb74bb0158b7: function(arg0, arg1, arg2) {
            arg0.drawIndirect(arg1, arg2);
        },
        __wbg_drawIndirect_7163ad3319140d5a: function(arg0, arg1, arg2) {
            arg0.drawIndirect(arg1, arg2);
        },
        __wbg_drawIndirect_9f54f96d716873c5: function(arg0, arg1, arg2) {
            arg0.drawIndirect(arg1, arg2 >>> 0);
        },
        __wbg_draw_430f838c1dac13f2: function(arg0, arg1, arg2) {
            arg0.draw(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_draw_56541631b331ecf2: function(arg0, arg1, arg2) {
            arg0.draw(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_draw_92eb37d6b3b2aab4: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_draw_9672d5ce2c5803e1: function(arg0, arg1, arg2, arg3) {
            arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_draw_97fc0ea44c24c143: function(arg0, arg1) {
            arg0.draw(arg1 >>> 0);
        },
        __wbg_draw_9d2f896af13442a5: function(arg0, arg1, arg2, arg3) {
            arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_draw_bc291e24b89aa540: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_draw_c86e8be6e157cc9b: function(arg0, arg1) {
            arg0.draw(arg1 >>> 0);
        },
        __wbg_duration_18f3ac0a5fc36f51: function(arg0) {
            const ret = arg0.duration;
            return ret;
        },
        __wbg_duration_a1b98c2bfad50ab1: function(arg0, arg1) {
            const ret = arg1.duration;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_elementFromPoint_082557ad1c446761: function(arg0, arg1, arg2) {
            const ret = arg0.elementFromPoint(arg1, arg2);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_elementsFromPoint_0ca83fb94981955d: function(arg0, arg1, arg2) {
            const ret = arg0.elementsFromPoint(arg1, arg2);
            return ret;
        },
        __wbg_enableStyleSheetsForSet_891a85fe78612838: function(arg0, arg1, arg2) {
            arg0.enableStyleSheetsForSet(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2));
        },
        __wbg_encodeURIComponent_d0140ae6e13eb27b: function(arg0, arg1) {
            const ret = encodeURIComponent(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_encodeURI_ec622c3723199546: function(arg0, arg1) {
            const ret = encodeURI(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_endOcclusionQuery_472efcf3abd55f95: function(arg0) {
            arg0.endOcclusionQuery();
        },
        __wbg_end_8437a975bbfe0297: function(arg0) {
            arg0.end();
        },
        __wbg_end_d49513b309f4ca43: function(arg0) {
            arg0.end();
        },
        __wbg_ended_4059297a4eabe5a6: function(arg0) {
            const ret = arg0.ended;
            return ret;
        },
        __wbg_endsWith_92b67456a91fa032: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.endsWith(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_entries_015dc610cd81ede0: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_entries_56eb442867cf3ddc: function(arg0) {
            const ret = arg0.entries();
            return ret;
        },
        __wbg_entries_9e1e51cc5223e53c: function(arg0) {
            const ret = arg0.entries();
            return ret;
        },
        __wbg_entries_aa1ded211e6e6f55: function(arg0) {
            const ret = arg0.entries();
            return ret;
        },
        __wbg_error_3ce06e1306a022bf: function(arg0, arg1, arg2, arg3, arg4) {
            console.error(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_error_413c685406a33f59: function(arg0, arg1, arg2) {
            console.error(arg0, arg1, arg2);
        },
        __wbg_error_50e182b6d728595d: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.error(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_error_5847f49bc6527dd7: function(arg0) {
            console.error(...arg0);
        },
        __wbg_error_657700d53a73881f: function(arg0, arg1, arg2, arg3) {
            console.error(arg0, arg1, arg2, arg3);
        },
        __wbg_error_744744ff0c9861e6: function(arg0) {
            console.error(arg0);
        },
        __wbg_error_7ed559cd7146b49d: function(arg0, arg1) {
            console.error(arg0, arg1);
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                __wbg_call_guard();
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_error_a875004d7e589727: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.error(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_error_ad5c93d7de74de98: function() {
            console.error();
        },
        __wbg_error_f6720b4bc5b9976f: function(arg0) {
            const ret = arg0.error;
            return ret;
        },
        __wbg_errors_6e41d5326789a208: function(arg0) {
            const ret = arg0.errors;
            return ret;
        },
        __wbg_escape_0179052d33c114e4: function(arg0, arg1) {
            const ret = escape(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_eval_832ed6e42a9be51c: function() { return handleError(function (arg0, arg1) {
            const ret = eval(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_eventPhase_ddbebae609175743: function(arg0) {
            const ret = arg0.eventPhase;
            return ret;
        },
        __wbg_event_ba1f716d5079c953: function(arg0) {
            const ret = arg0.event;
            return ret;
        },
        __wbg_exception_2ff1c2cb90fe8477: function(arg0, arg1, arg2) {
            console.exception(arg0, arg1, arg2);
        },
        __wbg_exception_3a03d1ff24d18537: function(arg0, arg1, arg2, arg3, arg4) {
            console.exception(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_exception_493d19428cceed63: function(arg0, arg1) {
            console.exception(arg0, arg1);
        },
        __wbg_exception_68bec7660b5e2768: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.exception(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_exception_71add677ed4b0bea: function(arg0, arg1, arg2, arg3) {
            console.exception(arg0, arg1, arg2, arg3);
        },
        __wbg_exception_a499ea0127c7c955: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.exception(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_exception_b638dc3a0a8277ab: function(arg0) {
            console.exception(...arg0);
        },
        __wbg_exception_ec262eec9a1c62ef: function(arg0) {
            console.exception(arg0);
        },
        __wbg_exception_fa474bb23fdac951: function() {
            console.exception();
        },
        __wbg_exec_408b889762cde4c2: function(arg0, arg1, arg2) {
            const ret = arg0.exec(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_executeBundles_92e7459bdf3d7ec1: function(arg0, arg1) {
            arg0.executeBundles(arg1);
        },
        __wbg_exitFullscreen_7bda0f69cc078f03: function(arg0) {
            arg0.exitFullscreen();
        },
        __wbg_exitPointerLock_a188e9d7ca5c5405: function(arg0) {
            arg0.exitPointerLock();
        },
        __wbg_exp_9513443e6d7247d5: function(arg0) {
            const ret = Math.exp(arg0);
            return ret;
        },
        __wbg_expm1_9eeeefb8de888950: function(arg0) {
            const ret = Math.expm1(arg0);
            return ret;
        },
        __wbg_exports_085d8a69333b42bc: function(arg0) {
            const ret = arg0.exports;
            return ret;
        },
        __wbg_exports_992a7d99df0efe82: function(arg0) {
            const ret = WebAssembly.Module.exports(arg0);
            return ret;
        },
        __wbg_fastSeek_6fee9a945e10d2b5: function() { return handleError(function (arg0, arg1) {
            arg0.fastSeek(arg1);
        }, arguments); },
        __wbg_features_0d8935ffe5087d3e: function(arg0) {
            const ret = arg0.features;
            return ret;
        },
        __wbg_features_6906f30d3b243f58: function(arg0) {
            const ret = arg0.features;
            return ret;
        },
        __wbg_fetch_58167e2c1ef32e0a: function(arg0, arg1, arg2) {
            const ret = arg0.fetch(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_fetch_7e61ffbeb1187e8f: function(arg0, arg1, arg2) {
            const ret = arg0.fetch(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_filename_27f504849a94446f: function(arg0, arg1) {
            const ret = arg1.filename;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_fill_2a72b33536bc9668: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_3d20989ec9a9485e: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_40665c40e3c37c1b: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_4d661d0888ee4e00: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(BigInt.asUintN(64, arg1), arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_506e9d466f515d3f: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_5092c0a33b6c1a9d: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_51230803153f0fde: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_5663f5c647107cce: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_7f94087862017fe5: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_a384e352e63ba14c: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_ca7094d925b607bb: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fill_f23a9e88a3dc20e2: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_finish_6c7bba424ffe1bbc: function(arg0, arg1) {
            const ret = arg0.finish(arg1);
            return ret;
        },
        __wbg_finish_9bd6fcce1a5164ff: function(arg0) {
            const ret = arg0.finish();
            return ret;
        },
        __wbg_finish_b16349e4d15878a5: function(arg0, arg1) {
            const ret = arg0.finish(arg1);
            return ret;
        },
        __wbg_finish_c40b67ff2af88e0c: function(arg0) {
            const ret = arg0.finish();
            return ret;
        },
        __wbg_firstChild_984b883406cc95b8: function(arg0) {
            const ret = arg0.firstChild;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_firstElementChild_09d2c7dc8dd1cfd9: function(arg0) {
            const ret = arg0.firstElementChild;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_firstElementChild_4f1775fbf70da219: function(arg0) {
            const ret = arg0.firstElementChild;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_first_day_c74938d9e5c5742e: function(arg0) {
            const ret = arg0.firstDay;
            return ret;
        },
        __wbg_flags_0e1e7beccf4ae58b: function(arg0) {
            const ret = arg0.flags;
            return ret;
        },
        __wbg_floor_01959a4bcf76844f: function(arg0) {
            const ret = Math.floor(arg0);
            return ret;
        },
        __wbg_focus_2f77051f98540625: function() { return handleError(function (arg0) {
            arg0.focus();
        }, arguments); },
        __wbg_focus_59df68b2ff4a0b2e: function() { return handleError(function (arg0) {
            arg0.focus();
        }, arguments); },
        __wbg_forEach_1721a249f576ef23: function() { return handleError(function (arg0, arg1) {
            arg0.forEach(arg1);
        }, arguments); },
        __wbg_forEach_342b7bc6124aa354: function() { return handleError(function (arg0, arg1) {
            arg0.forEach(arg1);
        }, arguments); },
        __wbg_forEach_b61bcb1fa1593e3a: function() { return handleError(function (arg0, arg1) {
            arg0.forEach(arg1);
        }, arguments); },
        __wbg_for_e542e480b076809a: function(arg0, arg1) {
            const ret = Symbol.for(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_formatRangeToParts_dc6c5304c4833117: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.formatRangeToParts(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_formatRangeToParts_f520bcfa86e6d54a: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.formatRangeToParts(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_formatRange_3088c7e8dd1e311c: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.formatRange(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_formatRange_e201678616554697: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.formatRange(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_formatToParts_24c59831974e6d5c: function(arg0, arg1) {
            const ret = arg0.formatToParts(arg1);
            return ret;
        },
        __wbg_formatToParts_26a8c48bb6e77f16: function(arg0, arg1) {
            const ret = arg0.formatToParts(arg1);
            return ret;
        },
        __wbg_formatToParts_2e4b24f6d7f6ed54: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.formatToParts(arg1, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_formatToParts_43e758646ae1e4f1: function(arg0, arg1) {
            const ret = arg0.formatToParts(arg1);
            return ret;
        },
        __wbg_formatToParts_543f03472603a04b: function(arg0, arg1) {
            const ret = arg0.formatToParts(arg1);
            return ret;
        },
        __wbg_format_096a11956f7b1f67: function(arg0) {
            const ret = arg0.format;
            return ret;
        },
        __wbg_format_7110ba500f9c2700: function(arg0, arg1) {
            const ret = arg0.format(arg1);
            return ret;
        },
        __wbg_format_8b4db6c08ace6952: function(arg0) {
            const ret = arg0.format;
            return ret;
        },
        __wbg_format_8e7d8dbabe9b40a8: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.format(arg1, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_format_be43f7d7dd11c92d: function(arg0, arg1) {
            const ret = arg0.format(arg1);
            return ret;
        },
        __wbg_format_f0a47136ba360e24: function(arg0) {
            const ret = arg0.format;
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
        },
        __wbg_frameElement_b64eb6a528a48fa0: function() { return handleError(function (arg0) {
            const ret = arg0.frameElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_frames_91cf4ff12fa76349: function() { return handleError(function (arg0) {
            const ret = arg0.frames;
            return ret;
        }, arguments); },
        __wbg_fromCharCode_011cdc9af21d6021: function(arg0, arg1, arg2) {
            const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_fromCharCode_16c5759ddefe40b5: function(arg0, arg1, arg2, arg3) {
            const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_fromCharCode_3a60ed801e83eacc: function(arg0, arg1) {
            const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg_fromCharCode_ac3cf198d74c127d: function(arg0) {
            const ret = String.fromCharCode(arg0 >>> 0);
            return ret;
        },
        __wbg_fromCharCode_ad1e3c557999d1e6: function(arg0, arg1) {
            const ret = String.fromCharCode(...getArrayU16FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_fromCharCode_d680509e789d0175: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
            return ret;
        },
        __wbg_fromCodePoint_0c2eb7e91c7da475: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
            return ret;
        }, arguments); },
        __wbg_fromCodePoint_0dfc7d1c56211f08: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
            return ret;
        }, arguments); },
        __wbg_fromCodePoint_a952b701bbb83fa4: function() { return handleError(function (arg0) {
            const ret = String.fromCodePoint(arg0 >>> 0);
            return ret;
        }, arguments); },
        __wbg_fromCodePoint_b8e920b297cca64c: function() { return handleError(function (arg0, arg1) {
            const ret = String.fromCodePoint(...getArrayU32FromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_fromCodePoint_c1637e13b4d9a350: function() { return handleError(function (arg0, arg1) {
            const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_fromCodePoint_dc4b289d249d9631: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_fromEntries_0eddbdac354a0a78: function() { return handleError(function (arg0) {
            const ret = Object.fromEntries(arg0);
            return ret;
        }, arguments); },
        __wbg_from_13e323c65fc8f464: function(arg0) {
            const ret = Array.from(arg0);
            return ret;
        },
        __wbg_fround_018a791a80c93b1d: function(arg0) {
            const ret = Math.fround(arg0);
            return ret;
        },
        __wbg_fullscreenElement_9f50a5e63bb433a8: function(arg0) {
            const ret = arg0.fullscreenElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_fullscreenEnabled_52b55b2dda845da3: function(arg0) {
            const ret = arg0.fullscreenEnabled;
            return ret;
        },
        __wbg_fullscreen_b047bcb3d273275c: function(arg0) {
            const ret = arg0.fullscreen;
            return ret;
        },
        __wbg_getAnimations_ae35be78925be022: function(arg0) {
            const ret = arg0.getAnimations();
            return ret;
        },
        __wbg_getArg_9196f77801d56a29: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getArg(arg1, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getAttributeNS_e2b3781ab7c98b0f: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg1.getAttributeNS(arg2 === 0 ? undefined : getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getAttributeNames_5f86619d226af9e5: function(arg0) {
            const ret = arg0.getAttributeNames();
            return ret;
        },
        __wbg_getAttribute_5a601ba4718b922a: function(arg0, arg1, arg2, arg3) {
            const ret = arg1.getAttribute(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getBindGroupLayout_3e25f08ba260b2a6: function(arg0, arg1) {
            const ret = arg0.getBindGroupLayout(arg1 >>> 0);
            return ret;
        },
        __wbg_getBindGroupLayout_c1a975aa4948e217: function(arg0, arg1) {
            const ret = arg0.getBindGroupLayout(arg1 >>> 0);
            return ret;
        },
        __wbg_getBoundingClientRect_e828e6c31c66dea6: function(arg0) {
            const ret = arg0.getBoundingClientRect();
            return ret;
        },
        __wbg_getBoxQuads_1d4d2faa4acdebbe: function() { return handleError(function (arg0) {
            const ret = arg0.getBoxQuads();
            return ret;
        }, arguments); },
        __wbg_getBoxQuads_232b4fa4e7a4bea3: function() { return handleError(function (arg0) {
            const ret = arg0.getBoxQuads();
            return ret;
        }, arguments); },
        __wbg_getCalendars_bbc71454b45e1b18: function(arg0) {
            const ret = arg0.getCalendars();
            return ret;
        },
        __wbg_getCanonicalLocales_1770b30801165415: function(arg0) {
            const ret = Intl.getCanonicalLocales(arg0);
            return ret;
        },
        __wbg_getCoalescedEvents_366947e5550da21b: function(arg0) {
            const ret = arg0.getCoalescedEvents();
            return ret;
        },
        __wbg_getCoalescedEvents_3e003f63d9ebbc05: function(arg0) {
            const ret = arg0.getCoalescedEvents;
            return ret;
        },
        __wbg_getCollations_5a78a969f6aa58e8: function(arg0) {
            const ret = arg0.getCollations();
            return ret;
        },
        __wbg_getCompilationInfo_7e9613f8899c849c: function(arg0) {
            const ret = arg0.getCompilationInfo();
            return ret;
        },
        __wbg_getComputedStyle_961681bdf7e518e8: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getComputedStyle(arg1);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getComputedStyle_ea55f36c69a12873: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getComputedStyle(arg1, getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getConfiguration_7c906747910e1964: function(arg0) {
            const ret = arg0.getConfiguration();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getContext_7476e39fa008047e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_ca12bb65aab778a4: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_e79ddf6a9cb3cc76: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_fd298c901058eb31: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getCurrentTexture_274b67f871b2dea5: function() { return handleError(function (arg0) {
            const ret = arg0.getCurrentTexture();
            return ret;
        }, arguments); },
        __wbg_getDate_a1a40c1c5f40fe3b: function(arg0) {
            const ret = arg0.getDate();
            return ret;
        },
        __wbg_getDay_aa318cce5da74c49: function(arg0) {
            const ret = arg0.getDay();
            return ret;
        },
        __wbg_getElementById_1cbd8f06dbe8eb8e: function(arg0, arg1, arg2) {
            const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getElementsByName_a498cfc0bdb71514: function(arg0, arg1, arg2) {
            const ret = arg0.getElementsByName(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_getFloat16_76390d1f54030d24: function(arg0, arg1, arg2) {
            const ret = arg0.getFloat16(arg1 >>> 0, arg2 !== 0);
            return ret;
        },
        __wbg_getFloat16_ea41aa9682346931: function(arg0, arg1) {
            const ret = arg0.getFloat16(arg1 >>> 0);
            return ret;
        },
        __wbg_getFloat32_3d17e58ff9bd0b21: function(arg0, arg1) {
            const ret = arg0.getFloat32(arg1 >>> 0);
            return ret;
        },
        __wbg_getFloat32_f8966399f81a82d7: function(arg0, arg1, arg2) {
            const ret = arg0.getFloat32(arg1 >>> 0, arg2 !== 0);
            return ret;
        },
        __wbg_getFloat64_1645d3c5ee093ddc: function(arg0, arg1, arg2) {
            const ret = arg0.getFloat64(arg1 >>> 0, arg2 !== 0);
            return ret;
        },
        __wbg_getFloat64_6d056e6e3a002abe: function(arg0, arg1) {
            const ret = arg0.getFloat64(arg1 >>> 0);
            return ret;
        },
        __wbg_getFullYear_6af8b229792ae254: function(arg0) {
            const ret = arg0.getFullYear();
            return ret;
        },
        __wbg_getGamepads_b3022d3eb5aa3db0: function() { return handleError(function (arg0) {
            const ret = arg0.getGamepads();
            return ret;
        }, arguments); },
        __wbg_getHourCycles_c9ee644520812e8e: function(arg0) {
            const ret = arg0.getHourCycles();
            return ret;
        },
        __wbg_getHours_9f6561095682ce51: function(arg0) {
            const ret = arg0.getHours();
            return ret;
        },
        __wbg_getInt16_6f4143b39b6e37f6: function(arg0, arg1, arg2) {
            const ret = arg0.getInt16(arg1 >>> 0, arg2 !== 0);
            return ret;
        },
        __wbg_getInt16_87711ea42a7f6385: function(arg0, arg1) {
            const ret = arg0.getInt16(arg1 >>> 0);
            return ret;
        },
        __wbg_getInt32_a9fe339f4a5780d5: function(arg0, arg1, arg2) {
            const ret = arg0.getInt32(arg1 >>> 0, arg2 !== 0);
            return ret;
        },
        __wbg_getInt32_eb0a2d55320c9941: function(arg0, arg1) {
            const ret = arg0.getInt32(arg1 >>> 0);
            return ret;
        },
        __wbg_getInt8_27c77a14ad45704e: function(arg0, arg1) {
            const ret = arg0.getInt8(arg1 >>> 0);
            return ret;
        },
        __wbg_getMappedRange_14ba305be74fd636: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getMappedRange(arg1 >>> 0, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getMappedRange_1ba29e1cf926dd47: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getMappedRange(arg1 >>> 0, arg2);
            return ret;
        }, arguments); },
        __wbg_getMappedRange_42782e04a91047eb: function() { return handleError(function (arg0) {
            const ret = arg0.getMappedRange();
            return ret;
        }, arguments); },
        __wbg_getMappedRange_59829576da3edd39: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getMappedRange(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_getMappedRange_5c38e8444533257f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.getMappedRange(arg1, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getMappedRange_c7e02165ab2864f5: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getMappedRange(arg1);
            return ret;
        }, arguments); },
        __wbg_getMappedRange_eccebb1dd5154503: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getMappedRange(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_getMilliseconds_0f73a1c695eb6447: function(arg0) {
            const ret = arg0.getMilliseconds();
            return ret;
        },
        __wbg_getMinutes_b0d5cd90bf9b8f22: function(arg0) {
            const ret = arg0.getMinutes();
            return ret;
        },
        __wbg_getModifierState_3b51bd1ad486adfc: function(arg0, arg1, arg2) {
            const ret = arg0.getModifierState(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_getModifierState_c3d04e80fda4f593: function(arg0, arg1, arg2) {
            const ret = arg0.getModifierState(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_getMonth_fffe29d654d5eb69: function(arg0) {
            const ret = arg0.getMonth();
            return ret;
        },
        __wbg_getNumberingSystems_d25915b31e3f9cad: function(arg0) {
            const ret = arg0.getNumberingSystems();
            return ret;
        },
        __wbg_getOwnPropertyDescriptor_543d91136adb7c16: function(arg0, arg1) {
            const ret = Object.getOwnPropertyDescriptor(arg0, arg1);
            return ret;
        },
        __wbg_getPreferredCanvasFormat_6f629398d892f0c9: function(arg0) {
            const ret = arg0.getPreferredCanvasFormat();
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
        },
        __wbg_getPropertyPriority_52ca5e169d2fd70c: function(arg0, arg1, arg2, arg3) {
            const ret = arg1.getPropertyPriority(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getPropertyValue_dc6b061239dad6f1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getPrototypeOf_086802da20be2dba: function() { return handleError(function (arg0) {
            const ret = Reflect.getPrototypeOf(arg0);
            return ret;
        }, arguments); },
        __wbg_getPrototypeOf_7c8bfde858c0db4c: function(arg0) {
            const ret = Object.getPrototypeOf(arg0);
            return ret;
        },
        __wbg_getRandomValues_127d43fea0fcc894: function() { return handleError(function (arg0) {
            globalThis.crypto.getRandomValues(arg0);
        }, arguments); },
        __wbg_getRootNode_f724c3be671a9a57: function(arg0) {
            const ret = arg0.getRootNode();
            return ret;
        },
        __wbg_getSeconds_40c565b3a6cb05fe: function(arg0) {
            const ret = arg0.getSeconds();
            return ret;
        },
        __wbg_getTextInfo_8961663858b2c64d: function() { return handleError(function (arg0) {
            const ret = arg0.getTextInfo();
            return ret;
        }, arguments); },
        __wbg_getTimeZones_94328d5febf0bdfe: function(arg0) {
            const ret = arg0.getTimeZones();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getTime_d6f070c088c9b5ed: function(arg0) {
            const ret = arg0.getTime();
            return ret;
        },
        __wbg_getTimezoneOffset_dc9862c79e5a81a3: function(arg0) {
            const ret = arg0.getTimezoneOffset();
            return ret;
        },
        __wbg_getUTCDate_652a2ad7beebbadf: function(arg0) {
            const ret = arg0.getUTCDate();
            return ret;
        },
        __wbg_getUTCDay_a70766185f119e98: function(arg0) {
            const ret = arg0.getUTCDay();
            return ret;
        },
        __wbg_getUTCFullYear_5af8ca4e2020c06e: function(arg0) {
            const ret = arg0.getUTCFullYear();
            return ret;
        },
        __wbg_getUTCHours_3f030631d89309ea: function(arg0) {
            const ret = arg0.getUTCHours();
            return ret;
        },
        __wbg_getUTCMilliseconds_1f759a60234deba6: function(arg0) {
            const ret = arg0.getUTCMilliseconds();
            return ret;
        },
        __wbg_getUTCMinutes_03f5d6c64c8b2fb1: function(arg0) {
            const ret = arg0.getUTCMinutes();
            return ret;
        },
        __wbg_getUTCMonth_773ed3c34515d086: function(arg0) {
            const ret = arg0.getUTCMonth();
            return ret;
        },
        __wbg_getUTCSeconds_92d08d3589a8958a: function(arg0) {
            const ret = arg0.getUTCSeconds();
            return ret;
        },
        __wbg_getUint16_a0260776921d77a7: function(arg0, arg1) {
            const ret = arg0.getUint16(arg1 >>> 0);
            return ret;
        },
        __wbg_getUint16_b2284235e40033e4: function(arg0, arg1, arg2) {
            const ret = arg0.getUint16(arg1 >>> 0, arg2 !== 0);
            return ret;
        },
        __wbg_getUint32_11fb2913bdb7d394: function(arg0, arg1) {
            const ret = arg0.getUint32(arg1 >>> 0);
            return ret;
        },
        __wbg_getUint32_ec17d144e3184055: function(arg0, arg1, arg2) {
            const ret = arg0.getUint32(arg1 >>> 0, arg2 !== 0);
            return ret;
        },
        __wbg_getUint8_665c0c9a678cff1e: function(arg0, arg1) {
            const ret = arg0.getUint8(arg1 >>> 0);
            return ret;
        },
        __wbg_getVRDisplays_698590bd478d813c: function() { return handleError(function (arg0) {
            const ret = arg0.getVRDisplays();
            return ret;
        }, arguments); },
        __wbg_getWeekInfo_5a7cc4066c05a623: function() { return handleError(function (arg0) {
            const ret = arg0.getWeekInfo();
            return ret;
        }, arguments); },
        __wbg_get_3926a161c0e44c7d: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_507a50627bffa49b: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_59f65bf715e111b5: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_5b0994f14acc7b27: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.get(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_get_78f252d074a84d0b: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_7df959e12c8cb1e0: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_get_a69966e97f233f79: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.get(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_get_a_e7e94551796ff69d: function(arg0) {
            const ret = arg0.a;
            return ret;
        },
        __wbg_get_access_a447700054855c41: function(arg0) {
            const ret = arg0.access;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuStorageTextureAccess.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_address_mode_u_2b312f7c36cbe500: function(arg0) {
            const ret = arg0.addressModeU;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuAddressMode.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_address_mode_v_b8887dfa138d1353: function(arg0) {
            const ret = arg0.addressModeV;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuAddressMode.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_address_mode_w_999c22e93c939b71: function(arg0) {
            const ret = arg0.addressModeW;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuAddressMode.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_alpha_5c23180644c1ed7f: function(arg0) {
            const ret = arg0.alpha;
            return ret;
        },
        __wbg_get_alpha_mode_98b7f9b75c9a6dcc: function(arg0) {
            const ret = arg0.alphaMode;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuCanvasAlphaMode.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_alpha_to_coverage_enabled_6ba281d45d34714a: function(arg0) {
            const ret = arg0.alphaToCoverageEnabled;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_array_layer_count_bb06a7e48b321799: function(arg0) {
            const ret = arg0.arrayLayerCount;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_array_stride_ea7ca7a339644c30: function(arg0) {
            const ret = arg0.arrayStride;
            return ret;
        },
        __wbg_get_aspect_29a42b9295e5b241: function(arg0) {
            const ret = arg0.aspect;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuTextureAspect.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_aspect_5206812573e3ef01: function(arg0) {
            const ret = arg0.aspect;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuTextureAspect.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_aspect_96dbecdc84eb564b: function(arg0) {
            const ret = arg0.aspect;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuTextureAspect.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_attributes_13f2cea25e27de33: function(arg0) {
            const ret = arg0.attributes;
            return ret;
        },
        __wbg_get_b2053e9bfdf3ca8e: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_b_432984a90a491e55: function(arg0) {
            const ret = arg0.b;
            return ret;
        },
        __wbg_get_base_array_layer_6af137842662ab7e: function(arg0) {
            const ret = arg0.baseArrayLayer;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_base_mip_level_c0f21a5eeb3a385e: function(arg0) {
            const ret = arg0.baseMipLevel;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_beginning_of_pass_write_index_029beba12c5e010f: function(arg0) {
            const ret = arg0.beginningOfPassWriteIndex;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_beginning_of_pass_write_index_8858d69f04ef067e: function(arg0) {
            const ret = arg0.beginningOfPassWriteIndex;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_bind_group_layouts_9fe472735b3a08c6: function(arg0) {
            const ret = arg0.bindGroupLayouts;
            return ret;
        },
        __wbg_get_binding_cc3c26e5cdd435a5: function(arg0) {
            const ret = arg0.binding;
            return ret;
        },
        __wbg_get_binding_ee65172e8d784f41: function(arg0) {
            const ret = arg0.binding;
            return ret;
        },
        __wbg_get_blend_132397f1426c3f6a: function(arg0) {
            const ret = arg0.blend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_box_d72d306c56b79288: function(arg0) {
            const ret = arg0.box;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_ResizeObserverBoxOptions.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_bubbles_26d717a9c6d04497: function(arg0) {
            const ret = arg0.bubbles;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_buffer_23a5a5edc1f57aba: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_get_buffer_b28da982824eed79: function(arg0) {
            const ret = arg0.buffer;
            return ret;
        },
        __wbg_get_buffer_c0797974633626d4: function(arg0) {
            const ret = arg0.buffer;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_buffers_7d126e8c04fe3a8e: function(arg0) {
            const ret = arg0.buffers;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_bytes_per_row_115f736d960aafc4: function(arg0) {
            const ret = arg0.bytesPerRow;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_bytes_per_row_82e12fc2b427cd51: function(arg0) {
            const ret = arg0.bytesPerRow;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_c7eb1f358a7654df: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_calendar_2753b69ada1a9c49: function(arg0) {
            const ret = arg0.calendar;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_cancelable_e2611dfe30cff1a5: function(arg0) {
            const ret = arg0.cancelable;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_case_first_5ea3ca2cf4b7b064: function(arg0) {
            const ret = arg0.caseFirst;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_CollatorCaseFirst.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_cause_2b829770c499bb38: function(arg0) {
            const ret = arg0.cause;
            return ret;
        },
        __wbg_get_clear_value_c174266ac5aa5152: function(arg0) {
            const ret = arg0.clearValue;
            return ret;
        },
        __wbg_get_code_fda9007027ec0200: function(arg0, arg1) {
            const ret = arg1.code;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_collation_42ddb3cd5b4f7634: function(arg0) {
            const ret = arg0.collation;
            return ret;
        },
        __wbg_get_color_38b76b55d3917ea7: function(arg0) {
            const ret = arg0.color;
            return ret;
        },
        __wbg_get_color_attachments_6709ae7f6d7201cf: function(arg0) {
            const ret = arg0.colorAttachments;
            return ret;
        },
        __wbg_get_color_formats_f3649860bd9f8ac0: function(arg0) {
            const ret = arg0.colorFormats;
            return ret;
        },
        __wbg_get_compact_display_7991ba0fbc554547: function(arg0) {
            const ret = arg0.compactDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_CompactDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_compare_24baca4d8944531f: function(arg0) {
            const ret = arg0.compare;
            return isLikeNone(ret) ? 9 : ((__wbindgen_enum_GpuCompareFunction.indexOf(ret) + 1 || 9) - 1);
        },
        __wbg_get_compare_2eab484c7a7ec0d7: function(arg0) {
            const ret = arg0.compare;
            return isLikeNone(ret) ? 9 : ((__wbindgen_enum_GpuCompareFunction.indexOf(ret) + 1 || 9) - 1);
        },
        __wbg_get_compilation_hints_f19bc38280c89379: function(arg0) {
            const ret = arg0.compilationHints;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_composed_9f553e70d134eea3: function(arg0) {
            const ret = arg0.composed;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_compute_bc7246b8dc7af04f: function(arg0) {
            const ret = arg0.compute;
            return ret;
        },
        __wbg_get_constants_3d455beb4320c2a5: function(arg0) {
            const ret = arg0.constants;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_constants_630cbdd62a4985ed: function(arg0) {
            const ret = arg0.constants;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_constants_dd5a5f6a526e2f07: function(arg0) {
            const ret = arg0.constants;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_count_189a37e535a8070d: function(arg0) {
            const ret = arg0.count;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_count_1accb7f69147b2d7: function(arg0) {
            const ret = arg0.count;
            return ret;
        },
        __wbg_get_cull_mode_2a92009ff79962ca: function(arg0) {
            const ret = arg0.cullMode;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuCullMode.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_currency_5061b5e952dbf50c: function(arg0) {
            const ret = arg0.currency;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_currency_display_f9ff12186276c1eb: function(arg0) {
            const ret = arg0.currencyDisplay;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_CurrencyDisplay.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_currency_sign_c4538b8f7808cabb: function(arg0) {
            const ret = arg0.currencySign;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_CurrencySign.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_date_style_25a026b2c82be56a: function(arg0) {
            const ret = arg0.dateStyle;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_DateTimeStyle.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_day_d1697c37454e4084: function(arg0) {
            const ret = arg0.day;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DayFormat.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_day_period_1555870d396bf3f3: function(arg0) {
            const ret = arg0.dayPeriod;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DayPeriodFormat.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_days_8bbdea9236a5e0dd: function(arg0) {
            const ret = arg0.days;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DurationUnitStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_days_display_fd7c750c1b2fb4d8: function(arg0) {
            const ret = arg0.daysDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_default_queue_96813faf1e5e9724: function(arg0) {
            const ret = arg0.defaultQueue;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_depth_bias_194b679cae738cb8: function(arg0) {
            const ret = arg0.depthBias;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >> 0;
        },
        __wbg_get_depth_bias_clamp_07e4313377927837: function(arg0) {
            const ret = arg0.depthBiasClamp;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : Math.fround(ret);
        },
        __wbg_get_depth_bias_slope_scale_d9a933ff52ed4396: function(arg0) {
            const ret = arg0.depthBiasSlopeScale;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : Math.fround(ret);
        },
        __wbg_get_depth_clear_value_45a676bcb403f829: function(arg0) {
            const ret = arg0.depthClearValue;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : Math.fround(ret);
        },
        __wbg_get_depth_compare_84c5a0e97f7ade06: function(arg0) {
            const ret = arg0.depthCompare;
            return isLikeNone(ret) ? 9 : ((__wbindgen_enum_GpuCompareFunction.indexOf(ret) + 1 || 9) - 1);
        },
        __wbg_get_depth_fail_op_06f13dddd444b1ed: function(arg0) {
            const ret = arg0.depthFailOp;
            return isLikeNone(ret) ? 9 : ((__wbindgen_enum_GpuStencilOperation.indexOf(ret) + 1 || 9) - 1);
        },
        __wbg_get_depth_load_op_ae979e03128dc837: function(arg0) {
            const ret = arg0.depthLoadOp;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuLoadOp.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_depth_or_array_layers_9f213f44eeb8ee09: function(arg0) {
            const ret = arg0.depthOrArrayLayers;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_depth_read_only_a085949cc6d221b2: function(arg0) {
            const ret = arg0.depthReadOnly;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_depth_read_only_e4e8235b93821be7: function(arg0) {
            const ret = arg0.depthReadOnly;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_depth_slice_d2472975d343e8d2: function(arg0) {
            const ret = arg0.depthSlice;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_depth_stencil_794dbe51674f891c: function(arg0) {
            const ret = arg0.depthStencil;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_depth_stencil_attachment_07b341869c84235a: function(arg0) {
            const ret = arg0.depthStencilAttachment;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_depth_stencil_format_9f1d24cb7260f1b2: function(arg0) {
            const ret = arg0.depthStencilFormat;
            return isLikeNone(ret) ? 96 : ((__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1);
        },
        __wbg_get_depth_store_op_d40bded536c19958: function(arg0) {
            const ret = arg0.depthStoreOp;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuStoreOp.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_depth_write_enabled_713c90b8f6ef05ff: function(arg0) {
            const ret = arg0.depthWriteEnabled;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_device_c46cf1d61a157875: function(arg0) {
            const ret = arg0.device;
            return ret;
        },
        __wbg_get_dimension_22e7a95d26c3e318: function(arg0) {
            const ret = arg0.dimension;
            return isLikeNone(ret) ? 7 : ((__wbindgen_enum_GpuTextureViewDimension.indexOf(ret) + 1 || 7) - 1);
        },
        __wbg_get_dimension_35da3378071a2980: function(arg0) {
            const ret = arg0.dimension;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuTextureDimension.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_dst_factor_57222d05928a8ca5: function(arg0) {
            const ret = arg0.dstFactor;
            return isLikeNone(ret) ? 18 : ((__wbindgen_enum_GpuBlendFactor.indexOf(ret) + 1 || 18) - 1);
        },
        __wbg_get_e142d70230417fae: function(arg0, arg1, arg2) {
            const ret = arg0[getStringFromWasm0(arg1, arg2)];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_ec627dab3b89a3f3: function(arg0, arg1, arg2) {
            const ret = arg1[arg2 >>> 0];
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_ee06d9174707cf54: function(arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        },
        __wbg_get_end_of_pass_write_index_1be60583be01cd97: function(arg0) {
            const ret = arg0.endOfPassWriteIndex;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_end_of_pass_write_index_ef501bffa3d85906: function(arg0) {
            const ret = arg0.endOfPassWriteIndex;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_entries_a64d524c0e30f84f: function(arg0) {
            const ret = arg0.entries;
            return ret;
        },
        __wbg_get_entries_d40b6ea3c8a53979: function(arg0) {
            const ret = arg0.entries;
            return ret;
        },
        __wbg_get_entry_point_44839431bd12457d: function(arg0, arg1) {
            const ret = arg1.entryPoint;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_entry_point_5b5a0b05fa55b96b: function(arg0, arg1) {
            const ret = arg1.entryPoint;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_entry_point_d24025b01f4f9034: function(arg0, arg1) {
            const ret = arg1.entryPoint;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_era_afcb9f549a2781f0: function(arg0) {
            const ret = arg0.era;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_EraFormat.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_error_5877e83c1aa7faee: function(arg0) {
            const ret = arg0.error;
            return ret;
        },
        __wbg_get_external_texture_f667fd1dd281bdbe: function(arg0) {
            const ret = arg0.externalTexture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_fail_op_614b6f64b277aa74: function(arg0) {
            const ret = arg0.failOp;
            return isLikeNone(ret) ? 9 : ((__wbindgen_enum_GpuStencilOperation.indexOf(ret) + 1 || 9) - 1);
        },
        __wbg_get_fallback_e9c8c5e693a27804: function(arg0) {
            const ret = arg0.fallback;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DisplayNamesFallback.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_feature_level_b85e72540b35f31b: function(arg0, arg1) {
            const ret = arg1.featureLevel;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_flip_y_52c2ef0540dc91c1: function(arg0) {
            const ret = arg0.flipY;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_force_fallback_adapter_a3c55a8e21ca0983: function(arg0) {
            const ret = arg0.forceFallbackAdapter;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_format_10a4b0129f84459d: function(arg0) {
            const ret = arg0.format;
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
        },
        __wbg_get_format_1a8ca822d24b1761: function(arg0) {
            const ret = arg0.format;
            return (__wbindgen_enum_GpuVertexFormat.indexOf(ret) + 1 || 42) - 1;
        },
        __wbg_get_format_405989b052596c52: function(arg0) {
            const ret = arg0.format;
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
        },
        __wbg_get_format_5d83f93e9f2ba388: function(arg0) {
            const ret = arg0.format;
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
        },
        __wbg_get_format_61bd028c87807318: function(arg0) {
            const ret = arg0.format;
            return isLikeNone(ret) ? 96 : ((__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1);
        },
        __wbg_get_format_d8da118e20ee04a3: function(arg0) {
            const ret = arg0.format;
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
        },
        __wbg_get_format_f2960fc8fb915bc8: function(arg0) {
            const ret = arg0.format;
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
        },
        __wbg_get_fractional_digits_8c2dd8444b7899e6: function(arg0) {
            const ret = arg0.fractionalDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_fractional_second_digits_2fe8823185fa033f: function(arg0) {
            const ret = arg0.fractionalSecondDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_fragment_84314aac1554a9d6: function(arg0) {
            const ret = arg0.fragment;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_front_face_84994dacc8bc2dc3: function(arg0) {
            const ret = arg0.frontFace;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuFrontFace.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_g_024731d2b2608085: function(arg0) {
            const ret = arg0.g;
            return ret;
        },
        __wbg_get_granularity_79f04b0fcf9db42f: function(arg0) {
            const ret = arg0.granularity;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_SegmenterGranularity.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_has_dynamic_offset_5ad5fa8a8b19e436: function(arg0) {
            const ret = arg0.hasDynamicOffset;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_height_df6b8cfe66b39a5a: function(arg0) {
            const ret = arg0.height;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_hour12_203bfd5e6db5930f: function(arg0) {
            const ret = arg0.hour12;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_hour_c51a5d4289cb9773: function(arg0) {
            const ret = arg0.hour;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_NumericFormat.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_hour_cycle_054e5d7e17acb923: function(arg0) {
            const ret = arg0.hourCycle;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_HourCycle.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_hours_4593c7b9fdfc6ece: function(arg0) {
            const ret = arg0.hours;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_DurationTimeUnitStyle.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_hours_display_e86a41a7ee7480d9: function(arg0) {
            const ret = arg0.hoursDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_ignore_punctuation_52595c3b6be9e723: function(arg0) {
            const ret = arg0.ignorePunctuation;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_index_173c6f28c33dc91e: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_2465d3aa3a11e48c: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_3028b4cf01ddd98e: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_5ce057e8bdc1a39b: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_6878593429f634f6: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_98c01e30c2559353: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_ab92c3a3b3fb2881: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_as_f32_e1c9e1007bab37cc: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_d511d55a2040be7b: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_e68b01fac18aa799: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_f41c626c6a06ea79: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_index_f8ba33823e803372: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_label_16b55a959706fd7a: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_1fe15595645e20cb: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_2e8fb6ce443d6165: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_30919347038b4bff: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_33b5c553a21225f3: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_37d41d14f0f1e382: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_4c0d58d305a2b8ee: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_53300073b33ce16b: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_639b167896389210: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_6a9c31b2076e8827: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_75cad2d5a0f52573: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_79fbb3a6bfde6beb: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_7eef7ed18bb14be6: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_9ea0c33ce4de8b26: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_c0c8026aa3840124: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_d187e3316e247f9b: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_d2c0348bd21aee39: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_d82675bc63eaa3ea: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_e0c5746eba7e84cf: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_e837f1fd8ad48e18: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_ea33d295b7e0f98e: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_label_f4e9d27cf1cbc3d5: function(arg0, arg1) {
            const ret = arg1.label;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_language_display_d03e48cea4063674: function(arg0) {
            const ret = arg0.languageDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DisplayNamesLanguageDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_layout_139476555b0f1efa: function(arg0) {
            const ret = arg0.layout;
            return ret;
        },
        __wbg_get_layout_98550a509d34442d: function(arg0) {
            const ret = arg0.layout;
            return ret;
        },
        __wbg_get_layout_cf6332560741646e: function(arg0) {
            const ret = arg0.layout;
            return ret;
        },
        __wbg_get_layout_e8c838d373589fbc: function(arg0) {
            const ret = arg0.layout;
            return ret;
        },
        __wbg_get_load_op_8df1ed1e82f798d8: function(arg0) {
            const ret = arg0.loadOp;
            return (__wbindgen_enum_GpuLoadOp.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_get_locale_02f64d335f99e55a: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_1630e7dfd6f096d8: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_355c27cd5d270797: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_35fc335f85befd8e: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_386c0119816956a2: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_c45b7aba5af06ad3: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_c4d3a1c397f01f5e: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_e034407707b1d3e0: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_efc6e4f5e4837ffe: function(arg0) {
            const ret = arg0.locale;
            return ret;
        },
        __wbg_get_locale_matcher_09dbca1d7096118f: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_1125d64480dd73aa: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_2a52e7b37eeede96: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_6dedda0bea0b5bed: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_87222c2045e39dea: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_87581bd5f1f5ac02: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_a8248d498b50d81f: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_ccc3024bc83baa2e: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_dae7e748490fd73c: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_locale_matcher_df5642f099f7545b: function(arg0) {
            const ret = arg0.localeMatcher;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_LocaleMatcher.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_lod_max_clamp_3a9b12ee29637c3d: function(arg0) {
            const ret = arg0.lodMaxClamp;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : Math.fround(ret);
        },
        __wbg_get_lod_min_clamp_8eebe74fe2c149e8: function(arg0) {
            const ret = arg0.lodMinClamp;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : Math.fround(ret);
        },
        __wbg_get_mag_filter_76e56306fd118f00: function(arg0) {
            const ret = arg0.magFilter;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuFilterMode.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_mapped_at_creation_61449ae189003394: function(arg0) {
            const ret = arg0.mappedAtCreation;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_mask_25d32207e6ff2002: function(arg0) {
            const ret = arg0.mask;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_max_anisotropy_d017ca6551d3366c: function(arg0) {
            const ret = arg0.maxAnisotropy;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_max_draw_count_7f9b3c2a68a92696: function(arg0, arg1) {
            const ret = arg1.maxDrawCount;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_get_maximum_fraction_digits_31f2922c83574484: function(arg0) {
            const ret = arg0.maximumFractionDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_maximum_fraction_digits_98825c69d9853d31: function(arg0) {
            const ret = arg0.maximumFractionDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_maximum_significant_digits_2f5c8770948a34ae: function(arg0) {
            const ret = arg0.maximumSignificantDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_maximum_significant_digits_dbdf36ecbf04e454: function(arg0) {
            const ret = arg0.maximumSignificantDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_microseconds_display_745737b06abc85a0: function(arg0) {
            const ret = arg0.microsecondsDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_microseconds_f579d85ac0c0cf20: function(arg0) {
            const ret = arg0.microseconds;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DurationUnitStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_milliseconds_display_4d00ac0bac6d3ee3: function(arg0) {
            const ret = arg0.millisecondsDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_milliseconds_ec8cf4cda689d8fd: function(arg0) {
            const ret = arg0.milliseconds;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DurationUnitStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_min_binding_size_c429c9f2343c1f03: function(arg0, arg1) {
            const ret = arg1.minBindingSize;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_get_min_filter_818e08b1c6b8417c: function(arg0) {
            const ret = arg0.minFilter;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuFilterMode.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_minimum_fraction_digits_1b27061e4c28b196: function(arg0) {
            const ret = arg0.minimumFractionDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_minimum_fraction_digits_adae04b7b858d6dc: function(arg0) {
            const ret = arg0.minimumFractionDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_minimum_integer_digits_7de2e26bc229a504: function(arg0) {
            const ret = arg0.minimumIntegerDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_minimum_integer_digits_e52610fddf6fd90a: function(arg0) {
            const ret = arg0.minimumIntegerDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_minimum_significant_digits_cd9d3af5bde23148: function(arg0) {
            const ret = arg0.minimumSignificantDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_minimum_significant_digits_e94a1f0210007645: function(arg0) {
            const ret = arg0.minimumSignificantDigits;
            return isLikeNone(ret) ? 0xFFFFFF : ret;
        },
        __wbg_get_minute_8c6469abd9b5d6d0: function(arg0) {
            const ret = arg0.minute;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_NumericFormat.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_minutes_display_b8a4245842de4cd3: function(arg0) {
            const ret = arg0.minutesDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_minutes_e3e4176dfa358f36: function(arg0) {
            const ret = arg0.minutes;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_DurationTimeUnitStyle.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_mip_level_count_2b13a51e087bba00: function(arg0) {
            const ret = arg0.mipLevelCount;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_mip_level_count_7c7eec26a1660cb5: function(arg0) {
            const ret = arg0.mipLevelCount;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_mip_level_d31e80732cc4a1d5: function(arg0) {
            const ret = arg0.mipLevel;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_mip_level_e551674b9668d674: function(arg0) {
            const ret = arg0.mipLevel;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_mipmap_filter_a43d0362d3796342: function(arg0) {
            const ret = arg0.mipmapFilter;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuMipmapFilterMode.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_mode_bfee0017c97cf0c2: function(arg0) {
            const ret = arg0.mode;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuCanvasToneMappingMode.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_module_09115a7e397cd6dc: function(arg0) {
            const ret = arg0.module;
            return ret;
        },
        __wbg_get_module_b186b450370915f7: function(arg0) {
            const ret = arg0.module;
            return ret;
        },
        __wbg_get_module_bf548bce4a01a4e7: function(arg0) {
            const ret = arg0.module;
            return ret;
        },
        __wbg_get_month_0c12d9a21574f6a8: function(arg0) {
            const ret = arg0.month;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_MonthFormat.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_months_ba6f6ed776e50adb: function(arg0) {
            const ret = arg0.months;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DurationUnitStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_months_display_03b7029aaa5d5cce: function(arg0) {
            const ret = arg0.monthsDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_multisample_faff511924f20b26: function(arg0) {
            const ret = arg0.multisample;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_multisampled_c701f1beae52f046: function(arg0) {
            const ret = arg0.multisampled;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_nanoseconds_cb811cb6b912de2e: function(arg0) {
            const ret = arg0.nanoseconds;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DurationUnitStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_nanoseconds_display_4e898a5a326cab44: function(arg0) {
            const ret = arg0.nanosecondsDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_notation_611a7521a13becf2: function(arg0) {
            const ret = arg0.notation;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_NumberFormatNotation.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_numbering_system_4a87e677fc9a9697: function(arg0) {
            const ret = arg0.numberingSystem;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_numbering_system_61be624b44b2e901: function(arg0) {
            const ret = arg0.numberingSystem;
            return ret;
        },
        __wbg_get_numbering_system_8ea6a376159895a7: function(arg0) {
            const ret = arg0.numberingSystem;
            return ret;
        },
        __wbg_get_numbering_system_bbe166041fd6018b: function(arg0) {
            const ret = arg0.numberingSystem;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_numeric_5308b42f8fe05258: function(arg0) {
            const ret = arg0.numeric;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_numeric_800d9a4c2a1a8859: function(arg0) {
            const ret = arg0.numeric;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_RelativeTimeFormatNumeric.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_occlusion_query_set_2fb5cb7665b40d7d: function(arg0) {
            const ret = arg0.occlusionQuerySet;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_offset_31fc201c2092cd2c: function(arg0, arg1) {
            const ret = arg1.offset;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_get_offset_591a08eb94160bbc: function(arg0) {
            const ret = arg0.offset;
            return ret;
        },
        __wbg_get_offset_ae690db3452061a8: function(arg0, arg1) {
            const ret = arg1.offset;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_get_offset_de82c37ab27878a0: function(arg0, arg1) {
            const ret = arg1.offset;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_get_operation_f2dc797af9cb3cb7: function(arg0) {
            const ret = arg0.operation;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_GpuBlendOperation.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_origin_0b013f97bcd75a76: function(arg0) {
            const ret = arg0.origin;
            return ret;
        },
        __wbg_get_origin_433451a90afa6938: function(arg0) {
            const ret = arg0.origin;
            return ret;
        },
        __wbg_get_origin_dc37626cacaa1767: function(arg0) {
            const ret = arg0.origin;
            return ret;
        },
        __wbg_get_pass_op_77c4d572af12ee51: function(arg0) {
            const ret = arg0.passOp;
            return isLikeNone(ret) ? 9 : ((__wbindgen_enum_GpuStencilOperation.indexOf(ret) + 1 || 9) - 1);
        },
        __wbg_get_plural_categories_61c733f62b9e4e96: function(arg0) {
            const ret = arg0.pluralCategories;
            return ret;
        },
        __wbg_get_power_preference_f22d3158f6c5c939: function(arg0) {
            const ret = arg0.powerPreference;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuPowerPreference.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_premultiplied_alpha_c219d1f0cec45862: function(arg0) {
            const ret = arg0.premultipliedAlpha;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_premultiply_alpha_b37f93948669dfc2: function(arg0) {
            const ret = arg0.premultiplyAlpha;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_PremultiplyAlpha.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_primitive_c73b204d3c034667: function(arg0) {
            const ret = arg0.primitive;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_query_set_185fb65b37cee83d: function(arg0) {
            const ret = arg0.querySet;
            return ret;
        },
        __wbg_get_query_set_8270182cf7a07981: function(arg0) {
            const ret = arg0.querySet;
            return ret;
        },
        __wbg_get_r_1e286c566d572c9d: function(arg0) {
            const ret = arg0.r;
            return ret;
        },
        __wbg_get_required_features_03717ae42ab0e088: function(arg0) {
            const ret = arg0.requiredFeatures;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_required_limits_273ed7358ebd8ef1: function(arg0) {
            const ret = arg0.requiredLimits;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_resize_height_6a906d56f9e95814: function(arg0) {
            const ret = arg0.resizeHeight;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_resize_width_b251c9c9b4d9f2f9: function(arg0) {
            const ret = arg0.resizeWidth;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_resolve_target_7234066b3e494ad2: function(arg0) {
            const ret = arg0.resolveTarget;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_resource_545bdcbbec2109aa: function(arg0) {
            const ret = arg0.resource;
            return ret;
        },
        __wbg_get_rounding_increment_69260e84b30b855a: function(arg0) {
            const ret = arg0.roundingIncrement;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_rounding_increment_88b3e454348bb390: function(arg0) {
            const ret = arg0.roundingIncrement;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_rounding_mode_776c1ba8c7557645: function(arg0) {
            const ret = arg0.roundingMode;
            return isLikeNone(ret) ? 10 : ((__wbindgen_enum_RoundingMode.indexOf(ret) + 1 || 10) - 1);
        },
        __wbg_get_rounding_mode_d86897681cb5788c: function(arg0) {
            const ret = arg0.roundingMode;
            return isLikeNone(ret) ? 10 : ((__wbindgen_enum_RoundingMode.indexOf(ret) + 1 || 10) - 1);
        },
        __wbg_get_rounding_priority_608105fd0a522d49: function(arg0) {
            const ret = arg0.roundingPriority;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_RoundingPriority.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_rounding_priority_f2857e6b01457d55: function(arg0) {
            const ret = arg0.roundingPriority;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_RoundingPriority.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_rows_per_image_1d08f9dad36826a3: function(arg0) {
            const ret = arg0.rowsPerImage;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_rows_per_image_92057dd9e74aec19: function(arg0) {
            const ret = arg0.rowsPerImage;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_sample_count_9dd88987192fc8c7: function(arg0) {
            const ret = arg0.sampleCount;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_sample_count_a2127e23e0840152: function(arg0) {
            const ret = arg0.sampleCount;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_sample_type_0f14c0416892c464: function(arg0) {
            const ret = arg0.sampleType;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_GpuTextureSampleType.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_sampler_92e73e26b5db4efd: function(arg0) {
            const ret = arg0.sampler;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_second_94b81813e77a4ba2: function(arg0) {
            const ret = arg0.second;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_NumericFormat.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_seconds_d1bbb550839317f4: function(arg0) {
            const ret = arg0.seconds;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_DurationTimeUnitStyle.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_seconds_display_40f7a677ad427d1f: function(arg0) {
            const ret = arg0.secondsDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_sensitivity_70b2f078a64b94f9: function(arg0) {
            const ret = arg0.sensitivity;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_CollatorSensitivity.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_shader_location_dfaa514b35cf61d6: function(arg0) {
            const ret = arg0.shaderLocation;
            return ret;
        },
        __wbg_get_sign_display_609f4d7fb645b92a: function(arg0) {
            const ret = arg0.signDisplay;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_SignDisplay.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_size_2a22e69a1f7f2aa4: function(arg0, arg1) {
            const ret = arg1.size;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_get_size_7d1e723e72847cc5: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_get_size_e9de3e30f3343fc9: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_get_source_626e1965ee5963b8: function(arg0) {
            const ret = arg0.source;
            return ret;
        },
        __wbg_get_source_9289e3de9478c322: function(arg0) {
            const ret = arg0.source;
            return ret;
        },
        __wbg_get_src_factor_6c229f5841e36515: function(arg0) {
            const ret = arg0.srcFactor;
            return isLikeNone(ret) ? 18 : ((__wbindgen_enum_GpuBlendFactor.indexOf(ret) + 1 || 18) - 1);
        },
        __wbg_get_stencil_back_f5fdcf4d3b09db6f: function(arg0) {
            const ret = arg0.stencilBack;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_stencil_clear_value_b2b7238212209c49: function(arg0) {
            const ret = arg0.stencilClearValue;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_stencil_front_2d545c023ab608e0: function(arg0) {
            const ret = arg0.stencilFront;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_stencil_load_op_e7873ffbf68a7e71: function(arg0) {
            const ret = arg0.stencilLoadOp;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuLoadOp.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_stencil_read_mask_15b71892fd3aaa6a: function(arg0) {
            const ret = arg0.stencilReadMask;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_stencil_read_only_3b57b1e09d6b216a: function(arg0) {
            const ret = arg0.stencilReadOnly;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_stencil_read_only_619c0ee972f13f90: function(arg0) {
            const ret = arg0.stencilReadOnly;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_stencil_store_op_0469160286c4516d: function(arg0) {
            const ret = arg0.stencilStoreOp;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuStoreOp.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_stencil_write_mask_3da8658b7a2fe4e1: function(arg0) {
            const ret = arg0.stencilWriteMask;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_step_mode_7d11d4fba3ea3d2a: function(arg0) {
            const ret = arg0.stepMode;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuVertexStepMode.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_storage_texture_c10f7bf7f4074aa3: function(arg0) {
            const ret = arg0.storageTexture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_store_op_5ac419ed16995d6e: function(arg0) {
            const ret = arg0.storeOp;
            return (__wbindgen_enum_GpuStoreOp.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_get_strip_index_format_02478717b0df4d07: function(arg0) {
            const ret = arg0.stripIndexFormat;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_GpuIndexFormat.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_style_216ff12ce19b21b4: function(arg0) {
            const ret = arg0.style;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_NumberFormatStyle.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_style_59e374c4c5117d5a: function(arg0) {
            const ret = arg0.style;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_ListFormatStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_style_9e6ea584623dd978: function(arg0) {
            const ret = arg0.style;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DisplayNamesStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_style_b1b3c9c315bc1a0e: function(arg0) {
            const ret = arg0.style;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_RelativeTimeFormatStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_style_c9aeee3fa22429a7: function(arg0) {
            const ret = arg0.style;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_DurationFormatStyle.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_targets_c49eba4526bf484e: function(arg0) {
            const ret = arg0.targets;
            return ret;
        },
        __wbg_get_texture_646880ee90b061a9: function(arg0) {
            const ret = arg0.texture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_texture_7b9829c02b51a6ac: function(arg0) {
            const ret = arg0.texture;
            return ret;
        },
        __wbg_get_texture_aa47081412a42f0b: function(arg0) {
            const ret = arg0.texture;
            return ret;
        },
        __wbg_get_time_style_72009e91bec97cf4: function(arg0) {
            const ret = arg0.timeStyle;
            return isLikeNone(ret) ? 5 : ((__wbindgen_enum_DateTimeStyle.indexOf(ret) + 1 || 5) - 1);
        },
        __wbg_get_time_zone_87dd291bd9e0c691: function(arg0) {
            const ret = arg0.timeZone;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_time_zone_name_7aca71cb0def5f66: function(arg0) {
            const ret = arg0.timeZoneName;
            return isLikeNone(ret) ? 7 : ((__wbindgen_enum_TimeZoneNameFormat.indexOf(ret) + 1 || 7) - 1);
        },
        __wbg_get_timestamp_writes_17ec8e51c76b3137: function(arg0) {
            const ret = arg0.timestampWrites;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_timestamp_writes_e66d9015768600d0: function(arg0) {
            const ret = arg0.timestampWrites;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_tone_mapping_9f8330b2625ad2fc: function(arg0) {
            const ret = arg0.toneMapping;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_topology_958c51526a482525: function(arg0) {
            const ret = arg0.topology;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_GpuPrimitiveTopology.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_trailing_zero_display_2353b1a73b63eba0: function(arg0) {
            const ret = arg0.trailingZeroDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_TrailingZeroDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_trailing_zero_display_a13df9d19d6cb80b: function(arg0) {
            const ret = arg0.trailingZeroDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_TrailingZeroDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_type_42e3fe31fc079d2e: function(arg0) {
            const ret = arg0.type;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuBufferBindingType.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_type_4545d26864e1b7ad: function(arg0) {
            const ret = arg0.type;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_PluralRulesType.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_type_65bf68ae0f475041: function(arg0) {
            const ret = arg0.type;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_ListFormatType.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_type_6aff2b61c477d2d6: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_GpuQueryType.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_get_type_8be0dcd2e5d01b50: function(arg0) {
            const ret = arg0.type;
            return isLikeNone(ret) ? 7 : ((__wbindgen_enum_DisplayNamesType.indexOf(ret) + 1 || 7) - 1);
        },
        __wbg_get_type_c5ce2eb2b1ddc24c: function(arg0, arg1) {
            const ret = arg1.type;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_type_f890dd00e77cc059: function(arg0) {
            const ret = arg0.type;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_GpuSamplerBindingType.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_unchecked_6e0ad6d2a41b06f6: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_unclipped_depth_e929299c160e22ae: function(arg0) {
            const ret = arg0.unclippedDepth;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_unit_790f512c1aa8213f: function(arg0) {
            const ret = arg0.unit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_unit_display_055a74ab9d0c35dd: function(arg0) {
            const ret = arg0.unitDisplay;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_UnitDisplay.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_usage_16f991f7fb45407d: function(arg0) {
            const ret = arg0.usage;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_CollatorUsage.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_usage_1decb777a5e269b2: function(arg0) {
            const ret = arg0.usage;
            return ret;
        },
        __wbg_get_usage_aa9ebf580841e6a8: function(arg0) {
            const ret = arg0.usage;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_usage_ab4c1307875e85f9: function(arg0) {
            const ret = arg0.usage;
            return ret;
        },
        __wbg_get_usage_c6ad648fe80f46b5: function(arg0) {
            const ret = arg0.usage;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_use_grouping_417a9497f2439ad7: function(arg0) {
            const ret = arg0.useGrouping;
            return isLikeNone(ret) ? 6 : ((__wbindgen_enum_UseGrouping.indexOf(ret) + 1 || 6) - 1);
        },
        __wbg_get_vertex_11469ec1143ef587: function(arg0) {
            const ret = arg0.vertex;
            return ret;
        },
        __wbg_get_view_c13c2a8dfb428221: function(arg0) {
            const ret = arg0.view;
            return ret;
        },
        __wbg_get_view_c828307b3f008a95: function(arg0) {
            const ret = arg0.view;
            return ret;
        },
        __wbg_get_view_dimension_58c7fcc2bc93d83b: function(arg0) {
            const ret = arg0.viewDimension;
            return isLikeNone(ret) ? 7 : ((__wbindgen_enum_GpuTextureViewDimension.indexOf(ret) + 1 || 7) - 1);
        },
        __wbg_get_view_dimension_84f76b4abb806b3d: function(arg0) {
            const ret = arg0.viewDimension;
            return isLikeNone(ret) ? 7 : ((__wbindgen_enum_GpuTextureViewDimension.indexOf(ret) + 1 || 7) - 1);
        },
        __wbg_get_view_formats_0d7ac6222a441529: function(arg0) {
            const ret = arg0.viewFormats;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_view_formats_5e6a431a57b94208: function(arg0) {
            const ret = arg0.viewFormats;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_visibility_fa02ac03a651115b: function(arg0) {
            const ret = arg0.visibility;
            return ret;
        },
        __wbg_get_weekday_bfd3b7315dcec6af: function(arg0) {
            const ret = arg0.weekday;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_WeekdayFormat.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_weeks_cdfeff0ab36ed330: function(arg0) {
            const ret = arg0.weeks;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DurationUnitStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_weeks_display_12fa43c03184e0f0: function(arg0) {
            const ret = arg0.weeksDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_width_8e260c3aeefc8f67: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_get_write_mask_f706838e1a6d6b21: function(arg0) {
            const ret = arg0.writeMask;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_x_6052dd2f22e82393: function(arg0) {
            const ret = arg0.x;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_x_cd02ede70beae051: function(arg0) {
            const ret = arg0.x;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_xr_compatible_e210be264cb16259: function(arg0) {
            const ret = arg0.xrCompatible;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_get_y_2276e0c23d133cf9: function(arg0) {
            const ret = arg0.y;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_y_f163b742383a93bb: function(arg0) {
            const ret = arg0.y;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_get_year_7ef7578bdb878cad: function(arg0) {
            const ret = arg0.year;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_YearFormat.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_years_97f2079a5d4f95b8: function(arg0) {
            const ret = arg0.years;
            return isLikeNone(ret) ? 4 : ((__wbindgen_enum_DurationUnitStyle.indexOf(ret) + 1 || 4) - 1);
        },
        __wbg_get_years_display_80253a0b0df6c73a: function(arg0) {
            const ret = arg0.yearsDisplay;
            return isLikeNone(ret) ? 3 : ((__wbindgen_enum_DurationUnitDisplay.indexOf(ret) + 1 || 3) - 1);
        },
        __wbg_get_z_adbd206fcb7b1950: function(arg0) {
            const ret = arg0.z;
            return isLikeNone(ret) ? Number.MAX_SAFE_INTEGER : (ret) >>> 0;
        },
        __wbg_global_7c201667f8b962ce: function(arg0) {
            const ret = arg0.global;
            return ret;
        },
        __wbg_gpu_cbd27ad0589bc0b3: function(arg0) {
            const ret = arg0.gpu;
            return ret;
        },
        __wbg_groupCollapsed_05f01a860940290d: function() {
            console.groupCollapsed();
        },
        __wbg_groupCollapsed_186f1c549aa1660a: function(arg0, arg1) {
            console.groupCollapsed(arg0, arg1);
        },
        __wbg_groupCollapsed_18f4d5ce324a8731: function(arg0) {
            console.groupCollapsed(...arg0);
        },
        __wbg_groupCollapsed_1ef3e210beacee2e: function(arg0, arg1, arg2) {
            console.groupCollapsed(arg0, arg1, arg2);
        },
        __wbg_groupCollapsed_6c77f8f8a7ee9a73: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.groupCollapsed(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_groupCollapsed_97126e8bfe385f3a: function(arg0, arg1, arg2, arg3) {
            console.groupCollapsed(arg0, arg1, arg2, arg3);
        },
        __wbg_groupCollapsed_b5bce371336c8ffd: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.groupCollapsed(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_groupCollapsed_b76d811cc7c27e80: function(arg0, arg1, arg2, arg3, arg4) {
            console.groupCollapsed(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_groupCollapsed_e844987493c6f8b5: function(arg0) {
            console.groupCollapsed(arg0);
        },
        __wbg_groupEnd_d9c9530a756f235e: function() {
            console.groupEnd();
        },
        __wbg_group_35c670bd096b9380: function() {
            console.group();
        },
        __wbg_group_3674089a66233bec: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.group(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_group_71bdf85efe91f9ac: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.group(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_group_72bd7ebb551e9f11: function(arg0, arg1, arg2, arg3) {
            console.group(arg0, arg1, arg2, arg3);
        },
        __wbg_group_8672b5f687cf08cf: function(arg0, arg1) {
            console.group(arg0, arg1);
        },
        __wbg_group_8bf5328b363a8efd: function(arg0) {
            console.group(...arg0);
        },
        __wbg_group_93449750c237df1b: function(arg0) {
            console.group(arg0);
        },
        __wbg_group_d1aca0545289b912: function(arg0, arg1, arg2) {
            console.group(arg0, arg1, arg2);
        },
        __wbg_group_e080a691f2febf57: function(arg0, arg1, arg2, arg3, arg4) {
            console.group(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_groups_62992bb5eeb88e83: function(arg0) {
            const ret = arg0.groups;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_grow_1763407e29eb154f: function(arg0, arg1) {
            const ret = arg0.grow(arg1 >>> 0);
            return ret;
        },
        __wbg_grow_4860d0716dd2eb33: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.grow(arg1 >>> 0, arg2);
            return ret;
        }, arguments); },
        __wbg_grow_921bb12f163cfe6c: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.grow(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_grow_cf6bd99f8b92bd6a: function() { return handleError(function (arg0, arg1) {
            arg0.grow(arg1 >>> 0);
        }, arguments); },
        __wbg_growable_4cdd19e9f8779565: function(arg0) {
            const ret = arg0.growable;
            return ret;
        },
        __wbg_hardwareConcurrency_94fd86e68bb941b9: function(arg0) {
            const ret = arg0.hardwareConcurrency;
            return ret;
        },
        __wbg_hardwareConcurrency_c9435647b41823d9: function(arg0) {
            const ret = arg0.hardwareConcurrency;
            return ret;
        },
        __wbg_hasAttributeNS_42bd15205514d89c: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.hasAttributeNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        },
        __wbg_hasAttribute_1fc23d9b37b6dfb1: function(arg0, arg1, arg2) {
            const ret = arg0.hasAttribute(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_hasAttributes_60d77cf4797a3209: function(arg0) {
            const ret = arg0.hasAttributes();
            return ret;
        },
        __wbg_hasChildNodes_88d05ea47fc00f7d: function(arg0) {
            const ret = arg0.hasChildNodes();
            return ret;
        },
        __wbg_hasFocus_cc8af87239498204: function() { return handleError(function (arg0) {
            const ret = arg0.hasFocus();
            return ret;
        }, arguments); },
        __wbg_hasInstance_38a24bc135a829fd: function() {
            const ret = Symbol.hasInstance;
            return ret;
        },
        __wbg_hasPointerCapture_14d1d26b62f943f8: function(arg0, arg1) {
            const ret = arg0.hasPointerCapture(arg1);
            return ret;
        },
        __wbg_hasSuspendTaint_762b80f3ece54a02: function(arg0) {
            const ret = arg0.hasSuspendTaint();
            return ret;
        },
        __wbg_has_8374cf06984d8bfc: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_has_bfde228e61357fc5: function(arg0, arg1, arg2) {
            const ret = arg0.has(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_has_dbcaf77712624019: function(arg0, arg1, arg2) {
            const ret = arg0.has(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_hash_85c0967c1770eccc: function(arg0, arg1) {
            const ret = arg1.hash;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_height_1ac64d880e0a71ae: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_46f95580d0507f0a: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_5009566d8a513df8: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_5b881707f59cdee5: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_6eec812c213259a1: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_6f29ab40ae50636d: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_88fcc72a51006db4: function() { return handleError(function (arg0) {
            const ret = arg0.height;
            return ret;
        }, arguments); },
        __wbg_height_91866637343d9a34: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_96c07d9559d0200a: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_9f27216001e3c804: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_f2cc35b336f266f1: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_hidden_abd30e50759f134d: function(arg0) {
            const ret = arg0.hidden;
            return ret;
        },
        __wbg_hidden_c08eb1c29c138ab0: function(arg0) {
            const ret = arg0.hidden;
            return ret;
        },
        __wbg_hidePopover_35bb234f587ca1a8: function() { return handleError(function (arg0) {
            arg0.hidePopover();
        }, arguments); },
        __wbg_host_8528938720b0ef01: function(arg0, arg1) {
            const ret = arg1.host;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_hostname_c2691419499855f0: function(arg0, arg1) {
            const ret = arg1.hostname;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_hour_cycle_a4a805b0554d0027: function(arg0) {
            const ret = arg0.hourCycle;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_hours_84ef4e8eb671042f: function(arg0, arg1) {
            const ret = arg1.hours;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_href_bc4909da4ed58381: function(arg0, arg1) {
            const ret = arg1.href;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_hspace_e73ef7945d7aa061: function(arg0) {
            const ret = arg0.hspace;
            return ret;
        },
        __wbg_hypot_013b37a8dc4961b0: function(arg0, arg1) {
            const ret = Math.hypot(arg0, arg1);
            return ret;
        },
        __wbg_id_2bb4f5057d3bfc99: function(arg0, arg1) {
            const ret = arg1.id;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_ignoreCase_d16c6e9fadfdc5b5: function(arg0) {
            const ret = arg0.ignoreCase;
            return ret;
        },
        __wbg_importExternalTexture_826c893c882b4702: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.importExternalTexture(arg1);
            return ret;
        }, arguments); },
        __wbg_importNode_0b6c038a53616891: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.importNode(arg1);
            return ret;
        }, arguments); },
        __wbg_importNode_f996ef016363a0c0: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.importNode(arg1, arg2 !== 0);
            return ret;
        }, arguments); },
        __wbg_importScripts_09a3eebb03d63a8c: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.importScripts(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_importScripts_10ac75eedb3600fd: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.importScripts(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_importScripts_181bde74402c1bab: function() { return handleError(function (arg0) {
            arg0.importScripts();
        }, arguments); },
        __wbg_importScripts_783caff2a33e0e1b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.importScripts(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_importScripts_b0b3e8d20ca8bf08: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.importScripts(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_importScripts_c66d7117a05b8fcd: function() { return handleError(function (arg0, arg1) {
            arg0.importScripts(...arg1);
        }, arguments); },
        __wbg_importScripts_d850a4deb83c71f2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.importScripts(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_importScripts_d9ed3b9fd57649e4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.importScripts(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_importScripts_e9c11b8ed3c0e3ae: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.importScripts(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_imports_8374e3583e124801: function(arg0) {
            const ret = WebAssembly.Module.imports(arg0);
            return ret;
        },
        __wbg_imul_a1f7e4e6baf6c5ec: function(arg0, arg1) {
            const ret = Math.imul(arg0, arg1);
            return ret;
        },
        __wbg_includes_1fd6bcfdb8d065da: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.includes(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_indexOf_54c49ec5335ca264: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.indexOf(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_index_c444186717bc9842: function(arg0) {
            const ret = arg0.index;
            return ret;
        },
        __wbg_index_cb10626c11702023: function(arg0) {
            const ret = arg0.index;
            return ret;
        },
        __wbg_inert_ab9087273ae32009: function(arg0) {
            const ret = arg0.inert;
            return ret;
        },
        __wbg_info_2a2a2dbb04263bb7: function() {
            console.info();
        },
        __wbg_info_2b9e0fde1894ce52: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.info(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_info_2cb85ddc4c59d718: function(arg0, arg1, arg2) {
            console.info(arg0, arg1, arg2);
        },
        __wbg_info_45ebac60f2b820a4: function(arg0) {
            console.info(...arg0);
        },
        __wbg_info_6016e50d6f0fe837: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.info(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_info_79f5309d69d9c70e: function(arg0, arg1, arg2, arg3) {
            console.info(arg0, arg1, arg2, arg3);
        },
        __wbg_info_8274648060f03d52: function(arg0, arg1, arg2, arg3, arg4) {
            console.info(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_info_91a8fcd51fd17fff: function(arg0) {
            const ret = arg0.info;
            return ret;
        },
        __wbg_info_c82e7b5f4470c094: function(arg0, arg1) {
            console.info(arg0, arg1);
        },
        __wbg_info_eadbe775a8e2e9eb: function(arg0) {
            console.info(arg0);
        },
        __wbg_initEvent_2392b15755d11022: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.initEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0);
        },
        __wbg_initEvent_984f9baa37799581: function(arg0, arg1, arg2, arg3) {
            arg0.initEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0);
        },
        __wbg_initEvent_fc17277fbfe335ad: function(arg0, arg1, arg2) {
            arg0.initEvent(getStringFromWasm0(arg1, arg2));
        },
        __wbg_initKeyboardEvent_03c1c42bbd28e71f: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0);
        }, arguments); },
        __wbg_initKeyboardEvent_16d40bdd11b6307c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, getStringFromWasm0(arg6, arg7), arg8 >>> 0);
        }, arguments); },
        __wbg_initKeyboardEvent_2eaedb2efc1e4573: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, getStringFromWasm0(arg6, arg7), arg8 >>> 0, arg9 !== 0, arg10 !== 0, arg11 !== 0);
        }, arguments); },
        __wbg_initKeyboardEvent_69701672d7b2bb82: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5);
        }, arguments); },
        __wbg_initKeyboardEvent_6c0d89666b7c6dd0: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_initKeyboardEvent_93969e7b34cc037b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, getStringFromWasm0(arg6, arg7));
        }, arguments); },
        __wbg_initKeyboardEvent_b59a01aa4dce4fde: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0);
        }, arguments); },
        __wbg_initKeyboardEvent_d523021c99bbc0e0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, getStringFromWasm0(arg6, arg7), arg8 >>> 0, arg9 !== 0, arg10 !== 0, arg11 !== 0, arg12 !== 0);
        }, arguments); },
        __wbg_initKeyboardEvent_da6547b93a7c0601: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, getStringFromWasm0(arg6, arg7), arg8 >>> 0, arg9 !== 0, arg10 !== 0);
        }, arguments); },
        __wbg_initKeyboardEvent_dc13fa99b693572f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.initKeyboardEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, getStringFromWasm0(arg6, arg7), arg8 >>> 0, arg9 !== 0);
        }, arguments); },
        __wbg_initMouseEvent_0a737497570f7e79: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9, arg10, arg11 !== 0, arg12 !== 0, arg13 !== 0);
        },
        __wbg_initMouseEvent_0c99bd9cc554d48d: function(arg0, arg1, arg2, arg3) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0);
        },
        __wbg_initMouseEvent_21b75bcc5bd3da11: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8);
        },
        __wbg_initMouseEvent_823ccb912480ed38: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0);
        },
        __wbg_initMouseEvent_962f8196b1b558cd: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9, arg10, arg11 !== 0, arg12 !== 0, arg13 !== 0, arg14 !== 0);
        },
        __wbg_initMouseEvent_b70b1ee2857f3020: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5);
        },
        __wbg_initMouseEvent_c30417e1d7d36674: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9, arg10, arg11 !== 0);
        },
        __wbg_initMouseEvent_c8aa0e18cd160cc8: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7);
        },
        __wbg_initMouseEvent_caedc351ec43a949: function(arg0, arg1, arg2) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2));
        },
        __wbg_initMouseEvent_d2b3c42961733bb5: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9, arg10);
        },
        __wbg_initMouseEvent_d5a9386b983b783d: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9, arg10, arg11 !== 0, arg12 !== 0);
        },
        __wbg_initMouseEvent_d704fc8ab17c48dd: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9);
        },
        __wbg_initMouseEvent_eb4b931fd2c8e3e5: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_initMouseEvent_f71144987cc37897: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9, arg10, arg11 !== 0, arg12 !== 0, arg13 !== 0, arg14 !== 0, arg15, arg16);
        },
        __wbg_initMouseEvent_fc9ec89bf947e6bc: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15) {
            arg0.initMouseEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6, arg7, arg8, arg9, arg10, arg11 !== 0, arg12 !== 0, arg13 !== 0, arg14 !== 0, arg15);
        },
        __wbg_initUIEvent_0451ff55cb1214ed: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.initUIEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_initUIEvent_42167a8dbc121210: function(arg0, arg1, arg2) {
            arg0.initUIEvent(getStringFromWasm0(arg1, arg2));
        },
        __wbg_initUIEvent_c81a58398a2b6049: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.initUIEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0, arg5);
        },
        __wbg_initUIEvent_cdacc6e19aea40df: function(arg0, arg1, arg2, arg3) {
            arg0.initUIEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0);
        },
        __wbg_initUIEvent_ced916cb50f5c270: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.initUIEvent(getStringFromWasm0(arg1, arg2), arg3 !== 0, arg4 !== 0);
        },
        __wbg_inlineSize_3c8412828bef21eb: function(arg0) {
            const ret = arg0.inlineSize;
            return ret;
        },
        __wbg_innerHTML_e32f39b67a3c884e: function(arg0, arg1) {
            const ret = arg1.innerHTML;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_innerHeight_92315939e482496d: function() { return handleError(function (arg0) {
            const ret = arg0.innerHeight;
            return ret;
        }, arguments); },
        __wbg_innerText_a7d4c1883b4f372f: function(arg0, arg1) {
            const ret = arg1.innerText;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_innerWidth_dec7d2ac73df3e63: function() { return handleError(function (arg0) {
            const ret = arg0.innerWidth;
            return ret;
        }, arguments); },
        __wbg_inputEncoding_8f3bf26bd1a909a7: function(arg0, arg1) {
            const ret = arg1.inputEncoding;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_input_078929dcb360a684: function(arg0) {
            const ret = arg0.input;
            return ret;
        },
        __wbg_input_385ea9758d070bb0: function() {
            const ret = RegExp.input;
            return ret;
        },
        __wbg_input_3b9c39cff585bfb5: function(arg0) {
            const ret = arg0.input;
            return ret;
        },
        __wbg_insertAdjacentElement_e7e2cb2b228464d3: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.insertAdjacentElement(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_insertAdjacentHTML_53a11864b121faf5: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.insertAdjacentHTML(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_insertAdjacentText_3029cd1b839b3b3f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.insertAdjacentText(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_insertBefore_9121f73148bc4f7c: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.insertBefore(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_insertDebugMarker_43f088a905bb621e: function(arg0, arg1, arg2) {
            arg0.insertDebugMarker(getStringFromWasm0(arg1, arg2));
        },
        __wbg_insertDebugMarker_b2b7a4dc30a19bcd: function(arg0, arg1, arg2) {
            arg0.insertDebugMarker(getStringFromWasm0(arg1, arg2));
        },
        __wbg_insertDebugMarker_bd280225c1d10c7e: function(arg0, arg1, arg2) {
            arg0.insertDebugMarker(getStringFromWasm0(arg1, arg2));
        },
        __wbg_insertDebugMarker_c70397db08a5ffcc: function(arg0, arg1, arg2) {
            arg0.insertDebugMarker(getStringFromWasm0(arg1, arg2));
        },
        __wbg_instanceof_AbortController_7ae1cdcc8046fb56: function(arg0) {
            let result;
            try {
                result = arg0 instanceof AbortController;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_AbortSignal_d7d7740551dc86f4: function(arg0) {
            let result;
            try {
                result = arg0 instanceof AbortSignal;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_AggregateError_47af840930fe8520: function(arg0) {
            let result;
            try {
                result = arg0 instanceof AggregateError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ArrayBufferOptions_98d7dfde75c038c0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBufferOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_4480b9e0068a8adb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Atomics_0e610a494a59a687: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Atomics;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_BigInt64Array_7fb37514121a9359: function(arg0) {
            let result;
            try {
                result = arg0 instanceof BigInt64Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_BigInt_28e7138c0e6742bc: function(arg0) {
            let result;
            try {
                result = arg0 instanceof BigInt;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_BigUint64Array_0d56c094d0e7bca9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof BigUint64Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_BlobPropertyBag_fba0c2852876478d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof BlobPropertyBag;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Blob_c6523f92a32c8695: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Blob;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Boolean_d2e68ce10e29ec23: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Boolean;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CanvasAnimateExt_a813c971ee98690c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CanvasAnimateExt;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CanvasFullScreenApiSupport_6235d028a0ea47f4: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CanvasFullScreenApiSupport;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CollatorOptions_e8180e356d73ef06: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CollatorOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Collator_ee604a1508d5ce9a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.Collator;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CompileError_7c02db84664b2adb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.CompileError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CssStyleDeclaration_86b3ca402ae30580: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CSSStyleDeclaration;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DataView_df981fe6dc913062: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DataView;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DateTimeFormatOptions_25ebbec95c85fcc1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DateTimeFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DateTimeFormatPart_f26b0bf3fccfe7dc: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DateTimeFormatPart;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DateTimeFormat_719860c84b272853: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.DateTimeFormat;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DateTimeRangeFormatPart_5ac57aea5aae7682: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DateTimeRangeFormatPart;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Date_e54edffdcb007f5f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Date;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DisplayNamesOptions_a80e817203b91ec6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DisplayNamesOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DisplayNames_9f4e6b2b74b910f9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.DisplayNames;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Document_d1955f84f5d0351c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Document;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DomException_952faa8037702c00: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DOMException;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DomRectReadOnly_88160f42b962d73b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DOMRectReadOnly;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DomRect_c4fcca3dcc155923: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DOMRect;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DurationFormatOptions_93595cda3fea370c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DurationFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DurationFormatPart_cde03457d25cb0ce: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DurationFormatPart;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DurationFormat_cff3c3ba5e996aee: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.DurationFormat;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Duration_0f4c269e63d0f824: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Duration;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Element_beebfaab75d12d9d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Element;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ErrorOptions_8168fbf177edc0f2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ErrorOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Error_1fdac9f13a8181ba: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Error;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Error_7e91bccc17ccebea: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Error;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_EvalError_37b1d98e4d49fa9e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof EvalError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_EventTarget_117e3bd019349858: function(arg0) {
            let result;
            try {
                result = arg0 instanceof EventTarget;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Event_512f3841fa744d1e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Event;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Exception_2560f81d27d99315: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.Exception;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ExitFullscreen_af0717d51dd16ea3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ExitFullscreen;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_FinalizationRegistry_149a127204e20460: function(arg0) {
            let result;
            try {
                result = arg0 instanceof FinalizationRegistry;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Float16Array_8c65d235e752e028: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Float16Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Float32Array_0734a24e43081e98: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Float32Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Float64Array_92032ec8f216bceb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Float64Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_FocusEvent_cadb56dad3dfd4ac: function(arg0) {
            let result;
            try {
                result = arg0 instanceof FocusEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_FullscreenElement_e4458babb5fc5e23: function(arg0) {
            let result;
            try {
                result = arg0 instanceof FullscreenElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Global_2c2df7a99c3b121b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.Global;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Global_834c4372e9651202: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Global;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Global_c5bc1de99fabbbb9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Global;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Global_d454b48cbd92afa7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Global;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Global_fde297935aaf0b0d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Global;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuAdapterInfo_88ec8e42f5f752e8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUAdapterInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuAdapter_1297a3a5ce0db3ff: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUAdapter;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBindGroupDescriptor_fc678172bf8a0a5c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBindGroupDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBindGroupEntry_3910c6548510a643: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBindGroupEntry;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBindGroupLayoutDescriptor_8dfffa3b2a1cc7eb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBindGroupLayoutDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBindGroupLayoutEntry_84c306887bd2a9f8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBindGroupLayoutEntry;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBindGroupLayout_5ff446c03fb579fb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBindGroupLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBindGroup_ddf5c8ea73e57770: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBindGroup;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBlendComponent_8bf37b5252b1a107: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBlendComponent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBlendState_1d87648cd0ad791d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBlendState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBufferBindingLayout_ddc1276b0ce56ac8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBufferBindingLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBufferBinding_bf73a7ac5f12e99d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBufferBinding;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBufferDescriptor_1e1c107594e0a351: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBufferDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuBuffer_2fddcd0ca41c3e0c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCanvasConfiguration_49431e9ff18f5e58: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCanvasConfiguration;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCanvasContext_13613277d7bf3768: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCanvasContext;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCanvasToneMapping_842b3e7ce616183a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCanvasToneMapping;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuColorDict_ccd56a0239d116b3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUColorDict;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuColorTargetState_3b4f01826df18290: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUColorTargetState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCommandBufferDescriptor_adc5e03c9e726fd0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCommandBufferDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCommandBuffer_54a6030b5b81d045: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCommandBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCommandEncoderDescriptor_5e822edc0729e07a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCommandEncoderDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCommandEncoder_41323b8a6bdcf69b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCommandEncoder;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCompilationInfo_730e0ec26c9f9a34: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCompilationInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCompilationMessage_949ac55e1170e331: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCompilationMessage;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuComputePassDescriptor_00bb1b5e1e0446e1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUComputePassDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuComputePassEncoder_85e9d7ae452ac0b2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUComputePassEncoder;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuComputePassTimestampWrites_46d950c411de9d8c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUComputePassTimestampWrites;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuComputePipelineDescriptor_761b5f1e299dbee0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUComputePipelineDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuComputePipeline_eeb3fbf2aa1c5efc: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUComputePipeline;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCopyExternalImageDestInfo_f36398548657e245: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCopyExternalImageDestInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuCopyExternalImageSourceInfo_8839d140df4d1283: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUCopyExternalImageSourceInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuDepthStencilState_fb22207efa7f47d8: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUDepthStencilState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuDeviceDescriptor_5bfeeb8d32bc5d85: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUDeviceDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuDeviceLostInfo_0e99a9595225a57d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUDeviceLostInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuDevice_bb3a381367bc8bb2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUDevice;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuError_3e4b7a865c79ec9d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuExtent3dDict_5ffc7b4bb8fcb3d7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUExtent3DDict;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuExternalTextureBindingLayout_8156f3589ba30dac: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUExternalTextureBindingLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuExternalTextureDescriptor_e6228b7fa140d12f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUExternalTextureDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuExternalTexture_885fda0bc78ca8d0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUExternalTexture;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuFragmentState_ce988b63b65fa65f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUFragmentState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuMultisampleState_89095cf0a76245d3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUMultisampleState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuObjectDescriptorBase_5c0294b19c0806b9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUObjectDescriptorBase;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuOrigin2dDict_602fa1b1490f3819: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUOrigin2DDict;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuOrigin3dDict_66d957da3dd03aae: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUOrigin3DDict;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuOutOfMemoryError_100c4600c3e13387: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUOutOfMemoryError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuPipelineDescriptorBase_7af21f0f6e194fd7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUPipelineDescriptorBase;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuPipelineLayoutDescriptor_a936ed0da2ee24f9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUPipelineLayoutDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuPipelineLayout_57c2ed3b86c55f39: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUPipelineLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuPrimitiveState_f03913f7d805b40f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUPrimitiveState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuProgrammableStage_b496fc4f113c8a87: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUProgrammableStage;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuQuerySetDescriptor_62f3754bf9c2b5ee: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUQuerySetDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuQuerySet_07b430e8d2c1879d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUQuerySet;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuQueueDescriptor_4157945ae264a845: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUQueueDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuQueue_9ab5e3e8fa644a62: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUQueue;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderBundleDescriptor_2cb33225bd307de1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderBundleDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderBundleEncoderDescriptor_436722982f72e33c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderBundleEncoderDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderBundleEncoder_b8cc4ffe8b344681: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderBundleEncoder;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderBundle_70c9e7cdac57ce55: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderBundle;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderPassColorAttachment_1cce69a6dc808bd4: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderPassColorAttachment;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderPassDepthStencilAttachment_bdd353b988708d6d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderPassDepthStencilAttachment;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderPassDescriptor_8e03192f98148bca: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderPassDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderPassEncoder_f29ac86c23a2867c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderPassEncoder;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderPassTimestampWrites_9582b5a9a2a482ca: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderPassTimestampWrites;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderPipelineDescriptor_e0b634199e733323: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderPipelineDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRenderPipeline_541c6df3bd33bf6a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURenderPipeline;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuRequestAdapterOptions_681f0f4d4dce771f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPURequestAdapterOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuSamplerBindingLayout_5cd37d34495d58eb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUSamplerBindingLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuSamplerDescriptor_1c5f2f7c02620433: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUSamplerDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuSampler_0b7d654775df0927: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUSampler;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuShaderModuleDescriptor_34838c5779b602c0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUShaderModuleDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuShaderModule_cc353977b129e46f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUShaderModule;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuStencilFaceState_c7c315f9584ad134: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUStencilFaceState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuStorageTextureBindingLayout_0af51589dc437815: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUStorageTextureBindingLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuSupportedFeatures_7c82433077d3c7ec: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUSupportedFeatures;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuSupportedLimits_40a05a146b5330a9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUSupportedLimits;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTexelCopyBufferInfo_3616862c648d49b7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTexelCopyBufferInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTexelCopyBufferLayout_3789742a2173719d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTexelCopyBufferLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTexelCopyTextureInfo_f378ff96499574e2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTexelCopyTextureInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTextureBindingLayout_8c020289b2206933: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTextureBindingLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTextureDescriptor_8f80b24eb01b8c17: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTextureDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTextureViewDescriptor_cdbe5f51f5f06bac: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTextureViewDescriptor;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTextureView_51ce4c61eca01ea9: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTextureView;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuTexture_fe5d6af39f76f424: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUTexture;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuUncapturedErrorEventInit_57555fec69ec5caa: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUUncapturedErrorEventInit;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuUncapturedErrorEvent_ed79bd7d3ad792c6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUUncapturedErrorEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuValidationError_94580aa7a41f3bdb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUValidationError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuVertexAttribute_96d05c6b3ec8fed2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUVertexAttribute;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuVertexBufferLayout_97ac7811b5a7b8f2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUVertexBufferLayout;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuVertexState_484b5e943bd3d6f7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPUVertexState;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Gpu_4d43fe1303384987: function(arg0) {
            let result;
            try {
                result = arg0 instanceof GPU;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlCanvasElement_ed02ed9136056019: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLCanvasElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlElement_4493a09212d3586f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlImageElement_c3b307a1e52b41dd: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLImageElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlMediaElement_e3b00d053b22e93e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLMediaElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlVideoElement_d41f9ca223d61d38: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLVideoElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IdleCallbackSupport_1b1a55c444b445e5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IdleCallbackSupport;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ImageBitmapOptions_b07cb78a80d5a683: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ImageBitmapOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ImageBitmapRenderingContext_60c5ddfd0ee22188: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ImageBitmapRenderingContext;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ImageBitmap_859f193922076b2b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ImageBitmap;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ImageDataExt_61a6eaafd7bd80ee: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ImageData.ImageDataExt;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ImageData_79d2ea78bff89d59: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ImageData;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Instance_d1b5c16044ce60d3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.Instance;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Int16Array_14184a9fabaa7da7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Int16Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Int32Array_5000d537cf3f61f2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Int32Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Int8Array_ce83b5a94e5d8ce3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Int8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IntersectionObserverEntry_0395244f6878de6e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IntersectionObserverEntry;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_IntersectionObserver_7e0dd32f150da6d5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof IntersectionObserver;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_JsClosure_b5bae4c8bcc3c198: function(arg0) {
            let result;
            try {
                result = arg0 instanceof JsClosure;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_JsString_40f01db2aa183d51: function(arg0) {
            let result;
            try {
                result = arg0 instanceof String;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_KeyboardEvent_be49f2d8e15d587a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof KeyboardEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_KeyframeAnimationOptions_f2cda6c93a30ce25: function(arg0) {
            let result;
            try {
                result = arg0 instanceof KeyframeAnimationOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Keyframe_acdbf13485be35c7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Keyframe;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_LinkError_f468fe146203d5ec: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.LinkError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ListFormatOptions_b744b077577f93b5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ListFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ListFormatPart_df4d061d659b62e5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ListFormatPart;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ListFormat_0bceef87fb70dd51: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.ListFormat;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_LocaleMatcherOptions_1bbb3fd3cec3a00b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof LocaleMatcherOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Locale_7aeca81982779dfa: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.Locale;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MaybeIterator_bbcc8b65f1dae3d1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MaybeIterator;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MediaQueryList_5bc1512df132d260: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MediaQueryList;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Memory_2550e651acb3f2f1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.Memory;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MessageChannel_981961d4b4ace1a0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MessageChannel;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MessageEvent_b0689d5fda634ef1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MessageEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MessagePort_b17bf77c564b57da: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MessagePort;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Module_725d5acf76d9627e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.Module;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MouseEventExt_a5dcb25e5228caa1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MouseEventExt;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MouseEvent_89eddfc6203c1749: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MouseEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NavigatorExt_a7f5b292a8c19590: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NavigatorExt;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NavigatorUaBrandVersion_1f30af52afb2c56b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NavigatorUaBrandVersion;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NavigatorUaData_7b2ba403b4ddf144: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NavigatorUaData;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NavigatorWithGpu_29f31f40c1dcd802: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NavigatorWithGpu;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Navigator_51c4c7741403f34f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Navigator;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NodeList_0e53cdcdd1327182: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NodeList;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Node_d29e7ded486fd76a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Node;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Null_58a53e038a9ff810: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Null;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NumberFormatOptions_f198feb25df35eec: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NumberFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NumberFormatPart_a7c5371af0b257ea: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NumberFormatPart;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NumberFormat_eb85fef63fe87f76: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.NumberFormat;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_NumberRangeFormatPart_1ae7b264b806e3b5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof NumberRangeFormatPart;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Number_370440786497e2c7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Number;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Object_33f20e6f12439f3e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Object;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_OffscreenCanvas_6d10a4c8fe267acb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof OffscreenCanvas;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_PageTransitionEvent_516acab372e96724: function(arg0) {
            let result;
            try {
                result = arg0 instanceof PageTransitionEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Performance_567d9bbed4ffdf0b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Performance;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_PermissionStatus_be02697eab7a2d6d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof PermissionStatus;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Permissions_2a4c8fa7b3f96a4a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Permissions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_PluralRulesOptions_d7354287025d762f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof PluralRulesOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_PluralRules_e7c33b738d5784d7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.PluralRules;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_PointerCoalescedEventsSupport_b1e27388da60dd78: function(arg0) {
            let result;
            try {
                result = arg0 instanceof PointerCoalescedEventsSupport;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_PointerEvent_8ef1feb51407c0ed: function(arg0) {
            let result;
            try {
                result = arg0 instanceof PointerEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Proxy_f2ebdf9c0f76ac68: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Proxy;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RangeError_7976f0547ad1279f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof RangeError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ReferenceError_05ccbdf8aabb0c35: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ReferenceError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RegExpMatchArray_53b2ddf1ae8aa59e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof RegExpMatchArray;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RegExp_eb4797a049ce5618: function(arg0) {
            let result;
            try {
                result = arg0 instanceof RegExp;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RelativeTimeFormatOptions_26ef43ca75077bcd: function(arg0) {
            let result;
            try {
                result = arg0 instanceof RelativeTimeFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RelativeTimeFormatPart_4ede55b41b455b18: function(arg0) {
            let result;
            try {
                result = arg0 instanceof RelativeTimeFormatPart;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RelativeTimeFormat_175c0fce10c8302b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.RelativeTimeFormat;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RequestFullscreen_231850918e60ead2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof RequestFullscreen;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResizeObserverEntryExt_f0605cba17098748: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResizeObserverEntryExt;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResizeObserverEntry_5d9f44b2d0d4bd47: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResizeObserverEntry;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResizeObserverOptions_bcef4ec5873e0299: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResizeObserverOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResizeObserverSize_52b48dee6a4ab521: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResizeObserverSize;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResizeObserver_e05b8510cb207cdf: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResizeObserver;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedCollatorOptions_184378e02f7627e5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedCollatorOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedDateTimeFormatOptions_ecb3a5b1fbf19044: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedDateTimeFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedDisplayNamesOptions_105542ddd14397c3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedDisplayNamesOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedDurationFormatOptions_7ef5030cf45d6a91: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedDurationFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedListFormatOptions_6cfba9ca32e55034: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedListFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedNumberFormatOptions_bce27e104d1ff33f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedNumberFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedPluralRulesOptions_9dc4da26055a78f1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedPluralRulesOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedRelativeTimeFormatOptions_599f4456719024a0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedRelativeTimeFormatOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ResolvedSegmenterOptions_0821d0797cc0e17d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ResolvedSegmenterOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_RuntimeError_fa0d96398e97d301: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.RuntimeError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_SchedulerPostTaskOptions_76dcefaf04b40a95: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SchedulerPostTaskOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_SchedulerSupport_7ec624ad3d63cfb0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SchedulerSupport;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Scheduler_c71bdaa77e8195b4: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Scheduler;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ScreenOrientation_8c43530a7b2941f4: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ScreenOrientation;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Screen_a5eac5fea5bf5800: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Screen;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_SegmentData_9a133ff5f1cf91fb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SegmentData;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_SegmenterOptions_4456167f573d9c1f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SegmenterOptions;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Segmenter_17382af6f2468198: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Intl.Segmenter;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Segments_6b17a67dfb9aa725: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Segments;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_SharedArrayBuffer_23468fe6287a6db3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SharedArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Symbol_34fbb17f51c1b063: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Symbol;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_SyntaxError_d15da58600e1f9ed: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SyntaxError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Table_4b4d507f81f7ae7c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.Table;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Tag_55f8841ad3b6e849: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAssembly.Tag;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_TextInfo_0f2e9dc7211a2bf5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof TextInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_TypeError_aa4c0c0517d53151: function(arg0) {
            let result;
            try {
                result = arg0 instanceof TypeError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_UiEvent_69f49da85cdd3bea: function(arg0) {
            let result;
            try {
                result = arg0 instanceof UIEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint16Array_4688e2da208e85be: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint16Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint32Array_27cc9a6a9eb3732e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint32Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_309b927aaf7a3fc7: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8ClampedArray_fcfc4574989acd0d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8ClampedArray;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Undefined_78410884b9503985: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Undefined;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_UriError_120ff145ff0d2786: function(arg0) {
            let result;
            try {
                result = arg0 instanceof URIError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Url_fa0339ea0442e6d5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof URL;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_VideoFrame_def932d24c3e7bc5: function(arg0) {
            let result;
            try {
                result = arg0 instanceof VideoFrame;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WaitAsyncResult_ac08506c60348548: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WaitAsyncResult;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WebAnimation_117272199b524daa: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WebAnimation;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WeekInfo_91cf7d0f09d651de: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WeekInfo;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WgslLanguageFeatures_389e71526cf76514: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WGSLLanguageFeatures;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WheelEvent_8a8f43ee9318fcd4: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WheelEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WindowSupportExt_9b983de8f6efe98c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WindowSupportExt;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_05ba1ee4f6781663: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WorkerGlobalScope_8ec07b5e040a41c3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WorkerGlobalScope;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WorkerNavigator_05b371c84e4605be: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WorkerNavigator;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Worker_0cea94435b9dd28a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Worker;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Worker_2180e018d5998b89: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Worker;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instantiateStreaming_b96e98f023fe922e: function(arg0, arg1) {
            const ret = WebAssembly.instantiateStreaming(arg0, arg1);
            return ret;
        },
        __wbg_instantiate_222cb1650e0759e1: function(arg0, arg1, arg2) {
            const ret = WebAssembly.instantiate(getArrayU8FromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_instantiate_74e5404a875e916e: function(arg0, arg1) {
            const ret = WebAssembly.instantiate(arg0, arg1);
            return ret;
        },
        __wbg_intersectionRatio_7c65292cc5ad712c: function(arg0) {
            const ret = arg0.intersectionRatio;
            return ret;
        },
        __wbg_intersectionRect_be1020a3be2ed245: function(arg0) {
            const ret = arg0.intersectionRect;
            return ret;
        },
        __wbg_isArray_0677c962b281d01a: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isArray_82995d8620818ac5: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isComposing_919a0fdf6ac030c9: function(arg0) {
            const ret = arg0.isComposing;
            return ret;
        },
        __wbg_isConcatSpreadable_2afdba3f9ec89dc8: function() {
            const ret = Symbol.isConcatSpreadable;
            return ret;
        },
        __wbg_isConnected_c24b5a7bb035eae0: function(arg0) {
            const ret = arg0.isConnected;
            return ret;
        },
        __wbg_isContentEditable_b5df1709c4df3ae8: function(arg0) {
            const ret = arg0.isContentEditable;
            return ret;
        },
        __wbg_isDefaultNamespace_d10064acba2c8e76: function(arg0, arg1, arg2) {
            const ret = arg0.isDefaultNamespace(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_isEqualNode_9a276602f6e48324: function(arg0, arg1) {
            const ret = arg0.isEqualNode(arg1);
            return ret;
        },
        __wbg_isFallbackAdapter_ee3821693b42407a: function(arg0) {
            const ret = arg0.isFallbackAdapter;
            return ret;
        },
        __wbg_isFinite_373a167d07d16aa5: function(arg0) {
            const ret = isFinite(arg0);
            return ret;
        },
        __wbg_isFinite_a44704056dba699a: function(arg0) {
            const ret = Number.isFinite(arg0);
            return ret;
        },
        __wbg_isInteger_680bb16cabc88721: function(arg0) {
            const ret = Number.isInteger(arg0);
            return ret;
        },
        __wbg_isIntersecting_fc6d9529a49c5d62: function(arg0) {
            const ret = arg0.isIntersecting;
            return ret;
        },
        __wbg_isLockFree_07459e1dc05294ff: function(arg0) {
            const ret = Atomics.isLockFree(arg0 >>> 0);
            return ret;
        },
        __wbg_isMap_368539bb80b586f6: function(arg0) {
            const ret = arg0.isMap;
            return ret;
        },
        __wbg_isNaN_76720d0254c647a4: function(arg0) {
            const ret = Number.isNaN(arg0);
            return ret;
        },
        __wbg_isPrimary_e59b27f91017e844: function(arg0) {
            const ret = arg0.isPrimary;
            return ret;
        },
        __wbg_isSafeInteger_04f36e4056f1b851: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_isSameNode_75a8a5f6302c6182: function(arg0, arg1) {
            const ret = arg0.isSameNode(arg1);
            return ret;
        },
        __wbg_isSecureContext_7fdd937a766bd09d: function(arg0) {
            const ret = arg0.isSecureContext;
            return ret;
        },
        __wbg_isSecureContext_d2e906a088ea2127: function(arg0) {
            const ret = arg0.isSecureContext;
            return ret;
        },
        __wbg_isTrusted_a23d17149e446545: function(arg0) {
            const ret = arg0.isTrusted;
            return ret;
        },
        __wbg_isView_efae9308a44fc593: function(arg0) {
            const ret = ArrayBuffer.isView(arg0);
            return ret;
        },
        __wbg_is_76530270e9d88774: function(arg0, arg1) {
            const ret = arg0.is(arg1);
            return ret;
        },
        __wbg_is_7b9d0b289033c7de: function(arg0, arg1) {
            const ret = Object.is(arg0, arg1);
            return ret;
        },
        __wbg_is_word_like_b70e4e984ace7ad5: function(arg0) {
            const ret = arg0.isWordLike;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg_item_20d060e2ba81115e: function(arg0, arg1) {
            const ret = arg0.item(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_item_802f88bcd2967039: function(arg0, arg1, arg2) {
            const ret = arg1.item(arg2 >>> 0);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_iterator_6f722e4a93058b71: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_keyCode_f9ab89c2dd6c3770: function(arg0) {
            const ret = arg0.keyCode;
            return ret;
        },
        __wbg_keyFor_43076d12e9e446dd: function(arg0) {
            const ret = Symbol.keyFor(arg0);
            return ret;
        },
        __wbg_key_803dca86cdcfa8dd: function(arg0, arg1) {
            const ret = arg1.key;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_keys_62a58dd85976fadb: function(arg0) {
            const ret = arg0.keys();
            return ret;
        },
        __wbg_keys_cf55acdf6b776017: function(arg0) {
            const ret = arg0.keys();
            return ret;
        },
        __wbg_keys_df6da84954627a20: function(arg0) {
            const ret = arg0.keys();
            return ret;
        },
        __wbg_label_1a2644ce2233cbc9: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_26db207381be979a: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_32c695c4efe0aaee: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_3390c8669440587e: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_3534264536140caa: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_3f2203ba03e535ba: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_45a2be06d98c893f: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_4c978f46e5cc4bbf: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_4dade6e1b1444392: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_603afacd64d5b8c3: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_926ca989ddd5b9b6: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_9a8583e3a20fafc7: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_be5b00c2e13fb552: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_bfd6f63ec0aefeae: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_c35c9d055de01619: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_de74f394c320e636: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_e0e83854924ea868: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_e5fd019a7428b333: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_e6e4705a9a6fb4aa: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_label_ffe4a52715ea960f: function(arg0, arg1) {
            const ret = arg1.label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_lang_a73e0fb099640968: function(arg0, arg1) {
            const ret = arg1.lang;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_language_4f09493ffb9388cd: function(arg0, arg1) {
            const ret = arg1.language;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_language_7777fc8f4345cafe: function(arg0, arg1) {
            const ret = arg1.language;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_language_92c90b9df9ecb7c4: function(arg0) {
            const ret = arg0.language;
            return ret;
        },
        __wbg_languages_8649f3472c635ab2: function(arg0) {
            const ret = arg0.languages;
            return ret;
        },
        __wbg_languages_9cbcd71220f73a69: function(arg0) {
            const ret = arg0.languages;
            return ret;
        },
        __wbg_lastChild_40cbea243f82ab94: function(arg0) {
            const ret = arg0.lastChild;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_lastElementChild_4ff3206cc206c81e: function(arg0) {
            const ret = arg0.lastElementChild;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_lastElementChild_8fcb396648ec04e2: function(arg0) {
            const ret = arg0.lastElementChild;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_lastIndexOf_20105daa9d0bacfc: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.lastIndexOf(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_lastMatch_af73c1e6abd17369: function() {
            const ret = RegExp.lastMatch;
            return ret;
        },
        __wbg_lastModified_805e892facef2c63: function(arg0, arg1) {
            const ret = arg1.lastModified;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_lastParen_02b0d7215e350579: function() {
            const ret = RegExp.lastParen;
            return ret;
        },
        __wbg_lastStyleSheetSet_67ddad1ac37cb8f7: function(arg0, arg1) {
            const ret = arg1.lastStyleSheetSet;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_last_index_d77beb97fe74007a: function(arg0) {
            const ret = arg0.lastIndex;
            return ret;
        },
        __wbg_layerX_882dfb786988b30f: function(arg0) {
            const ret = arg0.layerX;
            return ret;
        },
        __wbg_layerY_0fd4507712e8bd05: function(arg0) {
            const ret = arg0.layerY;
            return ret;
        },
        __wbg_leftContext_fe92743552500e49: function() {
            const ret = RegExp.leftContext;
            return ret;
        },
        __wbg_left_7e76a74d0db1754f: function(arg0) {
            const ret = arg0.left;
            return ret;
        },
        __wbg_left_f4f2f94a4dc2fccc: function() { return handleError(function (arg0) {
            const ret = arg0.left;
            return ret;
        }, arguments); },
        __wbg_length_0133fa10e3234c57: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_02c64e687322fa34: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_12e0b1cb009a7e96: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_19ec13fae7e33740: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_1f0964f4a5e2c6d8: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_2404a0bb8ce3ef71: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_351aee1725a9b7f2: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_370319915dc99107: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_381d540857ec99e8: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_530364c9b0329c79: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_6c6d87ebecac88c0: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_71447f3786e4dbb9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_81804e6c5f144937: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_891a8becdae861d9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_98f10d1e2f4ea968: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_a6f0e2586a65d524: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_abdacd95a2a2278e: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_f013b2ebf7dcf709: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_f340780a269edc6b: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_f835a518a2e03647: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_limits_25f7265ea0cad6c5: function(arg0) {
            const ret = arg0.limits;
            return ret;
        },
        __wbg_limits_b3a1d99e863846d4: function(arg0) {
            const ret = arg0.limits;
            return ret;
        },
        __wbg_lineNum_fd7f69309ec28204: function(arg0) {
            const ret = arg0.lineNum;
            return ret;
        },
        __wbg_lineNumber_2a06c2a97c4dd893: function(arg0) {
            const ret = arg0.lineNumber;
            return ret;
        },
        __wbg_linePos_3d7579cabd9c7a92: function(arg0) {
            const ret = arg0.linePos;
            return ret;
        },
        __wbg_load_8eb12bedc3abeb81: function(arg0) {
            arg0.load();
        },
        __wbg_localName_68b9b8e5bd76d9c4: function(arg0, arg1) {
            const ret = arg1.localName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_localeCompare_1b2303db613885d7: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.localeCompare(getStringFromWasm0(arg1, arg2), arg3, arg4);
            return ret;
        },
        __wbg_location_8f24df2c257fb974: function(arg0) {
            const ret = arg0.location;
            return ret;
        },
        __wbg_lock_b2cde94f6f2f7982: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.lock(__wbindgen_enum_OrientationLockType[arg1]);
            return ret;
        }, arguments); },
        __wbg_log10_1ddb2ba68ec96d41: function(arg0) {
            const ret = Math.log10(arg0);
            return ret;
        },
        __wbg_log1p_837b58ffb0ecf085: function(arg0) {
            const ret = Math.log1p(arg0);
            return ret;
        },
        __wbg_log2_b23f9b558b3ec09f: function(arg0) {
            const ret = Math.log2(arg0);
            return ret;
        },
        __wbg_log_5b36d456ec1c6c35: function(arg0, arg1) {
            console.log(arg0, arg1);
        },
        __wbg_log_65a1168177267690: function(arg0, arg1, arg2) {
            console.log(arg0, arg1, arg2);
        },
        __wbg_log_723c627e49d9f0a0: function(arg0, arg1, arg2, arg3, arg4) {
            console.log(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_log_7d3a19e9ae2c0aef: function() {
            console.log();
        },
        __wbg_log_a45418e25b210a4c: function(arg0, arg1, arg2, arg3) {
            console.log(arg0, arg1, arg2, arg3);
        },
        __wbg_log_b119921da4b9fa61: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.log(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_log_d267660666346fb3: function(arg0) {
            console.log(arg0);
        },
        __wbg_log_f018e7235251d55c: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.log(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_log_f08f616da465d0ba: function(arg0) {
            const ret = Math.log(arg0);
            return ret;
        },
        __wbg_log_ff0e9e235d10713d: function(arg0) {
            console.log(...arg0);
        },
        __wbg_longDesc_1f9772740874287c: function(arg0, arg1) {
            const ret = arg1.longDesc;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_lookupNamespaceURI_cc66b3aee0f43ec9: function(arg0, arg1, arg2, arg3) {
            const ret = arg1.lookupNamespaceURI(arg2 === 0 ? undefined : getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_lookupPrefix_0b392d46f969db46: function(arg0, arg1, arg2, arg3) {
            const ret = arg1.lookupPrefix(arg2 === 0 ? undefined : getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_loop_6de04f1eaebe33ac: function(arg0) {
            const ret = arg0.loop;
            return ret;
        },
        __wbg_lost_b787a12a0e44349f: function(arg0) {
            const ret = arg0.lost;
            return ret;
        },
        __wbg_mapAsync_1ad93dd7809368a7: function(arg0, arg1) {
            const ret = arg0.mapAsync(arg1 >>> 0);
            return ret;
        },
        __wbg_mapAsync_56192eb926b2cc01: function(arg0, arg1, arg2) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2);
            return ret;
        },
        __wbg_mapAsync_6f3242bead6df1fb: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2 >>> 0, arg3);
            return ret;
        },
        __wbg_mapAsync_7acfa12c57ca9852: function(arg0, arg1, arg2) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_mapAsync_951c3ab4ce2551d0: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3 >>> 0);
            return ret;
        },
        __wbg_mapAsync_c92214c2a7845014: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
            return ret;
        },
        __wbg_mapAsync_e3cfbd141919d03c: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3);
            return ret;
        },
        __wbg_mapState_018237430dfd97dc: function(arg0) {
            const ret = arg0.mapState;
            return (__wbindgen_enum_GpuBufferMapState.indexOf(ret) + 1 || 4) - 1;
        },
        __wbg_matchAll_6ef5f374e6626beb: function(arg0, arg1) {
            const ret = arg0.matchAll(arg1);
            return ret;
        },
        __wbg_matchMedia_9968278b31706f78: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.matchMedia(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_match_1f781266d37b54a8: function(arg0, arg1) {
            const ret = arg0.match(arg1);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_match_d7ff40bb8a77b9b1: function() {
            const ret = Symbol.match;
            return ret;
        },
        __wbg_matches_978994974df1e85b: function(arg0) {
            const ret = arg0.matches;
            return ret;
        },
        __wbg_matches_9f92e758db2111f0: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.matches(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_maxBindGroupsPlusVertexBuffers_112372fca4d396dc: function(arg0) {
            const ret = arg0.maxBindGroupsPlusVertexBuffers;
            return ret;
        },
        __wbg_maxBindGroups_7e4965b5daa53b23: function(arg0) {
            const ret = arg0.maxBindGroups;
            return ret;
        },
        __wbg_maxBindingsPerBindGroup_5d11588150650215: function(arg0) {
            const ret = arg0.maxBindingsPerBindGroup;
            return ret;
        },
        __wbg_maxBufferSize_b59f147488bf047a: function(arg0) {
            const ret = arg0.maxBufferSize;
            return ret;
        },
        __wbg_maxByteLength_114c02d55b07195f: function(arg0) {
            const ret = arg0.maxByteLength;
            return ret;
        },
        __wbg_maxByteLength_52bfa01afd98462e: function(arg0) {
            const ret = arg0.maxByteLength;
            return ret;
        },
        __wbg_maxByteLength_e01fb6fd56831dca: function(arg0) {
            const ret = arg0.maxByteLength;
            return ret;
        },
        __wbg_maxColorAttachmentBytesPerSample_726ea37aedfb839a: function(arg0) {
            const ret = arg0.maxColorAttachmentBytesPerSample;
            return ret;
        },
        __wbg_maxColorAttachments_62ecca7ef94d78e4: function(arg0) {
            const ret = arg0.maxColorAttachments;
            return ret;
        },
        __wbg_maxComputeInvocationsPerWorkgroup_a14458d75e0b90ac: function(arg0) {
            const ret = arg0.maxComputeInvocationsPerWorkgroup;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeX_6b8c17d5e4738e77: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeX;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeY_13b5de41c6e0bc2a: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeY;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeZ_b12d7f3e670aa0a2: function(arg0) {
            const ret = arg0.maxComputeWorkgroupSizeZ;
            return ret;
        },
        __wbg_maxComputeWorkgroupStorageSize_886498bc3b0baa23: function(arg0) {
            const ret = arg0.maxComputeWorkgroupStorageSize;
            return ret;
        },
        __wbg_maxComputeWorkgroupsPerDimension_144b6bbf6ac24451: function(arg0) {
            const ret = arg0.maxComputeWorkgroupsPerDimension;
            return ret;
        },
        __wbg_maxDynamicStorageBuffersPerPipelineLayout_d81239ef90f4f920: function(arg0) {
            const ret = arg0.maxDynamicStorageBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxDynamicUniformBuffersPerPipelineLayout_0cca7d1cb9e5adf7: function(arg0) {
            const ret = arg0.maxDynamicUniformBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxInterStageShaderVariables_4504147f810dd43d: function(arg0) {
            const ret = arg0.maxInterStageShaderVariables;
            return ret;
        },
        __wbg_maxSampledTexturesPerShaderStage_54e5ed0537676c83: function(arg0) {
            const ret = arg0.maxSampledTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxSamplersPerShaderStage_71315fab0d7f34b1: function(arg0) {
            const ret = arg0.maxSamplersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageBufferBindingSize_779fd522aaaa6f90: function(arg0) {
            const ret = arg0.maxStorageBufferBindingSize;
            return ret;
        },
        __wbg_maxStorageBuffersPerShaderStage_c99b4f72aaf19e34: function(arg0) {
            const ret = arg0.maxStorageBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageTexturesPerShaderStage_5403c17d11da5280: function(arg0) {
            const ret = arg0.maxStorageTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxTextureArrayLayers_eca9fa36b3d46099: function(arg0) {
            const ret = arg0.maxTextureArrayLayers;
            return ret;
        },
        __wbg_maxTextureDimension1D_a7d9d7ecd19aae9b: function(arg0) {
            const ret = arg0.maxTextureDimension1D;
            return ret;
        },
        __wbg_maxTextureDimension2D_c6a3937eb3ab18df: function(arg0) {
            const ret = arg0.maxTextureDimension2D;
            return ret;
        },
        __wbg_maxTextureDimension3D_d941aa547d9e0801: function(arg0) {
            const ret = arg0.maxTextureDimension3D;
            return ret;
        },
        __wbg_maxTouchPoints_a3f1a3af972f6ccc: function(arg0) {
            const ret = arg0.maxTouchPoints;
            return ret;
        },
        __wbg_maxUniformBufferBindingSize_1e8c92a2094b7ce7: function(arg0) {
            const ret = arg0.maxUniformBufferBindingSize;
            return ret;
        },
        __wbg_maxUniformBuffersPerShaderStage_83cde6650612f178: function(arg0) {
            const ret = arg0.maxUniformBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxVertexAttributes_dd313a3540d56e88: function(arg0) {
            const ret = arg0.maxVertexAttributes;
            return ret;
        },
        __wbg_maxVertexBufferArrayStride_6fd082d9954d1f4a: function(arg0) {
            const ret = arg0.maxVertexBufferArrayStride;
            return ret;
        },
        __wbg_maxVertexBuffers_bbd14712ac158c6f: function(arg0) {
            const ret = arg0.maxVertexBuffers;
            return ret;
        },
        __wbg_max_f9c91b66a19dbccf: function(arg0, arg1) {
            const ret = Math.max(arg0, arg1);
            return ret;
        },
        __wbg_maximize_1e638a44cb9c2ba4: function(arg0) {
            const ret = arg0.maximize();
            return ret;
        },
        __wbg_media_40cbd26ab34df71f: function(arg0, arg1) {
            const ret = arg1.media;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_message_1c3aafa647009286: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_message_8326fb1d549bebc5: function(arg0) {
            const ret = arg0.message;
            return ret;
        },
        __wbg_message_b3de8c4c8362c1f5: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_message_c717665d7f0d1da0: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_message_fb0e6e7854e6ea7a: function(arg0, arg1) {
            const ret = arg1.message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_messages_f95fb041be103ee4: function(arg0) {
            const ret = arg0.messages;
            return ret;
        },
        __wbg_metaKey_d961c7572a9f84f5: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_metaKey_f934f09e37889d70: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_microseconds_bf5a9991fda6a7fa: function(arg0, arg1) {
            const ret = arg1.microseconds;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_milliseconds_40dd975c2d4adbc5: function(arg0, arg1) {
            const ret = arg1.milliseconds;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_minStorageBufferOffsetAlignment_726c386298254510: function(arg0) {
            const ret = arg0.minStorageBufferOffsetAlignment;
            return ret;
        },
        __wbg_minUniformBufferOffsetAlignment_6df1f95f5974788e: function(arg0) {
            const ret = arg0.minUniformBufferOffsetAlignment;
            return ret;
        },
        __wbg_min_5ff1fac75ba832bf: function(arg0, arg1) {
            const ret = Math.min(arg0, arg1);
            return ret;
        },
        __wbg_minimal_days_111c1470f26249f6: function(arg0) {
            const ret = arg0.minimalDays;
            return ret;
        },
        __wbg_minimize_079e2502e7e85eb5: function(arg0) {
            const ret = arg0.minimize();
            return ret;
        },
        __wbg_minutes_9898ebfea49d7370: function(arg0, arg1) {
            const ret = arg1.minutes;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_mipLevelCount_e0957866751e0939: function(arg0) {
            const ret = arg0.mipLevelCount;
            return ret;
        },
        __wbg_months_014a52befd03cee8: function(arg0, arg1) {
            const ret = arg1.months;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_moveBy_f503b4e96e9e6017: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.moveBy(arg1, arg2);
        }, arguments); },
        __wbg_moveTo_060723ca15793702: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.moveTo(arg1, arg2);
        }, arguments); },
        __wbg_movementX_87e39021f3fce8b8: function(arg0) {
            const ret = arg0.movementX;
            return ret;
        },
        __wbg_movementY_f6f63087e2248fa9: function(arg0) {
            const ret = arg0.movementY;
            return ret;
        },
        __wbg_multiline_2e7d3959d638d25a: function(arg0) {
            const ret = arg0.multiline;
            return ret;
        },
        __wbg_muted_2a13905c6a05b144: function(arg0) {
            const ret = arg0.muted;
            return ret;
        },
        __wbg_name_9d2bcd24d4433cef: function(arg0, arg1) {
            const ret = arg1.name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_name_b0b4809690944614: function(arg0) {
            const ret = arg0.name;
            return ret;
        },
        __wbg_name_c3478e33fda47ff9: function(arg0, arg1) {
            const ret = arg1.name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_name_d341a7f37f90f7ec: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_namespaceURI_b92409fda3543892: function(arg0, arg1) {
            const ret = arg1.namespaceURI;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_nanoseconds_0dcd400176af538e: function(arg0, arg1) {
            const ret = arg1.nanoseconds;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_naturalHeight_90457615c5238136: function(arg0) {
            const ret = arg0.naturalHeight;
            return ret;
        },
        __wbg_naturalWidth_62a7409ab6dd9e9a: function(arg0) {
            const ret = arg0.naturalWidth;
            return ret;
        },
        __wbg_navigator_51379c10a84aeec9: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_navigator_99621db14b3f1099: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_networkState_c55fe706af028921: function(arg0) {
            const ret = arg0.networkState;
            return ret;
        },
        __wbg_new_01d4e5994736f972: function() { return handleError(function () {
            const ret = new DOMRectReadOnly();
            return ret;
        }, arguments); },
        __wbg_new_04d90be913667d62: function(arg0) {
            const ret = new ArrayBuffer(arg0 >>> 0);
            return ret;
        },
        __wbg_new_04f865e002199f58: function(arg0) {
            const ret = new Boolean(arg0);
            return ret;
        },
        __wbg_new_056bf0789dd583b2: function() { return handleError(function (arg0, arg1) {
            const ret = new MouseEvent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_08cb2fa678b17a48: function() { return handleError(function (arg0, arg1) {
            const ret = new URL(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_0_3da9e97f24fc69be: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_0c72e559145ea733: function(arg0, arg1, arg2) {
            const ret = new DataView(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_0dc07b435d476dbd: function() { return handleError(function (arg0) {
            const ret = new WebAssembly.Table(arg0);
            return ret;
        }, arguments); },
        __wbg_new_102477ff1e47b21c: function(arg0, arg1) {
            const ret = new Intl.Segmenter(arg0, arg1);
            return ret;
        },
        __wbg_new_199ffff4a1f16a85: function() { return handleError(function (arg0) {
            const ret = new WebAssembly.Tag(arg0);
            return ret;
        }, arguments); },
        __wbg_new_1bd3e2f781a79b55: function(arg0, arg1, arg2, arg3) {
            const ret = new RegExp(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_new_224fa49563952dc9: function(arg0) {
            const ret = new Int16Array(arg0);
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_23d634c5c0294162: function(arg0, arg1) {
            const ret = new AggregateError(getArrayJsValueViewFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_25e75d1f0df4d87a: function() { return handleError(function (arg0, arg1) {
            const ret = new OffscreenCanvas(arg0 >>> 0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_26da75a56ed84980: function(arg0) {
            const ret = new BigUint64Array(arg0);
            return ret;
        },
        __wbg_new_2e0fce3def614b95: function(arg0) {
            const ret = new SharedArrayBuffer(arg0 >>> 0);
            return ret;
        },
        __wbg_new_32b398fb48b6d94a: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_353d21abb9440d88: function(arg0, arg1) {
            const ret = new Intl.NumberFormat(arg0, arg1);
            return ret;
        },
        __wbg_new_3bde735ebff6601b: function(arg0) {
            const ret = new Uint8ClampedArray(arg0);
            return ret;
        },
        __wbg_new_41133f891b7c1212: function() { return handleError(function () {
            const ret = new EventTarget();
            return ret;
        }, arguments); },
        __wbg_new_4339b2a2675a03e3: function() { return handleError(function () {
            const ret = new AbortController();
            return ret;
        }, arguments); },
        __wbg_new_4375d130e1924a4f: function() { return handleError(function (arg0, arg1) {
            const ret = new PageTransitionEvent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_44436ad0e4e40aa0: function() { return handleError(function () {
            const ret = new Document();
            return ret;
        }, arguments); },
        __wbg_new_45f57588d9eb9909: function() { return handleError(function (arg0, arg1) {
            const ret = new FocusEvent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_5159423042fdb2b9: function(arg0, arg1) {
            const ret = new EvalError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_520e9bad5aa66606: function(arg0, arg1) {
            const ret = new WebAssembly.RuntimeError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_5394f65338077341: function() { return handleError(function (arg0) {
            const ret = new ResizeObserver(arg0);
            return ret;
        }, arguments); },
        __wbg_new_5803ced2829a48ff: function(arg0, arg1) {
            const ret = new Intl.RelativeTimeFormat(arg0, arg1);
            return ret;
        },
        __wbg_new_59ce8da3c5624715: function() { return handleError(function (arg0, arg1) {
            const ret = new GPUValidationError(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_5e245ef5857d7f33: function(arg0, arg1) {
            const ret = new TypeError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_6355a538c1a2f582: function() {
            const ret = new WeakMap();
            return ret;
        },
        __wbg_new_6680e3ee11020c6a: function() { return handleError(function (arg0, arg1) {
            const ret = new WheelEvent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_691bb38c51ce2be6: function(arg0) {
            const ret = new BigInt64Array(arg0);
            return ret;
        },
        __wbg_new_69a167a013883a1c: function(arg0, arg1) {
            const ret = new WebAssembly.LinkError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_6b22a386785043c0: function(arg0) {
            const ret = new FinalizationRegistry(arg0);
            return ret;
        },
        __wbg_new_6cb5bb2d71de1e60: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new GPUUncapturedErrorEvent(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_new_6d3d7e359b2d786c: function(arg0, arg1) {
            const ret = new RangeError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_6eae9a77e2198212: function() { return handleError(function (arg0, arg1) {
            const ret = new WebAssembly.Global(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_70f79e80a78a1f78: function(arg0) {
            const ret = new Int32Array(arg0);
            return ret;
        },
        __wbg_new_711fb31c64c1c363: function() { return handleError(function (arg0) {
            const ret = new WebAssembly.Module(arg0);
            return ret;
        }, arguments); },
        __wbg_new_7461bbc529f6d0c3: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Intl.DurationFormat(getArrayJsValueViewFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_new_751a4292b292f25c: function(arg0, arg1) {
            const ret = new Proxy(arg0, arg1);
            return ret;
        },
        __wbg_new_7796ffc7ed656783: function() {
            const ret = new Map();
            return ret;
        },
        __wbg_new_7837c9d3352daaa0: function() { return handleError(function (arg0) {
            const ret = new WebAssembly.Memory(arg0);
            return ret;
        }, arguments); },
        __wbg_new_7d7ca29507b15231: function() { return handleError(function () {
            const ret = new Image();
            return ret;
        }, arguments); },
        __wbg_new_80efd62ef570c5de: function(arg0) {
            const ret = new Float64Array(arg0);
            return ret;
        },
        __wbg_new_83714333e7c79320: function(arg0) {
            const ret = new Float16Array(arg0);
            return ret;
        },
        __wbg_new_841cc978054a4072: function() { return handleError(function () {
            const ret = new Blob();
            return ret;
        }, arguments); },
        __wbg_new_8477378bd94cf85c: function(arg0, arg1) {
            const ret = new SyntaxError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_8b980ccb77175a41: function(arg0, arg1) {
            const ret = new URIError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_8edee95e25ef9191: function(arg0, arg1) {
            const ret = new Intl.PluralRules(arg0, arg1);
            return ret;
        },
        __wbg_new_8f0c2d11e48a4727: function() { return handleError(function (arg0, arg1) {
            const ret = new Worker(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_92a08b12c30e98e8: function(arg0) {
            const ret = new Float32Array(arg0);
            return ret;
        },
        __wbg_new_944c2b5ed6653041: function() { return handleError(function (arg0, arg1) {
            const ret = new WebAssembly.Instance(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_9a97104f3b89203a: function(arg0, arg1) {
            const ret = new Intl.DisplayNames(arg0, arg1);
            return ret;
        },
        __wbg_new_9ae2b46e9bde7942: function() { return handleError(function (arg0, arg1) {
            const ret = new GPUOutOfMemoryError(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_a04d1708ea7483a1: function() { return handleError(function (arg0, arg1) {
            const ret = new UIEvent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_a3830b1d890f78ea: function() { return handleError(function (arg0, arg1) {
            const ret = new WebAssembly.Exception(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_aec3e25493d729fe: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress4_1__6invokeNtCs568dBoJKTdM_6js_sys8FunctionB14_uKb1_EB16_(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_b1aaa1cad0d19790: function(arg0) {
            const ret = new Uint16Array(arg0);
            return ret;
        },
        __wbg_new_b5a5e664d2058476: function() {
            const ret = new WeakSet();
            return ret;
        },
        __wbg_new_b5ab4dc71f119ec0: function(arg0, arg1) {
            const ret = new ReferenceError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_b667d279fd5aa943: function(arg0, arg1) {
            const ret = new Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_bbb5efc887817ad7: function() { return handleError(function (arg0, arg1) {
            const ret = new KeyboardEvent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_bdbec6671335d894: function(arg0) {
            const ret = new Number(arg0);
            return ret;
        },
        __wbg_new_c37d5116642e416a: function() { return handleError(function (arg0, arg1) {
            const ret = new Event(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_c694e7422521d665: function() { return handleError(function (arg0, arg1) {
            const ret = new Intl.Locale(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_cbb95886ce0eb0cb: function(arg0, arg1) {
            const ret = new Intl.DateTimeFormat(arg0, arg1);
            return ret;
        },
        __wbg_new_cc984128914cfc6f: function(arg0) {
            const ret = new Date(arg0);
            return ret;
        },
        __wbg_new_cd45aabdf6073e84: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_d4724fe6557e2f7a: function(arg0, arg1) {
            const ret = new Intl.Collator(arg0, arg1);
            return ret;
        },
        __wbg_new_d6d24f7cf8dbc462: function() { return handleError(function () {
            const ret = new DOMRect();
            return ret;
        }, arguments); },
        __wbg_new_da52cf8fe3429cb2: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_dfd44b7151fab657: function(arg0) {
            const ret = new Uint32Array(arg0);
            return ret;
        },
        __wbg_new_e0bd7540d9834af6: function() { return handleError(function (arg0) {
            const ret = new IntersectionObserver(arg0);
            return ret;
        }, arguments); },
        __wbg_new_e64f7b1e88921146: function(arg0) {
            const ret = new Set(arg0);
            return ret;
        },
        __wbg_new_e83c8bab2ecfea24: function(arg0, arg1) {
            const ret = new WebAssembly.CompileError(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_e9bc99ed55d4504d: function() { return handleError(function (arg0, arg1) {
            const ret = new ImageData(arg0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_eaabd7bd3b77a69c: function(arg0) {
            const ret = new Int8Array(arg0);
            return ret;
        },
        __wbg_new_eca5f6f913a272db: function() { return handleError(function (arg0, arg1) {
            const ret = new PointerEvent(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_ef327b67073673fd: function(arg0, arg1) {
            const ret = new Intl.ListFormat(arg0, arg1);
            return ret;
        },
        __wbg_new_f1a34223ddbe3f7d: function() { return handleError(function () {
            const ret = new MessageChannel();
            return ret;
        }, arguments); },
        __wbg_new_ff5ba065febf5e9a: function() { return handleError(function () {
            const ret = new DOMException();
            return ret;
        }, arguments); },
        __wbg_new_from_slice_22a5cd0af440b4c7: function(arg0, arg1) {
            const ret = new BigInt64Array(getArrayI64FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_36bac521fad54bb4: function(arg0, arg1) {
            const ret = new BigUint64Array(getArrayU64FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_436218e44a4f55e4: function(arg0, arg1) {
            const ret = new Uint8ClampedArray(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_7568ba55b4a7e81f: function(arg0, arg1) {
            const ret = new Uint32Array(getArrayU32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_77cdfb7977362f3c: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_7e254b47c77fb8cc: function(arg0, arg1) {
            const ret = new Float64Array(getArrayF64FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_8ba5ff5ce7af1fe8: function(arg0, arg1) {
            const ret = new Uint16Array(getArrayU16FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_adc482e0820cc439: function(arg0, arg1) {
            const ret = new Int32Array(getArrayI32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_c4333d9b7581f1a8: function(arg0, arg1) {
            const ret = new Int16Array(getArrayI16FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_ddf8b82c4d6af38e: function(arg0, arg1) {
            const ret = new Float32Array(getArrayF32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_fa8056bc89a8d885: function(arg0, arg1) {
            const ret = new Int8Array(getArrayI8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_str_19726961f222e0d7: function(arg0, arg1) {
            const ret = new Number(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_no_args_ae97b3efc0e29062: function(arg0, arg1) {
            const ret = new Function(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_regexp_dfcc03450281b9a8: function(arg0, arg1, arg2) {
            const ret = new RegExp(arg0, getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_new_typed_cf8160c5398a7fb3: function() {
            const ret = new Set();
            return ret;
        },
        __wbg_new_with_args_200d82645b6544eb: function(arg0, arg1, arg2, arg3) {
            const ret = new Function(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_new_with_base_2f5816f4c38b683d: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = new URL(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            return ret;
        }, arguments); },
        __wbg_new_with_blob_sequence_and_options_7de925fc93f05582: function() { return handleError(function (arg0, arg1) {
            const ret = new Blob(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_blob_sequence_eb37dced9faea24d: function() { return handleError(function (arg0) {
            const ret = new Blob(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_buffer_source_sequence_and_options_a15d20174b9b2496: function() { return handleError(function (arg0, arg1) {
            const ret = new Blob(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_buffer_source_sequence_ce12e7c7b394b543: function() { return handleError(function (arg0) {
            const ret = new Blob(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_byte_offset_1a3c24e9247e65b0: function(arg0, arg1) {
            const ret = new Uint16Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_29c2d1022981bf4d: function(arg0, arg1) {
            const ret = new BigUint64Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_3e856febd5893559: function(arg0, arg1) {
            const ret = new Float32Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_464a7f82cab4fbc1: function(arg0, arg1) {
            const ret = new Uint32Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_666c3c4538bc836c: function(arg0, arg1) {
            const ret = new Float16Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_7764e8295d03c7cf: function(arg0, arg1) {
            const ret = new Uint8Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_7b32330d575ac3c2: function(arg0, arg1) {
            const ret = new Int16Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_7f119c76f8cf3bcc: function(arg0, arg1) {
            const ret = new Float64Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_8d597f8e53b69038: function(arg0, arg1) {
            const ret = new Int32Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_912c65263c955e49: function(arg0, arg1) {
            const ret = new Uint8ClampedArray(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_a3e722b6aedf1681: function(arg0, arg1) {
            const ret = new BigInt64Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_a887281e574d1d81: function(arg0, arg1) {
            const ret = new Int8Array(arg0, arg1 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_1715a6d19433f257: function(arg0, arg1, arg2) {
            const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_1fdfe3033ce1dccd: function(arg0, arg1, arg2) {
            const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_208fc197678172d6: function(arg0, arg1, arg2) {
            const ret = new BigUint64Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_3f2c200f1ed302cb: function(arg0, arg1, arg2) {
            const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_54c7724ee3ec7d82: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_5784416b97d45088: function(arg0, arg1, arg2) {
            const ret = new Float64Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_a05d916415c4c27d: function(arg0, arg1, arg2) {
            const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_b4ab103a72b35456: function(arg0, arg1, arg2) {
            const ret = new BigInt64Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_b5e73f05c76bbddd: function(arg0, arg1, arg2) {
            const ret = new Float16Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_c6e1a1aae380b2ff: function(arg0, arg1, arg2) {
            const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_daf3e2875bbb7acf: function(arg0, arg1, arg2) {
            const ret = new Uint8ClampedArray(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_byte_offset_and_length_e1121eb3f9442e2d: function(arg0, arg1, arg2) {
            const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_error_options_d7e934a6f54c504b: function(arg0, arg1, arg2) {
            const ret = new Error(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_html_canvas_element_cc84714f6839a00e: function() { return handleError(function (arg0) {
            const ret = new VideoFrame(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_html_image_element_88ccb06b1abe2e2d: function() { return handleError(function (arg0) {
            const ret = new VideoFrame(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_html_video_element_0fefb5facc717b43: function() { return handleError(function (arg0) {
            const ret = new VideoFrame(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_image_bitmap_4a1b55c7ac16935b: function() { return handleError(function (arg0) {
            const ret = new VideoFrame(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_js_u8_clamped_array_306a60011db013c2: function() { return handleError(function (arg0, arg1) {
            const ret = new ImageData(arg0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_with_js_u8_clamped_array_and_sh_fe8a44ec0fb23169: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new ImageData(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_with_length_112583d83d0cb73c: function(arg0) {
            const ret = new Float64Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_2616134c9283816a: function(arg0) {
            const ret = new Float16Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_36cf70555643aae3: function(arg0) {
            const ret = new Uint8ClampedArray(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_3709f79f83165acf: function(arg0) {
            const ret = new BigUint64Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_664ae1da061c56fa: function(arg0) {
            const ret = new Int32Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_82964559f36e4bc6: function(arg0) {
            const ret = new Int8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_82f839073dfdaa99: function(arg0) {
            const ret = new Uint16Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_a319d383bd7aa5a8: function(arg0) {
            const ret = new Int16Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_a708ad50ef765359: function(arg0) {
            const ret = new BigInt64Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_e1d8c8061ed4e317: function(arg0) {
            const ret = new Float32Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_e6785c33c8e4cce8: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_f048f86e32f1515e: function(arg0) {
            const ret = new Uint32Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_length_f8cbc3a5b9ff9368: function(arg0) {
            const ret = new Array(arg0 >>> 0);
            return ret;
        },
        __wbg_new_with_message_59a87814433a99cb: function() { return handleError(function (arg0, arg1) {
            const ret = new DOMException(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_new_with_message_and_name_6800a3d3730c3f3d: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = new DOMException(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            return ret;
        }, arguments); },
        __wbg_new_with_message_b0749a9afd70f571: function(arg0, arg1, arg2, arg3) {
            const ret = new AggregateError(getArrayJsValueViewFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_new_with_offscreen_canvas_950a32032b653d37: function() { return handleError(function (arg0) {
            const ret = new VideoFrame(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_options_13554420e40b7b5a: function(arg0, arg1, arg2) {
            const ret = new SyntaxError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_20e79ed9bf2f7b90: function(arg0, arg1, arg2) {
            const ret = new RangeError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_3fcd1801bc7806c2: function(arg0, arg1) {
            const ret = new ArrayBuffer(arg0 >>> 0, arg1);
            return ret;
        },
        __wbg_new_with_options_43172431d3988711: function(arg0, arg1, arg2) {
            const ret = new WebAssembly.CompileError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_6674ec2889ab09ae: function(arg0, arg1, arg2) {
            const ret = new ReferenceError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_6ef420e1c1047e26: function(arg0, arg1, arg2) {
            const ret = new TypeError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_7241174fedd8450a: function(arg0, arg1, arg2) {
            const ret = new EvalError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_7e33fee80dcdd764: function(arg0, arg1, arg2) {
            const ret = new Error(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_9505311d87caea52: function(arg0, arg1) {
            const ret = new SharedArrayBuffer(arg0 >>> 0, arg1);
            return ret;
        },
        __wbg_new_with_options_b51dbfafe1160a6b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Intl.Locale(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_options_c5355ee9db3a851d: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = new AggregateError(getArrayJsValueViewFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), arg4);
            return ret;
        },
        __wbg_new_with_options_c886a7bba8a44be6: function(arg0, arg1, arg2) {
            const ret = new WebAssembly.RuntimeError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_ce7b34cebf1482f7: function(arg0, arg1, arg2) {
            const ret = new WebAssembly.LinkError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_d55412d20e5dbe24: function(arg0, arg1, arg2) {
            const ret = new URIError(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_new_with_options_e012ca5a746aa394: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new WebAssembly.Exception(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_shared_array_buffer_0d9b77432d5b35ca: function(arg0, arg1, arg2) {
            const ret = new DataView(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_new_with_str_sequence_41eb78e12be41285: function() { return handleError(function (arg0) {
            const ret = new Blob(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_str_sequence_and_options_9db076dc44ddbeb0: function() { return handleError(function (arg0, arg1) {
            const ret = new Blob(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_sw_ffd93feff8375254: function() { return handleError(function (arg0, arg1) {
            const ret = new ImageData(arg0 >>> 0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_with_u8_array_sequence_and_options_2c1900e5a5c93850: function() { return handleError(function (arg0, arg1) {
            const ret = new Blob(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_u8_array_sequence_bdda73b0f202f149: function() { return handleError(function (arg0) {
            const ret = new Blob(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_u8_clamped_array_and_sh_2767e4741c267d25: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_with_u8_clamped_array_f27669ed8998f58c: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_with_u8_slice_sequence_80eeae770cb3ca19: function() { return handleError(function (arg0) {
            const ret = new Blob(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_u8_slice_sequence_and_options_542a6ca5e35484a6: function() { return handleError(function (arg0, arg1) {
            const ret = new Blob(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_value_6990dd0a8bc17691: function() { return handleError(function (arg0, arg1) {
            const ret = new WebAssembly.Table(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_video_frame_098135d3eff4b67a: function() { return handleError(function (arg0) {
            const ret = new VideoFrame(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_width_and_height_0131085061bc550d: function() { return handleError(function (arg0, arg1) {
            const ret = new Image(arg0 >>> 0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_with_width_d0dca834190776c5: function() { return handleError(function (arg0) {
            const ret = new Image(arg0 >>> 0);
            return ret;
        }, arguments); },
        __wbg_new_with_x_872a6802213f673d: function() { return handleError(function (arg0) {
            const ret = new DOMRect(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_x_9c5793ec3e758361: function() { return handleError(function (arg0) {
            const ret = new DOMRectReadOnly(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_x_and_y_579fadd825b1f67b: function() { return handleError(function (arg0, arg1) {
            const ret = new DOMRectReadOnly(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_x_and_y_and_width_1767ba91a42536de: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new DOMRectReadOnly(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_x_and_y_and_width_and_height_28090e42634aa806: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = new DOMRectReadOnly(arg0, arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_new_with_x_and_y_and_width_and_height_978fb88b699249b4: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = new DOMRect(arg0, arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_new_with_x_and_y_and_width_bdb37f1ede3596bb: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new DOMRect(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_x_and_y_f181b674175cd5ef: function() { return handleError(function (arg0, arg1) {
            const ret = new DOMRect(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_new_with_year_month_19ee464ef4585b0b: function(arg0, arg1) {
            const ret = new Date(arg0 >>> 0, arg1);
            return ret;
        },
        __wbg_new_with_year_month_day_f2354b74b4b2a4f3: function(arg0, arg1, arg2) {
            const ret = new Date(arg0 >>> 0, arg1, arg2);
            return ret;
        },
        __wbg_new_with_year_month_day_hr_888aa3deb04310a8: function(arg0, arg1, arg2, arg3) {
            const ret = new Date(arg0 >>> 0, arg1, arg2, arg3);
            return ret;
        },
        __wbg_new_with_year_month_day_hr_min_b7cca3ff17cbaa0a: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = new Date(arg0 >>> 0, arg1, arg2, arg3, arg4);
            return ret;
        },
        __wbg_new_with_year_month_day_hr_min_sec_c04713baa3b5e1a0: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = new Date(arg0 >>> 0, arg1, arg2, arg3, arg4, arg5);
            return ret;
        },
        __wbg_new_with_year_month_day_hr_min_sec_milli_85f8306cb9b8c5c5: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = new Date(arg0 >>> 0, arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        },
        __wbg_new_worker_a37b91c84b1f9aa5: function(arg0, arg1) {
            const ret = new Worker(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_nextElementSibling_2c75764f70deca9d: function(arg0) {
            const ret = arg0.nextElementSibling;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_nextSibling_0e94ccfa3c22fa3c: function(arg0) {
            const ret = arg0.nextSibling;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_next_6dbf2c0ac8cde20f: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_next_71f2aa1cb3d1e37e: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_nodeName_9b4a6ada6873a033: function(arg0, arg1) {
            const ret = arg1.nodeName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_nodeType_9cfba00db3a42b85: function(arg0) {
            const ret = arg0.nodeType;
            return ret;
        },
        __wbg_nodeValue_14bd3baa5cfb41eb: function(arg0, arg1) {
            const ret = arg1.nodeValue;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_nonce_3724d38f5e53e443: function(arg0, arg1) {
            const ret = arg1.nonce;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_normalize_1eb56a551049b03e: function(arg0) {
            arg0.normalize();
        },
        __wbg_normalize_721dc6312074d031: function(arg0, arg1, arg2) {
            const ret = arg0.normalize(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_notify_1edcdceac3728c69: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Atomics.notify(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_notify_2d9b39cd6c99ca1f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Atomics.notify(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        }, arguments); },
        __wbg_notify_b82e17c90cf19aea: function() { return handleError(function (arg0, arg1) {
            const ret = Atomics.notify(arg0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_notify_bigint_ae298798aa451d27: function() { return handleError(function (arg0, arg1) {
            const ret = Atomics.notify_bigint(arg0, arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_now_86c0d4ba3fa605b8: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_now_e7c6795a7f81e10f: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_numbering_system_5f5f8f4a56612d06: function(arg0) {
            const ret = arg0.numberingSystem;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_numeric_91d160a56a99aeb7: function(arg0) {
            const ret = arg0.numeric;
            return ret;
        },
        __wbg_observe_615bef91ee28c925: function(arg0, arg1, arg2) {
            arg0.observe(arg1, arg2);
        },
        __wbg_observe_c3834a3e4cde3e64: function(arg0, arg1) {
            arg0.observe(arg1);
        },
        __wbg_observe_f27242eadc2ebd47: function(arg0, arg1) {
            arg0.observe(arg1);
        },
        __wbg_of_2bf3ed8a776ff19a: function(arg0, arg1, arg2, arg3) {
            const ret = Array.of(arg0, arg1, arg2, arg3);
            return ret;
        },
        __wbg_of_5f1b88183ddb5d94: function(arg0, arg1) {
            const ret = Array.of(arg0, arg1);
            return ret;
        },
        __wbg_of_85f52f8b6491a7ca: function(arg0) {
            const ret = Array.of(arg0);
            return ret;
        },
        __wbg_of_b0cd2e09b31a9684: function(arg0, arg1, arg2) {
            const ret = Array.of(arg0, arg1, arg2);
            return ret;
        },
        __wbg_of_d1905c2e39225d15: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = Array.of(arg0, arg1, arg2, arg3, arg4);
            return ret;
        },
        __wbg_of_d940e82ae7a804b6: function(arg0, arg1, arg2) {
            const ret = arg0.of(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_offsetHeight_242135c11b7fdaec: function(arg0) {
            const ret = arg0.offsetHeight;
            return ret;
        },
        __wbg_offsetLeft_57573e1411874d68: function(arg0) {
            const ret = arg0.offsetLeft;
            return ret;
        },
        __wbg_offsetParent_6749d58f1aef1ace: function(arg0) {
            const ret = arg0.offsetParent;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_offsetTop_eb7a93213506ba96: function(arg0) {
            const ret = arg0.offsetTop;
            return ret;
        },
        __wbg_offsetWidth_f7d4d93df1ead153: function(arg0) {
            const ret = arg0.offsetWidth;
            return ret;
        },
        __wbg_offsetX_a9bf2ea7f0575ac9: function(arg0) {
            const ret = arg0.offsetX;
            return ret;
        },
        __wbg_offsetX_fdc5eb20edabaadb: function(arg0) {
            const ret = arg0.offsetX;
            return ret;
        },
        __wbg_offsetY_0a05e99022d21c5b: function(arg0) {
            const ret = arg0.offsetY;
            return ret;
        },
        __wbg_offsetY_10e5433a1bbd4c01: function(arg0) {
            const ret = arg0.offsetY;
            return ret;
        },
        __wbg_offset_4dea098cdd2bb80a: function(arg0) {
            const ret = arg0.offset;
            return ret;
        },
        __wbg_onLine_37be2d67e8996819: function(arg0) {
            const ret = arg0.onLine;
            return ret;
        },
        __wbg_onLine_e4b3d6727b94b166: function(arg0) {
            const ret = arg0.onLine;
            return ret;
        },
        __wbg_onSubmittedWorkDone_5f36409816d68e04: function(arg0) {
            const ret = arg0.onSubmittedWorkDone();
            return ret;
        },
        __wbg_onabort_646b6fe0f85a18ff: function(arg0) {
            const ret = arg0.onabort;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onabort_899b5b38e1d189a3: function(arg0) {
            const ret = arg0.onabort;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onabort_9f68889cb51944f2: function(arg0) {
            const ret = arg0.onabort;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onabort_da58660377c92f13: function(arg0) {
            const ret = arg0.onabort;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onafterprint_e196eefefb04827b: function(arg0) {
            const ret = arg0.onafterprint;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onafterscriptexecute_81c622bed7059254: function(arg0) {
            const ret = arg0.onafterscriptexecute;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationcancel_02b30a50af0d19e3: function(arg0) {
            const ret = arg0.onanimationcancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationcancel_1bed9354692f25f6: function(arg0) {
            const ret = arg0.onanimationcancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationcancel_241e7c8341fe464e: function(arg0) {
            const ret = arg0.onanimationcancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationend_39d69521a2773942: function(arg0) {
            const ret = arg0.onanimationend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationend_b1d224df4d92d4bf: function(arg0) {
            const ret = arg0.onanimationend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationend_b8968f3ccdb4fe3f: function(arg0) {
            const ret = arg0.onanimationend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationiteration_aed33b029630135f: function(arg0) {
            const ret = arg0.onanimationiteration;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationiteration_c07c5e0bf56c73c8: function(arg0) {
            const ret = arg0.onanimationiteration;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationiteration_dbc3281df356a540: function(arg0) {
            const ret = arg0.onanimationiteration;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationstart_04b1de6561274402: function(arg0) {
            const ret = arg0.onanimationstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationstart_6dd4b3dda08a4f6b: function(arg0) {
            const ret = arg0.onanimationstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onanimationstart_aba837113b027710: function(arg0) {
            const ret = arg0.onanimationstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onappinstalled_3a9585729c43e80c: function(arg0) {
            const ret = arg0.onappinstalled;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onauxclick_65e12f50c8487264: function(arg0) {
            const ret = arg0.onauxclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onauxclick_71b531b312851999: function(arg0) {
            const ret = arg0.onauxclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onauxclick_7e24b32c763ae6f2: function(arg0) {
            const ret = arg0.onauxclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforeinput_3c16d1b6f755a0fc: function(arg0) {
            const ret = arg0.onbeforeinput;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforeinput_ee5e1ae875a6f9a3: function(arg0) {
            const ret = arg0.onbeforeinput;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforeinput_f76f1a56c0441ce9: function(arg0) {
            const ret = arg0.onbeforeinput;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforeprint_322dbf8aa4647906: function(arg0) {
            const ret = arg0.onbeforeprint;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforescriptexecute_3aec4ba45f0760a3: function(arg0) {
            const ret = arg0.onbeforescriptexecute;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforetoggle_16bc2ff1eba45232: function(arg0) {
            const ret = arg0.onbeforetoggle;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforetoggle_4330b9f153a76741: function(arg0) {
            const ret = arg0.onbeforetoggle;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforetoggle_691359b71d49d423: function(arg0) {
            const ret = arg0.onbeforetoggle;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onbeforeunload_cb771d60914871b4: function(arg0) {
            const ret = arg0.onbeforeunload;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onblur_1e314c169ddad811: function(arg0) {
            const ret = arg0.onblur;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onblur_9ef116680caa6af8: function(arg0) {
            const ret = arg0.onblur;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onblur_c093ca0460cdcbd2: function(arg0) {
            const ret = arg0.onblur;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncancel_56ebdb9c50585050: function(arg0) {
            const ret = arg0.oncancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncancel_580e2e6cfba4b791: function(arg0) {
            const ret = arg0.oncancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncancel_5f4f2958bb291fab: function(arg0) {
            const ret = arg0.oncancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncanplay_12aae078196fa682: function(arg0) {
            const ret = arg0.oncanplay;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncanplay_2be4a1b969604f3c: function(arg0) {
            const ret = arg0.oncanplay;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncanplay_e7be96d5ea4bad3d: function(arg0) {
            const ret = arg0.oncanplay;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncanplaythrough_411d211975354d2d: function(arg0) {
            const ret = arg0.oncanplaythrough;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncanplaythrough_a7a64eb39dd0b964: function(arg0) {
            const ret = arg0.oncanplaythrough;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncanplaythrough_c99fcf7f4a940f40: function(arg0) {
            const ret = arg0.oncanplaythrough;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onchange_0bd7cac295e461c0: function(arg0) {
            const ret = arg0.onchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onchange_277df78683d8f251: function(arg0) {
            const ret = arg0.onchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onchange_3d2fde1781549b06: function(arg0) {
            const ret = arg0.onchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onchange_56a959320945d0cd: function(arg0) {
            const ret = arg0.onchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onchange_98c95386afa1f3bb: function(arg0) {
            const ret = arg0.onchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onchange_d990eaa12c1933a6: function(arg0) {
            const ret = arg0.onchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onchange_fc00b3ef9b54f2e3: function(arg0) {
            const ret = arg0.onchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onclick_5e38d5a32bdc375a: function(arg0) {
            const ret = arg0.onclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onclick_64e0ee3547cd66f6: function(arg0) {
            const ret = arg0.onclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onclick_cf5ce7ecf3948051: function(arg0) {
            const ret = arg0.onclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onclose_5faabcb36345c2f9: function(arg0) {
            const ret = arg0.onclose;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onclose_d5bc4283f1f4db9a: function(arg0) {
            const ret = arg0.onclose;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onclose_d7e5a449f678b4ae: function(arg0) {
            const ret = arg0.onclose;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncontextmenu_0e0775dda742297f: function(arg0) {
            const ret = arg0.oncontextmenu;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncontextmenu_e79983e68406fbb0: function(arg0) {
            const ret = arg0.oncontextmenu;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncontextmenu_e7d75125e192f59a: function(arg0) {
            const ret = arg0.oncontextmenu;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncopy_61328915946bf40e: function(arg0) {
            const ret = arg0.oncopy;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncopy_b12d939e0f5e702c: function(arg0) {
            const ret = arg0.oncopy;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncut_17b4099b7e92434f: function(arg0) {
            const ret = arg0.oncut;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oncut_93814d7afdf8d373: function(arg0) {
            const ret = arg0.oncut;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondblclick_0b032e6b48abf779: function(arg0) {
            const ret = arg0.ondblclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondblclick_54d094088109d51a: function(arg0) {
            const ret = arg0.ondblclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondblclick_e14da533c80d5755: function(arg0) {
            const ret = arg0.ondblclick;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondrag_12a9fd4e8d8222e9: function(arg0) {
            const ret = arg0.ondrag;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondrag_b1e2d361b313076c: function(arg0) {
            const ret = arg0.ondrag;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondrag_d1800ab8bf964958: function(arg0) {
            const ret = arg0.ondrag;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragend_354a776109988d6a: function(arg0) {
            const ret = arg0.ondragend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragend_7e978c55256f677f: function(arg0) {
            const ret = arg0.ondragend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragend_ae6c043dc3a21e66: function(arg0) {
            const ret = arg0.ondragend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragenter_5649d9b63a098411: function(arg0) {
            const ret = arg0.ondragenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragenter_e444e938f3cf79df: function(arg0) {
            const ret = arg0.ondragenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragenter_f41175e8b97aebb7: function(arg0) {
            const ret = arg0.ondragenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragexit_02406519e5683a62: function(arg0) {
            const ret = arg0.ondragexit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragexit_3b3676fe01f1893c: function(arg0) {
            const ret = arg0.ondragexit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragexit_d79446322d0903f7: function(arg0) {
            const ret = arg0.ondragexit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragleave_38839e45d569e88f: function(arg0) {
            const ret = arg0.ondragleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragleave_5d9c7140e746be8e: function(arg0) {
            const ret = arg0.ondragleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragleave_921795171d72ccf1: function(arg0) {
            const ret = arg0.ondragleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragover_3bc887f7ad5a937b: function(arg0) {
            const ret = arg0.ondragover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragover_b2be82789ee2dcee: function(arg0) {
            const ret = arg0.ondragover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragover_f5784cb228132e14: function(arg0) {
            const ret = arg0.ondragover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragstart_24e8a53ff21d97e9: function(arg0) {
            const ret = arg0.ondragstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragstart_42920576324bf2a4: function(arg0) {
            const ret = arg0.ondragstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondragstart_76a8b69e3d998346: function(arg0) {
            const ret = arg0.ondragstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondrop_1baba08ff0481f39: function(arg0) {
            const ret = arg0.ondrop;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondrop_5c8435143f400d8b: function(arg0) {
            const ret = arg0.ondrop;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondrop_a94556af776fa4d2: function(arg0) {
            const ret = arg0.ondrop;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondurationchange_2e48a2a961091952: function(arg0) {
            const ret = arg0.ondurationchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondurationchange_5d3cabb7ae6b2c00: function(arg0) {
            const ret = arg0.ondurationchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ondurationchange_a62a94eac01944d6: function(arg0) {
            const ret = arg0.ondurationchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onemptied_87fccdf9790c177b: function(arg0) {
            const ret = arg0.onemptied;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onemptied_9220cbe081114ebe: function(arg0) {
            const ret = arg0.onemptied;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onemptied_bc2aa3e03ee03463: function(arg0) {
            const ret = arg0.onemptied;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onencrypted_833c1567058cd4f5: function(arg0) {
            const ret = arg0.onencrypted;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onended_02ebb23a6c6c3753: function(arg0) {
            const ret = arg0.onended;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onended_6f83e961c8b1f6f5: function(arg0) {
            const ret = arg0.onended;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onended_f53b680661d621fa: function(arg0) {
            const ret = arg0.onended;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onerror_32181b60dffe6047: function(arg0) {
            const ret = arg0.onerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onerror_3752c0e53a7c30df: function(arg0) {
            const ret = arg0.onerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onerror_6391f14a0be5f4e8: function(arg0) {
            const ret = arg0.onerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onerror_e86afbc173cbba34: function(arg0) {
            const ret = arg0.onerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onerror_f3f4b035b9c6495b: function(arg0) {
            const ret = arg0.onerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onfocus_4103f0b3ab50dcc8: function(arg0) {
            const ret = arg0.onfocus;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onfocus_c7b066c89788b832: function(arg0) {
            const ret = arg0.onfocus;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onfocus_f6d732731c5e8330: function(arg0) {
            const ret = arg0.onfocus;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onfullscreenchange_1d110374578ac089: function(arg0) {
            const ret = arg0.onfullscreenchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onfullscreenerror_4c4b879acab35d7e: function(arg0) {
            const ret = arg0.onfullscreenerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ongotpointercapture_1a7f83c9c44b13e9: function(arg0) {
            const ret = arg0.ongotpointercapture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ongotpointercapture_2fb96dc9bc95d7d2: function(arg0) {
            const ret = arg0.ongotpointercapture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ongotpointercapture_cc61ef600047b28d: function(arg0) {
            const ret = arg0.ongotpointercapture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onhashchange_8e842872210bc29f: function(arg0) {
            const ret = arg0.onhashchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oninput_6b1f1ac252b9bdd0: function(arg0) {
            const ret = arg0.oninput;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oninput_c50500e8ce4a0be2: function(arg0) {
            const ret = arg0.oninput;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oninput_ebb0de013470f235: function(arg0) {
            const ret = arg0.oninput;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oninvalid_069ed794e0283c61: function(arg0) {
            const ret = arg0.oninvalid;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oninvalid_347edda18a50b5ad: function(arg0) {
            const ret = arg0.oninvalid;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_oninvalid_a4cd10eeb9e47f54: function(arg0) {
            const ret = arg0.oninvalid;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeydown_198298172607554e: function(arg0) {
            const ret = arg0.onkeydown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeydown_aca2655b48d98f48: function(arg0) {
            const ret = arg0.onkeydown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeydown_e497b678599d405a: function(arg0) {
            const ret = arg0.onkeydown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeypress_6e895890261444dd: function(arg0) {
            const ret = arg0.onkeypress;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeypress_731efbad06e9ae8c: function(arg0) {
            const ret = arg0.onkeypress;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeypress_dfdebd3829ea337d: function(arg0) {
            const ret = arg0.onkeypress;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeyup_77c7a7019bd206fc: function(arg0) {
            const ret = arg0.onkeyup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeyup_7effb6782a776c40: function(arg0) {
            const ret = arg0.onkeyup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onkeyup_cb0fcbc9696bb700: function(arg0) {
            const ret = arg0.onkeyup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onlanguagechange_ee133840deeadd7b: function(arg0) {
            const ret = arg0.onlanguagechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onload_27ad3977ef44e3a2: function(arg0) {
            const ret = arg0.onload;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onload_8120e00ff2d05e74: function(arg0) {
            const ret = arg0.onload;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onload_ed08c8aa874f49bd: function(arg0) {
            const ret = arg0.onload;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadeddata_04848e3385d9eb00: function(arg0) {
            const ret = arg0.onloadeddata;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadeddata_b69c0ad614b79057: function(arg0) {
            const ret = arg0.onloadeddata;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadeddata_c48b547239a86981: function(arg0) {
            const ret = arg0.onloadeddata;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadedmetadata_1bef2106e9712749: function(arg0) {
            const ret = arg0.onloadedmetadata;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadedmetadata_3c09c3c89155cbcf: function(arg0) {
            const ret = arg0.onloadedmetadata;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadedmetadata_c1924eb6331d32ef: function(arg0) {
            const ret = arg0.onloadedmetadata;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadend_7219abf8282a0dd3: function(arg0) {
            const ret = arg0.onloadend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadend_909d9b5276cfe601: function(arg0) {
            const ret = arg0.onloadend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadend_bc7edd6b4c906b26: function(arg0) {
            const ret = arg0.onloadend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadstart_bd2758c2e276aea1: function(arg0) {
            const ret = arg0.onloadstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadstart_ca6585d57a22dcc0: function(arg0) {
            const ret = arg0.onloadstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onloadstart_edd9a346cf56f72c: function(arg0) {
            const ret = arg0.onloadstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onlostpointercapture_2c2919e23d055576: function(arg0) {
            const ret = arg0.onlostpointercapture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onlostpointercapture_a4f4266fff170caa: function(arg0) {
            const ret = arg0.onlostpointercapture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onlostpointercapture_bbba538aabecde9d: function(arg0) {
            const ret = arg0.onlostpointercapture;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmessage_759049a8d9542d38: function(arg0) {
            const ret = arg0.onmessage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmessage_77a1179c375b0ecc: function(arg0) {
            const ret = arg0.onmessage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmessage_a9e1f0b81bb9aa97: function(arg0) {
            const ret = arg0.onmessage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmessageerror_2e3fa4051b4d7caa: function(arg0) {
            const ret = arg0.onmessageerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmessageerror_464e1dc89a3a46f5: function(arg0) {
            const ret = arg0.onmessageerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmessageerror_8361ac0db12f179a: function(arg0) {
            const ret = arg0.onmessageerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmousedown_95b796f191ad12ec: function(arg0) {
            const ret = arg0.onmousedown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmousedown_ed849b808fee79cb: function(arg0) {
            const ret = arg0.onmousedown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmousedown_f9d8ea854063952e: function(arg0) {
            const ret = arg0.onmousedown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseenter_06a568badd482ba2: function(arg0) {
            const ret = arg0.onmouseenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseenter_9d16cc972ed52d57: function(arg0) {
            const ret = arg0.onmouseenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseenter_9f02234289130925: function(arg0) {
            const ret = arg0.onmouseenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseleave_88d8c5a11cb49ba8: function(arg0) {
            const ret = arg0.onmouseleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseleave_98dbef493f937f37: function(arg0) {
            const ret = arg0.onmouseleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseleave_e265afbe293839c6: function(arg0) {
            const ret = arg0.onmouseleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmousemove_2da74c0392922aa3: function(arg0) {
            const ret = arg0.onmousemove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmousemove_3afe6571df72e0ec: function(arg0) {
            const ret = arg0.onmousemove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmousemove_5e8ee1d60de20ccb: function(arg0) {
            const ret = arg0.onmousemove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseout_885915fde82fe0f3: function(arg0) {
            const ret = arg0.onmouseout;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseout_debfac9aef1eb549: function(arg0) {
            const ret = arg0.onmouseout;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseout_e7f197d1281f4e93: function(arg0) {
            const ret = arg0.onmouseout;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseover_2d4335add8dc598a: function(arg0) {
            const ret = arg0.onmouseover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseover_4fae49e87faaf287: function(arg0) {
            const ret = arg0.onmouseover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseover_c23d22315e33dfe3: function(arg0) {
            const ret = arg0.onmouseover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseup_63d6fcf5e82d92b1: function(arg0) {
            const ret = arg0.onmouseup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseup_8688f86e66445bc3: function(arg0) {
            const ret = arg0.onmouseup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onmouseup_c7042690c1adf7f2: function(arg0) {
            const ret = arg0.onmouseup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onoffline_22bbec290860bb25: function(arg0) {
            const ret = arg0.onoffline;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onoffline_695ab884749de4e0: function(arg0) {
            const ret = arg0.onoffline;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ononline_28b6138d2f011e93: function(arg0) {
            const ret = arg0.ononline;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ononline_d475a940ef9b5543: function(arg0) {
            const ret = arg0.ononline;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onorientationchange_25501f828f76974a: function(arg0) {
            const ret = arg0.onorientationchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpagehide_9d0b2da407570a7b: function(arg0) {
            const ret = arg0.onpagehide;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpageshow_886e3f94cfc3ce52: function(arg0) {
            const ret = arg0.onpageshow;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpaste_70956a764e7d34da: function(arg0) {
            const ret = arg0.onpaste;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpaste_9d60d6fdeb9510a7: function(arg0) {
            const ret = arg0.onpaste;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpause_3fc82be4b774341c: function(arg0) {
            const ret = arg0.onpause;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpause_a238e328053c740a: function(arg0) {
            const ret = arg0.onpause;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpause_f4f140ce8deb9d9d: function(arg0) {
            const ret = arg0.onpause;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onplay_07efda67338fb713: function(arg0) {
            const ret = arg0.onplay;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onplay_1caa72c7451a3e3a: function(arg0) {
            const ret = arg0.onplay;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onplay_ca4ea334c2efd068: function(arg0) {
            const ret = arg0.onplay;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onplaying_07c6725ab9741a01: function(arg0) {
            const ret = arg0.onplaying;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onplaying_2e473fe5c537ea3f: function(arg0) {
            const ret = arg0.onplaying;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onplaying_de710edfdd82e1ed: function(arg0) {
            const ret = arg0.onplaying;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointercancel_253368379c14a100: function(arg0) {
            const ret = arg0.onpointercancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointercancel_2d69d9cfa4492b7d: function(arg0) {
            const ret = arg0.onpointercancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointercancel_f50901a9fafeb0cc: function(arg0) {
            const ret = arg0.onpointercancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerdown_3d8fd9ce36834373: function(arg0) {
            const ret = arg0.onpointerdown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerdown_560e5da09e4b3355: function(arg0) {
            const ret = arg0.onpointerdown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerdown_6fd475f209d25098: function(arg0) {
            const ret = arg0.onpointerdown;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerenter_9768d04182944d62: function(arg0) {
            const ret = arg0.onpointerenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerenter_cd349866cd9b563c: function(arg0) {
            const ret = arg0.onpointerenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerenter_ef71dfecbbb7d38a: function(arg0) {
            const ret = arg0.onpointerenter;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerleave_3b84b9a8411ddfe5: function(arg0) {
            const ret = arg0.onpointerleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerleave_7c479f4f7f4ec249: function(arg0) {
            const ret = arg0.onpointerleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerleave_e11ad95a264b387d: function(arg0) {
            const ret = arg0.onpointerleave;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerlockchange_2b6a522392095f10: function(arg0) {
            const ret = arg0.onpointerlockchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerlockerror_db6e571d13c335cd: function(arg0) {
            const ret = arg0.onpointerlockerror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointermove_0f1defc71042c9c5: function(arg0) {
            const ret = arg0.onpointermove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointermove_9db5a42e7c55e7a7: function(arg0) {
            const ret = arg0.onpointermove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointermove_fd30f55d1a9915a9: function(arg0) {
            const ret = arg0.onpointermove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerout_1a59362b636cb265: function(arg0) {
            const ret = arg0.onpointerout;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerout_9e3a855bb9f30109: function(arg0) {
            const ret = arg0.onpointerout;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerout_c0db14c726cba99f: function(arg0) {
            const ret = arg0.onpointerout;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerover_3d52c354c2230128: function(arg0) {
            const ret = arg0.onpointerover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerover_a52530eae6f2cb1b: function(arg0) {
            const ret = arg0.onpointerover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerover_d8d13e7a45e4f94c: function(arg0) {
            const ret = arg0.onpointerover;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerup_1d41ab70ef983465: function(arg0) {
            const ret = arg0.onpointerup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerup_43686616678bb714: function(arg0) {
            const ret = arg0.onpointerup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpointerup_dccd88ed192b04e4: function(arg0) {
            const ret = arg0.onpointerup;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onpopstate_2fb0396d62f6f13a: function(arg0) {
            const ret = arg0.onpopstate;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onprogress_53a58a86fe8b2ac0: function(arg0) {
            const ret = arg0.onprogress;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onprogress_a22743126f026e62: function(arg0) {
            const ret = arg0.onprogress;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onprogress_cf2609e77222cb3a: function(arg0) {
            const ret = arg0.onprogress;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onratechange_476286315d21a453: function(arg0) {
            const ret = arg0.onratechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onratechange_97f011590269cbe9: function(arg0) {
            const ret = arg0.onratechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onratechange_a51b516f3356475a: function(arg0) {
            const ret = arg0.onratechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onreadystatechange_73617e92d23a3980: function(arg0) {
            const ret = arg0.onreadystatechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onreset_464ecc93a7950b25: function(arg0) {
            const ret = arg0.onreset;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onreset_8e21ef4a1521c638: function(arg0) {
            const ret = arg0.onreset;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onreset_9e51b04917205c87: function(arg0) {
            const ret = arg0.onreset;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onresize_463393a201d4b66d: function(arg0) {
            const ret = arg0.onresize;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onresize_81a4566307afa2b9: function(arg0) {
            const ret = arg0.onresize;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onresize_97d6f59519ac6bde: function(arg0) {
            const ret = arg0.onresize;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onscroll_c9a1757d97816c9a: function(arg0) {
            const ret = arg0.onscroll;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onscroll_cf76b15765f8f488: function(arg0) {
            const ret = arg0.onscroll;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onscroll_dc21541144808754: function(arg0) {
            const ret = arg0.onscroll;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onseeked_5ed0bb527150ddee: function(arg0) {
            const ret = arg0.onseeked;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onseeked_ad1e3c3b20821932: function(arg0) {
            const ret = arg0.onseeked;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onseeked_f29b4e675df93ed3: function(arg0) {
            const ret = arg0.onseeked;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onseeking_86de4c707429bfc8: function(arg0) {
            const ret = arg0.onseeking;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onseeking_c157e625c9c4634a: function(arg0) {
            const ret = arg0.onseeking;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onseeking_d7c8de722af08445: function(arg0) {
            const ret = arg0.onseeking;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onselect_007530ce01c320c3: function(arg0) {
            const ret = arg0.onselect;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onselect_272223d895112127: function(arg0) {
            const ret = arg0.onselect;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onselect_5d66485a634cd3dd: function(arg0) {
            const ret = arg0.onselect;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onselectionchange_2a3cf68fce752245: function(arg0) {
            const ret = arg0.onselectionchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onselectstart_37968549f84b761b: function(arg0) {
            const ret = arg0.onselectstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onselectstart_a366c018998540a8: function(arg0) {
            const ret = arg0.onselectstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onselectstart_b3c276d857b4eec8: function(arg0) {
            const ret = arg0.onselectstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onshow_2d67dca7782c2f80: function(arg0) {
            const ret = arg0.onshow;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onshow_3d4314dfc6707c8f: function(arg0) {
            const ret = arg0.onshow;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onshow_beff22299b8c2c5a: function(arg0) {
            const ret = arg0.onshow;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onstalled_23d168b92dbf62c1: function(arg0) {
            const ret = arg0.onstalled;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onstalled_7640d48535c0eb67: function(arg0) {
            const ret = arg0.onstalled;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onstalled_9387b30c189689be: function(arg0) {
            const ret = arg0.onstalled;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onstorage_bc078abfe161e12c: function(arg0) {
            const ret = arg0.onstorage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onsubmit_1a001aff568be107: function(arg0) {
            const ret = arg0.onsubmit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onsubmit_58d8682575591c68: function(arg0) {
            const ret = arg0.onsubmit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onsubmit_b3c462e91c5f1904: function(arg0) {
            const ret = arg0.onsubmit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onsuspend_092800a0692103af: function(arg0) {
            const ret = arg0.onsuspend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onsuspend_1b57fac767b6d4b8: function(arg0) {
            const ret = arg0.onsuspend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onsuspend_a8cf9449652e1c70: function(arg0) {
            const ret = arg0.onsuspend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontimeupdate_14e643a0c52640b1: function(arg0) {
            const ret = arg0.ontimeupdate;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontimeupdate_5a2b753f6b8a46e8: function(arg0) {
            const ret = arg0.ontimeupdate;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontimeupdate_822482f2a8bc7693: function(arg0) {
            const ret = arg0.ontimeupdate;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontoggle_bbbe7145811c14a7: function(arg0) {
            const ret = arg0.ontoggle;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontoggle_e3dc88f169434627: function(arg0) {
            const ret = arg0.ontoggle;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontoggle_fdd1f5710ca780a8: function(arg0) {
            const ret = arg0.ontoggle;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchcancel_71774a6f51f62d4f: function(arg0) {
            const ret = arg0.ontouchcancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchcancel_d9119a2d10e96e21: function(arg0) {
            const ret = arg0.ontouchcancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchcancel_f9d5bedfe13211fd: function(arg0) {
            const ret = arg0.ontouchcancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchend_3025881b218291db: function(arg0) {
            const ret = arg0.ontouchend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchend_9a8e9e8386022726: function(arg0) {
            const ret = arg0.ontouchend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchend_db0c08e6c415eb30: function(arg0) {
            const ret = arg0.ontouchend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchmove_54a2c0e924cf5eca: function(arg0) {
            const ret = arg0.ontouchmove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchmove_5bc72889ad12c161: function(arg0) {
            const ret = arg0.ontouchmove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchmove_de486d1ba074b7a9: function(arg0) {
            const ret = arg0.ontouchmove;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchstart_a3d201a87aec33f6: function(arg0) {
            const ret = arg0.ontouchstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchstart_eef3e92cd76f1024: function(arg0) {
            const ret = arg0.ontouchstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontouchstart_efa0c36294843a8c: function(arg0) {
            const ret = arg0.ontouchstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitioncancel_3899db16258b615d: function(arg0) {
            const ret = arg0.ontransitioncancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitioncancel_4add26e5f302a2c7: function(arg0) {
            const ret = arg0.ontransitioncancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitioncancel_7248197ca90e8d99: function(arg0) {
            const ret = arg0.ontransitioncancel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionend_073c5e9a586a5e81: function(arg0) {
            const ret = arg0.ontransitionend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionend_76fb894efd2117aa: function(arg0) {
            const ret = arg0.ontransitionend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionend_78b9d1af8ba4753a: function(arg0) {
            const ret = arg0.ontransitionend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionrun_8ee561bd34021855: function(arg0) {
            const ret = arg0.ontransitionrun;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionrun_be5d3b41497499de: function(arg0) {
            const ret = arg0.ontransitionrun;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionrun_d669daeaf46208cd: function(arg0) {
            const ret = arg0.ontransitionrun;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionstart_99e25e65ab621047: function(arg0) {
            const ret = arg0.ontransitionstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionstart_abef9a538bf2333a: function(arg0) {
            const ret = arg0.ontransitionstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_ontransitionstart_d3ad7a2436e6396a: function(arg0) {
            const ret = arg0.ontransitionstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onuncapturederror_298ed09d7f3f374e: function(arg0) {
            const ret = arg0.onuncapturederror;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onunload_c871b5bc07c01c82: function(arg0) {
            const ret = arg0.onunload;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvisibilitychange_bb1eaa9873d57d4d: function(arg0) {
            const ret = arg0.onvisibilitychange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvolumechange_7047a3b1ce78a476: function(arg0) {
            const ret = arg0.onvolumechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvolumechange_7467367469d30f71: function(arg0) {
            const ret = arg0.onvolumechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvolumechange_eae9df5547de4402: function(arg0) {
            const ret = arg0.onvolumechange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvrdisplayactivate_c4d9e9c7296b10c1: function(arg0) {
            const ret = arg0.onvrdisplayactivate;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvrdisplayconnect_c920ea1456067a48: function(arg0) {
            const ret = arg0.onvrdisplayconnect;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvrdisplaydeactivate_aabad56c09a0808b: function(arg0) {
            const ret = arg0.onvrdisplaydeactivate;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvrdisplaydisconnect_224558b22bc0126a: function(arg0) {
            const ret = arg0.onvrdisplaydisconnect;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onvrdisplaypresentchange_7c0bbaf3754a8c29: function(arg0) {
            const ret = arg0.onvrdisplaypresentchange;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwaiting_16701fc192d9b57d: function(arg0) {
            const ret = arg0.onwaiting;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwaiting_196ff5690a1c6952: function(arg0) {
            const ret = arg0.onwaiting;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwaiting_75e87593897fbc61: function(arg0) {
            const ret = arg0.onwaiting;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwaitingforkey_7b718131b0ac0fcc: function(arg0) {
            const ret = arg0.onwaitingforkey;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationend_3ae04d0b5ed98995: function(arg0) {
            const ret = arg0.onwebkitanimationend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationend_44052fca2677bb0f: function(arg0) {
            const ret = arg0.onwebkitanimationend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationend_a8b345d580d86cbf: function(arg0) {
            const ret = arg0.onwebkitanimationend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationiteration_395a1dc36fa6bc51: function(arg0) {
            const ret = arg0.onwebkitanimationiteration;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationiteration_9e6c481a4a0cd292: function(arg0) {
            const ret = arg0.onwebkitanimationiteration;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationiteration_e95e027aff1264ca: function(arg0) {
            const ret = arg0.onwebkitanimationiteration;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationstart_040854835c8f7e21: function(arg0) {
            const ret = arg0.onwebkitanimationstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationstart_67fbcd3cf372305b: function(arg0) {
            const ret = arg0.onwebkitanimationstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkitanimationstart_a9297bdb2cb73fe3: function(arg0) {
            const ret = arg0.onwebkitanimationstart;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkittransitionend_004573ef7f47af9d: function(arg0) {
            const ret = arg0.onwebkittransitionend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkittransitionend_360b1ee2714504b1: function(arg0) {
            const ret = arg0.onwebkittransitionend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwebkittransitionend_a2a582e46f362d11: function(arg0) {
            const ret = arg0.onwebkittransitionend;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwheel_00d4979473939aac: function(arg0) {
            const ret = arg0.onwheel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwheel_55612359460fe823: function(arg0) {
            const ret = arg0.onwheel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_onwheel_a6dc1ac930db652e: function(arg0) {
            const ret = arg0.onwheel;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_open_1a1b29d8bfde6885: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_open_221b279749ba2e4e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_open_ac028f8f7e62f13a: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.open(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_open_dc8eac550ee605aa: function() { return handleError(function (arg0) {
            const ret = arg0.open();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_opener_88c217ff40609c05: function() { return handleError(function (arg0) {
            const ret = arg0.opener;
            return ret;
        }, arguments); },
        __wbg_orientation_60314e697fb1eb69: function(arg0) {
            const ret = arg0.orientation;
            return ret;
        },
        __wbg_orientation_93b540b75a5ce59e: function(arg0) {
            const ret = arg0.orientation;
            return ret;
        },
        __wbg_origin_20241ea39db397fd: function(arg0, arg1) {
            const ret = arg1.origin;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_origin_7079b69b0f42a833: function(arg0, arg1) {
            const ret = arg1.origin;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_origin_fd7a89859af60f50: function(arg0, arg1) {
            const ret = arg1.origin;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_outerHTML_daba577a9aca74d9: function(arg0, arg1) {
            const ret = arg1.outerHTML;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_outerHeight_049dac07488e09ab: function() { return handleError(function (arg0) {
            const ret = arg0.outerHeight;
            return ret;
        }, arguments); },
        __wbg_outerWidth_233965e7a95f6581: function() { return handleError(function (arg0) {
            const ret = arg0.outerWidth;
            return ret;
        }, arguments); },
        __wbg_ownKeys_a2745e10effd5d46: function() { return handleError(function (arg0) {
            const ret = Reflect.ownKeys(arg0);
            return ret;
        }, arguments); },
        __wbg_ownerDocument_5a7a5473f8709b3e: function(arg0) {
            const ret = arg0.ownerDocument;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_padEnd_b5e91c955613c90b: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.padEnd(arg1 >>> 0, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_padStart_1c3d2e358ad557be: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.padStart(arg1 >>> 0, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_pageXOffset_7d0a99ed4e73da8e: function() { return handleError(function (arg0) {
            const ret = arg0.pageXOffset;
            return ret;
        }, arguments); },
        __wbg_pageX_56e23ef1ade65aa7: function(arg0) {
            const ret = arg0.pageX;
            return ret;
        },
        __wbg_pageX_a68ae1bf020688ba: function(arg0) {
            const ret = arg0.pageX;
            return ret;
        },
        __wbg_pageYOffset_bd341ef6a7c0b891: function() { return handleError(function (arg0) {
            const ret = arg0.pageYOffset;
            return ret;
        }, arguments); },
        __wbg_pageY_d421aa8cfce954d6: function(arg0) {
            const ret = arg0.pageY;
            return ret;
        },
        __wbg_pageY_e95836184debedec: function(arg0) {
            const ret = arg0.pageY;
            return ret;
        },
        __wbg_parentElement_5030754e30795652: function(arg0) {
            const ret = arg0.parentElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_parentNode_fecbbdea2a930547: function(arg0) {
            const ret = arg0.parentNode;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_parent_422557ed2e932836: function() { return handleError(function (arg0) {
            const ret = arg0.parent;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_parseFloat_9cb36d988ca9201a: function(arg0, arg1) {
            const ret = parseFloat(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_parseFloat_e5a06d9a4b22711d: function(arg0, arg1) {
            const ret = Number.parseFloat(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_parseInt_39089ddca4429112: function(arg0, arg1, arg2) {
            const ret = Number.parseInt(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_parseInt_800e36f34fa0be71: function(arg0, arg1, arg2) {
            const ret = parseInt(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        },
        __wbg_parse_1c0d8a8656d7e016: function() { return handleError(function (arg0, arg1) {
            const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments); },
        __wbg_parse_23ed54371a332e18: function(arg0, arg1) {
            const ret = Date.parse(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_password_40f6c5ebf211dacb: function(arg0, arg1) {
            const ret = arg1.password;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_pathname_a701a8de91801a07: function(arg0, arg1) {
            const ret = arg1.pathname;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_pause_09c247391202d6c7: function() {
            Atomics.pause();
        },
        __wbg_pause_d5c0ce7f72f1a9b3: function() { return handleError(function (arg0) {
            arg0.pause();
        }, arguments); },
        __wbg_pause_with_hint_6b6d73dda12aa878: function(arg0) {
            Atomics.pause_with_hint(arg0 >>> 0);
        },
        __wbg_paused_b81c58e8c121d3fa: function(arg0) {
            const ret = arg0.paused;
            return ret;
        },
        __wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
            const ret = arg0.performance;
            return ret;
        },
        __wbg_permissions_11fa36e9dba96535: function() { return handleError(function (arg0) {
            const ret = arg0.permissions;
            return ret;
        }, arguments); },
        __wbg_persisted_e508d4d322115185: function(arg0) {
            const ret = arg0.persisted;
            return ret;
        },
        __wbg_pixelDepth_c9a7a3cce4d99b92: function() { return handleError(function (arg0) {
            const ret = arg0.pixelDepth;
            return ret;
        }, arguments); },
        __wbg_platform_8f91807159afa028: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.platform;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_platform_c29e1cbb63910d50: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.platform;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_play_3997a1be51d27925: function(arg0) {
            arg0.play();
        },
        __wbg_play_8708f9438e2fc4d9: function() { return handleError(function (arg0) {
            const ret = arg0.play();
            return ret;
        }, arguments); },
        __wbg_playbackRate_092fc034071d5b1f: function(arg0) {
            const ret = arg0.playbackRate;
            return ret;
        },
        __wbg_pointerId_ea33d2695be12e7f: function(arg0) {
            const ret = arg0.pointerId;
            return ret;
        },
        __wbg_pointerLockElement_1e6b7da5caad7e29: function(arg0) {
            const ret = arg0.pointerLockElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_pointerType_d5e932608aa61bb6: function(arg0, arg1) {
            const ret = arg1.pointerType;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_popDebugGroup_1ae292625814affe: function(arg0) {
            arg0.popDebugGroup();
        },
        __wbg_popDebugGroup_48758e1c18d875e5: function(arg0) {
            arg0.popDebugGroup();
        },
        __wbg_popDebugGroup_f64eecd963cbf534: function(arg0) {
            arg0.popDebugGroup();
        },
        __wbg_popDebugGroup_fe22c1f391f88a04: function(arg0) {
            arg0.popDebugGroup();
        },
        __wbg_popErrorScope_966d33c301ea1c49: function(arg0) {
            const ret = arg0.popErrorScope();
            return ret;
        },
        __wbg_popover_4583faab20b1707b: function(arg0, arg1) {
            const ret = arg1.popover;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_port1_dabba0a56576e47e: function(arg0) {
            const ret = arg0.port1;
            return ret;
        },
        __wbg_port2_d05676aee003eedc: function(arg0) {
            const ret = arg0.port2;
            return ret;
        },
        __wbg_port_4bc17fa871f36edf: function(arg0, arg1) {
            const ret = arg1.port;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_postMessage_56396682c54d5757: function() { return handleError(function (arg0, arg1) {
            arg0.postMessage(arg1);
        }, arguments); },
        __wbg_postMessage_a67a0ff446ca0ff1: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.postMessage(arg1, arg2);
        }, arguments); },
        __wbg_postMessage_b80f20949a4b4f55: function() { return handleError(function (arg0, arg1) {
            arg0.postMessage(arg1);
        }, arguments); },
        __wbg_postMessage_df8b70e2b83b0792: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.postMessage(arg1, getStringFromWasm0(arg2, arg3), arg4);
        }, arguments); },
        __wbg_postMessage_e7bbbe3bfa80db1a: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.postMessage(arg1, getStringFromWasm0(arg2, arg3));
        }, arguments); },
        __wbg_postMessage_ef2dbf5e8c8ebffc: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.postMessage(arg1, arg2);
        }, arguments); },
        __wbg_postMessage_f48bc524bea113e2: function() { return handleError(function (arg0, arg1) {
            arg0.postMessage(arg1);
        }, arguments); },
        __wbg_postTask_e2439afddcdfbb55: function(arg0, arg1, arg2) {
            const ret = arg0.postTask(arg1, arg2);
            return ret;
        },
        __wbg_poster_259101a1fc0f6864: function(arg0, arg1) {
            const ret = arg1.poster;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_pow_6f55a20548ea0271: function(arg0, arg1) {
            const ret = Math.pow(arg0, arg1);
            return ret;
        },
        __wbg_preferredStyleSheetSet_7cbc6b358dffd853: function(arg0, arg1) {
            const ret = arg1.preferredStyleSheetSet;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_prefix_3b3bbb562c277694: function(arg0, arg1) {
            const ret = arg1.prefix;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_preload_166204f88695571d: function(arg0, arg1) {
            const ret = arg1.preload;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_prepend_01be927491da8156: function() { return handleError(function (arg0, arg1) {
            arg0.prepend(...arg1);
        }, arguments); },
        __wbg_prepend_02c7c8ca092cbd09: function() { return handleError(function (arg0) {
            arg0.prepend();
        }, arguments); },
        __wbg_prepend_0f37424cfb33a99b: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.prepend(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_prepend_13edc0b23f87e990: function() { return handleError(function (arg0) {
            arg0.prepend();
        }, arguments); },
        __wbg_prepend_2674e4b50f991470: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_prepend_29e95cf8f6bd0f34: function() { return handleError(function (arg0, arg1) {
            arg0.prepend(...arg1);
        }, arguments); },
        __wbg_prepend_2b114853bdb75c96: function() { return handleError(function (arg0, arg1) {
            arg0.prepend(arg1);
        }, arguments); },
        __wbg_prepend_4cbcd4e1ce933dca: function() { return handleError(function (arg0) {
            arg0.prepend();
        }, arguments); },
        __wbg_prepend_56bd1a2b0387f2d5: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_prepend_5a6f76848df1df73: function() { return handleError(function (arg0, arg1) {
            arg0.prepend(...arg1);
        }, arguments); },
        __wbg_prepend_5d9784ed8c7e3fd6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.prepend(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }, arguments); },
        __wbg_prepend_6a47f76c7550ba3f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_prepend_74aa906aa1ca1e58: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_prepend_7b2b46c7b166da7d: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.prepend(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_prepend_816d8a754229fe43: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.prepend(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_prepend_965c92c9b17fc66a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_prepend_9a0b4792d228cbe8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.prepend(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_prepend_9ab7a729f2a86aeb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_prepend_a22d018db5464b58: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.prepend(arg1, arg2);
        }, arguments); },
        __wbg_prepend_a4d14d96ce5160a8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_prepend_a6b8f69def610cd9: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.prepend(arg1, arg2);
        }, arguments); },
        __wbg_prepend_a9e4500b69671561: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_prepend_ad79b66f38802133: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.prepend(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_prepend_b472dfb77ff1cb59: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.prepend(arg1, arg2, arg3, arg4, arg5, arg6);
        }, arguments); },
        __wbg_prepend_bc7211e71172a794: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_prepend_bf57fbcabcd38761: function() { return handleError(function (arg0, arg1) {
            arg0.prepend(arg1);
        }, arguments); },
        __wbg_prepend_bfc24346604f9d26: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_prepend_c4df70c74f6640ab: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.prepend(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_prepend_c9dde21a429ee5d4: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.prepend(arg1, arg2, arg3);
        }, arguments); },
        __wbg_prepend_d6dfe6afa4d9415f: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.prepend(arg1, arg2, arg3);
        }, arguments); },
        __wbg_prepend_dbed9609acb642df: function() { return handleError(function (arg0, arg1) {
            arg0.prepend(...arg1);
        }, arguments); },
        __wbg_prepend_dd50c6cea257d614: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.prepend(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }, arguments); },
        __wbg_prepend_e220803f1406c0e2: function() { return handleError(function (arg0) {
            arg0.prepend();
        }, arguments); },
        __wbg_prepend_e3b6ce22776c7800: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_prepend_f37fdb5f852ca686: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.prepend(arg1, arg2, arg3, arg4, arg5, arg6);
        }, arguments); },
        __wbg_prepend_f3a1ef295b1fe282: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.prepend(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_pressure_9a7845d9744ae9f4: function(arg0) {
            const ret = arg0.pressure;
            return ret;
        },
        __wbg_preventDefault_b64888c857500682: function(arg0) {
            arg0.preventDefault();
        },
        __wbg_previousElementSibling_844357c0c2cc6541: function(arg0) {
            const ret = arg0.previousElementSibling;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_previousSibling_94004dcaacd11fda: function(arg0) {
            const ret = arg0.previousSibling;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_print_690c9f6c7391a0fd: function() { return handleError(function (arg0) {
            arg0.print();
        }, arguments); },
        __wbg_product_3b6be4fbafc7aca2: function(arg0, arg1) {
            const ret = arg1.product;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_product_f162449a799fd2e3: function(arg0, arg1) {
            const ret = arg1.product;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_profileEnd_0e7d4f2627712bf4: function(arg0, arg1, arg2) {
            console.profileEnd(arg0, arg1, arg2);
        },
        __wbg_profileEnd_21e88a2487e765c6: function(arg0) {
            console.profileEnd(...arg0);
        },
        __wbg_profileEnd_2500d2bd2fb000f8: function() {
            console.profileEnd();
        },
        __wbg_profileEnd_37af551d27777fee: function(arg0, arg1, arg2, arg3) {
            console.profileEnd(arg0, arg1, arg2, arg3);
        },
        __wbg_profileEnd_4169faaeaa4850a3: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.profileEnd(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_profileEnd_94a96bb97f897ccb: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.profileEnd(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_profileEnd_b05d86ab2800f9f8: function(arg0, arg1, arg2, arg3, arg4) {
            console.profileEnd(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_profileEnd_bc79a7426d418f7d: function(arg0, arg1) {
            console.profileEnd(arg0, arg1);
        },
        __wbg_profileEnd_c91f21f9d8bda0d1: function(arg0) {
            console.profileEnd(arg0);
        },
        __wbg_profile_05e3625b90433d05: function(arg0, arg1, arg2, arg3) {
            console.profile(arg0, arg1, arg2, arg3);
        },
        __wbg_profile_28f9d23aaccf4df6: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.profile(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_profile_646eb4a05396eb8d: function(arg0) {
            console.profile(arg0);
        },
        __wbg_profile_6c2aab8513e8bc79: function(arg0, arg1) {
            console.profile(arg0, arg1);
        },
        __wbg_profile_70f8b5bf5ffdf437: function(arg0) {
            console.profile(...arg0);
        },
        __wbg_profile_7bc9560a8dd88fe0: function(arg0, arg1, arg2, arg3, arg4) {
            console.profile(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_profile_821f33af814a790a: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.profile(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_profile_881a576f6e36176b: function(arg0, arg1, arg2) {
            console.profile(arg0, arg1, arg2);
        },
        __wbg_profile_89bfea9c1b987feb: function() {
            console.profile();
        },
        __wbg_prompt_1ad5d941b3544b4f: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.prompt(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_prompt_40a11951274aca2f: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.prompt();
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_prompt_64ae8dbf4d5f431a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg1.prompt(getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_protocol_15ef1e911b7610ba: function(arg0, arg1) {
            const ret = arg1.protocol;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_prototype_0d5bb2023db3bcfc: function() {
            const ret = ResizeObserverEntry.prototype;
            return ret;
        },
        __wbg_prototypesetcall_0231ea8831998599: function(arg0, arg1, arg2) {
            Uint8ClampedArray.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_18a0f7bcf4a5652d: function(arg0, arg1, arg2) {
            Int32Array.prototype.set.call(getArrayI32FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_21a175a0a8157491: function(arg0, arg1, arg2) {
            Float64Array.prototype.set.call(getArrayF64FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_2d459e246bf63d88: function(arg0, arg1, arg2) {
            Int16Array.prototype.set.call(getArrayI16FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_4770620bbe4688a0: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_62396032bc038599: function(arg0, arg1, arg2) {
            Uint32Array.prototype.set.call(getArrayU32FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_936e9a8f84c83f7c: function(arg0, arg1, arg2) {
            BigUint64Array.prototype.set.call(getArrayU64FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_94e3eb9c867df1e5: function(arg0, arg1, arg2) {
            Uint16Array.prototype.set.call(getArrayU16FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_ba9c9a7197c11933: function(arg0, arg1, arg2) {
            Float32Array.prototype.set.call(getArrayF32FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_bbfb21c36aad3790: function(arg0, arg1, arg2) {
            BigInt64Array.prototype.set.call(getArrayI64FromWasm0(arg0, arg1), arg2);
        },
        __wbg_prototypesetcall_cf601460e6c8ac53: function(arg0, arg1, arg2) {
            Int8Array.prototype.set.call(getArrayI8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_pushDebugGroup_15d3fe543352bc6e: function(arg0, arg1, arg2) {
            arg0.pushDebugGroup(getStringFromWasm0(arg1, arg2));
        },
        __wbg_pushDebugGroup_a53079dc1f780142: function(arg0, arg1, arg2) {
            arg0.pushDebugGroup(getStringFromWasm0(arg1, arg2));
        },
        __wbg_pushDebugGroup_d96cdb6011450823: function(arg0, arg1, arg2) {
            arg0.pushDebugGroup(getStringFromWasm0(arg1, arg2));
        },
        __wbg_pushDebugGroup_ebc78d0365f0b5c7: function(arg0, arg1, arg2) {
            arg0.pushDebugGroup(getStringFromWasm0(arg1, arg2));
        },
        __wbg_pushErrorScope_163b750023f93530: function(arg0, arg1) {
            arg0.pushErrorScope(__wbindgen_enum_GpuErrorFilter[arg1]);
        },
        __wbg_push_d2ae3af0c1217ae6: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_querySelectorAll_7e98cbe256deaadd: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_querySelectorAll_c5edaa743a5f3647: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_querySelector_b966f59fa9848d69: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_querySelector_fd7d157ebe17cd16: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_query_0a53385385fc60d9: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.query(arg1);
            return ret;
        }, arguments); },
        __wbg_queueMicrotask_0ab5b2d2393e99b9: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_queueMicrotask_2ea5701b52468355: function(arg0, arg1) {
            arg0.queueMicrotask(arg1);
        },
        __wbg_queueMicrotask_6a09b7bc46549209: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queueMicrotask_ed5b33385a53c3a9: function(arg0, arg1) {
            arg0.queueMicrotask(arg1);
        },
        __wbg_queue_7bbf92178b06da19: function(arg0) {
            const ret = arg0.queue;
            return ret;
        },
        __wbg_race_ac5c7b465abcfa15: function(arg0) {
            const ret = Promise.race(arg0);
            return ret;
        },
        __wbg_random_039a7d5d06e0d333: function() {
            const ret = Math.random();
            return ret;
        },
        __wbg_rangeOffset_b2a4e7b4d625e15c: function(arg0) {
            const ret = arg0.rangeOffset;
            return ret;
        },
        __wbg_rangeParent_bcc506a37360053c: function(arg0) {
            const ret = arg0.rangeParent;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_raw_1b77a56029417678: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
            return ret;
        }, arguments); },
        __wbg_raw_24d6a42f5318d55e: function() { return handleError(function (arg0, arg1) {
            const ret = String.raw(arg0, ...arg1);
            return ret;
        }, arguments); },
        __wbg_raw_4744afe684b8efe7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_raw_499cf45dbb79d235: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
            return ret;
        }, arguments); },
        __wbg_raw_4c2c4595dc64113b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
            return ret;
        }, arguments); },
        __wbg_raw_952cb4579dd905eb: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_raw_9597f01580ebf87f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
            return ret;
        }, arguments); },
        __wbg_raw_bdeea94fac1ec49e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
            return ret;
        }, arguments); },
        __wbg_raw_f8c81b8e7ecd0bc5: function() { return handleError(function (arg0) {
            const ret = String.raw(arg0);
            return ret;
        }, arguments); },
        __wbg_readyState_23bbbe8de6a4c92a: function(arg0) {
            const ret = arg0.readyState;
            return ret;
        },
        __wbg_readyState_a45f4559d42cf34f: function(arg0, arg1) {
            const ret = arg1.readyState;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_reason_170684b0bb329a56: function(arg0) {
            const ret = arg0.reason;
            return (__wbindgen_enum_GpuDeviceLostReason.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_reason_70f49a7e29debcfd: function(arg0) {
            const ret = arg0.reason;
            return ret;
        },
        __wbg_referrerPolicy_07ce4a994eef553c: function(arg0, arg1) {
            const ret = arg1.referrerPolicy;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_referrer_e82bfe8f9d2a03e5: function(arg0, arg1) {
            const ret = arg1.referrer;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_region_d98eb7239ca23a78: function(arg0) {
            const ret = arg0.region;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_region_da563fa7e78bf1e2: function(arg0, arg1) {
            const ret = arg1.region;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_registerContentHandler_d7b691244f0a3c45: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.registerContentHandler(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_registerProtocolHandler_48b7c10f2be436f2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.registerProtocolHandler(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_register_ad1998de379b323b: function(arg0, arg1, arg2, arg3) {
            arg0.register(arg1, arg2, arg3);
        },
        __wbg_register_d44a78092cf19129: function(arg0, arg1, arg2) {
            arg0.register(arg1, arg2);
        },
        __wbg_reject_90df95b492dd8563: function(arg0) {
            const ret = Promise.reject(arg0);
            return ret;
        },
        __wbg_relatedTarget_7931777b8bd7975a: function(arg0) {
            const ret = arg0.relatedTarget;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_relatedTarget_814d4653198e96cd: function(arg0) {
            const ret = arg0.relatedTarget;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_releaseCapture_3062d8c235a5ee9c: function(arg0) {
            arg0.releaseCapture();
        },
        __wbg_releaseCapture_82779ff55fb7865a: function(arg0) {
            arg0.releaseCapture();
        },
        __wbg_releaseEvents_728c0bab993edde6: function(arg0) {
            arg0.releaseEvents();
        },
        __wbg_releasePointerCapture_3e982a4a25bf65a8: function() { return handleError(function (arg0, arg1) {
            arg0.releasePointerCapture(arg1);
        }, arguments); },
        __wbg_removeAttributeNS_d22268925e851912: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.removeAttributeNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_removeAttribute_1e7d2c409776d836: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.removeAttribute(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_removeChild_8d9536328d674d54: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.removeChild(arg1);
            return ret;
        }, arguments); },
        __wbg_removeEventListener_a3f23c70077bdcc1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_removeEventListener_c0e097844dc1021c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0);
        }, arguments); },
        __wbg_removeListener_768e1e787e1d4b2e: function() { return handleError(function (arg0, arg1) {
            arg0.removeListener(arg1);
        }, arguments); },
        __wbg_removeProperty_70da952bc1b493fa: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_remove_ce1b54059317fe8a: function(arg0) {
            arg0.remove();
        },
        __wbg_repeat_4e131e99bff9b9f4: function(arg0) {
            const ret = arg0.repeat;
            return ret;
        },
        __wbg_repeat_e671f605e85e2e40: function(arg0, arg1) {
            const ret = arg0.repeat(arg1);
            return ret;
        },
        __wbg_replaceAll_1abba935ad6fdd12: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.replaceAll(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_replaceAll_6ef64b9a55af1a62: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.replaceAll(arg1, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_replaceAll_710538552f62e02a: function(arg0, arg1, arg2) {
            const ret = arg0.replaceAll(arg1, arg2);
            return ret;
        },
        __wbg_replaceAll_9b61b146c5d08e08: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.replaceAll(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        },
        __wbg_replaceChild_c6b6b965cc8b9870: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.replaceChild(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_replaceChildren_07fd7b2c6a071742: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4);
        },
        __wbg_replaceChildren_0c7483be01341c9e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_replaceChildren_0c9cf1e65476a71b: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        },
        __wbg_replaceChildren_1705c1471719ddd4: function(arg0, arg1, arg2) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2));
        },
        __wbg_replaceChildren_1b74176af31d5b13: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        },
        __wbg_replaceChildren_1f8bb509f7bf2911: function(arg0, arg1) {
            arg0.replaceChildren(...arg1);
        },
        __wbg_replaceChildren_2355ab3b52c258fe: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_replaceChildren_33867fc67d7d1948: function(arg0, arg1, arg2) {
            arg0.replaceChildren(arg1, arg2);
        },
        __wbg_replaceChildren_3542ee6fad85441a: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        },
        __wbg_replaceChildren_383e4359c72aee8a: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        },
        __wbg_replaceChildren_420c5a74158efaff: function(arg0, arg1, arg2, arg3) {
            arg0.replaceChildren(arg1, arg2, arg3);
        },
        __wbg_replaceChildren_4da8e1eeeef65e63: function(arg0) {
            arg0.replaceChildren();
        },
        __wbg_replaceChildren_50b1a9da2561877e: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        },
        __wbg_replaceChildren_5c5aa4a7b5ae4ac2: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        },
        __wbg_replaceChildren_635b4f7900ec2113: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        },
        __wbg_replaceChildren_6cc9dafa86d63156: function(arg0, arg1) {
            arg0.replaceChildren(arg1);
        },
        __wbg_replaceChildren_7dc60bf702f4e91a: function(arg0, arg1) {
            arg0.replaceChildren(...arg1);
        },
        __wbg_replaceChildren_8b344b8463eaf62b: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        },
        __wbg_replaceChildren_8b81413cc7435fcf: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        },
        __wbg_replaceChildren_9162fb68e15923b5: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        },
        __wbg_replaceChildren_93c3c36f1a37cf61: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_replaceChildren_a7817b935737484a: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        },
        __wbg_replaceChildren_b4f3c461635adec7: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        },
        __wbg_replaceChildren_b7b403f9eca4583c: function(arg0, arg1) {
            arg0.replaceChildren(arg1);
        },
        __wbg_replaceChildren_bee9013ec578dab2: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4);
        },
        __wbg_replaceChildren_c739b69f6d5f0881: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        },
        __wbg_replaceChildren_c9115f3f2310dc78: function(arg0, arg1, arg2) {
            arg0.replaceChildren(arg1, arg2);
        },
        __wbg_replaceChildren_cab14dffb646538a: function(arg0, arg1) {
            arg0.replaceChildren(...arg1);
        },
        __wbg_replaceChildren_ce17a75d172bafaf: function(arg0, arg1) {
            arg0.replaceChildren(...arg1);
        },
        __wbg_replaceChildren_cfd6e0f8776ed4ce: function(arg0) {
            arg0.replaceChildren();
        },
        __wbg_replaceChildren_d32ea12217336c44: function(arg0) {
            arg0.replaceChildren();
        },
        __wbg_replaceChildren_da856f5cb11a1c0a: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        },
        __wbg_replaceChildren_e33b551239039dc9: function(arg0) {
            arg0.replaceChildren();
        },
        __wbg_replaceChildren_ed4f630203c42050: function(arg0, arg1, arg2) {
            arg0.replaceChildren(getStringFromWasm0(arg1, arg2));
        },
        __wbg_replaceChildren_f287336f3287aca1: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.replaceChildren(arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_replaceChildren_f597af75dd198c82: function(arg0, arg1, arg2, arg3) {
            arg0.replaceChildren(arg1, arg2, arg3);
        },
        __wbg_replaceWith_003520e1fb9f02e4: function() { return handleError(function (arg0) {
            arg0.replaceWith();
        }, arguments); },
        __wbg_replaceWith_1af3d2cbb1124271: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.replaceWith(arg1, arg2, arg3);
        }, arguments); },
        __wbg_replaceWith_239815cafbbd9a3f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.replaceWith(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_replaceWith_24f7bbfd529a5909: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            arg0.replaceWith(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        }, arguments); },
        __wbg_replaceWith_2fc1b4c416edea31: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            arg0.replaceWith(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        }, arguments); },
        __wbg_replaceWith_347c741eba3a246b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.replaceWith(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_replaceWith_3ca6fe57f57a2bcf: function() { return handleError(function (arg0, arg1) {
            arg0.replaceWith(arg1);
        }, arguments); },
        __wbg_replaceWith_765917f625bc1c62: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.replaceWith(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_replaceWith_8235cecd6f48d862: function() { return handleError(function (arg0, arg1) {
            arg0.replaceWith(...arg1);
        }, arguments); },
        __wbg_replaceWith_8c16c023ad811aaa: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
            arg0.replaceWith(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        }, arguments); },
        __wbg_replaceWith_a003fa041d233179: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
            arg0.replaceWith(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        }, arguments); },
        __wbg_replaceWith_a131cea8bb2ad599: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.replaceWith(arg1, arg2, arg3, arg4, arg5, arg6);
        }, arguments); },
        __wbg_replaceWith_ad10709bc6835bda: function() { return handleError(function (arg0) {
            arg0.replaceWith();
        }, arguments); },
        __wbg_replaceWith_b00d4cf994486942: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            arg0.replaceWith(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
        }, arguments); },
        __wbg_replaceWith_d3b85ca99bfe7445: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.replaceWith(arg1, arg2);
        }, arguments); },
        __wbg_replaceWith_dd66ea2d6905acee: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.replaceWith(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_replaceWith_e9483190a6fda8ad: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.replaceWith(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_replaceWith_fc43b298c214e5f1: function() { return handleError(function (arg0, arg1) {
            arg0.replaceWith(...arg1);
        }, arguments); },
        __wbg_replace_320e29bf08f1c543: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.replace(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_replace_46abab85568579c5: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.replace(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        },
        __wbg_replace_8cb64bc0fc7c0f42: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.replace(arg1, getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_replace_9d94985801ade81f: function() {
            const ret = Symbol.replace;
            return ret;
        },
        __wbg_replace_b8f387d1fdf69b94: function(arg0, arg1, arg2) {
            const ret = arg0.replace(arg1, arg2);
            return ret;
        },
        __wbg_requestAdapter_0049683abd339828: function(arg0, arg1) {
            const ret = arg0.requestAdapter(arg1);
            return ret;
        },
        __wbg_requestAdapter_67400a4450a20436: function(arg0) {
            const ret = arg0.requestAdapter();
            return ret;
        },
        __wbg_requestAnimationFrame_1a85deeab66448c2: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.requestAnimationFrame(arg1);
            return ret;
        }, arguments); },
        __wbg_requestDevice_91d901c02fc6dd5f: function(arg0) {
            const ret = arg0.requestDevice();
            return ret;
        },
        __wbg_requestDevice_921f0a221b4492fa: function(arg0, arg1) {
            const ret = arg0.requestDevice(arg1);
            return ret;
        },
        __wbg_requestFullscreen_3f16e43f398ce624: function(arg0) {
            const ret = arg0.requestFullscreen();
            return ret;
        },
        __wbg_requestFullscreen_b977a3a0697e883c: function(arg0) {
            const ret = arg0.requestFullscreen;
            return ret;
        },
        __wbg_requestFullscreen_ba637845d23582f1: function() { return handleError(function (arg0) {
            arg0.requestFullscreen();
        }, arguments); },
        __wbg_requestIdleCallback_3689e3e38f6cfc02: function(arg0) {
            const ret = arg0.requestIdleCallback;
            return ret;
        },
        __wbg_requestIdleCallback_d292749bf33501af: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.requestIdleCallback(arg1);
            return ret;
        }, arguments); },
        __wbg_requestMIDIAccess_8f9172e2eb1f192b: function() { return handleError(function (arg0) {
            const ret = arg0.requestMIDIAccess();
            return ret;
        }, arguments); },
        __wbg_requestMediaKeySystemAccess_960ef96a1ae7cffe: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.requestMediaKeySystemAccess(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_requestPointerLock_989cabcffbb4aec5: function(arg0) {
            arg0.requestPointerLock();
        },
        __wbg_resizable_d40d8b7f6defb5ea: function(arg0) {
            const ret = arg0.resizable;
            return ret;
        },
        __wbg_resizeBy_85a56854d61a6d92: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.resizeBy(arg1, arg2);
        }, arguments); },
        __wbg_resizeTo_597b63510e6bea34: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.resizeTo(arg1, arg2);
        }, arguments); },
        __wbg_resize_18dd2235bb503284: function() { return handleError(function (arg0, arg1) {
            arg0.resize(arg1 >>> 0);
        }, arguments); },
        __wbg_resolveQuerySet_0850b0f5611a8e3a: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.resolveQuerySet(arg1, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
        },
        __wbg_resolveQuerySet_cfd1a8a1cdaaf314: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.resolveQuerySet(arg1, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
        },
        __wbg_resolve_2191a4dfe481c25b: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_resolvedOptions_004cdc067ba4ffa8: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_20a48544c4831b08: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_445166dd9c2e553c: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_61622d2304ee5df7: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_629cf2f31959c1ca: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_84328d9b77a90825: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_9f4bac7e2a3219f0: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_a84589971ef219b0: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_resolvedOptions_ce0ede387898d6bd: function(arg0) {
            const ret = arg0.resolvedOptions();
            return ret;
        },
        __wbg_result_23829a450f527cea: function(arg0) {
            const ret = arg0.result;
            return ret;
        },
        __wbg_revocable_ba3e903822210d7e: function(arg0, arg1) {
            const ret = Proxy.revocable(arg0, arg1);
            return ret;
        },
        __wbg_revokeObjectURL_e010fb0b45f93f3f: function() { return handleError(function (arg0, arg1) {
            URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_revoke_1bcb4f94c5c1c40e: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.revoke(arg1);
            return ret;
        }, arguments); },
        __wbg_rightContext_21b30ec425f87097: function() {
            const ret = RegExp.rightContext;
            return ret;
        },
        __wbg_right_36c53e00496f4f0a: function(arg0) {
            const ret = arg0.right;
            return ret;
        },
        __wbg_rootBounds_f45f30011740fdb2: function(arg0) {
            const ret = arg0.rootBounds;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_rootMargin_bd3449c58545366d: function(arg0, arg1) {
            const ret = arg1.rootMargin;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_root_d6b3bb2bb3a00ed3: function(arg0) {
            const ret = arg0.root;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_round_9392a71378310550: function(arg0) {
            const ret = Math.round(arg0);
            return ret;
        },
        __wbg_sampleCount_ad38a508bbcfb245: function(arg0) {
            const ret = arg0.sampleCount;
            return ret;
        },
        __wbg_scheduler_a17d41c9c822fc26: function(arg0) {
            const ret = arg0.scheduler;
            return ret;
        },
        __wbg_scheduler_b35fe73ba70e89cc: function(arg0) {
            const ret = arg0.scheduler;
            return ret;
        },
        __wbg_screenX_baacf2f912162797: function() { return handleError(function (arg0) {
            const ret = arg0.screenX;
            return ret;
        }, arguments); },
        __wbg_screenX_bd1fb25d48033c9c: function(arg0) {
            const ret = arg0.screenX;
            return ret;
        },
        __wbg_screenY_7e467250657a3c56: function(arg0) {
            const ret = arg0.screenY;
            return ret;
        },
        __wbg_screenY_a3dc384ca1652086: function() { return handleError(function (arg0) {
            const ret = arg0.screenY;
            return ret;
        }, arguments); },
        __wbg_screen_99621feb231136f1: function() { return handleError(function (arg0) {
            const ret = arg0.screen;
            return ret;
        }, arguments); },
        __wbg_script_afc6c005f065dc8c: function(arg0) {
            const ret = arg0.script;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_scrollBy_193d7efa7fc633b1: function(arg0) {
            arg0.scrollBy();
        },
        __wbg_scrollBy_2619ca2b5f39f608: function(arg0, arg1, arg2) {
            arg0.scrollBy(arg1, arg2);
        },
        __wbg_scrollBy_86c8683932066438: function(arg0, arg1, arg2) {
            arg0.scrollBy(arg1, arg2);
        },
        __wbg_scrollBy_e097885344112f9e: function(arg0) {
            arg0.scrollBy();
        },
        __wbg_scrollHeight_8cf19eb16ebc9b9b: function(arg0) {
            const ret = arg0.scrollHeight;
            return ret;
        },
        __wbg_scrollHeight_ceb87081966d8961: function(arg0) {
            const ret = arg0.scrollHeight;
            return ret;
        },
        __wbg_scrollIntoView_5262843155744b69: function(arg0) {
            arg0.scrollIntoView();
        },
        __wbg_scrollIntoView_8aebc47f4e6dd724: function(arg0, arg1) {
            arg0.scrollIntoView(arg1 !== 0);
        },
        __wbg_scrollLeft_5be50f489b342a09: function(arg0) {
            const ret = arg0.scrollLeft;
            return ret;
        },
        __wbg_scrollTo_1471d54a7cdb4af0: function(arg0) {
            arg0.scrollTo();
        },
        __wbg_scrollTo_1cfa224549dc94c7: function(arg0) {
            arg0.scrollTo();
        },
        __wbg_scrollTo_b4e8b5cd74dd9f1e: function(arg0, arg1, arg2) {
            arg0.scrollTo(arg1, arg2);
        },
        __wbg_scrollTo_cac0dff19f631942: function(arg0, arg1, arg2) {
            arg0.scrollTo(arg1, arg2);
        },
        __wbg_scrollTop_b3effa9c5de14d21: function(arg0) {
            const ret = arg0.scrollTop;
            return ret;
        },
        __wbg_scrollTop_dc5ff575e4a53628: function(arg0) {
            const ret = arg0.scrollTop;
            return ret;
        },
        __wbg_scrollWidth_38006a7134cdfeff: function(arg0) {
            const ret = arg0.scrollWidth;
            return ret;
        },
        __wbg_scrollX_9da7f7defce2297e: function() { return handleError(function (arg0) {
            const ret = arg0.scrollX;
            return ret;
        }, arguments); },
        __wbg_scrollY_b4c56e98c6d976ad: function() { return handleError(function (arg0) {
            const ret = arg0.scrollY;
            return ret;
        }, arguments); },
        __wbg_scroll_2e2a58cecb122404: function(arg0) {
            arg0.scroll();
        },
        __wbg_scroll_82dd6119faf9a25e: function(arg0) {
            arg0.scroll();
        },
        __wbg_scroll_942bf1ee603fab19: function(arg0, arg1, arg2) {
            arg0.scroll(arg1, arg2);
        },
        __wbg_scroll_9822b21277ce6da3: function(arg0, arg1, arg2) {
            arg0.scroll(arg1, arg2);
        },
        __wbg_scrollingElement_3d934909811a8f26: function(arg0) {
            const ret = arg0.scrollingElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_search_4aa14a5c7adbfb58: function() {
            const ret = Symbol.search;
            return ret;
        },
        __wbg_search_6ea89ed347d2a4c5: function(arg0, arg1) {
            const ret = arg0.search(arg1);
            return ret;
        },
        __wbg_search_c905fb82fd20bc6b: function(arg0, arg1) {
            const ret = arg1.search;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_seconds_52119367714ff88d: function(arg0, arg1) {
            const ret = arg1.seconds;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_seekToNextFrame_d2d14f1b99dd814b: function() { return handleError(function (arg0) {
            const ret = arg0.seekToNextFrame();
            return ret;
        }, arguments); },
        __wbg_seeking_b97522d4c1300a1d: function(arg0) {
            const ret = arg0.seeking;
            return ret;
        },
        __wbg_segment_2bd731b60b0b770d: function(arg0) {
            const ret = arg0.segment;
            return ret;
        },
        __wbg_segment_cbb462d86ea1661b: function(arg0, arg1, arg2) {
            const ret = arg0.segment(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_selectRange_816ff723a2b34686: function(arg0, arg1, arg2) {
            const ret = arg0.selectRange(arg1, arg2);
            return ret;
        },
        __wbg_select_8392c8afcd17d32e: function(arg0, arg1) {
            const ret = arg0.select(arg1);
            return ret;
        },
        __wbg_selectedStyleSheetSet_47e3ce9317fd6633: function(arg0, arg1) {
            const ret = arg1.selectedStyleSheetSet;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_self_010d45ba3b6ad14f: function(arg0) {
            const ret = arg0.self;
            return ret;
        },
        __wbg_self_be20def147fa5b1c: function(arg0) {
            const ret = arg0.self;
            return ret;
        },
        __wbg_sendBeacon_31c9c394e52fd207: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.sendBeacon(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_sendBeacon_40b410cde04faa25: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.sendBeacon(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        }, arguments); },
        __wbg_sendBeacon_545fecd0b4ce0e2d: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.sendBeacon(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        }, arguments); },
        __wbg_sendBeacon_661c3a9d942f33f1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.sendBeacon(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        }, arguments); },
        __wbg_sendBeacon_92e27e5f7fa3d4bb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.sendBeacon(getStringFromWasm0(arg1, arg2), arg3 === 0 ? undefined : getArrayU8FromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_sendBeacon_a36760bfd31fbfeb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.sendBeacon(getStringFromWasm0(arg1, arg2), arg3 === 0 ? undefined : getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_setAttributeNS_81b111026e619bc4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setAttributeNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_setAttribute_71039043be82d098: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setBindGroup_0500d49bcf971ad6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_0bf8bc958110b440: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_13fcfb69a259305e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5 >>> 0, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_48fed791184fbfc2: function(arg0, arg1, arg2, arg3) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3);
        },
        __wbg_setBindGroup_79f2ee3005999ea7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_807d3a1d6bda1d0d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_81aeec0dbdac1d42: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_8247840c8eb9b9d9: function(arg0, arg1, arg2, arg3) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3);
        },
        __wbg_setBindGroup_851043cf286f55f2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_863d2daeb3c4fa01: function(arg0, arg1, arg2) {
            arg0.setBindGroup(arg1 >>> 0, arg2);
        },
        __wbg_setBindGroup_8e27ace4a6c2fb38: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5 >>> 0, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_8e55005ec962b04f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5 >>> 0, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_9a060b248a56357c: function(arg0, arg1, arg2, arg3) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3);
        },
        __wbg_setBindGroup_a776fb1140961a25: function(arg0, arg1, arg2) {
            arg0.setBindGroup(arg1 >>> 0, arg2);
        },
        __wbg_setBindGroup_b546d112a2d27da3: function(arg0, arg1, arg2) {
            arg0.setBindGroup(arg1 >>> 0, arg2);
        },
        __wbg_setBindGroup_d6d6c49867ffbf34: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_e43b91251bf0be17: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.setBindGroup(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_ef5b717678fd929c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setBlendConstant_535adcbf44c137f1: function() { return handleError(function (arg0, arg1) {
            arg0.setBlendConstant(arg1);
        }, arguments); },
        __wbg_setBlendConstant_f91ce3104deb18b4: function() { return handleError(function (arg0, arg1) {
            arg0.setBlendConstant(arg1);
        }, arguments); },
        __wbg_setCapture_0edb1c2bb491e971: function(arg0) {
            arg0.setCapture();
        },
        __wbg_setCapture_b17a15e78100882b: function(arg0, arg1) {
            arg0.setCapture(arg1 !== 0);
        },
        __wbg_setDate_a116eaa658c7e836: function(arg0, arg1) {
            const ret = arg0.setDate(arg1 >>> 0);
            return ret;
        },
        __wbg_setFloat16_07fc9a7511909b27: function(arg0, arg1, arg2, arg3) {
            arg0.setFloat16(arg1 >>> 0, arg2, arg3 !== 0);
        },
        __wbg_setFloat16_9e1ba00652c88765: function(arg0, arg1, arg2) {
            arg0.setFloat16(arg1 >>> 0, arg2);
        },
        __wbg_setFloat32_6b90992ce987f684: function(arg0, arg1, arg2, arg3) {
            arg0.setFloat32(arg1 >>> 0, arg2, arg3 !== 0);
        },
        __wbg_setFloat32_de9b6bb77dd30023: function(arg0, arg1, arg2) {
            arg0.setFloat32(arg1 >>> 0, arg2);
        },
        __wbg_setFloat64_b765377da113db88: function(arg0, arg1, arg2, arg3) {
            arg0.setFloat64(arg1 >>> 0, arg2, arg3 !== 0);
        },
        __wbg_setFloat64_d25ff2c43086c1dc: function(arg0, arg1, arg2) {
            arg0.setFloat64(arg1 >>> 0, arg2);
        },
        __wbg_setFullYear_8a134358e72f153d: function(arg0, arg1) {
            const ret = arg0.setFullYear(arg1 >>> 0);
            return ret;
        },
        __wbg_setFullYear_c52dae845d855347: function(arg0, arg1, arg2) {
            const ret = arg0.setFullYear(arg1 >>> 0, arg2);
            return ret;
        },
        __wbg_setFullYear_d4937201b620c8f2: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.setFullYear(arg1 >>> 0, arg2, arg3);
            return ret;
        },
        __wbg_setHours_e8eb3362b6f49d90: function(arg0, arg1) {
            const ret = arg0.setHours(arg1 >>> 0);
            return ret;
        },
        __wbg_setIndexBuffer_19bf937ddac53369: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
        },
        __wbg_setIndexBuffer_1a5ea7fb31b50f22: function(arg0, arg1, arg2, arg3) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
        },
        __wbg_setIndexBuffer_28586859716fc610: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_setIndexBuffer_32c7215acf56284f: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4 >>> 0);
        },
        __wbg_setIndexBuffer_39c0782c6ae21ac5: function(arg0, arg1, arg2, arg3) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3 >>> 0);
        },
        __wbg_setIndexBuffer_4bc78b5d230ee067: function(arg0, arg1, arg2, arg3) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3 >>> 0);
        },
        __wbg_setIndexBuffer_4c0591f9172b0538: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3 >>> 0, arg4);
        },
        __wbg_setIndexBuffer_7f9e5e2203370df3: function(arg0, arg1, arg2) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2]);
        },
        __wbg_setIndexBuffer_7fabe9c22bfa6b95: function(arg0, arg1, arg2) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2]);
        },
        __wbg_setIndexBuffer_804bab8af80acc23: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4 >>> 0);
        },
        __wbg_setIndexBuffer_934e551aa9109fdf: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_setIndexBuffer_994771910f4a92bf: function(arg0, arg1, arg2, arg3) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
        },
        __wbg_setIndexBuffer_f0aa83f423c3ea49: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
        },
        __wbg_setIndexBuffer_fc9a7e7ce44ccae3: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3 >>> 0, arg4);
        },
        __wbg_setInt16_1694ac1e7f78eb8f: function(arg0, arg1, arg2) {
            arg0.setInt16(arg1 >>> 0, arg2);
        },
        __wbg_setInt16_8006f6421694cd18: function(arg0, arg1, arg2, arg3) {
            arg0.setInt16(arg1 >>> 0, arg2, arg3 !== 0);
        },
        __wbg_setInt32_7891d624fb87d56a: function(arg0, arg1, arg2) {
            arg0.setInt32(arg1 >>> 0, arg2);
        },
        __wbg_setInt32_83b890dd2760ffa2: function(arg0, arg1, arg2, arg3) {
            arg0.setInt32(arg1 >>> 0, arg2, arg3 !== 0);
        },
        __wbg_setInt8_9c5f1a2886959bc7: function(arg0, arg1, arg2) {
            arg0.setInt8(arg1 >>> 0, arg2);
        },
        __wbg_setInterval_05b442244a81931c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setInterval_06880f64b13f4e03: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setInterval_072d6ee48e497d2f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
            return ret;
        }, arguments); },
        __wbg_setInterval_086027ac22581c65: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setInterval_0bf1d9cb47647fd3: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setInterval_1ee5269f1eb69a9b: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, ...arg3);
            return ret;
        }, arguments); },
        __wbg_setInterval_1f74ffd37261ce6b: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        }, arguments); },
        __wbg_setInterval_27bf8fa384b4a95b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setInterval_27ede4a76123fbc1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setInterval_28ef179780cd639c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setInterval_2a4485b65c41eeb3: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.setInterval(arg1);
            return ret;
        }, arguments); },
        __wbg_setInterval_333f91a51023a53e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setInterval_3ad12df02e9424f3: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setInterval_4b6a7300ba94aaf4: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.setInterval(arg1);
            return ret;
        }, arguments); },
        __wbg_setInterval_4ec7f71c34226688: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, ...arg4);
            return ret;
        }, arguments); },
        __wbg_setInterval_519afa13635e1676: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setInterval_595d96dd08f65f6a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setInterval_5a0c9c7742161d5d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setInterval_5a85ec633690b639: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setInterval_5fcaec994c412d7f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setInterval(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setInterval_610561f8bf55b3a5: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setInterval_754c5256bc065419: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        }, arguments); },
        __wbg_setInterval_782da84e9d479527: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
            return ret;
        }, arguments); },
        __wbg_setInterval_8865a40d371d04e5: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setInterval_93ec7461c3650c76: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setInterval(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setInterval_96031013bb98b157: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setInterval_9c507fbae0d4e811: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setInterval_a1cc6d67c6f49fd8: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_setInterval_a594427a257ba8aa: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_setInterval_b04862b7383814aa: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_setInterval_b3f3e02bc6ef56e7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, ...arg4);
            return ret;
        }, arguments); },
        __wbg_setInterval_b80ad943de2be723: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setInterval_bfcdf355cf289128: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setInterval_dc0659130571fae5: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_setInterval_dd31129843736595: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setInterval_e21f4f3e7f2b6a22: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setInterval_e91209a5501f94e1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setInterval(arg1, arg2, ...arg3);
            return ret;
        }, arguments); },
        __wbg_setInterval_f92f769a0c1db8e0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setInterval_fab03c612cbdb752: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setInterval(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setInterval_fe32eb19f82f1b6f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setInterval(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setMilliseconds_73c7c0a546e44cea: function(arg0, arg1) {
            const ret = arg0.setMilliseconds(arg1 >>> 0);
            return ret;
        },
        __wbg_setMinutes_5f7c99ea59efd849: function(arg0, arg1) {
            const ret = arg0.setMinutes(arg1 >>> 0);
            return ret;
        },
        __wbg_setMonth_09513d15a9ef5d5d: function(arg0, arg1) {
            const ret = arg0.setMonth(arg1 >>> 0);
            return ret;
        },
        __wbg_setPipeline_356b2e80b58231d3: function(arg0, arg1) {
            arg0.setPipeline(arg1);
        },
        __wbg_setPipeline_b0ecc74bdf8be629: function(arg0, arg1) {
            arg0.setPipeline(arg1);
        },
        __wbg_setPipeline_c6aca1c13ec27120: function(arg0, arg1) {
            arg0.setPipeline(arg1);
        },
        __wbg_setPointerCapture_70025ca3fb7f26b9: function() { return handleError(function (arg0, arg1) {
            arg0.setPointerCapture(arg1);
        }, arguments); },
        __wbg_setProperty_36009fcc3caef457: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        }, arguments); },
        __wbg_setProperty_e4e51b1b1d681d15: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setScissorRect_a1545e0e0ae58d7e: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setScissorRect(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_setSeconds_de956766265a9bd4: function(arg0, arg1) {
            const ret = arg0.setSeconds(arg1 >>> 0);
            return ret;
        },
        __wbg_setStencilReference_5b90bcde6c0b831e: function(arg0, arg1) {
            arg0.setStencilReference(arg1 >>> 0);
        },
        __wbg_setTime_93841269a53817b6: function(arg0, arg1) {
            const ret = arg0.setTime(arg1);
            return ret;
        },
        __wbg_setTimeout_0b138639aafc2843: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        }, arguments); },
        __wbg_setTimeout_0bbbc995c5406ef3: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setTimeout_192e641c7889cbcd: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, ...arg4);
            return ret;
        }, arguments); },
        __wbg_setTimeout_1cff2249bc08b916: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setTimeout_2147ff60377c0829: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        }, arguments); },
        __wbg_setTimeout_22608c3b77fed952: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setTimeout_30578ebeacc176c0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setTimeout_334d101bf2b4e56c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setTimeout_3991aa0753ff9da3: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.setTimeout(arg1);
            return ret;
        }, arguments); },
        __wbg_setTimeout_3bf177d202dacc41: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setTimeout(arg1, arg2, ...arg3);
            return ret;
        }, arguments); },
        __wbg_setTimeout_43f107bbdfff555b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_setTimeout_4e4095e346163d94: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setTimeout_570268a01ecd7b80: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setTimeout_5ccd86968701f1ec: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.setTimeout(arg1);
            return ret;
        }, arguments); },
        __wbg_setTimeout_6113598f895077e2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setTimeout_6928223bf8fbd91a: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setTimeout_725a27c387d005c7: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setTimeout(arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_setTimeout_72af2e0317228f32: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setTimeout_771cd9f9da86f710: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setTimeout_78cadddc33ec31e7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setTimeout_870e4a92450a08b0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        }, arguments); },
        __wbg_setTimeout_87496ba2d38c05c7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setTimeout_886362bef934f45c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setTimeout_8e7f70e6761cff8a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, ...arg4);
            return ret;
        }, arguments); },
        __wbg_setTimeout_925c4cc554e54092: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        }, arguments); },
        __wbg_setTimeout_9d8c97ef190e69ac: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
            return ret;
        }, arguments); },
        __wbg_setTimeout_9dbfe130e858adbd: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setTimeout_a142e54a04a3a7f8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setTimeout_aca57fbc0b347f38: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_setTimeout_b4a56a43fe2853c7: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setTimeout(arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_setTimeout_c29059b8bec05b00: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setTimeout_cbd0afc3317324af: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.setTimeout(arg1, arg2, ...arg3);
            return ret;
        }, arguments); },
        __wbg_setTimeout_cfa2cf195c3738db: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setTimeout_d3a4046017c2ae15: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setTimeout_d783244fc67319fc: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setTimeout_da256934aaf4b763: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        }, arguments); },
        __wbg_setTimeout_ea8aafc976241688: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        }, arguments); },
        __wbg_setTimeout_eda9bf08abef124e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            const ret = arg0.setTimeout(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
            return ret;
        }, arguments); },
        __wbg_setTimeout_fc83a6049845b53c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4, arg5);
            return ret;
        }, arguments); },
        __wbg_setTimeout_fd1a67d7ab94813d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.setTimeout(arg1, arg2, arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_setUTCDate_30a28478c0f283cb: function(arg0, arg1) {
            const ret = arg0.setUTCDate(arg1 >>> 0);
            return ret;
        },
        __wbg_setUTCFullYear_0cf2d09ec9e331ed: function(arg0, arg1, arg2) {
            const ret = arg0.setUTCFullYear(arg1 >>> 0, arg2);
            return ret;
        },
        __wbg_setUTCFullYear_58af70a74ac8c8fc: function(arg0, arg1) {
            const ret = arg0.setUTCFullYear(arg1 >>> 0);
            return ret;
        },
        __wbg_setUTCFullYear_9d2ed4e341ad6b1c: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.setUTCFullYear(arg1 >>> 0, arg2, arg3);
            return ret;
        },
        __wbg_setUTCHours_9fb6c8d1ec8dd8b4: function(arg0, arg1) {
            const ret = arg0.setUTCHours(arg1 >>> 0);
            return ret;
        },
        __wbg_setUTCMilliseconds_b958bd58ce5c2ba0: function(arg0, arg1) {
            const ret = arg0.setUTCMilliseconds(arg1 >>> 0);
            return ret;
        },
        __wbg_setUTCMinutes_2021f22876e87621: function(arg0, arg1) {
            const ret = arg0.setUTCMinutes(arg1 >>> 0);
            return ret;
        },
        __wbg_setUTCMonth_0187d8d6acbef4fb: function(arg0, arg1) {
            const ret = arg0.setUTCMonth(arg1 >>> 0);
            return ret;
        },
        __wbg_setUTCSeconds_6309ef140300c51e: function(arg0, arg1) {
            const ret = arg0.setUTCSeconds(arg1 >>> 0);
            return ret;
        },
        __wbg_setUint16_481412e21a344bc9: function(arg0, arg1, arg2, arg3) {
            arg0.setUint16(arg1 >>> 0, arg2, arg3 !== 0);
        },
        __wbg_setUint16_486590b05e9091a8: function(arg0, arg1, arg2) {
            arg0.setUint16(arg1 >>> 0, arg2);
        },
        __wbg_setUint32_1a26b3818324ed47: function(arg0, arg1, arg2) {
            arg0.setUint32(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_setUint32_40e0af756e3fc73d: function(arg0, arg1, arg2, arg3) {
            arg0.setUint32(arg1 >>> 0, arg2 >>> 0, arg3 !== 0);
        },
        __wbg_setUint8_05dd7fa0e072bdad: function(arg0, arg1, arg2) {
            arg0.setUint8(arg1 >>> 0, arg2);
        },
        __wbg_setVertexBuffer_0055c83272abc260: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
        },
        __wbg_setVertexBuffer_1d85cc2da6e137a7: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
        },
        __wbg_setVertexBuffer_2c0e45d85e50040c: function(arg0, arg1, arg2, arg3) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_setVertexBuffer_612cdf34a6933a64: function(arg0, arg1, arg2) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2);
        },
        __wbg_setVertexBuffer_6634c8110a405ae1: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_setVertexBuffer_7f434cea2ca9b640: function(arg0, arg1, arg2, arg3) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
        },
        __wbg_setVertexBuffer_8e7e59b788f37ebd: function(arg0, arg1, arg2, arg3) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
        },
        __wbg_setVertexBuffer_a72df36cb1118cb0: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4 >>> 0);
        },
        __wbg_setVertexBuffer_a7b344d3a29d7bce: function(arg0, arg1, arg2, arg3) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_setVertexBuffer_bb0725fecf30a4df: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4 >>> 0);
        },
        __wbg_setVertexBuffer_bfa079b1b4589061: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_setVertexBuffer_c3313134f5118dcf: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_setVertexBuffer_c7c5dac2a7365c2c: function(arg0, arg1, arg2) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2);
        },
        __wbg_setVertexBuffer_e65ae329ae0d7614: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_setViewport_1963e6530328b01d: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.setViewport(arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_setVisible_6926b8cc4c61c77a: function(arg0, arg1) {
            arg0.setVisible(arg1 !== 0);
        },
        __wbg_set_0b32ec5a0ca34925: function(arg0, arg1, arg2) {
            arg0.set(getArrayI64FromWasm0(arg1, arg2));
        },
        __wbg_set_1990dceccbbd7911: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_1e016b6a1b5f7cb3: function(arg0, arg1, arg2) {
            arg0.set(getArrayF32FromWasm0(arg1, arg2));
        },
        __wbg_set_22ee280cf92df7f7: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_29967298e530d279: function(arg0, arg1, arg2) {
            arg0.set(getArrayF64FromWasm0(arg1, arg2));
        },
        __wbg_set_2d96cc48777b46c9: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_371a5b880c126dbb: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_4ae675561b6ab758: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_4d7dd76f3dae2926: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_5bfe75b30eda5db1: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_5d8eaa6b2caf4444: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.set(arg1 >>> 0, arg2);
        }, arguments); },
        __wbg_set_61e45ae8061eca11: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_7b20099b09210298: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_7e35fb42620cf848: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_8535240470bf2500: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_8a1a1d40c64b3c8b: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_90edd65523dc1deb: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_993dde1c3d38e066: function(arg0, arg1, arg2) {
            arg0.set(getArrayU64FromWasm0(arg1, arg2));
        },
        __wbg_set_9955b5dcfc28b490: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_9db4d9cb9ae6d7ff: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1 >>> 0, arg2);
            return ret;
        }, arguments); },
        __wbg_set_a8a45ee2afb5910b: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = Reflect.set(arg0, arg1, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_set_a_66601ffa2f4cbde8: function(arg0, arg1) {
            arg0.a = arg1;
        },
        __wbg_set_accessKey_2545ee29f7717bbe: function(arg0, arg1, arg2) {
            arg0.accessKey = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_access_08d6bdbda9aaa266: function(arg0, arg1) {
            arg0.access = __wbindgen_enum_GpuStorageTextureAccess[arg1];
        },
        __wbg_set_address_mode_u_f80c73fc36e83289: function(arg0, arg1) {
            arg0.addressModeU = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_address_mode_v_3dee7a0095c326a6: function(arg0, arg1) {
            arg0.addressModeV = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_address_mode_w_e2be52f6efa2d9c7: function(arg0, arg1) {
            arg0.addressModeW = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_adoptedStyleSheets_aa97fb3ab2711420: function(arg0, arg1) {
            arg0.adoptedStyleSheets = arg1;
        },
        __wbg_set_align_6d815fde70b812db: function(arg0, arg1, arg2) {
            arg0.align = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_alpha_bb6680aaf01cdc62: function(arg0, arg1) {
            arg0.alpha = arg1;
        },
        __wbg_set_alpha_mode_84140629c3b15c51: function(arg0, arg1) {
            arg0.alphaMode = __wbindgen_enum_GpuCanvasAlphaMode[arg1];
        },
        __wbg_set_alpha_to_coverage_enabled_cac9212446be9cab: function(arg0, arg1) {
            arg0.alphaToCoverageEnabled = arg1 !== 0;
        },
        __wbg_set_alt_c0502b221e4a0220: function(arg0, arg1, arg2) {
            arg0.alt = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_array_layer_count_01e36293bee85e02: function(arg0, arg1) {
            arg0.arrayLayerCount = arg1 >>> 0;
        },
        __wbg_set_array_stride_34f4a147a16bff79: function(arg0, arg1) {
            arg0.arrayStride = arg1;
        },
        __wbg_set_aspect_0675b2844dd12eb1: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_aspect_7829cca737701915: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_aspect_e09cb246c2df6f46: function(arg0, arg1) {
            arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_attributes_7ee8e82215809bfa: function(arg0, arg1) {
            arg0.attributes = arg1;
        },
        __wbg_set_autofocus_3a7911b9b89836d3: function() { return handleError(function (arg0, arg1) {
            arg0.autofocus = arg1 !== 0;
        }, arguments); },
        __wbg_set_autoplay_485f30990e37aef0: function(arg0, arg1) {
            arg0.autoplay = arg1 !== 0;
        },
        __wbg_set_b5e6b338281ca6ff: function(arg0, arg1, arg2) {
            arg0.set(getArrayU32FromWasm0(arg1, arg2));
        },
        __wbg_set_b8f3165fda9b2d9d: function(arg0, arg1, arg2) {
            arg0.set(getArrayI8FromWasm0(arg1, arg2));
        },
        __wbg_set_b_103abfb3e69345a3: function(arg0, arg1) {
            arg0.b = arg1;
        },
        __wbg_set_base_array_layer_ff3450be9aa7d232: function(arg0, arg1) {
            arg0.baseArrayLayer = arg1 >>> 0;
        },
        __wbg_set_base_mip_level_43e77e5d237ede24: function(arg0, arg1) {
            arg0.baseMipLevel = arg1 >>> 0;
        },
        __wbg_set_be03c665e080a42a: function(arg0, arg1, arg2) {
            arg0.set(getArrayI16FromWasm0(arg1, arg2));
        },
        __wbg_set_beginning_of_pass_write_index_abea1e4e6c6095e1: function(arg0, arg1) {
            arg0.beginningOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_beginning_of_pass_write_index_ebe753eeeade6f6c: function(arg0, arg1) {
            arg0.beginningOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_bind_group_layouts_078241cf2822c39e: function(arg0, arg1) {
            arg0.bindGroupLayouts = arg1;
        },
        __wbg_set_binding_d683cd9c1d4bcfed: function(arg0, arg1) {
            arg0.binding = arg1 >>> 0;
        },
        __wbg_set_binding_e9ba14423117de0a: function(arg0, arg1) {
            arg0.binding = arg1 >>> 0;
        },
        __wbg_set_blend_9eab91d6edf500f9: function(arg0, arg1) {
            arg0.blend = arg1;
        },
        __wbg_set_body_25d297731d0c1f4d: function(arg0, arg1) {
            arg0.body = arg1;
        },
        __wbg_set_border_6777033653c77163: function(arg0, arg1, arg2) {
            arg0.border = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_box_223b9bc0b7f548f6: function(arg0, arg1) {
            arg0.box = __wbindgen_enum_ResizeObserverBoxOptions[arg1];
        },
        __wbg_set_bubbles_d43abf9fa4cd710d: function(arg0, arg1) {
            arg0.bubbles = arg1 !== 0;
        },
        __wbg_set_buffer_598ab98a251b8f91: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffer_73d9f6fea9c41867: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffer_88dfc353992be57b: function(arg0, arg1) {
            arg0.buffer = arg1;
        },
        __wbg_set_buffers_93f3f75d7338864f: function(arg0, arg1) {
            arg0.buffers = arg1;
        },
        __wbg_set_bytes_per_row_0bdd54b7fc03c765: function(arg0, arg1) {
            arg0.bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_bytes_per_row_4d62ead4cbf1cd75: function(arg0, arg1) {
            arg0.bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_calendar_6d32dc9f0bcfb02d: function(arg0, arg1, arg2) {
            arg0.calendar = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_cancelBubble_3213d841eb5f203d: function(arg0, arg1) {
            arg0.cancelBubble = arg1 !== 0;
        },
        __wbg_set_cancelable_52a71f155ec44a76: function(arg0, arg1) {
            arg0.cancelable = arg1 !== 0;
        },
        __wbg_set_case_first_f41983121ce428ce: function(arg0, arg1) {
            arg0.caseFirst = __wbindgen_enum_CollatorCaseFirst[arg1];
        },
        __wbg_set_cause_3711c45040adc37c: function(arg0, arg1) {
            arg0.cause = arg1;
        },
        __wbg_set_cause_c6cd8186d15ff2aa: function(arg0, arg1) {
            arg0.cause = arg1;
        },
        __wbg_set_className_e0b1e805ac9ecbf4: function(arg0, arg1, arg2) {
            arg0.className = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_clear_value_c1a82bbe9a80b6ab: function(arg0, arg1) {
            arg0.clearValue = arg1;
        },
        __wbg_set_code_6a0d763da082dcfb: function(arg0, arg1, arg2) {
            arg0.code = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_color_495aa415ae5a39c9: function(arg0, arg1) {
            arg0.color = arg1;
        },
        __wbg_set_color_attachments_6705c6b1e98a3040: function(arg0, arg1) {
            arg0.colorAttachments = arg1;
        },
        __wbg_set_color_formats_72fbd83091e697db: function(arg0, arg1) {
            arg0.colorFormats = arg1;
        },
        __wbg_set_compact_display_ea695d3e79256e6b: function(arg0, arg1) {
            arg0.compactDisplay = __wbindgen_enum_CompactDisplay[arg1];
        },
        __wbg_set_compare_8aedfdbdc96ff4d7: function(arg0, arg1) {
            arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_compare_a9a06469832600ec: function(arg0, arg1) {
            arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_compilation_hints_06fe65edf598f9b2: function(arg0, arg1) {
            arg0.compilationHints = arg1;
        },
        __wbg_set_composed_f3c2e7c6eb5d3ce2: function(arg0, arg1) {
            arg0.composed = arg1 !== 0;
        },
        __wbg_set_compute_5dd7704ee8a825c6: function(arg0, arg1) {
            arg0.compute = arg1;
        },
        __wbg_set_constants_478cdc6a9e34ce9d: function(arg0, arg1) {
            arg0.constants = arg1;
        },
        __wbg_set_constants_c904775d54cbc4bc: function(arg0, arg1) {
            arg0.constants = arg1;
        },
        __wbg_set_constants_e9f849e0babdcb2b: function(arg0, arg1) {
            arg0.constants = arg1;
        },
        __wbg_set_contentEditable_ce8f1fdae2210863: function(arg0, arg1, arg2) {
            arg0.contentEditable = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_controls_bfc4349cf243ddb4: function(arg0, arg1) {
            arg0.controls = arg1 !== 0;
        },
        __wbg_set_count_34ecf81b3ad7e448: function(arg0, arg1) {
            arg0.count = arg1 >>> 0;
        },
        __wbg_set_count_3dcf998ad3abd5e3: function(arg0, arg1) {
            arg0.count = arg1 >>> 0;
        },
        __wbg_set_crossOrigin_2930002d7f65ba04: function(arg0, arg1, arg2) {
            arg0.crossOrigin = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_crossOrigin_a5dd250a12f7ce14: function(arg0, arg1, arg2) {
            arg0.crossOrigin = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_cssText_1d203a1b8ff80e20: function(arg0, arg1, arg2) {
            arg0.cssText = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_cull_mode_8e533f32672a379b: function(arg0, arg1) {
            arg0.cullMode = __wbindgen_enum_GpuCullMode[arg1];
        },
        __wbg_set_currency_7adb5c55ec4f80a8: function(arg0, arg1, arg2) {
            arg0.currency = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_currency_display_bdeb5f367582c472: function(arg0, arg1) {
            arg0.currencyDisplay = __wbindgen_enum_CurrencyDisplay[arg1];
        },
        __wbg_set_currency_sign_114db06612bee8d6: function(arg0, arg1) {
            arg0.currencySign = __wbindgen_enum_CurrencySign[arg1];
        },
        __wbg_set_currentTime_dfb207a006f1af24: function(arg0, arg1) {
            arg0.currentTime = arg1;
        },
        __wbg_set_cursor_8d686ff9dd99a325: function(arg0, arg1, arg2) {
            arg0.cursor = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_d07b6d94c9c97f43: function(arg0, arg1, arg2) {
            arg0.set(getArrayI32FromWasm0(arg1, arg2));
        },
        __wbg_set_d51a6064220eb366: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_date_style_c035395afcdbf11b: function(arg0, arg1) {
            arg0.dateStyle = __wbindgen_enum_DateTimeStyle[arg1];
        },
        __wbg_set_day_961bd4de99e2ee20: function(arg0, arg1) {
            arg0.day = __wbindgen_enum_DayFormat[arg1];
        },
        __wbg_set_day_period_b756b896d7c20efd: function(arg0, arg1) {
            arg0.dayPeriod = __wbindgen_enum_DayPeriodFormat[arg1];
        },
        __wbg_set_days_4a9cb38487f76224: function(arg0, arg1) {
            arg0.days = arg1;
        },
        __wbg_set_days_d2c69d6cdf08d028: function(arg0, arg1) {
            arg0.days = __wbindgen_enum_DurationUnitStyle[arg1];
        },
        __wbg_set_days_display_ac33b2e7933d34a7: function(arg0, arg1) {
            arg0.daysDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_decoding_af1e676e69475af3: function(arg0, arg1, arg2) {
            arg0.decoding = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_defaultMuted_06989c875187f50f: function(arg0, arg1) {
            arg0.defaultMuted = arg1 !== 0;
        },
        __wbg_set_defaultPlaybackRate_588d2e6a4122504c: function(arg0, arg1) {
            arg0.defaultPlaybackRate = arg1;
        },
        __wbg_set_default_queue_923be90fc34ed2e5: function(arg0, arg1) {
            arg0.defaultQueue = arg1;
        },
        __wbg_set_depth_bias_07f95aa380a3e46e: function(arg0, arg1) {
            arg0.depthBias = arg1;
        },
        __wbg_set_depth_bias_clamp_968b03f74984c77b: function(arg0, arg1) {
            arg0.depthBiasClamp = arg1;
        },
        __wbg_set_depth_bias_slope_scale_478b204b4910400f: function(arg0, arg1) {
            arg0.depthBiasSlopeScale = arg1;
        },
        __wbg_set_depth_clear_value_25268aa6b7cae2e0: function(arg0, arg1) {
            arg0.depthClearValue = arg1;
        },
        __wbg_set_depth_compare_c017fcac5327dfbb: function(arg0, arg1) {
            arg0.depthCompare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_depth_fail_op_8484012cd5e4987c: function(arg0, arg1) {
            arg0.depthFailOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_depth_load_op_ed90e4eaf314a16c: function(arg0, arg1) {
            arg0.depthLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_depth_or_array_layers_f8981011496f12e7: function(arg0, arg1) {
            arg0.depthOrArrayLayers = arg1 >>> 0;
        },
        __wbg_set_depth_read_only_90cca09674f446be: function(arg0, arg1) {
            arg0.depthReadOnly = arg1 !== 0;
        },
        __wbg_set_depth_read_only_f05ffa956d3a2d9d: function(arg0, arg1) {
            arg0.depthReadOnly = arg1 !== 0;
        },
        __wbg_set_depth_slice_16eead12ee29fce9: function(arg0, arg1) {
            arg0.depthSlice = arg1 >>> 0;
        },
        __wbg_set_depth_stencil_attachment_be8301fa499cd3db: function(arg0, arg1) {
            arg0.depthStencilAttachment = arg1;
        },
        __wbg_set_depth_stencil_d536398c1b29bb38: function(arg0, arg1) {
            arg0.depthStencil = arg1;
        },
        __wbg_set_depth_stencil_format_221f2f71ba894a55: function(arg0, arg1) {
            arg0.depthStencilFormat = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_depth_store_op_8e9b1d0e47077643: function(arg0, arg1) {
            arg0.depthStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_depth_write_enabled_adc2094871d66639: function(arg0, arg1) {
            arg0.depthWriteEnabled = arg1 !== 0;
        },
        __wbg_set_device_47147a331245777f: function(arg0, arg1) {
            arg0.device = arg1;
        },
        __wbg_set_dimension_b4da3979dc699ef8: function(arg0, arg1) {
            arg0.dimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_dimension_d4f0c50e75083b7f: function(arg0, arg1) {
            arg0.dimension = __wbindgen_enum_GpuTextureDimension[arg1];
        },
        __wbg_set_dir_4beaa27a57bcb32b: function(arg0, arg1, arg2) {
            arg0.dir = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_dir_b4fa7a9a40d9f72c: function(arg0, arg1, arg2) {
            arg0.dir = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_draggable_40cdf18c339c4e33: function(arg0, arg1) {
            arg0.draggable = arg1 !== 0;
        },
        __wbg_set_dst_factor_e44fc612d5e5bff4: function(arg0, arg1) {
            arg0.dstFactor = __wbindgen_enum_GpuBlendFactor[arg1];
        },
        __wbg_set_duration_bfef0b021dc8fd5b: function(arg0, arg1) {
            arg0.duration = arg1;
        },
        __wbg_set_eeaf6f49bd2bf077: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.set(arg1 >>> 0, arg2);
        }, arguments); },
        __wbg_set_ef8eed7210fe699a: function(arg0, arg1, arg2) {
            arg0.set(arg1, arg2 >>> 0);
        },
        __wbg_set_end_of_pass_write_index_1cd39b9bafe090cc: function(arg0, arg1) {
            arg0.endOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_end_of_pass_write_index_49de5f6017fb9a1f: function(arg0, arg1) {
            arg0.endOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_entries_070b048e4bea0c29: function(arg0, arg1) {
            arg0.entries = arg1;
        },
        __wbg_set_entries_f9b7f3d4e9faccf4: function(arg0, arg1) {
            arg0.entries = arg1;
        },
        __wbg_set_entry_point_0116a9f5d58cf0aa: function(arg0, arg1, arg2) {
            arg0.entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_52a2481a52f9799d: function(arg0, arg1, arg2) {
            arg0.entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_f04e91eced449196: function(arg0, arg1, arg2) {
            arg0.entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_era_ef23f9f4112b2025: function(arg0, arg1) {
            arg0.era = __wbindgen_enum_EraFormat[arg1];
        },
        __wbg_set_error_a2bca8b9b07014e3: function(arg0, arg1) {
            arg0.error = arg1;
        },
        __wbg_set_external_texture_cf122b1392d58f37: function(arg0, arg1) {
            arg0.externalTexture = arg1;
        },
        __wbg_set_fail_op_e7eb17ed0228b457: function(arg0, arg1) {
            arg0.failOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_fallback_f38a32d7c014a097: function(arg0, arg1) {
            arg0.fallback = __wbindgen_enum_DisplayNamesFallback[arg1];
        },
        __wbg_set_fc6febdf1ddac5c2: function(arg0, arg1, arg2) {
            arg0.set(getArrayU16FromWasm0(arg1, arg2));
        },
        __wbg_set_feature_level_a30238438f5bfa5b: function(arg0, arg1, arg2) {
            arg0.featureLevel = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_flip_y_c75446cb371a71ee: function(arg0, arg1) {
            arg0.flipY = arg1 !== 0;
        },
        __wbg_set_force_fallback_adapter_7cab23811b67cb03: function(arg0, arg1) {
            arg0.forceFallbackAdapter = arg1 !== 0;
        },
        __wbg_set_format_119bda0a3d0b3f47: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_27c63de9b0ec1cb3: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_75eb905a003c2f61: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_8b8359f261ea64b9: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuVertexFormat[arg1];
        },
        __wbg_set_format_a5d373801c562623: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_b08d87d5f33bcd89: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_c1a342a37ced3e12: function(arg0, arg1) {
            arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_fractional_digits_b72c1faabc28df71: function(arg0, arg1) {
            arg0.fractionalDigits = arg1;
        },
        __wbg_set_fractional_second_digits_d25f5d7ce27ae897: function(arg0, arg1) {
            arg0.fractionalSecondDigits = arg1;
        },
        __wbg_set_fragment_41044c9110c69c90: function(arg0, arg1) {
            arg0.fragment = arg1;
        },
        __wbg_set_front_face_9c9f0518a3109d98: function(arg0, arg1) {
            arg0.frontFace = __wbindgen_enum_GpuFrontFace[arg1];
        },
        __wbg_set_g_a39877021b450e75: function(arg0, arg1) {
            arg0.g = arg1;
        },
        __wbg_set_granularity_bba1a8947b763604: function(arg0, arg1) {
            arg0.granularity = __wbindgen_enum_SegmenterGranularity[arg1];
        },
        __wbg_set_has_dynamic_offset_69725fed837748fe: function(arg0, arg1) {
            arg0.hasDynamicOffset = arg1 !== 0;
        },
        __wbg_set_hash_f9a4d2ea689b5e81: function(arg0, arg1, arg2) {
            arg0.hash = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_height_1c439cb93700aef5: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_7d9d8f892e6964c6: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_975770494a218d52: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_bbeef8f354041577: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_e7801ee14ceb18ce: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_height_ffcd3b25b0f9abc6: function(arg0, arg1) {
            arg0.height = arg1;
        },
        __wbg_set_hidden_d9bb2c884339b41b: function(arg0, arg1) {
            arg0.hidden = arg1 !== 0;
        },
        __wbg_set_host_c124cba7e09c98ea: function(arg0, arg1, arg2) {
            arg0.host = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_hostname_9fbb705b2cbcc041: function(arg0, arg1, arg2) {
            arg0.hostname = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_hour12_4b6dabcb5ed4c5c1: function(arg0, arg1) {
            arg0.hour12 = arg1 !== 0;
        },
        __wbg_set_hour_7133107c2d8a897e: function(arg0, arg1) {
            arg0.hour = __wbindgen_enum_NumericFormat[arg1];
        },
        __wbg_set_hour_cycle_b6ce1a4cc65f7841: function(arg0, arg1) {
            arg0.hourCycle = __wbindgen_enum_HourCycle[arg1];
        },
        __wbg_set_hours_075ddddd5b3f1f76: function(arg0, arg1) {
            arg0.hours = __wbindgen_enum_DurationTimeUnitStyle[arg1];
        },
        __wbg_set_hours_42d326693a3ffcce: function(arg0, arg1) {
            arg0.hours = arg1;
        },
        __wbg_set_hours_display_51ee8ccdca4f2157: function(arg0, arg1) {
            arg0.hoursDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_href_e59dc07ca03ca8f3: function(arg0, arg1, arg2) {
            arg0.href = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_hspace_8c29d2197528a2d2: function(arg0, arg1) {
            arg0.hspace = arg1 >>> 0;
        },
        __wbg_set_id_4beae8b813c092d8: function(arg0, arg1, arg2) {
            arg0.id = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_ignore_punctuation_5deb2878bdb356ff: function(arg0, arg1) {
            arg0.ignorePunctuation = arg1 !== 0;
        },
        __wbg_set_index_02d2c427713f2946: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_0a2d916cd3658df4: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_14ccbbcec64b9031: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_1edd196294cd6dbf: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2 >>> 0;
        },
        __wbg_set_index_2eba9e8997f36eb4: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_416520499e979c8a: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_4dababc0707aafb7: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_4fce07e3d1d3c065: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_776f24e2677379b9: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_c0ab70cbaf022bbb: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = BigInt.asUintN(64, arg2);
        },
        __wbg_set_index_f15f4feb1d940b8c: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_index_from_f32_666acfa397b77f8b: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_inert_13645678568e8a3e: function(arg0, arg1) {
            arg0.inert = arg1 !== 0;
        },
        __wbg_set_innerHTML_f78a45a07f97e136: function(arg0, arg1, arg2) {
            arg0.innerHTML = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_innerHeight_064bda9d551110cf: function() { return handleError(function (arg0, arg1) {
            arg0.innerHeight = arg1;
        }, arguments); },
        __wbg_set_innerText_847403b9d4f38f77: function(arg0, arg1, arg2) {
            arg0.innerText = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_innerWidth_a7eb5ad7fcf32e7e: function() { return handleError(function (arg0, arg1) {
            arg0.innerWidth = arg1;
        }, arguments); },
        __wbg_set_isMap_d84a19e4eb67845c: function(arg0, arg1) {
            arg0.isMap = arg1 !== 0;
        },
        __wbg_set_iterations_b84d4d3302a291a0: function(arg0, arg1) {
            arg0.iterations = arg1;
        },
        __wbg_set_label_03a9b9089ee49709: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_0aea0a08aff524c0: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_120abf364d6cd2c1: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_1654bca9204fc12c: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_26577513096f145b: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_26c985944870d294: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_2816ddca7866dcfa: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_2a41a6f671383447: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_2d17a7c793b89cfc: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_325c5e4b70c1568f: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_37d0faa0c9b7dee4: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_3e306b2e8f9db666: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5514e44725004e89: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_570d3dee0e80279e: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_58fbc9fcc6363f16: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5a4dbb42c3b27bf7: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5c952448f9d59f36: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5fadf65a1f0f4714: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_6a6d0257968d1543: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_6b4d0ec148592f1d: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_6db00a3a215550b0: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_75bcc629a92dc6a7: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_782e33de78d86641: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_79fd7e9e778f3d8c: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_837a3b8ff99c2db3: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_8655e3115970890a: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_8df6673e1e141fcc: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_920fcc9b87d7dfbd: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_92bcbee18138c712: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_9407c1681dcb48cd: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_b4095ecbb3b62bc3: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_b7e3f88b5e8b5142: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_b90cfc4d2c6d5f9d: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_c1d0f6c602be1752: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_c388f9bd7e889d40: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_c7d65ab922a6b558: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_cc0bc7bcef58d5e6: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_ccd63c06b59b0f97: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_cfd9a2347f5e54ad: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_da509bd30b694827: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_e245302cd2b691ef: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_fbf7d5a6a08cd2d4: function(arg0, arg1, arg2) {
            arg0.label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_lang_2c3bedf1dbb383cd: function(arg0, arg1, arg2) {
            arg0.lang = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_language_display_4f72d0d541998416: function(arg0, arg1) {
            arg0.languageDisplay = __wbindgen_enum_DisplayNamesLanguageDisplay[arg1];
        },
        __wbg_set_last_index_28c5375ef3a55617: function(arg0, arg1) {
            arg0.lastIndex = arg1 >>> 0;
        },
        __wbg_set_layout_57b7981a1914a5ec: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_a6ee8e74696bc0c8: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_cd5d951ba305620a: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_layout_d701bf37a1e489c6: function(arg0, arg1) {
            arg0.layout = arg1;
        },
        __wbg_set_load_op_e8ff3e1c81f7398d: function(arg0, arg1) {
            arg0.loadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_locale_matcher_0f3b4201f611804e: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_19891697aac50e0f: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_2c9ad928d19ccbdc: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_34d1a22e54875ccd: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_3bb9a41293f70258: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_62d1b7b95bc3d937: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_7d78228f5380471b: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_b345898909427e07: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_d6dd07b15b036037: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_locale_matcher_f038dbac9953d4a5: function(arg0, arg1) {
            arg0.localeMatcher = __wbindgen_enum_LocaleMatcher[arg1];
        },
        __wbg_set_lod_max_clamp_a9f93b2e2ae9023d: function(arg0, arg1) {
            arg0.lodMaxClamp = arg1;
        },
        __wbg_set_lod_min_clamp_342b47161f1fa002: function(arg0, arg1) {
            arg0.lodMinClamp = arg1;
        },
        __wbg_set_longDesc_774318b7d66e99be: function(arg0, arg1, arg2) {
            arg0.longDesc = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_loop_5b5ce2ca54f25832: function(arg0, arg1) {
            arg0.loop = arg1 !== 0;
        },
        __wbg_set_mag_filter_28e863ff1a386f86: function(arg0, arg1) {
            arg0.magFilter = __wbindgen_enum_GpuFilterMode[arg1];
        },
        __wbg_set_mapped_at_creation_7f0aad21612f3e22: function(arg0, arg1) {
            arg0.mappedAtCreation = arg1 !== 0;
        },
        __wbg_set_mask_a18cbdfc03a4cbd9: function(arg0, arg1) {
            arg0.mask = arg1 >>> 0;
        },
        __wbg_set_maxByteLength_2099b505ad81c062: function(arg0, arg1) {
            arg0.maxByteLength = arg1 >>> 0;
        },
        __wbg_set_max_anisotropy_19e574a7e9cb009a: function(arg0, arg1) {
            arg0.maxAnisotropy = arg1;
        },
        __wbg_set_max_draw_count_77cb4842d9367706: function(arg0, arg1) {
            arg0.maxDrawCount = arg1;
        },
        __wbg_set_maximum_fraction_digits_c18fadfe0c9e05cc: function(arg0, arg1) {
            arg0.maximumFractionDigits = arg1;
        },
        __wbg_set_maximum_fraction_digits_e8f824bfc51af3e4: function(arg0, arg1) {
            arg0.maximumFractionDigits = arg1;
        },
        __wbg_set_maximum_significant_digits_303c526b44a61f1a: function(arg0, arg1) {
            arg0.maximumSignificantDigits = arg1;
        },
        __wbg_set_maximum_significant_digits_901e095d10cba2ca: function(arg0, arg1) {
            arg0.maximumSignificantDigits = arg1;
        },
        __wbg_set_message_79e361ac6805ebcc: function(arg0, arg1, arg2) {
            arg0.message = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_microseconds_469780a1a57eaa2a: function(arg0, arg1) {
            arg0.microseconds = arg1;
        },
        __wbg_set_microseconds_c7da1118550e8228: function(arg0, arg1) {
            arg0.microseconds = __wbindgen_enum_DurationUnitStyle[arg1];
        },
        __wbg_set_microseconds_display_ca7b8fa1021bbee7: function(arg0, arg1) {
            arg0.microsecondsDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_milliseconds_0a231eb22a4b7702: function(arg0, arg1) {
            arg0.milliseconds = __wbindgen_enum_DurationUnitStyle[arg1];
        },
        __wbg_set_milliseconds_9ac2b3fbf13dbac9: function(arg0, arg1) {
            arg0.milliseconds = arg1;
        },
        __wbg_set_milliseconds_display_634ec34efc716ba4: function(arg0, arg1) {
            arg0.millisecondsDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_min_binding_size_d70e460d165d9144: function(arg0, arg1) {
            arg0.minBindingSize = arg1;
        },
        __wbg_set_min_filter_5275c8a3815f9f0c: function(arg0, arg1) {
            arg0.minFilter = __wbindgen_enum_GpuFilterMode[arg1];
        },
        __wbg_set_minimum_fraction_digits_a5ed0f7c46552e0e: function(arg0, arg1) {
            arg0.minimumFractionDigits = arg1;
        },
        __wbg_set_minimum_fraction_digits_d669013d51723bb8: function(arg0, arg1) {
            arg0.minimumFractionDigits = arg1;
        },
        __wbg_set_minimum_integer_digits_7445ce290dc26d43: function(arg0, arg1) {
            arg0.minimumIntegerDigits = arg1;
        },
        __wbg_set_minimum_integer_digits_82846fee1751cf54: function(arg0, arg1) {
            arg0.minimumIntegerDigits = arg1;
        },
        __wbg_set_minimum_significant_digits_1bb45f7372ec627b: function(arg0, arg1) {
            arg0.minimumSignificantDigits = arg1;
        },
        __wbg_set_minimum_significant_digits_f5bc7f5aabf45a05: function(arg0, arg1) {
            arg0.minimumSignificantDigits = arg1;
        },
        __wbg_set_minute_b1b26daae6bba4ae: function(arg0, arg1) {
            arg0.minute = __wbindgen_enum_NumericFormat[arg1];
        },
        __wbg_set_minutes_1840b8f5151a6155: function(arg0, arg1) {
            arg0.minutes = __wbindgen_enum_DurationTimeUnitStyle[arg1];
        },
        __wbg_set_minutes_b7bd314dfb4be7fe: function(arg0, arg1) {
            arg0.minutes = arg1;
        },
        __wbg_set_minutes_display_376abda9c0e8e0f5: function(arg0, arg1) {
            arg0.minutesDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_mip_level_09f903ba22486513: function(arg0, arg1) {
            arg0.mipLevel = arg1 >>> 0;
        },
        __wbg_set_mip_level_8d4dfc5d506cb37f: function(arg0, arg1) {
            arg0.mipLevel = arg1 >>> 0;
        },
        __wbg_set_mip_level_count_04af0d33c4905fac: function(arg0, arg1) {
            arg0.mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mip_level_count_dcb2ad32716506a5: function(arg0, arg1) {
            arg0.mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mipmap_filter_ae5e0e814693019b: function(arg0, arg1) {
            arg0.mipmapFilter = __wbindgen_enum_GpuMipmapFilterMode[arg1];
        },
        __wbg_set_mode_1ca038d10a999823: function(arg0, arg1) {
            arg0.mode = __wbindgen_enum_GpuCanvasToneMappingMode[arg1];
        },
        __wbg_set_module_0933874708065f3b: function(arg0, arg1) {
            arg0.module = arg1;
        },
        __wbg_set_module_22d452288cef846d: function(arg0, arg1) {
            arg0.module = arg1;
        },
        __wbg_set_module_a7a131494850e5f7: function(arg0, arg1) {
            arg0.module = arg1;
        },
        __wbg_set_month_90d074def6776f4b: function(arg0, arg1) {
            arg0.month = __wbindgen_enum_MonthFormat[arg1];
        },
        __wbg_set_months_bd1a7e357dabcf75: function(arg0, arg1) {
            arg0.months = arg1;
        },
        __wbg_set_months_display_aa79a5e80fc529ef: function(arg0, arg1) {
            arg0.monthsDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_months_eb572719b0d7e953: function(arg0, arg1) {
            arg0.months = __wbindgen_enum_DurationUnitStyle[arg1];
        },
        __wbg_set_multisample_e857cbfca335c7f1: function(arg0, arg1) {
            arg0.multisample = arg1;
        },
        __wbg_set_multisampled_4ce4c32144215354: function(arg0, arg1) {
            arg0.multisampled = arg1 !== 0;
        },
        __wbg_set_muted_d064b10668f36535: function(arg0, arg1) {
            arg0.muted = arg1 !== 0;
        },
        __wbg_set_name_3bbc583faefa4193: function(arg0, arg1, arg2) {
            arg0.name = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_name_493793812330b009: function(arg0, arg1, arg2) {
            arg0.name = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_name_8e693d8e188493d0: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.name = getStringFromWasm0(arg1, arg2);
        }, arguments); },
        __wbg_set_nanoseconds_18cbd13425a4a8b7: function(arg0, arg1) {
            arg0.nanoseconds = __wbindgen_enum_DurationUnitStyle[arg1];
        },
        __wbg_set_nanoseconds_b9c07ca812bc4569: function(arg0, arg1) {
            arg0.nanoseconds = arg1;
        },
        __wbg_set_nanoseconds_display_d4f11b68b3796214: function(arg0, arg1) {
            arg0.nanosecondsDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_nodeValue_62c524895505a99d: function(arg0, arg1, arg2) {
            arg0.nodeValue = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_nonce_2e0d3effb3f43d80: function(arg0, arg1, arg2) {
            arg0.nonce = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_notation_6fe90eaae07cc706: function(arg0, arg1) {
            arg0.notation = __wbindgen_enum_NumberFormatNotation[arg1];
        },
        __wbg_set_numbering_system_c191a37667c00e69: function(arg0, arg1, arg2) {
            arg0.numberingSystem = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_numbering_system_cf8b6500e8fad300: function(arg0, arg1, arg2) {
            arg0.numberingSystem = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_numeric_2d8b2a56a1fb874e: function(arg0, arg1) {
            arg0.numeric = __wbindgen_enum_RelativeTimeFormatNumeric[arg1];
        },
        __wbg_set_numeric_b84c8d75b3cc2c11: function(arg0, arg1) {
            arg0.numeric = arg1 !== 0;
        },
        __wbg_set_occlusion_query_set_d1d7b86f9c933a23: function(arg0, arg1) {
            arg0.occlusionQuerySet = arg1;
        },
        __wbg_set_offset_0e56098d94f81ccd: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_baf6780761c43b24: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_e316586bb85f0bd6: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_offset_eabaf12fe1c98ce7: function(arg0, arg1) {
            arg0.offset = arg1;
        },
        __wbg_set_onabort_3f2ba9eb7dc162bb: function(arg0, arg1) {
            arg0.onabort = arg1;
        },
        __wbg_set_onabort_74981c5b0bd19915: function(arg0, arg1) {
            arg0.onabort = arg1;
        },
        __wbg_set_onabort_85a78484014a9f97: function(arg0, arg1) {
            arg0.onabort = arg1;
        },
        __wbg_set_onabort_aa18cae1ee4b0f7e: function(arg0, arg1) {
            arg0.onabort = arg1;
        },
        __wbg_set_onafterprint_d6a6b2ddca06b8d9: function(arg0, arg1) {
            arg0.onafterprint = arg1;
        },
        __wbg_set_onafterscriptexecute_f668ea8741ad5e2e: function(arg0, arg1) {
            arg0.onafterscriptexecute = arg1;
        },
        __wbg_set_onanimationcancel_13cf2eda19a07827: function(arg0, arg1) {
            arg0.onanimationcancel = arg1;
        },
        __wbg_set_onanimationcancel_54a452f5b7e7ed70: function(arg0, arg1) {
            arg0.onanimationcancel = arg1;
        },
        __wbg_set_onanimationcancel_c31e49076ea20e68: function(arg0, arg1) {
            arg0.onanimationcancel = arg1;
        },
        __wbg_set_onanimationend_b27dfd9977fb7060: function(arg0, arg1) {
            arg0.onanimationend = arg1;
        },
        __wbg_set_onanimationend_d345059860476358: function(arg0, arg1) {
            arg0.onanimationend = arg1;
        },
        __wbg_set_onanimationend_f4ab0c9ba61bf407: function(arg0, arg1) {
            arg0.onanimationend = arg1;
        },
        __wbg_set_onanimationiteration_1224407be01d2bfb: function(arg0, arg1) {
            arg0.onanimationiteration = arg1;
        },
        __wbg_set_onanimationiteration_8889903cdd1c432a: function(arg0, arg1) {
            arg0.onanimationiteration = arg1;
        },
        __wbg_set_onanimationiteration_be7d163e9e95a43a: function(arg0, arg1) {
            arg0.onanimationiteration = arg1;
        },
        __wbg_set_onanimationstart_3f2eac07e3d4590e: function(arg0, arg1) {
            arg0.onanimationstart = arg1;
        },
        __wbg_set_onanimationstart_5a8ec69b9d58e3ce: function(arg0, arg1) {
            arg0.onanimationstart = arg1;
        },
        __wbg_set_onanimationstart_a8886995159fd378: function(arg0, arg1) {
            arg0.onanimationstart = arg1;
        },
        __wbg_set_onappinstalled_9c95db6d9822ae12: function(arg0, arg1) {
            arg0.onappinstalled = arg1;
        },
        __wbg_set_onauxclick_2f4fa2a24ba1c52d: function(arg0, arg1) {
            arg0.onauxclick = arg1;
        },
        __wbg_set_onauxclick_5bdc3db53ed86210: function(arg0, arg1) {
            arg0.onauxclick = arg1;
        },
        __wbg_set_onauxclick_79ae9c5d1363f603: function(arg0, arg1) {
            arg0.onauxclick = arg1;
        },
        __wbg_set_onbeforeinput_1828c2e90341acd0: function(arg0, arg1) {
            arg0.onbeforeinput = arg1;
        },
        __wbg_set_onbeforeinput_52a1c0e514f7f1c0: function(arg0, arg1) {
            arg0.onbeforeinput = arg1;
        },
        __wbg_set_onbeforeinput_987dd31803e726a4: function(arg0, arg1) {
            arg0.onbeforeinput = arg1;
        },
        __wbg_set_onbeforeprint_c089215e4f49c295: function(arg0, arg1) {
            arg0.onbeforeprint = arg1;
        },
        __wbg_set_onbeforescriptexecute_9271faa02a12cfc7: function(arg0, arg1) {
            arg0.onbeforescriptexecute = arg1;
        },
        __wbg_set_onbeforetoggle_92ce174f009e208d: function(arg0, arg1) {
            arg0.onbeforetoggle = arg1;
        },
        __wbg_set_onbeforetoggle_b07985615c835384: function(arg0, arg1) {
            arg0.onbeforetoggle = arg1;
        },
        __wbg_set_onbeforetoggle_fbccdb675d8e9901: function(arg0, arg1) {
            arg0.onbeforetoggle = arg1;
        },
        __wbg_set_onbeforeunload_a667661666e6f394: function(arg0, arg1) {
            arg0.onbeforeunload = arg1;
        },
        __wbg_set_onblur_0bff321deefa07ed: function(arg0, arg1) {
            arg0.onblur = arg1;
        },
        __wbg_set_onblur_76ae7b96365b859c: function(arg0, arg1) {
            arg0.onblur = arg1;
        },
        __wbg_set_onblur_8ee753dddcd05390: function(arg0, arg1) {
            arg0.onblur = arg1;
        },
        __wbg_set_oncancel_1d5abfc02a52b317: function(arg0, arg1) {
            arg0.oncancel = arg1;
        },
        __wbg_set_oncancel_3ce425a6fc15f325: function(arg0, arg1) {
            arg0.oncancel = arg1;
        },
        __wbg_set_oncancel_44401fe47775e30c: function(arg0, arg1) {
            arg0.oncancel = arg1;
        },
        __wbg_set_oncanplay_5cbe6dfebe7155e7: function(arg0, arg1) {
            arg0.oncanplay = arg1;
        },
        __wbg_set_oncanplay_7e075a71c2ed2dd4: function(arg0, arg1) {
            arg0.oncanplay = arg1;
        },
        __wbg_set_oncanplay_db574be60127079e: function(arg0, arg1) {
            arg0.oncanplay = arg1;
        },
        __wbg_set_oncanplaythrough_394f0184606b0c62: function(arg0, arg1) {
            arg0.oncanplaythrough = arg1;
        },
        __wbg_set_oncanplaythrough_558caefb12da572c: function(arg0, arg1) {
            arg0.oncanplaythrough = arg1;
        },
        __wbg_set_oncanplaythrough_c3cca38fdc5d59db: function(arg0, arg1) {
            arg0.oncanplaythrough = arg1;
        },
        __wbg_set_onchange_3655bc500d137f83: function(arg0, arg1) {
            arg0.onchange = arg1;
        },
        __wbg_set_onchange_556cc4959a2f69ad: function(arg0, arg1) {
            arg0.onchange = arg1;
        },
        __wbg_set_onchange_7a7a9d25fc2eed83: function(arg0, arg1) {
            arg0.onchange = arg1;
        },
        __wbg_set_onchange_a954680f617ba591: function(arg0, arg1) {
            arg0.onchange = arg1;
        },
        __wbg_set_onchange_a9c5b9148d6a2f09: function(arg0, arg1) {
            arg0.onchange = arg1;
        },
        __wbg_set_onchange_cb935c5400b404d7: function(arg0, arg1) {
            arg0.onchange = arg1;
        },
        __wbg_set_onchange_eb65c8f215b8d0ef: function(arg0, arg1) {
            arg0.onchange = arg1;
        },
        __wbg_set_onclick_33fac93e963fdfc9: function(arg0, arg1) {
            arg0.onclick = arg1;
        },
        __wbg_set_onclick_527135192dd54d92: function(arg0, arg1) {
            arg0.onclick = arg1;
        },
        __wbg_set_onclick_946c643d5ed0186e: function(arg0, arg1) {
            arg0.onclick = arg1;
        },
        __wbg_set_onclose_0748068044479d6f: function(arg0, arg1) {
            arg0.onclose = arg1;
        },
        __wbg_set_onclose_1f1bc46d218a14e0: function(arg0, arg1) {
            arg0.onclose = arg1;
        },
        __wbg_set_onclose_826083fccf65d219: function(arg0, arg1) {
            arg0.onclose = arg1;
        },
        __wbg_set_oncontextmenu_bc861c962fa44fca: function(arg0, arg1) {
            arg0.oncontextmenu = arg1;
        },
        __wbg_set_oncontextmenu_bcc0f7ab9b7c9e40: function(arg0, arg1) {
            arg0.oncontextmenu = arg1;
        },
        __wbg_set_oncontextmenu_dde97b23ca6fc818: function(arg0, arg1) {
            arg0.oncontextmenu = arg1;
        },
        __wbg_set_oncopy_29b17c17e55b10fd: function(arg0, arg1) {
            arg0.oncopy = arg1;
        },
        __wbg_set_oncopy_6d0fe00a3dc62f0b: function(arg0, arg1) {
            arg0.oncopy = arg1;
        },
        __wbg_set_oncut_4a1ca02afc8a6c98: function(arg0, arg1) {
            arg0.oncut = arg1;
        },
        __wbg_set_oncut_7ce46d10fbe68c9a: function(arg0, arg1) {
            arg0.oncut = arg1;
        },
        __wbg_set_ondblclick_49d015666d676e60: function(arg0, arg1) {
            arg0.ondblclick = arg1;
        },
        __wbg_set_ondblclick_90a062e05a43d5e8: function(arg0, arg1) {
            arg0.ondblclick = arg1;
        },
        __wbg_set_ondblclick_a9ee13d5c80d60c8: function(arg0, arg1) {
            arg0.ondblclick = arg1;
        },
        __wbg_set_ondrag_61285b1fa5996aa2: function(arg0, arg1) {
            arg0.ondrag = arg1;
        },
        __wbg_set_ondrag_9884a426d389643c: function(arg0, arg1) {
            arg0.ondrag = arg1;
        },
        __wbg_set_ondrag_ce486dd1a68d04d0: function(arg0, arg1) {
            arg0.ondrag = arg1;
        },
        __wbg_set_ondragend_1013d1dda21f1b38: function(arg0, arg1) {
            arg0.ondragend = arg1;
        },
        __wbg_set_ondragend_39324480e03b9cab: function(arg0, arg1) {
            arg0.ondragend = arg1;
        },
        __wbg_set_ondragend_6d071396f25d5376: function(arg0, arg1) {
            arg0.ondragend = arg1;
        },
        __wbg_set_ondragenter_5f944d3ab72038bf: function(arg0, arg1) {
            arg0.ondragenter = arg1;
        },
        __wbg_set_ondragenter_735357f71cab535e: function(arg0, arg1) {
            arg0.ondragenter = arg1;
        },
        __wbg_set_ondragenter_b14a8160f6bf38d7: function(arg0, arg1) {
            arg0.ondragenter = arg1;
        },
        __wbg_set_ondragexit_297d83b5a443c7a3: function(arg0, arg1) {
            arg0.ondragexit = arg1;
        },
        __wbg_set_ondragexit_b3245e3f4b37d597: function(arg0, arg1) {
            arg0.ondragexit = arg1;
        },
        __wbg_set_ondragexit_ce3ef0d5f3959dae: function(arg0, arg1) {
            arg0.ondragexit = arg1;
        },
        __wbg_set_ondragleave_6cb7362377040e0e: function(arg0, arg1) {
            arg0.ondragleave = arg1;
        },
        __wbg_set_ondragleave_87b9ffcaff24c9f5: function(arg0, arg1) {
            arg0.ondragleave = arg1;
        },
        __wbg_set_ondragleave_c88a9a779a93ac65: function(arg0, arg1) {
            arg0.ondragleave = arg1;
        },
        __wbg_set_ondragover_78d1d8b898618699: function(arg0, arg1) {
            arg0.ondragover = arg1;
        },
        __wbg_set_ondragover_987ee35237a518b3: function(arg0, arg1) {
            arg0.ondragover = arg1;
        },
        __wbg_set_ondragover_b86a0418f41f73d8: function(arg0, arg1) {
            arg0.ondragover = arg1;
        },
        __wbg_set_ondragstart_16a5c0ee208a074d: function(arg0, arg1) {
            arg0.ondragstart = arg1;
        },
        __wbg_set_ondragstart_295842851aad1012: function(arg0, arg1) {
            arg0.ondragstart = arg1;
        },
        __wbg_set_ondragstart_b67d7c16144807e1: function(arg0, arg1) {
            arg0.ondragstart = arg1;
        },
        __wbg_set_ondrop_c5fe15b773b6aa40: function(arg0, arg1) {
            arg0.ondrop = arg1;
        },
        __wbg_set_ondrop_cbedc087ac1a0f65: function(arg0, arg1) {
            arg0.ondrop = arg1;
        },
        __wbg_set_ondrop_e3a747154616b944: function(arg0, arg1) {
            arg0.ondrop = arg1;
        },
        __wbg_set_ondurationchange_444b66148204ac6d: function(arg0, arg1) {
            arg0.ondurationchange = arg1;
        },
        __wbg_set_ondurationchange_6b86d699f970bb13: function(arg0, arg1) {
            arg0.ondurationchange = arg1;
        },
        __wbg_set_ondurationchange_aca77434a5541ece: function(arg0, arg1) {
            arg0.ondurationchange = arg1;
        },
        __wbg_set_onemptied_cf529ba46fc523c2: function(arg0, arg1) {
            arg0.onemptied = arg1;
        },
        __wbg_set_onemptied_cfcc07691cfcf7ef: function(arg0, arg1) {
            arg0.onemptied = arg1;
        },
        __wbg_set_onemptied_f3e7ad9f3c162948: function(arg0, arg1) {
            arg0.onemptied = arg1;
        },
        __wbg_set_onencrypted_8d4e6745e26c65b8: function(arg0, arg1) {
            arg0.onencrypted = arg1;
        },
        __wbg_set_onended_63c4c4f1aaa83a25: function(arg0, arg1) {
            arg0.onended = arg1;
        },
        __wbg_set_onended_7cf2579665b95865: function(arg0, arg1) {
            arg0.onended = arg1;
        },
        __wbg_set_onended_d6aeec56ac30928c: function(arg0, arg1) {
            arg0.onended = arg1;
        },
        __wbg_set_onerror_0e691f67f2bc57e4: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_170cc709c316da0d: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_3a88c6a180f2eca2: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_cc3a477eed014488: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onerror_e7cf7c03c96b3157: function(arg0, arg1) {
            arg0.onerror = arg1;
        },
        __wbg_set_onfocus_717f63c74c0d06a3: function(arg0, arg1) {
            arg0.onfocus = arg1;
        },
        __wbg_set_onfocus_79e6e6c7feaf43f9: function(arg0, arg1) {
            arg0.onfocus = arg1;
        },
        __wbg_set_onfocus_d2a8f13d9b2e5c8b: function(arg0, arg1) {
            arg0.onfocus = arg1;
        },
        __wbg_set_onfullscreenchange_67dbe7a34e5d3d7e: function(arg0, arg1) {
            arg0.onfullscreenchange = arg1;
        },
        __wbg_set_onfullscreenerror_7c3e2b5393fcce22: function(arg0, arg1) {
            arg0.onfullscreenerror = arg1;
        },
        __wbg_set_ongotpointercapture_2e70aa61b7b7873c: function(arg0, arg1) {
            arg0.ongotpointercapture = arg1;
        },
        __wbg_set_ongotpointercapture_cecee7ea19076935: function(arg0, arg1) {
            arg0.ongotpointercapture = arg1;
        },
        __wbg_set_ongotpointercapture_f91346bcda3a41c7: function(arg0, arg1) {
            arg0.ongotpointercapture = arg1;
        },
        __wbg_set_onhashchange_c8bdf9d21b0843f7: function(arg0, arg1) {
            arg0.onhashchange = arg1;
        },
        __wbg_set_oninput_092fb4ed663eb75a: function(arg0, arg1) {
            arg0.oninput = arg1;
        },
        __wbg_set_oninput_0d1444ab7fd4dd58: function(arg0, arg1) {
            arg0.oninput = arg1;
        },
        __wbg_set_oninput_ee97ea769a16f684: function(arg0, arg1) {
            arg0.oninput = arg1;
        },
        __wbg_set_oninvalid_5959118ca659403f: function(arg0, arg1) {
            arg0.oninvalid = arg1;
        },
        __wbg_set_oninvalid_6ec95b0ac8378cd4: function(arg0, arg1) {
            arg0.oninvalid = arg1;
        },
        __wbg_set_oninvalid_71bb1ff59b31690e: function(arg0, arg1) {
            arg0.oninvalid = arg1;
        },
        __wbg_set_onkeydown_9fe8b5e90b30f4cb: function(arg0, arg1) {
            arg0.onkeydown = arg1;
        },
        __wbg_set_onkeydown_a58060942a95bfb1: function(arg0, arg1) {
            arg0.onkeydown = arg1;
        },
        __wbg_set_onkeydown_c4d9d1fcead50e4c: function(arg0, arg1) {
            arg0.onkeydown = arg1;
        },
        __wbg_set_onkeypress_b9d39c47eaacac32: function(arg0, arg1) {
            arg0.onkeypress = arg1;
        },
        __wbg_set_onkeypress_d9411253202d3e14: function(arg0, arg1) {
            arg0.onkeypress = arg1;
        },
        __wbg_set_onkeypress_fd57cc2e3992e15d: function(arg0, arg1) {
            arg0.onkeypress = arg1;
        },
        __wbg_set_onkeyup_2c0d7f124950d8f3: function(arg0, arg1) {
            arg0.onkeyup = arg1;
        },
        __wbg_set_onkeyup_4c5555eefeb28599: function(arg0, arg1) {
            arg0.onkeyup = arg1;
        },
        __wbg_set_onkeyup_f22f1fb65e44e0f7: function(arg0, arg1) {
            arg0.onkeyup = arg1;
        },
        __wbg_set_onlanguagechange_6b9f5df5a4155dca: function(arg0, arg1) {
            arg0.onlanguagechange = arg1;
        },
        __wbg_set_onload_013ea4fff9728cfc: function(arg0, arg1) {
            arg0.onload = arg1;
        },
        __wbg_set_onload_6347f6f95151326d: function(arg0, arg1) {
            arg0.onload = arg1;
        },
        __wbg_set_onload_84cd766c68d572d8: function(arg0, arg1) {
            arg0.onload = arg1;
        },
        __wbg_set_onloadeddata_69d54b2ece2f9825: function(arg0, arg1) {
            arg0.onloadeddata = arg1;
        },
        __wbg_set_onloadeddata_9ff6a2904f2e88c9: function(arg0, arg1) {
            arg0.onloadeddata = arg1;
        },
        __wbg_set_onloadeddata_d8f3f813cad032ea: function(arg0, arg1) {
            arg0.onloadeddata = arg1;
        },
        __wbg_set_onloadedmetadata_3482d98822b8d722: function(arg0, arg1) {
            arg0.onloadedmetadata = arg1;
        },
        __wbg_set_onloadedmetadata_8341af6315e908b6: function(arg0, arg1) {
            arg0.onloadedmetadata = arg1;
        },
        __wbg_set_onloadedmetadata_b3515d4293a47203: function(arg0, arg1) {
            arg0.onloadedmetadata = arg1;
        },
        __wbg_set_onloadend_0ada58768afa44ea: function(arg0, arg1) {
            arg0.onloadend = arg1;
        },
        __wbg_set_onloadend_d76649cd727914ce: function(arg0, arg1) {
            arg0.onloadend = arg1;
        },
        __wbg_set_onloadend_f2c8db771efca5a9: function(arg0, arg1) {
            arg0.onloadend = arg1;
        },
        __wbg_set_onloadstart_788d432a17921802: function(arg0, arg1) {
            arg0.onloadstart = arg1;
        },
        __wbg_set_onloadstart_7b3d60692e0019bd: function(arg0, arg1) {
            arg0.onloadstart = arg1;
        },
        __wbg_set_onloadstart_d6693efac21c723c: function(arg0, arg1) {
            arg0.onloadstart = arg1;
        },
        __wbg_set_onlostpointercapture_4401c93689652b2e: function(arg0, arg1) {
            arg0.onlostpointercapture = arg1;
        },
        __wbg_set_onlostpointercapture_9a930e21db244c9e: function(arg0, arg1) {
            arg0.onlostpointercapture = arg1;
        },
        __wbg_set_onlostpointercapture_ea013353e2a84a04: function(arg0, arg1) {
            arg0.onlostpointercapture = arg1;
        },
        __wbg_set_onmessage_57d6a01ac0bfd3a3: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onmessage_bd3b9e1e332fdb6c: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onmessage_d511b70365304094: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onmessage_e3a42c9af9f677a1: function(arg0, arg1) {
            arg0.onmessage = arg1;
        },
        __wbg_set_onmessageerror_2c9db185008e2f61: function(arg0, arg1) {
            arg0.onmessageerror = arg1;
        },
        __wbg_set_onmessageerror_89800221ddd911fe: function(arg0, arg1) {
            arg0.onmessageerror = arg1;
        },
        __wbg_set_onmessageerror_93b1d1dcfcaa201f: function(arg0, arg1) {
            arg0.onmessageerror = arg1;
        },
        __wbg_set_onmousedown_24d4191fe4a460b0: function(arg0, arg1) {
            arg0.onmousedown = arg1;
        },
        __wbg_set_onmousedown_44de1072a7ce9340: function(arg0, arg1) {
            arg0.onmousedown = arg1;
        },
        __wbg_set_onmousedown_ba413d0868ca76f3: function(arg0, arg1) {
            arg0.onmousedown = arg1;
        },
        __wbg_set_onmouseenter_4643623a842ac68a: function(arg0, arg1) {
            arg0.onmouseenter = arg1;
        },
        __wbg_set_onmouseenter_7184b9f0f6ee2b7f: function(arg0, arg1) {
            arg0.onmouseenter = arg1;
        },
        __wbg_set_onmouseenter_c4c6bd429d53f5ac: function(arg0, arg1) {
            arg0.onmouseenter = arg1;
        },
        __wbg_set_onmouseleave_91d266ee4e90eb9a: function(arg0, arg1) {
            arg0.onmouseleave = arg1;
        },
        __wbg_set_onmouseleave_bd7f0c47f11a8dc8: function(arg0, arg1) {
            arg0.onmouseleave = arg1;
        },
        __wbg_set_onmouseleave_cf7c328e2907dbd6: function(arg0, arg1) {
            arg0.onmouseleave = arg1;
        },
        __wbg_set_onmousemove_5fb98e835b4268e5: function(arg0, arg1) {
            arg0.onmousemove = arg1;
        },
        __wbg_set_onmousemove_8d17027ad0f0ed51: function(arg0, arg1) {
            arg0.onmousemove = arg1;
        },
        __wbg_set_onmousemove_d896480aebedffba: function(arg0, arg1) {
            arg0.onmousemove = arg1;
        },
        __wbg_set_onmouseout_61731b14d32ff369: function(arg0, arg1) {
            arg0.onmouseout = arg1;
        },
        __wbg_set_onmouseout_a690c730048763c2: function(arg0, arg1) {
            arg0.onmouseout = arg1;
        },
        __wbg_set_onmouseout_d78f332d47d4daed: function(arg0, arg1) {
            arg0.onmouseout = arg1;
        },
        __wbg_set_onmouseover_637e480747ec8177: function(arg0, arg1) {
            arg0.onmouseover = arg1;
        },
        __wbg_set_onmouseover_9b8602da5cdfc197: function(arg0, arg1) {
            arg0.onmouseover = arg1;
        },
        __wbg_set_onmouseover_c336313e42f41241: function(arg0, arg1) {
            arg0.onmouseover = arg1;
        },
        __wbg_set_onmouseup_5459485852219c8a: function(arg0, arg1) {
            arg0.onmouseup = arg1;
        },
        __wbg_set_onmouseup_aa3d7b2545f3bc3f: function(arg0, arg1) {
            arg0.onmouseup = arg1;
        },
        __wbg_set_onmouseup_b559c4287e60b109: function(arg0, arg1) {
            arg0.onmouseup = arg1;
        },
        __wbg_set_onoffline_a1a39352863c81c8: function(arg0, arg1) {
            arg0.onoffline = arg1;
        },
        __wbg_set_onoffline_b4b861b27ff3f743: function(arg0, arg1) {
            arg0.onoffline = arg1;
        },
        __wbg_set_ononline_4340f5636c8d22c2: function(arg0, arg1) {
            arg0.ononline = arg1;
        },
        __wbg_set_ononline_6beb810a335cbe09: function(arg0, arg1) {
            arg0.ononline = arg1;
        },
        __wbg_set_onorientationchange_4c642d39bc7e7b44: function(arg0, arg1) {
            arg0.onorientationchange = arg1;
        },
        __wbg_set_onpagehide_8b3ee23fe1b7fe3f: function(arg0, arg1) {
            arg0.onpagehide = arg1;
        },
        __wbg_set_onpageshow_b85c2337b4db72f4: function(arg0, arg1) {
            arg0.onpageshow = arg1;
        },
        __wbg_set_onpaste_81c256bfbcd27ef8: function(arg0, arg1) {
            arg0.onpaste = arg1;
        },
        __wbg_set_onpaste_c9aa428b6588a62a: function(arg0, arg1) {
            arg0.onpaste = arg1;
        },
        __wbg_set_onpause_24c38493aeb14299: function(arg0, arg1) {
            arg0.onpause = arg1;
        },
        __wbg_set_onpause_d2f4ebb839034823: function(arg0, arg1) {
            arg0.onpause = arg1;
        },
        __wbg_set_onpause_f62a1a3e24d92587: function(arg0, arg1) {
            arg0.onpause = arg1;
        },
        __wbg_set_onplay_47fab1627b2cfd41: function(arg0, arg1) {
            arg0.onplay = arg1;
        },
        __wbg_set_onplay_5b79177f097e4743: function(arg0, arg1) {
            arg0.onplay = arg1;
        },
        __wbg_set_onplay_e3a075dad6dd9fd2: function(arg0, arg1) {
            arg0.onplay = arg1;
        },
        __wbg_set_onplaying_010990022999bcd4: function(arg0, arg1) {
            arg0.onplaying = arg1;
        },
        __wbg_set_onplaying_0d6db8ae71c3f89c: function(arg0, arg1) {
            arg0.onplaying = arg1;
        },
        __wbg_set_onplaying_24704892f41886a6: function(arg0, arg1) {
            arg0.onplaying = arg1;
        },
        __wbg_set_onpointercancel_6a3233cec55475bc: function(arg0, arg1) {
            arg0.onpointercancel = arg1;
        },
        __wbg_set_onpointercancel_7cb81e9eb6134ca9: function(arg0, arg1) {
            arg0.onpointercancel = arg1;
        },
        __wbg_set_onpointercancel_cfd4a530ca4992df: function(arg0, arg1) {
            arg0.onpointercancel = arg1;
        },
        __wbg_set_onpointerdown_4572b3cace6ce5be: function(arg0, arg1) {
            arg0.onpointerdown = arg1;
        },
        __wbg_set_onpointerdown_498ae7141e35aa98: function(arg0, arg1) {
            arg0.onpointerdown = arg1;
        },
        __wbg_set_onpointerdown_c43f1ee89da63372: function(arg0, arg1) {
            arg0.onpointerdown = arg1;
        },
        __wbg_set_onpointerenter_727e2fc5c3b3349a: function(arg0, arg1) {
            arg0.onpointerenter = arg1;
        },
        __wbg_set_onpointerenter_9a54bb82671a7734: function(arg0, arg1) {
            arg0.onpointerenter = arg1;
        },
        __wbg_set_onpointerenter_deea854ff7a80b3f: function(arg0, arg1) {
            arg0.onpointerenter = arg1;
        },
        __wbg_set_onpointerleave_2827f2efe2448ed3: function(arg0, arg1) {
            arg0.onpointerleave = arg1;
        },
        __wbg_set_onpointerleave_2c28c98b5fd746ca: function(arg0, arg1) {
            arg0.onpointerleave = arg1;
        },
        __wbg_set_onpointerleave_f0698384a5d623e9: function(arg0, arg1) {
            arg0.onpointerleave = arg1;
        },
        __wbg_set_onpointerlockchange_1e8738fce33fbce2: function(arg0, arg1) {
            arg0.onpointerlockchange = arg1;
        },
        __wbg_set_onpointerlockerror_906290e35fcb574c: function(arg0, arg1) {
            arg0.onpointerlockerror = arg1;
        },
        __wbg_set_onpointermove_2f96aa97291ca919: function(arg0, arg1) {
            arg0.onpointermove = arg1;
        },
        __wbg_set_onpointermove_31e27c758a8d4214: function(arg0, arg1) {
            arg0.onpointermove = arg1;
        },
        __wbg_set_onpointermove_795f7ccd9adcb238: function(arg0, arg1) {
            arg0.onpointermove = arg1;
        },
        __wbg_set_onpointerout_06a8270cba76c968: function(arg0, arg1) {
            arg0.onpointerout = arg1;
        },
        __wbg_set_onpointerout_2cf8305c828a9cd7: function(arg0, arg1) {
            arg0.onpointerout = arg1;
        },
        __wbg_set_onpointerout_45c278265fbaf048: function(arg0, arg1) {
            arg0.onpointerout = arg1;
        },
        __wbg_set_onpointerover_171c6d3c1099a39f: function(arg0, arg1) {
            arg0.onpointerover = arg1;
        },
        __wbg_set_onpointerover_421af129e68cd284: function(arg0, arg1) {
            arg0.onpointerover = arg1;
        },
        __wbg_set_onpointerover_6a7615851189b9b7: function(arg0, arg1) {
            arg0.onpointerover = arg1;
        },
        __wbg_set_onpointerup_a513bf81e9774a37: function(arg0, arg1) {
            arg0.onpointerup = arg1;
        },
        __wbg_set_onpointerup_b9880b0bc1b4232e: function(arg0, arg1) {
            arg0.onpointerup = arg1;
        },
        __wbg_set_onpointerup_c3876f14ececcaae: function(arg0, arg1) {
            arg0.onpointerup = arg1;
        },
        __wbg_set_onpopstate_78fd617645952901: function(arg0, arg1) {
            arg0.onpopstate = arg1;
        },
        __wbg_set_onprogress_061bff8fd18138b3: function(arg0, arg1) {
            arg0.onprogress = arg1;
        },
        __wbg_set_onprogress_1f7d5db742dff64f: function(arg0, arg1) {
            arg0.onprogress = arg1;
        },
        __wbg_set_onprogress_efdaed485c3c287f: function(arg0, arg1) {
            arg0.onprogress = arg1;
        },
        __wbg_set_onratechange_0a883580a3fdd297: function(arg0, arg1) {
            arg0.onratechange = arg1;
        },
        __wbg_set_onratechange_228ae6e8d757ab68: function(arg0, arg1) {
            arg0.onratechange = arg1;
        },
        __wbg_set_onratechange_fdfd5665441f2d4f: function(arg0, arg1) {
            arg0.onratechange = arg1;
        },
        __wbg_set_onreadystatechange_756699e0cb99a007: function(arg0, arg1) {
            arg0.onreadystatechange = arg1;
        },
        __wbg_set_onreset_31881854aa373845: function(arg0, arg1) {
            arg0.onreset = arg1;
        },
        __wbg_set_onreset_ca97e4a9fabb2ff7: function(arg0, arg1) {
            arg0.onreset = arg1;
        },
        __wbg_set_onreset_fd8747a0f013a91c: function(arg0, arg1) {
            arg0.onreset = arg1;
        },
        __wbg_set_onresize_03e28fe3968fa769: function(arg0, arg1) {
            arg0.onresize = arg1;
        },
        __wbg_set_onresize_6d66fe2412f88706: function(arg0, arg1) {
            arg0.onresize = arg1;
        },
        __wbg_set_onresize_d928db1cbff2d3f8: function(arg0, arg1) {
            arg0.onresize = arg1;
        },
        __wbg_set_onscroll_10bc6815cc0ebdea: function(arg0, arg1) {
            arg0.onscroll = arg1;
        },
        __wbg_set_onscroll_94779c7c43544c7a: function(arg0, arg1) {
            arg0.onscroll = arg1;
        },
        __wbg_set_onscroll_e333cc36a594e81f: function(arg0, arg1) {
            arg0.onscroll = arg1;
        },
        __wbg_set_onseeked_67421d449a0c9fc1: function(arg0, arg1) {
            arg0.onseeked = arg1;
        },
        __wbg_set_onseeked_a29b27a20c2f24f7: function(arg0, arg1) {
            arg0.onseeked = arg1;
        },
        __wbg_set_onseeked_a84771070ef9def1: function(arg0, arg1) {
            arg0.onseeked = arg1;
        },
        __wbg_set_onseeking_82657e32fdb0f860: function(arg0, arg1) {
            arg0.onseeking = arg1;
        },
        __wbg_set_onseeking_960cb2ea9da3915b: function(arg0, arg1) {
            arg0.onseeking = arg1;
        },
        __wbg_set_onseeking_c9af55506c2095c3: function(arg0, arg1) {
            arg0.onseeking = arg1;
        },
        __wbg_set_onselect_89bc1a7dc98815b3: function(arg0, arg1) {
            arg0.onselect = arg1;
        },
        __wbg_set_onselect_a48b353ecdaf7897: function(arg0, arg1) {
            arg0.onselect = arg1;
        },
        __wbg_set_onselect_d34afff3a5cb4806: function(arg0, arg1) {
            arg0.onselect = arg1;
        },
        __wbg_set_onselectionchange_e63569f171f716e7: function(arg0, arg1) {
            arg0.onselectionchange = arg1;
        },
        __wbg_set_onselectstart_cc7acccad2606721: function(arg0, arg1) {
            arg0.onselectstart = arg1;
        },
        __wbg_set_onselectstart_e231c1ed31880ad8: function(arg0, arg1) {
            arg0.onselectstart = arg1;
        },
        __wbg_set_onselectstart_f1a0fc64caf0339d: function(arg0, arg1) {
            arg0.onselectstart = arg1;
        },
        __wbg_set_onshow_03e6d25ae0aac169: function(arg0, arg1) {
            arg0.onshow = arg1;
        },
        __wbg_set_onshow_6b5eb1a1505981c6: function(arg0, arg1) {
            arg0.onshow = arg1;
        },
        __wbg_set_onshow_ff68175d7a55152c: function(arg0, arg1) {
            arg0.onshow = arg1;
        },
        __wbg_set_onstalled_138c22a9c3aba743: function(arg0, arg1) {
            arg0.onstalled = arg1;
        },
        __wbg_set_onstalled_3eafe976c9df708a: function(arg0, arg1) {
            arg0.onstalled = arg1;
        },
        __wbg_set_onstalled_b0d626f11dd13f20: function(arg0, arg1) {
            arg0.onstalled = arg1;
        },
        __wbg_set_onstorage_2b778e8c0ca19bce: function(arg0, arg1) {
            arg0.onstorage = arg1;
        },
        __wbg_set_onsubmit_2d2e9c215216272b: function(arg0, arg1) {
            arg0.onsubmit = arg1;
        },
        __wbg_set_onsubmit_88b2f1782d932775: function(arg0, arg1) {
            arg0.onsubmit = arg1;
        },
        __wbg_set_onsubmit_f3f8f9418d7ef068: function(arg0, arg1) {
            arg0.onsubmit = arg1;
        },
        __wbg_set_onsuspend_2a03c25136c484fd: function(arg0, arg1) {
            arg0.onsuspend = arg1;
        },
        __wbg_set_onsuspend_419ee0d932b3dccf: function(arg0, arg1) {
            arg0.onsuspend = arg1;
        },
        __wbg_set_onsuspend_d3ff1548e08580cb: function(arg0, arg1) {
            arg0.onsuspend = arg1;
        },
        __wbg_set_ontimeupdate_67dc9101471c8ee5: function(arg0, arg1) {
            arg0.ontimeupdate = arg1;
        },
        __wbg_set_ontimeupdate_7164e7fe9d8f6524: function(arg0, arg1) {
            arg0.ontimeupdate = arg1;
        },
        __wbg_set_ontimeupdate_7936c562814b05b4: function(arg0, arg1) {
            arg0.ontimeupdate = arg1;
        },
        __wbg_set_ontoggle_72c2663094a8d48e: function(arg0, arg1) {
            arg0.ontoggle = arg1;
        },
        __wbg_set_ontoggle_b44768a129353fa9: function(arg0, arg1) {
            arg0.ontoggle = arg1;
        },
        __wbg_set_ontoggle_c5b046814e574a37: function(arg0, arg1) {
            arg0.ontoggle = arg1;
        },
        __wbg_set_ontouchcancel_c1f31d04b05ea4a6: function(arg0, arg1) {
            arg0.ontouchcancel = arg1;
        },
        __wbg_set_ontouchcancel_d0059502d9e4a8a7: function(arg0, arg1) {
            arg0.ontouchcancel = arg1;
        },
        __wbg_set_ontouchcancel_d0620bf3fe61ac62: function(arg0, arg1) {
            arg0.ontouchcancel = arg1;
        },
        __wbg_set_ontouchend_5fcb2e8e2b49cf50: function(arg0, arg1) {
            arg0.ontouchend = arg1;
        },
        __wbg_set_ontouchend_7bc1ee26bdd5b3e5: function(arg0, arg1) {
            arg0.ontouchend = arg1;
        },
        __wbg_set_ontouchend_d28a731fbe554f48: function(arg0, arg1) {
            arg0.ontouchend = arg1;
        },
        __wbg_set_ontouchmove_192f3f3339e865b9: function(arg0, arg1) {
            arg0.ontouchmove = arg1;
        },
        __wbg_set_ontouchmove_5632155485203719: function(arg0, arg1) {
            arg0.ontouchmove = arg1;
        },
        __wbg_set_ontouchmove_99c82331c08248fe: function(arg0, arg1) {
            arg0.ontouchmove = arg1;
        },
        __wbg_set_ontouchstart_3344403cd14f091b: function(arg0, arg1) {
            arg0.ontouchstart = arg1;
        },
        __wbg_set_ontouchstart_7207c2eb2cd0ad8e: function(arg0, arg1) {
            arg0.ontouchstart = arg1;
        },
        __wbg_set_ontouchstart_80bbe2bf78a127bc: function(arg0, arg1) {
            arg0.ontouchstart = arg1;
        },
        __wbg_set_ontransitioncancel_1038e5ce7b32d31e: function(arg0, arg1) {
            arg0.ontransitioncancel = arg1;
        },
        __wbg_set_ontransitioncancel_21a6bd3c9bb40589: function(arg0, arg1) {
            arg0.ontransitioncancel = arg1;
        },
        __wbg_set_ontransitioncancel_22ab2077ac674ef0: function(arg0, arg1) {
            arg0.ontransitioncancel = arg1;
        },
        __wbg_set_ontransitionend_05288134f88e66af: function(arg0, arg1) {
            arg0.ontransitionend = arg1;
        },
        __wbg_set_ontransitionend_4f08544528658d0b: function(arg0, arg1) {
            arg0.ontransitionend = arg1;
        },
        __wbg_set_ontransitionend_61aa9c36f95faa74: function(arg0, arg1) {
            arg0.ontransitionend = arg1;
        },
        __wbg_set_ontransitionrun_384708f563b7b4cf: function(arg0, arg1) {
            arg0.ontransitionrun = arg1;
        },
        __wbg_set_ontransitionrun_4c29a8248655e665: function(arg0, arg1) {
            arg0.ontransitionrun = arg1;
        },
        __wbg_set_ontransitionrun_8425a3cb755daeff: function(arg0, arg1) {
            arg0.ontransitionrun = arg1;
        },
        __wbg_set_ontransitionstart_09d13493d5cb5cd1: function(arg0, arg1) {
            arg0.ontransitionstart = arg1;
        },
        __wbg_set_ontransitionstart_0d5fbcd9f5921181: function(arg0, arg1) {
            arg0.ontransitionstart = arg1;
        },
        __wbg_set_ontransitionstart_226f2bee2c30c171: function(arg0, arg1) {
            arg0.ontransitionstart = arg1;
        },
        __wbg_set_onuncapturederror_6632a118e96fdf4e: function(arg0, arg1) {
            arg0.onuncapturederror = arg1;
        },
        __wbg_set_onunload_bc4267255b315408: function(arg0, arg1) {
            arg0.onunload = arg1;
        },
        __wbg_set_onvisibilitychange_b27b48bab885922c: function(arg0, arg1) {
            arg0.onvisibilitychange = arg1;
        },
        __wbg_set_onvolumechange_1aa2a6861f5e783f: function(arg0, arg1) {
            arg0.onvolumechange = arg1;
        },
        __wbg_set_onvolumechange_b8c83f4a1587b71c: function(arg0, arg1) {
            arg0.onvolumechange = arg1;
        },
        __wbg_set_onvolumechange_bd3c0737a6221558: function(arg0, arg1) {
            arg0.onvolumechange = arg1;
        },
        __wbg_set_onvrdisplayactivate_98f77e87a6d27cd3: function(arg0, arg1) {
            arg0.onvrdisplayactivate = arg1;
        },
        __wbg_set_onvrdisplayconnect_e8a0681d5f0825a5: function(arg0, arg1) {
            arg0.onvrdisplayconnect = arg1;
        },
        __wbg_set_onvrdisplaydeactivate_9d30f6eb62f3964d: function(arg0, arg1) {
            arg0.onvrdisplaydeactivate = arg1;
        },
        __wbg_set_onvrdisplaydisconnect_d38a568026e755b7: function(arg0, arg1) {
            arg0.onvrdisplaydisconnect = arg1;
        },
        __wbg_set_onvrdisplaypresentchange_20bd91a8ca58813c: function(arg0, arg1) {
            arg0.onvrdisplaypresentchange = arg1;
        },
        __wbg_set_onwaiting_9980bbaffccc321a: function(arg0, arg1) {
            arg0.onwaiting = arg1;
        },
        __wbg_set_onwaiting_a590df312ff0f749: function(arg0, arg1) {
            arg0.onwaiting = arg1;
        },
        __wbg_set_onwaiting_ed3eaa03dfb427ea: function(arg0, arg1) {
            arg0.onwaiting = arg1;
        },
        __wbg_set_onwaitingforkey_02f441be177ede82: function(arg0, arg1) {
            arg0.onwaitingforkey = arg1;
        },
        __wbg_set_onwebkitanimationend_0a55a0b4a2fd4c03: function(arg0, arg1) {
            arg0.onwebkitanimationend = arg1;
        },
        __wbg_set_onwebkitanimationend_0e8d39d861495651: function(arg0, arg1) {
            arg0.onwebkitanimationend = arg1;
        },
        __wbg_set_onwebkitanimationend_3965f43d8e12a7a8: function(arg0, arg1) {
            arg0.onwebkitanimationend = arg1;
        },
        __wbg_set_onwebkitanimationiteration_6adc94d3e0755635: function(arg0, arg1) {
            arg0.onwebkitanimationiteration = arg1;
        },
        __wbg_set_onwebkitanimationiteration_733393d8aaf2d560: function(arg0, arg1) {
            arg0.onwebkitanimationiteration = arg1;
        },
        __wbg_set_onwebkitanimationiteration_f9234c4629eb768d: function(arg0, arg1) {
            arg0.onwebkitanimationiteration = arg1;
        },
        __wbg_set_onwebkitanimationstart_74024124a53ab17c: function(arg0, arg1) {
            arg0.onwebkitanimationstart = arg1;
        },
        __wbg_set_onwebkitanimationstart_9046fd8c903948a0: function(arg0, arg1) {
            arg0.onwebkitanimationstart = arg1;
        },
        __wbg_set_onwebkitanimationstart_d455a67b421cb962: function(arg0, arg1) {
            arg0.onwebkitanimationstart = arg1;
        },
        __wbg_set_onwebkittransitionend_20d9d8103965edd9: function(arg0, arg1) {
            arg0.onwebkittransitionend = arg1;
        },
        __wbg_set_onwebkittransitionend_88432bf1a126660b: function(arg0, arg1) {
            arg0.onwebkittransitionend = arg1;
        },
        __wbg_set_onwebkittransitionend_b3c023427bccf251: function(arg0, arg1) {
            arg0.onwebkittransitionend = arg1;
        },
        __wbg_set_onwheel_346675929e6abae8: function(arg0, arg1) {
            arg0.onwheel = arg1;
        },
        __wbg_set_onwheel_550773bef3dbdc2d: function(arg0, arg1) {
            arg0.onwheel = arg1;
        },
        __wbg_set_onwheel_f5e78a82b27a3dd3: function(arg0, arg1) {
            arg0.onwheel = arg1;
        },
        __wbg_set_opener_45305130f3f55000: function() { return handleError(function (arg0, arg1) {
            arg0.opener = arg1;
        }, arguments); },
        __wbg_set_operation_a91e5763a8313c6b: function(arg0, arg1) {
            arg0.operation = __wbindgen_enum_GpuBlendOperation[arg1];
        },
        __wbg_set_origin_24a61b4427e330e9: function(arg0, arg1) {
            arg0.origin = arg1;
        },
        __wbg_set_origin_9726209f22511ffa: function(arg0, arg1) {
            arg0.origin = arg1;
        },
        __wbg_set_origin_f7cd05478d9232f0: function(arg0, arg1) {
            arg0.origin = arg1;
        },
        __wbg_set_outerHTML_14a9aa1fae25ebac: function(arg0, arg1, arg2) {
            arg0.outerHTML = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_outerHeight_4f958be6db0e01e2: function() { return handleError(function (arg0, arg1) {
            arg0.outerHeight = arg1;
        }, arguments); },
        __wbg_set_outerWidth_ff18fc3d7e6fa7a1: function() { return handleError(function (arg0, arg1) {
            arg0.outerWidth = arg1;
        }, arguments); },
        __wbg_set_pass_op_eef0c5885ae707c3: function(arg0, arg1) {
            arg0.passOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_password_2bf4e6c5155a3526: function(arg0, arg1, arg2) {
            arg0.password = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_pathname_4408c0dd3085068c: function(arg0, arg1, arg2) {
            arg0.pathname = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_playbackRate_f1da4e9f51672363: function(arg0, arg1) {
            arg0.playbackRate = arg1;
        },
        __wbg_set_popover_4262a24d6f677757: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.popover = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        }, arguments); },
        __wbg_set_port_c8522f2e3b2cf69e: function(arg0, arg1, arg2) {
            arg0.port = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_poster_99a9d197a6650fb9: function(arg0, arg1, arg2) {
            arg0.poster = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_power_preference_7d669fb9b41f7bf2: function(arg0, arg1) {
            arg0.powerPreference = __wbindgen_enum_GpuPowerPreference[arg1];
        },
        __wbg_set_preload_0f79a12c94bb1b7c: function(arg0, arg1, arg2) {
            arg0.preload = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_premultiplied_alpha_e49848a873888b3d: function(arg0, arg1) {
            arg0.premultipliedAlpha = arg1 !== 0;
        },
        __wbg_set_premultiply_alpha_58a53a5b165c2c3a: function(arg0, arg1) {
            arg0.premultiplyAlpha = __wbindgen_enum_PremultiplyAlpha[arg1];
        },
        __wbg_set_primitive_3462e090c7a78969: function(arg0, arg1) {
            arg0.primitive = arg1;
        },
        __wbg_set_protocol_df438d659bdb7af4: function(arg0, arg1, arg2) {
            arg0.protocol = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_query_set_604a8ae10429942b: function(arg0, arg1) {
            arg0.querySet = arg1;
        },
        __wbg_set_query_set_62d86bdf10d64d37: function(arg0, arg1) {
            arg0.querySet = arg1;
        },
        __wbg_set_r_40fe44b2d9a401f4: function(arg0, arg1) {
            arg0.r = arg1;
        },
        __wbg_set_referrerPolicy_a6f861d6a3242acc: function(arg0, arg1, arg2) {
            arg0.referrerPolicy = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_required_features_3d00070d09235d7d: function(arg0, arg1) {
            arg0.requiredFeatures = arg1;
        },
        __wbg_set_required_limits_e0de55a49a48e3dc: function(arg0, arg1) {
            arg0.requiredLimits = arg1;
        },
        __wbg_set_resize_height_2b42a9962984c5e1: function(arg0, arg1) {
            arg0.resizeHeight = arg1 >>> 0;
        },
        __wbg_set_resize_width_1af7a75103b163ee: function(arg0, arg1) {
            arg0.resizeWidth = arg1 >>> 0;
        },
        __wbg_set_resolve_target_6e7eda03a6886624: function(arg0, arg1) {
            arg0.resolveTarget = arg1;
        },
        __wbg_set_resource_fe1f979fce4afee2: function(arg0, arg1) {
            arg0.resource = arg1;
        },
        __wbg_set_rounding_increment_5efe7cf81e132273: function(arg0, arg1) {
            arg0.roundingIncrement = arg1 >>> 0;
        },
        __wbg_set_rounding_increment_89ed267499d1ff90: function(arg0, arg1) {
            arg0.roundingIncrement = arg1 >>> 0;
        },
        __wbg_set_rounding_mode_10130fbaf85a084b: function(arg0, arg1) {
            arg0.roundingMode = __wbindgen_enum_RoundingMode[arg1];
        },
        __wbg_set_rounding_mode_1d3a9e5fb8926fc5: function(arg0, arg1) {
            arg0.roundingMode = __wbindgen_enum_RoundingMode[arg1];
        },
        __wbg_set_rounding_priority_fc991b89b3c87179: function(arg0, arg1) {
            arg0.roundingPriority = __wbindgen_enum_RoundingPriority[arg1];
        },
        __wbg_set_rounding_priority_fff4b53021263400: function(arg0, arg1) {
            arg0.roundingPriority = __wbindgen_enum_RoundingPriority[arg1];
        },
        __wbg_set_rows_per_image_1f4a56a3c5d57e93: function(arg0, arg1) {
            arg0.rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_rows_per_image_c616c70e60a35618: function(arg0, arg1) {
            arg0.rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_sample_count_08f0a784878aff15: function(arg0, arg1) {
            arg0.sampleCount = arg1 >>> 0;
        },
        __wbg_set_sample_count_2b8ac49e1626ac13: function(arg0, arg1) {
            arg0.sampleCount = arg1 >>> 0;
        },
        __wbg_set_sample_type_3cecbd4699e2e5fb: function(arg0, arg1) {
            arg0.sampleType = __wbindgen_enum_GpuTextureSampleType[arg1];
        },
        __wbg_set_sampler_12544c21977075c1: function(arg0, arg1) {
            arg0.sampler = arg1;
        },
        __wbg_set_screenX_986ab2d7dcf7d86b: function() { return handleError(function (arg0, arg1) {
            arg0.screenX = arg1;
        }, arguments); },
        __wbg_set_screenY_92117b4c9ec84bc6: function() { return handleError(function (arg0, arg1) {
            arg0.screenY = arg1;
        }, arguments); },
        __wbg_set_scrollHeight_eb2e8bb67bd55c4f: function(arg0, arg1) {
            arg0.scrollHeight = arg1;
        },
        __wbg_set_scrollLeft_075e81a16fc93cca: function(arg0, arg1) {
            arg0.scrollLeft = arg1;
        },
        __wbg_set_scrollTop_2d6806f47f17cc8b: function(arg0, arg1) {
            arg0.scrollTop = arg1;
        },
        __wbg_set_scrollTop_431b03eeb3e9c636: function(arg0, arg1) {
            arg0.scrollTop = arg1;
        },
        __wbg_set_search_f9700de567764208: function(arg0, arg1, arg2) {
            arg0.search = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_second_0b23d8020b0993c1: function(arg0, arg1) {
            arg0.second = __wbindgen_enum_NumericFormat[arg1];
        },
        __wbg_set_seconds_0975c36de2ad15ad: function(arg0, arg1) {
            arg0.seconds = arg1;
        },
        __wbg_set_seconds_9e97f4f5ae9849da: function(arg0, arg1) {
            arg0.seconds = __wbindgen_enum_DurationTimeUnitStyle[arg1];
        },
        __wbg_set_seconds_display_0f81373073e6988a: function(arg0, arg1) {
            arg0.secondsDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_selectedStyleSheetSet_a3dca287fb7af02d: function(arg0, arg1, arg2) {
            arg0.selectedStyleSheetSet = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_sensitivity_3a36e5f9a6740d94: function(arg0, arg1) {
            arg0.sensitivity = __wbindgen_enum_CollatorSensitivity[arg1];
        },
        __wbg_set_shader_location_03356bf6a6da4332: function(arg0, arg1) {
            arg0.shaderLocation = arg1 >>> 0;
        },
        __wbg_set_sign_display_190ac34c37da7264: function(arg0, arg1) {
            arg0.signDisplay = __wbindgen_enum_SignDisplay[arg1];
        },
        __wbg_set_size_0c20f73abce8f1ce: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_size_cf04b4174c30722b: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_size_f1207de283144c72: function(arg0, arg1) {
            arg0.size = arg1;
        },
        __wbg_set_sizes_8babd3e1181ff1af: function(arg0, arg1, arg2) {
            arg0.sizes = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_slot_241b36782e43c987: function(arg0, arg1, arg2) {
            arg0.slot = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_source_30093378886aae46: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_source_7eb2b03d1177a7c8: function(arg0, arg1) {
            arg0.source = arg1;
        },
        __wbg_set_spellcheck_7b21465da606c6cd: function(arg0, arg1) {
            arg0.spellcheck = arg1 !== 0;
        },
        __wbg_set_src_674d1d8659ee9cd5: function(arg0, arg1, arg2) {
            arg0.src = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_src_f61b14b6a099d35c: function(arg0, arg1, arg2) {
            arg0.src = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_src_factor_c3668d4122497276: function(arg0, arg1) {
            arg0.srcFactor = __wbindgen_enum_GpuBlendFactor[arg1];
        },
        __wbg_set_srcset_44e03a9ad33e293d: function(arg0, arg1, arg2) {
            arg0.srcset = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_stackTraceLimit_99969b399e97ec5b: function(arg0) {
            Error.stackTraceLimit = arg0;
        },
        __wbg_set_status_1b148f0673ea6673: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.status = getStringFromWasm0(arg1, arg2);
        }, arguments); },
        __wbg_set_stencil_back_8d01a6c0477059b0: function(arg0, arg1) {
            arg0.stencilBack = arg1;
        },
        __wbg_set_stencil_clear_value_1f380af0bd0d9255: function(arg0, arg1) {
            arg0.stencilClearValue = arg1 >>> 0;
        },
        __wbg_set_stencil_front_f881c15b2d170653: function(arg0, arg1) {
            arg0.stencilFront = arg1;
        },
        __wbg_set_stencil_load_op_5cde31e71a964b58: function(arg0, arg1) {
            arg0.stencilLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_stencil_read_mask_d79993adcfc418ab: function(arg0, arg1) {
            arg0.stencilReadMask = arg1 >>> 0;
        },
        __wbg_set_stencil_read_only_4193231fec974b3a: function(arg0, arg1) {
            arg0.stencilReadOnly = arg1 !== 0;
        },
        __wbg_set_stencil_read_only_ac984029b821315e: function(arg0, arg1) {
            arg0.stencilReadOnly = arg1 !== 0;
        },
        __wbg_set_stencil_store_op_262e1df7b92404d3: function(arg0, arg1) {
            arg0.stencilStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_stencil_write_mask_94ec6249877e083e: function(arg0, arg1) {
            arg0.stencilWriteMask = arg1 >>> 0;
        },
        __wbg_set_step_mode_241a8d5515fa964b: function(arg0, arg1) {
            arg0.stepMode = __wbindgen_enum_GpuVertexStepMode[arg1];
        },
        __wbg_set_storage_texture_36be4834c501acab: function(arg0, arg1) {
            arg0.storageTexture = arg1;
        },
        __wbg_set_store_op_a95e8da4555c6010: function(arg0, arg1) {
            arg0.storeOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_strip_index_format_62c417aa65a4d277: function(arg0, arg1) {
            arg0.stripIndexFormat = __wbindgen_enum_GpuIndexFormat[arg1];
        },
        __wbg_set_style_033ddd57eec83207: function(arg0, arg1) {
            arg0.style = __wbindgen_enum_NumberFormatStyle[arg1];
        },
        __wbg_set_style_126ffd0880f4f965: function(arg0, arg1) {
            arg0.style = __wbindgen_enum_DisplayNamesStyle[arg1];
        },
        __wbg_set_style_238475bfdb4626c3: function(arg0, arg1) {
            arg0.style = __wbindgen_enum_ListFormatStyle[arg1];
        },
        __wbg_set_style_aa115919a3c3d0c0: function(arg0, arg1) {
            arg0.style = __wbindgen_enum_DurationFormatStyle[arg1];
        },
        __wbg_set_style_d24c7094a8bdc18f: function(arg0, arg1) {
            arg0.style = __wbindgen_enum_RelativeTimeFormatStyle[arg1];
        },
        __wbg_set_tabIndex_70047c7d062bb928: function(arg0, arg1) {
            arg0.tabIndex = arg1;
        },
        __wbg_set_targets_6664b7e6ec5da9d3: function(arg0, arg1) {
            arg0.targets = arg1;
        },
        __wbg_set_textContent_54dcad83ae15772d: function(arg0, arg1, arg2) {
            arg0.textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_texture_292332b872bf75e8: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_texture_64823aa8aca790b5: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_texture_738e6f6215515de3: function(arg0, arg1) {
            arg0.texture = arg1;
        },
        __wbg_set_time_style_9db70b95467084f6: function(arg0, arg1) {
            arg0.timeStyle = __wbindgen_enum_DateTimeStyle[arg1];
        },
        __wbg_set_time_zone_2b8d8a4064bf11e2: function(arg0, arg1, arg2) {
            arg0.timeZone = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_time_zone_name_adbab3993a885b05: function(arg0, arg1) {
            arg0.timeZoneName = __wbindgen_enum_TimeZoneNameFormat[arg1];
        },
        __wbg_set_timestamp_writes_3854a564715b0ac7: function(arg0, arg1) {
            arg0.timestampWrites = arg1;
        },
        __wbg_set_timestamp_writes_6854d9d17bf5b0b4: function(arg0, arg1) {
            arg0.timestampWrites = arg1;
        },
        __wbg_set_title_4856546ac7d2f7d2: function(arg0, arg1, arg2) {
            arg0.title = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_title_887d47601456e757: function(arg0, arg1, arg2) {
            arg0.title = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_tone_mapping_c5b0b597fa3ed472: function(arg0, arg1) {
            arg0.toneMapping = arg1;
        },
        __wbg_set_topology_914716698f5868bb: function(arg0, arg1) {
            arg0.topology = __wbindgen_enum_GpuPrimitiveTopology[arg1];
        },
        __wbg_set_trailing_zero_display_537855ad05a1a173: function(arg0, arg1) {
            arg0.trailingZeroDisplay = __wbindgen_enum_TrailingZeroDisplay[arg1];
        },
        __wbg_set_trailing_zero_display_e39f97a5631a7ea1: function(arg0, arg1) {
            arg0.trailingZeroDisplay = __wbindgen_enum_TrailingZeroDisplay[arg1];
        },
        __wbg_set_type_17a1387b620bc902: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuBufferBindingType[arg1];
        },
        __wbg_set_type_5e3963a1d04b143d: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuQueryType[arg1];
        },
        __wbg_set_type_8ce203e412e28cf6: function(arg0, arg1, arg2) {
            arg0.type = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_type_95e847c2e6efd921: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_DisplayNamesType[arg1];
        },
        __wbg_set_type_bbacb0c4f62f018e: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_PluralRulesType[arg1];
        },
        __wbg_set_type_cdd85f9c1c82d76e: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_ListFormatType[arg1];
        },
        __wbg_set_type_d4edb621ec2051e0: function(arg0, arg1) {
            arg0.type = __wbindgen_enum_GpuSamplerBindingType[arg1];
        },
        __wbg_set_unclipped_depth_e23e3091db2ac351: function(arg0, arg1) {
            arg0.unclippedDepth = arg1 !== 0;
        },
        __wbg_set_unit_2ede14ca8fccfd96: function(arg0, arg1, arg2) {
            arg0.unit = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_unit_display_d81d92e88aea70ae: function(arg0, arg1) {
            arg0.unitDisplay = __wbindgen_enum_UnitDisplay[arg1];
        },
        __wbg_set_usage_41b7d18f3f220e6c: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_6ae4d85589906117: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_c8e82e26cd42f822: function(arg0, arg1) {
            arg0.usage = __wbindgen_enum_CollatorUsage[arg1];
        },
        __wbg_set_usage_e167dd772123f679: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_usage_f084cd416060ceee: function(arg0, arg1) {
            arg0.usage = arg1 >>> 0;
        },
        __wbg_set_useMap_e19cd7c4ff03844a: function(arg0, arg1, arg2) {
            arg0.useMap = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_use_grouping_b1e6ac39a5d11b22: function(arg0, arg1) {
            arg0.useGrouping = __wbindgen_enum_UseGrouping[arg1];
        },
        __wbg_set_username_91eccbac23f2118c: function(arg0, arg1, arg2) {
            arg0.username = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_value_f86d819107cb271b: function(arg0, arg1) {
            arg0.value = arg1;
        },
        __wbg_set_vertex_29812f650590fa45: function(arg0, arg1) {
            arg0.vertex = arg1;
        },
        __wbg_set_view_32a8132aec6de194: function(arg0, arg1) {
            arg0.view = arg1;
        },
        __wbg_set_view_506e5beadab34e99: function(arg0, arg1) {
            arg0.view = arg1;
        },
        __wbg_set_view_dimension_4a840560a13b4860: function(arg0, arg1) {
            arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_dimension_9ae69db849267b1a: function(arg0, arg1) {
            arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_formats_4d0b943f593dd219: function(arg0, arg1) {
            arg0.viewFormats = arg1;
        },
        __wbg_set_view_formats_cba8520bf0d83d62: function(arg0, arg1) {
            arg0.viewFormats = arg1;
        },
        __wbg_set_visibility_bbbf3d2b70571950: function(arg0, arg1) {
            arg0.visibility = arg1 >>> 0;
        },
        __wbg_set_volume_ca1b2e2fc925c9e9: function(arg0, arg1) {
            arg0.volume = arg1;
        },
        __wbg_set_vspace_cbcf7ee727e24cca: function(arg0, arg1) {
            arg0.vspace = arg1 >>> 0;
        },
        __wbg_set_weekday_1f13d07288ce5de9: function(arg0, arg1) {
            arg0.weekday = __wbindgen_enum_WeekdayFormat[arg1];
        },
        __wbg_set_weeks_6d5b4cd298e87b5e: function(arg0, arg1) {
            arg0.weeks = arg1;
        },
        __wbg_set_weeks_aff6613bf07e8bda: function(arg0, arg1) {
            arg0.weeks = __wbindgen_enum_DurationUnitStyle[arg1];
        },
        __wbg_set_weeks_display_721366eb80044670: function(arg0, arg1) {
            arg0.weeksDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_width_0f26635b289b3c67: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_37dd724432ba55a0: function(arg0, arg1) {
            arg0.width = arg1;
        },
        __wbg_set_width_3d10ad44af79aa20: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_49ac9b7d914afc85: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_8e30d010cd66830d: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_width_cbf3ec224a6defe2: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_set_write_mask_949f521dcf3da2b5: function(arg0, arg1) {
            arg0.writeMask = arg1 >>> 0;
        },
        __wbg_set_x_15a4c893b3366fab: function(arg0, arg1) {
            arg0.x = arg1 >>> 0;
        },
        __wbg_set_x_61040538c5b06e30: function(arg0, arg1) {
            arg0.x = arg1;
        },
        __wbg_set_x_7aa02c5d013f6852: function(arg0, arg1) {
            arg0.x = arg1 >>> 0;
        },
        __wbg_set_xr_compatible_d76396087f76b85c: function(arg0, arg1) {
            arg0.xrCompatible = arg1 !== 0;
        },
        __wbg_set_y_3e0c514698974674: function(arg0, arg1) {
            arg0.y = arg1;
        },
        __wbg_set_y_80ad367d70451024: function(arg0, arg1) {
            arg0.y = arg1 >>> 0;
        },
        __wbg_set_y_c631920a1c51a694: function(arg0, arg1) {
            arg0.y = arg1 >>> 0;
        },
        __wbg_set_year_f6c69e94cad49e1a: function(arg0, arg1) {
            arg0.year = __wbindgen_enum_YearFormat[arg1];
        },
        __wbg_set_years_5ebaf82706b054a0: function(arg0, arg1) {
            arg0.years = __wbindgen_enum_DurationUnitStyle[arg1];
        },
        __wbg_set_years_display_7224f43fa2d73a40: function(arg0, arg1) {
            arg0.yearsDisplay = __wbindgen_enum_DurationUnitDisplay[arg1];
        },
        __wbg_set_years_fcae3f61a3b92a01: function(arg0, arg1) {
            arg0.years = arg1;
        },
        __wbg_set_z_7c526101c55ea2ae: function(arg0, arg1) {
            arg0.z = arg1 >>> 0;
        },
        __wbg_share_ced3a3517298cb8b: function(arg0) {
            const ret = arg0.share();
            return ret;
        },
        __wbg_shiftKey_9bcb8bdd60c2f152: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_shiftKey_9f797da486b2ade8: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_showPopover_946be83fc4879638: function() { return handleError(function (arg0) {
            arg0.showPopover();
        }, arguments); },
        __wbg_sign_52e0d538fcb964bc: function(arg0) {
            const ret = Math.sign(arg0);
            return ret;
        },
        __wbg_signal_dad7cb35193abd31: function(arg0) {
            const ret = arg0.signal;
            return ret;
        },
        __wbg_sin_a92d00656ef1c707: function(arg0) {
            const ret = Math.sin(arg0);
            return ret;
        },
        __wbg_sinh_b19c09934bdf1497: function(arg0) {
            const ret = Math.sinh(arg0);
            return ret;
        },
        __wbg_size_0549be120b7831da: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_size_4fa0d595eec3eeaa: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_size_6304a694765921a9: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_size_728a9e2291fa6f33: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_sizes_0c71009ac4d99c9c: function(arg0, arg1) {
            const ret = arg1.sizes;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_slice_07b00d5aeb7317cb: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.slice(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_slice_109042cc8752f09c: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_286ae4b026f556f2: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_3f3ef3d6f5de7c5d: function(arg0, arg1) {
            const ret = arg0.slice(arg1 >>> 0);
            return ret;
        },
        __wbg_slice_41905a9c100ad1e7: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_4e23568a8576052e: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_50189eefc9ab9fe9: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_561bdd81feb68bef: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_70d775304b971373: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_7613fec29d5f6070: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_76d47c88534ecfed: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.slice(arg1, arg2, getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_slice_7a42bfd5bade9394: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.slice(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_slice_7b953f8c0fd745e6: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_7c7553e3b38b0ddb: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.slice(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_slice_870641f17beea85f: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_88ddbcf260ffeebb: function() { return handleError(function (arg0) {
            const ret = arg0.slice();
            return ret;
        }, arguments); },
        __wbg_slice_8bfe0986384f055b: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.slice(arg1);
            return ret;
        }, arguments); },
        __wbg_slice_98cd7bf3da2f2620: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_9c25c8bad6aa57e2: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_adcbc7d8f3e64384: function(arg0, arg1) {
            const ret = arg0.slice(arg1);
            return ret;
        },
        __wbg_slice_b8db0617dc20726f: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_c16b990fd67f1b72: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.slice(arg1, arg2, getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_slice_c2dafe9a9ec7640d: function(arg0, arg1) {
            const ret = arg0.slice(arg1 >>> 0);
            return ret;
        },
        __wbg_slice_caea6ea823a06862: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.slice(arg1, arg2, getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_slice_cb03a33a82ec3490: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.slice(arg1);
            return ret;
        }, arguments); },
        __wbg_slice_cf1dca3a4ef5e1b1: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_e974a6b6107ae45d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.slice(arg1, arg2, getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_slice_ecaaa67ec7cf96c1: function(arg0, arg1, arg2) {
            const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_slice_fc4405db321fb74e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.slice(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_slice_from_949279df62a51841: function(arg0, arg1) {
            const ret = arg0.slice_from(arg1);
            return ret;
        },
        __wbg_slot_6489253a1b14f177: function(arg0, arg1) {
            const ret = arg1.slot;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_source_0974da74fc6843b4: function(arg0) {
            const ret = arg0.source;
            return ret;
        },
        __wbg_source_3a49938ce9e019fc: function(arg0) {
            const ret = arg0.source;
            return (__wbindgen_enum_RangeSource.indexOf(ret) + 1 || 4) - 1;
        },
        __wbg_source_f9fe135da1f1f34d: function(arg0) {
            const ret = arg0.source;
            return (__wbindgen_enum_RangeSource.indexOf(ret) + 1 || 4) - 1;
        },
        __wbg_species_bf4835d6aefe6c8f: function() {
            const ret = Symbol.species;
            return ret;
        },
        __wbg_spellcheck_82e2ede8c5c4ee15: function(arg0) {
            const ret = arg0.spellcheck;
            return ret;
        },
        __wbg_split_35b2e284e584236b: function(arg0, arg1, arg2) {
            const ret = arg0.split(arg1, arg2 >>> 0);
            return ret;
        },
        __wbg_split_5c48ec1de3f62fa1: function(arg0, arg1, arg2) {
            const ret = arg0.split(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_split_884f63025a93f78c: function(arg0, arg1) {
            const ret = arg0.split(arg1);
            return ret;
        },
        __wbg_split_8c8309612d8bc8b7: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.split(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
            return ret;
        },
        __wbg_split_b8e7b87ddc302bad: function() {
            const ret = Symbol.split;
            return ret;
        },
        __wbg_sqrt_17fdc18ba4b4d3f6: function(arg0) {
            const ret = Math.sqrt(arg0);
            return ret;
        },
        __wbg_src_7fc3cdb6ee9e7f25: function(arg0, arg1) {
            const ret = arg1.src;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_src_a7a593a168101659: function(arg0, arg1) {
            const ret = arg1.src;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_srcset_6b08d520542837b3: function(arg0, arg1) {
            const ret = arg1.srcset;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_stackTraceLimit_3b8316fad0e8f8c0: function() {
            const ret = Error.stackTraceLimit;
            return ret;
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_stack_da3b17099b935241: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_startWorkers_622cedd0d351664e: function(arg0, arg1, arg2) {
            const ret = startWorkers(arg0, arg1, wbg_rayon_PoolBuilder.__wrap(arg2));
            return ret;
        },
        __wbg_start_d0cdf16ff965b3f3: function(arg0) {
            arg0.start();
        },
        __wbg_startsWith_c3893a292e0286f0: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.startsWith(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
            return ret;
        },
        __wbg_state_88685e498e5cdef6: function(arg0) {
            const ret = arg0.state;
            return (__wbindgen_enum_PermissionState.indexOf(ret) + 1 || 4) - 1;
        },
        __wbg_static_accessor_GLOBAL_4ef717fb391d88b7: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_8d1badc68b5a74f4: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_PI_71b8c8e7bd1f3c99: function() {
            const ret = Math.PI;
            return ret;
        },
        __wbg_static_accessor_SELF_146583524fe1469b: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_URL_151cb8815849ce83: function() {
            const ret = import.meta.url;
            return ret;
        },
        __wbg_static_accessor_WINDOW_f2829a2234d7819e: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_status_8705b9bb65b15b32: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.status;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_sticky_9c0aa475016bd0e0: function(arg0) {
            const ret = arg0.sticky;
            return ret;
        },
        __wbg_stopImmediatePropagation_9d6184b091471f50: function(arg0) {
            arg0.stopImmediatePropagation();
        },
        __wbg_stopPropagation_4c4ff88c29f9bc38: function(arg0) {
            arg0.stopPropagation();
        },
        __wbg_stop_5f9f525b4bf94d85: function() { return handleError(function (arg0) {
            arg0.stop();
        }, arguments); },
        __wbg_stringify_21d875cf8dfc16aa: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = JSON.stringify(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_stringify_aa6789ace279a2b4: function() { return handleError(function (arg0, arg1) {
            const ret = JSON.stringify(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_stringify_b54333f60f1e4dad: function() { return handleError(function (arg0) {
            const ret = JSON.stringify(arg0);
            return ret;
        }, arguments); },
        __wbg_stringify_cb28f0beac83ad25: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            var v0 = getArrayJsValueFromWasm0(arg1, arg2).slice();
            wasm.__wbindgen_free(arg1, arg2 * 4, 4);
            const ret = JSON.stringify(arg0, v0, arg3 === Number.MAX_SAFE_INTEGER ? undefined : arg3);
            return ret;
        }, arguments); },
        __wbg_style_6657aed849e5d757: function(arg0) {
            const ret = arg0.style;
            return ret;
        },
        __wbg_subarray_04160386a549d86f: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_0ad2c50f51b1487f: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_12dd508b6628276c: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_39d6fc2d86c2d358: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_3d94e7804b3b873c: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_3ed232c8a6baee09: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_63aa3c534afb45e1: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_9c4c11e61a1051bd: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_a56ebf2f706a121d: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_c232347f0cf7d5b8: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_d4794a2bdda0638d: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_subarray_fadb1cc274dc799b: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_submit_b3bbead76cbf7627: function(arg0, arg1) {
            arg0.submit(arg1);
        },
        __wbg_substr_ae8b181746896559: function(arg0, arg1, arg2) {
            const ret = arg0.substr(arg1, arg2);
            return ret;
        },
        __wbg_substring_6066945ca77b3326: function(arg0, arg1, arg2) {
            const ret = arg0.substring(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_supportedLocalesOf_0550dbcd3f62f7c0: function(arg0, arg1) {
            const ret = Intl.PluralRules.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedLocalesOf_5b6c5318fbd7a84a: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Intl.DurationFormat.supportedLocalesOf(getArrayJsValueViewFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_supportedLocalesOf_647866ec603d840f: function(arg0, arg1) {
            const ret = Intl.NumberFormat.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedLocalesOf_7b8ab117db5cb5eb: function(arg0, arg1) {
            const ret = Intl.Collator.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedLocalesOf_7f106ba810afd624: function(arg0, arg1) {
            const ret = Intl.RelativeTimeFormat.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedLocalesOf_ba3bd117b3821cc2: function(arg0, arg1) {
            const ret = Intl.DateTimeFormat.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedLocalesOf_f4317c813959bee2: function(arg0, arg1) {
            const ret = Intl.ListFormat.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedLocalesOf_f522f9db7359e304: function(arg0, arg1) {
            const ret = Intl.DisplayNames.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedLocalesOf_fea7f5d1f3971f9e: function(arg0, arg1) {
            const ret = Intl.Segmenter.supportedLocalesOf(arg0, arg1);
            return ret;
        },
        __wbg_supportedValuesOf_6065db5f94517229: function(arg0) {
            const ret = Intl.supportedValuesOf(__wbindgen_enum_SupportedValuesKey[arg0]);
            return ret;
        },
        __wbg_tabIndex_efb7fb245468a1d8: function(arg0) {
            const ret = arg0.tabIndex;
            return ret;
        },
        __wbg_table_112efcc219bdab54: function(arg0, arg1, arg2, arg3) {
            console.table(arg0, arg1, arg2, arg3);
        },
        __wbg_table_4f25af62f522535a: function(arg0) {
            console.table(arg0);
        },
        __wbg_table_93bf28f0c1a45ce9: function() {
            console.table();
        },
        __wbg_table_a8055e7465f59eaa: function(arg0, arg1, arg2, arg3, arg4) {
            console.table(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_table_b6a3443847e3e76c: function(arg0, arg1, arg2) {
            console.table(arg0, arg1, arg2);
        },
        __wbg_table_c83ffd2caaed189f: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.table(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_table_c87d1edab12036a4: function(arg0) {
            console.table(...arg0);
        },
        __wbg_table_c87df3d272b67ea8: function(arg0, arg1) {
            console.table(arg0, arg1);
        },
        __wbg_table_e7ec646f88515274: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.table(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_tagName_d99c8072027f3c98: function(arg0, arg1) {
            const ret = arg1.tagName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_taintEnabled_a46108d0140fdcbc: function(arg0) {
            const ret = arg0.taintEnabled();
            return ret;
        },
        __wbg_taintEnabled_a8bc4d8d42f639df: function(arg0) {
            const ret = arg0.taintEnabled();
            return ret;
        },
        __wbg_takeRecords_c14f909b7de08452: function(arg0) {
            const ret = arg0.takeRecords();
            return ret;
        },
        __wbg_tan_b1654febbf4cbc76: function(arg0) {
            const ret = Math.tan(arg0);
            return ret;
        },
        __wbg_tangentialPressure_979a239d3db31d90: function(arg0) {
            const ret = arg0.tangentialPressure;
            return ret;
        },
        __wbg_tanh_2976798ec4faadb7: function(arg0) {
            const ret = Math.tanh(arg0);
            return ret;
        },
        __wbg_target_40228f69bb78cd78: function(arg0) {
            const ret = arg0.target;
            return ret;
        },
        __wbg_target_e759594a8d965ed7: function(arg0) {
            const ret = arg0.target;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_target_fa5e405a9917761c: function(arg0) {
            const ret = arg0.target;
            return ret;
        },
        __wbg_terminate_13d19661bbbf7d2b: function(arg0) {
            arg0.terminate();
        },
        __wbg_test_7708f974fd4132d1: function(arg0, arg1, arg2) {
            const ret = arg0.test(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_textContent_37277f66248f39e6: function(arg0, arg1) {
            const ret = arg1.textContent;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_text_6cbd5d8b47ddd2e2: function(arg0) {
            const ret = arg0.text();
            return ret;
        },
        __wbg_then_16d107c451e9905d: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_4a0b9283a66c4a8a: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_6ec10ae38b3e92f7: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_then_e0960b859f3ff223: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_thresholds_d911e344e2f651be: function(arg0) {
            const ret = arg0.thresholds;
            return ret;
        },
        __wbg_throwIfAborted_ec174d1ccb1799c7: function(arg0) {
            arg0.throwIfAborted();
        },
        __wbg_tiltX_1327e8185e612854: function(arg0) {
            const ret = arg0.tiltX;
            return ret;
        },
        __wbg_tiltY_b44744ee36b60a24: function(arg0) {
            const ret = arg0.tiltY;
            return ret;
        },
        __wbg_timeEnd_e5f48df998f5ff90: function() {
            console.timeEnd();
        },
        __wbg_timeEnd_f85c79940e84538e: function(arg0, arg1) {
            console.timeEnd(getStringFromWasm0(arg0, arg1));
        },
        __wbg_timeLog_07789cd360564af9: function(arg0, arg1, arg2) {
            console.timeLog(getStringFromWasm0(arg0, arg1), ...arg2);
        },
        __wbg_timeLog_26e6b8037b812023: function() {
            console.timeLog();
        },
        __wbg_timeLog_27968a855510d11d: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.timeLog(getStringFromWasm0(arg0, arg1), arg2, arg3, arg4, arg5);
        },
        __wbg_timeLog_34f493f5e9a37d3d: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            console.timeLog(getStringFromWasm0(arg0, arg1), arg2, arg3, arg4, arg5, arg6, arg7);
        },
        __wbg_timeLog_476e12c737b69134: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            console.timeLog(getStringFromWasm0(arg0, arg1), arg2, arg3, arg4, arg5, arg6, arg7, arg8);
        },
        __wbg_timeLog_6afda85d186d78b9: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.timeLog(getStringFromWasm0(arg0, arg1), arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_timeLog_6d43a4b3cc0f4cf9: function(arg0, arg1, arg2, arg3) {
            console.timeLog(getStringFromWasm0(arg0, arg1), arg2, arg3);
        },
        __wbg_timeLog_9c50c10f06026c78: function(arg0, arg1, arg2) {
            console.timeLog(getStringFromWasm0(arg0, arg1), arg2);
        },
        __wbg_timeLog_aca889c52238a723: function(arg0, arg1, arg2, arg3, arg4) {
            console.timeLog(getStringFromWasm0(arg0, arg1), arg2, arg3, arg4);
        },
        __wbg_timeLog_b7de1ed8e418a2d4: function(arg0, arg1) {
            console.timeLog(getStringFromWasm0(arg0, arg1));
        },
        __wbg_timeOrigin_f3d5cb4f4a06c2b7: function(arg0) {
            const ret = arg0.timeOrigin;
            return ret;
        },
        __wbg_timeStamp_8a528cb713add460: function(arg0) {
            const ret = arg0.timeStamp;
            return ret;
        },
        __wbg_timeStamp_dbeada45831a7008: function(arg0) {
            console.timeStamp(arg0);
        },
        __wbg_timeStamp_ff4b1c156db5a139: function() {
            console.timeStamp();
        },
        __wbg_time_2e33e99ff5e53342: function(arg0) {
            const ret = arg0.time;
            return ret;
        },
        __wbg_time_77255c558062efdd: function() {
            console.time();
        },
        __wbg_time_d8fd9f1e13010904: function(arg0, arg1) {
            console.time(getStringFromWasm0(arg0, arg1));
        },
        __wbg_timeout_c971ded6d319fad2: function(arg0) {
            const ret = AbortSignal.timeout(arg0 >>> 0);
            return ret;
        },
        __wbg_timeout_df02707466d81ebc: function(arg0) {
            const ret = AbortSignal.timeout(arg0);
            return ret;
        },
        __wbg_timestamp_263c471d3598c2cc: function(arg0) {
            const ret = arg0.timestamp;
            return ret;
        },
        __wbg_title_689afa27fa89942f: function(arg0, arg1) {
            const ret = arg1.title;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_title_df570de46efe173d: function(arg0, arg1) {
            const ret = arg1.title;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_toBlob_2f2b08c0b513338f: function() { return handleError(function (arg0, arg1) {
            arg0.toBlob(arg1);
        }, arguments); },
        __wbg_toBlob_7dd6de8c6c371f03: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.toBlob(arg1, getStringFromWasm0(arg2, arg3), arg4);
        }, arguments); },
        __wbg_toBlob_9c2eeb754b0d990e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.toBlob(arg1, getStringFromWasm0(arg2, arg3));
        }, arguments); },
        __wbg_toDataURL_6e1e3274d6d1e066: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.toDataURL(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_toDataURL_82ab3262e4f2a904: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.toDataURL();
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_toDataURL_f198571e2347dfcc: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg1.toDataURL(getStringFromWasm0(arg2, arg3), arg4);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_toDateString_953d24f18931897e: function(arg0) {
            const ret = arg0.toDateString();
            return ret;
        },
        __wbg_toExponential_2759ee8b927403fd: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.toExponential(arg1);
            return ret;
        }, arguments); },
        __wbg_toFixed_c84dd9cd0645c838: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.toFixed(arg1);
            return ret;
        }, arguments); },
        __wbg_toISOString_706fbe321055ee58: function(arg0) {
            const ret = arg0.toISOString();
            return ret;
        },
        __wbg_toJSON_169f2713e936e041: function(arg0) {
            const ret = arg0.toJSON();
            return ret;
        },
        __wbg_toJSON_dbf86655b7040058: function(arg0) {
            const ret = arg0.toJSON();
            return ret;
        },
        __wbg_toJSON_fb23b2f02354079e: function(arg0, arg1) {
            const ret = arg1.toJSON();
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_toLocaleDateString_ed6140e9fe0a436e: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.toLocaleDateString(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_toLocaleLowerCase_b8faaee3151d773a: function(arg0, arg1, arg2) {
            const ret = arg0.toLocaleLowerCase(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_toLocaleString_09a867f646b9e754: function(arg0, arg1, arg2) {
            const ret = arg0.toLocaleString(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_toLocaleString_56e60a1f6a19a551: function(arg0, arg1, arg2) {
            const ret = arg0.toLocaleString(arg1, arg2);
            return ret;
        },
        __wbg_toLocaleString_a215c3af6195af14: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.toLocaleString(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_toLocaleTimeString_7ce08015b8452f2e: function(arg0, arg1, arg2) {
            const ret = arg0.toLocaleTimeString(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_toLocaleTimeString_7fb84bc6bafd99b2: function(arg0, arg1, arg2, arg3) {
            const ret = arg0.toLocaleTimeString(getStringFromWasm0(arg1, arg2), arg3);
            return ret;
        },
        __wbg_toLocaleUpperCase_02f3091210018f46: function(arg0, arg1, arg2) {
            const ret = arg0.toLocaleUpperCase(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_toLowerCase_272aadcc708ab903: function(arg0) {
            const ret = arg0.toLowerCase();
            return ret;
        },
        __wbg_toPrecision_6db7caee76c53b49: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.toPrecision(arg1);
            return ret;
        }, arguments); },
        __wbg_toPrimitive_b7f405d57584e6fe: function() {
            const ret = Symbol.toPrimitive;
            return ret;
        },
        __wbg_toStringTag_12a34f1f63cc44a2: function() {
            const ret = Symbol.toStringTag;
            return ret;
        },
        __wbg_toString_34387d7c1df9ca1e: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.toString(arg1);
            return ret;
        }, arguments); },
        __wbg_toString_37f13d438de4345d: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_toString_3d20d3237ba3bb9e: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_toString_46e86b317c7cdea9: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_toString_693a6de9f92aacb6: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.toString(arg1);
            return ret;
        }, arguments); },
        __wbg_toString_69685a9042b81095: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_toString_6a94911348396720: function(arg0, arg1, arg2) {
            const ret = arg1.toString(arg2);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_toString_7427511c7d7dae62: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_toString_b7a5db6304065e8d: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.toString(arg1);
            return ret;
        }, arguments); },
        __wbg_toString_bac9199ff382784d: function(arg0) {
            const ret = arg0.toString();
            return ret;
        },
        __wbg_toTimeString_6b433cdc7a9d2670: function(arg0) {
            const ret = arg0.toTimeString();
            return ret;
        },
        __wbg_toUTCString_ac08a1827905dee0: function(arg0) {
            const ret = arg0.toUTCString();
            return ret;
        },
        __wbg_toUpperCase_ba6a2e8b1ed2f0e6: function(arg0) {
            const ret = arg0.toUpperCase();
            return ret;
        },
        __wbg_toggleAttribute_6b04726726e713ac: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.toggleAttribute(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_toggleAttribute_fb196adcf6d64b7c: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.toggleAttribute(getStringFromWasm0(arg1, arg2), arg3 !== 0);
            return ret;
        }, arguments); },
        __wbg_togglePopover_391ba715d0e726ef: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.togglePopover(arg1 !== 0);
            return ret;
        }, arguments); },
        __wbg_togglePopover_e302a273e9007268: function() { return handleError(function (arg0) {
            const ret = arg0.togglePopover();
            return ret;
        }, arguments); },
        __wbg_top_519cba15d8f4bcea: function() { return handleError(function (arg0) {
            const ret = arg0.top;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_top_7aab1bdb00861bf3: function() { return handleError(function (arg0) {
            const ret = arg0.top;
            return ret;
        }, arguments); },
        __wbg_top_fe120acfa924a430: function(arg0) {
            const ret = arg0.top;
            return ret;
        },
        __wbg_trace_09cc2dcc092674ea: function(arg0) {
            console.trace(arg0);
        },
        __wbg_trace_11b7832abd361806: function(arg0) {
            console.trace(...arg0);
        },
        __wbg_trace_20e328c7e447e31d: function(arg0, arg1) {
            console.trace(arg0, arg1);
        },
        __wbg_trace_30db18bce460423c: function(arg0, arg1, arg2, arg3) {
            console.trace(arg0, arg1, arg2, arg3);
        },
        __wbg_trace_3bd549ec5e569d84: function() {
            console.trace();
        },
        __wbg_trace_8223bd577d779b64: function(arg0, arg1, arg2) {
            console.trace(arg0, arg1, arg2);
        },
        __wbg_trace_b01e08685b570dbf: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.trace(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_trace_b98a800ee4016e9e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.trace(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_trace_ee2c74b674f3e3ce: function(arg0, arg1, arg2, arg3, arg4) {
            console.trace(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_transferControlToOffscreen_9f1c9bd56e30dc6d: function() { return handleError(function (arg0) {
            const ret = arg0.transferControlToOffscreen();
            return ret;
        }, arguments); },
        __wbg_transferFromImageBitmap_c786633bfc7576f0: function(arg0, arg1) {
            arg0.transferFromImageBitmap(arg1);
        },
        __wbg_transferImageBitmap_ffc898698df718bf: function(arg0, arg1) {
            arg0.transferImageBitmap(arg1);
        },
        __wbg_transferToFixedLength_1f4529f0e22467ff: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.transferToFixedLength(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_transferToFixedLength_7406df0d76632536: function() { return handleError(function (arg0) {
            const ret = arg0.transferToFixedLength();
            return ret;
        }, arguments); },
        __wbg_transferToImageBitmap_ea143ef2c0d72e79: function() { return handleError(function (arg0) {
            const ret = arg0.transferToImageBitmap();
            return ret;
        }, arguments); },
        __wbg_transfer_58e6e95835e7b557: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.transfer(arg1 >>> 0);
            return ret;
        }, arguments); },
        __wbg_transfer_5ad162e0587345f2: function() { return handleError(function (arg0) {
            const ret = arg0.transfer();
            return ret;
        }, arguments); },
        __wbg_trimEnd_1eab7fb94df331f8: function(arg0) {
            const ret = arg0.trimEnd();
            return ret;
        },
        __wbg_trimLeft_f0219d48f134fddb: function(arg0) {
            const ret = arg0.trimLeft();
            return ret;
        },
        __wbg_trimRight_2285f3bf3ca0e2f8: function(arg0) {
            const ret = arg0.trimRight();
            return ret;
        },
        __wbg_trimStart_7a95d0210264ebd4: function(arg0) {
            const ret = arg0.trimStart();
            return ret;
        },
        __wbg_trim_04b1918249ffdfc4: function(arg0) {
            const ret = arg0.trim();
            return ret;
        },
        __wbg_trunc_c4b15091a6e3c2dd: function(arg0) {
            const ret = Math.trunc(arg0);
            return ret;
        },
        __wbg_twist_6cc18194426f8a4f: function(arg0) {
            const ret = arg0.twist;
            return ret;
        },
        __wbg_type_06f2150affb3c059: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_type_462c1aac6ae0d7ca: function() { return handleError(function (arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_OrientationType.indexOf(ret) + 1 || 5) - 1;
        }, arguments); },
        __wbg_type_6fb69495a3f818e9: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_GpuCompilationMessageType.indexOf(ret) + 1 || 4) - 1;
        },
        __wbg_type_884d3c04e730e49f: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_GpuQueryType.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_type_9d13c17ea2611dd0: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_type__a8c89b15a4c49d39: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_ListFormatPartType.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_type__c42bfe9a61311bfe: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_DurationFormatPartType.indexOf(ret) + 1 || 15) - 1;
        },
        __wbg_type__d3a05c589e5649af: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_DateTimeFormatPartType.indexOf(ret) + 1 || 15) - 1;
        },
        __wbg_type__d5edadc068b91e06: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_NumberFormatPartType.indexOf(ret) + 1 || 18) - 1;
        },
        __wbg_type__fecdfd3399d1caba: function(arg0) {
            const ret = arg0.type;
            return (__wbindgen_enum_RelativeTimeFormatPartType.indexOf(ret) + 1 || 5) - 1;
        },
        __wbg_unconfigure_10c37687ea9b5106: function(arg0) {
            arg0.unconfigure();
        },
        __wbg_unescape_db51f9ff33e8d49e: function(arg0, arg1) {
            const ret = unescape(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_unicode_8e7d3c692096a85f: function(arg0) {
            const ret = arg0.unicode;
            return ret;
        },
        __wbg_unit_6530a1966af8757e: function(arg0) {
            const ret = arg0.unit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_unit_9d79127c40995352: function(arg0) {
            const ret = arg0.unit;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_unlock_4ded260fc0ac7e4d: function() { return handleError(function (arg0) {
            arg0.unlock();
        }, arguments); },
        __wbg_unmap_817a2e3248a553fb: function(arg0) {
            arg0.unmap();
        },
        __wbg_unobserve_41a4f85162f1fb18: function(arg0, arg1) {
            arg0.unobserve(arg1);
        },
        __wbg_unobserve_6ff2885ff0e2d81b: function(arg0, arg1) {
            arg0.unobserve(arg1);
        },
        __wbg_unregister_79233a83ad1d811e: function(arg0, arg1) {
            const ret = arg0.unregister(arg1);
            return ret;
        },
        __wbg_unscopables_bab26399096c8cca: function() {
            const ret = Symbol.unscopables;
            return ret;
        },
        __wbg_usage_265ef3d88b112387: function(arg0) {
            const ret = arg0.usage;
            return ret;
        },
        __wbg_usage_f45aad6a67d936e5: function(arg0) {
            const ret = arg0.usage;
            return ret;
        },
        __wbg_useMap_e506bc25a6e698bb: function(arg0, arg1) {
            const ret = arg1.useMap;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_userAgentData_31b8f893e8977e94: function(arg0) {
            const ret = arg0.userAgentData;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_userAgent_0558f0ac642f7771: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.userAgent;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_userAgent_fc05e84c36de8392: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.userAgent;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_username_bfc1b7706c6f9446: function(arg0, arg1) {
            const ret = arg1.username;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_validate_2bf76e0e61374b8e: function() { return handleError(function (arg0) {
            const ret = WebAssembly.validate(arg0);
            return ret;
        }, arguments); },
        __wbg_valueOf_5b0489ea195cd374: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_valueOf_64f89f12f08671ee: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_valueOf_709f78d774dee651: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_valueOf_8c5f61f8f95fa8eb: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_valueOf_c40195ad4f57fa83: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_valueOf_cc637e7b8ebe8757: function(arg0) {
            const ret = arg0.valueOf();
            return ret;
        },
        __wbg_valueOf_f46840815d924cb2: function(arg0, arg1) {
            const ret = arg0.valueOf(arg1);
            return ret;
        },
        __wbg_value_0ead0214cedbe608: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_3a0e7e28a91afa29: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_3fd06e9d75174430: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_5bf3641a3c74fb47: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_6f97204ae88cca4b: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_99213de42db60201: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_9ded59b24cb7a25e: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_value_a5d5488a9589444a: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_values_b7f01429faf0eb6f: function(arg0) {
            const ret = arg0.values();
            return ret;
        },
        __wbg_values_f2dbbd87e201e7ff: function(arg0) {
            const ret = arg0.values();
            return ret;
        },
        __wbg_values_fab372ffa8f40fa6: function(arg0) {
            const ret = arg0.values();
            return ret;
        },
        __wbg_vendor_caeaa48e3b709bf1: function(arg0, arg1) {
            const ret = arg1.vendor;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_vibrate_3e02541c1878692d: function(arg0, arg1) {
            const ret = arg0.vibrate(arg1 >>> 0);
            return ret;
        },
        __wbg_vibrate_9c627b9b9d70845b: function(arg0, arg1) {
            const ret = arg0.vibrate(arg1);
            return ret;
        },
        __wbg_videoHeight_1420ccecd0b8b9a1: function(arg0) {
            const ret = arg0.videoHeight;
            return ret;
        },
        __wbg_videoWidth_3c582f863b387cd5: function(arg0) {
            const ret = arg0.videoWidth;
            return ret;
        },
        __wbg_view_1479dafd6323baba: function(arg0) {
            const ret = arg0.view;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_visibilityState_301d0905e8103e21: function(arg0) {
            const ret = arg0.visibilityState;
            return (__wbindgen_enum_VisibilityState.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_visibleRect_34eeedd11b5e6dd4: function(arg0) {
            const ret = arg0.visibleRect;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_volume_0d3710f0b32c6631: function(arg0) {
            const ret = arg0.volume;
            return ret;
        },
        __wbg_vspace_b17036cd70e5225d: function(arg0) {
            const ret = arg0.vspace;
            return ret;
        },
        __wbg_waitAsync_06c45f5361ba204a: function() {
            const ret = Atomics.waitAsync;
            return ret;
        },
        __wbg_waitAsync_6fd4a9df4a6f4efa: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_waitAsync_762ad704d525bb56: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2);
            return ret;
        }, arguments); },
        __wbg_waitAsync_8a69afaef784dfa2: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_waitAsync_919777b30820ea59: function(arg0, arg1, arg2) {
            const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2);
            return ret;
        },
        __wbg_waitAsync_f93f4a9bf1f8df8f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2);
            return ret;
        }, arguments); },
        __wbg_wait_55efa0baf937c96d: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = Atomics.wait(arg0, arg1 >>> 0, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_wait_6e0004d18f12deb4: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = Atomics.wait(arg0, arg1 >>> 0, arg2, arg3);
            return ret;
        }, arguments); },
        __wbg_wait_8175694a47b048b4: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Atomics.wait(arg0, arg1 >>> 0, arg2);
            return ret;
        }, arguments); },
        __wbg_wait_fdb0d428903ddca3: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Atomics.wait(arg0, arg1 >>> 0, arg2);
            return ret;
        }, arguments); },
        __wbg_warn_4ac876651e3d18f2: function(arg0, arg1, arg2, arg3, arg4) {
            console.warn(arg0, arg1, arg2, arg3, arg4);
        },
        __wbg_warn_4c4216becd9753cd: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            console.warn(arg0, arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_warn_5b6b926b392ba289: function(arg0) {
            console.warn(...arg0);
        },
        __wbg_warn_77c4eb4a21e10a21: function(arg0, arg1, arg2, arg3) {
            console.warn(arg0, arg1, arg2, arg3);
        },
        __wbg_warn_a6bc74b7f8bb621d: function(arg0, arg1, arg2) {
            console.warn(arg0, arg1, arg2);
        },
        __wbg_warn_b1370d804fa3e259: function(arg0) {
            console.warn(arg0);
        },
        __wbg_warn_cdfa02ba027a4ae0: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            console.warn(arg0, arg1, arg2, arg3, arg4, arg5);
        },
        __wbg_warn_ef97a01ad7900eb3: function(arg0, arg1) {
            console.warn(arg0, arg1);
        },
        __wbg_warn_f1a48de3839bdfd2: function() {
            console.warn();
        },
        __wbg_wbg_rayon_poolbuilder_new: function(arg0) {
            const ret = wbg_rayon_PoolBuilder.__wrap(arg0);
            return ret;
        },
        __wbg_wbg_rayon_poolbuilder_unwrap: function(arg0) {
            const ret = wbg_rayon_PoolBuilder.__unwrap(arg0);
            return ret;
        },
        __wbg_webkitExitFullscreen_f487871f11a8185e: function(arg0) {
            arg0.webkitExitFullscreen();
        },
        __wbg_webkitFullscreenElement_4055d847f8ff064e: function(arg0) {
            const ret = arg0.webkitFullscreenElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_webkitMatchesSelector_5344d2bba3a46d54: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.webkitMatchesSelector(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_webkitRequestFullscreen_c4ec4df7be373ffd: function(arg0) {
            arg0.webkitRequestFullscreen();
        },
        __wbg_weekend_a2d8509703c8107c: function(arg0) {
            const ret = arg0.weekend;
            return ret;
        },
        __wbg_weeks_ee235e3a64204621: function(arg0, arg1) {
            const ret = arg1.weeks;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg_wgslLanguageFeatures_63fb0e3f15726e44: function(arg0) {
            const ret = arg0.wgslLanguageFeatures;
            return ret;
        },
        __wbg_which_2581ad72d145bb59: function(arg0) {
            const ret = arg0.which;
            return ret;
        },
        __wbg_width_05a6fecf7eca198d: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_1509a04e42443011: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_16032a5bda5e6fa9: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_20c45c895834b83f: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_219185400361db86: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_6d9315ecc7140ff6: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_803b57798d6492f2: function() { return handleError(function (arg0) {
            const ret = arg0.width;
            return ret;
        }, arguments); },
        __wbg_width_a95a2ee1a2f283f7: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_c1e3781335067e0c: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_d2f212a0df13e242: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_f9b3cbe357a34b85: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_window_485f1d4f36f3e14d: function(arg0) {
            const ret = arg0.window;
            return ret;
        },
        __wbg_writeBuffer_0b5d9d97c1a85db3: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_10f1491ed446b8dc: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_15adf0ae25e37957: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3);
        }, arguments); },
        __wbg_writeBuffer_15f6d28df2babd0a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2 >>> 0, getArrayU8FromWasm0(arg3, arg4), arg5 >>> 0, arg6);
        }, arguments); },
        __wbg_writeBuffer_24a10bfd5a8a57f7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4), arg5, arg6);
        }, arguments); },
        __wbg_writeBuffer_3018ccacf473abd0: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3);
        }, arguments); },
        __wbg_writeBuffer_309f911b0583d2d8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4), arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_30b8aada9c04a9bb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, getArrayU8FromWasm0(arg3, arg4), arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_38ddcd1fd6a000c9: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4), arg5 >>> 0, arg6);
        }, arguments); },
        __wbg_writeBuffer_4355a8d16a93b5ea: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4 >>> 0, arg5);
        }, arguments); },
        __wbg_writeBuffer_5488192ec822583d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_writeBuffer_5981a230c55894f6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_writeBuffer_6001edb4e62de32b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2 >>> 0, getArrayU8FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_68a1528ef70f2aaf: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.writeBuffer(arg1, arg2, arg3);
        }, arguments); },
        __wbg_writeBuffer_71a33491a9da6a9e: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4);
        }, arguments); },
        __wbg_writeBuffer_763557036e3ae694: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_7aff4fc54d2a4a76: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2 >>> 0, getArrayU8FromWasm0(arg3, arg4), arg5, arg6);
        }, arguments); },
        __wbg_writeBuffer_7d07051f5a6d1364: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_83015f1994d79ae0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4);
        }, arguments); },
        __wbg_writeBuffer_8582bc97de57af8d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2 >>> 0, getArrayU8FromWasm0(arg3, arg4), arg5 >>> 0, arg6 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_85f913ff21af22fd: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_946025d7a03a20cc: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.writeBuffer(arg1, arg2, arg3);
        }, arguments); },
        __wbg_writeBuffer_97eda2ceb0f7ffe4: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0, arg5);
        }, arguments); },
        __wbg_writeBuffer_a47a64374a9bc24d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4 >>> 0, arg5);
        }, arguments); },
        __wbg_writeBuffer_a964fb7682dd1f4d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_aa4c92e5e975fef8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_ab700c0a19bead49: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4), arg5);
        }, arguments); },
        __wbg_writeBuffer_b0fa5a2b8056a7ba: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_writeBuffer_baafc679b51e0b6d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_bcacf7b226ee8cf7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_bf6830572cc96b0c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_c6904ccc2e3b0316: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4 >>> 0, arg5 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_cb1ab99b37c1c2e1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_ccf84ce45c145463: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4 >>> 0, arg5);
        }, arguments); },
        __wbg_writeBuffer_d6c28228a81e29ae: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_e2d7d8428e3e3cf8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, getArrayU8FromWasm0(arg3, arg4), arg5);
        }, arguments); },
        __wbg_writeBuffer_e4a06189f74477c9: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4), arg5 >>> 0, arg6 >>> 0);
        }, arguments); },
        __wbg_writeBuffer_f0a462bf62052c59: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2 >>> 0, getArrayU8FromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_writeBuffer_f3488dd06269b727: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_writeBuffer_fc442a539f4a6267: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeBuffer(arg1, arg2, getArrayU8FromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_writeBuffer_fdfd56e05bc2d829: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4, arg5);
        }, arguments); },
        __wbg_writeBuffer_fdfddecef0d9a29b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeBuffer(arg1, arg2 >>> 0, arg3, arg4, arg5);
        }, arguments); },
        __wbg_writeTexture_2ab53ebbb9b5dacb: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeTexture(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_writeTexture_3896eb4554d141e0: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeTexture(arg1, getArrayU8FromWasm0(arg2, arg3), arg4, arg5);
        }, arguments); },
        __wbg_writeTexture_9e33f427696efd38: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeTexture(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_writeTexture_a214e2a23a1f00ee: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeTexture(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_writeTexture_acb28796746826c8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.writeTexture(arg1, getArrayU8FromWasm0(arg2, arg3), arg4, arg5);
        }, arguments); },
        __wbg_writeTexture_e587ca26d15c3ecc: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.writeTexture(arg1, arg2, arg3, arg4);
        }, arguments); },
        __wbg_x_050cbaac22887a00: function(arg0) {
            const ret = arg0.x;
            return ret;
        },
        __wbg_x_71553b4e719d215a: function(arg0) {
            const ret = arg0.x;
            return ret;
        },
        __wbg_x_881f8331a1789f24: function(arg0) {
            const ret = arg0.x;
            return ret;
        },
        __wbg_y_111b04aa46dc0f86: function(arg0) {
            const ret = arg0.y;
            return ret;
        },
        __wbg_y_c85e624ce9bc8b84: function(arg0) {
            const ret = arg0.y;
            return ret;
        },
        __wbg_y_cd458b2c5b870c7c: function(arg0) {
            const ret = arg0.y;
            return ret;
        },
        __wbg_years_41b6141ed010cce8: function(arg0, arg1) {
            const ret = arg1.years;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1511, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1933, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueuKb1_ECsiKg0yfXB6ZQ_4wgpu);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 2299, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueINtNtCskbpKeFpB4we_4core6result6ResultuNtB8_7JsErrorEKb1_ECs568dBoJKTdM_6js_sys);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 2301, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtNtCs568dBoJKTdM_6js_sys7futures4task19wait_async_polyfill12MessageEventuKb1_EB1c_);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Array<any>"), NamedExternref("ResizeObserver")], shim_idx: 1519, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress4_1__6invokeNtCs568dBoJKTdM_6js_sys5ArrayNtNtNtCsa6q2MPIHwu3_7web_sys8features18gen_ResizeObserver14ResizeObserveruKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Array<any>")], shim_idx: 1512, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtCs568dBoJKTdM_6js_sys5ArrayuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 1518, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features9gen_Event5EventuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("FocusEvent")], shim_idx: 1513, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features14gen_FocusEvent10FocusEventuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUUncapturedErrorEvent")], shim_idx: 1934, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtNtNtCsiKg0yfXB6ZQ_4wgpu7backend6webgpu10webgpu_sys27gen_GpuUncapturedErrorEvent23GpuUncapturedErrorEventuKb1_EB1e_);
            return ret;
        },
        __wbindgen_cast_000000000000000a: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("KeyboardEvent")], shim_idx: 1516, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features17gen_KeyboardEvent13KeyboardEventuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_000000000000000b: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("PageTransitionEvent")], shim_idx: 1517, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features23gen_PageTransitionEvent19PageTransitionEventuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_000000000000000c: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("PointerEvent")], shim_idx: 1515, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features16gen_PointerEvent12PointerEventuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_000000000000000d: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("WheelEvent")], shim_idx: 1514, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features14gen_WheelEvent10WheelEventuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_000000000000000e: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Option(NamedExternref("Blob"))], shim_idx: 1510, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeINtNtCskbpKeFpB4we_4core6option6OptionNtNtNtCsa6q2MPIHwu3_7web_sys8features8gen_Blob4BlobEuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_000000000000000f: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1509, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress0_1__6invokeuKb1_ECsKhwk8RaeS8_5winit);
            return ret;
        },
        __wbindgen_cast_0000000000000010: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000011: function(arg0) {
            // Cast intrinsic for `I64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000012: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(F32)) -> NamedExternref("Float32Array")`.
            const ret = getArrayF32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000013: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(F64)) -> NamedExternref("Float64Array")`.
            const ret = getArrayF64FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000014: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I16)) -> NamedExternref("Int16Array")`.
            const ret = getArrayI16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000015: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I32)) -> NamedExternref("Int32Array")`.
            const ret = getArrayI32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000016: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I64)) -> NamedExternref("BigInt64Array")`.
            const ret = getArrayI64FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000017: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I8)) -> NamedExternref("Int8Array")`.
            const ret = getArrayI8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000018: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U16)) -> NamedExternref("Uint16Array")`.
            const ret = getArrayU16FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000019: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U32)) -> NamedExternref("Uint32Array")`.
            const ret = getArrayU32FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000001a: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U64)) -> NamedExternref("BigUint64Array")`.
            const ret = getArrayU64FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000001b: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000001c: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8ClampedArray")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000001d: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_000000000000001e: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
        __wbindgen_link_580560c8bba509f2: function(arg0) {
            const val = `onmessage = function (ev) {
                let [ia, index, value] = ev.data;
                ia = new Int32Array(ia.buffer);
                let result = Atomics.wait(ia, index, value);
                postMessage(result);
            };
            `;
            const ret = typeof URL.createObjectURL === 'undefined' ? "data:application/javascript," + encodeURIComponent(val) : URL.createObjectURL(new Blob([val], { type: "text/javascript" }));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        memory: memory || new WebAssembly.Memory({initial:173,maximum:16384,shared:true}),
    };
    return {
        __proto__: null,
        "./infinity-world_bg.js": import0, "__wbindgen_placeholder__": { __wbindgen_describe: function(){}, __wbindgen_describe_cast: function(){} },
    };
}

function __wbg_call_guard() {
    if (__wbg_reinit_scheduled) {
        __wbg_reset_state();
        return;
    }
}
function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress0_1__6invokeuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress0_1__6invokeuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueuKb1_ECsiKg0yfXB6ZQ_4wgpu(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueuKb1_ECsiKg0yfXB6ZQ_4wgpu(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtNtCs568dBoJKTdM_6js_sys7futures4task19wait_async_polyfill12MessageEventuKb1_EB1c_(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtNtCs568dBoJKTdM_6js_sys7futures4task19wait_async_polyfill12MessageEventuKb1_EB1c_(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtCs568dBoJKTdM_6js_sys5ArrayuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtCs568dBoJKTdM_6js_sys5ArrayuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features9gen_Event5EventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features9gen_Event5EventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features14gen_FocusEvent10FocusEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features14gen_FocusEvent10FocusEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtNtNtCsiKg0yfXB6ZQ_4wgpu7backend6webgpu10webgpu_sys27gen_GpuUncapturedErrorEvent23GpuUncapturedErrorEventuKb1_EB1e_(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtNtNtCsiKg0yfXB6ZQ_4wgpu7backend6webgpu10webgpu_sys27gen_GpuUncapturedErrorEvent23GpuUncapturedErrorEventuKb1_EB1e_(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features17gen_KeyboardEvent13KeyboardEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features17gen_KeyboardEvent13KeyboardEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features23gen_PageTransitionEvent19PageTransitionEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features23gen_PageTransitionEvent19PageTransitionEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features16gen_PointerEvent12PointerEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features16gen_PointerEvent12PointerEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features14gen_WheelEvent10WheelEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtNtNtCsa6q2MPIHwu3_7web_sys8features14gen_WheelEvent10WheelEventuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueINtNtCskbpKeFpB4we_4core6result6ResultuNtB8_7JsErrorEKb1_ECs568dBoJKTdM_6js_sys(arg0, arg1, arg2) {
    let ret;
    __wbg_call_guard();
    ret = wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeNtB8_7JsValueINtNtCskbpKeFpB4we_4core6result6ResultuNtB8_7JsErrorEKb1_ECs568dBoJKTdM_6js_sys(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress4_1__6invokeNtCs568dBoJKTdM_6js_sys5ArrayNtNtNtCsa6q2MPIHwu3_7web_sys8features18gen_ResizeObserver14ResizeObserveruKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2, arg3) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress4_1__6invokeNtCs568dBoJKTdM_6js_sys5ArrayNtNtNtCsa6q2MPIHwu3_7web_sys8features18gen_ResizeObserver14ResizeObserveruKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2, arg3);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress4_1__6invokeNtCs568dBoJKTdM_6js_sys8FunctionB14_uKb1_EB16_(arg0, arg1, arg2, arg3) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress4_1__6invokeNtCs568dBoJKTdM_6js_sys8FunctionB14_uKb1_EB16_(arg0, arg1, arg2, arg3);
}

function _RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeINtNtCskbpKeFpB4we_4core6option6OptionNtNtNtCsa6q2MPIHwu3_7web_sys8features8gen_Blob4BlobEuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, arg2) {
    __wbg_call_guard();
    wasm._RINvNvNtNtCsi04qr9bQ90m_12wasm_bindgen7convert8closuress2_1__6invokeINtNtCskbpKeFpB4we_4core6option6OptionNtNtNtCsa6q2MPIHwu3_7web_sys8features8gen_Blob4BlobEuKb1_ECsKhwk8RaeS8_5winit(arg0, arg1, isLikeNone(arg2) ? 0 : addToExternrefTable0(arg2));
}


const __wbindgen_enum_CollatorCaseFirst = ["upper", "lower", "false"];


const __wbindgen_enum_CollatorSensitivity = ["base", "accent", "case", "variant"];


const __wbindgen_enum_CollatorUsage = ["sort", "search"];


const __wbindgen_enum_CompactDisplay = ["short", "long"];


const __wbindgen_enum_CurrencyDisplay = ["code", "symbol", "narrowSymbol", "name"];


const __wbindgen_enum_CurrencySign = ["standard", "accounting"];


const __wbindgen_enum_DateTimeFormatPartType = ["day", "dayPeriod", "era", "fractionalSecond", "hour", "literal", "minute", "month", "relatedYear", "second", "timeZoneName", "weekday", "year", "yearName"];


const __wbindgen_enum_DateTimeStyle = ["full", "long", "medium", "short"];


const __wbindgen_enum_DayFormat = ["numeric", "2-digit"];


const __wbindgen_enum_DayPeriodFormat = ["narrow", "short", "long"];


const __wbindgen_enum_DisplayNamesFallback = ["code", "none"];


const __wbindgen_enum_DisplayNamesLanguageDisplay = ["dialect", "standard"];


const __wbindgen_enum_DisplayNamesStyle = ["long", "short", "narrow"];


const __wbindgen_enum_DisplayNamesType = ["language", "region", "script", "currency", "calendar", "dateTimeField"];


const __wbindgen_enum_DurationFormatPartType = ["years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds", "microseconds", "nanoseconds", "literal", "integer", "decimal", "fraction"];


const __wbindgen_enum_DurationFormatStyle = ["long", "short", "narrow", "digital"];


const __wbindgen_enum_DurationTimeUnitStyle = ["long", "short", "narrow", "numeric", "2-digit"];


const __wbindgen_enum_DurationUnitDisplay = ["auto", "always"];


const __wbindgen_enum_DurationUnitStyle = ["long", "short", "narrow"];


const __wbindgen_enum_EraFormat = ["narrow", "short", "long"];


const __wbindgen_enum_GpuAddressMode = ["clamp-to-edge", "repeat", "mirror-repeat"];


const __wbindgen_enum_GpuBlendFactor = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"];


const __wbindgen_enum_GpuBlendOperation = ["add", "subtract", "reverse-subtract", "min", "max"];


const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];


const __wbindgen_enum_GpuBufferMapState = ["unmapped", "pending", "mapped"];


const __wbindgen_enum_GpuCanvasAlphaMode = ["opaque", "premultiplied"];


const __wbindgen_enum_GpuCanvasToneMappingMode = ["standard", "extended"];


const __wbindgen_enum_GpuCompareFunction = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"];


const __wbindgen_enum_GpuCompilationMessageType = ["error", "warning", "info"];


const __wbindgen_enum_GpuCullMode = ["none", "front", "back"];


const __wbindgen_enum_GpuDeviceLostReason = ["unknown", "destroyed"];


const __wbindgen_enum_GpuErrorFilter = ["validation", "out-of-memory", "internal"];


const __wbindgen_enum_GpuFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuFrontFace = ["ccw", "cw"];


const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];


const __wbindgen_enum_GpuLoadOp = ["load", "clear"];


const __wbindgen_enum_GpuMipmapFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];


const __wbindgen_enum_GpuPrimitiveTopology = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"];


const __wbindgen_enum_GpuQueryType = ["occlusion", "timestamp"];


const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];


const __wbindgen_enum_GpuStencilOperation = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"];


const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];


const __wbindgen_enum_GpuStoreOp = ["store", "discard"];


const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];


const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];


const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];


const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];


const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];


const __wbindgen_enum_GpuVertexFormat = ["uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"];


const __wbindgen_enum_GpuVertexStepMode = ["vertex", "instance"];


const __wbindgen_enum_HourCycle = ["h11", "h12", "h23", "h24"];


const __wbindgen_enum_ListFormatPartType = ["element", "literal"];


const __wbindgen_enum_ListFormatStyle = ["long", "short", "narrow"];


const __wbindgen_enum_ListFormatType = ["conjunction", "disjunction", "unit"];


const __wbindgen_enum_LocaleMatcher = ["lookup", "best fit"];


const __wbindgen_enum_MonthFormat = ["numeric", "2-digit", "narrow", "short", "long"];


const __wbindgen_enum_NumberFormatNotation = ["standard", "scientific", "engineering", "compact"];


const __wbindgen_enum_NumberFormatPartType = ["compact", "currency", "decimal", "exponentInteger", "exponentMinusSign", "exponentSeparator", "fraction", "group", "infinity", "integer", "literal", "minusSign", "nan", "percentSign", "plusSign", "unit", "unknown"];


const __wbindgen_enum_NumberFormatStyle = ["decimal", "currency", "percent", "unit"];


const __wbindgen_enum_NumericFormat = ["numeric", "2-digit"];


const __wbindgen_enum_OrientationLockType = ["any", "natural", "landscape", "portrait", "portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"];


const __wbindgen_enum_OrientationType = ["portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"];


const __wbindgen_enum_PermissionState = ["granted", "denied", "prompt"];


const __wbindgen_enum_PluralRulesType = ["cardinal", "ordinal"];


const __wbindgen_enum_PremultiplyAlpha = ["none", "premultiply", "default"];


const __wbindgen_enum_RangeSource = ["startRange", "endRange", "shared"];


const __wbindgen_enum_RelativeTimeFormatNumeric = ["always", "auto"];


const __wbindgen_enum_RelativeTimeFormatPartType = ["literal", "integer", "decimal", "fraction"];


const __wbindgen_enum_RelativeTimeFormatStyle = ["long", "short", "narrow"];


const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];


const __wbindgen_enum_RoundingMode = ["ceil", "floor", "expand", "trunc", "halfCeil", "halfFloor", "halfExpand", "halfTrunc", "halfEven"];


const __wbindgen_enum_RoundingPriority = ["auto", "morePrecision", "lessPrecision"];


const __wbindgen_enum_SegmenterGranularity = ["grapheme", "word", "sentence"];


const __wbindgen_enum_SignDisplay = ["auto", "never", "always", "exceptZero"];


const __wbindgen_enum_SupportedValuesKey = ["calendar", "collation", "currency", "numberingSystem", "timeZone", "unit"];


const __wbindgen_enum_TimeZoneNameFormat = ["short", "long", "shortOffset", "longOffset", "shortGeneric", "longGeneric"];


const __wbindgen_enum_TrailingZeroDisplay = ["auto", "stripIfInteger"];


const __wbindgen_enum_UnitDisplay = ["short", "narrow", "long"];


const __wbindgen_enum_UseGrouping = ["always", "auto", "min2", "true", "false"];


const __wbindgen_enum_VisibilityState = ["hidden", "visible"];


const __wbindgen_enum_WeekdayFormat = ["narrow", "short", "long"];


const __wbindgen_enum_YearFormat = ["numeric", "2-digit"];


let __wbg_instance_id = 0;
const wbg_rayon_PoolBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(({ ptr, instance }) => {
    if (instance === __wbg_instance_id) wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 1);
});

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    if (state.instance === __wbg_instance_id) {
        wasm.__wbindgen_destroy_closure(state.a, state.b);
    }
});

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayI16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getBigInt64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayJsValueViewFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    return result;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getBigUint64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedBigInt64ArrayMemory0 = null;
function getBigInt64ArrayMemory0() {
    if (cachedBigInt64ArrayMemory0 === null || cachedBigInt64ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedBigInt64ArrayMemory0 = new BigInt64Array(wasm.memory.buffer);
    }
    return cachedBigInt64ArrayMemory0;
}

let cachedBigUint64ArrayMemory0 = null;
function getBigUint64ArrayMemory0() {
    if (cachedBigUint64ArrayMemory0 === null || cachedBigUint64ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedBigUint64ArrayMemory0 = new BigUint64Array(wasm.memory.buffer);
    }
    return cachedBigUint64ArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

let cachedInt16ArrayMemory0 = null;
function getInt16ArrayMemory0() {
    if (cachedInt16ArrayMemory0 === null || cachedInt16ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedInt16ArrayMemory0 = new Int16Array(wasm.memory.buffer);
    }
    return cachedInt16ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

let cachedInt8ArrayMemory0 = null;
function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedUint8ClampedArrayMemory0 = null;
function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1, instance: __wbg_instance_id };
    const real = (...args) => {

        if (state.instance !== __wbg_instance_id) {
            throw new Error('Cannot invoke closure from previous WASM instance');
        }

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let __wbg_reinit_scheduled = false;

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : undefined);
if (cachedTextDecoder) cachedTextDecoder.decode();

const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder() : undefined);

if (cachedTextEncoder) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module, thread_stack_size) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedBigInt64ArrayMemory0 = null;
    cachedBigUint64ArrayMemory0 = null;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt16ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;
    if (typeof thread_stack_size !== 'undefined' && (typeof thread_stack_size !== 'number' || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) {
        throw new Error('invalid stack size');
    }

    if (typeof thread_stack_size === "undefined") thread_stack_size = 1048576; wasm.__wbindgen_start(thread_stack_size);
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module, memory, thread_stack_size} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports(memory);
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module, thread_stack_size);
}

async function __wbg_init(module_or_path, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path, memory, thread_stack_size} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('infinity-world_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports(memory);

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module, thread_stack_size);
}

export { initSync, __wbg_init as default };
