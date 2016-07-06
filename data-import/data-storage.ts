import * as path from 'path'
import * as fs from 'fs'
import {IGroup} from './data-import'

export var data = fs.readFileSync(path.join(__dirname, '../results.json')).toString();
