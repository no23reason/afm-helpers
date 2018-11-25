import "jest";
import { AFM } from "@gooddata/typings";

import { MeasureBuilder } from "../MeasureBuilder";

describe("MeasureBuilder", () => {
    it("throws if the definition is not specified", () => {
        const builder = MeasureBuilder("foo");
        expect(() => builder.build()).toThrow();
    });
    it("creates a measure with a SimpleMeasure definition", () => {
        const actual = MeasureBuilder("foo")
            .withSimpleMeasureDefinition("bar")
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            definition: {
                measure: {
                    aggregation: undefined,
                    computeRatio: false,
                    filters: [],
                    item: {
                        identifier: "bar"
                    }
                }
            },
            format: undefined,
            localIdentifier: "foo"
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with a SimpleMeasure definition with customisations", () => {
        const actual = MeasureBuilder("foo")
            .withSimpleMeasureDefinition("bar", b =>
                b.asRatio().withAggregation("avg")
            )
            .build();
        const expected: AFM.IMeasure = {
            alias: undefined,
            definition: {
                measure: {
                    aggregation: "avg",
                    computeRatio: true,
                    filters: [],
                    item: {
                        identifier: "bar"
                    }
                }
            },
            format: undefined,
            localIdentifier: "foo"
        };
        expect(actual).toEqual(expected);
    });
    it("creates a measure with a SimpleMeasure definition and an alias", () => {
        const actual = MeasureBuilder("foo")
            .withSimpleMeasureDefinition("bar")
            .withAlias("pseudo")
            .build();
        const expected: AFM.IMeasure = {
            alias: "pseudo",
            definition: {
                measure: {
                    aggregation: undefined,
                    computeRatio: false,
                    filters: [],
                    item: {
                        identifier: "bar"
                    }
                }
            },
            format: undefined,
            localIdentifier: "foo"
        };
        expect(actual).toEqual(expected);
    });
});
