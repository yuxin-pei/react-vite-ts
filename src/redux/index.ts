import { legacy_createStore as createStore, combineReducers, Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import global from "./modules/global/reducer";
import tabs from "./modules/tabs/reducer";
import menu from "./modules/menu/reducer";
import breadcrumb from "./modules/breadcrumb/reducer";

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	global,
	tabs,
	menu,
	breadcrumb,
});

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage,
};

const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用redux 中间件
const middleware = applyMiddleware(reduxThunk, reduxPromise);

// 创建store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleware));

//创建持久化Store
const storePersist = persistStore(store);

export { store, storePersist };
