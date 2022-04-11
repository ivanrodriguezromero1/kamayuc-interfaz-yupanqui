export class UtilConvert {


    formatBytes(bytes): any {
        var kb = 1024;
        var ndx = Math.floor(Math.log(bytes) / Math.log(kb));
        var fileSizeTypes = ["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"];

        return {
            size: +(bytes / kb / kb).toFixed(2),
            type: fileSizeTypes[ndx]
        };
    }



}