import { idChange, withImg } from "../common/Table/TableChanger"
import { allCaps, allLower, capCase, moneyFormat, prettyDateFormat } from "../utils/utils"


export function useTableRowFormat() {

    const func = (fields:any = [], rowData:any = {}) => {
        return fields.filter((e:any) => !!e.name).map((e:any) =>
            e?.key2 ? (
                e?.date ? prettyDateFormat(rowData[e.key][e.key1][e.key2]) :
                e?.key2join ? `${rowData[e.key][e.key1][e.key2]} ${rowData[e.key][e.key1][e.key2join]}` :
                e?.money ? moneyFormat(rowData[e.key][e.key1][e.key2]) :
                e?.boolean ? (Boolean(rowData[e.key][e.key1][e.key2]) ? 'Yes' : 'No') :
                e?.state ? rowData[e.key][e.key1][e.key2] :
                e?.case ? capCase(rowData[e.key][e.key1][e.key2]) :
                e?.lower ? allLower(rowData[e.key][e.key1][e.key2]) :
                e?.caps ? allCaps(rowData[e.key][e.key1][e.key2]) :
                e?.status ? Boolean(rowData[e.key][e.key1][e.key2]) ? 'Yes' : 'No' :
                e?.specialKey ? e.specialKey(rowData[e.key][e.key1][e.key2]) :
                e?.custom ? e.custom(rowData) :
                e?.length ? rowData[e.key][e.key1][e.key2].length :
                e?.lga ? rowData[e.key][e.key1][e.key2] : rowData[e.key][e.key1][e.key2]
            ) :
                e?.key1 ? (
                e?.date ? prettyDateFormat(rowData[e.key][e.key1]) :
                e?.key1join ? `${rowData[e.key][e.key1]} ${rowData[e.key][e.key1join]}` :
                e?.money ? moneyFormat(rowData[e.key][e.key1]) :
                e?.boolean ? (Boolean(rowData[e.key][e.key1]) ? 'Yes' : 'No') :
                e?.state ? rowData[e.key][e.key1] :
                e?.case ? capCase(rowData[e.key][e.key1]) :
                e?.lower ? allLower(rowData[e.key][e.key1]) :
                e?.caps ? allCaps(rowData[e.key][e.key1]) :
                e?.status ? Boolean(rowData[e.key][e.key1]) ? 'Yes' : 'No' :
                e?.specialKey ? e.specialKey(rowData[e.key][e.key1]) :
                e?.custom ? e.custom(rowData) :
                e?.length ? rowData[e.key][e.key1].length :
                e?.lga ? rowData[e.key][e.key1] : rowData[e.key][e.key1]
            ) :
                e?.date ? prettyDateFormat(rowData[e.key]) :
                e?.keyjoin ? `${rowData[e.key]} ${rowData[e.keyjoin]}` :
                e?.money ? moneyFormat(rowData[e.key]) :
                e?.boolean ? (Boolean(rowData[e.key]) ? 'Yes' : 'No') :
                e?.state ? rowData[e.key] :
                e?.case ? capCase(rowData[e.key]) :
                e?.idChange ? idChange(rowData[e.key]) :
                e?.withImg ? withImg(rowData[e.key], rowData[e.img]) :
                e?.lower ? allLower(rowData[e.key]) :
                e?.caps ? allCaps(rowData[e.key]) :
                e?.status ? Boolean(rowData[e.key]) ? 'Yes' : 'No' :
                e?.specialKey ? e.specialKey(rowData[e.key]) :
                e?.custom ? e.custom(rowData) :
                e?.length ? rowData[e.key].length :
                e?.lga ? rowData[e.key] : rowData[e.key]
            )
    }

    return {
        format: (fields:any, rowData:any) => func(fields, rowData)
    }
}