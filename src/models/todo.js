const { TaskStatusEnum } = require("../data/enum/TaskStatus")
const { TaskTypeEnum } = require("../data/enum/TaskType")

class Todo {
    constructor(title = "",
        userId = 0,
        status = TaskStatusEnum.TODO,
        type = TaskTypeEnum.BACK,
        id = null
    ) {
        this.title = title
        this.type = type.toString()
        this.status = status.toString()
        this.userId = userId
        this.id = id
    }
}
exports.Todo = Todo