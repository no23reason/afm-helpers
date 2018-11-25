import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "./utils";
import { hasAggregation, HasAggregation } from "./mixins/hasAggregation";
import { hasFilters, HasFilters } from "./mixins/hasFilters";

interface SimpleMeasureDefinitionBuilderValue {
    computeRatio: boolean;
    asRatio: () => this;
    build: () => AFM.ISimpleMeasureDefinition;
}

export const SimpleMeasureDefinitionBuilder = (
    qualifierString: string
): SimpleMeasureDefinitionBuilderValue & HasFilters & HasAggregation =>
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
                        computeRatio: this.computeRatio
                    }
                };
            }
        })
    );
