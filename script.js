const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


canvas.width = 600;
canvas.height = 600;

const center = canvas.width/2;

const centerSize = 100;

// create a player object (looks like a python dictionary!!)
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    dx: 0,
    dy: 0
};

// store items to collect
const items = [];
let score = 0;
let health = 20;

// draw your player
function drawPlayer() {
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // draw a cuteee face
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y + 15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + 25, player.y + 15, 3, 0, Math.PI * 2);
    ctx.fill();
}

function drawCenter() {
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(center - centerSize/2, center - centerSize/2, centerSize, centerSize);
    // draw a cuteee face
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(center - 15, center  + 15, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center + 15, center + 15, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FFD700';
    ctx.arc(center - 15, center + 20, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center + 15, center + 20, 5, 0, Math.PI * 2);
    ctx.fill();
}



// draw the items
function drawItems() {
    items.forEach((item, index) => {
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// draw your score
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function drawHealth() {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Health: ' + health, 500, 30);
}

// update the player's position
function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

}

// update the items
function updateItems() {
    items.forEach((item, index) => {
        item.x += item.dx
        item.y += item.dy;
        // check if it collides with the player
        if (
            item.x > player.x &&
            item.x < player.x + player.width &&
            item.y > player.y &&
            item.y < player.y + player.height
        ) {
            items.splice(index, 1);
            score++;
        }
        
        // remove if it's off the screen
        var dist = Math.sqrt(    Math.pow( item.x - center, 2) + Math.pow( item.y - center, 2)   );
        if (dist < centerSize) {
            items.splice(index, 1);
            health -= 1;

            if (health <= 0){
                location.reload();
            }
        }
    });
}

// create items
function createItem() {
    var ang = Math.random() * (2 * Math.PI);
    var center = canvas.width/2;
    //var yy = center + ((100) * Math.sine(ang));
    const item = {
        // Ma

        x: center + ((300) * Math.cos(ang)),
        y: center + ((300) * Math.sin(ang)),
        //y: 200,
        radius: 10,
        dx: (Math.random() * .5 + .8) * -Math.cos(ang),
        dy: (Math.random() * .5 + .8) * -Math.sin(ang)
    };
    //print(yy);
    items.push(item);
}

// your main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawCenter();
    updatePlayer();
    updateItems();
    
    drawPlayer();
    drawItems();
    drawScore();
    drawHealth();
    requestAnimationFrame(gameLoop);
}

// add some controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') player.dx = -5;
    if (e.key === 'ArrowRight' || e.key === 'd') player.dx = 5;
    
     if (e.key === 'ArrowUp' || e.key === 'w') player.dy = -5;
    if (e.key === 'ArrowDown' || e.key === 's') player.dy = 5;
});

document.addEventListener('keyup', (e) => {
    
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') player.dx = 0;
     if (e.key === 'ArrowUp' || e.key === 'w'  || e.key === 'ArrowDown' || e.key === 's') player.dy = 0;
});

// create items periodically
setInterval(createItem, (Math.random() * 400) + 800);

// start the game!
gameLoop();
