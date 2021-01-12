# prod_3d_viewer using easeljs

![GitHub package.json version](https://img.shields.io/github/package-json/v/exinfinite/prod_3d_viewer)
![GitHub file size in bytes](https://img.shields.io/github/size/exinfinite/prod_3d_viewer/dist/vr.prod.js)
![GitHub](https://img.shields.io/github/license/exinfinite/prod_3d_viewer)

## 範例及代碼

[線上範例](https://prod-3d-viewer.netlify.app/)

[Sample code](https://github.com/exinfinite/prod_3d_viewer/tree/main/example)

[Production](https://github.com/exinfinite/prod_3d_viewer/blob/main/dist/vr.prod.js)

```
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script src='./dist/vr.prod.js'></script>
```

```javascript
prodViewer.init(
    [HTMLCanvasElement],
    {
        frames: frames,
        ratio: 1,
        dir: "./imgs",
        vert_init: 3,
        horiz_init: 21,
        hint: [HTMLElement]
    }
);
```

## Development with webpack-dev-server

```javascript
npm run start
```

## Build

```javascript
npm run build
```
