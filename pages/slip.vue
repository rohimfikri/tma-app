<template>
    <div class="w-[21cm] min-h-[29.7cm] mx-auto p-5 border-black border-2 " id="slip-page">
    <!-- <div class="m-8"> -->
        <div class="grid gap-4">
            <div class="flex border-solid border-black border-b-2 pb-4 justify-between" id="slip-head">
                <div class="flex-shrink text-left">
                    <div class="text-2xl font-bold">SLIP PEMBAYARAN</div>
                    <div class="text-xl">{{ head_month }} {{ head_year }}</div>
                </div>
                <div class="flex-shrink text-center">
                    <img src="~/assets/img/TMA.png" width="150" alt="">
                </div>
            </div>
            <div class="grid grid-cols-2 h-[100px] border-solid border-black border-2 p-2" id="slip-top">
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
                        <tr>
                            <td class="font-bold">A. Gaji Pokok</td>
                            <td class="px-2">:</td>
                            <td class="border-black border-2 text-right px-2">Rp {{ a_val }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pt-2">B. Tunjangan Tidak Tetap</td>
                        </tr>
                        <tr v-for="data in b_var" :key="data.lbl" class="text-sm">
                            <td class="">{{ data.lbl }}</td>
                            <td class="px-2">:</td>
                            <td class="text-right px-2">Rp {{ data.val }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold"></td>
                            <td class="px-2">:</td>
                            <td class="border-black border-2 text-right px-2">Rp {{ b_val }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold pt-2">C. Lain-lain</td>
                        </tr>
                        <tr v-for="data in c_var" :key="data.lbl" class="text-sm">
                            <td class="">{{ data.lbl }}</td>
                            <td class="px-2">:</td>
                            <td class="text-right px-2">Rp {{ data.val }}</td>
                        </tr>
                        <tr>
                            <td class="font-bold"></td>
                            <td class="px-2">:</td>
                            <td class="border-black border-2 text-right px-2">Rp {{ c_val }}</td>
                        </tr>
                        <tr>
                            <td colspan="3"><hr class="border-green-700 border-2 my-2"></td>
                        </tr>
                        <tr>
                            <td class="font-bold text-green-700">D. TOTAL PENDAPATAN</td>
                            <td class="px-2 text-green-700">:</td>
                            <td class="border-black font-bold text-green-700 border-2 text-right px-2">Rp {{ d_val }}</td>
                        </tr>
                    </table>
                </div>
                <div id="slip-out" class="pl-2 pr-4">
                    <table id="slip-tbl-in" class="w-full">
                        <tr v-for="data in e_var" :key="data.lbl" class="text-sm">
                            <td class="">{{ data.lbl }}</td>
                            <td class="px-2">:</td>
                            <td class="text-right px-2">Rp {{ data.val }}</td>
                        </tr>
                        <tr>
                            <td colspan="3"><hr class="border-red-700 border-2 my-2"></td>
                        </tr>
                        <tr>
                            <td class="font-bold text-red-700">E. TOTAL PENGURANGAN</td>
                            <td class="px-2 text-red-700">:</td>
                            <td class="border-black font-bold text-red-700 border-2 text-right px-2">Rp {{ e_val }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="slip-sum" class="my-4">
                <table id="slip-tbl-sum" class="w-full">
                    <tr>
                        <td class="font-bold border-blue-700 border-2 bg-blue-700 text-white pl-3 print:bg-blue-700"
                        style="print-color-adjust: exact;">F. YANG DIBAYARKAN</td>
                        <td class="border-blue-700 font-bold text-blue-700 border-2 text-right px-2">Rp {{ f_val }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-center italic border-blue-700 border-2 text-blue-700 pl-3">{{ f_str }} rupiah</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
const head_month = ref("")
const head_year = ref("")
const topleft_var = ref([
    {lbl:'Nama', val: ""},
    {lbl:'NIK', val: ""},
    {lbl:'Fungsi', val: ""}
])
const topright_var = ref([
    {lbl:'BANK', val: ""},
    {lbl:'No Rekening', val: ""},
    {lbl:'Status Pajak', val: ""}
])

const a_val = ref(0)
const b_val = ref(0)
const c_val = ref(0)
const d_val = ref(0)
const e_val = ref(0)
const f_val = ref(0)
const f_string = ref("")
const g_val = ref(0)
const b_var = ref([
    {lbl:'Extra Meal Allowance', val: 0},
    {lbl:'Extra Transport Allowance', val: 0},
    {lbl:'Lembur', val: 0},
    {lbl:'Tunjangan Proyek', val: 0},
    {lbl:'Tunjangan Onsite', val: 0},
    {lbl:'Tunjangan Perjalanan Dinas', val: 0},
    {lbl:'Tunjangan Sarana Kerja', val: 0},
])
const c_var = ref([
    {lbl:'BPJS Ketenagakerjaan', val: 0},
    {lbl:'BPJS Kesehatan', val: 0},
    {lbl:'THR', val: 0},
    {lbl:'Bonus', val: 0},
    {lbl:'Lainnya', val: 0},
])
const e_var = ref([
    {lbl:'BPJS Ketenagakerjaan', val: 0},
    {lbl:'BPJS Kesehatan', val: 0},
    {lbl:'Pinjaman', val: 0},
    {lbl:'PPH 21', val: 0},
    {lbl:'Gaji Dimuka', val: 0},
])
</script>