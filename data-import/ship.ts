export function buildShip(row: IDBRow): IShip {
    return {
        group: row.group_name,
        race: row.race_name,
        name: row.ship_name,
        description: row.ship_description,
        volume: row.volume,
        capacity: row.capacity,
        mass: row.mass,
        market_group_description: row.market_group_description,
        meta_group_name: row.meta_group_name,
        attributes: [buildAttribute(row)]
    }
}

export interface IDBRow {
    group_name: string;
    ship_name: string;
    ship_description: string;
    mass: number;
    volume: number;
    capacity: number;
    race_name: string;
    attribute_name: string;
    attribute_description: string;
    value_float: number;
    value_int: number;
    attribute_icon_path: string;
    market_group_name: string;
    market_group_description: string;
    meta_group_name: string;
}

export interface IShip {
    group: string;
    race: string;
    name: string;
    description: string;
    mass: number;
    volume: number;
    capacity: number;
    market_group_description: string;
    meta_group_name: string;
    attributes: Array<{
        name: string;
        description: string;
        icon_path: string;
        value: number;
    }>
}

export function buildAttribute(row: IDBRow) {
    var pathParts = row.attribute_icon_path.split('/');
    return {
        name: row.attribute_name,
        description: row.attribute_description,
        icon_path: pathParts[pathParts.length - 1],
        value: row.value_int ? row.value_int : row.value_float
    }
}