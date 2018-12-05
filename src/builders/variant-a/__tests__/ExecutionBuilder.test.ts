import "jest";
import { AFM } from "@gooddata/typings";

import { ExecutionBuilder } from "../ExecutionBuilder";

describe("ExecutionBuilder from variant A", () => {
    describe("measure building", () => {
        it("creates a simple measure", () => {
            const actual = new ExecutionBuilder()
                .addSimpleMeasure("foo", "bar")
                .build();
            const expected: AFM.IExecution = {
                execution: {
                    afm: {
                        measures: [
                            {
                                localIdentifier: "bar",
                                definition: {
                                    measure: {
                                        aggregation: undefined,
                                        computeRatio: false,
                                        filters: [],
                                        item: {
                                            identifier: "foo"
                                        }
                                    }
                                },
                                alias: undefined,
                                format: undefined
                            }
                        ]
                    }
                }
            };
            expect(actual).toEqual(expected);
        });
        it("creates a simple measure with default localIdentifier", () => {
            const actual = new ExecutionBuilder()
                .addSimpleMeasure("foo")
                .build();
            const expected: AFM.IExecution = {
                execution: {
                    afm: {
                        measures: [
                            {
                                localIdentifier: "m1",
                                definition: {
                                    measure: {
                                        aggregation: undefined,
                                        computeRatio: false,
                                        filters: [],
                                        item: {
                                            identifier: "foo"
                                        }
                                    }
                                },
                                alias: undefined,
                                format: undefined
                            }
                        ]
                    }
                }
            };
            expect(actual).toEqual(expected);
        });
        it("creates a complex measure", () => {
            const actual = new ExecutionBuilder()
                .addSimpleMeasure("foo", "bar", b =>
                    b
                        .withAggregation("count")
                        .withRelativeDateFilter(
                            "displayForm",
                            "granularity",
                            1,
                            3
                        )
                        .asRatio()
                )
                .build();
            const expected: AFM.IExecution = {
                execution: {
                    afm: {
                        measures: [
                            {
                                localIdentifier: "bar",
                                definition: {
                                    measure: {
                                        aggregation: "count",
                                        computeRatio: true,
                                        filters: [
                                            {
                                                relativeDateFilter: {
                                                    dataSet: {
                                                        identifier:
                                                            "displayForm"
                                                    },
                                                    granularity: "granularity",
                                                    from: 1,
                                                    to: 3
                                                }
                                            }
                                        ],
                                        item: {
                                            identifier: "foo"
                                        }
                                    }
                                },
                                alias: undefined,
                                format: undefined
                            }
                        ]
                    }
                }
            };
            expect(actual).toEqual(expected);
        });
    });
});
