var tipos = {
    "INTEGER":{//INTEGER
        "fieldType": "input",
        "templateType": "number",
    },
    "CHARACTER VARYING":{//STRING
        "fieldType": "input",
        "templateType": "text",
    },
    "CHARACTER":{//CHAR
        "fieldType": "input",
        "templateType": "text",
    },
    "TEXT":{//TEXT
        "fieldType": "textarea",
        "templateType": "",
    },
    "BIGINT":{//BIGINT
        "fieldType": "input",
        "templateType": "number",
    },
    "DOUBLE PRECISION":{//FLOAT, DOUBLE
        "fieldType": "input",
        "templateType": "number",
        'step': 'any',
    },
    "REAL":{//REAL
        "fieldType": "input",
        "templateType": "number",
    },
    "NUMERIC":{//DECIMAL
        "fieldType": "input",
        "templateType": "number",
    },
    "BOOLEAN":{//BOOLEAN
        "fieldType": "checkbox",
        "templateType": "",
    },
    "TIME WITHOUT TIME ZONE":{//TIME
        "fieldType": "input",
        "templateType": "time",
    },
    "TIMESTAMP WITH TIME ZONE":{//DATE
        //"fieldType": "input",
        "fieldType": "datepicker",
        "templateType": "datetime-local",
    },
    "DATE":{//DATEONLY
        //"fieldType": "input",
        "fieldType": "datepicker",
        "templateType": "date",
    },
    "BYTEA":{//BLOB
        "fieldType": "textarea",
        "templateType": "",
    }
};

function formly(modelo, app_modelos=[]) {
    return function (req, res, next) {
        modelo.describe().then(function (fields) {
            var xconfig = modelo.rawAttributes;
            var xformly = [];
            for (var field in fields) {
                var dataField = fields[field];
                var formlyField = {
                    "key": getXAttribute(xconfig, field, 'fieldName'),
                    "type": tipos[dataField.type].fieldType,
                    "templateOptions": {
                        "type": tipos[dataField.type].templateType,
                        "label": getXAttribute(xconfig, field, 'xlabel'),
                        "required": !dataField.allowNull,
                        //"options": getXChoiceRelation(xconfig, field, app_modelos))
                    }
                };
                xformly.push(formlyField);
            }
            //return(xformly);
            res.json(xformly);
        });
    };
}

function findField(xconfig, fieldDB){
    for(var ind in xconfig){
        if(xconfig[ind].field == fieldDB){
            return xconfig[ind];
        }
    }
    return [];
}

function getXAttribute(xconfig, field, attribute) {
    var xfield = field;
    var xconfig_find = findField(xconfig, field);
    if (attribute in xconfig_find) {
        xfield = xconfig_find[attribute];
    }
    return xfield;
}

function getXChoiceRelation(xconfig, field, app_modelos) {
    var xchoice = [];
    if(field in xconfig) {
        if ('references' in xconfig[field]) {
            rmodel = xconfig[field].references.model;
            rkey = xconfig[field].references.key;
            //app_modelos[rmodel].findById(app_modelos[rmodel][rkey])

            //references: { model: 'parametros', key: 'id_parametro' }

        }
    }
    return xchoice;
}

module.exports = {
    formly: formly
};