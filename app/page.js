import AddEditTodo from "./_components/todo/add-edit";
import ListTodo from "./_components/todo/list";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col md:flex-row justify-around px-6 py-12">
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <h2 className="mt-10 text-center text-2xl">Add Todo</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <AddEditTodo />
        </div>
      </div>
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <h2 className="mt-10 text-center text-2xl">List Todo</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <ListTodo />
        </div>
      </div>
    </div>
  );
}
