# React + Phoenix mercury



#### Install
elixir, yarn, postgress

#### Download dependencies
```
mix deps.get
mix ecto.create
mix ecto.migrate
cd assets
yarn install
cd ..
```


#### Start server
```
mix phx.server
```

## SUPERUSER
After running `mix ecto.migrate` command you will have superuser:
```
email: admin@admin.com
password: 12345678
```
You probably wanna change it :)

## SETUP
#### Redux logger
If you want to turn redux logger on just assign `true` to useReduxLogger in app/store/index.js
```javascript
...
const useReduxLogger = true;
...
