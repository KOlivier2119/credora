interface TaskListProps {
    title: string
    tasks: string[]
  }
  
  export default function TaskList({ title, tasks }: TaskListProps) {
    return (
      <div>
        <h4 className="font-medium text-sm mb-2">{title}</h4>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="text-sm text-gray-600">
              {task}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  