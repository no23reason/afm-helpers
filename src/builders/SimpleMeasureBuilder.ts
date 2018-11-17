import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "./utils";

export class SimpleMeasureBuilder {
    private aggregation?: AFM.SimpleMeasureAggregation;
    private filters: AFM.FilterItem[] = [];
    private qualifierString = "";
    private computeRatio = false;

    private constructor(qualifierString: string) {
        this.qualifierString = qualifierString;
    }

    static of(qualifierString: string) {
        return new SimpleMeasureBuilder(qualifierString);
    }

    withPositiveAttributeFilter = (
        qualifierString: string,
        values: string[],
    ) => {
        const filter: AFM.IPositiveAttributeFilter = {
            positiveAttributeFilter: {
                displayForm: getQualifierObject(qualifierString),
                in: values,
            },
        };
        this.filters.push(filter);
        return this;
    };

    withNegativeAttributeFilter = (
        qualifierString: string,
        values: string[],
    ) => {
        const filter: AFM.INegativeAttributeFilter = {
            negativeAttributeFilter: {
                displayForm: getQualifierObject(qualifierString),
                notIn: values,
            },
        };
        this.filters.push(filter);
        return this;
    };

    withAbsoluteDateFilter = (
        qualifierString: string,
        from: string,
        to: string,
    ) => {
        const filter: AFM.IAbsoluteDateFilter = {
            absoluteDateFilter: {
                dataSet: getQualifierObject(qualifierString),
                from,
                to,
            },
        };
        this.filters.push(filter);
        return this;
    };

    withRelativeDateFilter = (
        qualifierString: string,
        granularity: string,
        from: number,
        to: number,
    ) => {
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
    };

    asRatio = () => {
        this.computeRatio = true;
        return this;
    };

    withAggregation = (aggregation: AFM.SimpleMeasureAggregation) => {
        this.aggregation = aggregation;
        return this;
    };

    build = (): AFM.ISimpleMeasureDefinition => {
        return {
            measure: {
                item: getQualifierObject(this.qualifierString),
                aggregation: this.aggregation,
                filters: this.filters,
                computeRatio: this.computeRatio,
            },
        };
    };
}
