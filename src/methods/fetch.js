import React, { Component } from 'react';
const server = '';

export default  {        
    getComponent (type, id)  {
            return fetch(server + '/fiches/component/' + type + '/' + id, {
                method: 'Get',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('JWT'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json()).then((responseJson) => {
                return responseJson
            }).catch((error) => {
                console.error(error);
            });
    },
    storeComponents (type, id, dataC) {
        return fetch('/fiches/component/' + type + '/' + id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                'Authorization': 'Bearer ' + sessionStorage.getItem('JWT')
            },
            body: JSON.stringify(dataC)
        }).then((response) => response.json()).then((responseJson) => {
            return responseJson
        }).catch((error) => {
            console.error(error);
        });
    },
    storeAndere (id, dataC) {
        return fetch('/fiches/andere/andere/' + id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                'Authorization': 'Bearer ' + sessionStorage.getItem('JWT')
            },
            body: JSON.stringify(dataC)
        }).then((response) => response.json()).then((responseJson) => {
            return responseJson
        }).catch((error) => {
            console.error(error);
        });
    }
}
