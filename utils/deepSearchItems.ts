export function deepSearchItems(object: any, key: any, predicate: (k: any, v: any) => boolean) {
    let ret: any[] = [];
    if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) {
        ret = [...ret, object];
    }
    if (Object.keys(object).length) {
        for (let i = 0; i < Object.keys(object).length; i++) {
            let value = object[Object.keys(object)[i]];
            if (typeof value === "object" && value != null) {
                let o = deepSearchItems(object[Object.keys(object)[i]], key, predicate);
                if (o != null && o instanceof Array) {
                    ret = [...ret, ...o];
                }
            }
        }
    }
    return ret;
}