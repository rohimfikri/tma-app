<template>
    <div class="px-4 sm:px-6 lg:px-8 py-5">
        <label for="fileDropdown">Select File {{ fileSelect }}</label><br />
        <button id="fileDropdown" data-dropdown-toggle="fileSearch" data-dropdown-placement="right"
            :class="(selectedFile.path==null)?'bg-neutral-400':'bg-neutral-700'"
            class="text-white hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800"
            type="button">{{ selectedFile.name }} <Icon class="ml-3" name="ic:outline-keyboard-double-arrow-right" />
        </button>

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
                        placeholder="Search user">
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
                                                class=" bg-cyan-600 text-white py-0 px-1 rounded">
                                                <Icon name="cib:minutemailer" />
                                            </button>
                                            <div :id="`tooltipsend-${person['1']}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Kirim Slip Gaji ke <span class="text-cyan-600">{{ person['35'] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>

                                            <button :data-tooltip-target="`tooltipdown-${person['1']}`"
                                                data-tooltip-style="light" data-tooltip-placement="right"
                                                class=" bg-red-700 text-white py-0 px-1 rounded">
                                                <Icon class="-translate-y-1" name="uiw:file-pdf" />
                                            </button>
                                            <div :id="`tooltipdown-${person['1']}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Unduh Slip Gaji <span class="text-red-700">{{ person['2'] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>

                                            <button :data-tooltip-target="`tooltipview-${person['1']}`"
                                                data-tooltip-style="light" data-tooltip-placement="right"
                                                class=" bg-amber-600 text-white py-0 px-1 rounded">
                                                <Icon class="-translate-y-1" name="mdi:magnify-expand" />
                                            </button>
                                            <div :id="`tooltipview-${person['1']}`" role="tooltip"
                                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                                                Lihet Slip Gaji <span class="text-amber-600">{{ person['2'] }}</span>
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500"
                                        v-for="(head, key) in row_header" v-bind:key="`${key}-${person['1']}`"
                                        :class="[(key == '_2' || key == '_35' || key == '_31') && 'font-bold']"
                                        @click="rowClicked(person['1'])">
                                        {{ person[key.replace('_', '')] }}
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

const selectedFile = ref({
    name : "-- no file selected --",
    path: null
})
const fileSelect = ref(null)

const files = computed(() => {
    return [
        {
            name : "File A",
            path: 'a'
        },
        {
            name : "File B",
            path: 'b'
        }
    ]
})

const { data } = await useAsyncData('payroll', () => queryContent('/payroll/jan').findOne());
const rowTbl = ref({});
const fileRadio = ref({});
const row_header = {
    "_1": "NO",
    "_2": "NAMA",
    "_35": "Email",
    "_31": "NIK",
    "_30": "NPWP",
    "_32": "Bank",
    "_33": "Norek",
    "_34": "Fungsi",
    "_3": "PERIODE PYR",
    "_4": "Extra Meal All",
    "_5": "Extra Trans All",
    "_6": "Lembur",
    "_7": "Onsite",
    "_8": "Biztrip",
    "_9": "KODE PTKP",
    "_10": "GAPOK & Tj TETAP",
    "_11": "Tunj Proyek",
    "_12": "Extra Meal All",
    "_13": "Extra Transport All",
    "_14": "Lembur",
    "_15": "Tunj On Site",
    "_16": "Biztrip",
    "_17": "Tunj Sarana",
    "_18": "THR",
    "_19": "Bonus Thnan",
    "_20": "Bonus Lain",
    "_21": "GAJI KOTOR",
    "_22": "Pinjaman",
    "_23": "PPH 21",
    "_24": "Gaji Dimuka",
    "_25": "TOT POTONGAN",
    "_26": "THP",
    "_27": "Total Premi Naker",
    "_28": "Total Premi Kesehatan",
    "_29": "Benefit Lain",
    // "__EMPTY_6": "GP",
    // "__EMPTY_7": "TP",
    // "__EMPTY_8": "PI",
    // "__EMPTY_9": "BON",
    // "__EMPTY_10": "BL",
    // "__EMPTY_11": "GM",
    // "__EMPTY_12": "B"
};

const people = computed(() => {
    if (data.value.body[1] !== undefined) {
        // data.value.body[1].data.shift();
        // console.log(data.value.body[1].data)
        return data.value.body[1].data.filter((v,k)=>k>0);
    } else {
        return []
    }
})

const selectedPeople = ref([])
const checked = ref(false)
const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < people.length)

const rowClicked = (row_id) => {
    // console.log(row_id)
    // console.log(rowTbl.value[row_id].)

    rowTbl.value[row_id].checked = !rowTbl.value[row_id].checked;
    rowTbl.value[row_id].dispatchEvent(new Event('change'))
}

const changeFile = (idx) => {
    fileRadio.value[idx].checked = !fileRadio.value[idx].checked;
    fileRadio.value[idx].dispatchEvent(new Event('change'))
}

onMounted(() => {
    initTooltips();
    selectedPeople = [];
    selectedFile = {
        name : "-- no file selected --",
        path: null
    };
    fileSelect = null;
})
</script>