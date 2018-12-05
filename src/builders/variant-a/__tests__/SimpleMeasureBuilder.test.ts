import "jest";
import { AFM } from "@gooddata/typings";

import { SimpleMeasureBuilder } from "../SimpleMeasureBuilder";

describe("SimpleMeasureBuilder from variant A", () => {
    it("creates a simple measure", () => {
        const actual = new SimpleMeasureBuilder("foo", "bar").build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            format: undefined,
            localIdentifier: "foo",
            definition: {
                measure: {
                    aggregation: undefined,
                    computeRatio: false,
                    filters: [],
                    item: {
                        identifier: "bar"
                    }
                }
            }
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with aggregation", () => {
        const actual = new SimpleMeasureBuilder("foo", "bar")
            .withAggregation("avg")
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            format: undefined,
            localIdentifier: "foo",
            definition: {
                measure: {
                    aggregation: "avg",
                    computeRatio: false,
                    filters: [],
                    item: {
                        identifier: "bar"
                    }
                }
            }
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with positive attribute filter", () => {
        const actual = new SimpleMeasureBuilder("foo", "bar")
            .withPositiveAttributeFilter("displayForm", ["bar", "baz"])
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            format: undefined,
            localIdentifier: "foo",
            definition: {
                measure: {
                    aggregation: undefined,
                    computeRatio: false,
                    filters: [
                        {
                            positiveAttributeFilter: {
                                displayForm: {
                                    identifier: "displayForm"
                                },
                                in: ["bar", "baz"]
                            }
                        }
                    ],
                    item: {
                        identifier: "bar"
                    }
                }
            }
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with negative attribute filter", () => {
        const actual = new SimpleMeasureBuilder("foo", "bar")
            .withNegativeAttributeFilter("displayForm", ["bar", "baz"])
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            format: undefined,
            localIdentifier: "foo",
            definition: {
                measure: {
                    aggregation: undefined,
                    computeRatio: false,
                    filters: [
                        {
                            negativeAttributeFilter: {
                                displayForm: {
                                    identifier: "displayForm"
                                },
                                notIn: ["bar", "baz"]
                            }
                        }
                    ],
                    item: {
                        identifier: "bar"
                    }
                }
            }
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with absolute date filter", () => {
        const actual = new SimpleMeasureBuilder("foo", "bar")
            .withAbsoluteDateFilter("displayForm", "2018-10-01", "2018-10-31")
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            format: undefined,
            localIdentifier: "foo",
            definition: {
                measure: {
                    aggregation: undefined,
                    computeRatio: false,
                    filters: [
                        {
                            absoluteDateFilter: {
                                dataSet: {
                                    identifier: "displayForm"
                                },
                                from: "2018-10-01",
                                to: "2018-10-31"
                            }
                        }
                    ],
                    item: {
                        identifier: "bar"
                    }
                }
            }
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with relative date filter", () => {
        const actual = new SimpleMeasureBuilder("foo", "bar")
            .withRelativeDateFilter("displayForm", "granularity", 1, 3)
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            format: undefined,
            localIdentifier: "foo",
            definition: {
                measure: {
                    aggregation: undefined,
                    computeRatio: false,
                    filters: [
                        {
                            relativeDateFilter: {
                                dataSet: {
                                    identifier: "displayForm"
                                },
                                granularity: "granularity",
                                from: 1,
                                to: 3
                            }
                        }
                    ],
                    item: {
                        identifier: "bar"
                    }
                }
            }
        };
        expect(actual).toEqual(expected);
    });
    it("creates a complex measure", () => {
        const actual = new SimpleMeasureBuilder("foo", "bar")
            .withAggregation("count")
            .withRelativeDateFilter("displayForm", "granularity", 1, 3)
            .asRatio()
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            format: undefined,
            localIdentifier: "foo",
            definition: {
                measure: {
                    aggregation: "count",
                    computeRatio: true,
                    filters: [
                        {
                            relativeDateFilter: {
                                dataSet: {
                                    identifier: "displayForm"
                                },
                                granularity: "granularity",
                                from: 1,
                                to: 3
                            }
                        }
                    ],
                    item: {
                        identifier: "bar"
                    }
                }
            }
        };
        expect(actual).toEqual(expected);
    });
});
