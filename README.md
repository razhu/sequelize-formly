# sequelize-formly

A module that produces a REST options for a database schema into a formly format.
NOTE: this implementation only supports POSTGRES at the moment.

## Pre-requisities
This module requires:

    express
    sequelize

## Installation

```
$ npm install sequelize-formly
```

## Usage

Defining the route:

```
var sequelizeFormly = require('sequelize-formly');
app.options('/hammers', sequelizeFormly.formly(Model));
```

or
```
import sequelizeFormly from "sequelize-formly";
app.options('/hammers', sequelizeFormly.options(Model));
```

## API

A correct execution returns status 201.
```
app.options('/hammers', sequelizeFormly.options(Model));
```

Example request:
```
OPTIONS /hammers
Content-Type: application/json
{
    "key": "hammers",
    "type": "input",
    "templateOptions": {
      "type": "number",
      "label": "hammers",
      "required": true
    }
}
```

## LABEL FORMLY IN SEQUELIZE

xlabel needs to be defined in each field of the model.

```
Field1: {
    type: DataType.BLOB,
    field: 'demo1',
    allowNull: false,
    xlabel: "Demo Label 1",
}
```

## CHOICE FORMLY IN SEQUELIZE

xchoice needs to be defined in each relation field of the model.

```
Model1.belongsTo(Model2, {as: 'model_relation', foreignKey:{name: 'id_model', allowNull: false, xchoice:'field_name'}});
```

or concat field

```
Model1.belongsTo(Model2, {as: 'model_relation', foreignKey:{name: 'id_model', allowNull: false, xchoice:'field_name1+field_name2'}});
```
