"use strict";
function buildShip(row) {
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
    };
}
exports.buildShip = buildShip;
function buildAttribute(row) {
    var pathParts = row.attribute_icon_path.split('/');
    return {
        name: row.attribute_name,
        description: row.attribute_description,
        icon_path: pathParts[pathParts.length - 1],
        value: row.value_int ? row.value_int : row.value_float
    };
}
exports.buildAttribute = buildAttribute;
