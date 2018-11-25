import { AFM } from "@gooddata/typings";
import { SimpleMeasureDefinitionBuilder } from "./SimpleMeasureDefinitionBuilder";

interface MeasureBuilderValue {
    alias?: string;
    withAlias: (alias: string) => this;
    format?: string;
    withFormat: (format: string) => this;
    definition?: AFM.MeasureDefinition;
    withSimpleMeasureDefinition: (
        qualifierString: string,
        recipe?: (
            builder: ReturnType<typeof SimpleMeasureDefinitionBuilder>
        ) => void
    ) => this;
    // TODO: other measure definition setters
    build: () => AFM.IMeasure;
}

export const MeasureBuilder = (
    localIdentifier: AFM.Identifier
): MeasureBuilderValue => ({
    alias: undefined,
    withAlias(alias) {
        this.alias = alias;
        return this;
    },
    format: undefined,
    withFormat(format) {
        this.format = format;
        return this;
    },
    withSimpleMeasureDefinition(qualifierString, recipe) {
        const builder = SimpleMeasureDefinitionBuilder(qualifierString);
        recipe && recipe(builder);
        this.definition = builder.build();
        return this;
    },
    build() {
        if (!this.definition) {
            throw Error("Measure has no definition.");
        }
        return {
            alias: this.alias,
            definition: this.definition,
            format: this.format,
            localIdentifier
        };
    }
});
