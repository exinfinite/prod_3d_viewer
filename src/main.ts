type config = {
    frames: [][],
    ratio: number,
    dir: String,
    vert_init: number,//垂直方向初始索引
    horiz_init: number,//水平方向初始索引,
    hint: null | HTMLElement
};
export const viewerInit = function (this: any, canvas: HTMLCanvasElement, cfg: Object): () => void {
    const params: config = Object.assign({
        frames: [],
        ratio: 1,
        dir: '',
        vert_init: 0,//垂直方向初始索引
        horiz_init: 0,//水平方向初始索引,
        hint: null
    }, cfg);
    return function () {
        if (!canvas || !canvas.getContext) return;
        canvas.oncontextmenu = e => (e.preventDefault(), e.stopPropagation());
        let stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        stage.mouseMoveOutside = true;
        createjs.Touch.enable(stage);
        let { frames, ratio, dir, vert_init, horiz_init, hint } = params;
        let images = Array.from(frames, f => []),
            loaded = 0,
            vertTotal = frames.length,
            horizTotal = vertTotal > 0 ? frames[0].length : 0,
            totalItems = vertTotal * horizTotal,
            start_x,
            start_y,
            bg = new createjs.Shape(),
            bmp = new createjs.Bitmap(canvas);
        stage.addChild(bg);
        bmp.scaleX = ratio;
        bmp.scaleY = ratio;
        stage.addChild(bmp);
        function loadImageModel() {
            frames.forEach(function (frames, vert) {
                frames.forEach(function (frame, horiz) {
                    var img = new Image();
                    img.src = `${dir}/${frame}`;
                    img.onload = imgFill;
                    images[vert][horiz] = img;
                });
            });
            start();
        }
        //每載完一張圖片就執行一次
        function imgFill(e) {
            if (loaded < totalItems) loaded++;
            const canvas = <HTMLCanvasElement>stage.canvas;
            bg.graphics.clear();
            bg.graphics.beginFill("rgba(255,255,255,1)").drawRect(0, 0, canvas.width, canvas.height);
            bg.graphics.endFill();
        }
        function start() {
            document.body.style.cursor = 'none';
            updateDraw('x', 0);
            addNavigation();
        }
        /**
         * 更新畫布
         * direction: 'x' or 'y'
         * i : 跳到第幾幀圖
         * */
        function updateDraw(direction: "x" | "y", i: number) {
            if (direction == 'x') {
                horiz_init += i;
                if (horiz_init < 0) horiz_init = horizTotal - 1;
                else if (horiz_init > horizTotal - 1) horiz_init = 0;
            }
            if (direction == 'y') {
                vert_init += i;
                if (vert_init < 0) vert_init = 0;
                else if (vert_init > vertTotal - 1) vert_init = vertTotal - 1;
            }
            bmp.image = images[vert_init][horiz_init];
        }

        function addNavigation() {
            stage.addEventListener("mouseover", mouseOver);
            stage.addEventListener("mousedown", mousePressed);
            stage.addEventListener("pressmove", mouseMoved);
            stage.addEventListener("pressup", mouseUp);
            stage.addEventListener("mouseleave", mouseLeave);
            document.body.style.cursor = 'auto';
        }

        function mouseOver(e) {
            document.body.style.cursor = 'grab';
        }
        function mouseLeave(e) {
            document.body.style.cursor = 'inherit';
        }

        function mousePressed(e) {
            start_x = e.rawX;
            start_y = e.rawY;
            document.body.style.cursor = 'w-resize';
            !!hint ? hint.style.display = 'none' : '';
        }

        function mouseMoved(e) {
            var dx = e.rawX - start_x;//橫向移動距離
            var dy = e.rawY - start_y;//橫向移動距離
            var abs_dx = Math.abs(dx);
            var abs_dy = Math.abs(dy);

            if (abs_dx > 5) {
                updateDraw('x', dx / abs_dx);
                start_x = e.rawX;
                start_y = e.rawY;
            }
            if (abs_dy > 10) {
                updateDraw('y', dy / abs_dy);
                start_y = e.rawY;
            }
        }

        function mouseUp(e) {
            document.body.style.cursor = 'grab';
            !!hint ? hint.style.display = 'block' : '';
        }

        function handleTick() {
            stage.update();
        }

        document.body.style.cursor = 'progress';
        loadImageModel();

        // TICKER
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.framerate = 90;
    }
}