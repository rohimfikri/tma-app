<template>
    <div class="w-[21cm] min-h-[29.7cm] mx-auto p-5 border-black border-0 relative" id="slip-page">
    <!-- <div class="m-8"> -->
        <div class="grid gap-4">
            <div class="flex border-solid border-black border-b-2 pb-2 justify-between" id="slip-head">
                <div class="flex-shrink text-left">
                    <div class="text-2xl font-bold">SLIP GAJI</div>
                    <div class="text-xl">{{ head_month_year }}</div>
                </div>
                <div class="flex-shrink text-center">
                    <img src="~/assets/img/TMA.png" width="150" alt="">
                </div>
            </div>
            <div :style="{height:info_height}" class="grid grid-cols-2 border-solid border-black text-sm border-2 p-1" id="slip-top">
                <div id="slip-topleft" class="pl-2 pr-4 relative">
                    <table id="slip-topleft-tbl" class="absolute right-10">
                        <tr v-for="data in topleft_var" :key="data.lbl" >
                            <td class="font-bold">{{ data.lbl }}</td>
                            <td class="px-2">:</td>
                            <td class="px-2">{{ data.val }}</td>
                        </tr>
                    </table>
                </div>
                <div id="slip-out" class="pl-2 pr-4 relative">
                    <table id="slip-topright-tbl" class="absolute left-10">
                        <tr v-for="data in topright_var" :key="data.lbl" >
                            <td class="font-bold">{{ data.lbl }}</td>
                            <td class="px-2">:</td>
                            <td class="px-2">{{ data.val }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="grid grid-cols-2 divide-x-2 divide-[black]">
                <div id="slip-in" class="pl-2 pr-4">
                    <table id="slip-tbl-in" class="w-full">
                        <template v-for="(v,k) in dataStruct.pendapatan" :key="start">
                            <tr v-if="v.child===1">
                                <td class="font-bold">{{ v.lbl }}</td>
                                <td class="px-2">:</td>
                                <td class="border-black whitespace-nowrap border-2 text-right px-2">{{ printPerson(person,v.start) }}</td>
                            </tr>
                            <template v-if="v.child>1">
                                <tr>
                                    <td class="font-bold" :class="k>0 && 'pt-2'">{{ v.lbl }}</td>
                                </tr>
                                <tr v-for="v2 in v.data" :key="v2.k" class="text-sm">
                                    <td class="">{{ v2.lbl }}</td>
                                    <td class="px-2">:</td>
                                    <td class="text-right px-2">{{ printPerson(person,v2.k) }}</td>
                                </tr>
                                <tr>
                                    <td class="font-bold"></td>
                                    <td class="px-2">:</td>
                                    <td class="border-black whitespace-nowrap border-2 text-right px-2">{{ sumDataPerson(v.data) }}</td>
                                </tr>
                            </template>
                        </template>
                        <tr>
                            <td colspan="3"><hr class="border-green-700 border-2 my-2"></td>
                        </tr>
                        <tr>
                            <td class="font-bold text-green-700">{{ _toUpper(dataStruct.total_pendapatan.lbl) }}</td>
                            <td class="px-2 text-green-700">:</td>
                            <td class="border-black whitespace-nowrap font-bold text-green-700 border-2 text-right px-2">{{ printPerson(person,dataStruct.total_pendapatan.k) }}</td>
                        </tr>
                    </table>
                </div>
                <div id="slip-out" class="pl-2 pr-4">
                    <table id="slip-tbl-out" class="w-full">
                        <template v-for="(v,k) in dataStruct.pengurangan" :key="start">
                            <tr v-if="v.child===1">
                                <td class="font-bold">{{ v.lbl }}</td>
                                <td class="px-2">:</td>
                                <td class="border-black whitespace-nowrap border-2 text-right px-2">{{ printPerson(person,v.start) }}</td>
                            </tr>
                            <template v-if="v.child>1">
                                <tr>
                                    <td class="font-bold" :class="k>0 && 'pt-2'">{{ v.lbl }}</td>
                                </tr>
                                <tr v-for="v2 in v.data" :key="v2.k" class="text-sm">
                                    <td class="">{{ v2.lbl }}</td>
                                    <td class="px-2">:</td>
                                    <td class="text-right px-2">{{ printPerson(person,v2.k) }}</td>
                                </tr>
                                <tr>
                                    <td class="font-bold"></td>
                                    <td class="px-2">:</td>
                                    <td class="border-black whitespace-nowrap border-2 text-right px-2">{{ sumDataPerson(v.data) }}</td>
                                </tr>
                            </template>
                        </template>
                        <tr>
                            <td colspan="3"><hr class="border-red-700 border-2 my-2"></td>
                        </tr>
                        <tr>
                            <td class="font-bold text-red-700">{{ _toUpper(dataStruct.total_pengurangan.lbl) }}</td>
                            <td class="px-2 text-red-700">:</td>
                            <td class="border-black whitespace-nowrap font-bold text-red-700 border-2 text-right px-2">{{ printPerson(person,dataStruct.total_pengurangan.k) }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="slip-sum" class="my-1">
                <table id="slip-tbl-sum" class="w-full text-lg">
                    <tr>
                        <td class="font-bold border-blue-700 border-2 bg-blue-700 text-white pl-3 print:bg-blue-700"
                        style="print-color-adjust: exact;">F. YANG DIBAYARKAN</td>
                        <td class="border-blue-700 font-bold text-blue-700 border-2 text-right px-2">{{ printPerson(person,dataStruct.total_dibayarkan.k) }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-center italic border-blue-700 border-2 text-blue-700 pl-3">{{ $terbilang(person[dataStruct.total_dibayarkan.k]) }} rupiah</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="absolute w-[19.7cm] mx-auto bottom-0 block">
            <div class="grid grid-cols-2 divide-x-2 divide-[black] mb-3">
                <div id="slip-benefit" class="pl-2 pr-4">
                    <table id="slip-tbl-benefit" class="w-full">
                        <template v-for="(v,k) in dataStruct.benefit" :key="start">
                            <tr v-if="v.child===1">
                                <td class="font-bold">{{ v.lbl }}</td>
                                <td class="px-2">:</td>
                                <td class="border-black whitespace-nowrap border-2 text-right px-2">{{ printPerson(person,v.start) }}</td>
                            </tr>
                            <template v-if="v.child>1">
                                <tr>
                                    <td class="font-bold" :class="k>0 && 'pt-2'">{{ v.lbl }}</td>
                                </tr>
                                <tr v-for="v2 in v.data" :key="v2.k" class="text-sm">
                                    <td class="">{{ v2.lbl }}</td>
                                    <td class="px-2">:</td>
                                    <td class="text-right px-2">{{ printPerson(person,v2.k) }}</td>
                                </tr>
                            </template>
                        </template>
                    </table>
                </div>
                <div id="slip-other" class="pl-2 pr-4">
                    <table id="slip-tbl-other" class="w-full">
                        <!-- <tr>
                            <td class="font-bold">INFO LAIN</td>
                        </tr> -->
                        <tr v-for="(v,k) in dataStruct.foot" :key="v.k" class="text-sm font-bold">
                            <td class="">{{ v.lbl }}</td>
                            <td class="px-2">:</td>
                            <td class="text-right px-2">{{ printPerson(person,v.k) }} {{ v.unit }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="flex border-solid border-black border-t-2 pb-3 pt-2  justify-between" id="slip-head">
                <div class="flex-shrink text-left">
                    <div class="text-lg font-bold">Bandung, {{ curDate }}</div>
                    <div class="mt-[2cm]">
                        <div class="font-bold">Irene Rosnovian</div>  
                        <div class="text-sm">Direktur</div>  
                    </div>
                </div>
                <div class="flex-shrink text-right">
                    <div class="font-bold text-2xl text-rose-800">Tech Mayantara Asia</div>
                    <div class="italic font-bold mb-5">"Assisting Your Business With Heart"</div>
                    <div class="text-xs">Jalan Magna Timur Blok MC No. 070</div>
                    <div class="text-xs">Magna Commercial SUMMARECON</div>
                    <div class="text-xs">Kota Bandung, Jawa Barat 40295</div>
                    <div class="text-xs font-bold">Phone: +62-22-87505672 Email: info@tma.web.id</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $terbilang } = useNuxtApp()
// const angkaTerbilang = $terbilang
const route = useRoute()
const row_id = route.params.slug[0];
const row_nip = route.params.slug[1];
const row_file = route.params.slug[2];
const { data } = await useAsyncData('payroll', () => queryContent('/payroll-' + row_file).findOne());
// console.log(data);

const curDate = computed(()=>{
    const dt = new Date();
    let _date = dt.getDate()
    if(_date<10)_date = "0"+_date
    return  _date+ " " + dt.toLocaleString('id-ID', { month: 'long', }) + " " + dt.getFullYear();
})

const dataStruct = ref({
    no: null,
    info: {},
    foot: {},
    benefit: [],
    pendapatan: [],
    pengurangan: [],
    total_pendapatan: null,
    total_pengurangan: null,
    total_dibayarkan: null,
    bold_field: [],
    currency_field: [],
    date_field: [],
    pyr_field: null,
    name_field: null,
    nip_field: null,
    email_field: null,
    uniq_field: null
})

const peopleList = ref([]);
// console.log(data.value.body)
if (data.value !== undefined && data.value.body !== undefined
    && data.value.body[0] !== undefined && data.value.body[0].name === "PAYROLL" && data.value.body[0].data.length > 2) {
    let row_data = data.value.body[0].data;
    // console.log(row_data)
    let ds = dataStruct.value
    for (const k in row_data[0]) {
        let tmp = row_data[0][k];
        // console.log({k,tmp})
        // console.log(_startsWith(tmp, "INFO"))
        if (tmp !== 'X') {
            if (tmp === 'NO') {
                ds.no = { k: k, v: tmp, lbl: "No" };
                ds.uniq_field = k;
            } else if (tmp === 'TOTAL+') {
                ds.total_pendapatan = { k: k, v: tmp, lbl: "Total Pendapatan" };
                ds.currency_field.push(k)
            } else if (tmp === 'TOTAL-') {
                ds.total_pengurangan = { k: k, v: tmp, lbl: "Total Pengurangan" };
                ds.currency_field.push(k)
            } else if (tmp === 'TOTAL') {
                ds.total_dibayarkan = { k: k, v: tmp, lbl: "Total Dibayarkan" };
                ds.currency_field.push(k)
            } else if (_startsWith(tmp, "INFO")) {
                let tmp2 = _split(tmp, "-")
                if (tmp2.length === 2) {
                    ds.info[tmp2[1]] = { k: k, v: tmp, lbl: "Info" };
                }
            } else if (_startsWith(tmp, "FOOT")) {
                let tmp2 = _split(tmp, "-")
                if (tmp2.length === 2) {
                    ds.foot[tmp2[1]] = { k: k, v: tmp, lbl: "Foot" };
                }
            } else if (_startsWith(tmp, "+")) {
                let tmp2 = _split(tmp, "~")
                if (tmp2.length === 2) {
                    let tmp3 = {
                        lbl: tmp2[0].replace("+", ""),
                        start: k,
                        child: _toInteger(tmp2[1]),
                        data: []
                    };

                    ds.pendapatan.push(tmp3)
                }
            } else if (_startsWith(tmp, "-")) {
                let tmp2 = _split(tmp, "~")
                if (tmp2.length === 2) {
                    let tmp3 = {
                        lbl: tmp2[0].replace("-", ""),
                        start: k,
                        child: _toInteger(tmp2[1]),
                        data: []
                    };

                    ds.pengurangan.push(tmp3)
                }
            } else if (_startsWith(tmp, "BENEFIT")) {
                let tmp2 = _split(tmp, "~")
                if (tmp2.length === 2) {
                    let tmp3 = {
                        lbl: tmp2[0],
                        start: k,
                        child: _toInteger(tmp2[1]),
                        data: []
                    };

                    ds.benefit.push(tmp3)
                }
            }
        }
    }

    for (const k in ds.info) {
        ds.info[k].lbl = row_data[1][ds.info[k].k]
        if (['NIP', 'NAMA', 'EMAIL', 'NOREK'].includes(_toUpper(ds.info[k].lbl))) {
            ds.bold_field.push(ds.info[k].k)
        }else if (['PERIODE PYR'].includes(_toUpper(ds.info[k].lbl))) {
            ds.date_field.push(ds.info[k].k)
        }

        if (_toUpper(ds.info[k].lbl) === "NAMA") {
            ds.name_field = ds.info[k].k
        } else if (_toUpper(ds.info[k].lbl) === "EMAIL") {
            ds.email_field = ds.info[k].k
        } else if (_toUpper(ds.info[k].lbl) === "NIP") {
            ds.nip_field = ds.info[k].k
        } else if (_toUpper(ds.info[k].lbl) === "PERIODE PYR") {
            ds.pyr_field = ds.info[k].k
        }
    }

    for (const k in ds.foot) {
        let tmp = _split(row_data[1][ds.foot[k].k], "~")
        if (tmp.length === 2) {
            ds.foot[k].lbl = tmp[0]
            ds.foot[k].unit = tmp[1]
        }else{
            ds.foot[k].lbl = row_data[1][ds.foot[k].k]
            ds.foot[k].unit = ""
        }
    }

    ds.pendapatan.forEach((v, k) => {
        let count = 0;
        // console.log(v)
        for (const x in row_data[1]) {
            // console.log(x)
            if (count > 0 || x === v.start) {
                ds.pendapatan[k].data.push({ k: x, lbl: row_data[1][x] })
                ds.currency_field.push(x)
                count++;
            }

            if (count >= v.child) break;
        }
    });

    ds.pengurangan.forEach((v, k) => {
        let count = 0;
        // console.log(v)
        for (const x in row_data[1]) {
            // console.log(x)
            if (count > 0 || x === v.start) {
                ds.pengurangan[k].data.push({ k: x, lbl: row_data[1][x] })
                ds.currency_field.push(x)
                count++;
            }

            if (count >= v.child) break;
        }
    });

    ds.benefit.forEach((v, k) => {
        let count = 0;
        // console.log(v)
        for (const x in row_data[1]) {
            // console.log(x)
            if (count > 0 || x === v.start) {
                ds.benefit[k].data.push({ k: x, lbl: row_data[1][x] })
                ds.currency_field.push(x)
                count++;
            }

            if (count >= v.child) break;
        }
    });

    // console.log(ds)
    dataStruct.value = ds
    // _data = row_data.filter((v, k) => k > 1)
    row_data.forEach((v,k)=>{
        if(k>1){
            peopleList.value.push(v);
        }
    });
}
// console.log({peopleList,dataStruct})

const person = computed(()=>{
    let ret = null;
    if(route.params.slug!==undefined && route.params.slug.length===3){
        const row_id = route.params.slug[0];
        const row_nip = route.params.slug[1];

        const filter = {};
        filter[dataStruct.value.uniq_field] = _toInteger(row_id);
        filter[dataStruct.value.nip_field] = row_nip;
        ret = _find(peopleList.value, filter);
        if(ret===undefined)ret = null;
    }
    return ret;
    // if(peopleList[route.id])
})
// console.log(person.value)
// console.log(dataStruct.value)

const sumDataPerson = (data)=>{
    let sum = 0;
    data.forEach((v,k)=>{
        sum+=person.value[v.k]
    });

    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(sum);
}

const printPerson = (v, k) => {
    // console.log({v, k})
    if (dataStruct.value.currency_field.includes(k)) {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v[k]);
    } else if (dataStruct.value.date_field.includes(k)) {
        let dt = new Date();
        dt.setFullYear(1900);
        dt.setMonth(0);
        dt.setDate(1);
        dt.setHours(0);
        dt.setMinutes(0);
        dt.setSeconds(0);
        // console.log(v[k.replace("~","")])
        let tmp = v[k] - 1;
        dt.setTime(dt.getTime() + (tmp * (3600 * 24) * 1000));
        return dt.toLocaleString('id-ID', { month: 'long', }) + " " + dt.getFullYear();
    } else {
        return v[k];
    }
}

const head_month_year = computed(()=>{
    let ret = "";
    if (person.value!==null){
        ret = printPerson(person.value,dataStruct.value.pyr_field);
    }
    return ret;
});
const info_height = computed(()=>{
    let ret = 150;
    if (person.value!==null){
        const info_length = _size(dataStruct.value.info)
        const info_div = _toInteger(info_length/2);
        ret = info_div*25;
    }
    return ret+"px";
});
const foot_height = computed(()=>{
    let ret = 150;
    if (person.value!==null){
        const foot_length = _size(dataStruct.value.foot)
        const foot_div = _toInteger(foot_length/2);
        ret = foot_div*26+10;
    }
    return ret+"px";
});
const topleft_var = computed(()=>{
    let ret = [];
    if (person.value!==null){
        const info_length = _size(dataStruct.value.info)
        const info_div = _toInteger(info_length/2);
        let count = 0;
        for(const k in dataStruct.value.info){
            if(count<info_div){
                ret.push({lbl:_toUpper(dataStruct.value.info[k].lbl), val: printPerson(person.value,dataStruct.value.info[k].k)})
            }else{
                break;
            }
            count++;
        }
    }
    return ret;
});
const topright_var = computed(()=>{
    let ret = [];
    if (person.value!==null){
        const info_length = _size(dataStruct.value.info)
        const info_div = _toInteger(info_length/2);
        let count = 0;
        for(const k in dataStruct.value.info){
            if(count>=info_div){
                ret.push({lbl:_toUpper(dataStruct.value.info[k].lbl), val: printPerson(person.value,dataStruct.value.info[k].k)})
            }
            count++;
        }
    }
    return ret;
});
const botleft_var = computed(()=>{
    let ret = [];
    if (person.value!==null){
        const foot_length = _size(dataStruct.value.foot)
        const foot_div = _toInteger(foot_length/2);
        let count = 0;
        for(const k in dataStruct.value.foot){
            if(count<foot_div){
                ret.push({unit:dataStruct.value.foot[k].unit, lbl:_toUpper(dataStruct.value.foot[k].lbl), val: printPerson(person.value,dataStruct.value.foot[k].k)})
            }else{
                break;
            }
            count++;
        }
    }
    return ret;
});
const botright_var = computed(()=>{
    let ret = [];
    if (person.value!==null){
        const foot_length = _size(dataStruct.value.foot)
        const foot_div = _toInteger(foot_length/2);
        let count = 0;
        for(const k in dataStruct.value.foot){
            if(count>=foot_div){
                ret.push({unit:dataStruct.value.foot[k].unit, lbl:_toUpper(dataStruct.value.foot[k].lbl), val: printPerson(person.value,dataStruct.value.foot[k].k)})
            }
            count++;
        }
    }
    return ret;
});
// console.log(person);
</script>