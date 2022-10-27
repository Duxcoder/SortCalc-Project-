import React from "react";


const Database = {
    grades : {
        steels: [
            { name: 'Сталь Ст3', density: 7850, material: 'Сталь'},
            { name: 'Сталь 45', density: 7826, material: 'Сталь' },
            { name: '08Х18Н10Т', density: 7900, material: 'Сталь' },
        ],
        aluminium: [
            {name: 'АЛ1', density: 2750, material: 'Алюминий'},
            {name: 'АЛ2', density: 2650, material: 'Алюминий'}
        ],
        aluminiums: [
            {name: 'АЛ12', density: 2750, material: 'Алюмин'},
            {name: 'АЛ121', density: 2650, material: 'Алюмин'}
        ]
    },
    gosts:
    {
      namesGosts: {
        gost8509: 'ГОСТ 8509-93 Уголки стальные горячекатаные равнополочные',
        gost8510: 'ГОСТ 8510-86 Уголки стальные горячекатаные неравнополочные'
      },
      corner: {
        gost8509:[
            {name: '20x20x3', height: 20, width: 20, thickness: 3, weight: 0.88, R: 3.5, r: 1.2},
            {name: '20x20x4', height: 20, width: 20, thickness: 4, weight: 1.15, R: 3.5, r: 1.2},
            {name: '110x110x8', height: 110, width: 110, thickness: 8, weight: 13.5, R: 12, r: 4}

            
        ],
        gost8510: [
            {name: '25x16x3', height: 25, width: 16, thickness: 3, weight: 0.91},
            {name: '30x20x3', height: 30, width: 20, thickness: 3, weight: 1.12}
        ],
      },
    }
}


export default Database