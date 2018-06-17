import React from 'react';
import { GET } from '../../http';
import { Loading } from '../../styles/logo';
import { StyleSheet } from 'aphrodite-jss';
import wrapper from '../../styles/components';

export default function awaitUser(meiosisComponent) {
    return function (update) {
        let component = meiosisComponent(update);
        let waiting = (
            <Waiting>
                <Loading size={64} />
            </Waiting>
        );
        return {
            ...component,
            data(model) {
                GET.authenticate(update)
                    .then(user => {
                        if (!user) throw new Error();
                        else return user;
                    })
                    .catch(err => {
                        update(model => ({
                            ...model,
                            user: {}
                        }));
                        update.access(['router', 'history']).push('/login', { message: "Oops, looks like you're not logged in..." });
                    });
                component.data(model);
            },
            view(model) {
                if (!model.user || !model.user.id) return waiting;
                else return component.view(model) || waiting;
            }
        };
    }
}

const styles = StyleSheet.create({
    waiting: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Waiting = wrapper('div', styles.waiting);
