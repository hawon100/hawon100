class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
        // velocity 추가하면서 중괄호로 묶는다. (편하게 관리하게 위해?)
        this.position = position;

        this.width = 50;
        this.height = 150;

        this.image = new Image();
        this.image.src = imageSrc;

        this.scale = scale;
        this.framesMax = framesMax;

        this.framesCurrent = 0;

        this.framesElapsed = 0;
        this.framesHold = 5;
        
        this.offset = offset;
    }

    draw() {
        c.drawImage(
            this.image, 
            // 이미지 자르는 영역
            this.framesCurrent * (this.image.width / this.framesMax), 
            0, 
            this.image.width / this.framesMax, 
            this.image.height,
            // 이미지 자르는 영역 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale);
    }

    update() {
        this.draw();
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0)
        {
            if(this.framesCurrent < this.framesMax - 1)
            {
                this.framesCurrent++;
            }
            else
            {
                this.framesCurrent = 0;
            }
        }
    }
}

class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        color = "red", 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0,},
        sprites
    }) {

        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })

        // velocity 추가하면서 중괄호로 묶는다. (편하게 관리하게 위해?)
        //this.position = position;
        this.velocity = velocity;

        this.width = 50;
        this.height = 150;
        // 라스트키 추가, 플레이어와 적을 구분하기 위함
        this.lastKey;

        this.attackBox = {
            width: 100,
            height: 50,
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
        };

        this.color = color;

        this.isAttacking;

        // 체력 추가
        this.health = 100;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

        this.sprites = sprites;

        for(const sprite in sprites)
        {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    // draw() {
    //     c.fillStyle = this.color;
    //     // 순서 중요 fillStyle이 먼저 있어야 함
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height);
    //     // 플레이어의 시작점과 이미지 픽셀의 끄점

    //     if (this.isAttacking) {
    //         c.fillStyle = "green";
    //         c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    //     }
    // }

    update() {
        this.draw();

        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0)
        {
            if(this.framesCurrent < this.framesMax - 1)
            {
                this.framesCurrent++;
            }
            else
            {
                this.framesCurrent = 0;
            }
        }

        // Box의 대소문자 확인!
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.y += this.velocity.y;
        // 값 변경하고 const player의 velocity안 값을 10으로 변경.

        //d를 눌렀을 때 x의 속도 변화
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            // this의 현재 위치와 this의 높이와 this의 속도가 canvas의 전체 높이보다 커지면 속도를 0으로 만든다.
        } else {
            this.velocity.y += gravity;
            // 중력 추가, else 때문에 더 이상 땅으로 들어가지 않는다.
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
        // 공격 딜레이 걸기
    }
}