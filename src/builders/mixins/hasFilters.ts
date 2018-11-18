import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "../utils";

interface HasFilters {
    filters: AFM.FilterItem[];
    withPositiveAttributeFilter: (
        qualifierString: string,
        values: string[],
    ) => this;
    withNegativeAttributeFilter: (
        qualifierString: string,
        values: string[],
    ) => this;
    withAbsoluteDateFilter: (
        qualifierString: string,
        from: string,
        to: string,
    ) => this;
    withRelativeDateFilter: (
        qualifierString: string,
        granularity: string,
        from: number,
        to: number,
    ) => this;
}

export const hasFilters = <T extends object>(o: T): T & HasFilters => ({
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
