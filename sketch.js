let input;
let slider;
let button;
let dropdown;
let dropdown2;
let iframe;
let offsets = [];
let jumping = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10); // 將文字框移到左上角
  
  slider = createSlider(20, 50, 32); // 創建滑桿，範圍從 20 到 50，初始值為 32
  slider.position(input.x + input.width + 10, 10); // 將滑桿放在文字框右側
  
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 10); // 將按鈕放在滑桿右側
  button.mousePressed(toggleJumping);
  
  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10); // 將下拉式選單放在按鈕右側
  for (let i = 1; i <= 18; i++) {
    dropdown.option(`w${i}`);
  }
  
  dropdown2 = createSelect();
  dropdown2.position(dropdown.x + dropdown.width + 20, 10); // 將第二個下拉式選單再往右移 10 像素
  dropdown2.option('淡江大學');
  dropdown2.option('找音樂');
  dropdown2.option('HackMD');
  dropdown2.changed(updateIframe);
  
  iframe = createElement('iframe');
  iframe.position(200, 200); // 將 iframe 放在距離邊框 200 像素的位置
  iframe.size(windowWidth - 400, windowHeight - 400); // 設置 iframe 大小為畫布大小減去邊距
  
  for (let i = 0; i < 30; i++) {
    offsets.push(random(0, 1000));
  }
}

function draw() {
  background('#ffafcc'); // 設置背景顏色為 #ffafcc
  let txt = input.value();
  let txtSize = slider.value(); // 根據滑桿的值設置文字大小
  textAlign(CENTER, CENTER);
  textSize(txtSize); // 調整文字大小
  
  // 設置文字邊框顏色和填充顏色
  stroke('#FFFFFF'); // 邊框顏色為白色
  strokeWeight(4); // 邊框寬度
  fill('#bde0fe'); // 填充顏色為 #bde0fe
  
  // 顯示輸入的文字在畫布的中間
  for (let i = 0; i < 30; i++) {
    let y = height / 2 - 320 + i * txtSize;
    if (jumping) {
      y += sin(offsets[i] + frameCount * 0.1) * 10;
    }
    text(txt, width / 2, y);
  }
}

function toggleJumping() {
  jumping = !jumping;
  if (jumping) {
    for (let i = 0; i < offsets.length; i++) {
      offsets[i] = random(0, 1000);
    }
  }
}

function updateIframe() {
  let selected = dropdown2.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '找音樂') {
    iframe.attribute('src', 'https://openprocessing.org/');
  } else if (selected === 'HackMD') {
    iframe.attribute('src', 'https://hackmd.io/?nav=overview');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  input.position(10, 10); // 確保文字框位置隨著畫布大小調整
  slider.position(input.x + input.width + 10, 10); // 確保滑桿位置隨著畫布大小調整
  button.position(slider.x + slider.width + 10, 10); // 確保按鈕位置隨著畫布大小調整
  dropdown.position(button.x + button.width + 10, 10); // 確保下拉式選單位置隨著畫布大小調整
  dropdown2.position(dropdown.x + dropdown.width + 20, 10); // 確保第二個下拉式選單位置隨著畫布大小調整
  iframe.position(200, 200); // 確保 iframe 位置隨著畫布大小調整
  iframe.size(windowWidth - 400, windowHeight - 400); // 確保 iframe 大小隨著畫布大小調整
}