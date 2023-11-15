import "./scss/main.scss"

function ready(): any {
  const addTaskButton = document.querySelector<HTMLButtonElement>(".main__addTask-button");
  const inputTask = document.querySelector<HTMLInputElement>(".main__addTask-input");
  const tasksItems = document.querySelector<HTMLDivElement>(".main__tasks");
  addTaskButton?.classList.add("disabled");
  addTaskButton?.setAttribute("disabled", "disabled");
  const tasksBuffer: string | null = localStorage.getItem("tasks");
  let tasks: any[] = [];
  if (tasksBuffer) {
    tasks = JSON.parse(tasksBuffer);
    if (!tasks) {
      localStorage.setItem("tasks", "[]");
      tasks = JSON.parse(tasksBuffer);
    }
  }
  inputTask?.addEventListener("input", (): void => {
    if (inputTask.value.length > 0) {
      addTaskButton?.classList.remove("disabled");
      addTaskButton?.removeAttribute("disabled");
    } else {
      addTaskButton?.classList.add("disabled");
      addTaskButton?.setAttribute("disabled", "disabled");
    }
  });
  addTaskButton?.addEventListener("click", (): void => {
    if (inputTask && inputTask.value.length > 0) {
      const task = {
        id: tasks.length,
        text: inputTask?.value,
        done: false,
      };
      tasks.unshift(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
    }
  });

  let tasksHTMLString: string = "";
  for (let i = 0; i < tasks.length; i++) {
    const valueId = tasks[i].id;
    if (tasks[i].done) {
      tasksHTMLString +=
        '<div class="main__tasks-block task-block task__done"><p class="task-block__text">' +
        tasks[i].text +
        '</p><div class="task-block__buttons"><div class="task-button__done" id="' +
        valueId +
        '"><img src="./img/check.svg" alt="" /></div><div class="task-button__delete" id="' +
        valueId +
        '"><img src="./img/times.svg" alt="" /></div></div></div>';
    } else {
      tasksHTMLString +=
        '<div class="main__tasks-block task-block"><p class="task-block__text">' +
        tasks[i].text +
        '</p><div class="task-block__buttons"><div class="task-button__done" id="' +
        valueId +
        '"><img src="./img/check.svg" alt="" /></div><div class="task-button__delete" id="' +
        valueId +
        '"><img src="./img/times.svg" alt="" /></div></div></div>';
    }
  }

  if (tasksItems) tasksItems.innerHTML = tasksHTMLString;

  const deleteTaskButtons = document.querySelectorAll<HTMLButtonElement>(".task-button__delete");

  deleteTaskButtons.forEach((deleteButton: HTMLButtonElement): void => {
    deleteButton.addEventListener("click", (event: Event): void => {
      const target = event.target as HTMLButtonElement
      const targetParentNode = target?.parentNode as HTMLElement
      const taskBlock = target?.parentNode?.parentNode?.parentNode as HTMLElement
      console.log(taskBlock)
      taskBlock.remove();
      console.log(tasks)
      tasks = tasks.filter((item) => item.id !== +targetParentNode.id);
      console.log(tasks)
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  });

  const doneTaskButtons = document.querySelectorAll(".task-button__done");

  doneTaskButtons.forEach((doneButton: Element): void => {
    doneButton.addEventListener("click", (event: Event): void => {
      const target = event.target as HTMLButtonElement
      const targetParentNode = target.parentNode as HTMLElement
      const taskBlock = target?.parentNode?.parentNode?.parentNode as HTMLElement
      tasks.forEach((item) => {
        if (item.id === +targetParentNode.id) {
          item.done = true;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskBlock.classList.add("task__done");
    });
  });
}

document.addEventListener("DOMContentLoaded", ready());
