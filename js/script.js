document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo date picker và time picker
    const fpDate = flatpickr("#taskDate", {
        dateFormat: "d-m-Y",
        locale: "vi",
        minDate: "today"
    });

    const fpTime = flatpickr("#taskTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        locale: "vi",
        minuteIncrement: 1
    });

    // ===== CHỨC NĂNG TICK HOÀN THÀNH TASK =====
    document.querySelectorAll('.tasks-list').forEach(function (list) {
        list.addEventListener('change', function (e) {
            if (e.target.type === 'checkbox') {
                const taskItem = e.target.closest('.task-item');
                if (taskItem) {
                    taskItem.classList.toggle('completed', e.target.checked);
                }
            }
        });
    });

    // ===== CHỨC NĂNG XÓA TASK =====
    document.querySelectorAll('.tasks-list').forEach(function (list) {
        list.addEventListener('click', function (e) {
            if (e.target.closest('.delete-btn')) {
                const taskItem = e.target.closest('.task-item');
                if (taskItem) {
                    // Xóa task khỏi DOM
                    taskItem.remove();
                }
            }
        });
    });

    const taskForm = document.getElementById('taskForm');
    const tasksList = document.getElementById('tasksList');
    const taskNameInput = document.getElementById('taskName');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskDateInput = document.getElementById('taskDate');
    const taskTimeInput = document.getElementById('taskTime');

    // Khai báo các biến hiển thị lỗi
    const taskNameError = document.getElementById('taskNameError');
    const taskDescriptionError = document.getElementById('taskDescriptionError');
    const taskDateError = document.getElementById('taskDateError');
    const taskTimeError = document.getElementById('taskTimeError');

    function validateTaskForm() {
        let isValid = true;
        if (taskNameError) taskNameError.textContent = '';
        if (taskDescriptionError) taskDescriptionError.textContent = '';
        if (taskDateError) taskDateError.textContent = '';
        if (taskTimeError) taskTimeError.textContent = '';

        // Lấy giá trị từ các trường input
        const description = taskDescriptionInput.value.trim();
        const date = taskDateInput.value.trim();
        const time = taskTimeInput.value.trim();

        // Kiểm tra các trường bắt buộc
        if (description === '') {
            if (taskDescriptionError) taskDescriptionError.textContent = 'Mô tả không được để trống.';
            isValid = false;
        }

        if (date === '') {
            if (taskDateError) taskDateError.textContent = 'Ngày không được để trống.';
            isValid = false;
        }

        if (time === '') {
            if (taskTimeError) taskTimeError.textContent = 'Giờ không được để trống.';
            isValid = false;
        }
        return isValid;
    }

    // ===== CHỨC NĂNG THÊM TASK MỚI =====
    if (taskForm) {
        taskForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateTaskForm()) {
                // Lấy giá trị từ các trường input
                const name = taskNameInput.value.trim();
                const date = taskDateInput.value.trim();
                const time = taskTimeInput.value.trim();

                // Tạo HTML cho task mới
                const taskItemHTML = `
                    <div class="task-item active">
                        <div class="task-content">
                            <input type="checkbox">
                            <span class="task-text">${name}</span>
                            <span class="task-date">${date}</span>
                            <span class="task-time">${time}</span>
                        </div>
                        <button class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;

                // Thêm task mới vào cuối danh sách
                if (tasksList) {
                    tasksList.insertAdjacentHTML('beforeend', taskItemHTML);
                }

                // Reset form và xóa dữ liệu đã chọn
                taskForm.reset();
                if (fpDate) fpDate.clear();
                if (fpTime) fpTime.clear();
            }
        });
    }
});
