'use strict';

const axios = require('axios')

async function set_daemon(address = "", trusted = false,
    ssl_support = "autodetect", ssl_private_key_path = undefined,
    ssl_certificate_path = undefined, ssl_ca_file = undefined,
    ssl_allowed_fingerprints = undefined, ssl_allow_any_cert = false) {

        try {
            let set_daemon_options = {
                "jsonrpc": "2.0",
                "id": "0",
                "method": "set_daemon",
                "params": {
                    "address": address,
                    "trusted": trusted,
                    "ssl_support": ssl_support,
                    "ssl_allow_any_cert": ssl_allow_any_cert
                }
            };

            // if these options have been set then we pass them to the RPC
            // server
            if(ssl_private_key_path !== undefined) {
                set_daemon_options['params']
                    ['ssl_private_key_path'] = ssl_private_key_path;
            }

            if(ssl_certificate_path !== undefined) {
                set_daemon_options['params']
                    ['ssl_certificate_path'] = ssl_certificate_path;
            }

            if(ssl_ca_file !== undefined) {
                set_daemon_options['params']['ssl_ca_file'] = ssl_ca_file;
            }

            if(ssl_allowed_fingerprints !== undefined) {
                set_daemon_options['params']
                    ['ssl_allowed_fingerprints'] = ssl_allowed_fingerprints;
            }

            if(address !== "") {
                const response = await axios.post(address, set_daemon_options);
            } else {
                throw 'No XMR RPC server address specified';
            }

            return response;

        } catch(error) {
            // TODO: Add more useful error checking
            console.log(error);
        }
}