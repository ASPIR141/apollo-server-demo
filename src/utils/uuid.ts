export interface IUUID {
    asHex(): string;
}

class UUID implements IUUID {
    constructor(public _value: string) { }

    public asHex(): string {
        return this._value;
    }
}

class V4UUID extends UUID {

    private static readonly _chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    private static readonly _timeHighBits = ['8', '9', 'a', 'b'];

    private static _oneOf(array: string[]): string {
        return array[Math.floor(array.length * Math.random())];
    }

    private static _randomHex(): string {
        return V4UUID._oneOf(V4UUID._chars);
    }

    constructor() {
        super([
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            '4',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._oneOf(V4UUID._timeHighBits),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
        ].join(''));
    }
}

export function v4(): UUID {
    return new V4UUID();
}

const _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUUID(value: string): boolean {
    return _UUIDPattern.test(value);
}

export function parse(value: string): UUID {
    if (!isUUID(value)) {
        throw new Error('invalid uuid');
    }

    return new UUID(value);
}

export function generateUuid(): string {
    return v4().asHex();
}
