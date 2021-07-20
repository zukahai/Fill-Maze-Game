game_W = 0, game_H = 0;
c = 0;
data = ["2|2|0030"];
M = N = size = XX = YY = xPanda = yPanda = -1;
A = [];
im= new Image();
im.src = "images/ball.png";
xBall = yBall = 0;

count = countWin = -1;
level = 0;
Xstart = Xend = Ystart = Yend = -1;
dxBall = dyBall = 0;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        if (this.getCookie("level") != "")
            level = Math.floor(this.getCookie("level"));

        this.render();
        this.loop();

        this.listenMouse();
        this.listenKeyboard();
        this.listenTouch();
        
    }

    setUp(str) {
        console.log(A);
        this.setCookie("level", level, 7);
        count = countWin = -1;
        let s = str.split("|");
        M = Math.floor(s[0]);
        N = Math.floor(s[1]);
        for (let i = 0; i < M; i++) {
            let temp = [];
            for (let j = 0; j < N; j++) {
                temp[j] = s[2][i * N + j];
                if (temp[j] == 3) {
                    xBall = i;
                    yBall = j;
                    temp[j] = 2;
                }
            }
                
            A[i] = temp;
        }
        console.log(A);

        size = game_W / (N + 1);
        XX = size / 2;
        YY = (game_H - size * M) / 2;
    }
    checkWin() {
        for (let i = 0; i < M; i++)
            for (let j = 0; j < N; j++)
                if (A[i][j] == 0)
                    return false;
        return true;
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            // Yend = evt.touches[0].pageY;
            // Xend = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
        })

        document.addEventListener("touchstart", evt => {
            // Ystart = evt.touches[0].pageY;
            // Xstart = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
        })

        document.addEventListener("touchend", evt => { 
            
        })
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            switch(key.keyCode) {
                case 37:
                case 65:
                    // console.log("Left");
                    this.moveBall(0, -1);
                    break;
                
                case 38:
                case 87:
                    // console.log("Top");
                    this.moveBall(-1, 0);
                    break;

                case 39:
                case 68:
                    // console.log("Right");
                    this.moveBall(0, 1);
                    break;

                case 40:
                case 83:
                    // console.log("Bottom");
                    this.moveBall(1, 0);
                    break;
            }
        })
    }

    moveBall(dx, dy) {
        let L = 1;
        console.log(xBall, ' ', yBall);
        while (this.isPoint(xBall + L * dx, yBall + L * dy) && A[xBall + L * dx][yBall + L * dy] % 2 == 0)
            L++;
        L--;
            
        console.log(L);
        xBall += L * dx;
        yBall += L * dy;
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            // var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            // var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            // if (x > game_W -  1.5 * this.getWidth () && y < 1.3 * this.getWidth()) {
            //     this.setUp(data[level]);
            // }
            // console.log(x, ' ', y);
        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })
    }


    loop() {
        this.update();
        this.draw();
        setTimeout(() => {
            this.loop();
        }, 30);
    }

    update() {
        count++;
        this.render();
        if (this.checkWin() && countWin == -1) {
            countWin = count + 15;
        }

        if (this.checkWin() && countWin == count) {
            if (level == data.length)
                level = -1;
            this.setUp(data[++level]);
        }
    }

 
    render() {
        if (c != document.documentElement.clientWidth / this.canvas.width || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            if (this.canvas.width > this.canvas.height)
                this.canvas.width = this.canvas.height;
            c = document.documentElement.clientWidth / this.canvas.width;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            this.setUp(data[level]);
        }
    }

    draw() {
        this.clearScreen();
        this.drawMatrix();
        this.drawScore();
        this.drawBall();
    }

    drawScore() {
        this.context.font = this.getSizeSquar() / 1.5 + 'px Arial Black';
        this.context.fillStyle = "#FF00CC";
        this.context.fillText("Level: " + (Math.floor(level + 1)) + " / " + data.length, this.getSizeSquar(), this.getSizeSquar());
    }

    drawBall() {
        this.context.drawImage(im, XX + yBall * size + dyBall, YY + xBall * size + dxBall, size ,size);
    }

    drawMatrix(){
        for (let i = 0; i < M; i++) 
            for (let j = 0; j < N; j++) {
                if (A[i][j] == 0)
                    this.context.fillStyle = "#C0C0C0";
                else if (A[i][j] == 2)
                    this.context.fillStyle = "#6699FF";
                this.context.fillRect(XX + j * size, YY + i * size, size + 1, size + 1);
            }
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0 , 0, game_W, game_H); 
    }

    getSizeSquar() {
        var area = game_W * game_H;
        return Math.sqrt(area / 300);
    }

    isPoint(x, y) {
        if (x < 0 || y < 0 || x >= M || y >= N)
            return false;
        return true;
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

var g = new game();