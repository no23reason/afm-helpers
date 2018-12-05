# afm-helpers

## Proposed syntax

### Variant A

The first proposed syntax draft is located in https://github.com/no23reason/gdc-afm-helpers/tree/master/src/builders/variant-a

```ts
const actual = new ExecutionBuilder()
    .addSimpleMeasure("foo", "bar", b =>
        b
            .withAggregation("count")
            .withRelativeDateFilter("displayForm", "granularity", 1, 3)
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
                                            identifier: "displayForm"
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
```

Pros:

-   Returns plain object (no methods)
-   It is explicit in what it does – adding a Measure is visible and you can see when you are editting the Measure, and when you are editting the Execuiton

Cons:

-   You have to call build at the end
-   Uses classes (idk if that is really an issue)

### Varaint B

The second draft is based on https://github.com/BugsBunny338/afm-helpers and is located in https://github.com/no23reason/gdc-afm-helpers/tree/master/src/builders/variant-b

```ts
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
```

Pros:

-   At any point the object is a valid IExecution (no need to call build)
-   For experienced user this would probably be quicker to write

Cons:

-   It does not return a plain object, the value contains helper methods as well
-   The API is a bit implicit, going from Measure customisation to Execution customisation is not very clear
