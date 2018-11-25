import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "./utils";
import { hasAggregation } from "./mixins/hasAggregation";
import { hasFilters } from "./mixins/hasFilters";

export const SimpleMeasureDefinitionBuilder = (qualifierString: string) =>
    hasFilters(
        hasAggregation({
            computeRatio: false,
            asRatio() {
                this.computeRatio = true;
                return this;
            },
            build(): AFM.ISimpleMeasureDefinition {
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
