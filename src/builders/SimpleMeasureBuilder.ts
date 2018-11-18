import { getQualifierObject } from "./utils";
import { hasAggregation } from "./mixins/hasAggregation";
import { hasFilters } from "./mixins/hasFilters";

export const SimpleMeasureBuilder = (qualifierString: string) =>
    hasFilters(
        hasAggregation({
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
        }),
    );
