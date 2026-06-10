// 요소 선택
const todoInput = document.getElementById('todo-input');
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

// 할 일 추가 함수
function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") return; // 빈 값 방지

    // 리스트 아이템 생성
    const li = document.createElement('li');
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "10px";
    
    li.innerHTML = `
        <span>${text}</span>
        <button class="btn-delete" style="background:#ef4444; border:none; color:white; border-radius:4px; padding:2px 8px; cursor:pointer;">X</button>
    `;

    // 삭제 버튼 이벤트
    li.querySelector('.btn-delete').addEventListener('click', function() {
        li.remove();
    });

    todoList.appendChild(li);
    todoInput.value = ""; // 입력창 초기화
}

// 등록 버튼 클릭 시
btnAdd.addEventListener('click', addTodo);

// 엔터 키 입력 시
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTodo();
});

// 타이머 관련 변수
let timeLeft = 1500; // 25분(초)
let timerId = null;

const timerDisplay = document.querySelector('.timer-display');
const btnStart = document.querySelector('.btn-start');
const btnStop = document.querySelector('.btn-stop');

// 시간을 MM:SS 형식으로 변환하는 함수
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 타이머 시작 함수
function startTimer() {
    if (timerId !== null) return; // 이미 실행 중이면 중복 실행 방지

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            alert("집중 시간이 끝났습니다! 휴식을 취하세요.");
            timeLeft = 1500; // 시간 초기화
            updateDisplay();
        }
    }, 1000);
}

// 타이머 정지 함수
function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}

// 이벤트 리스너 연결
btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);