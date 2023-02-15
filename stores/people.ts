// store/filters.ts
import { defineStore } from 'pinia'

export const usePeopleStore = defineStore('peopleStore', () => {
    const peopleList = ref({})
    const dataStruct = ref({})
  
    function addPersonToPeopleList(key: any, person: any) {
      peopleList.value[key] = person
    }
  
    function clearPeopleList() {
      peopleList.value = {};
    }
  
    function setDataStruct(struct: Object) {
        dataStruct.value = struct
    }
  
    function clearDataStruct() {
        dataStruct.value = {};
    }
    // const persistedState = "sessionStorage";
    return { addPersonToPeopleList, clearPeopleList, peopleList, setDataStruct, clearDataStruct, dataStruct }
  },{persist:true})