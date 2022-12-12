import { gql } from "@apollo/client/core";
import { DocumentNode } from "@apollo/client/link/core/types";
import { isValid } from "./graphQLValidator";

function deepReplaceItemsGraphQLArg(object: any, key: any, predicate: (k: any, v: any) => boolean, argsMap: Map<string, any>) {
    if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) {
        argsMap.forEach((value: any, key: string) => {
            if (object.value && object.name.value === key) {
                object.value['kind'] = 'EnumValue';
                object.value['value'] = value;
            }
        });
    }
    if (Object.keys(object).length) {
        for (let i = 0; i < Object.keys(object).length; i++) {
            let value = object[Object.keys(object)[i]];
            if (typeof value === "object" && value != null) {
                deepReplaceItemsGraphQLArg(object[Object.keys(object)[i]], key, predicate, argsMap);
            }
        }
    }

}

export const replaceGraphQLArgs = (query: string | DocumentNode, argsMap: Map<string, any>) => {
    if (!query || query === '') {
      return null;
    }
    let graphQLQuery: DocumentNode = null;
    if (typeof query != DocumentNode) {
        if (!isValid(query)) {
            return null;
        }
        graphQLQuery = gql(query);
    } else {
        graphQLQuery = query;
    }
    deepReplaceItemsGraphQLArg(graphQLQuery, 'kind', (k, v) => v === 'Argument', argsMap);
    
    return graphQLQuery;
  };

