import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "./utils";

export class AFMBuilder implements AFM.IExecution {
    execution: AFM.IExecution["execution"] = {
        afm: {}
    };

    measure = (identifier: string) => {
        if (!this.execution.afm.measures) {
            this.execution.afm.measures = [];
        }

        const measure = new SimpleMeasureBuilder(identifier, this);
        this.execution.afm.measures.push(measure);
        return measure;
    };
}

class SimpleMeasureBuilder implements AFM.IMeasure {
    constructor(identifier: string, parent: AFMBuilder) {
        this.definition = {
            measure: {
                item: getQualifierObject(identifier)
            }
        };
        this.measure = parent.measure;
        this.done = () => parent;
        // simple automatic localIdentifier generation
        this.localIdentifier = `m${parent.execution.afm.measures.length + 1}`;
    }
    // escape hatches to allow chaining to parent
    measure: AFMBuilder["measure"];
    // we need to call this method in the end to switch from chaining of Measure builder to chaining of AFMBuilder
    done: () => AFMBuilder;

    // AFM.IMeasure members and setter methods
    definition: AFM.ISimpleMeasureDefinition;
    localIdentifier = "";
    withLocalIdentifier = (identifier: string) => {
        this.localIdentifier = identifier;
        return this;
    };
    alias = undefined;
    withAlias = (alias: string) => {
        this.alias = alias;
        return this;
    };
    format = undefined;
    withFormat = (format: string) => {
        this.format = format;
        return this;
    };
}
