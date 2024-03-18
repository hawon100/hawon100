// canvas 요소 가져오기
const canvas = document.querySelector("canvas");

// canvas에서 2D context 가져오기
const c = canvas.getContext("2d");

// canvas의 너비와 높이 설정
canvas.width = 1024; 
canvas.height = 576; 

const gravity = 0.2;

// Canvas 전체를 채울 검은색 사각형 그리기
c.fillRect(0, 0, canvas.width, canvas.height);

// Sprite 클래스 정의
class Sprite {
    constructor( { position, velocity }) {
        // 위치와 속도 설정
        this.position = position;
        this.velocity = velocity;

        // 스프라이트의 너비와 높이 설정
        this.width = 30;
        this.height = 150;
    }

    // 스프라이트 그리기
    draw() {
        // 빨간색으로 스프라이트 그리기
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    // 스프라이트 업데이트
    update() {
        // 스프라이트 그리기
        this.draw();

        // 스프라이트의 위치를 아래로 이동시킴
        this.position.y += this.velocity.y;

        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height)
        {
            this.velocity.y = 0;
        }
        else 
        {
            this.velocity.y += gravity;
        }
    }
}

// 플레이어 스프라이트 생성
const player = new Sprite( {
    // 초기 위치 설정
    position: {
        x :0,
        y :0,
    },
    // 초기 속도 설정
    velocity: {
        x:0,
        y:10,
    }
});

// 적 스프라이트 생성
const enemy = new Sprite( {
    // 초기 위치 설정
    position: {
        x :400,
        y :100,
    },
    // 초기 속도 설정
    velocity: {
        x:0,
        y:10,
    }
});

// 콘솔에 플레이어 객체 출력
console.log(player);

const keys = {
    d: {
        pressed : false,
    }
}

// 애니메이션 함수 정의
function animate() {
    // 다음 프레임 요청
    window.requestAnimationFrame(animate);

    // Canvas를 검은색으로 채움
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // 플레이어와 적 스프라이트 업데이트
    player.update();
    enemy.update();

    player.velocity.x = 0;
}

// 애니메이션 시작
animate();

window.addEventListener("keydown", (event) => {
    console.log(event.key);

    switch(event.key)
    {
        case "d": player.velocity.x = 1; break;
        case "a": player.velocity.x = -1; break;
    }
})

window.addEventListener("keyup", (event) => {
    console.log(event.key);

    switch(event.key)
    {
        case "d": player.velocity.x = 0; break;
        case "a": player.velocity.x = 0; break;
    }
})