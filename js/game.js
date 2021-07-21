game_W = 0, game_H = 0;
c = 0;
data = ["2|2|0030",
"5|5|0000001110001101110030001",
"5|5|0100001000010000000030001",
"5|5|0000010000000010100031000",
"5|5|0010000100100001011030000",
"5|5|1100011010300000101000000",
"5|5|1000010101101010000031100",
"6|6|100100000100010000010001011100300000",
"6|6|000100010000000010001010111110300000",
"6|6|0000010111000111001000001011100300000",
"6|6|001111000000101110100000101011300011",
"6|6|000000001110000010101010300000100011",
"6|6|010011000000111010000010101110130000",
"7|7|0100000010111000000100001010110101030000101001100",
"7|7|0000100010010001011000100000010010001001003110001",
"7|7|0001000010001001000000110000000010011101013000100",
"7|7|0000001011110001000001101010000101001010013100001",
"7|7|0010000000010010101110010000011001001111103000000",
"7|7|1111100000000101110000000100011011010000113010011",
"8|8|0000000101111000010000001110000000010101310000001000001010110000",
"8|8|0100000000011110011000100100100000011111110000001111111030000000",
"8|8|1000000010001100100011111100000111001101100001011011010030000000",
"8|8|1100011000010010011110000100011001010000000001001101100030011001",
"8|8|0000001001000000000000001100100000001000011010010110000031100100",
"8|8|1110000110000001001011000001100011000110110101103001000011000111",
"9|9|000010000001001010100001010000000000000000001000100000101111010300000010101111110"];
M = N = size = XX = YY = xPanda = yPanda = -1;
A = [];
im= new Image();
im.src = "images/ball.png";
xBall = yBall = 0;
speed = 5;

count = countWin = -1;
level = 0;
// level = data.length - 1;
score = score2 = 0;
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
        if (this.getCookie("levelMaze") != "") {
            level = Math.floor(this.getCookie("levelMaze"));
            score = Math.floor(this.getCookie("scoreMaze"));
        }
            

        this.render();
        this.loop();

        this.listenMouse();
        this.listenKeyboard();
        this.listenTouch();
        
    }

    setUp(str) {
        A = [];
        score2 = 100;
        this.setCookie("levelMaze", level, 7);
        this.setCookie("scoreMaze", score, 7);
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

        size = game_W / (N + 2);
        speed = Math.min(M, N) * size / 10;
        XX = size;
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
            Yend = evt.touches[0].pageY;
            Xend = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
        })

        document.addEventListener("touchstart", evt => {
            Ystart = evt.touches[0].pageY;
            Xstart = evt.touches[0].pageX - (document.documentElement.clientWidth - game_W) / 2;
        })

        document.addEventListener("touchend", evt => { 
            if (Math.abs(Xstart - Xend) > Math.abs(Ystart - Yend)) {
                if (Xstart > Xend)
                    this.moveBall(0, -1);
                else 
                    this.moveBall(0, 1);
            } else {
                if (Ystart > Yend)
                    this.moveBall(-1, 0);
                else 
                    this.moveBall(1, 0);
            }
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
        if (dxBall + dyBall != 0)
            return;
        let L = 1;
        while (this.isPoint(xBall + L * dx, yBall + L * dy) && A[xBall + L * dx][yBall + L * dy] % 2 == 0)
            L++;
        L--;

        console.log(L);
            
        xBall += L * dx;
        yBall += L * dy;
        dxBall = - Math.floor(L * dx * size);
        dyBall = - Math.floor(L * dy * size);

        if (L > 0)
            score2--;
        if (score2 < 20)
            score2 = 20;
        Xstart = Ystart = Xend = Yend = -1;
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            Xstart = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            Ystart = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("mousemove", evt => {
            if (Xstart == -1)
                return;
            Xend = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            Yend = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            if (Math.abs(Xstart - Xend) + Math.abs(Ystart - Yend) <= size / 2)
                return;
            if (Math.abs(Xstart - Xend) > Math.abs(Ystart - Yend)) {
                if (Xstart > Xend)
                    this.moveBall(0, -1);
                else 
                    this.moveBall(0, 1);
            } else {
                if (Ystart > Yend)
                    this.moveBall(-1, 0);
                else 
                    this.moveBall(1, 0);
            }
            Xstart = Ystart = Xend = Yend = -1;
        })

        document.addEventListener("mouseup", evt => {

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
            score += score2;
            if (level >= data.length - 1)
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
        this.context.fillText("Level: " + (Math.floor(level + 1)) + " / " + data.length + "     Score: " + score + " + " + score2, this.getSizeSquar(), this.getSizeSquar());
    }

    drawBall() {
        this.context.drawImage(im, XX + yBall * size + dyBall, YY + xBall * size + dxBall, size ,size);
        if (Math.abs(dxBall) < speed)
            dxBall = 0;
        if (Math.abs(dyBall) < speed)
            dyBall = 0;
        if (dxBall < 0)
            dxBall += speed;
        if (dxBall > 0)
            dxBall -= speed;
        if (dyBall < 0)
            dyBall += speed;
        if (dyBall > 0)
            dyBall -= speed;
        A[Math.floor((xBall * size + dxBall) / size)][Math.floor((yBall * size + dyBall) / size)] = 2;
    }

    drawMatrix(){
        for (let i = 0; i < M; i++) 
            for (let j = 0; j < N; j++)
                if (A[i][j] != 1) {
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