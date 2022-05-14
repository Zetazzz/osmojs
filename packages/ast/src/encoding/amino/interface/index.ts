import * as t from '@babel/types';
import { AminoParseContext } from '../../context';
import { ProtoField, ProtoType } from '../../proto/types';
import { getTypeUrl, protoFieldsToArray, typeUrlToAmino } from '../utils';
import { aminoInterface } from './utils';
import { getFieldOptionality, getOneOfs } from '../../proto';

export interface RenderAminoField {
    context: AminoParseContext;
    field: ProtoField;
    currentProtoPath: string;
    isOptional: boolean;
};

export const renderAminoField = ({
    context,
    field,
    currentProtoPath,
    isOptional
}: RenderAminoField) => {

    const args = {
        context,
        field,
        currentProtoPath,
        isOptional
    }

    if (field.rule === 'repeated') {
        switch (field.parsedType.type) {
            case 'Type':
                return aminoInterface.typeArray(args);
            case 'Enum':
                return aminoInterface.enumArray(args);
            default:
                return aminoInterface.array(args);
        }
    }

    switch (field.parsedType.type) {
        case 'Type':
            return aminoInterface.type(args);

        case 'Enum':
            return aminoInterface.enum(args);
    }

    // scalar types...
    switch (field.type) {
        case 'string':
            return aminoInterface.defaultType(args);
        case 'int64':
        case 'uint64':
            return aminoInterface.long(args);
        case 'double':
        case 'int64':
        case 'bool':
        case 'bytes':
        case 'Timestamp':
        case 'google.protobuf.Timestamp':
            return aminoInterface.defaultType(args);

        // TODO check can we just
        // make pieces optional and avoid hard-coding this type?
        case 'ibc.core.client.v1.Height':
        case 'Height':
            return aminoInterface.height(args);

        case 'Duration':
        case 'google.protobuf.Duration':
            return aminoInterface.duration(args);

        default:
            return aminoInterface.defaultType(args);
    }
};

export interface MakeAminoTypeInterface {
    context: AminoParseContext;
    proto: ProtoType;
};

export const makeAminoTypeInterface = ({
    context,
    proto
}: MakeAminoTypeInterface) => {
    context.addUtil('AminoMsg');

    const TypeName = proto.name;
    const typeUrl = getTypeUrl(context.ref.proto, proto);
    const aminoType = typeUrlToAmino(typeUrl, context.options.exceptions);

    const oneOfs = getOneOfs(proto);
    const fields = protoFieldsToArray(proto).map((field) => {
        const isOneOf = oneOfs.includes(field.name);
        const isOptional = getFieldOptionality(field, isOneOf);

        const aminoField = renderAminoField({
            context,
            field,
            currentProtoPath: context.ref.filename,
            isOptional
        });
        return {
            ctx: context,
            field: aminoField
        }
    });

    return t.exportNamedDeclaration(
        t.tsInterfaceDeclaration(
            t.identifier('Amino' + TypeName),
            null,
            [t.tsExpressionWithTypeArguments(t.identifier('AminoMsg'))],
            t.tSInterfaceBody([
                t.tSPropertySignature(t.identifier('type'), t.tsTypeAnnotation(
                    t.tSLiteralType(t.stringLiteral(aminoType))
                )),
                t.tSPropertySignature(t.identifier('value'), t.tsTypeAnnotation(t.tsTypeLiteral(
                    fields.map(({ field }) => field)
                )))
            ])
        )
    )

}