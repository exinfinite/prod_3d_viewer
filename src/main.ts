type config = {
    frames: [][],
    ratio: number,//圖片縮放比例
    dir: String,//圖檔資料夾
    vert_init: number,//垂直方向初始索引
    horiz_init: number,//水平方向初始索引,
    hint: null | HTMLElement
};
type direction = 'x' | 'y';
type cursor = 'grab' | 'w-resize' | 'inherit' | 'auto' | 'none' | 'progress';
class Viewer {
    init(canvas: HTMLCanvasElement, cfg: Object = {}): void {
        const params: config = Object.assign({
            frames: [],
            ratio: 1,
            dir: '',
            vert_init: 0,
            horiz_init: 0,
            hint: null
        }, cfg);
        if (!canvas || !canvas.getContext) return;
        canvas.oncontextmenu = e => (e.preventDefault(), e.stopPropagation());
        let stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        stage.mouseMoveOutside = true;
        createjs.Touch.enable(stage);
        let { frames, ratio, dir, vert_init, horiz_init, hint } = params,
            images: HTMLImageElement[][] = Array.from(frames, f => []),
            loaded: number = 0,
            vertTotal: number = frames.length,
            horizTotal: number = vertTotal > 0 ? frames[0].length : 0,
            totalItems: number = vertTotal * horizTotal,
            start_x: number,
            start_y: number,
            bg = new createjs.Shape(),
            bmp = new createjs.Bitmap(canvas);
        stage.addChild(bg);
        bmp.scaleX = ratio;
        bmp.scaleY = ratio;
        stage.addChild(bmp);
        //載入圖片
        function loadImageModel(): void {
            cursor('progress');
            frames.forEach(function (frames, vert) {
                frames.forEach(function (frame, horiz) {
                    const img = new Image();
                    img.src = `${dir}/${frame}`;
                    img.onload = imgFill;
                    images[vert][horiz] = img;
                });
            });
            start();
        }
        //每載完一張圖片就執行一次
        function imgFill(e): void {
            if (loaded < totalItems) loaded++;
            const canvas = <HTMLCanvasElement>stage.canvas;
            bg.graphics.clear();
            bg.graphics.beginFill("rgba(255,255,255,1)").drawRect(0, 0, canvas.width, canvas.height);
            bg.graphics.endFill();
        }
        //啟動
        function start(): void {
            updateDraw('x', 0);
            addNavigation();
        }
        /**
         * 更新畫布
         * direction: 'x' or 'y'
         * i : 跳到第幾幀圖
         * */
        function updateDraw(direction: direction, i: number): void {
            if (direction == 'x') {
                horiz_init += i;
            }
            if (direction == 'y') {
                vert_init += i;
            }
            if (horiz_init < 0) horiz_init = horizTotal - 1;
            else if (horiz_init > horizTotal - 1) horiz_init = 0;

            if (vert_init < 0) vert_init = 0;
            else if (vert_init > vertTotal - 1) vert_init = vertTotal - 1;
            bmp.image = images[vert_init][horiz_init];
        }
        //事件設定
        function addNavigation(): void {
            stage.addEventListener("mouseover", mouseOver);
            stage.addEventListener("mousedown", mousePressed);
            stage.addEventListener("pressmove", mouseMoved);
            stage.addEventListener("pressup", mouseUp);
            stage.addEventListener("mouseleave", mouseLeave);
            //cursor('auto');
        }

        function mouseOver(e): void {
            cursor('grab');
        }
        function mouseLeave(e): void {
            //cursor('inherit');
        }

        function mousePressed(e): void {
            start_x = e.rawX;
            start_y = e.rawY;
            cursor('w-resize');
            hintSet(false);
        }

        function mouseMoved(e): void {
            let dx = e.rawX - start_x;//橫向移動距離
            let dy = e.rawY - start_y;//橫向移動距離
            let abs_dx = Math.abs(dx);
            let abs_dy = Math.abs(dy);
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
        function hintSet(status: true | false = true) {
            let dispaly = status ? 'block' : 'none';
            !!hint ? hint.style.display = dispaly : '';
        }
        function mouseUp(e): void {
            cursor('grab');
            hintSet();
        }

        function handleTick(): void {
            stage.update();
        }
        function cursor(style: cursor): void {
            canvas.parentElement.style.cursor = style;
        }
        loadImageModel();
        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.framerate = 90;
    }
}
export const prodViewer = new Viewer();