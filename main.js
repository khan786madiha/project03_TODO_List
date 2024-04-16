#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
class TodoList {
    tasks;
    constructor() {
        this.tasks = [];
    }
    addTask(name) {
        const newTask = {
            id: this.tasks.length + 1,
            name: name
        };
        this.tasks.push(newTask);
        console.log(chalk.green(`Task "${name}" added successfully!`));
    }
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const deletedTask = this.tasks.splice(taskIndex, 1)[0];
            console.log(chalk.red(`Task "${deletedTask.name}" deleted successfully!`));
        }
        else {
            console.log(chalk.yellow('Task not found!'));
        }
    }
    viewTasks() {
        console.log(chalk.blue('Current Task List:'));
        this.tasks.forEach(task => console.log(chalk.cyan(`- ${task.name}`)));
    }
}
async function main() {
    const todoList = new TodoList();
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Add Task', 'Delete Task', 'View Task List', 'Exit']
            }
        ]);
        if (action === 'Add Task') {
            const { taskName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'taskName',
                    message: 'Enter task name:'
                }
            ]);
            todoList.addTask(taskName);
        }
        else if (action === 'Delete Task') {
            const { taskId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'taskId',
                    message: 'Enter task ID to delete:'
                }
            ]);
            todoList.deleteTask(parseInt(taskId));
        }
        else if (action === 'View Task List') {
            todoList.viewTasks();
        }
        else if (action === 'Exit') {
            console.log(chalk.yellow('Exiting...'));
            break;
        }
    }
}
main();
