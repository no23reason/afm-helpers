import { AFM } from "@gooddata/typings";

import { getQualifierObject } from "./utils";

export const AFMBuilder = {
    measure(identifier: string) {
        return new SimpleMeasureBuilder(identifier, new ExecutionBuilder());
    }
};

class ExecutionBuilder implements AFM.IExecution {
    execution: AFM.IExecution["execution"] = {
        afm: {}
    };

    measure = (identifier: string) => {
        return new SimpleMeasureBuilder(identifier, this);
    };
}

class SimpleMeasureBuilder extends ExecutionBuilder {
    constructor(identifier: string, parent: ExecutionBuilder) {
        super();
        this.execution = parent.execution;
        if (!this.execution.afm.measures) {
            this.execution.afm.measures = [];
        }
        const measure: AFM.IMeasure = {
            localIdentifier: `m${this.execution.afm.measures.length + 1}`, // simple automatic localIdentifier generation
            definition: {
                measure: {
                    item: getQualifierObject(identifier)
                }
            }
        };

        this.execution.afm.measures.push(measure);
    }

    getMeasure = () =>
        this.execution.afm.measures[this.execution.afm.measures.length - 1];

    localIdentifier = (value: string) => {
        this.getMeasure().localIdentifier = value;
        return this;
    };

    alias = (value: string) => {
        this.getMeasure().alias = value;
        return this;
    };

    format = (value: string) => {
        this.getMeasure().format = value;
        return this;
    };
}
