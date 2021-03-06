# building

## required tooling

building the editor requires installing `node`, `yarn`, and `react-scripts`.

- `npm install -g yarn` (or brew install yarn)
- `npm install -g react-scripts`

known compatible versions:

tool | version
-----|--------
npm | 6.1.0
yarn | 1.7.0
react-scripts | 1.0.17

## to build
from the `app/` directory within the `maiden` source tree (likely `$GOPATH/src/github.com/monome/maiden/app/`)

```
yarn install
yarn build
```
running `yarn build` will output static, bundled, and minified js, css, and html files suitable for release in the `build` directory. the built results are self contained and do not depend on node or any of the associated react toolchain.

## development and testing

running `yarn start` starts a local development server which automatically recompiles (and reloads) the application when a file is saved.

the development server runs on port 3000 and forwards any unhandled request to the `"proxy"` defined in the `package.json` file. starting the `maiden` server in a separate shell allows api calls to be handled during development.

installing both the `reactjs` and `redux` devtools browser extensions is highly recommended. 

## repl connection

the `maiden` repl uses websockets to directly connect to the `matron` (lua) and `crone` (supercollider) consoles bypassing the http backend. in order to determine which host/ip and socket to connect to `maiden` reads the `repl-endpoints.json` file (`app/public/repl-endpoints.json`) from the http backend.

when running both the frontend and backend locally during development it is still possible to make the repl work by locally editing `repl-endpoints.json`, the default configuration looks like:

```
{
    "matron": "ws://maiden_app_location:5555",
    "sc": "ws://maiden_app_location:5556"
}
```

the `maiden_app_location` is a special value which causes the frontend to attempt to connect to whichever host/ip `maiden` itself was loaded from. when running the frontend/backend locally, change the config to point specifically a the hostname or ip addr of the norns device. for example:

```
{
    "matron": "ws://norns.local:5555",
    "sc": "ws://norns.local:5556"
}
```

## typical workflow

a very quick/iterative development configuration can be achieved by:

* enabling wifi on norns
* using `sshfs` to mount the `we` home directory locally - `sshfs we@norns.local: ~/norns`
* editing `repl-endpoints.json` to point at the norns device
* starting the backend locally - `go build && ./maiden -app app/build/ -data ~/norns/dust -doc ~/norns/norns/doc -debug`
* starting the yarns development server `cd app; yarns start`
