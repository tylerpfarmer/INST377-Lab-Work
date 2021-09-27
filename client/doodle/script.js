document.addEventListener('DOMContentoaded', () =>{
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let score = 0;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    

    class Platform {
        constructor(newPlatBottom) {
            this.left = Math.random() * 315;
            this.bottom = newPlatBottom;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    function createPlatforms() {
        for(let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform = new Platform (newPlatBottom);
        }
    }

    function movePlatforms() {
        if(doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if(platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual;
                    fistPlatform.classList.remove('platform');
                    platforms.shift();
                    console.log(platforms);
                    score++;
                    var newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                }
            })
        }
    }

    function start() {
        if(!isGameOver) {
            createDoodler();
            createPlatforms();
        }
    }
    start();
})