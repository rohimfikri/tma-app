<template>
    <div class="px-4 sm:px-6 lg:px-8 py-5">
        <label v-cloak v-show="!checked && !loadrow" for="fileDropdown">Select Payroll File</label><br />
        <button v-cloak v-show="!checked && !loadrow" id="fileDropdown" ref="btnFile" data-dropdown-toggle="fileSearch"
            data-dropdown-placement="right" :class="(selectedFile.path==null)?'bg-neutral-400':'bg-neutral-700'"
            class="text-white hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800"
            type="button">{{ selectedFile.name }}
            <Icon class="ml-3" name="ic:outline-keyboard-double-arrow-right" />
        </button>
        <div v-show="checked">ON LOADING...</div>

        <!-- Dropdown menu -->
        <div id="fileSearch" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
            <div class="p-3">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="input-group-search"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search file" v-model="srcFile">
                </div>
            </div>
            <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton">
                <li v-for="(file, idx) in files" :key="idx">
                    <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                        @click="changeFile(idx)">
                        <input :id="`radio-${idx}`" :ref="el => { fileRadio[idx] = el }" type="radio" :value="idx"
                            v-model="fileSelect"
                            class="cursor-pointer w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="checkbox-item-11"
                            class="cursor-pointer w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                                file.name
                            }}</label>
                    </div>
                </li>
            </ul>
        </div>

        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 overflow-y-auto max-h-[80vh]">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <div v-if="selectedPeople.length > 0 && !checked && !loadrow"
                            class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16 px-3">
                            <button type="button" @click="bulkSend()"
                                class="inline-flex items-center rounded border border-gray-300 bg-cyan-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                                Kirim Slip Gaji Ke Email Terpilih
                            </button>
                        </div>
                        <table class="min-w-full table-fixed divide-y divide-gray-300">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                                        <input type="checkbox" v-show="!checked && !loadrow"
                                            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 sm:left-6"
                                            :checked="people.length && (indeterminate || selectedPeople.length === people.length)"
                                            :indeterminate="people.length && indeterminate"
                                            @change="selectedPeople = $event.target.checked ? people.map((p) => p[data_structure.uniq_field]) : []" />
                                    </th>
                                    <th scope="col"
                                        class="whitespace-nowrap text-center px-3 py-3.5 text-sm font-semibold text-gray-900"
                                        v-for="(v,k) in row_header" v-bind:key="k" :class="v.class">
                                        {{ v.lbl.toUpperCase() }}</th>
                                </tr>
                            </thead>
                            <tbody v-cloak v-show="checked" class="divide-y divide-gray-200 bg-white">
                                <tr class="text-center bg-gray-50">
                                    <td v-for="n in (Object.keys(row_header).length + 1)"
                                        class=" animate-pulse py-3 px-2">
                                        <div class="rounded bg-slate-200 h-3 w-full"></div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-cloak v-show="!checked" class="divide-y divide-gray-200 bg-white">
                                <tr v-for="(person,idx) in people" :key="person[data_structure.uniq_field]"
                                    class="cursor-pointer hover:bg-green-50"
                                    :class="[selectedPeople.includes(person[data_structure.uniq_field]) && 'bg-green-50']">
                                    <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                        <div v-if="selectedPeople.includes(person[data_structure.uniq_field])"
                                            class="absolute inset-y-0 left-0 w-0.5 bg-green-600"></div>
                                        <input type="checkbox"
                                            v-show="person.show_btn"
                                            :ref="el => { rowTbl[person[data_structure.uniq_field]] = el }"
                                            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 sm:left-6"
                                            :value="person[data_structure.uniq_field]" v-model="selectedPeople" />

                                        <div class="flex flex-row ml-10 gap-2">
                                            <div class="whitespace-nowrap text-xs border-solid border-2 border-red-600 rounded px-2 text-red-600" v-show="person.err!==''"><Icon name="uis:times-circle" /> {{ person.err }}</div>
                                            <div class="whitespace-nowrap text-xs border-solid border-2 border-green-600 rounded px-2 text-green-600" v-show="person.msg!==''"><Icon name="ic:sharp-info" /> {{ person.msg }}</div>
                                            <button
                                                v-show="person.show_btn"
                                                :data-tooltip-target="`tooltipsend-${person[data_structure.uniq_field]}`"
                                                data-send-style="light" data-tooltip-placement="right"
                                                class=" bg-cyan-600 text-white py-0 inline-block px-1 rounded"
                                                @click="sendSlip(person,idx)">
                                                <Icon name="cib:minutemailer" />
                                            </button>
                                            <div :id="`tooltipsend-${person[data_structure.uniq_field]}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Kirim Slip Gaji ke <span class="text-cyan-600">{{
                                                person[data_structure.email_field] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>

                                            <button
                                                v-show="person.show_btn"
                                                :data-tooltip-target="`tooltipdown-${person[data_structure.uniq_field]}`"
                                                data-tooltip-style="light" data-tooltip-placement="right"
                                                class=" bg-red-700 text-white py-0 px-1 rounded"
                                                @click="downloadPdf(person,idx)">
                                                <Icon class="-translate-y-1" name="uiw:file-pdf" />
                                            </button>
                                            <div :id="`tooltipdown-${person[data_structure.uniq_field]}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Unduh Slip Gaji <span class="text-red-700">{{ person[data_structure.name_field] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>

                                            <button
                                                v-show="person.show_btn"
                                                :data-tooltip-target="`tooltipview-${person[data_structure.uniq_field]}`"
                                                data-tooltip-style="light" data-tooltip-placement="right"
                                                class=" bg-amber-600 text-white py-0 px-1 rounded" @click="viewPdf(person)" data-modal-target="view-modal" data-modal-toggle="view-modal">
                                                <Icon class="-translate-y-1" name="mdi:magnify-expand" />
                                            </button>
                                            <div :id="`tooltipview-${person[data_structure.uniq_field]}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Lihet Slip Gaji <span class="text-amber-600">{{
                                                person[data_structure.name_field] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500"
                                        v-for="(head, key) in row_header"
                                        v-bind:key="`${key}-${person[data_structure.uniq_field]}`"
                                        :class="[(data_structure.bold_field.includes(key.replace('~', ''))) && 'font-bold']"
                                        @click="rowClicked(person[data_structure.uniq_field])">
                                        {{ printPerson(person, key) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div id="view-modal" tabindex="-1" data-modal-backdrop="static" data-modal-placement="top-center"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full bg-slate-600/75 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div class="relative w-full h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between border-b rounded-t dark:border-gray-600">
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="view-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="w-full h-[93vh]">
                        <!-- <WebViewer :path="`http://localhost:3000/webviewer`"
                            :url="url_pdf" /> -->
                        <PdfViewer v-if="online" :url="url_pdf" :name="name_pdf"></PdfViewer>
                        <embed v-else :src="url_pdf" class="h-full w-full" type="application/pdf">
                    </div>
                    <!-- Modal footer -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { initTooltips, initDropdowns, initModals } from 'flowbite'
import { usePeopleStore } from '~/stores/people'
import { storeToRefs } from 'pinia'
const online = useOnline()
// const checked = ref(false);

const peopleStore = usePeopleStore()
const { addPersonToPeopleList, clearPeopleList, setDataStruct, clearDataStruct } = peopleStore
const { peopleList } = storeToRefs(peopleStore)
const { dataStruct } = storeToRefs(peopleStore)
const url_pdf = ref("http://localhost:3000/api/payroll/generate")
const name_pdf = ref("slip.pdf")

const selectedFile = ref({
    name: "-- no file selected --",
    path: null
})
const fileSelect = ref(null);
const srcFile = ref("");
const btnFile = ref(null)

const { data: fdata } = await useFetch('/api/payroll/list-excel');
// console.log(fdata.value);
const files = computed(() => {
    let tmp = [];
    fdata.value.forEach((v) => {
        if (v.includes(srcFile.value) || srcFile.value == "") {
            tmp.push({
                name: v.replace('.xlsx', '').replace('payroll-', ''),
                path: v.replace('.xlsx', '')
            })
        }
    });
    return tmp;
})

// const { data } = await useAsyncData('payroll', () => queryContent('/payroll-02-2023').findOne());
let _data = [];
// if (data.value.body !== undefined && data.value.body[0] !== undefined) {
//     _data =  data.value.body[0].data.filter((v,k)=>k>0 && v["#REF!_19"]!==undefined);
// }
const people = ref(_data);
const rowTbl = ref({});
const fileRadio = ref({});
const row_header = ref({});

// const people = computed(() => {
//     console.log(rawdata.value.body)
//     if (rawdata.value.body !== undefined && rawdata.value.body[0] !== undefined) {
//         // rawdata.value.body[1].rawdata.shift();
//         // console.log(rawdata.value.body[1].rawdata)
//         return rawdata.value.body[0].data.filter((v,k)=>k>0);
//     } else {
//         return []
//     }
// })

const selectedPeople = ref([])
const checked = ref(false)
const loadrow = ref(false)
const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < people.value.length && people.value.length > 0)
// console.log(indeterminate.value)
// console.log(selectedPeople.value.length)
// console.log(people.value.length)
// console.log(indeterminate.value)
// console.log(selectedPeople.value.length === people.value.length)
// console.log(indeterminate.value || selectedPeople.value.length === people.value.length)
const table_spinner = ['text']
const rowClicked = (row_id) => {
    // console.log(row_id)
    // console.log(rowTbl.value[row_id].)

    rowTbl.value[row_id].checked = !rowTbl.value[row_id].checked;
    rowTbl.value[row_id].dispatchEvent(new Event('change'))
}

const data_structure = ref({
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
    foot_field: [],
    currency_field: [],
    date_field: [],
    pyr_field: null,
    name_field: null,
    nip_field: null,
    email_field: null,
    uniq_field: null
})

const changeFile = async (idx) => {
    // console.log(checked)
    // checked.value = true;return false;
    fileRadio.value[idx].checked = !fileRadio.value[idx].checked;
    fileRadio.value[idx].dispatchEvent(new Event('change'))
    // console.log(files.value[fileSelect.value]);
    if (files.value[fileSelect.value] !== undefined) {
        // console.log(btnFile.value)
        checked.value = true;
        btnFile.value.dispatchEvent(new Event('click'))
        selectedFile.value = files.value[fileSelect.value];
        const { data } = await useAsyncData('payroll', () => queryContent('/' + files.value[fileSelect.value].path).findOne());
        let _data = [];
        // console.log(data.value.body)
        if (data.value !== undefined && data.value.body !== undefined
            && data.value.body[0] !== undefined && data.value.body[0].name === "PAYROLL" && data.value.body[0].data.length > 2) {
            let row_data = data.value.body[0].data;
            row_header.value = {};
            clearDataStruct()
            clearPeopleList()
            // console.log(row_data)
            let ds = data_structure.value
            for (const k in row_data[0]) {
                let tmp = row_data[0][k];
                // console.log({k,tmp})
                // console.log(_startsWith(tmp, "INFO"))
                if (tmp !== 'X') {
                    if (tmp === 'NO') {
                        ds.no = { k: k, v: tmp, lbl: "No" };
                        row_header.value["~" + k] = {lbl:"No",class:""};
                        ds.uniq_field = k;
                    } else if (tmp === 'TOTAL+') {
                        ds.total_pendapatan = { k: k, v: tmp, lbl: "Total Pendapatan" };
                    } else if (tmp === 'TOTAL-') {
                        ds.total_pengurangan = { k: k, v: tmp, lbl: "Total Pengurangan" };
                    } else if (tmp === 'TOTAL') {
                        ds.total_dibayarkan = { k: k, v: tmp, lbl: "Total Dibayarkan" };
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
                row_header.value["~" + ds.info[k].k] = {lbl:row_data[1][ds.info[k].k],class:""};
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
                row_header.value["~" + ds.foot[k].k] = {lbl:ds.foot[k].lbl,class:"bg-blue-200"};
                ds.foot_field.push(ds.foot[k].k)
            }

            ds.pendapatan.forEach((v, k) => {
                let count = 0;
                // console.log(v)
                for (const x in row_data[1]) {
                    // console.log(x)
                    if (count > 0 || x === v.start) {
                        ds.pendapatan[k].data.push({ k: x, lbl: row_data[1][x] })
                        row_header.value["~" + x] = {lbl:row_data[1][x],class:"bg-green-200"};
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
                        row_header.value["~" + x] =  {lbl:row_data[1][x],class:"bg-red-200"};
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
                        row_header.value["~" + x] =  {lbl:row_data[1][x],class:"bg-orange-200"};
                        ds.currency_field.push(x)
                        count++;
                    }

                    if (count >= v.child) break;
                }
            });

            // console.log(row_header.value)
            // console.log(ds)
            data_structure.value = ds
            setDataStruct(ds)
            // _data = row_data.filter((v, k) => k > 1)
            row_data.forEach((v,k)=>{
                if(k>1){
                    v.err = ""
                    v.msg = ""
                    v.show_btn = true
                    _data.push(v);
                    addPersonToPeopleList(v[ds.uniq_field],v);
                }
            });
        }
        people.value = _data;
        await nextTick()
        initTooltips();
        initModals();
        checked.value = false;
        // console.log(peopleList.value);
        // console.log(dataStruct.value)
    }
}

const printPerson = (v, k) => {
    if (data_structure.value.currency_field.includes(k.replace("~", ""))) {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v[k.replace("~", "")]);
    } else if (data_structure.value.foot_field.includes(k.replace("~", ""))) {
        // console.log(_find(data_structure.value.foot,{'k':k.replace("~", "")}))
        return v[k.replace("~", "")]+" "+_find(data_structure.value.foot,{'k':k.replace("~", "")}).unit;
    }else if (data_structure.value.date_field.includes(k.replace("~", ""))) {
        let dt = new Date();
        dt.setFullYear(1900);
        dt.setMonth(0);
        dt.setDate(1);
        dt.setHours(0);
        dt.setMinutes(0);
        dt.setSeconds(0);
        // console.log(v[k.replace("~","")])
        let tmp = v[k.replace("~", "")] - 1;
        dt.setTime(dt.getTime() + (tmp * (3600 * 24) * 1000));
        // dt.setTime( (0 - (3600*7*1000)) - 2208988800 );
        // dt.setUTCFullYear(dt.getUTCFullYear() - 70)
        // dt.setUTCDate(dt.getUTCDate() + v[k.replace("~","")])
        // dt.setTime(42785*86400); //19-Feb-17
        // console.log(dt)
        // return (dt.getMonth()<10?"0":"")+dt.getMonth()+"-"+dt.getFullYear();
        return dt.toLocaleString('id-ID', { month: 'long', }) + " " + dt.getFullYear();
    } else {
        return v[k.replace("~", "")];
    }
}

const downloadPdf = async (person, idx) => {
    // console.log(checked);
    // console.log(person);return false;
    loadrow.value = true;
    people.value[idx].show_btn = false;
    people.value[idx].msg = "Preparing PDF";
    let filename = "slip_"+person[data_structure.value.nip_field]+"_"+_replace(files.value[fileSelect.value].path,"payroll-","")+".pdf"
    const data = await fetch(`/api/payroll/generate/${person[data_structure.value.uniq_field]}/${person[data_structure.value.nip_field]}/${files.value[fileSelect.value].path}`)
    const blob = await data.blob()
    const objectUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.setAttribute('href', objectUrl)
    link.setAttribute('download', filename)
    link.style.display = 'none'

    document.body.appendChild(link)
  
    link.click()
  
    document.body.removeChild(link)
    people.value[idx].msg = "";
    people.value[idx].show_btn = true;
    loadrow.value = false;
}

const viewPdf = async (person) => {
    let url = `/api/payroll/generate/${person[data_structure.value.uniq_field]}/${person[data_structure.value.nip_field]}/${_replace(files.value[fileSelect.value].path,"payroll-","")}`
    // console.log(url)
    url_pdf.value = url
    let filename = "slip_"+person[data_structure.value.nip_field]+"_"+_replace(files.value[fileSelect.value].path,"payroll-","")+".pdf"
    name_pdf.value = filename
}

const bulkSend = async () =>{
    // console.log(selectedPeople.value)
    // console.log(people.value)
    // console.log(_values(selectedPeople.value))
    // console.log(people.value.filter((v,k)=>_values(selectedPeople.value).includes(v[data_structure.value.uniq_field])))
    const selected = people.value.filter((v,k)=>_values(selectedPeople.value).includes(v[data_structure.value.uniq_field]));
    selected.forEach((v,k)=>{
        const filter = {}
        filter[data_structure.value.uniq_field] = v[data_structure.value.uniq_field]
        const idx = _findIndex(people.value,filter)
        // console.log(v,idx)
        sendSlip(v,idx)
    })
}

const sendSlip = async (person,idx) => {
    // console.log(person[data_structure.email_field]);
    loadrow.value = true;
    people.value[idx].show_btn = false;
    people.value[idx].err = "";
    people.value[idx].msg = "Sending Email";
    const { data: fdata } = await useFetch('/api/mail/send',{
        method:'POST',
        body: {person, 
            structur:data_structure.value, 
            id:person[data_structure.value.uniq_field], 
            nip:person[data_structure.value.nip_field], 
            period:_replace(files.value[fileSelect.value].path,"payroll-","")
        }
    });
    // console.log(fdata.value.status);
    // people.value[idx].msg = "";
    loadrow.value = false;
    people.value[idx].show_btn = true;
    if(fdata.value.status!==true){
        people.value[idx].err = "failed send email";
    }else{
        people.value[idx].msg = "success send email";
    }
}

onMounted(() => {
    // console.log(peopleList.value);
    // console.log(dataStruct.value)
    // console.log(checked)
    // console.log(selectedPeople)
    initDropdowns();
    if(people.value.length>0){
        initTooltips();
        initModals();
    }
    selectedPeople.value = [];
    selectedFile.value = {
        name: "-- no file selected --",
        path: null
    };
    fileSelect.value = null;
})
</script>

<style scoped>
#webviewer {
    height: 88vh;
}
</style>