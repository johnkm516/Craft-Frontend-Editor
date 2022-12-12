import { gql } from "@apollo/client/core";

export const isValid = (query: string) => {
    if (!query || query === '') {
      return false;
    }
    try {
      gql(query);
      return true;
    } catch(err) {
      return err;
    }
  };