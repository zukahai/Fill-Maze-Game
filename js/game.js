game_W = 0, game_H = 0;
c = 0;
data = ["2|2|0030",
"3|3|000031000",
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
"9|9|000010000001001010100001010000000000000000001000100000101111010300000010101111110",
"9|9|000000100011000100011000000010001100000000000110000000001001110010000000300000001",
"8|9|111111010300001000010101000010000000010111000010000000011111100000000001",
"9|9|110000001100111001101001011101000000100101010110001010301110010101110110100000000",
"9|9|000001100011101100000000000111101101001000000001011100000001100101001000301001001",
"9|9|111100011000000011001101100001000000101001101101110000000010100011000011311110000",
"8|10|00000010011101100001000000000001011000100100000000000000011010001001003010000100",
"10|10|0111111011011111100100111000010011101000000000100000110011100000000100100100000010000000013001011111",
"10|10|0000001000011110101001110000100010001110101010000000101010110100000011010000000001111011103000000000",
"10|10|1000001111101110000000000011011011111101000000000100011111010101110001010001010101110101003000000111",
"10|10|0011111100000111100010001100010000000000000011000000001100000000110000000011000000001100003000110000",
"10|10|1000000000000000000100000000001011111100000000110000001000001010110100101001010030000101101111010000",
"11|11|1101110111111000100000010101110100101000001000010110110011101101100010000000010001110110011001101000111011010130000110001",,
"11|11|0001111100010000010010100110001101011111111010111111110000000000001011111010000011110101010111101010100001010131111000100",
"11|11|0001111100010000010010100110001101011111111010111111110000000000001011111010000011110101010111101010100001010131111000100",
"11|11|0001111000010000000010000001110001111011101111110000000011111010100111100111001100011000011000000100000101011030011010000",
"11|11|0001000000001010111110000000000001100011111011011000010100000010101011011000000000110011001111100010000000000030000111100",
"11|11|0001000100000000100000110111011010001110110101111101100000000000001111110110011000000000110111011011100000000030000000000",
"11|11|0001000100000000100000110111011010001110110101111101100000000000001111110110011000000000110111011011100000000030000000000",
"11|11|0011111111100000000111101111100001011001111010100000010100000110101011010001010000001000111101111111111000000030000000000",
"12|12|000000000110010101110000000100000000110111110011000000000001010111100001010100000011010100010000010111100010000001100010111101100010300001111000",
"10|12|311000000001011011010000011011010100011000000100011111010100000000010100011101010000011101010111010000000000000001000000",
"8|12|300011001000111011001010111011000010001011011010001000000000001001011011001001011010000001000000",
"8|12|000000000111001011110000001000110110101110000010100000011010100111011010110110001010300000100000",
"12|12|100000101000101010101010000010101000011011100000000000001100011110111100000000111100111010111100111010001100000011100000010010000001310010000011",
"10|12|100000010000101111010110001000000001010001010101010101000101010101111101000101110001111101110101000000000101311111111111",
"10|12|301100001100001101100000000001101010110101101000110000000001001101010001000000010000001111010000001111010100000000000100"];
M = N = size = XX = YY = xPanda = yPanda = -1;
A = [];
im = new Image();
rd = -1;
cl = ["#99FF66", "#FFFF66", "#99FFFF", "#6699FF", "#FF9999", "#CC9966", "#CC99CC", "#444444", "#FF99FF"];
color = 0;
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

    initColor(N) {
        let k = -1;
        do {
            k = (Math.floor(Math.random() * 9999999)) % cl.length;
        }   while (k == N);
        return k;
    }

    setUp(str) {
        rd = this.initColor(rd);
        im = new Image();
        im.src = "images/ball/" + rd + ".png";
        color = cl[rd];
        console.log(rd);
        A = [];
        score2 = 100 + level * level;
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

        xBall += L * dx;
        yBall += L * dy;
        dxBall = - Math.floor(L * dx * size);
        dyBall = - Math.floor(L * dy * size);

        if (L > 0)
            score2 -= (1 + Math.floor(level / 5));
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
        let Tdx = dxBall;
        let Tdy = dyBall;
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
        if (Tdx == dxBall) {
            if (Tdy < dyBall) {
                for (let i = Tdy; i <= dyBall; i += size / 10)
                    A[Math.floor((xBall * size + dxBall + size / 2) / size)][Math.floor((yBall * size + i + size / 2) / size)] = 2;
            } else {
                for (let i = Tdy; i >= dyBall; i -= size / 10)
                    A[Math.floor((xBall * size + dxBall + size / 2) / size)][Math.floor((yBall * size + i + size / 2) / size)] = 2;
            }
        } else {
            if (Tdx < dxBall) {
                for (let i = Tdx; i <= dxBall; i += size / 10)
                    A[Math.floor((xBall * size + i + size / 2) / size)][Math.floor((yBall * size + dyBall + size / 2) / size)] = 2;
            } else {
                for (let i = Tdx; i >= dxBall; i -= size / 10)
                    A[Math.floor((xBall * size + i + size / 2) / size)][Math.floor((yBall * size + dyBall + size / 2) / size)] = 2;
            }
        }
    }

    drawMatrix(){
        for (let i = 0; i < M; i++) 
            for (let j = 0; j < N; j++)
                if (A[i][j] != 1) {
                    if (A[i][j] == 0)
                        this.context.fillStyle = "#C0C0C0";
                    else if (A[i][j] == 2)
                        this.context.fillStyle = color;
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