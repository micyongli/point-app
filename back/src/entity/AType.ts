export interface AAttr {
    type: string;
    value: any;
}

export interface APlaceAttr {
    port: number;
    symbolTypeName: string;
    placePort: number;
    alignment: number;
    withAttrTypeName: boolean;
    textBoxWidth?: number;
    textBoxHeight?: number;
    x?: number;
    y?: number;
}

export interface ARelationObject {
    type: string;
    id: string;
}

export interface AGroup {
    groupId: string;
    name: string;
    parent?: string;
    attrs?: AAttr[];
    children: ARelationObject[];
}

export interface AOcc {
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor: string;
    borderWidth: number;
    borderStyle: number;
    symoblTypeName: string;
    placeAttr: APlaceAttr[];
}

export interface APoint {
    x: number;
    y: number;
}

export interface ACxnOcc {
    cxnTypeName: string;
    sourceId: string;
    targetId: string;
    sourceArrowType: number;
    targetArrowType: number;
    strokeColor: string;
    strokeStyle: number;
    placeAttr: APlaceAttr[];
    points: APoint[];
}

export interface AModelRevision {
    modelId: string;
    revision: number;
    description: string;
    createBy: string;
    createTime: number;
    asn: number,
}