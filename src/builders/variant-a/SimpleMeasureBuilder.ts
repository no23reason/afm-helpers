import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "../utils";

export class SimpleMeasureBuilder {
    constructor(localIdentifier: string, qualifierString: string) {
        this.localIdentifier = localIdentifier;
        this.qualifierString = qualifierString;
    }

    protected localIdentifier: string;
    protected qualifierString: string;

    protected alias?: string;
    withAlias = (alias: string) => {
        this.alias = alias;
        return this;
    };
    protected format?: string;
    withFormat = (format: string) => {
        this.format = format;
        return this;
    };

    protected computeRatio = false;
    asRatio = () => {
        this.computeRatio = true;
        return this;
    };

    protected aggregation?: AFM.SimpleMeasureAggregation;
    withAggregation = (aggregation: AFM.SimpleMeasureAggregation): this => {
        this.aggregation = aggregation;
        return this;
    };

    protected filters: AFM.FilterItem[] = [];
    withPositiveAttributeFilter = (
        qualifierString: string,
        values: string[]
    ): this => {
        const filter: AFM.IPositiveAttributeFilter = {
            positiveAttributeFilter: {
                displayForm: getQualifierObject(qualifierString),
                in: values
            }
        };
        this.filters.push(filter);
        return this;
    };
    withNegativeAttributeFilter = (
        qualifierString: string,
        values: string[]
    ): this => {
        const filter: AFM.INegativeAttributeFilter = {
            negativeAttributeFilter: {
                displayForm: getQualifierObject(qualifierString),
                notIn: values
            }
        };
        this.filters.push(filter);
        return this;
    };
    withAbsoluteDateFilter = (
        qualifierString: string,
        from: string,
        to: string
    ): this => {
        const filter: AFM.IAbsoluteDateFilter = {
            absoluteDateFilter: {
                dataSet: getQualifierObject(qualifierString),
                from,
                to
            }
        };
        this.filters.push(filter);
        return this;
    };
    withRelativeDateFilter = (
        qualifierString: string,
        granularity: string,
        from: number,
        to: number
    ): this => {
        const filter: AFM.IRelativeDateFilter = {
            relativeDateFilter: {
                dataSet: getQualifierObject(qualifierString),
                granularity,
                from,
                to
            }
        };
        this.filters.push(filter);
        return this;
    };

    build = (): AFM.IMeasure => ({
        alias: this.alias,
        format: this.format,
        definition: {
            measure: {
                aggregation: this.aggregation,
                item: getQualifierObject(this.qualifierString),
                computeRatio: this.computeRatio,
                filters: this.filters
            }
        },
        localIdentifier: this.localIdentifier
    });
}
