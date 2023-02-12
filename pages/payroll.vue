<template>
    <div class="px-4 sm:px-6 lg:px-8 py-5">
        <label for="fileDropdown">Select File</label><br />
        <button v-show="!onLoad" id="fileDropdown" ref="btnFile" data-dropdown-toggle="fileSearch" data-dropdown-placement="right"
            :class="(selectedFile.path==null)?'bg-neutral-400':'bg-neutral-700'"
            class="text-white hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800"
            type="button">{{ selectedFile.name }} <Icon class="ml-3" name="ic:outline-keyboard-double-arrow-right" />
        </button>
        <div v-show="onLoad">ON LOADING...</div>

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
                <li v-for="(file,idx) in files" :key="idx">
                    <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600" @click="changeFile(idx)">
                        <input :id="`radio-${idx}`" :ref="el => { fileRadio[idx] = el }" type="radio" :value="idx" v-model="fileSelect"
                            class="cursor-pointer w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="checkbox-item-11"
                            class="cursor-pointer w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{ file.name }}</label>
                    </div>
                </li>
            </ul>
        </div>

        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 overflow-y-auto max-h-[80vh]">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <div v-if="selectedPeople.length > 0"
                            class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16 px-3">
                            <button type="button"
                                class="inline-flex items-center rounded border border-gray-300 bg-cyan-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                                Kirim Slip Gaji Ke Email Terpilih
                            </button>
                        </div>
                        <table class="min-w-full table-fixed divide-y divide-gray-300">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                                        <input type="checkbox"
                                            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 sm:left-6"
                                            :checked="indeterminate || selectedPeople.length === people.length"
                                            :indeterminate="indeterminate"
                                            @change="selectedPeople = $event.target.checked ? people.map((p) => p['1']) : []" />
                                    </th>
                                    <th scope="col"
                                        class="whitespace-nowrap text-center px-3 py-3.5 text-sm font-semibold text-gray-900"
                                        v-for="head in row_header" v-bind:key="head">
                                        {{ head.toUpperCase() }}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="person in people" :key="person['1']" class="cursor-pointer hover:bg-green-50"
                                    :class="[selectedPeople.includes(person['1']) && 'bg-green-50']">
                                    <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                        <div v-if="selectedPeople.includes(person['1'])"
                                            class="absolute inset-y-0 left-0 w-0.5 bg-green-600"></div>
                                        <input type="checkbox" :ref="el => { rowTbl[person['1']] = el }"
                                            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 sm:left-6"
                                            :value="person['1']" v-model="selectedPeople" />

                                        <div class="flex flex-row ml-10 gap-2">
                                            <button :data-tooltip-target="`tooltipsend-${person['1']}`"
                                                data-send-style="light" data-tooltip-placement="right"
                                                class=" bg-cyan-600 text-white py-0 px-1 rounded" @click="sendSlip(person)">
                                                <Icon name="cib:minutemailer" />
                                            </button>
                                            <div :id="`tooltipsend-${person['1']}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Kirim Slip Gaji ke <span class="text-cyan-600">{{ person['#REF!_19'] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>

                                            <button :data-tooltip-target="`tooltipdown-${person['1']}`"
                                                data-tooltip-style="light" data-tooltip-placement="right"
                                                class=" bg-red-700 text-white py-0 px-1 rounded">
                                                <Icon class="-translate-y-1" name="uiw:file-pdf" />
                                            </button>
                                            <div :id="`tooltipdown-${person['1']}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Unduh Slip Gaji <span class="text-red-700">{{ person['3'] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>

                                            <button :data-tooltip-target="`tooltipview-${person['1']}`"
                                                data-tooltip-style="light" data-tooltip-placement="right"
                                                class=" bg-amber-600 text-white py-0 px-1 rounded">
                                                <Icon class="-translate-y-1" name="mdi:magnify-expand" />
                                            </button>
                                            <div :id="`tooltipview-${person['1']}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Lihet Slip Gaji <span class="text-amber-600">{{ person['3'] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500"
                                        v-for="(head, key) in row_header" v-bind:key="`${key}-${person['1']}`"
                                        :class="[(key == '~2' || key == '~#REF!_19' || key == '~3') && 'font-bold']"
                                        @click="rowClicked(person['1'])">
                                        {{ person[key.replace('~', '')] }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { initTooltips, initDropdowns } from 'flowbite'
const { $mail } = useNuxtApp()
const onLoad = ref(false)

const selectedFile = ref({
    name : "-- no file selected --",
    path: null
})
const fileSelect = ref(null);
const srcFile = ref("");
const btnFile = ref(null)

const { data:fdata } = await useFetch('/api/payroll/list-excel');
// console.log(fdata.value);
const files = computed(() => {
    let tmp = [];
    fdata.value.forEach((v)=>{
        if(v.includes(srcFile.value) || srcFile.value==""){
            tmp.push({
                name: v.replace('.xlsx','').replace('payroll-',''),
                path: v.replace('.xlsx','')
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
const row_header = {
    "~1": "NO",
    "~2": "NIP",
    "~3": "NAMA",
    "~#REF!_19": "Email",
    "~__EMPTY_5": "Fungsi",
    "~#REF!_16": "NIK",
    "~#REF!_15": "NPWP",
    "~#REF!_17": "Bank",
    "~#REF!_18": "Norek",
    "~4": "PERIODE PYR",
    "~#REF!": "Lembur",
    "~#REF!_1": "Status Pajak",
    "~#REF!_2": "Bagian",
    "~#REF!_3": "GAPOK & Tj TETAP",
    "~#REF!_4": "Tunj Proyek",
    "~#REF!_5": "Lembur",
    "~#REF!_6": "Tunj On Site",
    "~__EMPTY": "Tunj Perjalanan Dinas",
    "~__EMPTY_1": "Tunjangan Sarana",
    "~#REF!_7": "THR",
    "~#REF!_8": "Bonus",
    "~#REF!_9": "BPJS Keluarga",
    "~__EMPTY_2": "Lainnya",
    "~#REF!_10": "GAJI KOTOR",
    "~#REF!_11": "Pinjaman",
    "~#REF!_12": "PPH 21",
    "~#REF!_13": "Gaji dimuka BPJS",
    "~__EMPTY_3": "Gaji dibayar dimuka",
    "~#REF!_14": "TOT POTONGAN",
    "~__EMPTY_4": "THP",
};

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
const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < people.value.length)

const rowClicked = (row_id) => {
    // console.log(row_id)
    // console.log(rowTbl.value[row_id].)

    rowTbl.value[row_id].checked = !rowTbl.value[row_id].checked;
    rowTbl.value[row_id].dispatchEvent(new Event('change'))
}

const changeFile = async (idx) => {
    fileRadio.value[idx].checked = !fileRadio.value[idx].checked;
    fileRadio.value[idx].dispatchEvent(new Event('change'))
    // console.log(files.value[fileSelect.value]);
    if(files.value[fileSelect.value]!==undefined){
        // console.log(btnFile.value)
        onLoad.value = true;
        btnFile.value.dispatchEvent(new Event('click'))
        selectedFile.value = files.value[fileSelect.value];
        const { data } = await useAsyncData('payroll', () => queryContent('/'+files.value[fileSelect.value].path).findOne());
        let _data = [];
        if (data.value.body !== undefined && data.value.body[0] !== undefined) {
            _data =  data.value.body[0].data.filter((v,k)=>k>0 && v["#REF!_19"]!==undefined);
        }
        people.value = _data;
        onLoad.value = false;
    }
}

const sendSlip = (person) =>{
    console.log(person['#REF!_19']);
    $mail.send({
        from: 'tmaapp@noreply.com',
        to:'rohimfikri@gmail.com',
        subject: 'TEST SLIP',
        text: 'This is an incredible test message',
    }).then((result)=>{
        console.log(result);
    }).catch((reason)=>{
        console.error(reason);
    });
}

onMounted(() => {
    initTooltips();
    selectedPeople.value = [];
    selectedFile.value = {
        name : "-- no file selected --",
        path: null
    };
    fileSelect.value = null;
})
</script>