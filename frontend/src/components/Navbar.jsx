export function Navbar({ title, user, avatar }) {
  return (
    <div className="flex items-start justify-between">
      <h1 className="font-semibold">Payments App</h1>
      <div className="flex justify-around gap-2 text-gray-500">
        <p>Hello, User</p>
        <button>U</button>
      </div>
    </div>
  );
}
