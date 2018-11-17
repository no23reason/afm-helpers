import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "../utils";

export interface HasFilters<T> {
    filters: AFM.FilterItem[];
    withPositiveAttributeFilter: (
        qualifierString: string,
        values: string[],
    ) => T & HasFilters<T>;
    withNegativeAttributeFilter: (
        qualifierString: string,
        values: string[],
    ) => T & HasFilters<T>;
    withAbsoluteDateFilter: (
        qualifierString: string,
        from: string,
        to: string,
    ) => T & HasFilters<T>;
    withRelativeDateFilter: (
        qualifierString: string,
        granularity: string,
        from: number,
        to: number,
    ) => T & HasFilters<T>;
}

export const withFilters = <T extends object>(o: T): T & HasFilters<T> => ({
    ...o,
    filters: [],
    withPositiveAttributeFilter(qualifierString, values) {
        const filter: AFM.IPositiveAttributeFilter = {
            positiveAttributeFilter: {
                displayForm: getQualifierObject(qualifierString),
                in: values,
            },
        };
        this.filters.push(filter);
        return this;
    },
    withNegativeAttributeFilter(qualifierString, values) {
        const filter: AFM.INegativeAttributeFilter = {
            negativeAttributeFilter: {
                displayForm: getQualifierObject(qualifierString),
                notIn: values,
            },
        };
        this.filters.push(filter);
        return this;
    },
    withAbsoluteDateFilter(qualifierString, from, to) {
        const filter: AFM.IAbsoluteDateFilter = {
            absoluteDateFilter: {
                dataSet: getQualifierObject(qualifierString),
                from,
                to,
            },
        };
        this.filters.push(filter);
        return this;
    },
    withRelativeDateFilter(qualifierString, granularity, from, to) {
        const filter: AFM.IRelativeDateFilter = {
            relativeDateFilter: {
                dataSet: getQualifierObject(qualifierString),
                granularity,
                from,
                to,
            },
        };
        this.filters.push(filter);
        return this;
    },
});
