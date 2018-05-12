import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createRoutes from './routes/routes';
import createStatics from './statics/statics';
import http from './http/http';

// APP
export default function create(update) {
    // INITIAL DATA
    // CHILDREN
    let routes = createRoutes(update);
    let statics = createStatics(update);
    // COMPONENT
    return {
        // TOP LEVEL MODEL
        model() {
            return {
                user: {
                    id: 1,
                    first_name: "Thomas",
                    last_name: "Lowry",
                    username: "Tommydreamer57",
                    email: "minilao94@yahoo.com",
                    admin: true,
                    organisations: [1]
                },
                organisation: {
                    id: 1,
                    name: 'DevMountain',
                    created_by: 1,
                    created_on: new Date(Date.now()),
                    members: [1],
                    channels: [
                        {
                            id: 1,
                            name: "wpr36",
                            created_by: 1,
                            created_on: new Date(Date.now()),
                            private: false,
                            members: [1],
                            messages: [
                                {
                                    id: 1,
                                    author: 1,
                                    text: "Hello!",
                                    timestamp: new Date(Date.now())
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: "wpr36-crew",
                            created_by: 1,
                            created_on: new Date(Date.now()),                            
                            private: true,
                            owner: 1,
                            members: [1],
                            messages: [
                                {
                                    id: 2,
                                    author: 1,
                                    text: "Hello Private Channel!",
                                    timestamp: new Date(Date.now())
                                }
                            ]
                        }
                    ]
                },
                direct_messages: [
                    {
                        id: 1,
                        members: [1],
                        messages: [
                            {
                                id: 3,
                                author: 1,
                                text: 'Hello Tommy!',
                                timestamp: new Date(Date.now())
                            }
                        ]
                    }
                ]
            };
        },
        // TOP LEVEL VIEW
        view(model) {
            console.log("APP MODEL");
            console.log(model);
            return (
                <Router>
                    <div id="app">
                        {routes.view(model)}
                        {statics.view(model)}
                    </div>
                </Router>
            );
        }
    };
}
