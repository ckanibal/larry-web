import React from 'react';
import {render} from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga'
// import thunkMiddleware from 'redux-thunk';
import {Route} from 'react-router';
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router';

import rootReducer from './reducers/index';
import rootSaga from './sagas';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import './index.css';


const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const store = createStore(
    connectRouter(history)(rootReducer),
    compose(
        applyMiddleware(
            loggerMiddleware, // neat middleware that logs actions
            routerMiddleware(history),
            sagaMiddleware,
        )
    ),
);

sagaMiddleware.run(rootSaga);


render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
