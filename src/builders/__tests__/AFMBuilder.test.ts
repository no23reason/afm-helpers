import "jest";

import { AFMBuilder } from "../AFMBuilder";

describe("AFMBuilder", () => {
    describe("measures", () => {
        it("TC: Two simple measures with formats and aliases", () => {
            const actual = AFMBuilder.measure("abcdefghi")
                .alias("My First Measure")
                .format("0.00")
                .measure("/gdc/md/abcd/obj/123")
                .format("#,##")
                .alias("My Other Measure");

            const expected = {
                execution: {
                    afm: {
                        measures: [
                            {
                                localIdentifier: "m1",
                                definition: {
                                    measure: {
                                        item: {
                                            identifier: "abcdefghi"
                                        }
                                    }
                                },
                                alias: "My First Measure",
                                format: "0.00"
                            },
                            {
                                localIdentifier: "m2",
                                definition: {
                                    measure: {
                                        item: {
                                            uri: "/gdc/md/abcd/obj/123"
                                        }
                                    }
                                },
                                alias: "My Other Measure",
                                format: "#,##"
                            }
                        ]
                    }
                }
            };

            expect(actual).toMatchObject(expected);
        });
    });
});
