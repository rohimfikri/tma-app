// @ts-ignore
import { defineTransformer } from "@nuxt/content/transformers/utils";
import { read, utils } from "xlsx";
import { readFileSync } from "fs";
import { resolve } from 'path';

export default defineTransformer({
  name: 'sheetformer',
  extensions: ['.xlsx'],
  parse (_id: string, rawContent: string) {
    // console.log({_id})
    const wb = read(readFileSync(resolve("./content/" + _id.slice(8))));
    const body = wb.SheetNames.map(name => ({ name, data: utils.sheet_to_json(wb.Sheets[name])}));
    return { _id, body };
  }
});