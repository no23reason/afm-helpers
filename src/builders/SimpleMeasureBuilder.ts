import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "./utils";
import { withFilters } from "./mixins/withFilters";

export const SimpleMeasureBuilder = (qualifierString: string) =>
    withFilters({
        aggregation: undefined,
        withAggregation(aggregation: AFM.SimpleMeasureAggregation) {
            this.aggregation = aggregation;
            return this;
        },
        computeRatio: false,
        asRatio() {
            this.computeRatio = true;
            return this;
        },
        build() {
            return {
                measure: {
                    item: getQualifierObject(qualifierString),
                    aggregation: this.aggregation,
                    filters: this.filters,
                    computeRatio: this.computeRatio,
                },
            };
        },
    });
