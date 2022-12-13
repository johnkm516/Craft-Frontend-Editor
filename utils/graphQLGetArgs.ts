import { DocumentNode, gql } from "@apollo/client/core";
import { deepSearchItems } from "./deepSearchItems";
import { isValid } from "./graphQLValidator";

export const getGraphQLArgs = (query: string | DocumentNode) => {
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

    const args: string[] = deepSearchItems(graphQLQuery, 'kind', (k, v) => v === 'Argument').map(element => {
        return element.name.value;
    });
    console.log(graphQLQuery);
    return args;
  };