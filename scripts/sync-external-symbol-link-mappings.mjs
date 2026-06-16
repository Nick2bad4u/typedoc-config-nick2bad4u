/**
 * Synchronize the manual TypeDoc external symbol link mappings.
 *
 * The map below is the reviewed source of truth. Keep generated-from-package
 * helpers out of this file until a package has a stable file-to-docs URL rule.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const typedocConfigPath = fileURLToPath(
    new URL("../typedoc.json", import.meta.url)
);

/**
 * @typedef {Record<string, Record<string, string>>} ExternalSymbolLinkMappings
 */

/**
 * Add package docs URLs here when TypeDoc cannot infer the desired public docs
 * link from plugins or source declarations.
 *
 * @satisfies {ExternalSymbolLinkMappings}
 */
const externalSymbolLinkMappings = {
    "@testing-library/react": {
        fireEvent:
            "https://testing-library.com/docs/dom-testing-library/api-events",
        render: "https://testing-library.com/docs/react-testing-library/api#render",
        screen: "https://testing-library.com/docs/queries/about#screen",
        waitFor:
            "https://testing-library.com/docs/dom-testing-library/api-async#waitfor",
    },
    javascript: {
        Array: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
        Boolean:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
        Date: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
        Error: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
        Map: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
        Number: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
        Object: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
        Promise:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        RegExp: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
        Set: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
        String: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
        WeakMap:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
        WeakSet:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet",
    },
    node: {
        Buffer: "https://nodejs.org/docs/latest/api/buffer.html#class-buffer",
        crypto: "https://nodejs.org/docs/latest/api/crypto.html",
        Error: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
        EventEmitter:
            "https://nodejs.org/docs/latest/api/events.html#class-eventemitter",
        events: "https://nodejs.org/docs/latest/api/events.html",
        fs: "https://nodejs.org/docs/latest/api/fs.html",
        os: "https://nodejs.org/docs/latest/api/os.html",
        path: "https://nodejs.org/docs/latest/api/path.html",
        process: "https://nodejs.org/docs/latest/api/process.html",
        url: "https://nodejs.org/docs/latest/api/url.html",
    },
    postcss: {
        Plugin: "https://postcss.org/api/#plugin",
    },
    react: {
        Component: "https://react.dev/reference/react/Component",
        JSX: "https://react.dev/learn/writing-markup-with-jsx",
        ReactNode: "https://react.dev/reference/react/Children#react-node-type",
        useCallback: "https://react.dev/reference/react/useCallback",
        useContext: "https://react.dev/reference/react/useContext",
        useEffect: "https://react.dev/reference/react/useEffect",
        useMemo: "https://react.dev/reference/react/useMemo",
        useReducer: "https://react.dev/reference/react/useReducer",
        useRef: "https://react.dev/reference/react/useRef",
        useState: "https://react.dev/reference/react/useState",
    },
    "ts-extras": {
        arrayAt:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/array-at.ts",
        arrayConcat:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/array-concat.ts",
        arrayFirst:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/array-first.ts",
        arrayIncludes:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/array-includes.ts",
        arrayJoin:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/array-join.ts",
        arrayLast:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/array-last.ts",
        assertDefined:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/assert-defined.ts",
        assertError:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/assert-error.ts",
        assertNever:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/assert-never.ts",
        assertPresent:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/assert-present.ts",
        asWritable:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/as-writable.ts",
        isDefined:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-defined.ts",
        isEmpty:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-empty.ts",
        isEqualType:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-equal-type.ts",
        isFinite:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-finite.ts",
        isInfinite:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-infinite.ts",
        isInteger:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-integer.ts",
        isPresent:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-present.ts",
        isPropertyDefined:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-property-defined.ts",
        isPropertyPresent:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-property-present.ts",
        isSafeInteger:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/is-safe-integer.ts",
        keyIn: "https://github.com/sindresorhus/ts-extras/blob/main/source/key-in.ts",
        not: "https://github.com/sindresorhus/ts-extras/blob/main/source/not.ts",
        objectEntries:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/object-entries.ts",
        objectFromEntries:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/object-from-entries.ts",
        objectHasIn:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/object-has-in.ts",
        objectHasOwn:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/object-has-own.ts",
        objectKeys:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/object-keys.ts",
        objectMapValues:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/object-map-values.ts",
        objectValues:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/object-values.ts",
        safeCastTo:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/safe-cast-to.ts",
        setHas: "https://github.com/sindresorhus/ts-extras/blob/main/source/set-has.ts",
        stringSplit:
            "https://github.com/sindresorhus/ts-extras/blob/main/source/string-split.ts",
    },
    "type-fest": {
        AbstractClass:
            "https://github.com/sindresorhus/type-fest/blob/main/source/abstract-class.d.ts",
        AbstractConstructor:
            "https://github.com/sindresorhus/type-fest/blob/main/source/abstract-constructor.d.ts",
        AllExtend:
            "https://github.com/sindresorhus/type-fest/blob/main/source/all-extend.d.ts",
        AllUnionFields:
            "https://github.com/sindresorhus/type-fest/blob/main/source/all-union-fields.d.ts",
        Alphanumeric:
            "https://github.com/sindresorhus/type-fest/blob/main/source/alphanumeric.d.ts",
        And: "https://github.com/sindresorhus/type-fest/blob/main/source/and.d.ts",
        Arrayable:
            "https://github.com/sindresorhus/type-fest/blob/main/source/arrayable.d.ts",
        ArrayElement:
            "https://github.com/sindresorhus/type-fest/blob/main/source/array-element.d.ts",
        ArrayIndices:
            "https://github.com/sindresorhus/type-fest/blob/main/source/array-indices.d.ts",
        ArraySlice:
            "https://github.com/sindresorhus/type-fest/blob/main/source/array-slice.d.ts",
        ArraySplice:
            "https://github.com/sindresorhus/type-fest/blob/main/source/array-splice.d.ts",
        ArrayTail:
            "https://github.com/sindresorhus/type-fest/blob/main/source/array-tail.d.ts",
        ArrayValues:
            "https://github.com/sindresorhus/type-fest/blob/main/source/array-values.d.ts",
        Asyncify:
            "https://github.com/sindresorhus/type-fest/blob/main/source/asyncify.d.ts",
        AsyncReturnType:
            "https://github.com/sindresorhus/type-fest/blob/main/source/async-return-type.d.ts",
        CamelCase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/camel-case.d.ts",
        CamelCasedProperties:
            "https://github.com/sindresorhus/type-fest/blob/main/source/camel-cased-properties.d.ts",
        CamelCasedPropertiesDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/camel-cased-properties-deep.d.ts",
        Class: "https://github.com/sindresorhus/type-fest/blob/main/source/class.d.ts",
        ConditionalExcept:
            "https://github.com/sindresorhus/type-fest/blob/main/source/conditional-except.d.ts",
        ConditionalKeys:
            "https://github.com/sindresorhus/type-fest/blob/main/source/conditional-keys.d.ts",
        ConditionalPick:
            "https://github.com/sindresorhus/type-fest/blob/main/source/conditional-pick.d.ts",
        ConditionalPickDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/conditional-pick-deep.d.ts",
        ConditionalSimplify:
            "https://github.com/sindresorhus/type-fest/blob/main/source/conditional-simplify.d.ts",
        ConditionalSimplifyDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/conditional-simplify-deep.d.ts",
        Constructor:
            "https://github.com/sindresorhus/type-fest/blob/main/source/constructor.d.ts",
        DelimiterCase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/delimiter-case.d.ts",
        DelimiterCasedProperties:
            "https://github.com/sindresorhus/type-fest/blob/main/source/delimiter-cased-properties.d.ts",
        DelimiterCasedPropertiesDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/delimiter-cased-properties-deep.d.ts",
        DigitCharacter:
            "https://github.com/sindresorhus/type-fest/blob/main/source/digit-character.d.ts",
        DistributedOmit:
            "https://github.com/sindresorhus/type-fest/blob/main/source/distributed-omit.d.ts",
        DistributedPick:
            "https://github.com/sindresorhus/type-fest/blob/main/source/distributed-pick.d.ts",
        EmptyObject:
            "https://github.com/sindresorhus/type-fest/blob/main/source/empty-object.d.ts",
        Entries:
            "https://github.com/sindresorhus/type-fest/blob/main/source/entries.d.ts",
        Entry: "https://github.com/sindresorhus/type-fest/blob/main/source/entry.d.ts",
        Exact: "https://github.com/sindresorhus/type-fest/blob/main/source/exact.d.ts",
        Except: "https://github.com/sindresorhus/type-fest/blob/main/source/except.d.ts",
        ExcludeRestElement:
            "https://github.com/sindresorhus/type-fest/blob/main/source/exclude-rest-element.d.ts",
        ExcludeStrict:
            "https://github.com/sindresorhus/type-fest/blob/main/source/exclude-strict.d.ts",
        ExclusifyUnion:
            "https://github.com/sindresorhus/type-fest/blob/main/source/exclusify-union.d.ts",
        ExtendsStrict:
            "https://github.com/sindresorhus/type-fest/blob/main/source/extends-strict.d.ts",
        ExtractRestElement:
            "https://github.com/sindresorhus/type-fest/blob/main/source/extract-rest-element.d.ts",
        ExtractStrict:
            "https://github.com/sindresorhus/type-fest/blob/main/source/extract-strict.d.ts",
        FindGlobalInstanceType:
            "https://github.com/sindresorhus/type-fest/blob/main/source/find-global-instance-type.d.ts",
        FindGlobalType:
            "https://github.com/sindresorhus/type-fest/blob/main/source/find-global-type.d.ts",
        Finite: "https://github.com/sindresorhus/type-fest/blob/main/source/finite.d.ts",
        FixedLengthArray:
            "https://github.com/sindresorhus/type-fest/blob/main/source/fixed-length-array.d.ts",
        Float: "https://github.com/sindresorhus/type-fest/blob/main/source/float.d.ts",
        Get: "https://github.com/sindresorhus/type-fest/blob/main/source/get.d.ts",
        GlobalThis:
            "https://github.com/sindresorhus/type-fest/blob/main/source/global-this.d.ts",
        GreaterThan:
            "https://github.com/sindresorhus/type-fest/blob/main/source/greater-than.d.ts",
        GreaterThanOrEqual:
            "https://github.com/sindresorhus/type-fest/blob/main/source/greater-than-or-equal.d.ts",
        HasOptionalKeys:
            "https://github.com/sindresorhus/type-fest/blob/main/source/has-optional-keys.d.ts",
        HasReadonlyKeys:
            "https://github.com/sindresorhus/type-fest/blob/main/source/has-readonly-keys.d.ts",
        HasRequiredKeys:
            "https://github.com/sindresorhus/type-fest/blob/main/source/has-required-keys.d.ts",
        HasWritableKeys:
            "https://github.com/sindresorhus/type-fest/blob/main/source/has-writable-keys.d.ts",
        If: "https://github.com/sindresorhus/type-fest/blob/main/source/if.d.ts",
        Includes:
            "https://github.com/sindresorhus/type-fest/blob/main/source/includes.d.ts",
        IntClosedRange:
            "https://github.com/sindresorhus/type-fest/blob/main/source/int-closed-range.d.ts",
        Integer:
            "https://github.com/sindresorhus/type-fest/blob/main/source/integer.d.ts",
        IntRange:
            "https://github.com/sindresorhus/type-fest/blob/main/source/int-range.d.ts",
        InvariantOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/invariant-of.d.ts",
        IsAny: "https://github.com/sindresorhus/type-fest/blob/main/source/is-any.d.ts",
        IsBooleanLiteral:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-boolean-literal.d.ts",
        IsEmptyObject:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-empty-object.d.ts",
        IsEqual:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-equal.d.ts",
        IsFloat:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-float.d.ts",
        IsInteger:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-integer.d.ts",
        IsLiteral:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-literal.d.ts",
        IsLowercase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-lowercase.d.ts",
        IsNegative:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-negative.d.ts",
        IsNever:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-never.d.ts",
        IsNull: "https://github.com/sindresorhus/type-fest/blob/main/source/is-null.d.ts",
        IsNullable:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-nullable.d.ts",
        IsNumericLiteral:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-numeric-literal.d.ts",
        IsOptional:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-optional.d.ts",
        IsOptionalKeyOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-optional-key-of.d.ts",
        IsReadonlyKeyOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-readonly-key-of.d.ts",
        IsRequiredKeyOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-required-key-of.d.ts",
        IsStringLiteral:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-string-literal.d.ts",
        IsSymbolLiteral:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-symbol-literal.d.ts",
        IsTuple:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-tuple.d.ts",
        IsUndefined:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-undefined.d.ts",
        IsUnion:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-union.d.ts",
        IsUnknown:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-unknown.d.ts",
        IsUppercase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-uppercase.d.ts",
        IsWritableKeyOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/is-writable-key-of.d.ts",
        IterableElement:
            "https://github.com/sindresorhus/type-fest/blob/main/source/iterable-element.d.ts",
        Join: "https://github.com/sindresorhus/type-fest/blob/main/source/join.d.ts",
        JsonArray:
            "https://github.com/sindresorhus/type-fest/blob/main/source/basic.d.ts",
        Jsonifiable:
            "https://github.com/sindresorhus/type-fest/blob/main/source/jsonifiable.d.ts",
        Jsonify:
            "https://github.com/sindresorhus/type-fest/blob/main/source/jsonify.d.ts",
        JsonObject:
            "https://github.com/sindresorhus/type-fest/blob/main/source/basic.d.ts",
        JsonPrimitive:
            "https://github.com/sindresorhus/type-fest/blob/main/source/basic.d.ts",
        JsonValue:
            "https://github.com/sindresorhus/type-fest/blob/main/source/basic.d.ts",
        KebabCase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/kebab-case.d.ts",
        KebabCasedProperties:
            "https://github.com/sindresorhus/type-fest/blob/main/source/kebab-cased-properties.d.ts",
        KebabCasedPropertiesDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/kebab-cased-properties-deep.d.ts",
        KeyAsString:
            "https://github.com/sindresorhus/type-fest/blob/main/source/key-as-string.d.ts",
        KeysOfUnion:
            "https://github.com/sindresorhus/type-fest/blob/main/source/keys-of-union.d.ts",
        LastArrayElement:
            "https://github.com/sindresorhus/type-fest/blob/main/source/last-array-element.d.ts",
        LessThan:
            "https://github.com/sindresorhus/type-fest/blob/main/source/less-than.d.ts",
        LessThanOrEqual:
            "https://github.com/sindresorhus/type-fest/blob/main/source/less-than-or-equal.d.ts",
        LiteralToPrimitive:
            "https://github.com/sindresorhus/type-fest/blob/main/source/literal-to-primitive.d.ts",
        LiteralToPrimitiveDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/literal-to-primitive-deep.d.ts",
        LiteralUnion:
            "https://github.com/sindresorhus/type-fest/blob/main/source/literal-union.d.ts",
        LowercaseLetter:
            "https://github.com/sindresorhus/type-fest/blob/main/source/lowercase-letter.d.ts",
        Merge: "https://github.com/sindresorhus/type-fest/blob/main/source/merge.d.ts",
        MergeDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/merge-deep.d.ts",
        MergeExclusive:
            "https://github.com/sindresorhus/type-fest/blob/main/source/merge-exclusive.d.ts",
        MultidimensionalArray:
            "https://github.com/sindresorhus/type-fest/blob/main/source/multidimensional-array.d.ts",
        MultidimensionalReadonlyArray:
            "https://github.com/sindresorhus/type-fest/blob/main/source/multidimensional-readonly-array.d.ts",
        Negative:
            "https://github.com/sindresorhus/type-fest/blob/main/source/negative.d.ts",
        NegativeFloat:
            "https://github.com/sindresorhus/type-fest/blob/main/source/negative-float.d.ts",
        NegativeInfinity:
            "https://github.com/sindresorhus/type-fest/blob/main/source/negative-infinity.d.ts",
        NegativeInteger:
            "https://github.com/sindresorhus/type-fest/blob/main/source/negative-integer.d.ts",
        NonEmptyObject:
            "https://github.com/sindresorhus/type-fest/blob/main/source/non-empty-object.d.ts",
        NonEmptyString:
            "https://github.com/sindresorhus/type-fest/blob/main/source/non-empty-string.d.ts",
        NonEmptyTuple:
            "https://github.com/sindresorhus/type-fest/blob/main/source/non-empty-tuple.d.ts",
        NonNegative:
            "https://github.com/sindresorhus/type-fest/blob/main/source/non-negative.d.ts",
        NonNegativeInteger:
            "https://github.com/sindresorhus/type-fest/blob/main/source/non-negative-integer.d.ts",
        ObservableLike:
            "https://github.com/sindresorhus/type-fest/blob/main/source/observable-like.d.ts",
        OmitDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/omit-deep.d.ts",
        OmitIndexSignature:
            "https://github.com/sindresorhus/type-fest/blob/main/source/omit-index-signature.d.ts",
        OptionalKeysOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/optional-keys-of.d.ts",
        Or: "https://github.com/sindresorhus/type-fest/blob/main/source/or.d.ts",
        OverrideProperties:
            "https://github.com/sindresorhus/type-fest/blob/main/source/override-properties.d.ts",
        PackageJson:
            "https://github.com/sindresorhus/type-fest/blob/main/source/package-json.d.ts",
        PartialDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/partial-deep.d.ts",
        PartialOnUndefinedDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/partial-on-undefined-deep.d.ts",
        PascalCase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/pascal-case.d.ts",
        PascalCasedProperties:
            "https://github.com/sindresorhus/type-fest/blob/main/source/pascal-cased-properties.d.ts",
        PascalCasedPropertiesDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/pascal-cased-properties-deep.d.ts",
        Paths: "https://github.com/sindresorhus/type-fest/blob/main/source/paths.d.ts",
        PickDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/pick-deep.d.ts",
        PickIndexSignature:
            "https://github.com/sindresorhus/type-fest/blob/main/source/pick-index-signature.d.ts",
        PositiveInfinity:
            "https://github.com/sindresorhus/type-fest/blob/main/source/positive-infinity.d.ts",
        Primitive:
            "https://github.com/sindresorhus/type-fest/blob/main/source/primitive.d.ts",
        Promisable:
            "https://github.com/sindresorhus/type-fest/blob/main/source/promisable.d.ts",
        ReadonlyDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/readonly-deep.d.ts",
        ReadonlyKeysOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/readonly-keys-of.d.ts",
        ReadonlyTuple:
            "https://github.com/sindresorhus/type-fest/blob/main/source/readonly-tuple.d.ts",
        RemovePrefix:
            "https://github.com/sindresorhus/type-fest/blob/main/source/remove-prefix.d.ts",
        RemoveSuffix:
            "https://github.com/sindresorhus/type-fest/blob/main/source/remove-suffix.d.ts",
        Replace:
            "https://github.com/sindresorhus/type-fest/blob/main/source/replace.d.ts",
        RequireAllOrNone:
            "https://github.com/sindresorhus/type-fest/blob/main/source/require-all-or-none.d.ts",
        RequireAtLeastOne:
            "https://github.com/sindresorhus/type-fest/blob/main/source/require-at-least-one.d.ts",
        RequiredDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/required-deep.d.ts",
        RequiredKeysOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/required-keys-of.d.ts",
        RequireExactlyOne:
            "https://github.com/sindresorhus/type-fest/blob/main/source/require-exactly-one.d.ts",
        RequireOneOrNone:
            "https://github.com/sindresorhus/type-fest/blob/main/source/require-one-or-none.d.ts",
        Schema: "https://github.com/sindresorhus/type-fest/blob/main/source/schema.d.ts",
        ScreamingSnakeCase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/screaming-snake-case.d.ts",
        SetFieldType:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-field-type.d.ts",
        SetNonNullable:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-non-nullable.d.ts",
        SetNonNullableDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-non-nullable-deep.d.ts",
        SetOptional:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-optional.d.ts",
        SetParameterType:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-parameter-type.d.ts",
        SetReadonly:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-readonly.d.ts",
        SetRequired:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-required.d.ts",
        SetRequiredDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-required-deep.d.ts",
        SetReturnType:
            "https://github.com/sindresorhus/type-fest/blob/main/source/set-return-type.d.ts",
        SharedUnionFields:
            "https://github.com/sindresorhus/type-fest/blob/main/source/shared-union-fields.d.ts",
        SharedUnionFieldsDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/shared-union-fields-deep.d.ts",
        Simplify:
            "https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts",
        SimplifyDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/simplify-deep.d.ts",
        SingleKeyObject:
            "https://github.com/sindresorhus/type-fest/blob/main/source/single-key-object.d.ts",
        SnakeCase:
            "https://github.com/sindresorhus/type-fest/blob/main/source/snake-case.d.ts",
        SnakeCasedProperties:
            "https://github.com/sindresorhus/type-fest/blob/main/source/snake-cased-properties.d.ts",
        SnakeCasedPropertiesDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/snake-cased-properties-deep.d.ts",
        Split: "https://github.com/sindresorhus/type-fest/blob/main/source/split.d.ts",
        SplitOnRestElement:
            "https://github.com/sindresorhus/type-fest/blob/main/source/split-on-rest-element.d.ts",
        Spread: "https://github.com/sindresorhus/type-fest/blob/main/source/spread.d.ts",
        Stringified:
            "https://github.com/sindresorhus/type-fest/blob/main/source/stringified.d.ts",
        StringRepeat:
            "https://github.com/sindresorhus/type-fest/blob/main/source/string-repeat.d.ts",
        StringSlice:
            "https://github.com/sindresorhus/type-fest/blob/main/source/string-slice.d.ts",
        StructuredCloneable:
            "https://github.com/sindresorhus/type-fest/blob/main/source/structured-cloneable.d.ts",
        Subtract:
            "https://github.com/sindresorhus/type-fest/blob/main/source/subtract.d.ts",
        Sum: "https://github.com/sindresorhus/type-fest/blob/main/source/sum.d.ts",
        Tagged: "https://github.com/sindresorhus/type-fest/blob/main/source/tagged.d.ts",
        TaggedUnion:
            "https://github.com/sindresorhus/type-fest/blob/main/source/tagged-union.d.ts",
        Trim: "https://github.com/sindresorhus/type-fest/blob/main/source/trim.d.ts",
        TsConfigJson:
            "https://github.com/sindresorhus/type-fest/blob/main/source/tsconfig-json.d.ts",
        TupleOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/tuple-of.d.ts",
        TupleToObject:
            "https://github.com/sindresorhus/type-fest/blob/main/source/tuple-to-object.d.ts",
        TupleToUnion:
            "https://github.com/sindresorhus/type-fest/blob/main/source/tuple-to-union.d.ts",
        TypedArray:
            "https://github.com/sindresorhus/type-fest/blob/main/source/typed-array.d.ts",
        UndefinedOnPartialDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/undefined-on-partial-deep.d.ts",
        UnionToIntersection:
            "https://github.com/sindresorhus/type-fest/blob/main/source/union-to-intersection.d.ts",
        UnionToTuple:
            "https://github.com/sindresorhus/type-fest/blob/main/source/union-to-tuple.d.ts",
        UnknownArray:
            "https://github.com/sindresorhus/type-fest/blob/main/source/unknown-array.d.ts",
        UnknownMap:
            "https://github.com/sindresorhus/type-fest/blob/main/source/unknown-map.d.ts",
        UnknownRecord:
            "https://github.com/sindresorhus/type-fest/blob/main/source/unknown-record.d.ts",
        UnknownSet:
            "https://github.com/sindresorhus/type-fest/blob/main/source/unknown-set.d.ts",
        UnwrapRequired:
            "https://github.com/sindresorhus/type-fest/blob/main/source/unwrap-required.d.ts",
        UnwrapTagged:
            "https://github.com/sindresorhus/type-fest/blob/main/source/unwrap-tagged.d.ts",
        UppercaseLetter:
            "https://github.com/sindresorhus/type-fest/blob/main/source/uppercase-letter.d.ts",
        ValueOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/value-of.d.ts",
        Words: "https://github.com/sindresorhus/type-fest/blob/main/source/words.d.ts",
        Writable:
            "https://github.com/sindresorhus/type-fest/blob/main/source/writable.d.ts",
        WritableDeep:
            "https://github.com/sindresorhus/type-fest/blob/main/source/writable-deep.d.ts",
        WritableKeysOf:
            "https://github.com/sindresorhus/type-fest/blob/main/source/writable-keys-of.d.ts",
        Xor: "https://github.com/sindresorhus/type-fest/blob/main/source/xor.d.ts",
    },
    typescript: {
        ArrayBufferView: "#",
        Exclude:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion",
        Extract:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union",
        NonNullable:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype",
        Omit: "https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys",
        Parameters:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype",
        Partial:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype",
        Pick: "https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys",
        Promise:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        Record: "https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type",
        Required:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype",
        ReturnType:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype",
    },
    vite: {
        defineConfig: "https://vitejs.dev/config/",
        Plugin: "https://vitejs.dev/guide/api-plugin.html",
        UserConfig: "https://vitejs.dev/config/",
    },
    vitest: {
        afterAll: "https://vitest.dev/api/#afterall",
        afterEach: "https://vitest.dev/api/#aftereach",
        beforeAll: "https://vitest.dev/api/#beforeall",
        beforeEach: "https://vitest.dev/api/#beforeeach",
        describe: "https://vitest.dev/api/#describe",
        expect: "https://vitest.dev/api/#expect",
        it: "https://vitest.dev/api/#test",
        test: "https://vitest.dev/api/#test",
    },
    zod: {
        z: "https://zod.dev/",
        "z.ZodError": "https://zod.dev/?id=error-handling",
        ZodArray: "https://zod.dev/?id=arrays",
        ZodBoolean: "https://zod.dev/?id=booleans",
        ZodError: "https://zod.dev/?id=error-handling",
        ZodNumber: "https://zod.dev/?id=numbers",
        ZodObject: "https://zod.dev/?id=objects",
        ZodOptional: "https://zod.dev/?id=optionals",
        ZodSchema: "https://zod.dev/?id=basic-usage",
        ZodString: "https://zod.dev/?id=strings",
        ZodType: "https://zod.dev/?id=basic-usage",
        ZodUnion: "https://zod.dev/?id=unions",
    },
};

/**
 * Compare JSON object keys the same way the repository JSON linter orders them.
 *
 * @param {string} left
 * @param {string} right
 */
const compareJsonKeys = (left, right) =>
    left < right ? -1 : left > right ? 1 : 0;

/**
 * @param {Record<string, string>} record
 *
 * @returns {Record<string, string>}
 */
const sortStringRecord = (record) =>
    Object.fromEntries(
        Object.entries(record).toSorted(([left], [right]) =>
            compareJsonKeys(left, right)
        )
    );

/**
 * @param {ExternalSymbolLinkMappings} mappings
 *
 * @returns {ExternalSymbolLinkMappings}
 */
const sortExternalSymbolLinkMappings = (mappings) =>
    Object.fromEntries(
        Object.entries(mappings)
            .toSorted(([left], [right]) => compareJsonKeys(left, right))
            .map(([packageName, packageMappings]) => [
                packageName,
                sortStringRecord(packageMappings),
            ])
    );

/**
 * @typedef {Record<string, unknown> & {
 *     externalSymbolLinkMappings?: ExternalSymbolLinkMappings;
 * }} TypeDocConfig
 */

/**
 * Parse command-line arguments.
 *
 * @param {readonly string[]} argumentList
 *
 * @returns {{ checkOnly: boolean }}
 */
const parseArguments = (argumentList) => {
    /** @type {boolean} */
    let checkOnly = false;

    for (const argument of argumentList) {
        if (argument === "--check") {
            checkOnly = true;
        } else {
            throw new TypeError(`Unknown argument: ${argument}`);
        }
    }

    return { checkOnly };
};

/**
 * Parse the TypeDoc config as an object record.
 *
 * @param {string} configContent
 *
 * @returns {TypeDocConfig}
 */
const parseTypeDocConfig = (configContent) => {
    const config = /** @type {unknown} */ (JSON.parse(configContent));

    if (
        typeof config !== "object" ||
        config === null ||
        Array.isArray(config)
    ) {
        throw new TypeError("Expected typedoc.json to contain a JSON object.");
    }

    return /** @type {TypeDocConfig} */ (config);
};

/**
 * Serialize JSON using this repository's checked formatting.
 *
 * @param {unknown} value
 *
 * @returns {string}
 */
const serializeJson = (value) => `${JSON.stringify(value, null, 4)}\n`;

/**
 * Build the synchronized TypeDoc config without changing unrelated options.
 *
 * @param {TypeDocConfig} config
 *
 * @returns {TypeDocConfig}
 */
const buildSynchronizedConfig = (config) => ({
    ...config,
    externalSymbolLinkMappings: sortExternalSymbolLinkMappings(
        externalSymbolLinkMappings
    ),
});

const main = async () => {
    const { checkOnly } = parseArguments(process.argv.slice(2));
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- typedocConfigPath is a repo-local constant.
    const currentConfigContent = await readFile(typedocConfigPath, "utf8");
    const currentConfig = parseTypeDocConfig(currentConfigContent);
    const synchronizedConfigContent = serializeJson(
        buildSynchronizedConfig(currentConfig)
    );

    if (checkOnly) {
        if (currentConfigContent !== synchronizedConfigContent) {
            throw new TypeError(
                "typedoc.json externalSymbolLinkMappings are stale. Run `npm run sync:external-symbol-links`."
            );
        }

        // eslint-disable-next-line no-console -- CLI status output.
        console.log("TypeDoc external symbol link mappings are synchronized.");
        return;
    }

    // eslint-disable-next-line security/detect-non-literal-fs-filename -- typedocConfigPath is a repo-local constant.
    await writeFile(typedocConfigPath, synchronizedConfigContent, "utf8");
    // eslint-disable-next-line no-console -- CLI status output.
    console.log("Synchronized TypeDoc external symbol link mappings.");
};

try {
    await main();
} catch (error) {
    // eslint-disable-next-line no-console -- CLI failure output.
    console.error(
        "Failed to synchronize TypeDoc external symbol link mappings:",
        error
    );
    process.exitCode = 1;
}
