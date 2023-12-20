import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you are looking for might be in another castle.
      </p>
      <Link className="bg-blue-500 px-10 py-3 text-white font-bold rounded" to="/tasks">your tasks</Link>
    </div>
  );
};

export default NotFoundPage;
