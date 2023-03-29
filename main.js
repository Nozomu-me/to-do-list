Vue.component('my-to-do-list', {
    template: `
        <div class="todo">
            <div class="title">
                <h1>To do list</h1>
                <button v-on:click="handleToggle" v-if="!toggle" class="add">Add Task</button>
                <button v-on:click="handleToggle" v-if="toggle" class="close">Close</button>
            </div>
            <add-task v-show="toggle" @get-task="getTask"></add-task>
            <div class="task-container">
                <div v-for="task in tasks" >
                    <task :task="task" @delete-task="deleteTask">{{task.title}}</task>
                </div>
            </div>

        </div>
    `,
    data() {
        return {
            tasks: [
                {
                    title: 'Groceries',
                    description: 'buy Tomatos, Oranges, Blueberries',
                },
                {
                    title: 'School home work',
                    description: 'Science, Maths',
                },
                {
                    title: 'Shopping',
                    description: 'Pants, socks',
                },
            ],
            toggle: false,
        };
    },
    methods: {
        getTask(task) {
            this.tasks.push(task);
        },
        handleToggle() {
            this.toggle = !this.toggle;
        },
        deleteTask(task) {
            console.log(task);
            this.tasks = this.tasks.filter((el) => el.title !== task.title);
        },
    },
});

Vue.component('add-task', {
    template: `
        <form @submit.prevent="onSubmit" class="form">
            <input v-model="title" type="text" id="title" placeholder="Title" class="input"/>
            <input v-model="description" type="text" id="description" placeholder="Description" class="input"/>
            <small v-show="check" class="warn">Please provide all the fields</small>
            <input type="submit" value="Add" class="submit"/>
        </form>
    `,
    data() {
        return {
            title: null,
            description: null,
            check: false,
        };
    },
    methods: {
        onSubmit() {
            let task = {
                title: this.title,
                description: this.description,
            };
            if (!this.title || !this.description) {
                this.check = true;
            } else {
                this.check = false;
                this.$emit('get-task', task);
            }
        },
    },
});

Vue.component('task', {
    props: {
        task: {
            type: Object,
        },
    },
    template: `
        <div class="task">
            <div class="element">{{task.title}}</div>
            <div class="element">{{task.description}}</div>
            <button class="delete" v-on:click="onClick">X</button>
        </div>
    `,
    methods: {
        onClick() {
            this.$emit('delete-task', this.task);
        },
    },
});

var vm = new Vue({
    el: '#root',
    data: {
        title: 'hello',
    },
});
