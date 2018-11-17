import { DataLayer } from "@gooddata/gooddata-js";
import { AFM } from "@gooddata/typings";

const {
    Uri: { isUri },
} = DataLayer;

export const getQualifierObject = (qualifierString: string): AFM.ObjQualifier =>
    isUri(qualifierString)
        ? {
              uri: qualifierString,
          }
        : {
              identifier: qualifierString,
          };
