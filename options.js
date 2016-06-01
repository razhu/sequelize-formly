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

function formly(modelo) {
    return function (req, res, next) {
        modelo.describe().then(function (fields) {
            var xconfig = modelo.rawAttributes;
            var xformly = [];
            for (var field in fields) {
                var dataField = fields[field];
                var formlyField = {
                    "key": field,
                    "type": tipos[dataField.type].fieldType,
                    "templateOptions": {
                        "type": tipos[dataField.type].templateType,
                        "label": getXlabel(xconfig, field),
                        "required": !dataField.allowNull
                    }
                };
                xformly.push(formlyField);
            }
            //return(xformly);
            res.json(xformly);
        });
    };
}

function getXlabel(xconfig, field) {
    var xfield = field;
    if(field in xconfig) {
        if ('xlabel' in xconfig[field]) {
            xfield = xconfig[field].xlabel;
        }
    }
    return xfield;
}

module.exports = {
    formly: formly
};
