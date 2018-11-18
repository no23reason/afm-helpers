import { AFM } from "@gooddata/typings";

interface HasAggregation {
    aggregation?: AFM.SimpleMeasureAggregation;
    withAggregation: (aggregation: AFM.SimpleMeasureAggregation) => this;
}

export const hasAggregation = <T extends object>(
    o: T,
): T & HasAggregation => ({
    ...o,
    aggregation: undefined,
    withAggregation(aggregation) {
        this.aggregation = aggregation;
        return this;
    },
});
