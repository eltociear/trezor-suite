import { getThpProtobufMessages } from './protobufDefinitions';

// partial { Root } from 'protobufjs/light';
export type ProtobufRoot = {
    lookupType: (path: string | string[]) => any;
    lookupEnum: (path: string | string[]) => any;
    define: (path: string | string[], json?: any) => any;
};

export const loadProtobuf = (messages: ProtobufRoot) => {
    try {
        // check if thp messages already exists
        messages.lookupType('ThpDeviceProperties');
    } catch (e) {
        // if not add thp definitions
        const thpMessages = getThpProtobufMessages();
        messages.define('thp', thpMessages);

        // and additionally extend existing MessageType enum
        const thpMessageType = thpMessages.MessageType.values;
        const enumType = messages.lookupEnum('MessageType');
        (Object.keys(thpMessageType) as (keyof typeof thpMessageType)[]).forEach(messageName => {
            const messageValue = thpMessageType[messageName];
            if (!enumType.values[messageName] && !enumType.valuesById[messageValue]) {
                enumType.values[messageName] = messageValue;
                enumType.valuesById[messageValue] = messageName;
            } else {
                console.warn('MessageType already exists', messageName, messageValue);
            }
        });
    }
};
